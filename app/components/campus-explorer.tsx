"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { timeline } from "../data";
import { rosterTriggers, tennisRoster } from "./tennis-roster";

const CampusScene = dynamic(() => import("./campus-scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-status" role="status">
      Opening a little world…
    </div>
  ),
});
const chapters: Record<string, string> = {
  "los-altos-high-school": "School",
  "buddies4math": "Community",
  "hiller-aviation": "Aviation",
  "varsity-tennis": "Tennis",
  "promys": "Mathematics",
  "advanced-student-investigation": "Research",
};

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

  /*
   * The court easter egg. Double-clicking a player (handled by the scene)
   * cycles that player's identity; typing a legend's name anywhere swaps
   * both players into their kit. "deuce" shuffles the lineup, "rishi" or
   * "reset" hands the court back. Announcements appear as a toast.
   */
  const rosterLength = tennisRoster.length;
  const [identities, setIdentities] = useState<number[]>([0, 0]);
  const identitiesRef = useRef(identities);
  identitiesRef.current = identities;
  const [toast, setToast] = useState<{ id: number; text: string } | null>(
    null,
  );
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announce = useCallback((text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );
  const serveLine = (index: number) => {
    const identity = tennisRoster[index]!;
    return `${identity.flag} Now serving: ${identity.name} — ${identity.tag}`;
  };
  const pickForCourt = useCallback(
    (index: number) => {
      setIdentities([index, index]);
      announce(serveLine(index));
    },
    [announce],
  );
  const cyclePlayer = useCallback(
    (player: number) => {
      const next = [...identitiesRef.current];
      next[player] = (next[player]! + 1) % rosterLength;
      setIdentities(next);
      announce(serveLine(next[player]!));
    },
    [announce, rosterLength],
  );
  const shuffleLineup = useCallback(() => {
    const near = Math.floor(Math.random() * rosterLength);
    const far = Math.floor(Math.random() * rosterLength);
    setIdentities([near, far]);
    announce(
      `🎾 Deuce! ${tennisRoster[near]!.name} vs ${tennisRoster[far]!.name} — what a final`,
    );
  }, [announce, rosterLength]);
  const typed = useRef("");
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(input|textarea|select)$/i.test(target.tagName))
      )
        return;
      if (event.key.length !== 1) return;
      typed.current = (typed.current + event.key.toLowerCase()).slice(-12);
      const triggers: ReadonlyArray<readonly [string, () => void]> = [
        ["deuce", shuffleLineup],
        ["rishi", () => pickForCourt(0)],
        ["reset", () => pickForCourt(0)],
        ...Object.entries(rosterTriggers).map(
          ([name, index]) =>
            [name, () => pickForCourt(index)] as const,
        ),
      ];
      for (const [word, action] of triggers) {
        if (typed.current.endsWith(word)) {
          typed.current = "";
          action();
          return;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickForCourt, shuffleLineup]);

  return (
    <section className="campus" aria-label="Explore Rishi’s world">
      <div className="campus-view">
        <noscript>
          <style>{`
            .campus { height: auto; }
            .campus-view { position: relative; height: auto; min-height: 860px; }
            .scroll-cue { display: none; }
            @media (max-width: 700px) {
              .campus-view { position: static; min-height: 0; overflow: visible; }
            }
          `}</style>
        </noscript>
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
            identities={identities}
            onPlayerCycle={cyclePlayer}
          />
        </div>
        {toast && (
          <p key={toast.id} className="court-toast" role="status">
            {toast.text}
          </p>
        )}
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
            {item.hint && <p className="place-hint">{item.hint}</p>}
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
            {timeline.filter((item) => item.campus !== false).map((item) => (
              <button
                key={item.slug}
                className={selected === item.slug ? "selected" : ""}
                aria-pressed={selected === item.slug}
                onClick={() => selectPlace(item.slug)}
              >
                {chapters[item.slug]}
              </button>
            ))}
          </nav>
        </div>
        <p className="scroll-cue" aria-hidden="true">
          <span>Keep scrolling — the campus flies</span>
          <i />
        </p>
      </div>
    </section>
  );
}
