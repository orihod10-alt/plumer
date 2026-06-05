"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["מהיר", "אמין", "מקצועי"];

export default function Loader() {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);
  const DURATION = 1100;

  useEffect(() => {
    // Only show on first visit
    const seen = sessionStorage.getItem("loader-seen");
    if (seen) { setDone(true); return; }

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      setCount(Math.round(progress * 100));
      const wIdx = Math.min(Math.floor(progress * words.length), words.length - 1);
      setWordIdx(wIdx);
      if (progress < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          sessionStorage.setItem("loader-seen", "1");
          setDone(true);
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-darker)" }}
          aria-hidden="true"
        >
          {/* Cycling word */}
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="display text-4xl mb-8"
              style={{ color: "var(--paper)" }}
            >
              {words[wordIdx]}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div
            className="relative w-48 h-[2px] rounded-full mb-4 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="absolute inset-y-0 right-0 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
                width: `${count}%`,
                left: 0,
              }}
            />
          </div>

          {/* Counter */}
          <span
            className="mono text-sm"
            style={{ color: "var(--muted-d)" }}
          >
            <span dir="ltr">{String(count).padStart(3, "0")}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
