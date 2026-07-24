// Centralized external destinations. Update once, propagate everywhere.

export const CLINIC_PHONE_DISPLAY = "+1 (236) 326-6830";
export const CLINIC_PHONE_TEL = "+12363266830";
export const CLINIC_EMAIL = "wellness@agelessliving.ca";

// External Square storefronts for products / retail.
// Victoria manages its own store; Kelowna & Langley share a separate store,
// so the site offers a choice rather than a single destination.
export interface ShopLocation {
  label: string;
  url: string;
}

export const SHOP_LOCATIONS: ShopLocation[] = [
  { label: "Victoria", url: "https://ageless-living.square.site/s/shop" },
  { label: "Kelowna & Langley", url: "https://ageless.square.site" },
];
