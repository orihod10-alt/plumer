"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Wrench,
  Sun,
  AlertTriangle,
  ShowerHead,
  Pipette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BlurText from "./BlurText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Project {
  index: string;
  title: string;
  city: string;
  img: string;
  FallbackIcon: LucideIcon;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "תיקון נזילה נסתרת",
    city: "רמת גן",
    img: "/gallery/leak.jpg",
    FallbackIcon: Droplets,
  },
  {
    index: "02",
    title: "החלפת ניאגרה",
    city: "תל אביב",
    img: "/gallery/cistern.jpg",
    FallbackIcon: Wrench,
  },
  {
    index: "03",
    title: "התקנת דוד שמש",
    city: "גבעתיים",
    img: "/gallery/heater.jpg",
    FallbackIcon: Sun,
  },
  {
    index: "04",
    title: "פתיחת סתימה",
    city: "פתח תקווה",
    img: "/gallery/drain.jpg",
    FallbackIcon: AlertTriangle,
  },
  {
    index: "05",
    title: "שדרוג חדר אמבטיה",
    city: "בני ברק",
    img: "/gallery/bathroom.jpg",
    FallbackIcon: ShowerHead,
  },
  {
    index: "06",
    title: "התקנת ברז ומטבח",
    city: "ראשון לציון",
    img: "/gallery/faucet.jpg",
    FallbackIcon: Pipette,
  },
];

/* ─── Fallback tile ─── */
function FallbackTile({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        background:
          "linear-gradient(135deg, rgba(14,15,18,0.9) 0%, rgba(30,22,18,0.95) 100%)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(194,104,58,0.15)", color: "var(--accent)" }}
      >
        <Icon size={24} aria-hidden="true" />
      </div>
      <p
        className="display text-sm font-bold text-center px-4 leading-tight"
        style={{ color: "var(--paper)" }}
      >
        {title}
      </p>
    </div>
  );
}

/* ─── Single tile ─── */
function GalleryTile({
  project,
  index,
  onClick,
  reducedMotion,
}: {
  project: Project;
  index: number;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={
        reducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      /* tile shell */
      className="aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={
        {
          borderColor: "rgba(20,21,26,0.1)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          "--tw-ring-color": "var(--accent)",
          "--tw-ring-offset-color": "var(--bg-light)",
        } as React.CSSProperties
      }
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${project.title}, ${project.city} — לחץ לצפייה`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* ── Photo or fallback ── */}
      {imgFailed ? (
        <FallbackTile icon={project.FallbackIcon} title={project.title} />
      ) : (
        <img
          src={project.img}
          alt={`${project.title} — ${project.city}`}
          width={900}
          height={1125}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover ${
            reducedMotion
              ? ""
              : "transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
          }`}
        />
      )}

      {/* ── Index number top-right (RTL start) ── */}
      <span
        className="absolute top-4 right-4 mono text-xs tracking-widest leading-none select-none pointer-events-none"
        style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-space-mono)" }}
        aria-hidden="true"
      >
        {project.index}
      </span>

      {/* ── Permanent bottom gradient ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "60%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
        }}
      />

      {/* ── Hover: amber glass veil ── */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
          style={{ background: "rgba(14,15,18,0.32)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
        />
      )}

      {/* ── Hover: "צפה בעבודה ←" pill ── */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          {/* Gradient-border wrapper */}
          <div
            style={{
              padding: "1.5px",
              borderRadius: "9999px",
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)",
              boxShadow: "0 0 20px rgba(194,104,58,0.4)",
            }}
          >
            <span
              className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(14,15,18,0.58)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "var(--paper)",
                fontFamily: "var(--font-assistant)",
              }}
            >
              צפה בעבודה ←
            </span>
          </div>
        </div>
      )}

      {/* ── Caption bottom-right, rises on hover ── */}
      <div
        className={`absolute bottom-4 right-4 text-right pointer-events-none ${
          reducedMotion
            ? ""
            : "transition-transform duration-300 group-hover:-translate-y-2"
        }`}
      >
        <p
          className="display font-bold leading-tight text-white pb-0.5"
          style={{ fontSize: "1rem", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
        >
          {project.title}
        </p>
        <p
          className="text-xs"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-assistant)",
          }}
        >
          {project.city}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({
  active,
  onClose,
  onPrev,
  onNext,
  reducedMotion,
}: {
  active: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  reducedMotion: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Reset fallback when photo changes
  useEffect(() => setImgFailed(false), [active]);

  const project = PROJECTS[active];

  return (
    <motion.div
      key="lightbox-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(8,9,11,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`תמונה: ${project.title}`}
    >
      {/* Image card */}
      <motion.div
        key={active}
        initial={reducedMotion ? {} : { opacity: 0, scale: 0.94, y: 18 }}
        animate={reducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? {} : { opacity: 0, scale: 0.94, y: 18 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
      >
        {imgFailed ? (
          <div className="aspect-[4/3]">
            <FallbackTile icon={project.FallbackIcon} title={project.title} />
          </div>
        ) : (
          <img
            src={project.img}
            alt={`${project.title} — ${project.city}`}
            width={1200}
            height={900}
            className="w-full h-auto object-cover"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Caption */}
        <div
          className="absolute bottom-0 inset-x-0 px-5 py-4"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)" }}
        >
          <p className="display font-bold text-lg text-white leading-tight pb-0.5">
            {project.title}
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            {project.city}
          </p>
        </div>

        {/* Index badge */}
        <span
          className="absolute top-4 right-4 mono text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-space-mono)" }}
          aria-hidden="true"
        >
          {project.index} / {String(PROJECTS.length).padStart(2, "0")}
        </span>

        {/* Close */}
        <button
          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
          onClick={onClose}
          aria-label="סגור"
        >
          <X size={16} />
        </button>
      </motion.div>

      {/* Prev / Next — outside card, on the sides */}
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white active:scale-95"
        style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="עבודה קודמת"
      >
        <ChevronRight size={20} />
      </button>
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white active:scale-95"
        style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="עבודה הבאה"
      >
        <ChevronLeft size={20} />
      </button>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i !== null ? (i - 1 + PROJECTS.length) % PROJECTS.length : null)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i !== null ? (i + 1) % PROJECTS.length : null)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") next();
      else if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <section
        id="gallery"
        className="py-24 px-4"
        style={{ background: "var(--bg-light)" }}
        aria-labelledby="gallery-heading"
      >
        <div className="max-w-6xl mx-auto">
          {/* ── Heading ── */}
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="mono text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
            >
              עבודות אחרונות
            </motion.p>
            <h2
              id="gallery-heading"
              className="display pb-2"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                color: "var(--ink)",
                lineHeight: 1.1,
              }}
            >
              <BlurText text="מה שאני משאיר מאחורי" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 text-sm max-w-sm mx-auto"
              style={{ color: "var(--muted-l)" }}
            >
              כל עבודה מסופקת נקייה, מסודרת, ועם אחריות.
            </motion.p>
          </div>

          {/* ── Uniform grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PROJECTS.map((project, i) => (
              <GalleryTile
                key={project.index}
                project={project}
                index={i}
                onClick={() => setActive(i)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active !== null && (
          <Lightbox
            active={active}
            onClose={close}
            onPrev={prev}
            onNext={next}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
