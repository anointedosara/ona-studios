"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export type Project = {
  n: string;
  title: string;
  tag: string;
  c1: string;
  c2: string;
  img: string;
  year: string;
  client: string;
  services: string[];
  summary: string;
  detail: string;
  results: { value: string; label: string }[];
};

const WORK: Project[] = [
  {
    n: "01",
    title: "Sahara Bank — Rebrand",
    tag: "Identity & product design",
    c1: "#ff6b4a",
    c2: "#ffd166",
    img: UNSPLASH("photo-1561070791-2526d30994b5"),
    year: "2025",
    client: "Sahara Bank",
    services: ["Brand strategy", "Identity system", "Product design", "Motion"],
    summary:
      "A full rebrand and product redesign for one of West Africa's fastest-growing digital banks.",
    detail:
      "We rebuilt Sahara Bank from the name up — a warm, confident identity system that travels from billboards in Lagos to a banking app used by millions. The new palette, custom type and motion language gave the brand a single voice across every touchpoint, while the redesigned product flows cut onboarding time dramatically.",
    results: [
      { value: "+42%", label: "Onboarding completion" },
      { value: "3.2M", label: "App downloads" },
      { value: "2 wks", label: "From brief to launch system" },
    ],
  },
  {
    n: "02",
    title: "Pulse — Music App",
    tag: "Mobile UI / UX & motion",
    c1: "#7c5cff",
    c2: "#22d3ee",
    img: UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
    year: "2025",
    client: "Pulse Audio",
    services: ["UX research", "Mobile UI", "Motion design", "Prototyping"],
    summary:
      "A music streaming experience built around discovery, live moments and buttery motion.",
    detail:
      "Pulse wanted streaming to feel like being in the room. We designed an immersive mobile experience where the interface fades back and the music — and the artist — take the stage. Gesture-led navigation, reactive visuals and a deeply considered motion system turned passive listening into something you reach for.",
    results: [
      { value: "4.8★", label: "App Store rating" },
      { value: "+61%", label: "Session length" },
      { value: "120k", label: "Beta sign-ups" },
    ],
  },
  {
    n: "03",
    title: "Terra — 3D Commerce",
    tag: "WebGL & creative dev",
    c1: "#00d68f",
    c2: "#a3ff12",
    img: UNSPLASH("photo-1620641788421-7a1c342ea42e"),
    year: "2024",
    client: "Terra Goods",
    services: ["Creative direction", "WebGL", "3D product viewer", "Web build"],
    summary:
      "An interactive 3D storefront that lets shoppers explore products in real time.",
    detail:
      "Terra sells objects you want to pick up and turn over in your hands. We brought that to the web with a performant WebGL storefront — real-time 3D product views, configurable materials and a checkout that never breaks the spell. Every model streams progressively so the experience stays fast on any device.",
    results: [
      { value: "+38%", label: "Add-to-cart rate" },
      { value: "<2s", label: "First interactive" },
      { value: "60fps", label: "On mid-range mobile" },
    ],
  },
  {
    n: "04",
    title: "Lumen — SaaS Platform",
    tag: "Design system & web",
    c1: "#ff4d9d",
    c2: "#ff9a3c",
    img: UNSPLASH("photo-1517245386807-bb43f82c33c4"),
    year: "2024",
    client: "Lumen",
    services: ["Design system", "Web app", "Marketing site", "Documentation"],
    summary:
      "A scalable design system and product UI for a fast-moving analytics platform.",
    detail:
      "Lumen's product was growing faster than its design could keep up. We built a token-driven design system and component library that let their team ship consistent, accessible UI in a fraction of the time — paired with a marketing site that finally matched the quality of the product behind it.",
    results: [
      { value: "180+", label: "Components shipped" },
      { value: "−55%", label: "Time to build a screen" },
      { value: "AA", label: "Accessibility baseline" },
    ],
  },
];

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  const close = useCallback(() => setActive(null), []);

  // Lock scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  return (
    <section id="work" className="py-[clamp(4rem,8vw,7rem)]">
      <div className="mb-12 px-[clamp(1.2rem,4vw,4rem)]">
        <span data-fade className="mb-3 block text-[0.9rem] text-accent">
          {"// Selected work"}
        </span>
        <h2
          data-fade
          className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-[-0.02em]"
        >
          Things we&apos;re proud of
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 px-[clamp(1.2rem,4vw,4rem)] md:grid-cols-2">
        {WORK.map((p) => (
          <article
            key={p.n}
            data-tilt
            data-fade
            className="group overflow-hidden rounded-[20px] border border-line bg-bg-soft"
          >
            <button
              type="button"
              onClick={() => setActive(p)}
              aria-haspopup="dialog"
              className="block w-full text-left transition-[border-color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                {/* Brand-tint gradient overlay keeps the palette consistent */}
                <div
                  className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${p.c1}, ${p.c2})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
                <span className="absolute left-6 top-5 z-10 font-display text-2xl font-semibold text-white">
                  {p.n}
                </span>
                {/* View-project affordance */}
                <span className="absolute bottom-5 right-6 z-10 inline-flex translate-y-2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  View project ↗
                </span>
              </div>
              <div className="flex items-baseline justify-between p-6">
                <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                <p className="text-[0.95rem] text-muted">{p.tag}</p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}

function ProjectModal({
  project: p,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[1100] flex items-start justify-center overflow-y-auto bg-bg/80 p-[clamp(1rem,4vw,3rem)] backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[820px] overflow-hidden rounded-[24px] border border-line bg-bg-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={p.img}
            alt={p.title}
            fill
            sizes="(max-width: 820px) 100vw, 820px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 opacity-60 mix-blend-multiply"
            style={{
              backgroundImage: `linear-gradient(135deg, ${p.c1}, ${p.c2})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-soft via-bg-soft/20 to-transparent" />
          <span className="absolute left-7 top-6 font-display text-3xl font-semibold text-white">
            {p.n}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-xl text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/55"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-[clamp(1.5rem,4vw,2.75rem)]">
          <span className="text-[0.9rem] text-accent">{p.tag}</span>
          <h3 className="mt-2 font-display text-[clamp(1.8rem,5vw,3rem)] font-medium tracking-[-0.02em]">
            {p.title}
          </h3>
          <p className="mt-4 max-w-[55ch] text-[1.05rem] text-muted">
            {p.summary}
          </p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-ink/85">
            {p.detail}
          </p>

          {/* Meta */}
          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-7 sm:grid-cols-3">
            <div>
              <span className="mb-1 block text-[0.8rem] uppercase tracking-[0.15em] text-muted">
                Client
              </span>
              <span className="font-display text-lg">{p.client}</span>
            </div>
            <div>
              <span className="mb-1 block text-[0.8rem] uppercase tracking-[0.15em] text-muted">
                Year
              </span>
              <span className="font-display text-lg">{p.year}</span>
            </div>
            <div>
              <span className="mb-1 block text-[0.8rem] uppercase tracking-[0.15em] text-muted">
                Services
              </span>
              <div className="flex flex-wrap gap-2">
                {p.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-[0.8rem] text-ink/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-7">
            {p.results.map((r) => (
              <div key={r.label}>
                <span className="block font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-none text-accent">
                  {r.value}
                </span>
                <span className="mt-1 block text-[0.85rem] text-muted">
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="btn btn--primary mt-9"
          >
            <span>Start a project like this</span>
          </a>
        </div>
      </div>
    </div>
  );
}
