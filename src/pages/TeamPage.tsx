import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, User, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getStaffByLocation,
  getStaffAltText,
  type StaffMember,
} from "@/data/staffData";
import AglessPattern from "@/components/AglessPattern";

// Displayed in the hero collage. Client requested these three founders shown
// here (no group photo available) — using their individual headshots.
const heroFounders = [
  {
    name: "Michael Forbes",
    title: "Owner, Pharmacist",
    img: "/team/michael-forbes.webp",
  },
  {
    name: "Dr. Jean Paul Lim",
    title: "Owner, Internal Medicine",
    img: "/team/dr-jean-paul-lim.webp",
  },
  {
    name: "Sarita Hutton",
    title: "Director of Aesthetic Medicine",
    img: "/team/sarita-hutton.webp",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function TeamCard({
  member,
  section,
}: {
  member: StaffMember;
  section: string;
}) {
  const hasPhoto =
    member.image &&
    !member.image.includes("placeholder") &&
    !member.image.startsWith("/images/team/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease }}
    >
      <Link
        to={`/our-team/${member.slug}`}
        state={{ from: section }}
        className="group block h-full rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
          {hasPhoto ? (
            <img
              src={member.image}
              alt={getStaffAltText(member)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          {/* Subtle gradient for depth + a hover affordance */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-primary translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {member.role}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

const langleyTeam = getStaffByLocation("langley");
const kelownaTeam = getStaffByLocation("kelowna");
const victoriaTeam = getStaffByLocation("victoria");

const locationSections = [
  {
    id: "langley",
    label: "Langley",
    title: "Langley Clinic",
    blurb: "Specialized care and innovative wellness protocols.",
    team: langleyTeam,
  },
  {
    id: "kelowna",
    label: "Kelowna",
    title: "Kelowna Clinic",
    blurb: "Integrative therapies in a peaceful clinical setting.",
    team: kelownaTeam,
  },
  {
    id: "victoria",
    label: "Victoria",
    title: "Victoria Clinic",
    blurb: "Advanced aesthetic medicine and personalized care.",
    team: victoriaTeam,
  },
];

export default function TeamPage() {
  return (
    <>
      <Helmet>
        <title>Meet the Team | Ageless Living™ — Expert Clinical Care</title>
        <meta
          name="description"
          content="Meet the dedicated team of physicians, specialists, and clinical professionals behind Ageless Living™ across Victoria, Langley, and Kelowna."
        />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 bg-secondary/30 overflow-hidden">
        <AglessPattern opacity={0.05} size={130} />
        <div className="relative container mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="text-primary font-semibold tracking-widest uppercase text-xs">
                Meet the Team
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05]">
                The people behind
                <br className="hidden sm:block" /> your care
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                The brainchild of pharmacist and physician (MD) founders,
                Ageless blends the best of traditional medicine with
                groundbreaking wellness therapies — delivered by a team that
                takes the time to truly know you.
              </p>
              <div className="flex flex-wrap gap-8 pt-2">
                <div>
                  <p className="text-3xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">BC clinics</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">10+</p>
                  <p className="text-sm text-muted-foreground">Years of care</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">MD-led</p>
                  <p className="text-sm text-muted-foreground">Every protocol</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {heroFounders.map((f, i) => (
                  <div key={f.name} className={i === 1 ? "mt-6 md:mt-10" : ""}>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-secondary/30">
                      <img
                        src={f.img}
                        alt={`${f.name}, ${f.title} at Ageless Living`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2.5 text-center text-xs font-semibold text-foreground leading-tight">
                      {f.name}
                    </p>
                    <p className="text-center text-[11px] text-muted-foreground leading-tight">
                      {f.title}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm italic text-muted-foreground text-center max-w-md mx-auto">
                "Integrating traditional precision with future-focused wellness."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATION FILTER ══════════════ */}
      <section className="sticky top-[64px] z-30 bg-background/85 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto section-padding">
          <div className="flex justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-3">
            {locationSections.map((loc) => (
              <a
                key={loc.id}
                href={`#${loc.id}`}
                className="group flex items-center gap-2 shrink-0 px-5 py-2 rounded-full border border-border/60 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                {loc.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM SECTIONS ══════════════ */}
      <main className="container mx-auto section-padding py-14 md:py-20 space-y-16 md:space-y-24">
        {locationSections.map((loc) => (
          <section key={loc.id} id={loc.id} className="scroll-mt-32">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {loc.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{loc.blurb}</p>
              </div>
              <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                {loc.team.length} {loc.team.length === 1 ? "specialist" : "specialists"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {loc.team.map((member) => (
                <TeamCard key={member.slug} member={member} section={loc.id} />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ══════════════ CTA ══════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto section-padding">
          <div className="rounded-3xl bg-primary/5 border border-primary/15 px-6 py-12 md:px-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
              Ready to meet your care team?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Book a consultation at the clinic nearest you — Langley, Victoria,
              or Kelowna — and start a plan built around your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-colors hover:bg-sage-dark w-full sm:w-auto"
              >
                Book a Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-colors hover:bg-secondary/60 w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
