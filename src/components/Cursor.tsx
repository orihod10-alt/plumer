"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only on pointer-fine (desktop) devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;
    ring.style.display = "block";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);
      if (ring) {
        ring.style.transform = `translate(${current.current.x - 16}px, ${current.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden"
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1.5px solid var(--accent)",
        boxShadow: "0 0 8px rgba(194,104,58,0.4)",
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    />
  );
}
