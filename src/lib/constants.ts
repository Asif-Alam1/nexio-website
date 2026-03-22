export const WHATSAPP_NUMBER = "+96176423052";
export const WHATSAPP_MESSAGE = "Hi Nexio Labs, I'd like to discuss a project.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const CONTACT_EMAIL = "hello@nexiolabs.co";

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/nexio-labs",
  instagram: "https://instagram.com/nexio.labs",
  whatsapp: WHATSAPP_URL,
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
