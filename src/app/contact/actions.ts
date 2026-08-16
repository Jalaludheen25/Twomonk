"use server";

import { site } from "@/data/site";

/**
 * Contact form submission.
 *
 * ⚠️ DELIVERY IS NOT CONFIGURED YET, deliberately.
 *
 * There is no mail provider or CRM connected, and wiring one up requires
 * credentials plus a decision about where enquiries should land. Rather than
 * fake a success state — the worst possible failure mode for a contact form,
 * because leads vanish silently — this validates the submission and then:
 *
 *   • POSTs to `CONTACT_ENDPOINT` if that env var is set, or
 *   • returns `not-configured`, and the UI falls back to a prefilled mailto
 *     to Sales@twomonk.com so the enquiry still reaches TwoMonk.
 *
 * To go live, set CONTACT_ENDPOINT to a webhook (Formspree, Resend function,
 * n8n, CRM intake, …) — no component changes needed.
 */

export type EnquiryState = {
  status: "idle" | "ok" | "error" | "not-configured";
  message?: string;
  /** Field-level errors keyed by input name. */
  errors?: Record<string, string>;
  /** Prefilled mailto used by the fallback path. */
  mailto?: string;
};

const REQUIRED = ["name", "email", "message"] as const;

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const data = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    service: get("service"),
    budget: get("budget"),
    message: get("message"),
  };

  // Honeypot — bots fill hidden fields, humans don't.
  if (get("website")) {
    return { status: "ok", message: "Thanks — we'll be in touch." };
  }

  const errors: Record<string, string> = {};
  for (const field of REQUIRED) {
    if (!data[field]) errors[field] = "Required.";
  }
  if (data.email && !isEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (data.message && data.message.length < 10) {
    errors.message = "Please add a little more detail.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const endpoint = process.env.CONTACT_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "twomonk.com/contact" }),
      });
      if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
      return {
        status: "ok",
        message: "Thanks — your enquiry is with us. We'll reply shortly.",
      };
    } catch {
      return {
        status: "error",
        message: `Something went wrong sending that. Please email ${site.contact.email} directly.`,
      };
    }
  }

  // No endpoint configured — hand back a prefilled mailto so the enquiry is
  // never silently lost.
  const subject = `Project enquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const body = [
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.service && `Service: ${data.service}`,
    data.budget && `Budget: ${data.budget}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    status: "not-configured",
    message:
      "Your details are ready to send. Email delivery isn't connected yet, so this opens your mail app with everything filled in.",
    mailto: `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
