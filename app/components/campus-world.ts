import * as THREE from "three";

export const landmarks = [
  { slug: "los-altos-high-school", label: "School", position: [-5, 3.8, -3.7] },
  { slug: "buddies4math", label: "Community", position: [-6.5, 1.8, 2.6] },
  { slug: "hiller-aviation", label: "Aviation", position: [0, 3, -6] },
  { slug: "varsity-tennis", label: "Tennis", position: [4.8, 0.7, 4] },
  { slug: "promys", label: "Mathematics", position: [0.6, 3.5, -1.8] },
  {
    slug: "advanced-student-investigation",
    label: "Research",
    position: [6.8, 3.7, -3.8],
  },
] as const;

/** Original low-poly geometry. No downloaded models or reference-site assets. */
export function createCampus() {
  const world = new THREE.Group();
  const materials = new Map<string, THREE.MeshStandardMaterial>();
  const geometries = new Set<THREE.BufferGeometry>();
  const material = (color: string) => {
    if (!materials.has(color))
      materials.set(
        color,
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.85,
          flatShading: true,
        }),
      );
    return materials.get(color)!;
  };
  function mesh(
    geometry: THREE.BufferGeometry,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, material(color));
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const box = (
    w: number,
    h: number,
    d: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) => mesh(new THREE.BoxGeometry(w, h, d), color, x, y, z, parent);
  const sphere = (
    r: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) => mesh(new THREE.IcosahedronGeometry(r, 1), color, x, y, z, parent);
  const cylinder = (
    r: number,
    h: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) => mesh(new THREE.CylinderGeometry(r, r, h, 12), color, x, y, z, parent);
  const groups = new Map<string, THREE.Group>();
  landmarks.forEach(({ slug }) => {
    const group = new THREE.Group();
    group.userData.slug = slug;
    world.add(group);
    groups.set(slug, group);
  });
  const grass = "#73a681",
    cream = "#eceee7",
    dark = "#294e48",
    orange = "#3668c9",
    blue = "#7ca6a7";
  box(20, 0.65, 17, "#b2b9a1", 0, -0.4, 0);
  box(20.15, 0.18, 17.15, grass, 0, 0, 0);
  // Intersecting pedestrian promenades and little paved entrances.
  box(19.5, 0.025, 1.1, cream, 0, 0.11, 0.4);
  box(1.15, 0.025, 16.6, cream, -2.4, 0.115, 0);
  box(1.1, 0.025, 7, cream, 4.2, 0.115, -4.5);
  box(6.2, 0.025, 0.8, cream, -5.9, 0.115, -1.4);
  for (let z = 1.2; z < 7.5; z += 0.9)
    box(0.7, 0.03, 0.12, "#d6c9ac", -2.4, 0.14, z);

  // School: a terracotta-roofed hall with a little clock tower.
  const school = groups.get("los-altos-high-school")!;
  box(4.6, 1.9, 2.8, cream, -6, 1.08, -4.4, school);
  box(4.95, 0.25, 3.1, orange, -6, 2.15, -4.4, school);
  const roof = mesh(
    new THREE.CylinderGeometry(0, 1, 1, 4),
    orange,
    -6,
    2.6,
    -4.4,
    school,
  );
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(3.5, 0.9, 2.2);
  box(1.25, 3.2, 1.1, "#e7cf9d", -5.6, 1.7, -3, school);
  box(1.45, 0.2, 1.3, dark, -5.6, 3.4, -3, school);
  const clock = cylinder(0.36, 0.045, cream, -5.6, 2.85, -2.43, school);
  clock.rotation.x = Math.PI / 2;
  box(0.035, 0.22, 0.025, dark, -5.6, 2.91, -2.395, school);
  box(0.17, 0.035, 0.025, dark, -5.535, 2.83, -2.39, school);
  for (let i = 0; i < 5; i++)
    box(0.43, 0.72, 0.035, blue, -7.8 + i * 0.85, 1.25, -2.98, school);
  box(0.65, 1.05, 0.05, dark, -5.6, 0.66, -2.42, school);
  for (let i = 0; i < 3; i++)
    box(
      1.4 + i * 0.24,
      0.12,
      0.35,
      "#d7cbb4",
      -5.6,
      0.27 - i * 0.06,
      -2.2 + i * 0.26,
      school,
    );

  // Mathematics pavilion: colorful books and an open courtyard.
  const math = groups.get("promys")!;
  box(3.6, 0.18, 3.2, cream, 0.4, 0.2, -2.8, math);
  for (const x of [-1, 1.8])
    for (const z of [-4, -1.6]) cylinder(0.12, 2, cream, x, 1.2, z, math);
  box(3.65, 0.22, 3.4, dark, 0.4, 2.3, -2.8, math);
  [orange, "#e2b748", blue, "#577859"].forEach((color, i) => {
    const book = box(
      0.52,
      1.3 + i * 0.2,
      1.2,
      color,
      -0.7 + i * 0.58,
      0.94 + i * 0.1,
      -2.8,
      math,
    );
    if (i === 3) book.rotation.z = -0.12;
    box(0.37, 0.07, 0.02, cream, -0.7 + i * 0.58, 1.25, -2.19, math);
  });
  const mathRing = mesh(
    new THREE.TorusGeometry(0.5, 0.1, 8, 32),
    "#e5b84d",
    0.4,
    3.05,
    -2.8,
    math,
  );
  mathRing.rotation.x = 0.35;

  // Tennis: doubles lines, mesh net, floodlights, bleachers, and a rally.
  const tennis = groups.get("varsity-tennis")!;
  box(8.2, 0.15, 6.2, "#c4d86b", 4.6, 0.18, 4.6, tennis);
  box(7.2, 0.025, 5.2, "#497f76", 4.6, 0.27, 4.6, tennis);
  box(6.4, 0.03, 4.4, "#658ba2", 4.6, 0.29, 4.6, tennis);
  const line = (w: number, d: number, x: number, z: number) =>
    box(w, 0.018, d, "#fff6df", x, 0.315, z, tennis);
  for (const z of [2.4, 2.95, 6.25, 6.8]) line(6.4, 0.045, 4.6, z);
  for (const x of [1.4, 7.8]) line(0.045, 4.4, x, 4.6);
  for (const x of [3, 6.2]) line(0.045, 3.3, x, 4.6);
  line(3.2, 0.045, 4.6, 4.6);
  for (const z of [2.2, 7]) cylinder(0.045, 0.9, dark, 4.6, 0.72, z, tennis);
  box(0.045, 0.055, 4.8, cream, 4.6, 1.16, 4.6, tennis);
  for (let z = 2.25; z < 7; z += 0.18)
    box(0.018, 0.72, 0.018, dark, 4.6, 0.78, z, tennis);
  for (let y = 0.45; y < 1.13; y += 0.14)
    box(0.018, 0.015, 4.8, dark, 4.6, y, 4.6, tennis);
  // Back fencing is intentionally open on the camera-facing sides.
  for (let x = 0.7; x < 8.8; x += 1.3)
    cylinder(0.03, 1.35, dark, x, 0.85, 1.55, tennis);
  for (let y = 0.5; y < 1.6; y += 0.27)
    box(8, 0.018, 0.018, dark, 4.6, y, 1.55, tennis);
  for (const x of [0.6, 8.6]) {
    cylinder(0.055, 3.3, dark, x, 1.8, 1.5, tennis);
    box(0.6, 0.2, 0.25, cream, x, 3.46, 1.5, tennis);
  }
  for (let i = 0; i < 3; i++)
    box(2.8, 0.16, 0.3, cream, 5.6, 0.32 + i * 0.18, 7.65 + i * 0.22, tennis);
  function person(x: number, z: number, color: string) {
    cylinder(0.105, 0.42, color, x, 0.7, z, tennis);
    sphere(0.13, "#c88c61", x, 1.04, z, tennis);
    for (const dx of [-0.065, 0.065])
      box(0.07, 0.23, 0.09, cream, x + dx, 0.41, z, tennis);
    const racket = mesh(
      new THREE.TorusGeometry(0.14, 0.025, 6, 16),
      "#e4d668",
      x + 0.24,
      0.74,
      z,
      tennis,
    );
    racket.rotation.y = Math.PI / 2;
  }
  person(2.1, 4.2, "#f0b55a");
  person(7.2, 5.1, "#f5eee0");
  const ball = sphere(0.095, "#e5f164", 3.2, 1, 4.6, tennis);

  // Research garden: an original molecule sculpture, not a chemical model.
  const research = groups.get("advanced-student-investigation")!;
  cylinder(1.8, 0.15, cream, 7, 0.22, -4, research);
  box(2.5, 1.25, 2.2, "#d7ded1", 7, 0.85, -4, research);
  box(2.7, 0.12, 2.4, dark, 7, 1.54, -4, research);
  for (const x of [6.3, 7, 7.7])
    box(0.45, 0.65, 0.03, blue, x, 0.95, -2.88, research);
  const molecule = new THREE.Group();
  molecule.position.set(7, 2.65, -4);
  research.add(molecule);
  const atoms = [
    [0, 0, 0],
    [-0.7, 0.55, 0.3],
    [0.75, 0.4, 0.1],
    [0.4, -0.45, 0.7],
    [-0.3, -0.45, -0.65],
  ];
  atoms.forEach(([x, y, z], i) => {
    sphere(i === 0 ? 0.32 : 0.22, i % 2 ? orange : blue, x, y, z, molecule);
    if (i) {
      const end = new THREE.Vector3(x, y, z);
      const bond = cylinder(
        0.055,
        end.length(),
        cream,
        x / 2,
        y / 2,
        z / 2,
        molecule,
      );
      bond.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        end.normalize(),
      );
    }
  });

  // Aviation: museum apron and a small biplane.
  const aviation = groups.get("hiller-aviation")!;
  box(4.4, 0.05, 2.2, "#b6b7a4", 0.4, 0.16, -6.6, aviation);
  for (let x = -1.5; x < 2.5; x += 0.8)
    box(0.35, 0.02, 0.05, cream, x, 0.2, -6.6, aviation);
  const plane = new THREE.Group();
  plane.position.set(0.3, 1.4, -6.5);
  plane.rotation.y = -0.15;
  aviation.add(plane);
  const body = sphere(0.4, orange, 0, 0, 0, plane);
  body.scale.set(2.6, 0.65, 0.7);
  box(0.7, 0.075, 2.8, "#eab95c", 0, 0.28, 0, plane);
  box(0.7, 0.075, 2.8, "#eab95c", 0, -0.23, 0, plane);
  for (const z of [-1.1, 1.1]) box(0.055, 0.5, 0.055, dark, 0, 0, z, plane);
  box(0.42, 0.055, 1, orange, -0.8, 0.08, 0, plane);
  box(0.38, 0.52, 0.06, orange, -0.85, 0.2, 0, plane);
  box(0.05, 0.85, 0.075, dark, 1.04, 0, 0, plane);
  cylinder(0.08, 0.8, "#837f6c", 0.3, 0.7, -6.5, aviation);

  // Community table: a space for learning together.
  const community = groups.get("buddies4math")!;
  cylinder(1.9, 0.08, "#d9c7a3", -6.8, 0.16, 3.4, community);
  box(2.6, 0.13, 1.15, orange, -6.8, 0.85, 3.4, community);
  for (const z of [2.5, 4.3]) {
    box(2.8, 0.12, 0.4, "#e4bb6d", -6.8, 0.54, z, community);
    for (const x of [-7.7, -5.9])
      box(0.12, 0.4, 0.28, dark, x, 0.3, z, community);
  }
  for (const x of [-7.7, -5.9])
    box(0.12, 0.7, 0.9, dark, x, 0.5, 3.4, community);
  box(0.5, 0.04, 0.4, cream, -7.3, 0.94, 3.4, community);
  box(0.4, 0.06, 0.5, blue, -6.3, 0.95, 3.5, community);

  function tree(x: number, z: number, size = 1) {
    cylinder(0.1 * size, 1.1 * size, "#80684b", x, 0.65 * size, z);
    const crown = sphere(
      0.68 * size,
      x % 2 ? "#376d53" : "#50865c",
      x,
      1.5 * size,
      z,
    );
    crown.scale.y = 1.25;
  }
  [
    [-9, -6, 1.1],
    [-9, -1, 1],
    [-9, 5.9, 1.2],
    [-5.5, 7, 1.1],
    [-4, 5.8, 0.8],
    [-3.5, -7, 1],
    [3.1, -7.5, 0.9],
    [9, -6.9, 1.1],
    [9, -1.4, 0.8],
    [2.5, -1, 0.7],
  ].forEach(([x, z, s]) => tree(x, z, s));
  // Hedges, stones, lamps, and a small pond complete the miniature landscape.
  for (let x = -8.5; x < -3.5; x += 0.65) sphere(0.32, "#5e8456", x, 0.4, -7.2);
  const pond = cylinder(1.15, 0.04, "#7baeb4", -5.5, 0.17, 6.4);
  pond.scale.set(1.4, 1, 0.65);
  for (const [x, z] of [
    [-3.1, 1.2],
    [-3.1, -3],
    [3.4, 0.1],
    [6.2, -0.3],
  ]) {
    cylinder(0.035, 1.35, dark, x, 0.78, z);
    sphere(0.14, "#fff1bc", x, 1.48, z);
  }
  return {
    world,
    animate(time: number) {
      ball.position.set(
        4.6 + Math.sin(time * 1.7) * 2.6,
        0.5 + Math.abs(Math.cos(time * 1.7)) * 1.2,
        4.6 + Math.sin(time * 1.7) * 0.45,
      );
      molecule.rotation.y = time * 0.2;
      mathRing.rotation.y = time * 0.25;
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}
