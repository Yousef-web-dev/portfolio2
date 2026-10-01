"use client";
// PLACEHOLDER: keep YOUR Navbar's design. Only copy the 3 marked lines into it.
import useActiveSection from "@/hooks/useActiveSection"; // (1)
const IDS = ["home", "about", "skills", "projects", "certificates", "contact"];
export default function Navbar() {
  const active = useActiveSection(IDS); // (2)
  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50 flex justify-center gap-6 p-5 text-sm mix-blend-difference">
      {IDS.map((id) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} // (3)
          className={`capitalize underline-offset-8 transition-opacity ${active === id ? "underline" : "opacity-60 hover:opacity-100"}`}>{id}</a>
      ))}
    </nav>
  );
}