"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, DollarSign, ShieldCheck } from "lucide-react";
import BlurText from "./BlurText";

const reasons = [
  {
    icon: Zap,
    title: "הגעה מהירה",
    desc: "זמין 7 ימים בשבוע, כולל שבתות וחגים. מגיע לפני שהנזק מתרחב.",
  },
  {
    icon: Sparkles,
    title: "עבודה נקייה ומסודרת",
    desc: "עוזב את הבית כפי שמצאתי אותו. מגיע עם בגדי עבודה, מגן על הריצפה, מנקה אחרי.",
  },
  {
    icon: DollarSign,
    title: "מחיר שקוף מראש",
    desc: "לא מחיר-הפתעה בסוף. מציג הצעת מחיר לפני שמתחיל — ועומד בה.",
  },
  {
    icon: ShieldCheck,
    title: "אחריות מלאה",
    desc: "כל עבודה מגובה באחריות. תקלה חוזרת? חוזר ומתקן — ללא תוספת תשלום.",
  },
];

export default function WhyMe() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
      aria-labelledby="why-heading"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full blur-[100px] opacity-10"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55 }}
            className="mono text-xs uppercase tracking-[0.15em] mb-3"
            style={{ color: "var(--accent)" }}
          >
            למה לבחור בי
          </motion.p>
          <h2
            id="why-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="אינסטלטור שעומד מאחורי העבודה שלו" />
          </h2>
        </div>

        {/* Chess rows */}
        <div className="flex flex-col gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="flex flex-col sm:flex-row items-center gap-6 p-7 rounded-2xl liquid-glass"
            >
              {/* Icon */}
              <div
                className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{
                  background: "rgba(194,104,58,0.15)",
                  border: "1.5px solid rgba(194,104,58,0.3)",
                  color: "var(--accent)",
                }}
              >
                <reason.icon size={30} aria-hidden="true" />
              </div>

              {/* Text */}
              <div className="flex-1 text-center sm:text-start">
                <h3
                  className="font-bold text-xl mb-2 display"
                  style={{ color: "var(--paper)" }}
                >
                  {reason.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted-d)" }}>
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
