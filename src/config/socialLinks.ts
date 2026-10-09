import { WHATSAPP_NUMBER } from "../components/sections/Contact";

const WA_NUMBER = WHATSAPP_NUMBER.replace(/\D/g, "");

export const WHATSAPP_MESSAGE = `*Hola NovaDrive!*

Quiero solicitar un traslado y me gustaría coordinar los detalles. ¿Me pueden ayudar, por favor?`;

// WhatsApp del footer con mensaje personalizado (mismo que el CTA final)
export const WHATSAPP_SOCIAL_LINK = WA_NUMBER
  ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "";

export const SOCIAL_LINKS = {
  whatsapp: WHATSAPP_SOCIAL_LINK,
  // p.ej. "https://instagram.com/novadriveve"
  instagram: "https://instagram.com/edwinfiu",
  // p.ej. "https://tiktok.com/@novadrive"
  tiktok: "https://tiktok.com/@edwinfiury",
};