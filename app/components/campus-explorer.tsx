"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { timeline } from "../data";

const CampusScene = dynamic(() => import("./campus-scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-status" role="status">
      Opening a little world…
    </div>
  ),
});
const chapters = [
  "School",
  "Community",
  "Aviation",
  "Tennis",
  "Mathematics",
  "Research",
];

export default function CampusExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const [paused, setPaused] = useState(true);
  const dock = useRef<HTMLElement>(null);
  const [pill, setPill] = useState({ x: 0, y: 0, width: 0, height: 0 });
  useEffect(() => {
    const nav = dock.current;
    if (!nav) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const button = nav.querySelector<HTMLButtonElement>(
        '[aria-pressed="true"]',
      );
      if (button)
        setPill({
          x: button.offsetLeft,
          y: button.offsetTop,
          width: button.offsetWidth,
          height: button.offsetHeight,
        });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    Array.from(nav.querySelectorAll("button")).forEach((button) =>
      observer.observe(button),
    );
    document.fonts.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [selected]);
  const previewHeading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const selectPlace = (slug: string) => {
    trigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSelected(slug);
  };
  const closePreview = () => {
    setSelected(null);
    trigger.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (selected) previewHeading.current?.focus({ preventScroll: true });
  }, [selected]);
  const item = timeline.find((item) => item.slug === selected);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) closePreview();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [selected]);

  return (
    <section className="campus" aria-label="Explore Rishi’s world">
      <div className="world-intro">
        <h1>
          Rishi
          <br />
          <em>Khandelwal.</em>
        </h1>
        <p>
          A student. A teammate. A curious mind.
          <br />A few places that have shaped me.
        </p>
      </div>
      <div className="world-stage">
        <CampusScene
          selected={selected}
          onSelect={selectPlace}
          paused={paused}
        />
      </div>
      {item && (
        <aside className="place-card" aria-label={`${item.title} preview`}>
          <button
            className="close-card"
            aria-label="Close story preview"
            onClick={closePreview}
          >
            ×
          </button>
          <p className="eyebrow">
            {item.period} <span> / {item.date}</span>
          </p>
          <h2 ref={previewHeading} tabIndex={-1}>
            {item.title}
          </h2>
          <p className="place-role">
            {item.role} · {item.organization}
          </p>
          <p>{item.summary}</p>
          <Link className="story-link" href={`/timeline/${item.slug}`}>
            Explore this chapter <span>↗</span>
          </Link>
        </aside>
      )}
      <div className="world-bottom">
        <nav ref={dock} className="chapter-dock" aria-label="Campus stories">
          <span
            className="dock-selection"
            aria-hidden="true"
            style={{
              width: pill.width,
              height: pill.height,
              transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
              opacity: selected && pill.width ? 1 : 0,
            }}
          />
          {timeline.map((item, i) => (
            <button
              key={item.slug}
              className={selected === item.slug ? "selected" : ""}
              aria-pressed={selected === item.slug}
              onClick={() => selectPlace(item.slug)}
            >
              {chapters[i]}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
