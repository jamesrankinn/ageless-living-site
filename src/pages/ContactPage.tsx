import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
  ArrowRight,
  Navigation,
  Instagram,
  Facebook,
} from "lucide-react";
import { saveContactLead } from "@/lib/contactLeads";
import { clinics, type ClinicId } from "@/data/clinics";
import langleyImg from "@/assets/real/langley-clinic-ageless-living.webp";
import victoriaImg from "@/assets/real/victoria-clinic-ageless-living.webp";
import kelownaImg from "@/assets/real/kelowna-clinic-ageless-living.webp";

const ease = [0.16, 1, 0.3, 1] as const;

const clinicImages: Record<ClinicId, string> = {
  langley: langleyImg,
  victoria: victoriaImg,
  kelowna: kelownaImg,
};

const clinicImageAlt: Record<ClinicId, string> = {
  langley: "Ageless Living Langley clinic reception and treatment space",
  victoria: "Ageless Living Victoria clinic reception and treatment space",
  kelowna: "Ageless Living Kelowna clinic reception and treatment space",
};

const interests = [
  "General Question",
  "Hormone Optimization",
  "Skin Rejuvenation",
  "Medical Weight Management",
  "IV Therapy & Wellness",
  "Booking Help",
  "Other",
];

const locationValues = ["langley", "victoria", "kelowna", "unsure"] as const;

const schema = z.object({
  firstName: z.string().min(2, "Please enter your first name."),
  lastName: z.string().min(2, "Please enter your last name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  location: z.enum(locationValues),
  interest: z.string().min(1, "Please select a reason for contacting us."),
  message: z.string().min(10, "Please tell us a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-shadow";

export default function ContactPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "unsure",
      interest: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const result = await saveContactLead(values);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    reset();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Ageless Living™ — Langley, Victoria & Kelowna</title>
        <meta
          name="description"
          content="Get in touch with Ageless Living™. Call, email, or visit our Langley, Victoria, or Kelowna clinics — or send us a message and our team will reply within one business day."
        />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary/30">
        <div className="container mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl"
          >
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Contact
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 leading-[1.1]">
              We'd love to hear from you
            </h1>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Questions about a treatment, pricing, or which clinic is right for
              you? Reach out directly to any of our three BC locations, or send
              us a message and our team will reply within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CLINIC CARDS ══════════════ */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {clinics.map((clinic, i) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden bg-secondary/30">
                  <img
                    src={clinicImages[clinic.id]}
                    alt={clinicImageAlt[clinic.id]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-foreground">
                    {clinic.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 mb-5">
                    {clinic.tagline}
                  </p>

                  <div className="space-y-3 text-sm">
                    <p className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        {clinic.addressLine1}
                        <br />
                        {clinic.addressLine2}
                      </span>
                    </p>
                    <a
                      href={`tel:${clinic.phoneTel}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      {clinic.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${clinic.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      {clinic.email}
                    </a>
                    <p className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      {clinic.hours}
                    </p>
                  </div>

                  <div className="mt-auto pt-5 border-t border-border/60 flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/book?location=${clinic.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-colors hover:bg-sage-dark"
                    >
                      Book here
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={clinic.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border text-foreground text-sm font-medium transition-colors hover:bg-secondary/60"
                    >
                      <Navigation className="h-4 w-4" />
                      Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MESSAGE FORM ══════════════ */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto section-padding">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Info — left */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease }}
              className="lg:col-span-5"
            >
              <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Send a message
              </p>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4 leading-tight">
                Prefer to write to us?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Fill out the form and a member of our team will get back to you
                within one business day. For the fastest response, call the
                clinic nearest you.
              </p>

              <div className="space-y-4 text-sm">
                <a
                  href="tel:+12363266830"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </span>
                  +1 (236) 326-6830
                </a>
                <a
                  href="mailto:wellness@agelessliving.ca"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </span>
                  wellness@agelessliving.ca
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </span>
                  Mon–Fri: 9am–5pm · Sat by appointment
                </p>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <a
                  href="https://www.instagram.com/agelessliving_bc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ageless Living on Instagram"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/agelesslivingwellness"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ageless Living on Facebook"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>

            {/* Form — right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-7 bg-card rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/50 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Thank you — your message is on its way.
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      A member of our team will get back to you within one
                      business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                          First name
                        </label>
                        <input id="firstName" type="text" autoComplete="given-name" {...register("firstName")} className={fieldClass} />
                        {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                          Last name
                        </label>
                        <input id="lastName" type="text" autoComplete="family-name" {...register("lastName")} className={fieldClass} />
                        {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                          Email
                        </label>
                        <input id="email" type="email" autoComplete="email" {...register("email")} className={fieldClass} />
                        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                          Phone
                        </label>
                        <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className={fieldClass} />
                        {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1.5">
                          Nearest clinic
                        </label>
                        <select id="location" {...register("location")} className={fieldClass}>
                          <option value="unsure">Not sure yet</option>
                          <option value="langley">Langley</option>
                          <option value="victoria">Victoria</option>
                          <option value="kelowna">Kelowna</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-1.5">
                          Reason for contact
                        </label>
                        <select id="interest" {...register("interest")} className={fieldClass} defaultValue="">
                          <option value="" disabled>
                            Select an option
                          </option>
                          {interests.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        {errors.interest && <p className="mt-1.5 text-xs text-red-500">{errors.interest.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                        Your message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        placeholder="How can we help you today?"
                        className={`${fieldClass} resize-none`}
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    {serverError && <p className="text-xs text-red-500">{serverError}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-colors hover:bg-sage-dark disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <p className="text-[11px] text-muted-foreground">
                      By submitting, you agree to be contacted by our team. We
                      never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
