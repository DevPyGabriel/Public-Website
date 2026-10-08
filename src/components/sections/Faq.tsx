import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "¿Cómo puedo solicitar un traslado o cotización?",
    answer:
      "Puedes hacerlo desde la sección de contacto o pulsando 'Cotizar traslado'. Solo necesitamos tu punto de partida, destino, tipo de servicio, fecha y horario para darte una respuesta rápida.",
  },
  {
    question: "¿Qué servicios ofrecen?",
    answer:
      "Ofrecemos Taxi Express, Transporte Escolar, Transporte Universitario y Transporte Empresarial. Cada uno se adapta a tus recorridos y frecuencia (puntual o recurrente).",
  },
  {
    question: "¿Qué zonas cubren?",
    answer:
      "Cubriendo principalmente la zona de Santo Domingo y alrededores. Si tienes una ruta fuera de la zona habitual, indícanos los detalles en la cotización y te confirmamos la cobertura.",
  },
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer:
      "Para traslados puntuales recomendamos reservar con al menos 1–2 horas de anticipación. Para rutas escolares, universitarias o empresariales lo ideal es con unos días de anticipación para asegurar disponibilidad.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Trabajamos con acuerdo previo según el tipo de servicio. Los traslados puntuales suelen ser por viaje. Las rutas programadas (escolar, universitario o empresarial) se organizan con pago mensual o cada 15 días, según lo acordado.",
  },
  {
    question: "¿Puedo cancelar o reprogramar mi traslado?",
    answer:
      "Sí. Para traslados puntuales, te pedimos avisar con la mayor anticipación posible. Para servicios recurrentes, aplicamos lo acordado al momento de la contratación para no afectar la logística del resto de rutas.",
  },
  {
    question: "¿Es seguro el servicio para menores de edad?",
    answer:
      "Sí. Para el Transporte Escolar priorizamos la seguridad, organización y puntualidad. Coordinamos los recorridos con cada familia y mantenemos la información clara sobre horarios y puntos de recogida.",
  },
  {
    question: "¿Qué garantiza la puntualidad?",
    answer:
      "Coordinamos horarios con base en la ruta, el tráfico y los puntos de recogida. Al tratarse de servicios programados, buscamos minimizar imprevistos y mantenemos una comunicación clara con el cliente si ocurre algún ajuste.",
  },
  {
    question: "¿Hay un mínimo de pasajeros para activar una ruta?",
    answer:
      "No tenemos un mínimo fijo. Analizamos cada solicitud (zona, horarios y frecuencia). Si hay coincidencias de ruta, podemos optimizarla para hacerla viable para todos.",
  },
];

export const Faq = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemsRef.current[index] = el;
    }
  };

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (headerRef.current) {
          gsap.set(headerRef.current, { opacity: 1, y: 0 });
        }

        itemsRef.current.forEach((item) => {
          if (item) {
            gsap.set(item, { opacity: 1, y: 0 });
          }
        });

        if (ctaRef.current) {
          gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section header entrance
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            {
              opacity: 0,
              y: 24,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // FAQ items entrance
        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 24,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: item,
                start: "top 100%",
                once: true,
              },
            }
          );
        });

        // CTA entrance
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            {
              opacity: 0,
              y: 24,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 90%",
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
      id="preguntas-frecuentes"
      className="bg-gray-100 py-20 text-neutral-800 md:py-24 lg:py-36 xl:py-46"
      aria-labelledby="faq-title"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col gap-12 md:gap-16">
          {/* HEADER */}
          <div ref={headerRef} className="flex flex-col items-start gap-6">
            <div className="max-w-3xl">
              <h2
                id="faq-title"
                className="text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
              >
                Preguntas frecuentes
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed sm:leading-normal text-neutral-600 xs:text-base lg:text-lg font-light">
                Resolvemos tus dudas para que puedas concretar tu traslado lo
                antes posible. Si no encuentras lo que buscas, escríbenos
                directamente.
              </p>
            </div>
          </div>

          {/* FAQ ACCORDION */}
          <div className="flex flex-col divide-y divide-neutral-300/70 border-y border-neutral-300/70">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  ref={(el) => setItemRef(el, index)}
                  className="group"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between gap-6 px-1 py-6 text-left transition-colors duration-200 hover:bg-neutral-200/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 sm:py-7"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                  >
                    <h3 className="text-base font-medium tracking-tight sm:text-lg md:text-xl lg:text-2xl">
                      {faq.question}
                    </h3>

                    <ChevronDown
                      className={`size-5 shrink-0 transition-transform duration-300 ease-out sm:size-6 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="px-1 pb-6 sm:pb-7">
                        <p className="max-w-3xl leading-relaxed sm:leading-normal text-sm font-light text-neutral-600 sm:text-base lg:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="flex flex-col items-start gap-5"
          >
            <p className="max-w-xl text-sm text-neutral-600 sm:text-base">
              ¿Tienes una duda específica sobre tu ruta o servicio?
            </p>

            <a
              href="#contacto"
              className="group inline-flex w-fit items-center gap-1.5 rounded-full bg-neutral-800 px-5 py-2.5 pr-4 text-base font-medium tracking-tight text-gray-100 outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 sm:px-6 sm:py-3 sm:pr-5"
              aria-label="Ir a contacto para cotizar traslado"
            >
              <span className="leading-none">Contactanos</span>
              <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" />
            </a>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};

export default Faq;