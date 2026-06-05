"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({ text, className = "", delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.085,
          }}
          style={{ display: "inline-block", marginInlineEnd: "0.22em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
