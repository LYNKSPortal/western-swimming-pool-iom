"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  genderOptions,
  phoneTypeOptions,
  titleOptions,
  type PersonDetails,
} from "@/lib/data/person";

type Props = {
  value: PersonDetails;
  onChange: (patch: Partial<PersonDetails>) => void;
  idPrefix: string;
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider text-deep-ink/60">{children}</p>
  );
}

export function PersonDetailsFields({ value, onChange, idPrefix }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <SectionLabel>Personal details</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-title`}>Title</Label>
            <Select
              id={`${idPrefix}-title`}
              value={value.title}
              onChange={(e) => onChange({ title: e.target.value })}
            >
              {titleOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-1">
            <Label htmlFor={`${idPrefix}-first-name`}>First name *</Label>
            <Input
              id={`${idPrefix}-first-name`}
              required
              value={value.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-last-name`}>Last name *</Label>
            <Input
              id={`${idPrefix}-last-name`}
              required
              value={value.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-preferred-name`}>Preferred name</Label>
            <Input
              id={`${idPrefix}-preferred-name`}
              value={value.preferredName}
              onChange={(e) => onChange({ preferredName: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-dob`}>Date of birth</Label>
            <Input
              id={`${idPrefix}-dob`}
              placeholder="DD/MM/YYYY"
              inputMode="numeric"
              value={value.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-gender`}>Gender</Label>
            <Select
              id={`${idPrefix}-gender`}
              value={value.gender}
              onChange={(e) => onChange({ gender: e.target.value })}
            >
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Address</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-address1`}>Address line 1 *</Label>
            <Input
              id={`${idPrefix}-address1`}
              required
              value={value.addressLine1}
              onChange={(e) => onChange({ addressLine1: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-address2`}>Address line 2</Label>
            <Input
              id={`${idPrefix}-address2`}
              value={value.addressLine2}
              onChange={(e) => onChange({ addressLine2: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-address3`}>Address line 3</Label>
            <Input
              id={`${idPrefix}-address3`}
              value={value.addressLine3}
              onChange={(e) => onChange({ addressLine3: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-city`}>City / town</Label>
            <Input
              id={`${idPrefix}-city`}
              value={value.city}
              onChange={(e) => onChange({ city: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-postcode`}>Postcode *</Label>
            <Input
              id={`${idPrefix}-postcode`}
              required
              value={value.postcode}
              onChange={(e) => onChange({ postcode: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-county`}>County</Label>
            <Input
              id={`${idPrefix}-county`}
              value={value.county}
              onChange={(e) => onChange({ county: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Contact details</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-email`}>Email address *</Label>
            <Input
              id={`${idPrefix}-email`}
              type="email"
              required
              value={value.email}
              onChange={(e) => onChange({ email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-additional-emails`}>Additional email addresses</Label>
            <Input
              id={`${idPrefix}-additional-emails`}
              type="email"
              value={value.additionalEmails}
              onChange={(e) => onChange({ additionalEmails: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-phone-type`}>Telephone type</Label>
            <Select
              id={`${idPrefix}-phone-type`}
              value={value.phoneType}
              onChange={(e) => onChange({ phoneType: e.target.value })}
            >
              {phoneTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${idPrefix}-phone`}>Telephone number *</Label>
            <Input
              id={`${idPrefix}-phone`}
              type="tel"
              required
              value={value.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor={`${idPrefix}-additional-phones`}>Additional telephone numbers</Label>
            <Input
              id={`${idPrefix}-additional-phones`}
              type="tel"
              value={value.additionalPhones}
              onChange={(e) => onChange({ additionalPhones: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Medical details</SectionLabel>
        <label
          htmlFor={`${idPrefix}-medical-consent`}
          className="flex items-start gap-3 text-sm text-deep-ink"
        >
          <input
            id={`${idPrefix}-medical-consent`}
            type="checkbox"
            checked={value.medicalConsent}
            onChange={(e) => onChange({ medicalConsent: e.target.checked })}
            className="mt-0.5 size-4 shrink-0 accent-western-red"
          />
          <span>
            I consent to Western Swimming Pool storing the medical details below so the team can
            support and accommodate appropriately.
          </span>
        </label>
        {value.medicalConsent ? (
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${idPrefix}-medical-conditions`}>
                Medical conditions <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id={`${idPrefix}-medical-conditions`}
                placeholder="e.g. asthma, epilepsy, allergies"
                value={value.medicalConditions}
                onChange={(e) => onChange({ medicalConditions: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${idPrefix}-medical-notes`}>
                Extra notes <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id={`${idPrefix}-medical-notes`}
                value={value.medicalNotes}
                onChange={(e) => onChange({ medicalNotes: e.target.value })}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
