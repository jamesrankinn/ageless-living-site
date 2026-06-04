import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight, Heart, Shield, Users } from "lucide-react";
import aboutUs1Img from "@/assets/about-us-1.jpg";
import aboutUs3Img from "@/assets/about-us-3.jpg";
import teamImg from "@/assets/our-team-1.jpg";
import victoriaImg from "@/assets/victoria.png";
import langleyImg from "@/assets/langley.jpg";
import kelownaImg from "@/assets/kelowna.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const locations = [
  { 
    name: "Victoria", 
    address: "740 Hillside Ave #120", 
    city: "Victoria, BC V8T 1Z4",
    phone: "(250) 590-5321",
    hours: "Mon-Fri: 9am-5pm",
    href: "/locations/victoria",
    img: victoriaImg
  },
  { 
    name: "Langley", 
    address: "415-20178 96th Ave", 
    city: "Langley, BC V1M 0B2",
    phone: "(604) 427-0509",
    hours: "Mon-Fri: 9am-5pm",
    href: "/locations/langley",
    img: langleyImg
  },
  { 
    name: "Kelowna", 
    address: "1708 Dolphin Ave #101", 
    city: "Kelowna, BC V1Y 9S4",
    phone: "(250) 860-4116",
    hours: "Mon-Fri: 9am-5pm",
    href: "/locations/kelowna",
    img: kelownaImg
  },
];

const values = [
  {
    icon: Heart,
    title: "Genuine care",
    description: "We treat every patient like family. Your wellbeing is our priority, not upselling treatments you do not need."
  },
  {
    icon: Shield,
    title: "Medical expertise",
    description: "Every treatment is overseen by licensed physicians. We combine proven medical science with modern wellness approaches."
  },
  {
    icon: Users,
    title: "Personalized approach",
    description: "No cookie-cutter solutions. We take time to understand your goals and create a plan tailored specifically to you."
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
                Founded by a pharmacist and physician team, Ageless Living combines the best of traditional medicine with evidence-based wellness treatments. Our approach is simple: listen to our patients, provide honest advice, and deliver results that look natural.
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
                  Today, we have grown to three locations across British Columbia, but our mission remains the same: help everyday people look and feel their best through honest, personalized care.
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
                Our doctors and practitioners are not just highly qualified — they are kind, patient, and truly invested in helping you achieve your goals.
              </p>
              <p className="text-muted-foreground mb-8">
                Every member of our team takes time to listen, explain your options clearly, and answer your questions. We believe that good care starts with understanding.
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
            className="text-center mb-12 md:mb-16"
          >
            <p className="eyebrow mb-3">Visit Us</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
              Three convenient <span className="italic text-primary">BC locations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find a clinic near you. All locations offer the same high-quality care and full range of services.
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
                    <h3 className="text-xl font-display font-normal text-foreground mb-4 group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span>{location.address}<br />{location.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span>{location.hours}</span>
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
              Book a free consultation to discuss your goals with one of our doctors. We will help you find the right path forward.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all"
              >
                Book Your Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
