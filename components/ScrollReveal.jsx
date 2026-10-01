"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
// Words light up one by one as the user scrolls.
export default function ScrollReveal({ text, className = "" }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(".sr-w", { opacity: .15 }, { opacity: 1, stagger: .1, duration: .4, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 50%", scrub: true } });
    });
  }, { scope: ref });
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => <span key={i} aria-hidden className="sr-w mr-[.25em] inline-block">{w}</span>)}
    </p>
  );
}
