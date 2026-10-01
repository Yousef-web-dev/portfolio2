"use client";
import { useRef } from "react";
import { gsap, useGSAP, RESPECT_REDUCED_MOTION } from "@/lib/gsap";
import {projects} from "@/data/projects"; // your existing 9 projects
// Expected fields: title, description, image, link, tech (array)
const DESKTOP = "(min-width:1024px)" + (RESPECT_REDUCED_MOTION ? " and (prefers-reduced-motion:no-preference)" : "");
const MOBILE = "(max-width:1023px)" + (RESPECT_REDUCED_MOTION ? " and (prefers-reduced-motion:no-preference)" : "");
export default function Projects() {
  const root = useRef(null), track = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop: vertical scroll drives a pinned horizontal gallery.
    mm.add(DESKTOP, () => {
      const dist = () => track.current.scrollWidth - innerWidth;
      const tween = gsap.to(track.current, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, scrub: 1, end: () => "+=" + dist(), invalidateOnRefresh: true } });
      const t = el => ({ trigger: el, containerAnimation: tween, scrub: true });
      gsap.utils.toArray(".pj-img").forEach(el => {
        gsap.fromTo(el, { clipPath: "inset(0 60% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { ...t(el), start: "left 90%", end: "left 40%" } });
        gsap.fromTo(el.querySelector("img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { ...t(el), start: "left 90%", end: "left 30%" } });
      });
      gsap.utils.toArray(".pj-title").forEach(el => gsap.fromTo(el, { x: 120 }, { x: -120, ease: "none", scrollTrigger: { ...t(el), start: "left right", end: "right left" } }));
    });
    // Phone / tablet: each project reveals as it scrolls into view.
    mm.add(MOBILE, () => {
      gsap.from(".pj-head", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".pj-head", start: "top 90%" } });
      gsap.utils.toArray(".pj-card").forEach(card => {
        const st = { trigger: card, start: "top 85%" };
        gsap.fromTo(card.querySelector(".pj-img"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out", scrollTrigger: st });
        gsap.from(card.querySelector(".pj-img img"), { scale: 1.35, duration: 1.8, ease: "expo.out", scrollTrigger: st });
        gsap.from(card.querySelectorAll(".pj-text"), { opacity: 0, y: 30, stagger: .1, duration: .9, delay: .25, ease: "expo.out", scrollTrigger: st });
      });
    });
  }, { scope: root });
  return (
    <section id="projects" ref={root} className="overflow-hidden">
      <div ref={track} className="flex flex-col gap-24 px-5 py-24 lg:h-screen lg:w-max lg:flex-row lg:items-start lg:gap-[8vw] lg:px-[8vw] lg:pb-0 lg:pt-[14vh]">
        <h2 className="pj-head text-[clamp(3rem,10vw,10rem)] font-semibold leading-[.85] tracking-tighter lg:w-[40vw] lg:shrink-0">Selected work</h2>
        {projects.map((p, i) => (
          <a key={p.title} href={p.link} target="_blank" rel="noreferrer" data-cursor="View" aria-label={`${p.title}, open project`} className="pj-card group block lg:w-[min(50vw,88vh)] lg:shrink-0">
            <p className="pj-text mb-3 text-sm text-[var(--mute)]">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
            <div className="pj-img aspect-[16/9] overflow-hidden bg-[var(--panel)]">
              <img src={p.img} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="pj-title pj-text mt-6 whitespace-nowrap text-[clamp(1.75rem,4.4vw,4.5rem)] font-semibold leading-tight tracking-tighter">{p.title}</h3>
            <p className="pj-text mt-3 line-clamp-3 max-w-md text-[var(--mute)]">{p.description}</p>
            <p className="pj-text mt-2 text-sm text-[var(--accent)]">{p.tech?.join(" / ")}</p>
          </a>
        ))}
      </div>
    </section>
  );
}