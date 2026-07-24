import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Shield,
  Users,
  Microscope,
  Activity,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";
import aboutUs1Img from "@/assets/about-us-1.jpg";
import aboutUs3Img from "@/assets/about-us-3.jpg";
import teamImg from "@/assets/our-team-1.jpg";
import { clinics } from "@/data/clinics";

const ease = [0.16, 1, 0.3, 1] as const;

// Derived from the single source of truth in data/clinics.ts so the addresses,
// phone numbers, and hours here can never drift from the rest of the site.
const locations = clinics.map((clinic) => ({
  name: clinic.name,
  address: clinic.addressLine1,
  city: clinic.addressLine2,
  phone: clinic.phoneDisplay,
  hours: clinic.hours,
  directions: clinic.mapUrl,
}));

const values = [
  {
    icon: Heart,
    title: "Genuine care",
    description:
      "We treat every patient like family. Your wellbeing is our priority, not upselling treatments you do not need.",
  },
  {
    icon: Shield,
    title: "Medical expertise",
    description:
      "Every treatment is overseen by licensed physicians. We combine proven medical science with modern wellness approaches.",
  },
  {
    icon: Users,
    title: "Personalized approach",
    description:
      "No cookie-cutter solutions. We take time to understand your goals and create a plan tailored specifically to you.",
  },
];

const principles = [
  {
    icon: Microscope,
    title: "We test before we treat",
    description:
      "Every program starts with diagnostics — hormone panels, metabolic markers, and a proper history. Your plan comes from your numbers, not a template handed to everyone.",
  },
  {
    icon: Activity,
    title: "Bio-identical hormones",
    description:
      "Our hormone therapy uses molecules identical to the ones your body already makes. We compound them to the dose your labs call for, then re-check as your body settles in.",
  },
  {
    icon: ShieldCheck,
    title: "A doctor reviews everything",
    description:
      "Injectables, IV therapy, weight programs — a licensed physician signs off before anything begins. That oversight is what separates a medical clinic from a med spa.",
  },
  {
    icon: FlaskConical,
    title: "Equipment with evidence",
    description:
      "We only bring in tools that hold up to scrutiny: Sciton BBL and ICON IPL for skin, hyperbaric oxygen and red-light therapy for recovery, medical-grade testing throughout.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Ageless Living - Trusted Wellness Clinic in BC</title>
        <meta
          name="description"
          content="Founded by a pharmacist and physician team, Ageless Living has helped thousands of British Columbians look and feel their best for over 10 years. Three convenient locations."
        />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-background pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="eyebrow mb-4">About Us</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.1] mb-6">
                Helping you feel like <span className="italic text-primary">yourself</span> again.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                For over a decade, we have been helping everyday people across British Columbia restore their energy, confidence, and natural vitality. We are not a trendy med spa — we are a medical clinic with doctors who genuinely care about your wellbeing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded by a pharmacist and physician team, Ageless Living combines the best of traditional medicine with evidence-based wellness treatments. Our approach is simple: listen to our patients, give honest advice, and deliver results that look natural.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <img
                src={aboutUs1Img}
                alt="Doctor consulting with patient at Ageless Living"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ OUR VALUES ══════════════ */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="eyebrow mb-3">What We Believe</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
              Care you can <span className="italic text-primary">trust</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ OUR STORY ══════════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="order-2 lg:order-1"
            >
              <img
                src={aboutUs3Img}
                alt="The Ageless Living team"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
                Built on a simple idea: <span className="italic text-primary">everyone deserves to feel their best</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ageless Living started over a decade ago with a simple observation: too many people were struggling with fatigue, weight gain, and feeling older than their years — and they were not getting real help.
                </p>
                <p>
                  Our founders, a pharmacist and physician team, believed there had to be a better way. They combined their medical expertise with a genuine desire to help, creating a clinic where patients are treated as individuals, not numbers.
                </p>
                <p>
                  Today we have grown to three locations across British Columbia, but the mission has not changed: help everyday people look and feel their best through honest, personalized care.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/our-team"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
                >
                  Meet our team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ THE SCIENCE ══════════════ */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:col-span-5"
            >
              <p className="eyebrow mb-3">The Science</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
                Good medicine starts with <span className="italic text-primary">information</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Before we recommend a single treatment, we run the bloodwork, read your history, and talk through what you are actually feeling.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A plan built on real lab results looks nothing like a guess, and patients notice the difference. Here is what that looks like in practice.
              </p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="bg-card rounded-2xl p-6 md:p-7 border border-border"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-12 md:mt-16 max-w-3xl text-base md:text-lg text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-6"
          >
            And the work does not stop after your first appointment. We re-test, compare the results, and adjust the plan, because your body keeps changing and your treatment should keep up with it.
          </motion.p>
        </div>
      </section>

      {/* ══════════════ TEAM PREVIEW ══════════════ */}
      <section className="py-16 md:py-24 bg-sage-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-3">Our Team</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
                People who <span className="italic text-primary">genuinely care</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our doctors and practitioners are not just highly qualified — they are kind, patient, and truly invested in helping you reach your goals.
              </p>
              <p className="text-muted-foreground mb-8">
                Every member of our team takes time to listen, explain your options clearly, and answer your questions. We believe good care starts with understanding.
              </p>
              <Link
                to="/our-team"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-sage-dark text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition-all"
              >
                Meet the full team
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
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATIONS ══════════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mb-12 md:mb-16"
          >
            <p className="eyebrow mb-3">Visit Us</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
              Three clinics across <span className="italic text-primary">British Columbia</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the location nearest you. Every clinic offers the same standard of care and the full range of services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {locations.map((location, i) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group relative flex flex-col bg-card rounded-2xl border border-border p-7 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <h3 className="font-display text-2xl font-normal text-foreground mb-6">
                  {location.name}
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground flex-1">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>
                      {location.address}
                      <br />
                      {location.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                    <a
                      href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                <div className="mt-7 pt-6 border-t border-border flex items-center justify-between">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Book a visit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={location.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Directions
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-primary-foreground mb-4 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Book a consultation to discuss your goals with one of our doctors. We will help you find the right path forward.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
