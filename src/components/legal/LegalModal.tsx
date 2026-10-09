import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, FileText, ShieldCheck } from "lucide-react";
import type { LegalDocument } from "../../config/legal";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface LegalModalProps {
  doc: LegalDocument;
  onClose: () => void;
}

export const LegalModal = ({ doc, onClose }: LegalModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousActive = document.activeElement as HTMLElement | null;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    let ctx: gsap.Context | undefined;

    if (!prefersReducedMotion()) {
      ctx = gsap.context(() => {
        const overlay = overlayRef.current;
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "power2.out" }
          );
        }
        gsap.fromTo(
          dialog,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      }, dialog);
    }

    return () => {
      ctx?.revert();
      root.style.overflow = previousOverflow;
      previousActive?.focus?.();
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (element) =>
          element.offsetParent !== null && !element.hasAttribute("disabled")
      );

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const index = focusables.indexOf(document.activeElement as HTMLElement);

      if (event.shiftKey && (index <= 0 || index === -1)) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (index === focusables.length - 1 || index === -1)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const ModalIcon = doc.id === "terminos" ? FileText : ShieldCheck;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6 font-geist"
    >
      <div
        ref={overlayRef}
        data-modal-overlay
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[24px] border border-white/10 bg-neutral-900 text-gray-50 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8)] outline-none sm:rounded-[24px]"
      >
        {/* HAIRLINE ACCENT */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/70 to-transparent"
        />

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 sm:p-8">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-lime-300/10 text-lime-300 ring-1 ring-inset ring-lime-300/20 sm:size-12">
              <ModalIcon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-lime-300">
                Documento legal
              </p>
              <h2
                id="legal-modal-title"
                className="mt-1 text-2xl leading-tight tracking-tighter sm:text-3xl"
              >
                {doc.title}
              </h2>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-lime-300"
                />
                Actualizado: {doc.updatedAt}
              </p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar documento legal"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-neutral-300 transition-colors duration-200 hover:border-lime-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="legal-scroll flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
          <p className="border-l-2 border-lime-300/60 pl-4 text-base leading-relaxed text-neutral-200 font-light">
            {doc.intro}
          </p>

          <div className="mt-8 flex flex-col gap-9 border-t border-white/10 pt-8">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="flex items-baseline gap-3 text-base font-medium tracking-tight text-gray-50 sm:text-lg">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-lime-300"
                  />
                  {section.heading}
                </h3>
                <div className="mt-3 flex flex-col gap-3 pl-0 sm:pl-5 font-light">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed text-neutral-300 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4 sm:p-6">
          <p className="hidden text-sm text-neutral-500 sm:block">
            NovaDrive · {doc.title}
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium tracking-tight text-neutral-200 transition-colors duration-200 hover:border-lime-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 sm:text-base"
            >
              <span className="leading-none">Cerrar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:text-base"
            >
              <span className="leading-none">Entendido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};