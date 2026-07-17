import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown, Check, X as XIcon, Sparkles } from "lucide-react";

import heroCouple from "@/assets/real/hero-couple-ageless-living.png";
import skinImg from "@/assets/real/skin-rejuvenation-ageless-living.webp";
import clinicInteriorImg from "@/assets/real/clinic-interior-ageless-living.webp";

import womanTired from "@/assets/avatars/woman-tired.png";
import womanSkin from "@/assets/avatars/woman-skin.png";
import womanWeight from "@/assets/avatars/woman-weight.png";
import womanOptimize from "@/assets/avatars/woman-optimize.png";
import manEdge from "@/assets/avatars/man-edge.png";
import manTired from "@/assets/avatars/man-tired.png";
import manWeight from "@/assets/avatars/man-weight.png";
import manOptimize from "@/assets/avatars/man-optimize.png";

const ease = [0.16, 1, 0.3, 1] as const;

const whatWeDo = [
  { label: "HORMONES", href: "/services#hormone-balancing" },
  { label: "WEIGHT", href: "/services#health-weight" },
  { label: "BIOHACKING", href: "/services#biohacking" },
  { label: "AESTHETICS", href: "/services#skin-rejuvenation" },
  { label: "PREVENTION", href: "/services" },
];

const weAre = [
  <>A longevity medicine clinic — physicians, diagnostics, and a plan built around <em className="italic">your</em> biology</>,
  <>Whole-system optimization: hormones, metabolism, cellular repair, nutrition</>,
  <>Expert aesthetic medicine, delivered with the same clinical rigor as everything we do</>,
];

const weAreNot = ["A quick fix without a plan", "One-size-fits-all treatment", "Guesswork instead of real data"];

type Avatar = {
  id: string;
  img: string;
  quote: string;
  blurb: string;
  startLabel: string;
  panelTitle: string;
  panelCopy: string;
  ctaLabel: string;
  ctaHref: string;
};

const womenAvatars: Avatar[] = [
  {
    id: "w1",
    img: womanTired,
    quote: "“I don't feel like myself.”",
    blurb: "Tired, foggy, weight creeping up, low drive — and your cycle's changing.",
    startLabel: "Hormones & foundation",
    panelTitle: "Hormones & foundation",
    panelCopy:
      "We start by rebalancing what's actually driving how you feel — hormones through peri- and menopause, metabolism, gut health, and nutrient gaps. Get the foundation right and your energy, focus, and vitality come back first.",
    ctaLabel: "Explore Hormone Optimization",
    ctaHref: "/services#hormone-balancing",
  },
  {
    id: "w2",
    img: womanSkin,
    quote: "“I just want to look better.”",
    blurb: "Tired skin, fine lines — thinking about Botox or filler.",
    startLabel: "Skin, from the inside out",
    panelTitle: "Skin, from the inside out",
    panelCopy:
      "Your skin is your largest organ — a readout of what's happening inside. Our injectors deliver refined, natural-looking results, and we make them last by also calming inflammation, restoring nutrients (IV + nutrition), optimizing hormones, and red light therapy.",
    ctaLabel: "Explore Medical Aesthetics",
    ctaHref: "/services#skin-rejuvenation",
  },
  {
    id: "w3",
    img: womanWeight,
    quote: "“I lost the weight — now I look older.”",
    blurb: "Slimmer, but gaunt and aged-looking after GLP-1.",
    startLabel: "Weight & restoration",
    panelTitle: "Weight & restoration",
    panelCopy:
      "Rapid weight loss can hollow the face and loosen skin. We pair medically supervised weight management with collagen-rebuilding treatments and strategic restoration, so you look as healthy as you feel — not older.",
    ctaLabel: "Explore Weight + Aesthetics",
    ctaHref: "/services#health-weight",
  },
  {
    id: "w4",
    img: womanOptimize,
    quote: "“I feel good — I want to stay ahead.”",
    blurb: "Healthy, and want to optimize and prevent.",
    startLabel: "The Longevity Program",
    panelTitle: "The Longevity Program",
    panelCopy:
      "You don't need fixing — you want an edge. Our all-encompassing flagship: genetic testing, advanced diagnostics, biohacking, and a proactive plan to extend how long you look, feel, and perform at your best.",
    ctaLabel: "Explore Longevity Program",
    ctaHref: "/services",
  },
];

const menAvatars: Avatar[] = [
  {
    id: "m1",
    img: manEdge,
    quote: "“I've lost my edge.”",
    blurb: "Low energy and drive, softer in the middle, sleeping and recovering worse.",
    startLabel: "Hormones & foundation",
    panelTitle: "Hormones & foundation",
    panelCopy:
      "We test what is actually going on — testosterone, metabolism, sleep, and nutrients — then rebuild the foundation so your energy, drive, strength, and focus come back. This is where most men start.",
    ctaLabel: "Explore Hormone Optimization",
    ctaHref: "/services#hormone-balancing",
  },
  {
    id: "m2",
    img: manTired,
    quote: "“I look tired and older.”",
    blurb: "Tired eyes, a softer jawline — and maybe a thinning hairline.",
    startLabel: "Look as good as you feel",
    panelTitle: "Look as good as you feel",
    panelCopy:
      "Men's skin responds to the same inside-out approach: calm inflammation, optimize hormones, restore nutrients, add red light — with targeted aesthetics, plus our hair-loss program if that's part of it, layered on top. Natural, not overdone.",
    ctaLabel: "Explore Aesthetics & Hair",
    ctaHref: "/services#skin-rejuvenation",
  },
  {
    id: "m3",
    img: manWeight,
    quote: "“I can't shift the weight.”",
    blurb: "Stubborn belly fat that won't budge with diet and the gym.",
    startLabel: "Weight & metabolic health",
    panelTitle: "Weight & metabolic health",
    panelCopy:
      "We find the metabolic and hormonal reasons the weight will not move, then use medically supervised weight management to get it off and keep it off — without losing muscle or looking gaunt.",
    ctaLabel: "Explore Weight Loss",
    ctaHref: "/services#health-weight",
  },
  {
    id: "m4",
    img: manOptimize,
    quote: "“I feel good — I want to stay ahead.”",
    blurb: "Performing well, and want to optimize and prevent.",
    startLabel: "The Longevity Program",
    panelTitle: "The Longevity Program",
    panelCopy:
      "You don't need fixing — you want an edge. Genetic testing, advanced diagnostics, biohacking, and a proactive plan to extend how long you look, feel, and perform at your best.",
    ctaLabel: "Explore Longevity Program",
    ctaHref: "/services",
  },
];

export default function HomePage() {
  const [gender, setGender] = useState<"women" | "men">("women");
  const [activeIdx, setActiveIdx] = useState(0);

  const avatars = gender === "women" ? womenAvatars : menAvatars;
  const active = avatars[activeIdx];

  // Reset the active card whenever the gender changes.
  useEffect(() => {
    setActiveIdx(0);
  }, [gender]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ageless Living™ Wellness Centre",
    description:
      "Longevity medicine — not a med spa. Physician-led, whole-system optimization across British Columbia.",
    url: "https://agelessliving.com",
    image: "https://agelessliving.com/icon.png",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "287", bestRating: "5" },
  };

  return (
    <>
      <Helmet>
        <title>Ageless Living™ | Medical Aesthetics, Hormone Therapy &amp; Biohacking in BC</title>
        <meta
          name="description"
          content="Longevity medicine — not a med spa. We optimize your whole system — hormones, metabolism, cellular health, and how you look — across Victoria, Langley and Kelowna, BC."
        />
        <link rel="canonical" href="https://agelessliving.com" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden bg-foreground">
        <img
          src={heroCouple}
          alt="A healthy, vibrant couple at an Ageless Living longevity clinic"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/35 to-foreground/65" />

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-5 sm:px-6 lg:px-16 text-center">
            <div className="mx-auto max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-clinic-teal-light mb-5"
              >
                Longevity Medicine — Not a Med Spa
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-white leading-[1.04]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.75rem)" }}
              >
                Live better. Live longer.
                <br />
                <span className="text-clinic-teal-light">Be your best self at any age.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
                className="mt-6 mx-auto max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
              >
                We optimize your whole system — hormones, metabolism, cellular health, and how you look — so you
                feel and perform your best, for as long as possible.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
              >
                <a
                  href="#where-to-start"
                  className="group inline-flex items-center justify-center gap-2.5 bg-clinic-teal text-white px-7 py-4 rounded-full font-semibold text-sm transition-colors hover:bg-clinic-teal-container"
                >
                  Find your starting point
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  See how it works
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease }}
                className="mt-10"
                aria-label="What we do"
              >
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  {whatWeDo.map((w) => (
                    <Link
                      key={w.label}
                      to={w.href}
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
                    >
                      {w.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* ════════════════ THE AGELESS PRINCIPLE ════════════════ */}
      <section id="how-it-works" className="bg-background section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="h-[2px] w-12 bg-clinic-teal mb-6" />
              <p className="eyebrow text-clinic-teal mb-4">The Ageless Principle</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
                Your skin reflects what's happening <span className="text-clinic-teal">inside.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Your body is one connected system. When your hormones, metabolism, and cells are working well, it
                shows — in your energy, your performance, and your skin, your largest organ. So we work from the
                inside out, pairing expert aesthetic care with the internal health that makes results look
                natural and last.
              </p>
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="inline-flex items-center px-4 py-2 rounded-full border border-clinic-teal/40 text-clinic-teal">
                  Optimize within
                </span>
                <ArrowRight className="w-4 h-4 text-clinic-teal" />
                <span className="inline-flex items-center px-4 py-2 rounded-full border border-clinic-teal/40 text-clinic-teal">
                  It shows on the outside
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src={skinImg}
                  alt="Luminous, healthy skin — the visible result of internal health"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <Sparkles className="absolute bottom-4 right-4 w-5 h-5 text-white/70" />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:left-6 max-w-[15rem] bg-card border border-border rounded-2xl shadow-lg p-5">
                <p className="font-display text-3xl text-clinic-teal mb-1">#1</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your skin is your largest organ — a live readout of your internal health.
                </p>
              </div>
            </motion.div>
          </div>

          {/* WE ARE / WE ARE NOT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-20 md:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="rounded-3xl border border-clinic-teal/30 bg-clinic-teal-light/40 p-7 md:p-9"
            >
              <p className="eyebrow text-clinic-teal mb-5">We are</p>
              <ul className="space-y-4">
                {weAre.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-clinic-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="rounded-3xl border border-border bg-secondary/40 p-7 md:p-9"
            >
              <p className="eyebrow mb-5">We are not</p>
              <ul className="space-y-4">
                {weAreNot.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <XIcon className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ WHERE ARE YOU RIGHT NOW ════════════════ */}
      <section id="where-to-start" className="bg-secondary/40 section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
          >
            <div className="h-[2px] w-12 bg-clinic-teal mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
              Where are you right now?
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              You don't need everything — you need the right <em className="italic">starting point</em>. Pick the one
              that sounds like you. Every path leads to the same place: looking and feeling your best. Notice where
              aesthetics falls — last, not first.
            </p>
          </motion.div>

          {/* Gender toggle */}
          <div className="flex justify-center mb-10" role="group" aria-label="Show avatars for">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card border border-border shadow-sm">
              {(["women", "men"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${
                    gender === g
                      ? "bg-clinic-teal text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={gender === g}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            role="group"
            aria-label="Choose the avatar that best describes you"
          >
            {avatars.map((a, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveIdx(i)}
                  aria-pressed={isActive}
                  className={`group text-left rounded-2xl overflow-hidden bg-card transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-clinic-teal shadow-lg"
                      : "ring-1 ring-border hover:ring-clinic-teal/40 hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={a.img}
                      alt={`Avatar: ${a.quote.replace(/[“”]/g, "")}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isActive && (
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-clinic-teal text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-foreground leading-snug">{a.quote}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.blurb}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Start here: <span className="font-semibold text-clinic-teal">{a.startLabel}</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={`${gender}-${activeIdx}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mt-6 md:mt-8 rounded-3xl border border-border bg-card shadow-sm p-7 md:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <p className="eyebrow text-clinic-teal mb-3">Where you start</p>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">{active.panelTitle}</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl">{active.panelCopy}</p>
                <Link
                  to={active.ctaHref}
                  className="group inline-flex items-center gap-2.5 bg-clinic-teal text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-clinic-teal-container transition-colors"
                >
                  {active.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="rounded-2xl border border-clinic-teal/20 bg-clinic-teal-light/40 p-6">
                <p className="font-display italic text-lg text-foreground mb-2">{active.quote}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{active.blurb}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ REAL MEDICINE / VISIT ════════════════ */}
      <section id="visit" className="bg-background section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl"
            >
              <img
                src={clinicInteriorImg}
                alt="Ageless Living clinic reception with a living moss wall and natural light"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <div className="h-[2px] w-12 bg-clinic-teal mb-6" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
                Real medicine, in a space built for healing.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Physician-led care, advanced diagnostics, and biohacking technology — in clinics designed to feel
                calm, not clinical. Find us in{" "}
                <Link to="/book" className="text-clinic-teal font-semibold hover:underline">
                  Victoria, Langley &amp; Kelowna
                </Link>
                .
              </p>
              <Link
                to="/book"
                className="group inline-flex items-center gap-2.5 bg-clinic-teal text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-clinic-teal-container transition-colors"
              >
                Book a consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
