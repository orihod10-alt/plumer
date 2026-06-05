"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, Phone } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const WA_NUM = "972500000000";

const SUBJECTS = [
  { value: "urgent", label: "תקלה דחופה" },
  { value: "quote", label: "הצעת מחיר" },
  { value: "general", label: "שאלה כללית" },
];

interface Fields {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: Fields = { name: "", phone: "", email: "", subject: "urgent", message: "" };

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.055)",
  border: "1.5px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "12px 14px",
  color: "var(--paper)",
  fontFamily: "var(--font-assistant)",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-medium"
        style={{ color: "var(--muted-d)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--accent)", marginRight: 2 }}> *</span>
        )}
      </label>
      {children}
      {error && (
        <span className="text-xs" style={{ color: "#f87171" }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactForm() {
  const reduced = useReducedMotion() ?? false;
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<Fields> = {};
    if (!fields.name.trim()) errs.name = "שדה חובה";
    if (!fields.phone.trim()) errs.phone = "שדה חובה";
    else if (!/^[\d\-\s\+]+$/.test(fields.phone)) errs.phone = "מספר לא תקין";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subjectLabel =
      SUBJECTS.find((s) => s.value === fields.subject)?.label ?? fields.subject;

    const lines = [
      `שלום שלומי,`,
      ``,
      `שמי: ${fields.name}`,
      `טלפון: ${fields.phone}`,
      ...(fields.email ? [`אימייל: ${fields.email}`] : []),
      `נושא: ${subjectLabel}`,
      ...(fields.message.trim() ? [``, fields.message.trim()] : []),
    ];

    const url = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const focusStyle = (k: keyof Fields) => ({
    ...inputBase,
    borderColor: errors[k]
      ? "rgba(248,113,113,0.6)"
      : undefined,
  });

  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
      aria-labelledby="contact-heading"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[50vw] h-[30vh] rounded-full blur-[130px] opacity-[0.07]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mono text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
          >
            צור קשר
          </motion.p>
          <h2
            id="contact-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem,5vw,3.2rem)",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            שלח הודעה בוואטסאפ
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--muted-d)" }}>
            ממלאים את הפרטים — אנחנו מנסחים ופותחים וואטסאפ ישירות.
          </p>
        </div>

        {/* Form card */}
        <motion.form
          initial={reduced ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EASE }}
          onSubmit={handleSubmit}
          noValidate
          className="liquid-glass rounded-2xl p-7 flex flex-col gap-5"
          dir="rtl"
        >
          {/* Name + Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="שם מלא" required error={errors.name}>
              <input
                type="text"
                value={fields.name}
                onChange={set("name")}
                placeholder="ישראל ישראלי"
                autoComplete="name"
                style={focusStyle("name")}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(194,104,58,0.55)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(194,104,58,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.name
                    ? "rgba(248,113,113,0.6)"
                    : "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>

            <Field label="טלפון" required error={errors.phone}>
              <input
                type="tel"
                value={fields.phone}
                onChange={set("phone")}
                placeholder="050-000-0000"
                autoComplete="tel"
                inputMode="tel"
                dir="ltr"
                style={focusStyle("phone")}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(194,104,58,0.55)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(194,104,58,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.phone
                    ? "rgba(248,113,113,0.6)"
                    : "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>
          </div>

          {/* Email + Subject */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="אימייל (אופציונלי)">
              <input
                type="email"
                value={fields.email}
                onChange={set("email")}
                placeholder="email@example.com"
                autoComplete="email"
                dir="ltr"
                style={inputBase}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(194,104,58,0.55)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(194,104,58,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>

            <Field label="נושא">
              <select
                value={fields.subject}
                onChange={set("subject")}
                style={{
                  ...inputBase,
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(194,104,58,0.55)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(194,104,58,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {SUBJECTS.map((s) => (
                  <option
                    key={s.value}
                    value={s.value}
                    style={{ background: "var(--bg-dark)", color: "var(--paper)" }}
                  >
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Message */}
          <Field label="הודעה">
            <textarea
              value={fields.message}
              onChange={set("message")}
              rows={4}
              placeholder="תאר את הבעיה או הבקשה שלך..."
              style={{
                ...inputBase,
                resize: "vertical",
                minHeight: 100,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(194,104,58,0.55)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(194,104,58,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </Field>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2.5 font-bold text-base rounded-xl py-4 px-8 transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] glow-pulse"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            {sent ? (
              <>
                <Send size={18} aria-hidden="true" />
                <span>נפתח וואטסאפ!</span>
              </>
            ) : (
              <>
                <MessageCircle size={18} aria-hidden="true" />
                <span>שלח בוואטסאפ</span>
              </>
            )}
          </button>

          {/* Or call */}
          <p className="text-center text-xs" style={{ color: "var(--muted-d)" }}>
            או{" "}
            <a
              href="tel:+972500000000"
              className="font-semibold transition-colors hover:text-white"
              style={{ color: "var(--accent)" }}
            >
              <Phone
                size={11}
                className="inline"
                style={{ verticalAlign: "middle", marginLeft: 3 }}
                aria-hidden="true"
              />
              <span dir="ltr">050-000-0000</span>
            </a>{" "}
            להגעה מיידית
          </p>
        </motion.form>
      </div>
    </section>
  );
}
