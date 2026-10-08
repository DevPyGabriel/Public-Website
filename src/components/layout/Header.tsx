import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "../ui/Icons";
import { cn } from "@/utils/cn";
import { type ComponentProps } from "@/types";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderProps extends ComponentProps {
  items?: HeaderNavItem[];
  brand?: string;
}

const DEFAULT_ITEMS: HeaderNavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contacto", href: "#contacto" },
];

const SPY_BAND = 24;
const SPY_FALLBACK_LINE = 160;
const RULE_INSET = 8;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const resolveTarget = (href: string) => {
  if (!href.startsWith("#") || href.length < 2) return null;

  try {
    return document.querySelector<HTMLElement>(href);
  } catch {
    return null;
  }
};

export const Header = ({
  items = DEFAULT_ITEMS,
  brand = "NOVA DRIVE",
  className,
}: HeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const ruleRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const aligned = useRef(false);

  const [brandHead, ...brandRest] = brand.split(" ");
  const brandTail = brandRest.join(" ");

  const placeRule = useCallback(
    (animate: boolean) => {
      const rule = ruleRef.current;
      const list = listRef.current;
      const link = linkRefs.current[activeIndex];
      if (!rule || !list || !link) return;

      const listRect = list.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const borderLeft = parseFloat(getComputedStyle(list).borderLeftWidth) || 0;

      const position = {
        x: linkRect.left - listRect.left - borderLeft + RULE_INSET,
        width: Math.max(linkRect.width - RULE_INSET * 2, 0),
      };

      if (!animate || prefersReducedMotion()) {
        gsap.set(rule, position);
        return;
      }

      gsap.to(rule, {
        ...position,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [activeIndex]
  );

  useGSAP(() => {
    placeRule(aligned.current);
    aligned.current = true;
  }, { dependencies: [placeRule] });

  useEffect(() => {
    document.fonts?.ready.then(() => placeRule(false));

    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => placeRule(false));
    observer.observe(list);

    const onResize = () => placeRule(false);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [placeRule]);

  useEffect(() => {
    const sections = items
      .map((item, index) => ({ index, element: resolveTarget(item.href) }))
      .filter(
        (entry): entry is { index: number; element: HTMLElement } =>
          entry.element !== null
      );

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom;
      const line = headerBottom ? headerBottom + SPY_BAND : SPY_FALLBACK_LINE;
      let next = sections[0].index;

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= line) {
          next = section.index;
        }
      }

      setActiveIndex((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = [
        triggerRef.current,
        ...Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          ) ?? []
        ),
      ].filter((element): element is HTMLElement => element !== null);

      if (focusables.length < 2) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const index = focusables.indexOf(document.activeElement as HTMLElement);

      if (index === -1) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && index === 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && index === focusables.length - 1) {
        event.preventDefault();
        first.focus();
      } else if (!event.shiftKey && index === 0) {
        event.preventDefault();
        focusables[1].focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  useGSAP(() => {
    const panel = panelRef.current;
    if (!open || !panel || prefersReducedMotion()) return;

    const rows = panel.querySelectorAll("[data-nav-row]");

    gsap.fromTo(
      panel,
      { opacity: 0, y: -8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    gsap.fromTo(
      rows,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.38,
        ease: "power3.out",
        stagger: 0.045,
        clearProps: "transform",
      }
    );
  }, { dependencies: [open] });

  const handleNavigate = () => {
    if (open) setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-6 pt-3 sm:px-12 sm:pt-4 lg:px-8 xl:pt-6",
        className
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-[800px] items-center justify-between gap-2 rounded-full bg-black/20 p-1.5 pl-5 backdrop-blur-2xl backdrop-saturate-150 sm:gap-4 sm:p-2 sm:pl-6">
        <a
          href={items[0]?.href ?? "#"}
          onClick={handleNavigate}
          className="group flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
        >
          <span className="text-lime-300 transition-transform duration-300 ease-out group-hover:-rotate-6">
            <BrandLogo size={24} />
          </span>
          <span className="text-xl font-[450] leading-none tracking-tight text-gray-50">
            {brandHead}
            {brandTail && <span className="text-lime-300">{brandTail}</span>}
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul
            ref={listRef}
            className="relative flex items-center gap-6 pr-6 py-3"
          >
            <span
              ref={ruleRef}
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-lime-300"
            />

            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  ref={(node) => {
                    linkRefs.current[index] = node;
                  }}
                  href={item.href}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={handleNavigate}
                  className={cn(
                    "block leading-none transition-colors duration-200 tracking-tight",
                    index === activeIndex
                      ? "text-lime-300"
                      : "text-gray-50 hover:text-gray-50"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="header-menu-panel"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-10 shrink-0 place-items-center rounded-full text-gray-50 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 md:hidden"
        >
          <span className="relative block size-5">
            <Menu
              className={cn(
                "absolute inset-0 size-5 transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
                open ? "opacity-0" : "opacity-100"
              )}
              aria-hidden="true"
            />
            <X
              className={cn(
                "absolute inset-0 size-5 transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
                open ? "opacity-100" : "opacity-0"
              )}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 md:hidden"
          />

          <div
            ref={panelRef}
            id="header-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute inset-x-0 top-full z-50 mt-3 px-6 sm:px-12 lg:px-8 md:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-5rem)] max-w-[800px] overflow-y-auto overscroll-contain rounded-[24px] bg-neutral-800 p-2">

              <nav aria-label="Secciones del sitio">
                <ul className="flex flex-col gap-4 px-6 py-3">
                  {items.map((item, index) => (
                    <li key={item.href} data-nav-row>
                      <a
                        href={item.href}
                        aria-current={index === activeIndex ? "true" : undefined}
                        onClick={handleNavigate}
                        className={cn(
                          "flex items-center justify-between rounded-2xl py-2 leading-none tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300",
                          index === activeIndex
                            ? "text-lime-300"
                            : "text-gray-50 hover:text-lime-300"
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};