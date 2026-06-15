import Image from "next/image";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import ThreeBackground from "@/components/ThreeBackground";
import Nav from "@/components/Nav";
import SiteAnimations from "@/components/SiteAnimations";
import ContactForm from "@/components/ContactForm";
import Services from "@/components/Services";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const WORK = [
  { n: "01", title: "Sahara Bank — Rebrand", tag: "Identity & product design", c1: "#ff6b4a", c2: "#ffd166", img: UNSPLASH("photo-1561070791-2526d30994b5") },
  { n: "02", title: "Pulse — Music App", tag: "Mobile UI / UX & motion", c1: "#7c5cff", c2: "#22d3ee", img: UNSPLASH("photo-1493225457124-a3eb161ffa5f") },
  { n: "03", title: "Terra — 3D Commerce", tag: "WebGL & creative dev", c1: "#00d68f", c2: "#a3ff12", img: UNSPLASH("photo-1620641788421-7a1c342ea42e") },
  { n: "04", title: "Lumen — SaaS Platform", tag: "Design system & web", c1: "#ff4d9d", c2: "#ff9a3c", img: UNSPLASH("photo-1517245386807-bb43f82c33c4") },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "We dig into your goals, users and market until the real problem is crystal clear." },
  { n: "02", title: "Design", desc: "Concepts, systems and prototypes — iterated fast and tested with real people." },
  { n: "03", title: "Build", desc: "Pixel-true, performant code with motion that brings the design to life." },
  { n: "04", title: "Launch", desc: "We ship, measure and refine — then help you grow what we made together." },
];

const STATS = [
  { value: 120, label: "Projects shipped" },
  { value: 28, label: "Countries reached" },
  { value: 14, label: "Design awards" },
];

const MARQUEE = ["Branding", "UI / UX", "Web Design", "Motion", "3D & WebGL", "Product Design"];

export default function Home() {
  return (
    <>
      <Cursor />
      <Loader />
      <ThreeBackground />
      <Nav />
      <SiteAnimations />

      <main className="relative z-[2]">
        {/* ---------- HERO ---------- */}
        <section
          id="hero"
          className="hero relative flex min-h-screen flex-col justify-center px-[clamp(1.2rem,4vw,4rem)] pb-16 pt-32"
        >
          <p
            data-fade
            className="mb-6 inline-flex items-center gap-2 text-[0.9rem] tracking-wide text-muted"
          >
            <span className="animate-[blink_2s_infinite] text-accent">●</span>
            Lagos, Nigeria — working worldwide
          </p>

          <h1 className="font-display text-[clamp(2.8rem,9vw,8.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span data-hero-line className="hero-line">
                We design digital
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="hero-line">
                experiences the
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="hero-line">
                whole world <em>feels.</em>
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="my-8 max-w-[46ch] text-[clamp(1rem,1.4vw,1.25rem)] text-muted"
          >
            Ọnà is a design studio from Nigeria crafting bold brands, interfaces
            and motion for ambitious teams everywhere on the map.
          </p>

          <div data-fade className="flex flex-wrap gap-4">
            <a href="#contact" data-magnetic className="btn btn--primary">
              <span>Let&apos;s build something</span>
            </a>
            <a href="#work" data-magnetic className="btn btn--ghost">
              <span>See our work</span>
            </a>
          </div>

          <div
            data-fade
            className="absolute bottom-10 right-[clamp(1.2rem,4vw,4rem)] flex flex-col items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span>Scroll</span>
            <div className="scroll-line h-14 w-px bg-line" />
          </div>
        </section>

        {/* ---------- MARQUEE ---------- */}
        <section
          aria-hidden="true"
          className="overflow-hidden border-y border-line bg-bg-soft py-6"
        >
          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="font-display text-[clamp(1.6rem,4vw,3rem)] font-medium">
                  {w}
                </span>
                <span className="text-2xl text-accent">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ---------- INTRO / ABOUT ---------- */}
        <section
          id="about"
          className="px-[clamp(1.2rem,4vw,4rem)] py-[clamp(6rem,14vw,12rem)]"
        >
          <p
            data-word-reveal
            className="max-w-[24ch] font-display text-[clamp(1.6rem,4.2vw,3.6rem)] font-normal leading-[1.2] tracking-[-0.01em]"
          >
            We are a collective of designers, animators and engineers based in
            Lagos — turning ambitious ideas into digital experiences that move
            people across continents.
          </p>

          <div className="mt-20 grid max-w-[700px] grid-cols-1 gap-10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} data-fade>
                <span
                  data-count={s.value}
                  className="block font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none text-accent"
                >
                  0
                </span>
                <span className="text-[0.95rem] text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- WORK ---------- */}
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
                </div>
                <div className="flex items-baseline justify-between p-6">
                  <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                  <p className="text-[0.95rem] text-muted">{p.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- SERVICES ---------- */}
        <Services />

        {/* ---------- PROCESS ---------- */}
        <section id="process" className="py-[clamp(4rem,8vw,7rem)]">
          <div className="mb-12 px-[clamp(1.2rem,4vw,4rem)]">
            <span data-fade className="mb-3 block text-[0.9rem] text-accent">
              {"// How we work"}
            </span>
            <h2
              data-fade
              className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-[-0.02em]"
            >
              From spark to shipped
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 px-[clamp(1.2rem,4vw,4rem)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s) => (
              <div
                key={s.n}
                data-fade
                className="rounded-[18px] border border-line bg-bg-soft p-7 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-accent"
              >
                <span className="mb-6 block font-display text-4xl font-semibold text-accent">
                  {s.n}
                </span>
                <h3 className="mb-2 font-display text-2xl font-medium">
                  {s.title}
                </h3>
                <p className="text-[0.95rem] text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section
          id="contact"
          className="px-[clamp(1.2rem,4vw,4rem)] py-[clamp(6rem,16vw,14rem)] text-center"
        >
          <h2
            data-fade
            className="font-display text-[clamp(2.5rem,9vw,8rem)] font-semibold leading-none tracking-[-0.02em]"
          >
            Let&apos;s make something
            <br />
            <em>the world remembers.</em>
          </h2>
          <p data-fade className="mb-12 mt-7 text-[1.15rem] text-muted">
            Tell us about your project — we reply within a day. Or email{" "}
            <a href="mailto:hello@onastudio.ng" className="nav-link text-ink">
              hello@onastudio.ng
            </a>
          </p>

          <ContactForm />
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-[2] border-t border-line px-[clamp(1.2rem,4vw,4rem)] pb-10 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-12">
          <span className="font-display text-2xl font-semibold">◈ ỌnàStudio</span>
          <nav className="flex flex-wrap gap-7">
            {["Instagram", "Behance", "Dribbble", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                data-magnetic
                className="text-muted transition-colors duration-300 hover:text-ink"
              >
                {s}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-[0.9rem] text-muted">
          <span>© 2026 Ọnà Studio — Made with ♥ in Lagos, Nigeria</span>
          <a href="#hero" data-magnetic>
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
