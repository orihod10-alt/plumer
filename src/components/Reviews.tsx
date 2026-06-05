"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import BlurText from "./BlurText";

const reviews = [
  {
    text: "שלומי הגיע תוך פחות מחצי שעה, תיקן את הנזילה בצינור שמאחורי הקיר — ולא השאיר אחריו אף פיסת לכלוך. מקצועי, ידידותי, ומחיר הוגן.",
    name: "מיכל ר.",
    city: "תל אביב",
  },
  {
    text: "התקשרתי בשעה אחת בלילה בגלל סתימה חמורה. שלומי ענה מיד, הגיע תוך 40 דקות וטיפל בהכל. לא האמנתי שיהיה שירות כזה בשעות כאלה.",
    name: "יוסי ב.",
    city: "גבעתיים",
  },
  {
    text: "התקנת דוד שמש חדש, כולל כל החיבורים. עבד בסדר ובדייקנות, הסביר כל שלב, ומחיר שסוכם מראש — בלי הפתעות. ממליץ בחום.",
    name: "אורנה ד.",
    city: "בני ברק",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="דירוג 5 כוכבים">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" aria-hidden="true" />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative py-24 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
      aria-labelledby="reviews-heading"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[50vw] h-[30vh] rounded-full blur-[100px] opacity-10"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55 }}
            className="mono text-xs uppercase tracking-[0.15em] mb-3"
            style={{ color: "var(--accent)" }}
          >
            מה הלקוחות אומרים
          </motion.p>
          <h2
            id="reviews-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="ביקורות לקוחות" />
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="liquid-glass rounded-2xl p-6 flex flex-col gap-4"
            >
              <Stars />
              <p
                className="text-sm leading-relaxed flex-1 italic"
                style={{ color: "var(--muted-d)" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(194,104,58,0.2)", color: "var(--accent)" }}
                  aria-hidden="true"
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--paper)" }}>
                    {review.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-d)" }}>
                    {review.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
