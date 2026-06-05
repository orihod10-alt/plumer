"use client";

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.032]"
      style={{ mixBlendMode: "overlay" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
