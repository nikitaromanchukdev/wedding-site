"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { CURSOR_ATTR } from "@/components/cursor/cursor-config";
import { submitRsvpToGoogleForm } from "@/lib/submit-rsvp";
import { features, isGoogleFormConfigured, rsvp } from "@/resources";

export function Rsvp() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isGoogleFormConfigured()) return;

    const formData = new FormData(e.currentTarget);
    setStatus("submitting");

    try {
      await submitRsvpToGoogleForm({
        name: String(formData.get("name") ?? ""),
        attending: String(formData.get("attending") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="rsvp" className="pb-24">
      <ScrollReveal>
        <p data-reveal className="label mb-4 text-champagne/70">
          {rsvp.label}
        </p>
        <h2 data-reveal className="font-display text-display-md text-cream">
          {rsvp.title}
        </h2>
        <p data-reveal className="mt-4 text-body text-cream/55">
          {rsvp.description}
        </p>

        {features.rsvpForm && (
          <form
            data-reveal
            className="mt-10 flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2">
              <span className="label text-cream/50">
                {rsvp.fields.name.label}
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder={rsvp.fields.name.placeholder}
                autoComplete="name"
                {...{ [CURSOR_ATTR]: "form" }}
                className="form-input min-h-12 rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-champagne/40"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="label text-cream/50">
                {rsvp.fields.attending.label}
              </span>
              <select
                name="attending"
                required
                defaultValue=""
                {...{ [CURSOR_ATTR]: "form" }}
                className="form-input min-h-12 rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-3 text-cream outline-none transition-colors focus:border-champagne/40"
              >
                <option value="" disabled>
                  {rsvp.fields.attending.placeholder}
                </option>
                {rsvp.fields.attending.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="label text-cream/50">
                {rsvp.fields.message.label}
              </span>
              <textarea
                name="message"
                rows={3}
                placeholder={rsvp.fields.message.placeholder}
                {...{ [CURSOR_ATTR]: "form" }}
                className="form-input resize-none rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-champagne/40"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3">
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting"
                  ? rsvp.submittingLabel
                  : rsvp.submitLabel}
              </Button>

              {status === "success" && (
                <p className="text-center text-sm text-champagne">
                  {rsvp.successMessage}
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400/80">
                  {rsvp.errorMessage}
                </p>
              )}
              {!isGoogleFormConfigured() && status === "idle" && (
                <p className="text-center text-xs text-cream/30">
                  Configure Google Form in src/resources/forms.ts
                </p>
              )}
            </div>
          </form>
        )}
      </ScrollReveal>
    </Section>
  );
}
