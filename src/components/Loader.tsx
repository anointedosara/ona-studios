"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** Counting pre-loader that wipes away to reveal the page. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current)
          countRef.current.textContent = Math.round(counter.v).toString();
      },
    })
      .to(root.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => setDone(true),
      })
      .add(() => {
        // let the rest of the page know it can run intro animations
        window.dispatchEvent(new Event("loader:done"));
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] grid place-items-center bg-bg"
    >
      <div className="text-center">
        <span
          ref={countRef}
          className="block font-display text-[clamp(4rem,18vw,14rem)] font-semibold leading-none"
        >
          0
        </span>
        <span className="mt-4 block text-xs uppercase tracking-[0.4em] text-muted">
          Ọnà Studio
        </span>
      </div>
    </div>
  );
}
