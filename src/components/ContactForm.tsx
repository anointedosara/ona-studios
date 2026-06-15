"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) e.email = "Enter a valid email.";
    if (values.message.trim().length < 10)
      e.message = "Tell us a little more (min. 10 characters).";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) setErrors(data.errors as Errors);
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function field(name: keyof typeof values) {
    return {
      value: values[name],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
      },
    };
  }

  if (status === "success") {
    return (
      <div
        data-fade
        className="mx-auto max-w-xl rounded-3xl border border-line bg-bg-soft p-10 text-center"
      >
        <div className="mb-4 text-5xl">✶</div>
        <h3 className="mb-3 font-display text-3xl font-semibold">
          Message sent!
        </h3>
        <p className="text-muted">
          Thanks for reaching out — we&apos;ll reply within a day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          data-magnetic
          className="btn btn--ghost mt-7"
        >
          <span>Send another</span>
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-2xl border bg-transparent px-5 py-4 text-ink outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-accent";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-fade
      className="mx-auto grid max-w-xl gap-5 text-left"
    >
      <div>
        <input
          {...field("name")}
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          className={`${inputBase} ${errors.name ? "border-accent" : "border-line"}`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-accent">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          {...field("email")}
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          className={`${inputBase} ${errors.email ? "border-accent" : "border-line"}`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-accent">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          {...field("message")}
          rows={4}
          placeholder="Tell us about your project…"
          aria-label="Your message"
          className={`${inputBase} resize-none ${errors.message ? "border-accent" : "border-line"}`}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-accent">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        data-magnetic
        disabled={status === "submitting"}
        className="btn btn--primary justify-self-center px-10 py-5 text-[1.05rem] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-accent">
          Something went wrong. Please try again or email hello@onastudio.ng.
        </p>
      )}
    </form>
  );
}
