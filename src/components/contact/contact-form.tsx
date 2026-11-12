"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";

const enquiryTypes = ["General enquiry", "Report a problem", "Private / party hire"];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: enquiryTypes[0],
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `${form.type}, Western Swimming Pool website`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Telephone: ${form.phone}`,
      `Enquiry type: ${form.type}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-name">Your full name</Label>
          <Input
            id="c-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-phone">Telephone</Label>
          <Input
            id="c-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="c-email">Your email</Label>
        <Input
          id="c-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="c-type">What&apos;s this about?</Label>
        <Select
          id="c-type"
          value={form.type}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
        >
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="c-message">Your message</Label>
        <Textarea
          id="c-message"
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      <Button type="submit" size="lg">
        <Send /> Send message by email
      </Button>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Mail className="size-3.5" /> This opens your email app with the details filled in,
        nothing is sent until you press send.
      </p>
    </form>
  );
}
