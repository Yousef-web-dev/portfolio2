"use client";
import { useEffect, useState } from "react";

// Returns the id of the section currently in the view.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    
    // توسيع الـ rootMargin قليلاً لضمان التقاط الأقسام التي تأتي بعد الـ Pin Sections مثل certificates
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      // التأكد من تفعيل آخر قسم (contact أو certificates) عند الوصول لنهاية الصفحة
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 20) {
        setActive(ids[ids.length - 1]);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => { 
      io.disconnect(); 
      window.removeEventListener("scroll", onScroll); 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}