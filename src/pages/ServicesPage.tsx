import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";

import skinImg from "@/assets/real/skin-rejuvenation-ageless-living.webp";
import hormoneImg from "@/assets/real/hormone-balancing-ageless-living.webp";
import biohackingImg from "@/assets/real/biohacking-ageless-living.webp";
import weightImg from "@/assets/real/medical-weight-loss-ageless-living.webp";

const ease = [0.16, 1, 0.3, 1] as const;

type Treatment = { name: string; desc: string; benefits: string[]; href?: string };

type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  treatments: Treatment[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "hormone-balancing",
    title: "Hormone Optimization",
    tagline: "Restore your energy and vitality",
    description: "Feeling tired, foggy, or just not yourself? Hormonal imbalances can affect everything from your mood to your sleep. Our physician-led hormone therapy helps restore balance so you can feel energized and clear-headed again.",
    image: hormoneImg,
    treatments: [
      { 
        name: "Bio-Identical Hormone Therapy", 
        desc: "Personalized hormone replacement using hormones identical to what your body naturally produces.",
        benefits: ["Better sleep quality", "Increased energy", "Improved mood and focus"],
        href: "/services/hormone-balancing" 
      },
      { 
        name: "Comprehensive Hormone Testing", 
        desc: "Complete lab work to understand exactly what your body needs.",
        benefits: ["Detailed hormone panel", "Personalized treatment plan", "Regular monitoring"],
        href: "/services/hormone-balancing" 
      },
      { 
        name: "Menopause Support", 
        desc: "Effective relief from hot flashes, mood swings, and other symptoms.",
        benefits: ["Reduced hot flashes", "Better sleep", "Emotional balance"],
        href: "/services/hormone-balancing" 
      },
      { 
        name: "Men's Testosterone Therapy", 
        desc: "Restore energy, strength, and vitality safely under medical supervision.",
        benefits: ["Increased energy", "Better muscle tone", "Improved libido"],
        href: "/services/hormone-balancing" 
      },
    ],
  },
  {
    id: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    tagline: "Look refreshed, not different",
    description: "Our approach to skin care focuses on natural-looking results. We help reduce fine lines, improve texture, and restore your natural glow — without looking overdone or fake.",
    image: skinImg,
    treatments: [
      { 
        name: "Botox and Dysport", 
        desc: "Smooth fine lines and wrinkles with results that look natural, not frozen.",
        benefits: ["Softer forehead lines", "Reduced crow's feet", "Natural expressions preserved"],
        href: "/services/botox-dysport" 
      },
      { 
        name: "Dermal Fillers", 
        desc: "Restore volume and contour to cheeks, lips, and jawline.",
        benefits: ["Fuller cheeks", "Defined jawline", "Natural-looking results"],
        href: "/services/cosmetic-dermal-filler" 
      },
      { 
        name: "Laser Skin Treatments", 
        desc: "Medical-grade laser to reduce sun damage, redness, and uneven texture.",
        benefits: ["Even skin tone", "Reduced redness", "Smoother texture"],
        href: "/services/laser-ipl-bbl" 
      },
      {
        name: "Customized UltraFacial",
        desc: "Deep cleansing and hydration for instantly glowing skin.",
        benefits: ["Deep pore cleansing", "Intense hydration", "Immediate glow"],
        href: "/services/customized-ultrafacial"
      },
      { 
        name: "Microneedling", 
        desc: "Stimulate your skin's natural collagen for improved texture and firmness.",
        benefits: ["Reduced fine lines", "Smaller pores", "Firmer skin"],
        href: "/services/microneedling" 
      },
      { 
        name: "Medical Peels", 
        desc: "Professional-grade peels for acne, scarring, and uneven pigmentation.",
        benefits: ["Clearer skin", "Faded dark spots", "Smoother complexion"],
        href: "/services/perfect-derma-peel" 
      },
    ],
  },
  {
    id: "health-weight",
    title: "Medical Weight Management",
    tagline: "Sustainable results that last",
    description: "Frustrated with diets that do not work? Our medically-supervised weight management programs combine the latest treatments with ongoing support to help you lose weight safely and keep it off.",
    image: weightImg,
    treatments: [
      { 
        name: "GLP-1 Medications",
        desc: "Physician-prescribed GLP-1 medications for effective, sustainable weight loss.",
        benefits: ["Reduced appetite naturally", "Steady weight loss", "Doctor supervision"],
        href: "/services/health-weight" 
      },
      { 
        name: "Metabolic Assessment", 
        desc: "Comprehensive testing to understand your unique metabolism.",
        benefits: ["Personalized insights", "Targeted treatment", "Better results"],
        href: "/services/health-weight" 
      },
      { 
        name: "Nutritional Counseling", 
        desc: "Practical dietary guidance that fits your lifestyle.",
        benefits: ["Realistic meal plans", "Sustainable habits", "Ongoing support"],
        href: "/services/health-weight" 
      },
    ],
  },
  {
    id: "biohacking",
    title: "IV Therapy and Wellness",
    tagline: "Feel better from the inside out",
    description: "Sometimes your body needs a boost. Our IV therapies and wellness treatments deliver nutrients directly to your cells, helping with energy, immunity, and recovery.",
    image: biohackingImg,
    treatments: [
      { 
        name: "IV Vitamin Therapy", 
        desc: "Customized IV infusions to boost energy, immunity, and overall wellness.",
        benefits: ["Increased energy", "Stronger immunity", "Better hydration"],
        href: "/services/biohacking" 
      },
      { 
        name: "NAD+ Therapy", 
        desc: "Support cellular health and mental clarity with NAD+ infusions.",
        benefits: ["Mental clarity", "Cellular repair", "Anti-aging support"],
        href: "/services/biohacking" 
      },
      { 
        name: "Red Light Therapy", 
        desc: "Non-invasive light therapy to support skin health and recovery.",
        benefits: ["Skin rejuvenation", "Faster recovery", "Reduced inflammation"],
        href: "/services/biohacking" 
      },
      { 
        name: "Hyperbaric Oxygen Therapy", 
        desc: "Increased oxygen delivery to support healing and cognitive function.",
        benefits: ["Enhanced healing", "Better focus", "Improved sleep"],
        href: "/services/biohacking" 
      },
    ],
  },
];

export default function ServicesPage() {
  const location = useLocation();
  const [active, setActive] = useState<string>(serviceCategories[0].id);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const sections = serviceCategories
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | Ageless Living - Natural Anti-Aging Treatments</title>
        <meta
          name="description"
          content="Explore our range of natural anti-aging and wellness treatments including hormone optimization, skin rejuvenation, medical weight management, and IV therapy. Physician-led care at three BC locations."
        />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-background pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="eyebrow mb-4">Our Services</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.1] mb-6">
                Treatments that help you
                <br />
                <span className="italic text-primary">look and feel your best</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Every treatment we offer is designed with one goal: helping everyday people restore their energy, confidence, and natural vitality. All services are doctor-supervised and tailored to your individual needs.
              </p>
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-sage-dark text-primary-foreground px-7 py-4 rounded-full font-semibold text-sm transition-all"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ NAVIGATION + SERVICES ══════════════ */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="mb-10 md:mb-14 rounded-2xl border border-border bg-secondary/30 px-5 py-4 md:px-6 md:py-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Please note:</span>{" "}
              Available treatments, technologies, and product lines vary by
              clinic and continue to evolve. The right options for you are always
              confirmed during an individual consultation based on your goals.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            {/* Sticky side navigation - desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <p className="eyebrow mb-6">Jump to</p>
                <nav className="flex flex-col border-l border-border">
                  {serviceCategories.map((cat) => {
                    const isActive = active === cat.id;
                    return (
                      <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className={`-ml-px border-l-2 py-3 pl-5 transition-all ${
                          isActive
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        <span className="text-sm font-medium">{cat.title}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-10 p-5 bg-sage-light rounded-2xl">
                  <h4 className="font-semibold text-foreground mb-2">Have questions?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reach the team at your nearest clinic — Langley, Victoria, or
                    Kelowna.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    <Phone className="w-4 h-4" />
                    Contact your clinic
                  </Link>
                </div>
              </div>
            </aside>

            {/* Mobile navigation */}
            <div className="lg:hidden col-span-12 -mx-4 sm:-mx-6 overflow-x-auto scrollbar-none mb-8">
              <div className="flex gap-2 px-4 sm:px-6 pb-2">
                {serviceCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-medium transition-all ${
                      active === cat.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Service sections */}
            <div className="col-span-12 lg:col-span-9 space-y-20 md:space-y-28">
              {serviceCategories.map((category) => (
                <article
                  id={category.id}
                  key={category.id}
                  className="scroll-mt-24"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    {/* Category header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-12">
                      <div>
                        <p className="eyebrow mb-3">{category.tagline}</p>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                        <img
                          src={category.image}
                          alt={category.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Treatments grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {category.treatments.map((treatment) => {
                        const content = (
                          <div className="group bg-card rounded-xl p-5 md:p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all h-full">
                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {treatment.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {treatment.desc}
                            </p>
                            <div className="space-y-2">
                              {treatment.benefits.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2.5 h-2.5 text-primary" />
                                  </div>
                                  <span className="text-xs text-muted-foreground">{benefit}</span>
                                </div>
                              ))}
                            </div>
                            {treatment.href && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                                  Learn more
                                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            )}
                          </div>
                        );
                        
                        return treatment.href ? (
                          <Link to={treatment.href} key={treatment.name} className="block h-full">
                            {content}
                          </Link>
                        ) : (
                          <div key={treatment.name} className="h-full">{content}</div>
                        );
                      })}
                    </div>
                  </motion.div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-primary-foreground mb-4 leading-tight">
              Not sure which treatment is right for you?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Book a consultation and our doctors will help you find the best options for your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Contact a Clinic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
