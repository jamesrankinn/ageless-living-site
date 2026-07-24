import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { SHOP_LOCATIONS } from "@/lib/links";
import { clinics } from "@/data/clinics";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about-us" },
  { label: "Our Team", to: "/our-team" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Book Now", to: "/book" },
];

const serviceLinks = [
  { label: "Hormone Optimization", to: "/services#hormone-balancing" },
  { label: "Skin Rejuvenation", to: "/services#skin-rejuvenation" },
  { label: "Medical Weight Management", to: "/services#health-weight" },
  { label: "IV Therapy & Wellness", to: "/services#biohacking" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* Logo + description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5 text-card hover:opacity-80 transition-opacity">
              <BrandMark className="h-8 w-auto" inverted />
            </Link>
            <p className="text-sm text-card/70 mb-5 leading-relaxed">
              Helping everyday people look and feel their best through natural, physician-led anti-aging and wellness treatments.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/agelessliving_bc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="w-9 h-9 rounded-full bg-card/10 flex items-center justify-center text-card/60 hover:text-card hover:bg-card/20 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/agelesslivingwellness" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="w-9 h-9 rounded-full bg-card/10 flex items-center justify-center text-card/60 hover:text-card hover:bg-card/20 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-card mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-card/60 hover:text-card transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-card mb-4">Our Services</h4>
            <div className="flex flex-col gap-2.5">
              {serviceLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-card/60 hover:text-card transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-card mb-4">Visit Us</h4>
            <div className="space-y-4 text-sm text-card/60">
              {clinics.map((clinic) => (
                <div key={clinic.id}>
                  <p className="text-card font-medium mb-1">{clinic.name}</p>
                  <p>{clinic.addressLine1}</p>
                  <p>{clinic.addressLine2}</p>
                  <a
                    href={`tel:${clinic.phoneTel}`}
                    className="mt-1.5 inline-flex items-center gap-2 hover:text-card transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {clinic.name}: {clinic.phoneDisplay}
                  </a>
                </div>
              ))}
              <p className="pt-2 border-t border-card/10">
                By appointment only · Closed weekends
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-card/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-xs text-card/40 text-center md:text-left">
            © {new Date().getFullYear()} Ageless Living Wellness Centre. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-card/40">
            <Link to="/faqs" className="hover:text-card transition-colors">FAQs</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-card transition-colors">Contact</Link>
            {SHOP_LOCATIONS.map((shop) => (
              <Fragment key={shop.url}>
                <span aria-hidden="true">·</span>
                <a
                  href={shop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-card transition-colors"
                >
                  {shop.label} Store
                </a>
              </Fragment>
            ))}
            <span aria-hidden="true">·</span>
            <Link to="/book" className="hover:text-card transition-colors">Book Now</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
