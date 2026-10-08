import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MessageCircle,
  CalendarClock,
  BadgeCheck,
  CarFront,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Cuéntanos qué necesitas",
    description:
      "Indícanos tu punto de partida, destino, fecha, horario y tipo de servicio.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Coordinamos contigo",
    description:
      "Revisamos los detalles del traslado y te proporcionamos la información necesaria para organizar el servicio.",
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Confirmas tu servicio",
    description:
      "Una vez acordados los detalles, confirmamos tu traslado o ruta programada.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Nosotros nos encargamos del trayecto",
    description:
      "Solo queda estar listo a la hora acordada. Nosotros nos encargamos de tu traslado.",
    icon: CarFront,
  },
];

export const BookingProcess = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      stepRefs.current[index] = el;
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const resetDesktopProgress = () => {
        gsap.set(progressLineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      };

      // Respect reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headerRef.current,
            ...stepRefs.current,
            progressLineRef.current,
            ctaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scaleX: 1,
          }
        );
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

        // Progress line initialization (desktop)
        resetDesktopProgress();

        // Steps entrance
        stepRefs.current.forEach((step, index) => {
          if (!step) return;

          gsap.fromTo(
            step,
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
                trigger: step,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

        // Active state only — the segmented connector is driven by CSS
        // (.step-segment) so it stays perfectly aligned on resize.
        stepRefs.current.forEach((step) => {
          if (!step) return;

          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              stepRefs.current.forEach((s) => s?.classList.remove("is-active"));
              step.classList.add("is-active");
            },
            onEnterBack: () => {
              stepRefs.current.forEach((s) => s?.classList.remove("is-active"));
              step.classList.add("is-active");
            },
          });
        });

        // Keep the progress line in sync with the active step
        const syncProgress = (activeIndex: number) => {
          if (activeIndex < 0) return;

          if (progressLineRef.current && stepsContainerRef.current) {
            gsap.to(progressLineRef.current, {
              scaleX: activeIndex / (steps.length - 1),
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          }
        };

        // Desktop connector (horizontal segments)
        mm.add("(min-width: 768px)", () => {
          const triggers = stepRefs.current.map((step, index) =>
            ScrollTrigger.create({
              trigger: step,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => syncProgress(index),
              onEnterBack: () => syncProgress(index),
            })
          );

          return () => {
            triggers.forEach((t) => t.kill());
            resetDesktopProgress();
          };
        });

        // CTA entrance
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            {
              opacity: 0,
              y: 20,
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
      id="como-funciona"
      className="relative bg-neutral-900 pb-20 text-gray-50 md:pb-24 lg:pb-36 xl:pb-45 pt-6 md:pt-8"
      aria-labelledby="booking-process-title"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col">
          {/* HEADER */}
          <div
            ref={headerRef}
            className="mb-12 flex flex-col items-start md:mb-16 lg:mb-20"
          >
            <h2
              id="booking-process-title"
              className="max-w-4xl text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
            >
              Contratar tu transporte es{" "}
              <span className="font-instrument italic text-lime-300 tracking-tighter">
                así de sencillo.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed sm:leading-normal text-neutral-400 sm:text-base lg:text-lg font-light">
              Sin procesos complicados. Cuéntanos qué necesitas y nos encargamos
              de coordinarlo contigo.
            </p>
          </div>

          {/* STEPPER - DESKTOP HORIZONTAL */}
          <div className="relative hidden md:block" ref={stepsContainerRef}>
            {/* CONNECTOR TRACK: dashed rule so the line always breaks at each circle */}
            <div
              ref={progressTrackRef}
              className="step-track pointer-events-none absolute left-6 right-6 top-8 hidden h-0.5 md:block lg:top-9"
              aria-hidden="true"
            >
              {/* Progress fill grows inside the dashed mask, stopping on the last circle */}
              <div
                ref={progressLineRef}
                className="h-full origin-left scale-x-0 bg-lime-300 will-change-transform"
              />
            </div>

            {/* STEPS GRID */}
            <div className="relative grid grid-cols-4 gap-6 lg:gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    ref={(el) => setStepRef(el, index)}
                    className="relative flex flex-col items-start p-1 will-change-transform"
                    data-step={step.number}
                  >
                    {/* NUMBER + ICON CIRCLE */}
                    <div className="relative mb-6 flex items-center lg:mb-8">
                      <div className="step-node">
                        <span className="step-number">{step.number}</span>
                        <Icon className="step-icon" aria-hidden="true" />
                        <span className="step-ring" />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-3 px-1">
                      <h3 className="step-title text-xl tracking-[-0.03em] transition-colors duration-300 sm:text-2xl lg:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="step-desc text-sm leading-normal text-neutral-400 transition-colors duration-300 sm:text-[0.95rem] lg:text-base font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEPPER - MOBILE VERTICAL */}
          <div className="relative flex flex-col gap-8 md:hidden">
            {/* VERTICAL CONNECTOR: dashed rule with a gap around every circle */}
            <div
              className="step-track step-track--vertical pointer-events-none absolute bottom-7.5 left-5.5 top-7.5 w-0.5 sm:bottom-8 sm:left-6 sm:top-8"
              aria-hidden="true"
            >
              <div className="progress-vertical h-full w-full origin-top scale-y-0 bg-lime-300 will-change-transform" />
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => setStepRef(el, index)}
                  className="relative flex items-start p-2 pl-0 will-change-transform sm:gap-5"
                  data-step={step.number}
                >
                  {/* CIRCLE (same node design as desktop) + spacer for the connector gap */}
                  <div className="relative z-10 flex shrink-0 items-center">
                    <div className="step-node">
                      <span className="step-number">{step.number}</span>
                      <Icon className="step-icon" aria-hidden="true" />
                      <span className="step-ring" />
                    </div>
                    <span
                      className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 sm:h-8 sm:w-8"
                      aria-hidden="true"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex min-w-0 flex-col gap-2 pt-0.5 pl-4 sm:pl-5">
                    <h3 className="step-title text-lg font-medium tracking-[-0.03em] transition-colors duration-300 sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="step-desc text-sm leading-normal font-light text-neutral-400 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-12 flex flex-col items-start gap-4 md:mt-16 lg:mt-20"
          >
            <div className="max-w-xl">
              <h3 className="text-2xl tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                ¿Necesitas un traslado?{" "}
                <span className="text-lime-300">Hablemos.</span>
              </h3>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base font-light">
                Cuéntanos qué necesitas y te ayudaremos a coordinar tu traslado.
              </p>
            </div>

            <a
              href="#contacto"
              className="group inline-flex w-fit items-center gap-1.5 rounded-full bg-lime-300 px-5 py-2.5 pr-4 text-base font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:px-6 sm:py-3 sm:pr-5"
              aria-label="Solicitar traslado"
            >
              <span className="leading-none">Solicitar traslado</span>
              <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" />
            </a>
          </div>
        </div>

        <div />
      </div>

      {/* ACTIVE STATE STYLES */}
      <style>{`
        /* ---- Step node (shared by desktop + mobile) ---- */
        .step-node {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: rgb(163 230 53);
          transition:
            background-color 300ms ease-out,
            box-shadow 300ms ease-out,
            transform 300ms ease-out;
        }
        .step-number {
          position: absolute;
          top: -0.25rem;
          left: -0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: #000;
          color: rgb(212 212 212);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.25);
          transition:
            background-color 300ms ease-out,
            color 300ms ease-out;
        }
        .step-icon {
          color: rgb(23 23 23);
          transition:
            color 300ms ease-out,
            transform 300ms ease-out;
        }
        .step-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0;
          box-shadow: inset 0 0 0 2px rgb(163 230 53 / 0.45);
          transition: opacity 300ms ease-out;
        }

        /* ---- Active step ---- */
        .is-active .step-node {
          background-color: rgb(24 24 27);
          box-shadow:
            0 0 0 1px rgb(163 230 53 / 0.25),
            0 10px 80px -30px rgb(163 230 53 / 0.45);
          transform: scale(1.03);
        }
        .is-active .step-ring {
          opacity: 1;
        }
        .is-active .step-number {
          background-color: rgb(0 0 0 / 0.85);
          color: rgb(163 230 53);
        }
        .is-active .step-icon {
          color: rgb(163 230 53);
          transform: scale(1.08);
        }
        .is-active .step-title {
          color: rgb(249 250 251);
        }
        .is-active .step-desc {
          color: rgb(229 231 235);
        }

        /* ---- Connector track: dashed rule = natural gaps around every circle ---- */
        .step-track {
          background-color: rgb(64 64 64 / 0.6);
        }

        @media (min-width: 768px) {
          .step-track {
            -webkit-mask-image: repeating-linear-gradient(
              to right,
              #000 0,
              #000 5px,
              transparent 5px,
              transparent 10px
            );
            mask-image: repeating-linear-gradient(
              to right,
              #000 0,
              #000 5px,
              transparent 5px,
              transparent 10px
            );
          }
          [data-step] .step-node {
            width: 3.5rem;
            height: 3.5rem;
            box-shadow:
              0 0 0 4px rgb(23 23 23),
              0 0 0 5px rgb(38 38 38),
              0 10px 30px -15px rgb(0 0 0 / 0.6);
          }
          [data-step] .step-number {
            width: 1.75rem;
            height: 1.75rem;
            font-size: 0.75rem;
          }
          [data-step] .step-icon {
            width: 1.875rem;
            height: 1.875rem;
          }
        }
        @media (min-width: 1024px) {
          [data-step] .step-node {
            width: 4rem;
            height: 4rem;
          }
          [data-step] .step-number {
            width: 1.75rem;
            height: 1.75rem;
          }
          [data-step] .step-icon {
            width: 1.875rem;
            height: 1.875rem;
          }
        }

        /* ---- Mobile connector: fills down to the active circle only ---- */
        @media (max-width: 639px) {
          [data-step] .step-node {
            width: 2.75rem;
            height: 2.75rem;
            box-shadow:
              0 0 0 3px rgb(23 23 23),
              0 0 0 4px rgb(38 38 38),
              0 8px 20px -12px rgb(0 0 0 / 0.6);
          }
          [data-step] .step-number {
            width: 1.375rem;
            height: 1.375rem;
            font-size: 0.5625rem;
          }
          [data-step] .step-icon {
            width: 1.25rem;
            height: 1.25rem;
            stroke-width: 1.75;
          }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          [data-step] .step-node {
            width: 3rem;
            height: 3rem;
            box-shadow:
              0 0 0 3px rgb(23 23 23),
              0 0 0 4px rgb(38 38 38),
              0 8px 20px -12px rgb(0 0 0 / 0.6);
          }
          [data-step] .step-number {
            width: 1.5rem;
            height: 1.5rem;
            font-size: 0.625rem;
          }
          [data-step] .step-icon {
            width: 1.375rem;
            height: 1.375rem;
            stroke-width: 1.75;
          }
        }

        @media (max-width: 767px) {
          .is-active .step-node {
            transform: scale(1.02);
          }
          .is-active .step-icon {
            transform: scale(1.05);
          }

          .step-track--vertical {
            -webkit-mask-image: repeating-linear-gradient(
              to bottom,
              #000 0,
              #000 5px,
              transparent 5px,
              transparent 10px
            );
            mask-image: repeating-linear-gradient(
              to bottom,
              #000 0,
              #000 5px,
              transparent 5px,
              transparent 10px
            );
          }
          .is-active .progress-vertical,
          .is-active ~ * .progress-vertical {
            transform: scaleY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default BookingProcess;
