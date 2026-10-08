import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { WHATSAPP_NUMBER } from "./Contact";
import { WHATSAPP_MESSAGE } from "../../config/socialLinks";

gsap.registerPlugin(ScrollTrigger);

const TRUST_ITEMS = [
  "Atención personalizada",
  "Horarios coordinados",
  "Soluciones adaptadas",
];

const WA_NUMBER = WHATSAPP_NUMBER.replace(/\D/g, "");

export const CtaSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement | null>(null);

  const whatsappUrl = `${
    WA_NUMBER ? `https://wa.me/${WA_NUMBER}` : "https://wa.me/"
  }?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-anim]")
    );
    const primaryCta = primaryCtaRef.current;
    const secondaryCta = secondaryCtaRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...elements, primaryCta, secondaryCta], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        elements.forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        if (primaryCta) {
          gsap.fromTo(
            primaryCta,
            { opacity: 0, y: 20, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 89%",
                once: true,
              },
            }
          );
        }

        if (secondaryCta) {
          gsap.fromTo(
            secondaryCta,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
                once: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="bg-lime-300 py-20 text-neutral-900 md:py-24 lg:py-36 xl:py-46"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-0">

        <h2
          id="cta-title"
          data-anim
          className="mx-auto mt-6 max-w-2xl text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
        >
          Tú tienes un destino.
          <br />
          Nosotros nos encargamos{" "}
          <span className="font-instrument italic">del camino.</span>
        </h2>

        <p
          data-anim
          className="mx-auto mt-7 max-w-xl text-sm leading-normal text-neutral-700 xs:text-base font-light lg:text-lg"
        >
          Ya sea un traslado express o una ruta que necesitas todos los días,
          estamos listos para ayudarte a encontrar una solución de transporte
          adaptada a ti.
        </p>

        {/* PRIMARY CTA */}
        <a
          ref={primaryCtaRef}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 sm:px-7 sm:py-4 text-lg font-medium tracking-tight text-gray-50 outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:outline-neutral-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-lime-300"
          aria-label="Solicitar traslado por WhatsApp"
        >
          <span className="leading-none">Quiero solicitar un traslado</span>
          <ArrowUpRight className="size-5.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* TRUST INDICATORS */}
        <ul
          data-anim
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-neutral-700 sm:text-base"
            >
              <Check className="size-4 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {/* SECONDARY CTA */}
        <a
          ref={secondaryCtaRef}
          href="#contacto"
          className="group mt-6 inline-flex w-fit items-center gap-1.5 border-b border-neutral-900/50 pb-1 text-base text-neutral-700 transition-all duration-300 hover:border-neutral-900 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        >
          <span className="leading-none">
            ¿Tienes una necesidad específica?{" "}
            <span className="font-medium text-neutral-900">Hablemos.</span>
          </span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default CtaSection;