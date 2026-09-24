"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCampus, landmarks } from "./campus-world";

type Props = {
  selected: string | null;
  onSelect: (slug: string) => void;
  paused: boolean;
};

/**
 * Scroll-scrubbed camera choreography, animejs.com-style: page progress
 * through the pinned campus runway plays one full 360° pass over the
 * world — dipping low around the landmarks, then pulling back up high.
 * Angles follow OrbitControls' spherical convention (polar from +Y,
 * azimuth from +Z toward +X). The first keyframe reproduces the initial
 * camera position exactly, so page load starts seamlessly mid-story.
 * Keys are evenly spaced (progress i/(n-1)) and sampled with a
 * Catmull-Rom spline, so angular velocity stays continuous through the
 * joints — segmentwise easing read as five stutter-steps per sweep.
 */
const FLIGHT_KEYS = [
  { azimuth: 0.632734, polar: 0.997856, zoom: 1.0 },
  { azimuth: 1.75, polar: 1.16, zoom: 1.18 },
  { azimuth: 3.05, polar: 1.22, zoom: 1.34 },
  { azimuth: 4.45, polar: 1.02, zoom: 1.28 },
  { azimuth: 5.85, polar: 0.75, zoom: 1.05 },
  { azimuth: 6.915919, polar: 0.62, zoom: 0.92 },
];

function flightPose(progress: number) {
  const n = FLIGHT_KEYS.length;
  const clamp01 = THREE.MathUtils.clamp(progress, 0, 1);
  const span = n - 1;
  const seg = Math.min(Math.floor(clamp01 * span), span - 1);
  const t = clamp01 * span - seg;
  // Uniform Catmull-Rom; clamped end tangents via key duplication.
  const sample = (get: (k: (typeof FLIGHT_KEYS)[number]) => number) => {
    const p0 = get(FLIGHT_KEYS[Math.max(0, seg - 1)]);
    const p1 = get(FLIGHT_KEYS[seg]);
    const p2 = get(FLIGHT_KEYS[seg + 1]);
    const p3 = get(FLIGHT_KEYS[Math.min(n - 1, seg + 2)]);
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      0.5 *
      (2 * p1 +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
    );
  };
  return {
    azimuth: sample((k) => k.azimuth),
    polar: sample((k) => k.polar),
    zoom: sample((k) => k.zoom),
  };
}

export default function CampusScene({ selected, onSelect, paused }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const pins = useRef<(HTMLButtonElement | null)[]>([]);
  const callbacks = useRef({ onSelect, paused });
  callbacks.current = { onSelect, paused };
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const container = host.current!;
    const runway = container.closest(".campus");
    const view = container.closest(".campus-view") as HTMLElement | null;
    // When the flight cannot run for this visitor (no WebGL, reduced motion,
    // touch device, scripting off), the section collapses back to its
    // original one-screen flow instead of three screens of dead runway.
    const collapseRunway = () => {
      runway?.classList.add("no-flight");
      view?.style.setProperty("--flight", "0");
    };
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      collapseRunway();
      setStatus("unavailable");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-16, 16, 12, -12, 0.1, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false; // Scrolling remains available to reach the story list.
    // Leave the default full orbit range: unlimited azimuth and pole-to-pole tilt.
    controls.enableDamping = !callbacks.current.paused;
    controls.dampingFactor = 0.075;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    renderer.domElement.style.touchAction = "pan-y";
    // Mobile keeps native scrolling; all landmarks remain available in the dock.
    controls.enabled = window.matchMedia("(pointer: fine)").matches;
    const campus = createCampus();
    scene.add(campus.world);
    scene.add(new THREE.HemisphereLight("#fff4dd", "#7c9381", 2.7));
    const sun = new THREE.DirectionalLight("#fff0d5", 3.5);
    sun.position.set(-10, 18, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -16,
      right: 16,
      top: 16,
      bottom: -16,
      near: 0.5,
      far: 50,
    });
    sun.shadow.normalBias = 0.035;
    scene.add(sun);
    const anchors = landmarks.map((l) => new THREE.Vector3(...l.position));
    let width = 0,
      height = 0,
      frame = 0,
      time = 0,
      last = 0,
      inView = true,
      needsRender = true;
    const projectPins = () => {
      anchors.forEach((anchor, i) => {
        const point = anchor.clone().project(camera);
        const pin = pins.current[i];
        if (pin) {
          pin.style.left = `${(point.x * 0.5 + 0.5) * width}px`;
          pin.style.top = `${(-point.y * 0.5 + 0.5) * height}px`;
          pin.style.visibility =
            Math.abs(point.x) < 0.98 && Math.abs(point.y) < 0.96
              ? "visible"
              : "hidden";
        }
      });
    };
    const render = () => {
      renderer.render(scene, camera);
      projectPins();
      needsRender = false;
    };
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      const aspect = width / height;
      const span = aspect < 1 ? 25 / aspect : 23;
      camera.left = (-span * aspect) / 2;
      camera.right = (span * aspect) / 2;
      camera.top = span / 2;
      camera.bottom = -span / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    };
    const initializeView = () => {
      camera.position.set(22, 24, 30);
      controls.target.set(0, 0, 0);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      controls.update();
      render();
    };
    initializeView();
    resize();
    // Scroll flight: progress through the tall runway scrubs the camera
    // along FLIGHT_KEYS. A frame-rate-normalized glide eases toward the
    // live scroll position, so wheel steps read as smooth motion rather
    // than jumps, mirroring anime.js ScrollObserver sync mode. The flight
    // is a desktop/tablet-with-pointer feature; touch keeps the scene
    // framed and native scrolling, exactly as documented.
    const flightRadius = camera.position.clone().sub(controls.target).length();
    const finePointer = window.matchMedia("(pointer: fine)");
    // A pinned runway only makes sense where the flight can actually run;
    // coarse-pointer tablets keep the collapsing single-screen flow.
    const applyFlightAvailability = () => {
      if (finePointer.matches) runway?.classList.remove("no-flight");
      else collapseRunway();
    };
    applyFlightAvailability();
    finePointer.addEventListener("change", applyFlightAvailability);
    let flightShown = 0;
    let flightGoal = 0;
    let dragging = false;
    let pendingBlend = false;
    let blend = 1;
    let blendZoom = 1;
    const blendFrom = new THREE.Spherical();
    const dragStart = () => {
      dragging = true;
    };
    const dragEnd = () => {
      dragging = false;
      pendingBlend = true;
    };
    controls.addEventListener("start", dragStart);
    controls.addEventListener("end", dragEnd);
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibility.observe(container);
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!inView || document.hidden) return;
      // Integrate inertia once per frame, including after the pointer is released.
      // Normalize damping so high-refresh screens have the same settling time.
      controls.enableDamping = !callbacks.current.paused;
      controls.dampingFactor = 1 - Math.pow(1 - 0.075, elapsed * 60);
      controls.update();
      if (callbacks.current.paused) {
        // Reduced motion engaged mid-scroll: rewind so the heading returns
        // and the camera settles back on its documented opening pose.
        if (flightShown !== 0) {
          flightShown = 0;
          blend = 1;
          pendingBlend = false;
          view?.style.setProperty("--flight", "0");
          initializeView();
        }
      } else {
        time += elapsed;
        campus.animate(time);
        if (runway && finePointer.matches) {
          const bounds = runway.getBoundingClientRect();
          const span = bounds.height - window.innerHeight;
          flightGoal =
            span > 60 ? THREE.MathUtils.clamp(-bounds.top / span, 0, 1) : 0;
          if (dragging) {
            // Free orbit owns the camera; scroll progress keeps tracking.
            flightShown = flightGoal;
          } else if (Math.abs(flightGoal - flightShown) > 0.0002 || blend < 1) {
            if (pendingBlend) {
              // Resume from wherever the drag left the camera and ease in
              // along the shortest arc instead of teleporting to the path.
              pendingBlend = false;
              blendFrom.setFromVector3(
                camera.position.clone().sub(controls.target),
              );
              blendZoom = camera.zoom;
              blend = 0;
            }
            const k = 1 - Math.pow(1 - 0.22, elapsed * 60);
            flightShown += (flightGoal - flightShown) * k;
            const pose = flightPose(flightShown);
            let { azimuth, polar, zoom } = pose;
            if (blend < 1) {
              blend = Math.min(1, blend + elapsed * 3);
              const w = blend * blend * (3 - 2 * blend);
              const delta = Math.atan2(
                Math.sin(pose.azimuth - blendFrom.theta),
                Math.cos(pose.azimuth - blendFrom.theta),
              );
              azimuth = blendFrom.theta + delta * w;
              polar = THREE.MathUtils.lerp(blendFrom.phi, pose.polar, w);
              zoom = THREE.MathUtils.lerp(blendZoom, pose.zoom, w);
            }
            camera.position
              .setFromSphericalCoords(flightRadius, polar, azimuth)
              .add(controls.target);
            camera.zoom = zoom;
            camera.updateProjectionMatrix();
            camera.lookAt(controls.target);
            view?.style.setProperty("--flight", flightShown.toFixed(4));
            needsRender = true;
          }
        }
      }
      if (needsRender || !callbacks.current.paused) render();
    };
    frame = requestAnimationFrame(tick);
    controls.addEventListener("change", renderOnChange);
    function renderOnChange() {
      needsRender = true;
    }
    const raycaster = new THREE.Raycaster();
    let down = { x: 0, y: 0 };
    const pointerDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY };
    };
    const pointerUp = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((e.clientX - bounds.left) / width) * 2 - 1,
          (-(e.clientY - bounds.top) / height) * 2 + 1,
        ),
        camera,
      );
      const hit = raycaster.intersectObjects(campus.world.children, true)[0];
      let object: THREE.Object3D | null = hit?.object ?? null;
      while (object) {
        if (object.userData.slug) {
          callbacks.current.onSelect(object.userData.slug);
          break;
        }
        object = object.parent;
      }
    };
    const contextLost = (e: Event) => {
      e.preventDefault();
      collapseRunway();
      setStatus("unavailable");
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    setStatus("ready");
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      controls.removeEventListener("change", renderOnChange);
      controls.removeEventListener("start", dragStart);
      controls.removeEventListener("end", dragEnd);
      finePointer.removeEventListener("change", applyFlightAvailability);
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      campus.dispose();
      sun.shadow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={host}
      className={`campus-canvas ${status}`}
      aria-label="Interactive miniature campus"
    >
      {status !== "ready" && (
        <div className="scene-status" role="status">
          <span className="status-orb" />
          {status === "loading"
            ? "Opening a little world…"
            : "The 3D view is unavailable on this device. Explore every story below."}
        </div>
      )}
      {landmarks.map((landmark, i) => (
        <button
          key={landmark.slug}
          ref={(el) => {
            pins.current[i] = el;
          }}
          className={`map-pin ${selected === landmark.slug ? "active" : ""}`}
          onClick={() => onSelect(landmark.slug)}
          aria-pressed={selected === landmark.slug}
          tabIndex={status === "ready" ? 0 : -1}
          style={{ visibility: "hidden" }}
        >
          {landmark.label}
        </button>
      ))}
    </div>
  );
}
