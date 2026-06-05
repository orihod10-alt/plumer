"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, BadgeCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BlurText from "./BlurText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Card {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const CARDS: Card[] = [
  {
    Icon: BadgeCheck,
    title: "אינסטלטור מוסמך ומורשה",
    body: "עובד עם רישיון בתוקף, בהתאם לתקנות מדינת ישראל ותקני הבטיחות.",
  },
  {
    Icon: ShieldCheck,
    title: "ביטוח אחריות צד ג'",
    body: "כל עבודה מבוצעת בביטוח מלא. אתה מוגן מכל צד.",
  },
  {
    Icon: Award,
    title: "אחריות מלאה על העבודה",
    body: "כל תיקון מגיע עם אחריות בכתב. תקלה חוזרת? חוזר ומתקן — ללא תוספת.",
  },
  {
    Icon: Clock,
    title: "18+ שנות ניסיון",
    body: "מעל לאלפיים עבודות בגוש דן. הכל ראיתי, הכל יודע לפתור.",
  },
];

export default function Credentials() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="py-24 px-4"
      style={{ background: "var(--bg-light)" }}
      aria-labelledby="cred-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mono text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
          >
            אחריות והסמכות
          </motion.p>
          <h2
            id="cred-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="למה אפשר לסמוך עליי" />
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={reduced ? {} : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
              whileHover={reduced ? {} : { y: -6, transition: { duration: 0.22 } }}
              className="relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1.5px solid rgba(20,21,26,0.07)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Shine sweep on reveal */}
              {!reduced && (
                <motion.div
                  initial={{ x: "130%", skewX: -18 }}
                  whileInView={{ x: "-160%" }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 + i * 0.1 }}
                  className="pointer-events-none absolute inset-y-0 w-1/2"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(194,104,58,0.1)",
                  color: "var(--accent)",
                }}
              >
                <card.Icon size={22} aria-hidden="true" />
              </div>

              {/* Title */}
              <h3
                className="font-bold text-base leading-snug"
                style={{ color: "var(--ink)", fontFamily: "var(--font-assistant)" }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="text-sm leading-relaxed mt-auto"
                style={{ color: "var(--muted-l)" }}
              >
                {card.body}
              </p>

              {/* Top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl"
                style={{ background: "var(--accent)", opacity: 0.6 }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
