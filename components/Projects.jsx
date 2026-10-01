"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {projects} from "@/data/projects"; // your existing 9 projects
// Expected fields: title, description, image, link, tech (array)
export default function Projects() {
  const root = useRef(null), track = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add("(min-width:1024px) and (prefers-reduced-motion:no-preference)", () => {
      const dist = () => track.current.scrollWidth - innerWidth;
      const tween = gsap.to(track.current, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, scrub: 1, end: () => "+=" + dist(), invalidateOnRefresh: true } });
      const t = el => ({ trigger: el, containerAnimation: tween, scrub: true });
      gsap.utils.toArray(".pj-img").forEach(el => {
        gsap.fromTo(el, { clipPath: "inset(0 60% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { ...t(el), start: "left 90%", end: "left 40%" } });
        gsap.fromTo(el.querySelector("img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { ...t(el), start: "left 90%", end: "left 30%" } });
      });
      gsap.utils.toArray(".pj-title").forEach(el => gsap.fromTo(el, { x: 120 }, { x: -120, ease: "none", scrollTrigger: { ...t(el), start: "left right", end: "right left" } }));
    });
  }, { scope: root });
  return (
    <section id="projects" ref={root} className="overflow-hidden">
      <div ref={track} className="flex flex-col gap-24 px-5 py-24 lg:h-screen lg:w-max lg:flex-row lg:items-start lg:gap-[8vw] lg:px-[8vw] lg:pb-0 lg:pt-[14vh]">
        <h2 className="text-[clamp(3rem,10vw,10rem)] font-semibold leading-[.85] tracking-tighter lg:w-[40vw] lg:shrink-0">Selected work</h2>
        {projects.map((p, i) => (
          <a key={p.title} href={p.link} target="_blank" rel="noreferrer" data-cursor="View" aria-label={`${p.title}, open project`} className="group block lg:w-[min(50vw,88vh)] lg:shrink-0">
            <p className="mb-3 text-sm text-[var(--mute)]">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
            <div className="pj-img aspect-[16/9] overflow-hidden bg-[var(--panel)]">
              <img src={p.img} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="pj-title mt-6 whitespace-nowrap text-[clamp(1.75rem,4.4vw,4.5rem)] font-semibold leading-tight tracking-tighter">{p.title}</h3>
            <p className="mt-3 line-clamp-3 max-w-md text-[var(--mute)]">{p.description}</p>
            <p className="mt-2 text-sm text-[var(--accent)]">{p.tech?.join(" / ")}</p>
          </a>
        ))}
      </div>
    </section>
  );
}