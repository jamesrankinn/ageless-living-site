import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Heart, Sparkles, Clock, Phone, MapPin, ChevronRight } from "lucide-react";

import homeImg1 from "@/assets/home-1.jpg";
import homeImg2 from "@/assets/home-2.jpg";
import homeImg3 from "@/assets/home-3.jpg";
import homeImg4 from "@/assets/home-4.jpg";
import skinImg from "@/assets/services-1.jpg";
import hormoneImg from "@/assets/hormone-balancing.jpg";
import biohackingImg from "@/assets/biohacking.jpg";
import weightImg from "@/assets/health-weight.jpg";
import aboutImg from "@/assets/about-us-1.jpg";
import teamImg from "@/assets/our-team-1.jpg";
import victoriaImg from "@/assets/victoria.png";
import langleyImg from "@/assets/langley.jpg";
import kelownaImg from "@/assets/kelowna.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    title: "Hormone Optimization",
    description: "Restore your energy, sleep better, and feel like yourself again with personalized hormone therapy.",
    benefit: "More energy, better sleep, improved mood",
    href: "/services/hormone-balancing",
    img: hormoneImg,
  },
  {
    title: "Skin Rejuvenation",
    description: "Gentle, effective treatments that reveal your natural radiance without looking overdone.",
    benefit: "Smoother skin, natural glow, renewed confidence",
    href: "/services#skin-rejuvenation",
    img: skinImg,
  },
  {
    title: "Medical Weight Management",
    description: "Doctor-supervised programs that work with your body, not against it, for lasting results.",
    benefit: "Sustainable weight loss, more energy, better health",
    href: "/services/health-weight",
    img: weightImg,
  },
  {
    title: "IV Nutrient Therapy",
    description: "Replenish your body at the cellular level for improved energy, immunity, and recovery.",
    benefit: "Increased energy, faster recovery, better immunity",
    href: "/services/biohacking",
    img: biohackingImg,
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
      <section className="relative bg-background pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="max-w-xl"
            >
              <p className="eyebrow mb-4 md:mb-5">
                Trusted by thousands across British Columbia
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-normal text-foreground leading-[1.1] mb-5 md:mb-6">
                Look and feel
                <br />
                <span className="italic text-primary">your best</span> at any age.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                We help real people restore their energy, confidence, and natural vitality through personalized, doctor-led treatments. No gimmicks, no extreme measures — just care that works.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/book"
                  className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-sage-dark text-primary-foreground px-7 py-4 rounded-full font-semibold text-sm transition-all"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-all"
                >
                  View Our Services
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                      <badge.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                      <p className="text-xs text-muted-foreground">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image collage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <img
                    src={homeImg1}
                    alt="Patient consultation at Ageless Living"
                    className="w-full aspect-[3/4] object-cover rounded-2xl"
                  />
                  <img
                    src={homeImg3}
                    alt="Relaxed patient during treatment"
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-3 md:space-y-4 pt-8">
                  <img
                    src={homeImg2}
                    alt="Happy patient after treatment"
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                  <img
                    src={homeImg4}
                    alt="Professional clinic environment"
                    className="w-full aspect-[3/4] object-cover rounded-2xl"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-2xl shadow-xl p-4 md:p-5 border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-sage-light border-2 border-card flex items-center justify-center text-xs font-medium text-primary">
                        {["M", "S", "R"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">280+ happy patients</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS STRIP ══════════════ */}
      <section className="bg-primary py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
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
              >
                <p className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-primary-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-3">How We Can Help You</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
                Treatments that make a <span className="italic text-primary">real difference</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every service is designed to help you feel more energetic, confident, and comfortable in your own skin — naturally.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Link
                  to={service.href}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-xs font-medium text-gold">{service.benefit}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <img
                src={aboutImg}
                alt="Doctor consulting with patient"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <p className="eyebrow mb-3">Why Patients Choose Us</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
                Real doctors. <br />
                <span className="italic text-primary">Real results.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are not a trendy med spa. We are a medical clinic with licensed physicians who take the time to understand your goals and create a personalized plan that actually works.
              </p>

              <div className="space-y-5">
                {[
                  { title: "Honest assessments", desc: "We will tell you what will work — and what will not. No upselling, no pressure." },
                  { title: "Natural-looking results", desc: "Our goal is to help you look refreshed, not different. Subtle improvements that enhance your natural beauty." },
                  { title: "Ongoing support", desc: "Your care does not end after one visit. We follow up and adjust your plan as needed." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
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

              <div className="mt-8">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
                >
                  Learn more about our approach
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-3">Patient Stories</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
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
                className="bg-card rounded-2xl p-6 md:p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center text-sm font-semibold text-primary">
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
      <section className="py-20 md:py-28 bg-sage-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-3">Our Care Team</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
                Caring professionals who <span className="italic text-primary">truly listen</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our physicians and practitioners are not just highly trained — they genuinely care about helping you achieve your goals. Every treatment plan is personalized, and we take the time to explain your options so you feel confident in your decisions.
              </p>
              <p className="text-muted-foreground mb-8">
                Founded by a pharmacist and physician team, Ageless Living combines the best of traditional medicine with modern wellness approaches.
              </p>
              <Link
                to="/our-team"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-sage-dark text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition-all"
              >
                Meet our team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <img
                src={teamImg}
                alt="The Ageless Living medical team"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATIONS ══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-3">Visit Us</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
                Three convenient <span className="italic text-primary">BC locations</span>
              </h2>
              <p className="text-lg text-muted-foreground">
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
                <Link
                  to={location.href}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={location.img}
                      alt={`Ageless Living ${location.name} clinic`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-display font-normal text-foreground mb-3 group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{location.address}<br />{location.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
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
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-primary-foreground mb-4 leading-tight">
              Ready to feel like <span className="italic">yourself</span> again?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Book a free consultation to discuss your goals with one of our doctors. No obligation, no pressure — just honest advice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all"
              >
                Book Your Free Consultation
                <ArrowRight className="w-4 h-4" />
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
