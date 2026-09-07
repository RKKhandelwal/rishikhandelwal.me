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
  const [resetKey, setResetKey] = useState(0);
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
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Rishi Khandelwal home">
          Rishi K<span>.</span>
        </a>
        <p>LEARNING. BUILDING. SHOWING UP.</p>
        <a className="contact-link" href="mailto:rkrishikhandelewal@gmail.com">
          Say hello <span>↗</span>
        </a>
      </header>
      <div className="world-intro">
        <p className="eyebrow">
          <span className="live-dot" /> WELCOME TO MY LITTLE WORLD
        </p>
        <h1>
          Rishi
          <br />
          <em>Khandelwal.</em>
        </h1>
        <p>
          A student. A teammate. A curious mind.
          <br />A few places that have shaped me.
        </p>
        <a className="text-link" href="#timeline">
          Take the scenic route <span>↘</span>
        </a>
      </div>
      <div className="world-stage">
        <CampusScene
          selected={selected}
          onSelect={selectPlace}
          paused={paused}
          resetKey={resetKey}
        />
      </div>
      <div className="world-caption">
        <span className="compass" aria-hidden="true">
          N<br />↑
        </span>
        <span>
          A SMALL WORLD.
          <br />A LOT TO DISCOVER.
        </span>
      </div>
      <div className="world-tools">
        <button onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? "▷ Resume motion" : "Ⅱ Pause motion"}
        </button>
        <button
          onClick={() => setResetKey((key) => key + 1)}
          aria-label="Reset campus view"
        >
          ↺ <span>Reset view</span>
        </button>
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
        <p className="world-hint">
          <span className="desktop-hint">Drag to look around · </span>Choose a
          place to open its story
        </p>
        <nav className="chapter-dock" aria-label="Campus stories">
          {timeline.map((item, i) => (
            <button
              key={item.slug}
              className={selected === item.slug ? "selected" : ""}
              aria-pressed={selected === item.slug}
              onClick={() => selectPlace(item.slug)}
            >
              <span className="dock-number">0{i + 1}</span>
              {chapters[i]}
            </button>
          ))}
        </nav>
        <a className="list-link" href="#timeline">
          All stories <span>↓</span>
        </a>
      </div>
    </section>
  );
}
