"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires up all GSAP scroll + hover animation across the page using
 * data-attributes, so the section markup stays declarative server-rendered JSX.
 */
export default function SiteAnimations() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const runIntro = () => {
        // Hero headline lines slide up
        gsap.to("[data-hero-line]", {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.1,
        });

        // Hero supporting elements
        gsap.to(".hero [data-fade]", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.5,
        });
      };

      // Generic scroll-reveal for everything tagged [data-fade] outside hero
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        if (el.closest(".hero")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Word-by-word reveal for the intro paragraph
      gsap.utils.toArray<HTMLElement>("[data-word-reveal]").forEach((el) => {
        const words = (el.textContent || "").trim().split(/\s+/);
        el.innerHTML = words
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}&nbsp;</span></span>`
          )
          .join("");
        gsap.to(el.querySelectorAll("span > span"), {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // Animated number counters
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count || "0");
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.v).toString();
              },
            });
          },
        });
      });

      // Subtle parallax drift on work cards
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: i % 2 === 0 ? 60 : 100 },
          {
            y: i % 2 === 0 ? -40 : -70,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Magnetic buttons / links
      const magnets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
      const cleanups: Array<() => void> = [];
      magnets.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const relX = e.clientX - (r.left + r.width / 2);
          const relY = e.clientY - (r.top + r.height / 2);
          xTo(relX * 0.4);
          yTo(relY * 0.4);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      // Run intro after the loader finishes — with a safety fallback so the
      // hero never stays hidden if the loader event is missed.
      let introRan = false;
      const startIntro = () => {
        if (introRan) return;
        introRan = true;
        runIntro();
      };
      window.addEventListener("loader:done", startIntro, { once: true });
      gsap.delayedCall(4, startIntro);

      ScrollTrigger.refresh();

      return () => cleanups.forEach((fn) => fn());
    });

    return () => ctx.revert();
  }, []);

  return null;
}
