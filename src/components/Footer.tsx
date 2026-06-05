"use client";

import { motion } from "framer-motion";
import { Droplets, Phone, Clock, MapPin, ArrowUp } from "lucide-react";

const PHONE = "050-000-0000";
const PHONE_HREF = "tel:+972500000000";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{ background: "var(--bg-darker)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      aria-label="פוטר"
    >
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets size={20} style={{ color: "var(--accent)" }} aria-hidden="true" />
              <span className="display font-bold text-lg" style={{ color: "var(--paper)" }}>
                שלומי אינסטלציה
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-d)" }}>
              אינסטלטור מוסמך ומנוסה. עובד בנקייה, עומד מאחורי כל עבודה.
            </p>
            <p className="mono text-xs" style={{ color: "var(--muted-d)" }}>
              רישיון <span dir="ltr">#12345</span>
            </p>
          </div>

          {/* Contact column */}
          <div>
            <p className="mono text-xs uppercase tracking-[0.12em] mb-4" style={{ color: "var(--accent)" }}>
              יצירת קשר
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "var(--muted-d)" }}
                aria-label={`חייג: ${PHONE}`}
              >
                <Phone size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
                <span className="mono" dir="ltr">{PHONE}</span>
              </a>
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-d)" }}>
                <Clock size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
                <span>זמין <span dir="ltr">24/7</span>, כולל שבתות</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-d)" }}>
                <MapPin size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
                <span>תל אביב וגוש דן</span>
              </div>
            </div>
          </div>

          {/* Quick links column */}
          <div>
            <p className="mono text-xs uppercase tracking-[0.12em] mb-4" style={{ color: "var(--accent)" }}>
              ניווט מהיר
            </p>
            <div className="flex flex-col gap-2">
              {[
                ["שירותים", "#services"],
                ["גלריה", "#gallery"],
                ["ביקורות", "#reviews"],
                ["אזור שירות", "#service-area"],
                ["צור קשר", "#cta"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "var(--muted-d)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-center sm:text-right" style={{ color: "var(--muted-d)" }}>
            © <span dir="ltr">2024</span> שלומי אינסטלציה · כל הזכויות שמורות
          </p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
            style={{ color: "var(--muted-d)", background: "none", border: "none", cursor: "pointer" }}
            aria-label="חזרה לראש הדף"
          >
            <ArrowUp size={13} aria-hidden="true" />
            חזרה למעלה
          </button>
        </div>
      </div>
    </footer>
  );
}
