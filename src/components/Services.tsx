"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Waves,
  Sun,
  Wrench,
  ShowerHead,
  Toilet,
} from "lucide-react";
import BlurText from "./BlurText";

const services = [
  {
    icon: AlertTriangle,
    title: "סתימות דחופות",
    desc: "פתיחת סתימות בכיור, מקלחת, שירותים ותיעול — עם ציוד מקצועי, מהר ובנקייה.",
  },
  {
    icon: Waves,
    title: "נזילות ותיקונים",
    desc: "איתור ותיקון נזילות נסתרות וגלויות. מניעת נזק לרכוש לפני שמאוחר מדי.",
  },
  {
    icon: Sun,
    title: "דודי שמש וחשמל",
    desc: "התקנה, תיקון והחלפה של דודי שמש וחשמל. עם כל האישורים הנדרשים.",
  },
  {
    icon: Wrench,
    title: "אינסטלציה כללית",
    desc: "התקנת ברזים, מיקסרים, מד-מים, קווי מים — עבודה מסודרת עם חלקים איכותיים.",
  },
  {
    icon: ShowerHead,
    title: "שיפוצי אמבטיה",
    desc: "שדרוג חדר מקלחת או אמבטיה — אינסטלציה שלמה ממקור אחד, עם תיאום ספקים.",
  },
  {
    icon: Toilet,
    title: "ניאגרות ואסלות",
    desc: "תיקון והחלפת ניאגרות, צינורות גמישים ואסלות — כולל דגמי קיר ותלייה.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-4"
      style={{ background: "var(--bg-light)" }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-5xl mx-auto">
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
            מה אני עושה
          </motion.p>
          <h2
            id="services-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            <BlurText text="השירותים שלי" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-4 max-w-lg mx-auto text-base"
            style={{ color: "var(--muted-l)" }}
          >
            כל תקלה מטופלת בידיים מקצועיות, בציוד הנכון, במחיר שסוכם מראש.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 cursor-default"
              style={{
                background: "rgba(20,21,26,0.035)",
                border: "1.5px solid var(--stroke-l)",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(194,104,58,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--stroke-l)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ background: "rgba(194,104,58,0.12)", color: "var(--accent)" }}
              >
                <service.icon size={22} aria-hidden="true" />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "var(--ink)", fontFamily: "var(--font-assistant)" }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-l)" }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
