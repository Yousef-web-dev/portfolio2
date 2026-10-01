"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import ScrollReveal from "@/components/ScrollReveal";

// احذف سطر الـ import بتاع myPhoto تماماً من هنا

const INFO = [["Role", "Frontend Developer"], ["Focus", "React & Next.js"], ["Motion", "GSAP & Framer Motion"], ["Studied", "Administrative Information Systems"]];

export default function About() {
  const root = useRef(null);
  
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(".ab-img", { clipPath: "inset(18% 18% 18% 18% round 300px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: ".ab-wrap", start: "top 85%", end: "center 45%", scrub: true } });
      gsap.fromTo(".ab-img img", { scale: 1.4 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ab-wrap", start: "top 85%", end: "bottom 30%", scrub: true } });
      gsap.utils.toArray(".ab-row").forEach(r => {
        const st = { trigger: r, start: "top 88%" };
        gsap.from(r.querySelector(".ab-line"), { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out", scrollTrigger: st });
        gsap.from(r.querySelectorAll(".ab-in"), { yPercent: 110, stagger: .1, duration: 1, ease: "expo.out", scrollTrigger: st });
      });
    });
  }, { scope: root });

  return (
    <section id="about" ref={root} className="px-5 py-32 md:px-10">
      <p className="mb-10 text-sm text-[var(--mute)]">About me</p>
      <ScrollReveal className="max-w-6xl text-[clamp(2rem,5.5vw,5.5rem)] font-semibold leading-[1.05] tracking-tight"
        text="I'm Yousef, a frontend developer who builds modern, responsive and interactive web experiences with React, Next.js and modern frontend technologies." />
      <div className="ab-wrap mt-32 grid items-start gap-12 md:grid-cols-12">
        <div className="md:sticky md:top-24 md:col-span-5">
          <div className="ab-img aspect-[4/5] overflow-hidden bg-[var(--panel)]">
            {/* استخدام المسار المباشر مع التأكد من اسم الملف myphoto.jpg بحروف صغيرة */}
            <img 
              src="/images/myphoto.jpg" 
              alt="Yousef Mohamed working" 
              loading="lazy" 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {INFO.map(([k, v]) => (
            <div key={k} className="ab-row"><div className="ab-line h-px bg-[var(--mute)]/40" />
              <div className="py-8"><span className="mask text-sm text-[var(--mute)]"><span className="ab-in block">{k}</span></span>
                <span className="mask mt-2 text-3xl font-light md:text-5xl"><span className="ab-in block">{v}</span></span></div></div>
          ))}
          <ScrollReveal className="mt-16 text-xl leading-snug md:text-3xl" text="Every project is a chance to combine clean code with motion that has a purpose." />
        </div>
      </div>
    </section>
  );
}