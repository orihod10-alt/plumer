"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

const stats = [
  { target: 18, suffix: "+", label: "שנות ניסיון" },
  { target: 2400, suffix: "+", label: "עבודות שבוצעו" },
  { target: 5.0, suffix: "★", label: "דירוג לקוחות" },
  { target: 35, suffix: "′", label: "זמן הגעה ממוצע" },
];

export default function TrustStrip() {
  return (
    <section
      className="relative overflow-hidden py-16 px-4"
      style={{ background: "var(--bg-darker)" }}
      aria-label="נתוני אמון"
    >
      {/* Accent line top */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span
              className="mono font-bold leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "var(--accent)" }}
            >
              <CountUp target={stat.target} suffix={stat.suffix} />
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--muted-d)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Accent line bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
    </section>
  );
}
