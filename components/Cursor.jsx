"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
export default function Cursor() {
  const dot = useRef(null); const [label, setLabel] = useState(""); const [big, setBig] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const x = gsap.quickTo(dot.current, "x", { duration: .25 }), y = gsap.quickTo(dot.current, "y", { duration: .25 });
    const move = e => { x(e.clientX); y(e.clientY); };
    const over = e => { const t = e.target.closest?.("[data-cursor],a,button"); setLabel(t?.dataset?.cursor || ""); setBig(!!t); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[999] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-[var(--ink)] text-[var(--bg)] text-xs font-medium transition-[width,height] duration-300 mix-blend-difference ${label ? "h-24 w-24" : big ? "h-12 w-12" : "h-3 w-3"}`}>{label}</div>
    </div>
  );
}
