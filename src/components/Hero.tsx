"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Droplets, CheckCircle2 } from "lucide-react";
import BlurText from "./BlurText";

const PHONE = "050-000-0000";
const PHONE_HREF = "tel:+972500000000";
const WA_HREF =
  "https://wa.me/972500000000?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94%20%D7%91%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%9C%D7%A6%D7%99%D7%94.";

const trustItems = [
  "מוסמך ומורשה",
  "מבוטח",
  "זמין 24/7",
  "אחריות על העבודה",
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeRise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Amber glow behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[70vw] max-w-[700px] h-[50vh] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      {/* Top & bottom readability gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, rgba(14,15,18,1), transparent)" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-28 pb-16 flex flex-col items-center text-center gap-6">

        {/* Announcement pill */}
        <motion.div {...fadeRise(0)}>
          <div
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
            style={{ color: "var(--accent)", border: "1px solid rgba(194,104,58,0.3)" }}
          >
            <Droplets size={14} aria-hidden="true" />
            <span>אינסטלטור מוסמך · זמין <span dir="ltr">24/7</span></span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          className="display w-full leading-[1.1] pb-2"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5.25rem)",
            letterSpacing: "-0.015em",
            color: "var(--paper)",
          }}
        >
          <BlurText text="נזילה? סתימה?" delay={0.05} />
          <br />
          <span style={{ color: "var(--accent)" }}>
            <BlurText text="אני אצלך מהר." delay={0.22} />
          </span>
        </h1>

        {/* Subhead */}
        <motion.p
          {...fadeRise(0.32)}
          className="max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--muted-d)" }}
        >
          מוסמך, מבוטח, מגיע מהר — ומחיר הוגן שסוכם מראש.
          <br className="hidden sm:block" />
          כי תקלת אינסטלציה לא מחכה.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeRise(0.42)}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <a
            href={PHONE_HREF}
            className="glow-pulse flex items-center justify-center gap-2 w-full sm:w-auto font-bold text-base rounded-full px-8 py-4 transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "#fff", minWidth: 220 }}
            aria-label={`חייג עכשיו: ${PHONE}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span>חייג עכשיו</span>
            <span className="mono text-sm opacity-80" dir="ltr">{PHONE}</span>
          </a>

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass flex items-center justify-center gap-2 w-full sm:w-auto font-semibold text-base rounded-full px-8 py-4 transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            style={{ color: "var(--paper)", border: "1px solid rgba(255,255,255,0.18)", minWidth: 180 }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>וואטסאפ</span>
          </a>
        </motion.div>

        {/* Trust micro-row */}
        <motion.div
          {...fadeRise(0.54)}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-2"
          style={{ color: "var(--muted-d)" }}
        >
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-sm">
              <CheckCircle2 size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-[1px] h-12 opacity-30" style={{ background: "linear-gradient(to bottom, transparent, var(--accent))" }} />
          <div
            className="w-4 h-4 rounded-full opacity-50"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
