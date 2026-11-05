"use client";

import { useEffect, useRef } from "react";

/** Muted looping clip that only loads & plays while it's on screen. */
export default function InViewVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          v.preload = "auto";
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label} className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
