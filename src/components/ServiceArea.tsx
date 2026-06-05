"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import BlurText from "./BlurText";

const cities = [
  "תל אביב", "גבעתיים", "רמת גן", "בני ברק",
  "פתח תקווה", "חולון", "בת ים", "אור יהודה",
  "יהוד", "אזור", "קרית אונו",
];

export default function ServiceArea() {
  return (
    <section
      id="service-area"
      className="py-24 px-4"
      style={{ background: "var(--bg-light)" }}
      aria-labelledby="area-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.55 }}
              className="mono text-xs uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              אזור שירות
            </motion.p>
            <h2
              id="area-heading"
              className="display pb-2 mb-4"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                color: "var(--ink)",
                lineHeight: 1.1,
              }}
            >
              <BlurText text="נותן שירות בתל אביב והסביבה" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--muted-l)" }}
            >
              מגיע לכל רחבי גוש דן וסביבתה — עם ציוד מלא על הרכב, מוכן לכל תרחיש.
              <br />
              לא צריך להמתין לטכנאי שיגיע מרחוק.
            </motion.p>

            {/* City chips */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-wrap gap-2"
            >
              {cities.map((city) => (
                <motion.span
                  key={city}
                  variants={{
                    hidden: { opacity: 0, scale: 0.88 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: "rgba(14,15,18,0.06)",
                    border: "1.5px solid var(--stroke-l)",
                    color: "var(--ink)",
                  }}
                >
                  <MapPin size={11} style={{ color: "var(--accent)" }} aria-hidden="true" />
                  {city}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right: embedded map */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ height: 360, border: "1.5px solid var(--stroke-l)" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=תל+אביב&output=embed&z=11"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="אזור שירות — תל אביב והסביבה"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
