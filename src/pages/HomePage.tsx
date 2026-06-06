import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, Shield, Heart, Clock, Phone, MapPin } from "lucide-react";

import heroMain from "@/assets/gen/hero-main.png";
import heroSecondary from "@/assets/gen/hero-2.png";
import hormoneImg from "@/assets/gen/hormone.png";
import skinImg from "@/assets/gen/skin.png";
import weightImg from "@/assets/gen/weight.png";
import ivImg from "@/assets/gen/iv.png";
import doctorImg from "@/assets/gen/doctor.png";
import teamImg from "@/assets/gen/team.png";
import victoriaImg from "@/assets/gen/victoria.png";
import langleyImg from "@/assets/gen/langley.png";
import kelownaImg from "@/assets/gen/kelowna.png";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    num: "01",
    title: "Hormone Optimization",
    description: "Restore your energy, sleep better, and feel like yourself again with personalized hormone therapy.",
    benefit: "More energy, better sleep, improved mood",
    href: "/services/hormone-balancing",
    img: hormoneImg,
  },
  {
    num: "02",
    title: "Skin Rejuvenation",
    description: "Gentle, effective treatments that reveal your natural radiance without looking overdone.",
    benefit: "Smoother skin, natural glow, renewed confidence",
    href: "/services#skin-rejuvenation",
    img: skinImg,
  },
  {
    num: "03",
    title: "Medical Weight Management",
    description: "Doctor-supervised programs that work with your body, not against it, for lasting results.",
    benefit: "Sustainable weight loss, more energy, better health",
    href: "/services/health-weight",
    img: weightImg,
  },
  {
    num: "04",
    title: "IV Nutrient Therapy",
    description: "Replenish your body at the cellular level for improved energy, immunity, and recovery.",
    benefit: "Increased energy, faster recovery, better immunity",
    href: "/services/biohacking",
    img: ivImg,
  },
];

const testimonials = [
  {
    quote: "I finally feel like myself again. After struggling with fatigue for years, the hormone optimization program gave me my energy back. I can keep up with my grandkids now.",
    name: "Margaret T.",
    age: 58,
    location: "Victoria",
  },
  {
    quote: "The team here actually listens. They explained everything clearly and never made me feel rushed. My skin looks refreshed, not fake — exactly what I wanted.",
    name: "Susan K.",
    age: 52,
    location: "Langley",
  },
  {
    quote: "I was skeptical about weight management programs, but this one is different. The doctors work with you, not against you. I have lost 35 pounds and kept it off for over a year.",
    name: "Robert M.",
    age: 61,
    location: "Kelowna",
  },
];

const locations = [
  { name: "Victoria", address: "740 Hillside Ave #120", city: "Victoria, BC", href: "/locations/victoria", img: victoriaImg, phone: "(250) 590-5321" },
  { name: "Langley", address: "415-20178 96th Ave", city: "Langley, BC", href: "/locations/langley", img: langleyImg, phone: "(604) 427-0509" },
  { name: "Kelowna", address: "1708 Dolphin Ave #101", city: "Kelowna, BC", href: "/locations/kelowna", img: kelownaImg, phone: "(250) 860-4116" },
];

const trustBadges = [
  { icon: Shield, label: "Physician-Led Care", desc: "Every treatment overseen by licensed doctors" },
  { icon: Heart, label: "10+ Years Experience", desc: "Trusted by thousands of patients across BC" },
  { icon: Star, label: "4.9 Star Rating", desc: "Based on 280+ verified patient reviews" },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ageless Living Wellness Centre",
    description: "A trusted medical clinic specializing in natural anti-aging, wellness, and aesthetic treatments. Helping everyday people look and feel their best.",
    url: "https://agelessliving.com",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "287", bestRating: "5" },
    address: [
      { "@type": "PostalAddress", streetAddress: "415-20178 96th Ave", addressLocality: "Langley", addressRegion: "BC", postalCode: "V1M 0B2", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "1708 Dolphin Ave #101", addressLocality: "Kelowna", addressRegion: "BC", postalCode: "V1Y 9S4", addressCountry: "CA" },
      { "@type": "PostalAddress", streetAddress: "740 Hillside Ave #120", addressLocality: "Victoria", addressRegion: "BC", postalCode: "V8T 1Z4", addressCountry: "CA" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ageless Living | Natural Anti-Aging and Wellness Clinic in BC</title>
        <meta name="description" content="A trusted medical clinic helping everyday people look and feel their best through natural anti-aging, hormone optimization, skin rejuvenation, and wellness treatments. Three locations in Victoria, Langley, and Kelowna." />
        <link rel="canonical" href="https://agelessliving.com" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 pt-28 md:pt-36 pb-0">
          {/* Centered editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-center max-w-5xl mx-auto"
          >
            <p className="eyebrow mb-6">Trusted by thousands across British Columbia</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal text-foreground leading-[0.98] tracking-tight text-balance">
              Look and feel <span className="italic text-primary">your best</span>
              <br className="hidden sm:block" /> at any age.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              We help real people restore their energy, confidence, and natural vitality through personalized, doctor-led treatments. No gimmicks, no extreme measures — just care that works.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-sage-dark text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm transition-all"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-all"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>

          {/* Full-bleed hero imagery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative mt-14 md:mt-20"
          >
            <div className="grid grid-cols-12 gap-3 md:gap-5 items-end">
              <div className="col-span-3 hidden md:block">
                <img
                  src={heroSecondary}
                  alt="An energetic, healthy patient enjoying life"
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <img
                  src={heroMain}
                  alt="A radiant, confident patient at Ageless Living"
                  className="w-full aspect-[4/5] md:aspect-[3/3.4] object-cover rounded-2xl md:rounded-3xl"
                />
              </div>
              <div className="col-span-3 hidden md:flex flex-col gap-5">
                <div className="bg-sage-light rounded-2xl p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-display text-3xl text-primary leading-none">4.9</p>
                  <p className="text-xs text-muted-foreground mt-1">from 280+ verified reviews</p>
                </div>
                <img
                  src={doctorImg}
                  alt="A doctor consulting with a patient"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 py-10 md:py-14 mt-8 border-t border-border"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ STATS STRIP ══════════════ */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { value: "10+", label: "Years helping patients" },
              { value: "4.9", label: "Average patient rating" },
              { value: "3", label: "Convenient BC locations" },
              { value: "100%", label: "Doctor-supervised care" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="text-center md:text-left md:border-l md:border-primary-foreground/15 md:pl-6 first:md:border-l-0 first:md:pl-0"
              >
                <p className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-primary-foreground leading-none">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.15em] text-primary-foreground/70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-4">How We Can Help You</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.05] text-balance">
                Treatments that make a <span className="italic text-primary">real difference</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
                Every service is designed to help you feel more energetic, confident, and comfortable in your own skin — naturally.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease }}
              >
                <Link to={service.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl">
                    <img
                      src={service.img}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 font-display text-sm text-primary-foreground/90 bg-foreground/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                      {service.num}
                    </span>
                    <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </span>
                  </div>
                  <div className="pt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-gold mb-2">{service.benefit}</p>
                    <h3 className="text-2xl md:text-3xl font-display font-normal text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground max-w-md">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 md:mt-20 flex justify-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
            >
              View all services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="py-20 md:py-32 bg-cream-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="relative order-2 lg:order-1"
            >
              <img
                src={doctorImg}
                alt="Doctor consulting with patient"
                className="w-full aspect-[4/5] object-cover rounded-2xl md:rounded-3xl"
              />
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-card rounded-2xl shadow-xl p-5 md:p-6 border border-border max-w-[220px]">
                <p className="font-display text-4xl text-primary leading-none">10+</p>
                <p className="text-sm text-muted-foreground mt-2">years caring for patients across British Columbia</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow mb-4">Why Patients Choose Us</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.05] text-balance">
                Real doctors. <span className="italic text-primary">Real results.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                We are not a trendy med spa. We are a medical clinic with licensed physicians who take the time to understand your goals and create a personalized plan that actually works.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { title: "Honest assessments", desc: "We will tell you what will work — and what will not. No upselling, no pressure." },
                  { title: "Natural-looking results", desc: "Our goal is to help you look refreshed, not different. Subtle improvements that enhance your natural beauty." },
                  { title: "Ongoing support", desc: "Your care does not end after one visit. We follow up and adjust your plan as needed." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 border-t border-border pt-6">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/about-us"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
                >
                  Learn more about our approach
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-4">Patient Stories</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.05] text-balance">
                Hear from people <span className="italic text-primary">like you</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="flex flex-col bg-card border border-border rounded-2xl md:rounded-3xl p-7 md:p-8 shadow-sm"
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-display text-lg md:text-xl text-foreground leading-relaxed flex-1 text-pretty">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-sage-light flex items-center justify-center text-sm font-semibold text-primary">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MEET THE TEAM ══════════════ */}
      <section className="py-20 md:py-32 bg-sage-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-4">Our Care Team</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.05] text-balance">
                Caring professionals who <span className="italic text-primary">truly listen</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Our physicians and practitioners are not just highly trained — they genuinely care about helping you achieve your goals. Every treatment plan is personalized, and we take the time to explain your options so you feel confident in your decisions.
              </p>
              <p className="mt-4 text-muted-foreground">
                Founded by a pharmacist and physician team, Ageless Living combines the best of traditional medicine with modern wellness approaches.
              </p>
              <Link
                to="/our-team"
                className="group mt-9 inline-flex items-center gap-2 bg-primary hover:bg-sage-dark text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
              >
                Meet our team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <img
                src={teamImg}
                alt="The Ageless Living medical team"
                className="w-full aspect-[4/3] object-cover rounded-2xl md:rounded-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATIONS ══════════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-4">Visit Us</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.05] text-balance">
                Three convenient <span className="italic text-primary">BC locations</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Find a clinic near you and schedule your consultation today.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {locations.map((location, i) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <Link to={location.href} className="group block">
                  <div className="aspect-[16/11] overflow-hidden rounded-2xl md:rounded-3xl">
                    <img
                      src={location.img}
                      alt={`Ageless Living ${location.name} clinic`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-5">
                    <h3 className="text-2xl font-display font-normal text-foreground group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span>{location.address}<br />{location.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span>Mon-Fri: 9am-5pm</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="pb-20 md:pb-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 md:px-16 md:py-24 text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-primary-foreground leading-[1.05] max-w-3xl mx-auto text-balance">
              Ready to feel like <span className="italic">yourself</span> again?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto text-pretty">
              Book a free consultation to discuss your goals with one of our doctors. No obligation, no pressure — just honest advice.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all"
              >
                Book Your Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+12363266830"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call (236) 326-6830
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
