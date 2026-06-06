import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { HERO_VIDEO_MP4, HERO_POSTER } from "@/lib/placeholders";

import skinImg from "@/assets/real/skin-rejuvenation-ageless-living.webp";
import hormoneImg from "@/assets/real/hormone-balancing-ageless-living.webp";
import biohackingImg from "@/assets/real/biohacking-ageless-living.webp";
import weightImg from "@/assets/real/medical-weight-loss-ageless-living.webp";
import consultationImg from "@/assets/real/consultation-ageless-living.webp";
import treatmentRoomImg from "@/assets/real/treatment-room-ageless-living.webp";
import victoriaImg from "@/assets/real/victoria-clinic-ageless-living.webp";
import langleyImg from "@/assets/real/langley-clinic-ageless-living.webp";
import kelownaImg from "@/assets/real/kelowna-clinic-ageless-living.webp";

const ease = [0.16, 1, 0.3, 1] as const;

/** Outcome-led entry points — framed around how people want to feel, not the product. */
const outcomes = [
  {
    title: "More energy, every day",
    copy: "IV therapy, NAD+ and recovery to help you feel switched on again.",
    href: "/services#biohacking",
    img: biohackingImg,
  },
  {
    title: "Feel balanced again",
    copy: "Hormone care for steady energy, better sleep, mood and libido.",
    href: "/services#hormone-balancing",
    img: hormoneImg,
  },
  {
    title: "Reach a healthy weight",
    copy: "Physician-guided, sustainable weight and metabolic support.",
    href: "/services#health-weight",
    img: weightImg,
  },
  {
    title: "Confidence in your skin",
    copy: "Natural-looking skin and aesthetic care that still feels like you.",
    href: "/services#skin-rejuvenation",
    img: skinImg,
  },
];

const stats = [
  { k: "10+", v: "Years in practice" },
  { k: "4.9★", v: "Patient rating" },
  { k: "3", v: "BC locations" },
  { k: "Physician-led", v: "Every plan" },
];

const locations = [
  { name: "Victoria", address: "740 Hillside Ave #120", href: "/locations/victoria", img: victoriaImg },
  { name: "Langley", address: "415-20178 96th Ave", href: "/locations/langley", img: langleyImg },
  { name: "Kelowna", address: "1708 Dolphin Ave #101", href: "/locations/kelowna", img: kelownaImg },
];

/**
 * Decide whether to load the hero video.
 * Skips on small viewports, on data-saver, and on reduced-motion preferences.
 */
function useShouldLoadHeroVideo() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData === true;
    const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    setEnabled(wide && !reduced && !saveData && !slow);
  }, []);
  return enabled;
}

export default function HomePage() {
  const loadHeroVideo = useShouldLoadHeroVideo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ageless Living™ Wellness Centre",
    description: "Physician-led longevity and wellness care across British Columbia — built around how you want to look and feel.",
    url: "https://agelessliving.com",
    image: "https://agelessliving.com/icon.png",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "287", bestRating: "5" },
    address: [
      { "@type": "PostalAddress", streetAddress: "740 Hillside Ave #120", addressLocality: "Victoria", addressRegion: "BC", postalCode: "V8T 1Z4", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "415-20178 96th Ave", addressLocality: "Langley", addressRegion: "BC", postalCode: "V1M 0B2", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "1708 Dolphin Ave #101", addressLocality: "Kelowna", addressRegion: "BC", postalCode: "V1Y 9S4", addressCountry: "CA" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ageless Living™ | Longevity & Wellness — Victoria, Langley & Kelowna BC</title>
        <meta name="description" content="Look and feel your best, at any age. Physician-led longevity and wellness care across Victoria, Langley and Kelowna, BC — built around how you want to live." />
        <link rel="canonical" href="https://agelessliving.com" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ════════════════ HERO — real brand video, one clear message ════════════════ */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-foreground">
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {loadHeroVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        )}

        {/* Soft, even legibility wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/25 to-foreground/60" />

        <div className="relative z-20 h-full flex items-end pb-16 md:items-center md:pb-0">
          <div className="container mx-auto px-5 sm:px-6 lg:px-16">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="eyebrow text-white/80 mb-5"
              >
                Longevity &amp; Wellness · British Columbia
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-white leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Look and feel your
                <br />
                best, <span className="italic">at any age.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
                className="mt-6 max-w-md text-base md:text-lg text-white/85 leading-relaxed"
              >
                Physician-led care, built around how you want to live. Three clinics across BC.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/book"
                  className="group inline-flex items-center justify-center gap-2.5 bg-white text-foreground px-7 py-4 rounded-full font-semibold text-sm transition-colors hover:bg-clinic-teal hover:text-white"
                >
                  Book a consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Explore care
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TRUST STRIP ════════════════ */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-4xl text-foreground">{s.k}</p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ OUTCOMES — start with how you want to feel ════════════════ */}
      <section className="bg-background section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mb-10 md:mb-14"
          >
            <p className="eyebrow mb-4">Where to begin</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
              Start with how you
              <br className="hidden sm:block" /> want to <span className="italic text-clinic-teal">feel.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Not sure where to start? Most people come to us for one of these.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
              >
                <Link
                  to={o.href}
                  className="group block rounded-2xl overflow-hidden bg-card border border-border hover:border-clinic-teal/40 hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={o.img}
                      alt={`${o.title} at Ageless Living`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-clinic-teal transition-colors">
                        {o.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.copy}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ APPROACH — image + short, human copy ════════════════ */}
      <section className="bg-secondary/50 section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={consultationImg} alt="A consultation with an Ageless Living clinician" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] mt-8">
                <img src={treatmentRoomImg} alt="Inside an Ageless Living treatment room" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <p className="eyebrow mb-4">Our approach</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
                We start with you — <span className="italic text-clinic-teal">not a product.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                The real question isn't which treatment. It's how you want to look and feel.
                We listen first, then build a simple plan with you — and adjust it as life does.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/about-us"
                  className="group inline-flex items-center justify-center gap-2.5 bg-clinic-teal text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-clinic-teal-container transition-colors"
                >
                  About us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/faqs"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:border-foreground transition-colors"
                >
                  Common questions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ LOCATIONS ════════════════ */}
      <section className="bg-background section-y">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mb-10 md:mb-14"
          >
            <p className="eyebrow mb-4">Visit us</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
              Three clinics <span className="italic text-clinic-teal">across BC.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <Link to={loc.href} className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <img
                      src={loc.img}
                      alt={`Ageless Living ${loc.name} clinic`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/75 flex items-center gap-1.5 mb-1">
                        <MapPin className="h-3 w-3" /> British Columbia
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-white">{loc.name}</h3>
                      <p className="text-xs text-white/75 mt-1">{loc.address}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CLOSING CTA — warm, minimal ════════════════ */}
      <section className="bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16 py-20 md:py-28 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-5">
              Ready to feel more <span className="italic text-clinic-teal">like yourself?</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-9 max-w-lg mx-auto leading-relaxed">
              Book a consultation and we'll start with what matters most to you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-clinic-teal text-white font-semibold text-sm hover:bg-clinic-teal-container transition-colors"
              >
                Book a consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/20 text-foreground font-semibold text-sm hover:border-foreground transition-colors"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
