import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

type ReviewItem = {
  name: string;
  service: string;
  initials: string;
  rating: number;
  quote: string;
};

const reviews: ReviewItem[] = [
  {
    name: "María González",
    service: "Taxi Express",
    initials: "MG",
    rating: 5,
    quote:
      "Solicité un traslado express de último minuto y me respondieron en pocos minutos. Llegaron puntuales y el vehículo estaba impecable. Ahora son mi primera opción para cualquier diligencia.",
  },
  {
    name: "Daniel Rojas",
    service: "Transporte Escolar",
    initials: "DR",
    rating: 5,
    quote:
      "Desde que mi hijo viaja con NovaDrive tengo total tranquilidad. Coordinan los horarios con nosotros y siempre nos mantienen informados. Un servicio serio y responsable.",
  },
  {
    name: "Andreína Pérez",
    service: "Transporte Universitario",
    initials: "AP",
    rating: 5,
    quote:
      "Comparto la ruta a la universidad con otras compañeras y nos salió mucho más cómodo y económico. El trato es cercano y el vehículo es amplio. Lo recomiendo sin dudarlo.",
  },
  {
    name: "Carlos Mendoza",
    service: "Transporte Empresarial",
    initials: "CM",
    rating: 5,
    quote:
      "Contratamos la movilización del equipo y la experiencia fue excelente: puntualidad, comunicación clara y flexibilidad para ajustar los recorridos según la jornada laboral.",
  },
];

export const Review = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const setCardRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headerRef.current, ...cardsRef.current], {
          opacity: 1,
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 24 },
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

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resenas"
      className="bg-gray-100 py-20 text-neutral-800 md:py-24 lg:py-36 xl:py-46"
      aria-labelledby="review-title"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col gap-12 md:gap-16">
          {/* HEADER */}
          <div ref={headerRef} className="flex flex-col items-start gap-6">
            <div className="max-w-3xl">
              <h2
                id="review-title"
                className="text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
              >
                Lo que dicen quienes viajan{" "}
                <span className="font-instrument italic">
                  con nosotros.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600 xs:text-base lg:text-lg font-light sm:leading-normal">
                Historias de pasajeros, familias y empresas que confían en
                NovaDrive para moverse todos los días.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label="Valoración promedio 4.9 de 5 estrellas"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-lime-300 text-neutral-800 sm:size-4.5"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-600 sm:text-base">
                <span className="font-medium text-neutral-900">4.9 de 5</span>{" "}
                · Valoración de nuestros clientes
              </p>
            </div>
          </div>

          {/* REVIEWS GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {reviews.map((review, index) => (
              <article
                key={review.name}
                ref={(el) => setCardRef(el, index)}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label={`${review.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={cn(
                          "size-4",
                          starIndex < review.rating
                            ? "fill-lime-300 text-neutral-800"
                            : "text-neutral-300"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <Quote
                    className="size-6 text-neutral-200 transition-colors duration-300 group-hover:text-lime-300"
                    aria-hidden="true"
                  />
                </div>

                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-neutral-600 sm:leading-normal sm:text-base lg:text-lg font-light">
                  <p>{review.quote}</p>
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-neutral-200/80 pt-5">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-900 text-sm font-medium tracking-tight text-lime-300"
                    aria-hidden="true"
                  >
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <cite className="not-italic block text-base font-medium tracking-tight text-neutral-900">
                      {review.name}
                    </cite>
                    <p className="text-sm text-neutral-500">{review.service}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};

export default Review;
