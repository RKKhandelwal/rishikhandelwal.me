"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

// Pre-hiding belongs in the layout phase (before paint), but
// useLayoutEffect warns when server-rendered, so alias it isomorphically.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type Props = { className?: string; children: ReactNode };

/**
 * anime.js-style staggered reveal: children rise into place as they enter
 * the viewport. Pre-hiding happens before first paint and only when
 * JavaScript runs and motion is welcome, so no-JS readers, crawlers, and
 * reduced-motion visitors always see every story.
 */
export default function Reveal({ className = "", children }: Props) {
  const host = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const root = host.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-reveals");
    const items = Array.from(root.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    items.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-i", String(index));
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className={className}>
      {children}
    </div>
  );
}
