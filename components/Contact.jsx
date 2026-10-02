"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SocialLinks from "@/components/SocialLinks";
const WHATSAPP_NUMBER = "01157700392"; // digits only, with country code
const FIELDS = [
  ["name", "Name", "text"],
  ["email", "Email", "email"],
  ["subject", "Subject", "text"],
  ["message", "Message", "textarea"],
];
const EMPTY = { name: "", email: "", subject: "", message: "" };
export default function Contact() {
  const root = useRef(null),
    btn = useRef(null);
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle");
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // The two headline lines slide toward each other as the section comes into view.
        gsap.fromTo(
          ".ct-h",
          { x: (i) => (i ? "10vw" : "-10vw"), opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
        gsap.from(".ct-f", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-form", start: "top 80%" },
        });
        gsap.from(".ct-line", {
          scaleX: 0,
          transformOrigin: "left",
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-form", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );
  // Magnetic button: it leans toward the pointer.
  const pull = (e) => {
    const r = btn.current.getBoundingClientRect();
    gsap.to(btn.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const release = () =>
    gsap.to(btn.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1,.4)",
    });

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!v.name.trim()) x.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = "Enter a valid email address.";
    if (!v.subject.trim()) x.subject = "Enter a subject.";
    if (v.message.trim().length < 10) x.message = "Write at least 10 characters.";
    setErr(x);
    if (Object.keys(x).length) return;
    setState("loading");
    const text = `Hi Yousef,\nName: ${v.name}\nEmail: ${v.email}\nSubject: ${v.subject}\n\n${v.message}`;
    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener",
      );
      setState("done");
    }, 700);
  };
  const reset = () => {
    setV(EMPTY);
    setErr({});
    setState("idle");
  };
  return (
    <section
      id="contact"
      ref={root}
      className="overflow-hidden px-5 pb-20 pt-32 md:px-10"
    >
      <h2 className="font-semibold leading-[.88] tracking-tighter text-[clamp(3rem,12vw,12rem)]">
        <span className="ct-h block">Let's build</span>
        <span className="ct-h block text-[var(--mute)]">something.</span>
      </h2>
      <div className="mt-20 grid gap-12 md:grid-cols-12">
        <p className="text-lg text-[var(--mute)] md:col-span-4">
          Have a project or an idea? Fill in the form and your message opens in
          WhatsApp, ready to send.
        </p>
        <div className="ct-form md:col-span-7 md:col-start-6">
          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.div
                key="ok"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-6"
              >
                <motion.svg
                  width="56"
                  height="56"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                >
                  <motion.path
                    d="M10 25l9 9 19-20"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.svg>
                <p className="mt-6 text-3xl">Message prepared successfully.</p>
                <p className="mt-2 text-[var(--mute)]">
                  WhatsApp should have opened with your text. Press send there
                  to deliver it.
                </p>
                <motion.button
                  onClick={reset}
                  whileHover={{ x: 4 }}
                  className="mt-8 border-b border-[var(--ink)] pb-1"
                >
                  Write another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                onSubmit={submit}
                noValidate
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {FIELDS.map(([k, label, type]) => {
                  const P = type === "textarea" ? "textarea" : "input";
                  return (
                    <div key={k} className="ct-f">
                      <label htmlFor={k} className="text-sm text-[var(--mute)]">
                        {label}
                      </label>
                      <div className="relative">
                        <P
                          id={k}
                          name={k}
                          type={type === "textarea" ? undefined : type}
                          rows={type === "textarea" ? 3 : undefined}
                          value={v[k]}
                          onChange={(e) => setV({ ...v, [k]: e.target.value })}
                          aria-invalid={!!err[k]}
                          aria-describedby={err[k] ? k + "-e" : undefined}
                          className="peer w-full resize-none bg-transparent py-3 text-2xl outline-none"
                        />  
                        <span
                          aria-hidden
                          className="ct-line absolute bottom-0 left-0 h-px w-full bg-[var(--mute)]/50"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 peer-focus:scale-x-100"
                        />
                      </div>
                      {err[k] && (
                        <motion.p
                          id={k + "-e"}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-[var(--accent)]"
                        >
                          {err[k]}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
                <button
                  ref={btn}
                  onMouseMove={pull}
                  onMouseLeave={release}
                  disabled={state === "loading"}
                  aria-label="Send message via WhatsApp"
                  className="ct-f grid h-32 w-32 place-items-center rounded-full bg-[var(--ink)] text-[var(--bg)] disabled:opacity-60 md:ml-auto"
                >
                  <motion.span
                    key={state}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-medium"
                  >
                    {state === "loading" ? "Preparing…" : "Send"}
                  </motion.span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
      <SocialLinks />
    </section>
  );
}
