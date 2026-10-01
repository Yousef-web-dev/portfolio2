"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap, useGSAP, MOTION_OK, RESPECT_REDUCED_MOTION } from "@/lib/gsap";
const PHRASES = ["I craft fast, responsive interfaces.", "I turn ideas into motion.", "I write clean React code.", "I design for every screen."];
const TAGS = ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "REST APIs"];
const L = ({ children, className = "" }) => <span className={`mask ${className}`}><span className="hl block">{children}</span></span>;
export default function Hero() {
  const root = useRef(null); const imgRef = useRef(null); const [i, setI] = useState(0); const sys = useReducedMotion(); const reduce = RESPECT_REDUCED_MOTION && sys;
  // If the portrait failed to load before React attached onError, hide the broken image box.
  useEffect(() => { const im = imgRef.current; if (im && im.complete && im.naturalWidth === 0) im.parentElement.style.display = "none"; }, []);
  useEffect(() => { const t = setInterval(() => setI(n => (n + 1) % PHRASES.length), 3000); return () => clearInterval(t); }, []);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hl", { yPercent: 110, duration: 1.4, stagger: .15, delay: .3 })
        .fromTo(".hero-img", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(72% at 50% 50%)", duration: 1.6 }, "-=1.1")
        .from(".meta", { opacity: 0, y: 12, duration: .8, stagger: .1 }, "-=.9");
      const els = gsap.utils.toArray("[data-depth]").map(el => [gsap.quickTo(el, "x", { duration: .8 }), gsap.quickTo(el, "y", { duration: .8 }), +el.dataset.depth]);
      const mv = e => { const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5; els.forEach(([x, y, d]) => { x(nx * d); y(ny * d); }); };
      window.addEventListener("mousemove", mv); return () => window.removeEventListener("mousemove", mv);
    });
  }, { scope: root });
  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:justify-between md:pt-28">
      <div className="meta flex justify-between px-5 text-sm text-[var(--mute)] md:px-10"><span>Frontend Developer</span><span>Portfolio 2026</span></div>
      <div className="relative flex flex-1 flex-col justify-center px-5 md:block md:flex-none md:px-10">
        <h1 className="font-semibold uppercase leading-[.85] tracking-tighter whitespace-nowrap" data-depth="-16">
          <L className="text-[23vw] md:text-[19vw]">Yousef</L>
          <L className="text-[17vw] md:text-[15vw] text-transparent [-webkit-text-stroke:1.5px_var(--ink)] md:ml-[10vw]">Mohamed</L>
        </h1>
        <p className="meta mt-6 max-w-[17rem] text-sm leading-relaxed text-[var(--mute)] md:hidden">React, Next.js and motion. Interfaces that are fast, responsive and built with care.</p>
        <div className="hero-img ml-auto mt-8 h-[42vw] w-[42vw] overflow-hidden rounded-full md:absolute md:right-[10vw] md:top-[-4vh] md:mt-0 md:h-[34vw] md:max-h-[60vh] md:w-[34vw] md:max-w-[60vh]" data-depth="26">
          <img ref={imgRef} src="/me.jpg" alt="Portrait of Yousef Mohamed" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
        </div>
      </div>
      <div className="mt-auto md:mt-0">
        <div className="meta px-5 pb-8 md:px-10">
          <div className="h-[2.4em] overflow-hidden md:h-[1.2em] text-[1.75rem] md:text-[clamp(1.5rem,4.2vw,4.5rem)] font-light leading-[1.2]" aria-live="off">
            <AnimatePresence mode="wait">
              <motion.p key={i} initial={reduce ? { opacity: 0 } : { y: "100%" }} animate={reduce ? { opacity: 1 } : { y: 0 }} exit={reduce ? { opacity: 0 } : { y: "-100%" }} transition={{ duration: reduce ? .3 : .6, ease: [.76, 0, .24, 1] }}>{PHRASES[i]}</motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center gap-4"><div className="h-px flex-1 bg-[var(--mute)]/30"><motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 3, ease: "linear" }} className="block h-px origin-left bg-[var(--accent)]" /></div><span className="text-xs tabular-nums text-[var(--mute)]">{String(i + 1).padStart(2, "0")} / {String(PHRASES.length).padStart(2, "0")}</span></div>
        </div>
        <div className="meta mb-8 flex gap-3 px-5 md:hidden">
          <motion.a whileTap={{ scale: .95 }} href="#projects" className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--bg)]">View projects</motion.a>
          <motion.a whileTap={{ scale: .95 }} href="#contact" className="rounded-full border border-[var(--mute)]/50 px-6 py-3 text-sm">Contact me</motion.a>
        </div>
        <div aria-hidden className="meta overflow-hidden border-t border-[var(--mute)]/30 py-4">
          <div className="marquee flex w-max gap-12 whitespace-nowrap text-xl text-[var(--mute)] md:text-3xl">
            {Array(4).fill(TAGS).flat().map((t, k) => <span key={k} className="flex items-center gap-12">{t}<i className="h-2 w-2 rounded-full bg-[var(--accent)]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}