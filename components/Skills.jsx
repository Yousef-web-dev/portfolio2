"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiPostman, SiGithub, SiFigma, SiGreensock } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
const SKILLS = [["HTML / CSS", SiHtml5], ["JavaScript", SiJavascript], ["React", SiReact], ["Next.js", SiNextdotjs], ["Tailwind CSS", SiTailwindcss], ["REST APIs", SiPostman], ["Git / GitHub", SiGithub], ["Responsive Design", FaMobileAlt], ["UI / UX", SiFigma], ["GSAP / Framer Motion", SiGreensock]];
const INK = "#ece8e1", DARK = "#141416", MUTE = "#8a8782";
export default function Skills() {
  const root = useRef(null); const [hover, setHover] = useState(null);
  useGSAP(() => {
    gsap.set(".sk-bg", { scaleY: 0 });
    // Rows slide in from alternating sides, tied to the scroll position.
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.utils.toArray(".sk-row").forEach((row, i) => {
        gsap.fromTo(row, { x: i % 2 ? "12vw" : "-12vw", opacity: 0 }, { x: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: row, start: "top 98%", end: "top 70%", scrub: true } });
      });
    });
  }, { scope: root });
  const enter = (i, e) => {
    const r = e.currentTarget; setHover(i);
    gsap.set(r.querySelector(".sk-bg"), { transformOrigin: "bottom" });
    gsap.to(r.querySelector(".sk-bg"), { scaleY: 1, duration: .5, ease: "power3.out" });
    gsap.to(r.querySelector(".sk-name"), { x: 24, color: DARK, duration: .4, ease: "power3.out" });
    gsap.to(r.querySelector(".sk-num"), { color: DARK, duration: .3 });
  };
  const leave = e => {
    const r = e.currentTarget; setHover(null);
    gsap.set(r.querySelector(".sk-bg"), { transformOrigin: "top" });
    gsap.to(r.querySelector(".sk-bg"), { scaleY: 0, duration: .5, ease: "power3.inOut" });
    gsap.to(r.querySelector(".sk-name"), { x: 0, color: INK, duration: .4 });
    gsap.to(r.querySelector(".sk-num"), { color: MUTE, duration: .3 });
  };
  return (
    <section id="skills" ref={root} className="overflow-hidden px-5 py-32 md:px-10">
      <h2 className="mb-16 text-sm text-[var(--mute)]">What I work with</h2>
      <ul className="border-b border-[var(--mute)]/40">
        {SKILLS.map(([s, Icon], i) => (
          <li key={s} className="sk-row relative overflow-hidden border-t border-[var(--mute)]/40" tabIndex={0} onMouseEnter={e => enter(i, e)} onMouseLeave={leave} onFocus={e => enter(i, e)} onBlur={leave}>
            <div className="sk-bg absolute inset-0 bg-[var(--ink)]" />
            <div className="relative flex items-center gap-6 px-4 py-6 md:py-8">
              <span className="sk-num w-10 text-sm text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="sk-name text-[clamp(2rem,7vw,6rem)] font-semibold leading-none tracking-tight">{s}</span>
              <motion.span aria-hidden initial={false} animate={{ opacity: hover === i ? 1 : 0, x: hover === i ? 0 : -24, scale: hover === i ? 1 : .8 }} transition={{ duration: .35 }} className="ml-auto text-3xl text-[var(--bg)] md:text-5xl"><Icon /></motion.span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}