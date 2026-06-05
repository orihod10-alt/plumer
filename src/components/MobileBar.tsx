"use client";

import { Phone, MessageCircle } from "lucide-react";

const PHONE_HREF = "tel:+972500000000";
const WA_HREF =
  "https://wa.me/972500000000?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94%20%D7%91%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%9C%D7%A6%D7%99%D7%94.";

export default function MobileBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 right-0 left-0 z-50 flex"
      style={{
        background: "rgba(8,9,11,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      role="navigation"
      aria-label="פעולות מהירות"
    >
      <a
        href={PHONE_HREF}
        className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-base transition-all active:opacity-80 active:scale-[0.97]"
        style={{ background: "var(--accent)", color: "#fff", minHeight: 60 }}
        aria-label="חייג עכשיו"
      >
        <Phone size={20} aria-hidden="true" />
        <span>חייג</span>
      </a>

      <div
        className="w-px self-stretch"
        style={{ background: "rgba(255,255,255,0.12)" }}
        aria-hidden="true"
      />

      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-base transition-all active:opacity-80 active:scale-[0.97]"
        style={{
          background: "rgba(8,9,11,0.97)",
          color: "#25D366",
          border: "none",
          minHeight: 60,
        }}
        aria-label="שלח וואטסאפ"
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span>וואטסאפ</span>
      </a>
    </div>
  );
}
