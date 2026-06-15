"use client";

import { useState } from "react";

const SERVICES = [
  { n: "01", title: "Brand & Identity", desc: "Logos, systems and stories that make people remember you — built to travel across cultures and screens." },
  { n: "02", title: "UI / UX Design", desc: "Research-led product design for web and mobile — interfaces that feel obvious and delightful." },
  { n: "03", title: "Motion & 3D", desc: "Animation, WebGL and interactive experiences that turn a visit into a moment." },
  { n: "04", title: "Web Development", desc: "Fast, accessible builds with buttery animation — from landing pages to full platforms." },
];

const PX = "px-[clamp(1.2rem,4vw,4rem)]";

export default function Services() {
  // Which row is expanded on mobile (null = all closed). Desktop ignores this.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="py-[clamp(4rem,8vw,7rem)]">
      <div className={`mb-12 ${PX}`}>
        <span data-fade className="mb-3 block text-[0.9rem] text-accent">
          {"// What we do"}
        </span>
        <h2
          data-fade
          className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-[-0.02em]"
        >
          Services that scale
        </h2>
      </div>

      <div className="border-t border-line">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.n} data-fade className="service border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${i}`}
                className={`grid w-full grid-cols-[60px_1fr_auto] items-center gap-6 ${PX} py-9 text-left md:grid-cols-[90px_1fr_2fr_auto] md:gap-8`}
              >
                <span className="service-muted font-display text-[1.1rem] text-muted">
                  {s.n}
                </span>
                <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.4rem)] font-medium">
                  {s.title}
                </h3>
                {/* Desktop: description sits inline */}
                <p className="service-muted hidden max-w-[50ch] text-base text-muted md:block">
                  {s.desc}
                </p>
                {/* Desktop: diagonal arrow */}
                <span className="service-arrow hidden text-3xl transition-transform duration-500 md:block">
                  ↗
                </span>
                {/* Mobile: toggle indicator */}
                <span
                  className={`text-3xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {/* Mobile: collapsible description */}
              <div
                id={`service-panel-${i}`}
                className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className={`${PX} pb-8 text-muted`}>{s.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
