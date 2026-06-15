"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Custom trailing cursor that grows over interactive elements. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const ringEl = ring.current!;
    const dotEl = dot.current!;

    const xRing = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dotEl, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dotEl, "y", { duration: 0.1, ease: "power3" });

    const move = (e: PointerEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const over = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) {
        ringEl.classList.add("is-hover");
      }
    };
    const out = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) {
        ringEl.classList.remove("is-hover");
      }
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
