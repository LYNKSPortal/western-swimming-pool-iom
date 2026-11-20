import "server-only";
import { emailFrom, notificationsEmail, resend } from "@/lib/email/client";
import { renderBadge, renderEmail, renderFieldRows } from "@/lib/email/template";

/**
 * Sends a best-effort staff notification email. Failures are logged, not
 * thrown, so a Resend outage never blocks a form submission that already
 * saved (or doesn't need to save) to the database.
 */
async function sendNotification(subject: string, html: string) {
  try {
    await resend.emails.send({
      from: emailFrom,
      to: notificationsEmail,
      subject,
      html,
    });
  } catch (error) {
    console.error(`Failed to send notification email: ${subject}`, error);
  }
}

export function sendContactFormNotification(input: {
  name: string;
  email: string;
  phone: string;
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
        ["Name", input.name],
        ["Email", input.email],
        ["Telephone", input.phone],
        ["Message", input.message],
      ])}
    `,
  });
  return sendNotification(subject, html);
}

export function sendNewsletterSignupNotification(input: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const html = renderEmail({
    preheader: `${input.firstName} ${input.lastName} signed up to the newsletter`,
    heading: "New newsletter sign-up",
    bodyHtml: renderFieldRows([
      ["First name", input.firstName],
      ["Last name", input.lastName],
      ["Email", input.email],
    ]),
  });
  return sendNotification("New newsletter sign-up", html);
}

export function sendLessonEnquiryNotification(input: {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  programmeName: string;
  availability: string;
  message: string;
}) {
  const subject = `New lesson sign-up: ${input.programmeName}`;
  const html = renderEmail({
    preheader: `${input.parentName} is interested in ${input.programmeName}`,
    heading: "New swimming lesson sign-up",
    bodyHtml: `
      ${renderBadge(input.programmeName)}
      ${renderFieldRows([
        ["Parent/guardian", input.parentName],
        ["Phone", input.parentPhone],
        ["Email", input.parentEmail],
        ["Availability", input.availability],
        ["Message", input.message],
      ])}
    `,
  });
  return sendNotification(subject, html);
}
