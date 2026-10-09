import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import taxiExpressImage from "../../assets/taxi_express.webp";
import schoolShuttleImage from "../../assets/school_shuttle.webp";
import collegeShuttleImage from "../../assets/college_shuttle.webp";
import enterpriseShuttleImage from "../../assets/enterprise_shuttle.webp";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  number: string;
  title: string;
  description: string;
  paymentTerms: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  price: string;
  pricePeriod: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Taxi Express",
    description:
      "Un traslado privado para tus diligencias, citas o recorridos puntuales. Indícanos el punto de salida, el destino y el horario para cotizar tu viaje.",
    paymentTerms: "Cobro por viaje.",
    image: taxiExpressImage,
    imageWidth: 6016,
    imageHeight: 4016,
    alt: "Servicio de Taxi Express NovaDrive",
    price: "4",
    pricePeriod: "Por viaje",
  },
  {
    number: "02",
    title: "Transporte Escolar",
    description:
      "Traslados programados para la rutina escolar. Coordinamos con cada familia el recorrido y los horarios, según las necesidades del estudiante.",
    paymentTerms: "Pago mensual o cada 15 días, según las condiciones acordadas.",
    image: schoolShuttleImage,
    imageWidth: 7999,
    imageHeight: 5335,
    alt: "Transporte escolar NovaDrive",
    price: "50",
    pricePeriod: "Mensual",
  },
  {
    number: "03",
    title: "Transporte Universitario",
    description:
      "Una alternativa para organizar tus traslados habituales hacia y desde la universidad. Comparte tu zona, horarios de clases y frecuencia para coordinar el servicio.",
    paymentTerms: "Pago mensual o cada 15 días, según las condiciones acordadas.",
    image: collegeShuttleImage,
    imageWidth: 1312,
    imageHeight: 816,
    alt: "Transporte universitario NovaDrive",
    price: "60",
    pricePeriod: "Mensual",
  },
  {
    number: "04",
    title: "Transporte Empresarial",
    description:
      "Movilidad para equipos de trabajo con horarios y recorridos recurrentes. Coordinamos los detalles con la empresa para adaptarnos a su jornada y necesidades de traslado.",
    paymentTerms: "Pago mensual o cada 15 días, según las condiciones acordadas.",
    image: enterpriseShuttleImage,
    imageWidth: 6048,
    imageHeight: 4024,
    alt: "Transporte para trabajadores NovaDrive",
    price: "80",
    pricePeriod: "Mensual",
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !servicesRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      const mm = gsap.matchMedia();

      // Respect reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, y: 0, x: 0 });
        const contents = cards
          .map((c) => c.querySelector<HTMLElement>(".service-content"))
          .filter(Boolean) as HTMLElement[];
        gsap.set(contents, { opacity: 1, x: 0 });
        if (headerRef.current) {
          gsap.set(headerRef.current, { opacity: 1, y: 0 });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          cards.forEach((card) => {
            const content = card.querySelector<HTMLElement>(".service-content");

            gsap.fromTo(
              card,
              { y: 24 },
              {
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  once: true,
                },
              }
            );

            if (content) {
              gsap.fromTo(
                content,
                { x: 16, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  delay: 0.05,
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true,
                  },
                }
              );
            }
          });
        }
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { y: 16 },
              {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  once: true,
                },
              }
            );
          });
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="bg-neutral-900 py-20 text-gray-50 md:py-24 lg:py-36 xl:py-46"
      aria-labelledby="services-title"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col gap-16 md:flex-row md:items-stretch md:gap-16 lg:gap-28 xl:gap-32">
          {/* LEFT / STICKY */}
          <div className="w-full md:w-[38%]">
            <div className="md:sticky md:top-24">
              <div className="w-full">
                <h2
                  ref={headerRef}
                  id="services-title"
                  className="text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem] max-w-sm md:max-w-xl"
                >
                  Movilidad pensada{" "}
                  <span className="font-instrument italic text-lime-300">
                    para tu día a día.
                  </span>
                </h2>

                <p className="mt-7 max-w-lg text-sm xs:text-base leading-normal text-neutral-400 lg:text-lg font-light">
                  Desde un traslado rápido hasta rutas programadas para
                  estudiantes y trabajadores. En NovaDrive adaptamos nuestro
                  servicio a tus horarios, recorridos y necesidades.
                </p>

                {/* CTA */}
                <a
                  href="#contacto"
                  className="group inline-flex w-fit items-center gap-1.5 rounded-full bg-lime-300 px-5 py-2.5 pr-4 text-base font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:px-6 sm:py-3 sm:pr-5 mt-8"
                  aria-label="Cotizar traslado"
                >
                  <span className="leading-none">Cotizar traslado</span>
                  <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT / SERVICES */}
          <div ref={servicesRef} className="w-full md:w-[62%]">
            <ul className="flex flex-col gap-10 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 list-none">
              {services.map((service) => (
                <li key={service.number}>
                  <article
                    className="service-card group overflow-hidden bg-black rounded-2xl cursor-pointer hover:bg-black/40 transition-colors duration-200 ease-in-out opacity-100 will-change-transform"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-800">
                      <img
                        src={service.image}
                        width={service.imageWidth}
                        height={service.imageHeight}
                        alt={service.alt}
                        loading={service.number === "01" ? "eager" : "lazy"}
                        fetchPriority={
                          service.number === "01" ? "high" : undefined
                        }
                        decoding="async"
                        className="service-image absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />

                      {/* Number */}
                      <span className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full bg-black/40 size-12 md:size-20 flex items-center justify-center text-xl md:text-4xl backdrop-blur-sm tracking-tight ">
                        {service.number}
                      </span>
                      <div className="absolute left-3 md:left-4 top-3 md:top-4 rounded-xl bg-black/20 px-4 py-2.5 flex flex-col items-center justify-center text-base font-medium backdrop-blur-md gap-1 xs:gap-2 md:gap-2.5">
                        <span className="font-light text-sm md:text-base">
                          Precios desde
                        </span>
                        <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl w-full flex flex-col  gap-0.5 tracking-tight">
                          <span>${service.price}</span>
                          <span className="text-xs md:text-sm font-light opacity-50 tracking-normal">
                            {service.pricePeriod}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="service-content flex flex-col p-6 sm:p-8 lg:p-10 opacity-100">
                      <div className="max-w-xl">
                        <h3 className="text-3xl tracking-tighter sm:text-4xl lg:text-5xl">
                          {service.title}
                        </h3>
                      </div>

                      <div className="flex items-end gap-4 flex-col sm:flex-row md:flex-col lg:flex-row w-full justify-between">
                        <div className="mt-4 md:mt-6 lg:mt-8">
                          <p className="text-sm text-neutral-400 sm:text-base font-light">
                            {service.description}
                          </p>
                          <p className="mt-3 text-sm text-neutral-300">
                            <span className="font-medium text-lime-300">
                              Forma de pago:
                            </span>{" "}
                            {service.paymentTerms}
                          </p>
                        </div>
                        <a
                          href="#contacto"
                          className="inline-flex w-fit shrink-0 items-center gap-1.5 border-b border-lime-300 pb-1 text-sm font-medium text-lime-300 transition-all duration-300 group-hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-lime-300 h-fit"
                        >
                          Cotizar servicio
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};

export default Services;