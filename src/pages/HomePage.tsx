import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";

import cellHero from "@/assets/gen/cell-hero.png";
import phaseBaseline from "@/assets/gen/phase-baseline.png";
import phasePillars from "@/assets/gen/phase-pillars.png";
import phaseRecovery from "@/assets/gen/phase-recovery.png";
import phaseAesthetics from "@/assets/gen/phase-aesthetics.png";
import journeyCognitive from "@/assets/gen/journey-cognitive.png";
import journeyVitality from "@/assets/gen/journey-vitality.png";
import journeyRadiance from "@/assets/gen/journey-radiance.png";
import clinicMoss from "@/assets/gen/clinic-moss.png";
import clinicHbot from "@/assets/gen/clinic-hbot.png";
import clinicPemf from "@/assets/gen/clinic-pemf.png";
import clinicConsult from "@/assets/gen/clinic-consult.png";
import clinicIv from "@/assets/gen/clinic-iv.png";
import victoriaImg from "@/assets/gen/victoria.png";
import langleyImg from "@/assets/gen/langley.png";
import kelownaImg from "@/assets/gen/kelowna.png";
import { SHOP_URL } from "@/lib/links";

const ease = [0.16, 1, 0.3, 1] as const;

const phases = [
  {
    num: "01",
    label: "THE BASELINE",
    title: "Clear. Restore. Optimize.",
    body: "The foundation. We clear inflammation and optimize metabolic health through advanced gut protocols and medical healthy weight programs. Everything that follows builds on this clean foundation.",
    cardTitle: "The Baseline",
    cardSub: "Clearing inflammation & optimizing metabolism",
    badge: "PHASE 1 OF 4",
    img: phaseBaseline,
  },
  {
    num: "02",
    label: "THE STRUCTURAL PILLARS",
    title: "Strength. Clarity. Vitality.",
    body: "Energy restored. We balance your hormones to bring back your physical strength, mental sharpness, and natural vitality. This is where patients say they feel like themselves again.",
    cardTitle: "The Structural Pillars",
    cardSub: "Balancing hormones for strength & clarity",
    badge: "PHASE 2 OF 4",
    img: phasePillars,
  },
  {
    num: "03",
    label: "CELLULAR RECOVERY",
    title: "Repair. Regenerate. Protect.",
    body: "Deep repair. Using biohacking technology like Hyperbaric Oxygen and PEMF, we manage cellular stress and promote DNA repair. Your body heals faster than it has in years.",
    cardTitle: "Cellular Recovery",
    cardSub: "Deep repair via HBOT, PEMF & biohacking",
    badge: "PHASE 3 OF 4",
    img: phaseRecovery,
  },
  {
    num: "04",
    label: "MEDICAL AESTHETICS",
    title: "Reveal. Refine. Radiate.",
    body: "The final expression. Because you are deeply healthy underneath, our advanced skin rejuvenation, Botox, and dermal fillers look flawless, radiant, and completely natural.",
    cardTitle: "Medical Aesthetics",
    cardSub: "Flawless, radiant, natural results",
    badge: "PHASE 4 OF 4",
    img: phaseAesthetics,
  },
];

const journeys = [
  {
    tag: "JOURNEY 01",
    title: "Cognitive & Cellular Reboot",
    body: "Overcome deep fatigue and brain fog. Featuring Functional Nutrition, Hormone Optimization, HBOT, PEMF, and IV Vitamin Therapy.",
    img: journeyCognitive,
    href: "/services/biohacking",
  },
  {
    tag: "JOURNEY 02",
    title: "Peak Vitality & Performance",
    body: "Optimize your body to perform and recover. Featuring Performance Diets, IR Sauna, Biohacking, and Targeted Supplementation.",
    img: journeyVitality,
    href: "/services/health-weight",
  },
  {
    tag: "JOURNEY 03",
    title: "Total Radiance Reset",
    body: "The ultimate synergy of health and aesthetics. Featuring Medical Weight Loss, Stress Defense, and our full suite of injectables and lasers.",
    img: journeyRadiance,
    href: "/services",
  },
];

const clinicGallery = [
  { img: clinicMoss, caption: "Biophilic Moss Wall & Light Oak Floors", wide: true },
  { img: clinicHbot, caption: "State-of-the-Art HBOT Chamber", wide: false },
  { img: clinicPemf, caption: "Zero-Gravity PEMF Recovery", wide: false },
  { img: clinicConsult, caption: "Private Consultation Suite", wide: false },
  { img: clinicIv, caption: "IV Therapy Lounge", wide: false },
];

const locations = [
  {
    name: "Victoria",
    img: victoriaImg,
    address: ["1-101 Burnside Rd W", "Victoria, BC V9A 1B7"],
    phone: "(250) 590-5787",
    tel: "+12505905787",
    hours: "Mon-Fri 9am-5pm",
    href: "/locations/victoria",
  },
  {
    name: "Langley",
    img: langleyImg,
    address: ["415-20178 96th Ave", "Langley, BC V1M 0B2"],
    phone: "(236) 326-6830",
    tel: "+12363266830",
    hours: "Mon-Fri 9am-5pm",
    href: "/locations/langley",
  },
  {
    name: "Kelowna",
    img: kelownaImg,
    address: ["102-3320 Richter Street", "Kelowna, BC V1W 4V5"],
    phone: "(778) 760-9827",
    tel: "+17787609827",
    hours: "Mon-Fri 9am-5pm",
    href: "/locations/kelowna",
  },
];

/* Triangle texture used behind the light editorial sections */
const triangleBg =
  "url(\"data:image/svg+xml,%3Csvg width='80' height='70' viewBox='0 0 80 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 14 L62 54 L18 54 Z' fill='none' stroke='%2314b8c4' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E\")";

function ScrollPhases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(phases.length - 1, Math.floor(v * phases.length));
    setActive(idx < 0 ? 0 : idx);
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);
  const current = phases[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${phases.length * 100}vh`, backgroundImage: triangleBg }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text column */}
            <div className="order-2 lg:order-1">
              <motion.div
                key={`txt-${active}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border border-clinic-teal/40 text-clinic-teal text-sm font-semibold">
                    {current.num}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.18em] text-clinic-teal">
                    {current.label}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  {current.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {current.body}
                </p>
              </motion.div>
            </div>

            {/* Image card column */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                key={`img-${active}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={current.img || "/placeholder.svg"}
                  alt={current.cardTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 mb-1.5">
                    {current.badge}
                  </p>
                  <h4 className="font-display text-2xl md:text-3xl text-white mb-1">
                    {current.cardTitle}
                  </h4>
                  <p className="text-sm text-clinic-teal-light mb-5">{current.cardSub}</p>
                  <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-clinic-teal"
                      style={{ width: progressWidth }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ageless Living Wellness Centre",
    description:
      "A premier longevity clinic optimizing internal health so you look and live your best, for the longest you can.",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "287", bestRating: "5" },
    address: [
      { "@type": "PostalAddress", streetAddress: "1-101 Burnside Rd W", addressLocality: "Victoria", addressRegion: "BC", postalCode: "V9A 1B7", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "415-20178 96th Ave", addressLocality: "Langley", addressRegion: "BC", postalCode: "V1M 0B2", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "102-3320 Richter Street", addressLocality: "Kelowna", addressRegion: "BC", postalCode: "V1W 4V5", addressCountry: "CA" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ageless Living™ | Medical Aesthetics, Hormone Therapy & Biohacking in BC</title>
        <meta
          name="description"
          content="A premier Longevity Clinic. We optimize your internal health so you look and live your best, for the longest you can. Three locations across British Columbia."
        />
        <link rel="canonical" href="https://agelessliving.com" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={cellHero || "/placeholder.svg"}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1d2b2b]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-10 container mx-auto px-4 sm:px-6 text-center"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-clinic-teal mb-4">
            LONGEVITY-FOCUSED AESTHETICS
          </p>
          <p className="text-xs sm:text-sm font-medium tracking-[0.22em] text-white/70 mb-7">
            YOUR BEST SELF, AT ANY AGE
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight text-balance">
            True Beauty Starts at the
            <br className="hidden sm:block" />{" "}
            <span className="text-clinic-teal">Cellular Level.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-pretty">
            We are a premier Longevity Clinic. We optimize your internal health so you look and live
            your best, for the longest you can.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#synergy"
              className="group inline-flex items-center gap-3 bg-clinic-teal hover:bg-clinic-teal-container text-white px-8 py-4 rounded-full font-semibold text-sm transition-all"
            >
              Discover Longevity-Focused Beauty
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* ══════════════ THE INSIDE-OUT SYNERGY ══════════════ */}
      <div id="synergy" className="relative bg-background" style={{ backgroundImage: triangleBg }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mx-auto mb-6 h-0.5 w-14 bg-clinic-teal" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight text-balance">
              The Inside-Out Synergy
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our four-phase process doesn&apos;t just treat symptoms. It rebuilds you from the
              cellular level up.
            </p>
          </motion.div>
        </div>
      </div>

      <ScrollPhases />

      {/* ══════════════ CHOOSE YOUR TRANSFORMATION ══════════════ */}
      <section className="relative bg-secondary/60" style={{ backgroundImage: triangleBg }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 section-y">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center"
          >
            <div className="mx-auto mb-6 h-0.5 w-14 bg-clinic-teal" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight text-balance">
              Choose Your Transformation
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every journey is different. Find the path that matches where you are — and where you
              want to be.
            </p>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
            {journeys.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={j.img || "/placeholder.svg"}
                    alt={j.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[11px] font-semibold tracking-[0.18em] text-white/80">
                    {j.tag}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="font-display text-2xl text-foreground mb-3">{j.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty flex-1">{j.body}</p>
                  <Link
                    to={j.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-clinic-teal hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DESIGNED FOR DEEP HEALING ══════════════ */}
      <section className="relative bg-background" style={{ backgroundImage: triangleBg }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 section-y">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center"
          >
            <div className="mx-auto mb-6 h-0.5 w-14 bg-clinic-teal" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight text-balance">
              Designed for Deep Healing
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every detail of our clinic is intentional — biophilic design meets clinical precision.
            </p>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicGallery.map((item, i) => (
              <motion.div
                key={item.caption}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className={`group relative overflow-hidden rounded-2xl shadow-sm ${
                  item.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`${item.wide ? "aspect-[16/9]" : "aspect-[4/3]"} w-full`}>
                  <img
                    src={item.img || "/placeholder.svg"}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 right-6 text-white font-medium">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ EXTEND YOUR RESULTS (SHOP) ══════════════ */}
      <section
        className="relative bg-clinic-teal text-white overflow-hidden"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='70' viewBox='0 0 80 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 14 L62 54 L18 54 Z' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1'/%3E%3C/svg%3E\")",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
              Extend Your Results at Home
            </h2>
            <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto text-pretty">
              Shop our curated longevity supplements and medical-grade skincare — the same products
              we prescribe in-clinic, delivered to your door.
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3 bg-white text-clinic-teal px-8 py-4 rounded-full font-semibold text-sm transition-all hover:bg-white/90"
            >
              Shop Ageless Living
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ LOCATIONS ══════════════ */}
      <section className="relative bg-secondary/60" style={{ backgroundImage: triangleBg }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 section-y">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center"
          >
            <div className="mx-auto mb-6 h-0.5 w-14 bg-clinic-teal" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight text-balance">
              Visit Us in British Columbia
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Three locations, one standard of excellence.
            </p>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={loc.img || "/placeholder.svg"}
                    alt={`${loc.name} clinic location`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 font-display text-2xl text-white">
                    {loc.name}
                  </h3>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {loc.address[0]}
                    <br />
                    {loc.address[1]}
                  </p>
                  <p className="mt-4 text-sm text-foreground">
                    <span className="font-semibold">Phone: </span>
                    <a href={`tel:${loc.tel}`} className="text-clinic-teal hover:underline">
                      {loc.phone}
                    </a>
                  </p>
                  <p className="mt-1.5 text-sm text-foreground">
                    <span className="font-semibold">Hours: </span>
                    {loc.hours}
                  </p>
                  <Link
                    to={loc.href}
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-clinic-teal hover:bg-clinic-teal-container text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all"
                  >
                    Book at {loc.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ NEWSLETTER ══════════════ */}
      <section className="relative bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="max-w-xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
              Start Your Journey
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Join our newsletter for longevity insights, exclusive offers, and clinic updates.
            </p>
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-clinic-teal"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-clinic-teal hover:bg-clinic-teal-container text-white px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-8">
              <a
                href="tel:+12363266830"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-clinic-teal" />
                Prefer to talk? Call (236) 326-6830
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
