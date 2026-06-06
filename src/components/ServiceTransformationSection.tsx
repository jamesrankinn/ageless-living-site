import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import botoxImg from "@/assets/real/botox-ageless-living.webp";
import fillerImg from "@/assets/real/dermal-filler-ageless-living.webp";
import ultrafacialImg from "@/assets/real/ultrafacial-ageless-living.webp";
import laserImg from "@/assets/real/laser-ipl-bbl-ageless-living.webp";
import peelImg from "@/assets/real/perfect-derma-peel-ageless-living.webp";
import microneedlingImg from "@/assets/real/microneedling-ageless-living.webp";
import belkyraImg from "@/assets/real/belkyra-ageless-living.webp";
import dermaplaningImg from "@/assets/real/dermaplaning-ageless-living.webp";
import biohackingImg from "@/assets/real/biohacking-ageless-living.webp";
import hormoneImg from "@/assets/real/hormone-balancing-ageless-living.webp";
import weightImg from "@/assets/real/medical-weight-loss-ageless-living.webp";
import skinImg from "@/assets/real/skin-rejuvenation-ageless-living.webp";

/**
 *  <ServiceTransformationSection />
 *  ------------------------------------------------------------------
 *  A calm, honest "what to expect" band for an individual service page:
 *  a real clinic photo paired with short, outcome-led copy and a CTA.
 *
 *  (Replaces the earlier synthetic before/after avatar slider — we don't
 *  present stock or AI portraits as real client results.)
 */

const ease = [0.16, 1, 0.3, 1] as const;

const SERVICE_IMAGE: Record<string, string> = {
  botox: botoxImg,
  "cosmetic-dermal-filler": fillerImg,
  "customized-ultrafacial": ultrafacialImg,
  "laser-ipl-bbl": laserImg,
  "perfect-derma-peel": peelImg,
  microneedling: microneedlingImg,
  belkyra: belkyraImg,
  dermaplaning: dermaplaningImg,
  biohacking: biohackingImg,
  "hormone-balancing": hormoneImg,
  "health-weight": weightImg,
  "skin-rejuvenation": skinImg,
};

type Props = {
  /** Used to pick the matching real photo from SERVICE_IMAGE */
  serviceSlug: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
};

export default function ServiceTransformationSection({
  serviceSlug,
  title = "What to expect",
  eyebrow = "Your care",
  subtitle = "Every plan starts with a conversation and is tailored to you — natural-looking results, at your pace.",
}: Props) {
  const img = SERVICE_IMAGE[serviceSlug] ?? skinImg;

  return (
    <section className="bg-secondary/40 section-y">
      <div className="container mx-auto px-5 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="order-2 lg:order-1"
          >
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-5">
              {title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              {subtitle}
            </p>
            <Link
              to="/book"
              className="group inline-flex items-center justify-center gap-2.5 bg-clinic-teal text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-clinic-teal-container transition-colors"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl md:rounded-[1.75rem] overflow-hidden aspect-[4/3] shadow-lg">
              <img
                src={img}
                alt={`${serviceSlug.replace(/-/g, " ")} care at Ageless Living`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
