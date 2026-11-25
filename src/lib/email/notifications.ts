import "server-only";
import { emailFrom, notificationsEmail, resend } from "@/lib/email/client";
import { escapeHtml, renderBadge, renderEmail, renderFieldRows } from "@/lib/email/template";
import { skillLevelOptions } from "@/lib/data/skill-levels";
import type { PersonDetails } from "@/lib/data/person";
import type { ChildInput } from "@/lib/actions/lesson-enquiry";

function renderPersonRows(person: PersonDetails): Array<[string, string]> {
  const address = [
    person.addressLine1,
    person.addressLine2,
    person.addressLine3,
    person.city,
    person.county,
    person.postcode,
  ]
    .filter(Boolean)
    .join("\n");
  const rows: Array<[string, string]> = [
    ["Title", person.title],
    ["First name", person.firstName],
    ["Last name", person.lastName],
    ["Preferred name", person.preferredName],
    ["Date of birth", person.dateOfBirth],
    ["Gender", person.gender],
    ["Address", address],
    ["Email", person.email],
    ["Additional emails", person.additionalEmails],
    ["Phone", person.phone ? `${person.phoneType}: ${person.phone}` : ""],
    ["Additional phones", person.additionalPhones],
  ];
  if (person.medicalConsent) {
    rows.push(
      ["Medical consent", "Yes, consented to medical details being stored"],
      ["Medical conditions", person.medicalConditions],
      ["Medical notes", person.medicalNotes]
    );
  }
  return rows;
}

function formatChildren(children: ChildInput[]) {
  if (children.length === 0) return "";
  return children
    .map((child, i) => {
      const skillLabel = skillLevelOptions.find((s) => s.value === child.skillLevel)?.label;
      const details = [child.age ? `age ${child.age}` : null, skillLabel]
        .filter(Boolean)
        .join(", ");
      const extra = [
        child.lessonPreference ? `   - Lesson preference: ${child.lessonPreference}` : null,
        child.supportNeeds ? `   - Support needs: ${child.supportNeeds}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      return `${i + 1}. ${child.name}${details ? ` (${details})` : ""}${extra ? `\n${extra}` : ""}`;
    })
    .join("\n");
}

/**
 * Sends a best-effort staff notification email. Failures are logged, not
 * thrown, so a Resend outage never blocks a form submission that already
 * saved (or doesn't need to save) to the database. replyTo is set to the
 * submitter's email so staff can simply reply to the notification.
 */
async function sendNotification(subject: string, html: string, replyTo?: string) {
  try {
    await resend.emails.send({
      from: emailFrom,
      to: notificationsEmail,
      replyTo,
      subject,
      html,
    });
  } catch (error) {
    console.error(`Failed to send notification email: ${subject}`, error);
  }
}

/**
 * Sends a best-effort branded confirmation email to the person who
 * submitted a form. It comes from reception@ so they can just hit reply
 * to talk to the team.
 */
async function sendCustomerConfirmation(
  to: string,
  input: { subject: string; preheader: string; heading: string; bodyHtml: string }
) {
  if (!to) return;
  try {
    await resend.emails.send({
      from: emailFrom,
      to,
      replyTo: notificationsEmail,
      subject: input.subject,
      html: renderEmail({
        preheader: input.preheader,
        heading: input.heading,
        bodyHtml: input.bodyHtml,
      }),
    });
  } catch (error) {
    console.error(`Failed to send confirmation email: ${input.subject}`, error);
  }
}

export async function sendContactFormNotification(input: {
  person: PersonDetails;
  name: string;
  type: string;
  message: string;
}) {
  const subject = `Contact form: ${input.type}`;
  const html = renderEmail({
    preheader: `New website enquiry from ${input.name}`,
    heading: "New contact form message",
    bodyHtml: `
      ${renderBadge(input.type)}
      ${renderFieldRows([
        ...renderPersonRows(input.person),
        ["Message", input.message],
      ])}
    `,
  });

  const confirmation = sendCustomerConfirmation(input.person.email, {
    subject: "Thanks for getting in touch",
    preheader: "We've received your message and will be in touch soon",
    heading: "Thanks for getting in touch",
    bodyHtml: `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(input.name)},</p>
      <p style="margin:0 0 12px;">Thanks for your message &mdash; it&apos;s landed safely with our reception team and we&apos;ll be in touch soon.</p>
      <p style="margin:0;">If anything changes or you want to add more detail, just reply to this email and it will come straight through to us.</p>
    `,
  });

  await Promise.all([confirmation, sendNotification(subject, html, input.person.email)]);
}

export async function sendLessonEnquiryNotification(input: {
  person: PersonDetails;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  programmeName: string;
  availability: string;
  message: string;
  children: ChildInput[];
}) {
  const subject = `New lesson sign-up: ${input.programmeName}`;
  const html = renderEmail({
    preheader: `${input.parentName} is interested in ${input.programmeName}`,
    heading: "New swimming lesson sign-up",
    bodyHtml: `
      ${renderBadge(input.programmeName)}
      ${renderFieldRows([
        ...renderPersonRows(input.person),
        ["Children", formatChildren(input.children)],
        ["Availability", input.availability],
        ["Message", input.message],
      ])}
    `,
  });

  const confirmation = sendCustomerConfirmation(input.parentEmail, {
    subject: `Thanks for signing up for ${input.programmeName}`,
    preheader: "We've received your lesson enquiry and will call you back soon",
    heading: "Thanks for signing up",
    bodyHtml: `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(input.parentName)},</p>
      <p style="margin:0 0 12px;">Thanks for your interest in <strong>${escapeHtml(input.programmeName)}</strong> &mdash; our team has your enquiry and will call you back to talk through availability and get you booked in.</p>
      ${renderFieldRows([
        ["Programme", input.programmeName],
        ["Children", formatChildren(input.children)],
        ["Your availability", input.availability],
      ])}
      <p style="margin:12px 0 0;">If anything changes or you want to add more detail, just reply to this email and it will come straight through to our reception team.</p>
    `,
  });

  await Promise.all([confirmation, sendNotification(subject, html, input.parentEmail)]);
}
