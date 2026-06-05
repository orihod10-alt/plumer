"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BlurText from "./BlurText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const QUESTIONS = [
  {
    q: "כמה עולה ביקור?",
    a: "ביקור האבחון הוא ללא עלות. תשלום רק עבור העבודה שבוצעה, לאחר שתאשר את הצעת המחיר.",
  },
  {
    q: "מגיע גם בשבת ובמצבי חירום?",
    a: 'כן. זמין 24/7, כולל שבתות וחגים. תקלת אינסטלציה לא בוחרת שעות — ואני גם לא.',
  },
  {
    q: "תוך כמה זמן מגיעים?",
    a: 'בממוצע עד 35 דקות לגוש דן. בתקלות חירום (נזילה פעילה, סתימה חמורה) — עדיפות ראשונה.',
  },
  {
    q: "יש אחריות על העבודה?",
    a: "כן. כל תיקון מגיע עם אחריות בכתב. תקלה חוזרת תוך תקופת האחריות — חוזר ומתקן ללא תוספת תשלום.",
  },
  {
    q: "נותן הצעת מחיר מראש?",
    a: "תמיד. לא מתחיל לעבוד לפני שמציג מחיר ברור ומקבל אישורך. בלי הפתעות בסוף.",
  },
  {
    q: "באילו אזורים אתה עובד?",
    a: "תל אביב, גבעתיים, רמת גן, בני ברק, פתח תקווה, חולון, בת ים, אור יהודה וכל גוש דן.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="faq"
      className="py-24 px-4"
      style={{ background: "var(--bg-light)" }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
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
            שאלות נפוצות
          </motion.p>
          <h2
            id="faq-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem,5vw,3.2rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="מה רוצים לדעת?" />
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: isOpen
                    ? "1.5px solid rgba(194,104,58,0.4)"
                    : "1.5px solid rgba(20,21,26,0.07)",
                  boxShadow: isOpen
                    ? "0 4px 20px rgba(194,104,58,0.1)"
                    : "0 1px 8px rgba(0,0,0,0.04)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
              >
                {/* Question row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right cursor-pointer"
                  style={{ background: "none", border: "none" }}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-sm sm:text-base leading-snug flex-1"
                    style={{
                      color: isOpen ? "var(--ink)" : "var(--ink)",
                      fontFamily: "var(--font-assistant)",
                    }}
                  >
                    {item.q}
                  </span>

                  {/* +/× icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                    className="shrink-0 text-xl leading-none font-light"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer — smooth height transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: reduced ? 0 : 0.32, ease: EASE },
                        opacity: { duration: reduced ? 0 : 0.22 },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="px-5 pb-5 pt-1 text-sm leading-relaxed"
                        style={{ color: "var(--muted-l)" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
