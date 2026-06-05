"use client";

import { useReducedMotion, motion } from "framer-motion";
import { Phone, ScanSearch, FileText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BlurText from "./BlurText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Step {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    Icon: Phone,
    title: "מתקשרים",
    desc: "שיחה אחת מספיקה. תסביר את הבעיה ואני כבר יודע מה להביא.",
  },
  {
    num: "02",
    Icon: ScanSearch,
    title: "מגיע ומאבחן",
    desc: "הגעה מהירה, אבחון בשטח. מוצא את שורש הבעיה — לא רק את הסימפטום.",
  },
  {
    num: "03",
    Icon: FileText,
    title: "הצעת מחיר שקופה",
    desc: "מחיר ברור לפני שמתחיל. בלי הפתעות, בלי לחץ — תחליט בנחת.",
  },
  {
    num: "04",
    Icon: ShieldCheck,
    title: "מתקן עם אחריות",
    desc: "עבודה מסודרת, ניקוי אחרי, ואחריות בכתב על כל מה שתוקן.",
  },
];

function Connector({ i, reduced }: { i: number; reduced: boolean }) {
  const delay = 0.3 + i * 0.12;
  return (
    <>
      {/* Desktop horizontal */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? {} : { scaleX: 0 }}
        whileInView={reduced ? {} : { scaleX: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.75, ease: EASE, delay }}
        className="hidden lg:block self-start h-[2px] w-10 xl:w-16 shrink-0 origin-right"
        style={{
          marginTop: 115,
          background:
            "linear-gradient(to left, rgba(194,104,58,0.65), rgba(194,104,58,0.1))",
        }}
      />
      {/* Mobile vertical */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? {} : { scaleY: 0 }}
        whileInView={reduced ? {} : { scaleY: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.08 }}
        className="lg:hidden w-[2px] h-8 mx-auto origin-top"
        style={{
          background:
            "linear-gradient(to bottom, rgba(194,104,58,0.7), rgba(194,104,58,0.1))",
        }}
      />
    </>
  );
}

export default function ProcessSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="process"
      className="relative py-24 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
      aria-labelledby="process-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[55vw] h-[35vh] rounded-full blur-[130px] opacity-[0.07]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mono text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
          >
            איך זה עובד
          </motion.p>
          <h2
            id="process-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="מהשיחה הראשונה עד סגירת הדלת" />
          </h2>
        </div>

        {/* Steps row */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col lg:flex-row items-center flex-1 w-full lg:w-auto">
              {/* Step card */}
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.12 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl liquid-glass w-full lg:w-auto flex-1"
                style={{ maxWidth: 210 }}
              >
                {/* Big decorative number */}
                <span
                  aria-hidden="true"
                  className="mono font-bold leading-none select-none"
                  style={{
                    fontSize: "clamp(2.8rem,6vw,4.5rem)",
                    color: "var(--accent)",
                    opacity: 0.45,
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(194,104,58,0.14)",
                    border: "1.5px solid rgba(194,104,58,0.28)",
                    color: "var(--accent)",
                  }}
                >
                  <step.Icon size={22} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="display font-bold text-base leading-tight"
                  style={{ color: "var(--paper)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-d)" }}
                >
                  {step.desc}
                </p>
              </motion.div>

              {/* Connector after each step except last */}
              {i < STEPS.length - 1 && <Connector i={i} reduced={reduced} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
