export type Location = "langley" | "kelowna" | "victoria";

export interface StaffMember {
  name: string;
  slug: string;
  role: string;
  credentials: string;
  image: string;
  locations: Location[];
  bio: string;
  education: string[];
  specializations: string[];
  treatments: string[];
  availability: string;
  funFact?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  email?: string;
  phone?: string;
}

/**
 * Image naming convention: /images/team/[firstname-lastname]-headshot.webp
 * Alt text pattern: "Photo of [Name] - [Title], Ageless Living"
 *
 * To replace placeholders:
 * 1. Add your .webp images to /public/images/team/
 * 2. Update the `image` field below with the correct filename
 *
 * Current images use existing live URLs where available.
 * Members without photos use placeholder paths — upload real headshots there.
 */

export const staffMembers: StaffMember[] = [
  // ─── Owners / Founders ────────────────────────────────────────
  {
    name: "Michael Forbes, BSc Pharm",
    slug: "michael-forbes",
    role: "Owner, Pharmacist, Certified in Hormone Restoration",
    credentials: "BSc Pharm",
    image: "/team/michael-forbes.webp",
    locations: ["langley", "kelowna", "victoria"],
    bio: "Michael founded Ageless Living with a vision to bring evidence-based wellness solutions to British Columbia. With decades of pharmaceutical expertise and a deep commitment to patient care, he leads our hormone restoration and longevity programs. His unique background in compounding pharmacy allows him to create customized treatment protocols that address each client's specific needs. Michael believes that optimal health is achievable at every age and is passionate about helping clients feel their best through scientifically-backed therapies.",
    education: [
      "BSc Pharmacy — University of British Columbia",
      "Compounding Pharmacist Certification",
      "Advanced Hormone Restoration Training",
      "Certified in Hormone Restoration Therapy",
    ],
    specializations: [
      "Hormone Restoration (BHRT)",
      "Compounding Pharmacy",
      "Longevity Medicine",
      "Peptide Therapy Protocols",
    ],
    treatments: ["Hormone Balancing (BHRT)", "IV Therapy & NAD+", "Peptide Therapy"],
    availability: "Mon–Fri 9:00am–5:00pm",
    email: "michael@agelessliving.ca",
    phone: "+1 (236) 326-6830",
  },
  {
    name: "Dr. Jean Paul Lim, MD, FRCPC",
    slug: "dr-jean-paul-lim",
    role: "Owner, Internal Medicine, Complex Care, and Longevity Specialist",
    credentials: "MD, FRCPC",
    image: "/team/dr-jean-paul-lim.webp",
    locations: ["langley", "kelowna", "victoria"],
    bio: "Dr. Lim brings a rare combination of internal medicine expertise and longevity science to Ageless Living. Board-certified and fellowship-trained, he designs personalized biohacking and metabolic protocols that help clients unlock peak performance and vitality. With years of experience in complex care, Dr. Lim takes a comprehensive approach to each patient — addressing root causes rather than symptoms. His focus on evidence-based longevity medicine makes him a trusted partner for clients seeking to optimize their healthspan.",
    education: [
      "MD — University of Alberta",
      "FRCPC — Internal Medicine (Royal College of Physicians and Surgeons of Canada)",
      "Fellowship in Metabolic Health",
      "Advanced Longevity Medicine Training",
    ],
    specializations: [
      "FRCPC Internal Medicine",
      "Complex Care",
      "Longevity & Anti-Aging Medicine",
      "Metabolic Health Optimization",
    ],
    treatments: ["Biohacking", "Hormone Balancing (BHRT)", "Health Weight Management"],
    availability: "Mon–Thu 9:00am–5:00pm",
    email: "info@agelessliving.ca",
    phone: "+1 (236) 326-6830",
  },
  {
    name: "Sarita Hutton",
    slug: "sarita-hutton",
    role: "Owner, Aesthetic Nurse Specialist, Director of Aesthetic Medicine",
    credentials: "RN, Aesthetic Nurse Specialist",
    image: "/team/sarita-hutton.webp",
    locations: ["victoria"],
    bio: "Sarita is a passionate aesthetic nurse specialist who leads our Victoria clinic with artistry, precision, and a deep commitment to natural-looking results. Her advanced training in facial aesthetics and skin science has made her one of BC's most sought-after aesthetic practitioners. As Director of Aesthetic Medicine, Sarita sets the standard of care across all Ageless Living aesthetic services. She believes that every client deserves a personalized treatment plan that enhances their natural beauty while supporting long-term skin health.",
    education: [
      "Registered Nurse (RN)",
      "Aesthetic Nurse Specialist Certification",
      "Advanced Injectable Training — Allergan & Galderma",
      "Skin Science Diploma",
    ],
    specializations: [
      "Aesthetic Nurse Specialist",
      "Advanced Injectables (Botox, Filler)",
      "Skin Science & Rejuvenation",
      "Facial Aesthetics & Contouring",
    ],
    treatments: ["Skin Rejuvenation", "Aesthetic Injectables", "IV Therapy & NAD+"],
    availability: "Mon–Fri 9:00am–5:00pm · Sat by appointment",
    instagram: "https://www.instagram.com/agelessliving_bc/",
    email: "wellness@agelessliving.ca",
    phone: "+1 (250) 590-5787",
  },

  // ─── Kelowna Team ─────────────────────────────────────────────
  {
    name: "Dr. Vicky Gairns, ND",
    slug: "vicky-gairns",
    role: "Naturopathic Doctor",
    credentials: "ND",
    // Headshot pending from the Kelowna clinic — upload to
    // /public/team/vicky-gairns.webp then change this path to
    // "/team/vicky-gairns.webp". Until then the profile shows a placeholder
    // avatar rather than a broken image.
    image: "/images/team/vicky-gairns.webp",
    locations: ["kelowna"],
    bio: "Dr. Vicky Gairns is a licensed Naturopathic Doctor at our Kelowna clinic, where she blends evidence-informed naturopathic medicine with the clinic's integrative and longevity approach. She works closely with patients to uncover the root causes behind fatigue, hormone changes, and stubborn metabolic concerns, then builds personalized plans that combine nutrition, targeted supplementation, IV therapy, and lifestyle medicine. Dr. Gairns believes in treating the whole person rather than just the symptoms, and takes the time to listen so every patient feels understood and supported on their path to feeling their best.",
    education: [
      "Doctor of Naturopathic Medicine (ND)",
      "Registered Naturopathic Doctor — British Columbia",
    ],
    specializations: [
      "Naturopathic Medicine",
      "Integrative & Functional Medicine",
      "IV Therapy & Nutrient Support",
      "Hormone & Metabolic Health",
    ],
    treatments: ["IV Therapy & NAD+", "Hormone Balancing (BHRT)"],
    availability: "Mon–Fri 9:00am–5:00pm",
  },
  {
    name: "Rachel Bowman-Fassio, BSc, CN, RHN",
    slug: "rachel-bowman-fassio",
    role: "Clinic Manager",
    credentials: "BSc, CN, RHN",
    image: "/team/rachel-bowman-fassio.webp",
    locations: ["kelowna"],
    bio: "Rachel keeps our Kelowna clinic running smoothly, coordinating care across the team and making sure every client's experience is seamless from booking to follow-up. With a Bachelor of Science and certifications in both clinical and holistic nutrition, she brings a deep understanding of wellness to every interaction — helping clients feel supported, informed, and at home from the moment they walk through the door.",
    education: [
      "BSc — Nutritional Science",
      "Certified Clinical Nutritionist (CN)",
      "Registered Holistic Nutritionist (RHN)",
    ],
    specializations: [
      "Clinic Operations & Management",
      "Patient Coordination",
      "Client Experience",
      "Wellness & Nutrition",
    ],
    treatments: [],
    availability: "Mon–Fri 9:00am–5:00pm",
  },
  {
    name: "Ali Latendre",
    slug: "ali-latendre",
    role: "Medical Office Assistant & Medical Esthetician",
    credentials: "MOA",
    image: "/images/team/ali-latendre-headshot.webp",
    locations: ["kelowna"],
    bio: "Ali is a Medical Office Assistant and Medical Esthetician with a passion for wellness, longevity, and helping patients feel their best from the inside out. Originally from Ontario, she has called Kelowna home for the past five years and loves being part of the growing health and wellness community. A self-proclaimed vitamin and supplement enthusiast, Ali is always exploring the latest research and trends in biohacking and healthy aging.",
    education: [
      "Medical Office Assistant (MOA)",
      "Medical Esthetics Certification",
    ],
    specializations: [
      "Patient Care & Coordination",
      "Medical Esthetics",
      "Wellness & Longevity",
      "Healthy Aging & Biohacking",
    ],
    treatments: [],
    availability: "Mon–Fri 9:00am–5:00pm",
    funFact:
      "On weekends you'll find Ali enjoying camp life and making the most of the beautiful Okanagan outdoors.",
  },

  // ─── Langley Aesthetics Team ──────────────────────────────────
  {
    name: "Avnit Bhullar",
    slug: "avnit-bhullar",
    role: "Clinic Manager and Medical Aesthetician",
    credentials: "Advanced Clinical Skincare & Medical Aesthetics Diploma",
    image: "/team/avnit-bhullar.webp",
    locations: ["langley"],
    bio: "Avnit is a licensed Medical Aesthetician with over five years of experience specializing in acne management, skin health, and advanced aesthetic treatments. Her passion for skin health and helping others stems from her own personal journey with acne. This experience has deepened her commitment to providing every patient with knowledgeable, ethical, and results-driven care. Avnit's approach combines clinical expertise, advanced aesthetic treatments, and evidence-based skincare. She focuses on overall health and wellness to help patients achieve healthy, long-term skin health, and is dedicated to creating personalized treatment plans that support each patient's unique goals.",
    education: ["Advanced Clinical Skincare & Medical Aesthetics Diploma"],
    specializations: ["Acne Specialist", "Medical Aesthetics"],
    treatments: [
      "Aesthetic Consultation",
      "Personalized Treatment Plan",
      "Clinical Skin Analysis",
      "HydraFacial",
      "IPL and Laser",
      "SkinPen Microneedling",
      "Potenza RF Microneedling",
      "Chemical Peels",
      "Dermaplaning",
    ],
    availability: "By appointment",
  },
  {
    name: "Dr. Daman Johal",
    slug: "daman-johal",
    role: "Medical Aesthetician",
    credentials: "MD",
    // Headshot provided by the clinic — upload to /public/team/daman-johal.webp
    // then change this path to "/team/daman-johal.webp". Until then the profile
    // shows a placeholder avatar rather than a broken image.
    image: "/images/team/daman-johal.webp",
    locations: ["langley"],
    bio: "Dr. Daman Johal is a mother of two from Vancouver, BC. She graduated from medical school in the USA. A lifelong vegetarian, she advocates for a plant-based, organic lifestyle that promotes inner healing. Passionate about skin health, longevity, and wellness, Dr. Johal believes in using biohacking techniques and organic foods for optimal health. In her free time, she enjoys soccer, beach sunsets, and Pilates. Committed to continuous education, Dr. Johal shares her knowledge to positively impact others' lives through personalized care.",
    education: [
      "Doctor of Medicine (MD)",
      "Advanced Clinical Skincare & Medical Aesthetics Diploma",
    ],
    specializations: ["Medical Aesthetics"],
    treatments: [
      "Aesthetic Consultation",
      "Personalized Treatment Plan",
      "Clinical Skin Analysis",
      "HydraFacial",
      "IPL and Laser",
      "SkinPen Microneedling",
      "Potenza RF Microneedling",
      "Chemical Peels",
      "Dermaplaning",
    ],
    availability: "By appointment",
  },

  // ─── Victoria Aesthetics Team ─────────────────────────────────
  {
    name: "Jenny Hwang, RN",
    slug: "jenny-hwang",
    role: "Aesthetic Nurse Mentee",
    credentials: "RN",
    image: "/team/jenny-hwang.webp",
    locations: ["victoria"],
    bio: "Jenny brings registered nursing expertise to our Victoria aesthetic practice. Under the mentorship of Sarita Hutton, she is building her skills in advanced aesthetic nursing while delivering exceptional care to every client. Jenny's clinical precision and gentle technique make her a trusted choice for skin rejuvenation and IV therapy treatments. Her nursing background ensures the highest standard of safety and patient care.",
    education: [
      "BSN — Registered Nurse (RN)",
      "Aesthetic Nursing Mentee Program",
      "IV Therapy Specialist Certification",
      "Patient Safety & Care Training",
    ],
    specializations: [
      "Aesthetic Nursing (Mentee)",
      "Registered Nursing",
      "IV Therapy",
      "Patient Care & Safety",
    ],
    treatments: ["Skin Rejuvenation", "IV Therapy & NAD+"],
    availability: "Mon–Fri 9:00am–5:00pm",
  },
  {
    name: "Madison Allen",
    slug: "madison-allen",
    role: "Medical Aesthetician",
    credentials: "Medical Aesthetician",
    image: "/team/madison-allen.webp",
    locations: ["victoria"],
    bio: "Madison is a skilled medical aesthetician at our Victoria clinic, delivering personalized skin treatments with care and precision. Her passion for aesthetics and commitment to client satisfaction make her an integral part of the Victoria team. Madison works closely with each client to understand their skin goals and create customized treatment plans that deliver visible, lasting results.",
    education: [
      "Medical Aesthetician Diploma",
      "Advanced Skin Treatment Certification",
      "Client Service Excellence Training",
    ],
    specializations: [
      "Medical Aesthetics",
      "Skin Treatments",
      "Client Consultation",
      "Personalized Treatment Plans",
    ],
    treatments: ["Skin Rejuvenation", "Aesthetic Injectables"],
    availability: "Mon–Fri 9:00am–5:00pm",
  },

  // ─── Clinic Managers / MOAs ───────────────────────────────────
  {
    name: "Lucy Watson",
    slug: "lucy-watson",
    role: "Clinic Manager",
    credentials: "",
    image: "/team/lucy-watson.webp",
    locations: ["victoria"],
    bio: "Lucy oversees the Victoria clinic with a keen eye for client experience and operational excellence. Her warm, organized approach ensures every visit is comfortable and efficient. Lucy works closely with the entire Victoria team to maintain the high standard of care that Ageless Living is known for, making sure every client feels valued from the moment they walk through the door.",
    education: [
      "Business Administration Diploma",
      "Healthcare Management Certificate",
      "Client Experience Training",
    ],
    specializations: [
      "Clinic Management",
      "Client Experience",
      "Team Coordination",
      "Operational Excellence",
    ],
    treatments: [],
    availability: "Mon–Fri 8:30am–5:00pm",
  },
  {
    name: "Natalie King",
    slug: "natalie-king",
    role: "Medical Office Assistant",
    credentials: "MOA",
    image: "/team/natalie-king.webp",
    locations: ["victoria"],
    bio: "Natalie supports our Victoria clinic as a dedicated medical office assistant, helping ensure every client interaction is smooth and professional. She assists with scheduling, patient intake, and administrative coordination — making the clinic experience seamless from start to finish. Natalie's friendly and efficient approach makes her a valued member of the Victoria team.",
    education: [
      "Medical Office Assistant (MOA) Certification",
      "Patient Intake & Administration Training",
    ],
    specializations: [
      "Medical Office Administration",
      "Patient Intake & Scheduling",
      "Client Support",
    ],
    treatments: [],
    availability: "Mon–Fri 9:00am–5:00pm",
  },
];

// ─── Helper functions ──────────────────────────────────────────

/** Get all staff at a specific location */
export function getStaffByLocation(location: Location): StaffMember[] {
  return staffMembers.filter((m) => m.locations.includes(location));
}

/** Find a single staff member by URL slug */
export function getStaffBySlug(slug: string): StaffMember | undefined {
  return staffMembers.find((m) => m.slug === slug);
}

/** Get the 3 featured owners/founders for homepage */
export function getFeaturedStaff(): StaffMember[] {
  return staffMembers.filter((m) =>
    ["michael-forbes", "dr-jean-paul-lim", "sarita-hutton"].includes(m.slug)
  );
}

/** Generate proper alt text for a staff photo */
export function getStaffAltText(member: StaffMember): string {
  return `Photo of ${member.name} - ${member.role}, Ageless Living`;
}
