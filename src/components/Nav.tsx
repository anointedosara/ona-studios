"use client";

import { useState } from "react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "Studio" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-[clamp(1.2rem,4vw,4rem)] py-6 mix-blend-difference">
        <a
          href="#hero"
          data-magnetic
          className="inline-flex items-center gap-1 font-display text-xl font-semibold tracking-tight"
        >
          <span className="text-accent">◈</span> Ọnà
          <span className="text-muted">Studio</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-[0.92rem]">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-magnetic
          className="hidden rounded-full border border-current px-5 py-2.5 text-[0.9rem] transition-colors duration-500 hover:bg-ink hover:text-bg md:inline-block"
        >
          Start a project
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-7 bg-ink transition-transform duration-300 ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col justify-center gap-2 bg-bg-soft px-[clamp(1.2rem,6vw,4rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {[...LINKS, { href: "#contact", label: "Contact" }].map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-b border-line py-2 font-display text-[clamp(2.2rem,9vw,4rem)] font-medium"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
