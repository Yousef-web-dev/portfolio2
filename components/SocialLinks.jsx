"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// PLACEHOLDER: replace each URL with your real profile link.
const LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/share/1A3evSjr5r/", Icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/Yousef-web-dev", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yousef-mohamed-b824a2341", Icon: FaLinkedinIn },
  { label: "WhatsApp", href: "https://wa.me/01157700392", Icon: FaWhatsapp },
  { label: "Email", href: "mailto:yousefmohamed.2942003@gmail.com", Icon: FaEnvelope },
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
