"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import useActiveSection from "@/hooks/useActiveSection";
const IDS = ["home", "about", "skills", "projects", "certificates", "contact"];
export default function Navbar() {
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  // Menu open: lock scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  // Close the mobile menu if the screen grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const h = () => mq.matches && setOpen(false);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <>
      {/* Desktop: unchanged look */}
      <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50 hidden justify-center gap-6 p-5 text-sm mix-blend-difference md:flex">
        {IDS.map((id) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
            className={`capitalize underline-offset-8 transition-opacity ${active === id ? "underline" : "opacity-60 hover:opacity-100"}`}>{id}</a>
        ))}
      </nav>

      {/* Mobile: brand + menu button */}
      <a href="#home" className="fixed left-5 top-6 z-[70] text-sm font-medium md:hidden">Yousef Mohamed</a>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
        className="fixed right-5 top-4 z-[70] grid h-11 w-11 place-items-center rounded-full border border-[var(--mute)]/40 bg-[var(--bg)]/70 text-xl backdrop-blur md:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "m"} initial={{ rotate: -90 * d, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90 * d, opacity: 0 }} transition={{ duration: .2 * d }} className="grid place-items-center">
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile"
            initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: .7 * d, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-center gap-3 bg-[var(--bg)] px-8 md:hidden">
            {IDS.map((id, i) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? "true" : undefined}
                initial={{ y: 40 * d, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: (.25 + i * .06) * d, duration: .5 * d }}
                className={`flex items-center gap-4 text-5xl font-semibold capitalize tracking-tight ${active === id ? "text-[var(--accent)]" : ""}`}>
                {active === id && <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--accent)]" />}{id}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}