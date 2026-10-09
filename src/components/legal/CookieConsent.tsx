import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Cookie } from "lucide-react";
import { useLegal } from "./legal-context";

const STORAGE_KEY = "nova_cookie_consent";

type Consent = "accepted" | "rejected" | null;

const readConsent = (): Consent => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const CookieConsent = () => {
  const [consent, setConsent] = useState<Consent>(readConsent);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { openLegal } = useLegal();

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner || consent !== null) return;

    if (prefersReducedMotion()) {
      gsap.set(banner, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        banner,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.6,
          clearProps: "transform",
        }
      );
    }, banner);

    return () => ctx.revert();
  }, [consent]);

  if (consent !== null) return null;

  const choose = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // almacenamiento no disponible: ocultamos el banner igualmente
    }
    setConsent(value);
  };

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-neutral-900 p-5 shadow-2xl sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime-300/10 text-lime-300">
          <Cookie className="size-5" aria-hidden="true" />
        </span>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-neutral-200 sm:text-base">
              Usamos cookies para que la página funcione y, en su caso,
              medir su uso. Puedes aceptarlas o rechazarlas. Más información
              en nuestra{" "}
              <button
                type="button"
                onClick={() => openLegal("privacidad")}
                className="cursor-pointer text-lime-300 underline underline-offset-4 transition-colors duration-200 hover:text-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                Política de Privacidad y Cookies
              </button>
              .
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium tracking-tight text-neutral-200 transition-colors duration-200 hover:border-lime-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-lime-300 px-4 py-2 text-sm font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};