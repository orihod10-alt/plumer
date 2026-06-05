"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Droplets, ArrowLeftRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Pair {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

const PAIR: Pair = {
  title: "שדרוג חדר האמבטיה",
  beforeSrc: "/gallery/before.jpg",
  afterSrc: "/gallery/after.jpg",
  beforeAlt: "חדר האמבטיה לפני השיפוץ",
  afterAlt: "חדר האמבטיה אחרי השיפוץ",
};

function FallbackPane({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        background: "linear-gradient(135deg, rgba(14,15,18,0.92), rgba(28,18,14,0.96))",
      }}
    >
      <Droplets size={32} style={{ color: "var(--accent)", opacity: 0.6 }} />
      <p className="text-sm font-semibold" style={{ color: "var(--muted-d)" }}>
        {label}
      </p>
    </div>
  );
}

export default function BeforeAfter() {
  const reduced = useReducedMotion() ?? false;
  const [pos, setPos] = useState(50);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hinted = useRef(false);

  /* ── Pointer drag ── */
  const toPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      dragging.current = true;
      containerRef.current?.setPointerCapture(e.pointerId);
      toPos(e.clientX);
    },
    [toPos]
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current) toPos(e.clientX);
    },
    [toPos]
  );
  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  /* ── Auto-sweep hint on first viewport entry ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;

    const lerp = (from: number, to: number, ms: number, cb?: () => void) => {
      const t0 = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const frame = (now: number) => {
        const p = Math.min((now - t0) / ms, 1);
        setPos(from + (to - from) * ease(p));
        if (p < 1) requestAnimationFrame(frame);
        else cb?.();
      };
      requestAnimationFrame(frame);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hinted.current) {
          hinted.current = true;
          setTimeout(() => lerp(50, 72, 650, () => setTimeout(() => lerp(72, 50, 500), 280)), 550);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section
      className="relative py-24 px-4 overflow-hidden blueprint-grid"
      style={{ background: "var(--bg-dark)" }}
      aria-labelledby="ba-heading"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[50vw] h-[30vh] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mono text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
          >
            לפני / אחרי
          </motion.p>
          <h2
            id="ba-heading"
            className="display pb-2"
            style={{
              fontSize: "clamp(2rem,5vw,3.2rem)",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            {PAIR.title}
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--muted-d)" }}>
            גרור את המפריד כדי להשוות
          </p>
        </div>

        {/* Slider */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="aspect-[16/10] rounded-2xl overflow-hidden relative select-none"
          style={{
            cursor: "col-resize",
            border: "1.5px solid rgba(255,255,255,0.08)",
            touchAction: "none",
          }}
          role="img"
          aria-label={`השוואת לפני/אחרי: ${PAIR.title}`}
        >
          {/* ── Before (bottom layer, full) ── */}
          <div className="absolute inset-0">
            {beforeFailed ? (
              <FallbackPane label={`לפני — ${PAIR.title}`} />
            ) : (
              <img
                src={PAIR.beforeSrc}
                alt={PAIR.beforeAlt}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                onError={() => setBeforeFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>

          {/* ── After (top layer, clipped) ── */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            {afterFailed ? (
              <FallbackPane label={`אחרי — ${PAIR.title}`} />
            ) : (
              <img
                src={PAIR.afterSrc}
                alt={PAIR.afterAlt}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                onError={() => setAfterFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>

          {/* ── Divider line ── */}
          <div
            className="absolute inset-y-0 w-[2px] pointer-events-none"
            style={{
              left: `${pos}%`,
              transform: "translateX(-50%)",
              background: "var(--accent)",
              boxShadow: "0 0 12px rgba(194,104,58,0.55)",
            }}
            aria-hidden="true"
          />

          {/* ── Handle ── */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center pointer-events-none"
            style={{
              left: `${pos}%`,
              transform: "translate(-50%, -50%)",
              background: "rgba(14,15,18,0.7)",
              border: "2px solid var(--accent)",
              boxShadow: "0 0 18px rgba(194,104,58,0.5)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            aria-hidden="true"
          >
            <ArrowLeftRight size={16} style={{ color: "var(--accent)" }} />
          </div>

          {/* ── Labels ── */}
          <div
            className="absolute bottom-3 right-4 pointer-events-none"
            style={{
              opacity: pos > 15 ? 1 : 0,
              transition: "opacity 0.3s",
            }}
            aria-hidden="true"
          >
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.55)",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              לפני
            </span>
          </div>
          <div
            className="absolute bottom-3 left-4 pointer-events-none"
            style={{
              opacity: pos < 85 ? 1 : 0,
              transition: "opacity 0.3s",
            }}
            aria-hidden="true"
          >
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(194,104,58,0.65)",
                color: "#fff",
                border: "1px solid rgba(194,104,58,0.4)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              אחרי
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
