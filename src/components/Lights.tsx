"use client";

import { useEffect, useRef, useState } from "react";

type Geo = { w: number; h: number; paths: string[]; bulbs: { x: number; y: number; delay: number }[] };

/** Swagged café string lights, redrawn to fit the width on resize. */
export default function Lights({
  swags = 4,
  sag = 60,
  top = 8,
  spacing = 46,
}: {
  swags?: number;
  sag?: number;
  top?: number;
  spacing?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const draw = () => {
      const w = ref.current?.clientWidth || window.innerWidth;
      const h = sag + top + 30;
      const n = Math.max(2, Math.round(swags * Math.min(1, w / 1200)) || 2);
      const seg = w / n;
      const paths: string[] = [];
      const bulbs: Geo["bulbs"] = [];
      let k = 0;
      for (let i = 0; i < n; i++) {
        const x0 = i * seg, x1 = x0 + seg, cx = x0 + seg / 2, cy = top + sag * 2;
        paths.push(`M${x0},${top} Q${cx},${cy} ${x1},${top}`);
        const count = Math.max(3, Math.floor(seg / spacing));
        for (let j = 1; j < count; j++) {
          const t = j / count;
          const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
          const y = (1 - t) * (1 - t) * top + 2 * (1 - t) * t * cy + t * t * top;
          bulbs.push({ x, y: y + 7, delay: (k++ * 0.37) % 4 });
        }
      }
      setGeo({ w, h, paths, bulbs });
    };
    draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(draw, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [swags, sag, top, spacing]);

  return (
    <svg
      ref={ref}
      className="lights"
      aria-hidden="true"
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      height={geo?.h}
    >
      {geo?.paths.map((d, i) => <path key={i} d={d} />)}
      {geo?.bulbs.map((b, i) => (
        <ellipse key={i} className="bulb" cx={b.x} cy={b.y} rx={4} ry={5.5} style={{ animationDelay: `${b.delay}s` }} />
      ))}
    </svg>
  );
}
