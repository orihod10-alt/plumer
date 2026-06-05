"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const PHONE = "050-000-0000";
const PHONE_HREF = "tel:+972500000000";
const WA_HREF =
  "https://wa.me/972500000000?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94%20%D7%91%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%9C%D7%A6%D7%99%D7%94.";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative py-28 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-darker)" }}
      aria-labelledby="cta-heading"
    >
      {/* Big copper glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[80vw] max-w-[800px] h-[60vh] rounded-full blur-[130px] opacity-25"
          style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 65%)" }}
        />
      </div>

      {/* Accent line top */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mono text-xs uppercase tracking-[0.15em]"
          style={{ color: "var(--accent)" }}
        >
          זמין עכשיו
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          id="cta-heading"
          className="display pb-2"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
            lineHeight: 1.1,
            color: "var(--paper)",
          }}
        >
          צריך אינסטלטור עכשיו?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg max-w-md"
          style={{ color: "var(--muted-d)" }}
        >
          מגיע עד <span className="mono" dir="ltr">35</span> דקות. עונה בשיחה, לא בבוט.
        </motion.p>

        {/* Big phone number */}
        <motion.a
          href={PHONE_HREF}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mono font-bold leading-none transition-all duration-200 hover:scale-[1.04]"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            color: "var(--accent)",
            letterSpacing: "0.04em",
            textShadow: "0 0 40px rgba(194,104,58,0.4)",
          }}
          aria-label={`חייג עכשיו: ${PHONE}`}
          dir="ltr"
        >
          {PHONE}
        </motion.a>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <a
            href={PHONE_HREF}
            className="glow-pulse flex items-center justify-center gap-2 w-full sm:w-auto font-bold text-base rounded-full px-10 py-4 transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "#fff", minWidth: 200 }}
          >
            <Phone size={18} aria-hidden="true" />
            <span>חייג עכשיו</span>
          </a>

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass flex items-center justify-center gap-2 w-full sm:w-auto font-semibold text-base rounded-full px-10 py-4 transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            style={{ color: "var(--paper)", border: "1px solid rgba(255,255,255,0.18)", minWidth: 180 }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>וואטסאפ</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.45 }}
          className="text-xs mt-2"
          style={{ color: "var(--muted-d)" }}
        >
          ✓ ללא עלות ייעוץ · ✓ הצעת מחיר לפני עבודה · ✓ זמין <span dir="ltr">24/7</span>
        </motion.p>
      </div>
    </section>
  );
}
