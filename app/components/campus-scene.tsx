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

export default function CampusScene({ selected, onSelect, paused }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const pins = useRef<(HTMLButtonElement | null)[]>([]);
  const callbacks = useRef({ onSelect, paused });
  callbacks.current = { onSelect, paused };
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const container = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
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
      if (!callbacks.current.paused) {
        time += elapsed;
        campus.animate(time);
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
