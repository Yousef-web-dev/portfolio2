"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
// Words light up one by one as the user scrolls.
// Only opacity changes (no movement), so it also runs when "reduce motion" is on.
export default function ScrollReveal({ text, className = "" }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.fromTo(".sr-w", { opacity: .15 }, { opacity: 1, stagger: .1, duration: .3, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 55%", scrub: true } });
  }, { scope: ref });
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => <span key={i} aria-hidden className="sr-w mr-[.25em] inline-block">{w}</span>)}
    </p>
  );
}