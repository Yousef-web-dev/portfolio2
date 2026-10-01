"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// PLACEHOLDER: replace each URL with your real profile link.
const LINKS = [
  { label: "Facebook", href: "https://facebook.com/YOUR_USERNAME", Icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/YOUR_USERNAME", Icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_USERNAME", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com/YOUR_USERNAME", Icon: FaInstagram },
  { label: "WhatsApp", href: "https://wa.me/YOUR_PHONE_NUMBER", Icon: FaWhatsapp },
  { label: "Email", href: "mailto:YOUR_EMAIL", Icon: FaEnvelope },
];
export default function SocialLinks() {
  return (
    <ul className="mt-24 flex flex-wrap gap-4 border-t border-[var(--mute)]/30 pt-8">
      {LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <motion.a href={href} target="_blank" rel="noreferrer" aria-label={label} whileHover={{ y: -4 }} whileTap={{ scale: .92 }}
            className="grid h-12 w-12 place-items-center rounded-full border border-[var(--mute)]/50 text-xl transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <Icon aria-hidden />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
