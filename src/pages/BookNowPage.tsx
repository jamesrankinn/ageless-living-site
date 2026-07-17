import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Check, ArrowRight } from "lucide-react";
import { saveContactLead } from "@/lib/contactLeads";
import { clinics } from "@/data/clinics";

const ease = [0.16, 1, 0.3, 1] as const;

const locations = clinics.map((c) => ({
  name: c.name,
  address: `${c.addressLine1}, ${c.addressLine2}`,
  phone: c.phoneDisplay,
  email: c.email,
}));

const locationValues = ["langley", "victoria", "kelowna", "unsure"] as const;

const interests = [
  "Hormone Optimization",
  "Skin Rejuvenation",
  "Medical Weight Management",
  "IV Therapy & Wellness",
  "General Consultation",
  "Other",
];

const schema = z.object({
  firstName: z.string().min(2, "Please enter your first name."),
  lastName: z.string().min(2, "Please enter your last name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  location: z.enum(locationValues),
  interest: z.string().min(1, "Please select an area of interest."),
  message: z.string().min(10, "Please tell us a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-shadow";

export default function BookNowPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  // Allow deep-linking a preferred clinic, e.g. /book?location=langley, so the
  // "Book at this clinic" CTAs across the site land on the form pre-filled.
  const requestedLocation = searchParams.get("location");
  const initialLocation = (locationValues as readonly string[]).includes(
    requestedLocation ?? "",
  )
    ? (requestedLocation as FormValues["location"])
    : "unsure";

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
      location: initialLocation,
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
        <title>Book Now | Ageless Living™ — Reserve Your Consultation</title>
        <meta
          name="description"
          content="Book your Ageless Living™ consultation. Complete our intake form and our Langley, Victoria, or Kelowna team will be in touch within one business day."
        />
      </Helmet>

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mb-10 md:mb-14"
          >
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary mb-2 md:mb-3">
              Book Now
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 md:mb-4 leading-[1.1]">
              Start your journey
            </h1>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Complete our intake form and our team will be in touch within one
              business day to help you book your first consultation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Location contact info — left */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease }}
              className="lg:col-span-5 space-y-5"
            >
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="bg-secondary rounded-2xl p-6 md:p-7 border border-border/40"
                >
                  <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
                    {loc.name}
                  </h2>
                  <div className="space-y-3">
                    <p className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {loc.address}
                    </p>
                    <a
                      href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      {loc.phone}
                    </a>
                    <a
                      href={`mailto:${loc.email}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      {loc.email}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3 px-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>
                  Monday – Friday: 9am – 5pm
                  <br />
                  Saturday: By appointment
                </span>
              </div>
            </motion.aside>

            {/* Intake form — right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-7 bg-secondary rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/40"
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
                      Thank you — we've received your intake.
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      A member of our team will reach out within one business day
                      to confirm the details and schedule your consultation.
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
                          Preferred location
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
                          Area of interest
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
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        placeholder="Tell us about your goals or any questions you have."
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
                      {isSubmitting ? "Sending…" : "Submit Intake"}
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
