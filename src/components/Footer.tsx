import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about-us" },
  { label: "Our Team", to: "/our-team" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
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
              <div>
                <p className="text-card font-medium mb-1">Victoria</p>
                <p>740 Hillside Ave #120</p>
                <p>Victoria, BC V8T 1Z4</p>
              </div>
              <div>
                <p className="text-card font-medium mb-1">Langley</p>
                <p>415-20178 96th Ave</p>
                <p>Langley, BC V1M 0B2</p>
              </div>
              <div>
                <p className="text-card font-medium mb-1">Kelowna</p>
                <p>1708 Dolphin Ave #101</p>
                <p>Kelowna, BC V1Y 9S4</p>
              </div>
              <div className="pt-2 border-t border-card/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>(236) 326-6830</span>
                </div>
                <p>Mon-Fri: 9am-5pm</p>
                <p>Saturday: By appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-card/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-xs text-card/40 text-center md:text-left">
            © {new Date().getFullYear()} Ageless Living Wellness Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-card/40">
            <Link to="/faqs" className="hover:text-card transition-colors">FAQs</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-card transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
