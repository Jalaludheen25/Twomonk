"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { ActionButton } from "@/components/ui/Button";
import { capabilities } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Enquiry form.
 *
 * Progressive enhancement by construction: a plain <form> wired to a server
 * action, so it submits and validates even before JavaScript loads.
 *
 * Accessibility: every field has a real <label>, errors are tied to inputs
 * with aria-describedby + aria-invalid, and the result region is a live region
 * so the outcome is announced rather than only shown.
 */

const initialState: EnquiryState = { status: "idle" };

const BUDGETS = [
  "Not sure yet",
  "Under $5k",
  "$5k â€“ $15k",
  "$15k â€“ $50k",
  "$50k+",
];

export function ContactForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
          error={state.errors?.name}
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          error={state.errors?.company}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.email}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          error={state.errors?.phone}
        />

        <SelectField label="Service" name="service">
          <option value="">Select an area</option>
          {capabilities.map((c) => (
            <optgroup key={c.id} label={c.name}>
              {c.groups.flatMap((g) =>
                g.services.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                )),
              )}
            </optgroup>
          ))}
        </SelectField>

        <SelectField label="Budget" name="budget">
          <option value="">Select a range</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </SelectField>
      </div>

      <TextareaField
        label="Message"
        name="message"
        required
        rows={5}
        placeholder="What are you trying to build, and what does success look like?"
        error={state.errors?.message}
      />

      {/* Honeypot â€” visually and semantically hidden from real users */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Submit />
        <p className="text-[13px] text-muted-2">
          We reply to every enquiry, usually within one working day.
        </p>
      </div>

      {/* Result â€” announced to assistive tech */}
      <div aria-live="polite" role="status">
        {state.status !== "idle" && state.message ? (
          <div
            className={cn(
              "mt-4 rounded-card border px-5 py-4 text-[14px] leading-relaxed",
              state.status === "ok" && "border-accent/40 bg-accent/[0.07] text-accent-text",
              state.status === "error" && "border-red-400/40 bg-red-400/[0.07] text-red-300",
              state.status === "not-configured" &&
                "border-accent/40 bg-accent/[0.07] text-accent-text",
            )}
          >
            <p>{state.message}</p>
            {state.mailto ? (
              <a
                href={state.mailto}
                className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-4"
              >
                Open email with details â†’
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <ActionButton type="submit" disabled={pending}>
      {pending ? "Sending" : "Send enquiry"}
    </ActionButton>
  );
}

const inputBase =
  "w-full rounded-xl border bg-surface/60 px-4 py-3.5 text-[15px] text-ink placeholder:text-muted-2/70 transition-colors duration-300 focus:border-accent focus:outline-none";

/** Shared label + error scaffolding for every control. */
function FieldShell({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2"
      >
        {label}
        {required ? <span className="ml-1 text-accent-text">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[12px] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  error,
  required,
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-cursor="hidden"
        className={cn(inputBase, error ? "border-red-400/60" : "border-line")}
        {...rest}
      />
    </FieldShell>
  );
}

function TextareaField({
  label,
  name,
  error,
  required,
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `f-${name}`;
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-cursor="hidden"
        className={cn(
          inputBase,
          "resize-y",
          error ? "border-red-400/60" : "border-line",
        )}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        data-cursor="hidden"
        className={cn(inputBase, "border-line appearance-none")}
      >
        {children}
      </select>
    </div>
  );
}
