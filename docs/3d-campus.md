# A little world of curiosity

The homepage translates the six existing timeline entries into an original interactive campus. Select a labeled landmark or a chapter in the dock to preview its story; follow the preview link for the existing detail page. The full, server-rendered story list remains below the scene.

## Reference and implementation

[Persona Studio](https://persona-studio.com/) inspired the world-first composition: a miniature city, labels attached to buildings, a floating navigation dock, and HTML content layered over a WebGL scene. Its public production bundle references `react-three-fiber.esm-BcMqO5jD.js`; its Scene and Building chunks contain Three.js controls and procedural geometry/material components such as `boxGeometry` and `meshStandardMaterial` (inspected September 6, 2026).

This implementation uses Three.js directly with an orthographic camera, soft directional shadows, low-poly geometry, OrbitControls, raycast selection, and projected HTML buttons. All campus geometry is original; no Persona code, models, textures, or branding were copied. The existing Next.js architecture and timeline data are preserved.

- **School:** a blue-roofed hall and clock tower.
- **Community:** a shared learning table, books, and benches.
- **Aviation:** a miniature biplane on a museum apron.
- **Tennis:** doubles and service lines, net, players, lights, bleachers, and an animated ball.
- **Mathematics:** a book pavilion and rotating ring.
- **Research:** a lab and abstract molecule sculpture (decorative, not a scientific model).

## Visual system

The interface takes its typography from [Supermemory](https://supermemory.ai/): Space Grotesk headings and DM Sans body text, with DM Mono for small indexes. Fonts are bundled through `next/font/google` at build time, so visitors do not need to request them from Google. [Ramp](https://ramp.com/) uses Lausanne; this project uses the openly available Supermemory pairing instead of redistributing Ramp's font files.

White surfaces, near-black text, thin neutral borders, modest corner radii, and blue primary actions follow Supermemory's restrained interface. Lime contact/selected accents take inspiration from Ramp and echo the tennis scene. There is no serif display font. The same tokens and heading treatment carry through the campus, story list, story previews, and detail pages.

## Interaction and accessibility

Drag with a mouse to orbit the campus freely through 360 degrees and tilt from pole to pole. Releasing the pointer lets the view coast smoothly to a stop; reduced-motion preferences disable this inertia. Mouse-wheel and touch scrolling remain available for the page. On touch devices the scene stays framed and its buttons/dock provide story selection. Ambient animation respects the operating system's reduced-motion preference. Selecting a story moves keyboard focus to its preview; Escape/Close restores the trigger.

The scene is dynamically imported only on the client. Renderer pixel density is capped, and animation rendering stops while offscreen, hidden, or reduced motion is enabled. Meshes, materials, controls, observers, listeners, the shadow map, and the renderer are disposed on unmount. Devices without WebGL get an explanatory message and can still access every story through the dock and ordinary links.

## Local development

```sh
npm ci
npm run dev
```

For production verification, stop the development server before running `npm run build` and `npm start` because Next.js 14 shares the `.next` directory between development and production.

## Background source

At the site owner's request, the shared background uses the Quiet Horizon image and soft-grain texture from [Cooper Saye's website](https://www.csaye.com/) (retrieved September 7, 2026):

- https://www.csaye.com/backgrounds/quiet-horizon.avif
- https://www.csaye.com/textures/soft-grain.svg

Both assets are served locally from `public/backgrounds`. The fixed, decorative layer uses a muted image treatment and a subtle overlay; it receives no pointer events and is hidden from assistive technology. The existing campus canvas stays transparent so the background remains visible behind the 3D scene.

## Chapter dock

The chapter navigation uses a translucent, blurred glass surface and a single sliding selection lens. The lens tracks the selected button's measured bounds, including the two-row mobile layout and font/viewport resizing. Switching chapters animates its position and size; reduced-motion preferences disable the transitions. Opaque fallback styling supports browsers without backdrop filtering. Map labels, navigation buttons, and story rows use unnumbered names.
