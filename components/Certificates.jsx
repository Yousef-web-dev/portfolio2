"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
const CERTS = [["2025", "Administrative Information Systems"], ["2025", "English course"], ["2026", "EraSoft Course Completion"], ["2026", "EraSoft Bootcamp Completion"]];
export default function Certificates() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // The vertical spine fills as you scroll through the timeline.
      gsap.fromTo(".ct-spine", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ct-list", start: "top 65%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray(".ct-item").forEach((item, i) => {
        const st = { trigger: item, start: "top 70%" };
        const year = item.querySelector(".ct-year"), end = +year.dataset.year, o = { v: end - 12 };
        year.textContent = o.v;
        gsap.to(o, { v: end, duration: 1.4, ease: "power3.out", snap: { v: 1 }, onUpdate: () => (year.textContent = Math.round(o.v)), scrollTrigger: st });
        gsap.from(item.querySelector(".ct-dot"), { scale: 0, duration: .6, ease: "back.out(3)", scrollTrigger: st });
        gsap.from(item.querySelector(".ct-title"), { opacity: 0, x: i % 2 ? 50 : -50, duration: 1, ease: "expo.out", scrollTrigger: st });
        gsap.fromTo(item.querySelector(".ct-body"), { opacity: .25 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 80%", end: "top 55%", scrub: true } });
      });
    });
  }, { scope: root });
  return (
    <section id="certificates" ref={root} className="overflow-hidden px-5 py-32 md:px-10">
      <h2 className="mb-16 text-sm text-[var(--mute)]">Learning timeline</h2>
      <div className="ct-list relative mx-auto max-w-5xl">
        <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-[var(--mute)]/25 md:left-1/2" />
        <div aria-hidden className="ct-spine absolute left-4 top-0 h-full w-px origin-top bg-[var(--accent)] md:left-1/2" />
        {CERTS.map(([y, t], i) => (
          <div key={t} className="ct-item relative grid gap-x-16 py-14 pl-12 md:grid-cols-2 md:pl-0">
            <span aria-hidden className="ct-dot absolute left-4 top-[4.9rem] -ml-[6px] h-3 w-3 rounded-full bg-[var(--accent)] md:left-1/2" />
            <div className={`ct-body ${i % 2 ? "md:col-start-2" : "md:pr-8 md:text-right"}`}>
              <p data-year={y} className="ct-year text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-none tracking-tighter tabular-nums">{y}</p>
              <p className="ct-title mt-4 text-xl md:text-3xl">{t}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}