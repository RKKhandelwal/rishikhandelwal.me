import * as THREE from "three";
import { tennisRoster, type TennisIdentity } from "./tennis-roster";

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
export type Campus = ReturnType<typeof createCampus>;
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
  const court = {
    surround: "#c4d86b", // lime run-off, echoing the site's selected accent
    apron: "#497f76", // dark teal band framing the playable surface
    surface: "#658ba2", // slate-blue in-bounds court
    line: "#fff6df", // chalk
    net: cream,
    post: dark,
    ball: "#e5f164",
  };
  box(8.2, 0.15, 6.2, court.surround, 4.6, 0.18, 4.6, tennis);
  box(7.2, 0.025, 5.2, court.apron, 4.6, 0.27, 4.6, tennis);
  box(6.4, 0.03, 4.4, court.surface, 4.6, 0.29, 4.6, tennis);
  const line = (w: number, d: number, x: number, z: number) =>
    box(w, 0.018, d, court.line, x, 0.315, z, tennis);
  for (const z of [2.4, 2.95, 6.25, 6.8]) line(6.4, 0.045, 4.6, z); // doubles & tram lines
  for (const x of [1.4, 7.8]) line(0.045, 4.4, x, 4.6); // baselines
  for (const x of [3, 6.2]) line(0.045, 3.3, x, 4.6); // service lines
  line(3.2, 0.045, 4.6, 4.6); // center service line
  // Net: posts, top band, mesh weave, and horizontal cords.
  for (const z of [2.2, 7])
    cylinder(0.045, 0.9, court.post, 4.6, 0.72, z, tennis);
  box(0.045, 0.055, 4.8, court.net, 4.6, 1.16, 4.6, tennis);
  for (let z = 2.25; z < 7; z += 0.18)
    box(0.018, 0.72, 0.018, court.post, 4.6, 0.78, z, tennis);
  for (let y = 0.45; y < 1.13; y += 0.14)
    box(0.018, 0.015, 4.8, court.post, 4.6, y, 4.6, tennis);
  // Back fencing is intentionally open on the camera-facing sides.
  for (let x = 0.7; x < 8.8; x += 1.3)
    cylinder(0.03, 1.35, court.post, x, 0.85, 1.55, tennis);
  for (let y = 0.5; y < 1.6; y += 0.27)
    box(8, 0.018, 0.018, court.post, 4.6, y, 1.55, tennis);
  for (const x of [0.6, 8.6]) {
    // Floodlight masts with little lamp heads.
    cylinder(0.055, 3.3, court.post, x, 1.8, 1.5, tennis);
    box(0.6, 0.2, 0.25, court.net, x, 3.46, 1.5, tennis);
  }
  for (let i = 0; i < 3; i++)
    box(2.8, 0.16, 0.3, court.net, 5.6, 0.32 + i * 0.18, 7.65 + i * 0.22, tennis);

  /* Players are structured rigs (legs, torso, arms, head, hair, headband,
     and a racket hinged at the hand) so the easter egg can restyle them.
     Each rig is built facing its local +Z, then turned toward the net. */
  type PlayerRig = {
    root: THREE.Group;
    torso: THREE.Mesh;
    head: THREE.Mesh;
    hair: THREE.Mesh;
    headband: THREE.Mesh;
    arms: THREE.Mesh[];
    legs: THREE.Mesh[];
    racket: THREE.Group;
    hoop: THREE.Mesh;
  };
  const buildPlayer = (x: number, z: number, facing: number, index: number) => {
    const root = new THREE.Group();
    root.position.set(x, 0, z);
    root.rotation.y = facing;
    root.userData.tennisPlayer = index;
    tennis.add(root);
    const legs = [-0.065, 0.065].map((dx) =>
      box(0.07, 0.23, 0.09, court.net, dx, 0.41, 0, root),
    );
    const torso = cylinder(0.105, 0.42, "#f0b55a", 0, 0.7, 0, root);
    const arms = [
      box(0.05, 0.24, 0.065, "#f0b55a", -0.135, 0.735, 0, root),
      box(0.05, 0.24, 0.065, "#f0b55a", 0.135, 0.735, 0.045, root),
    ];
    arms[1].rotation.x = -0.35; // racket arm presented toward the net
    const head = sphere(0.13, "#c88c61", 0, 1.04, 0, root);
    // Hair is a slightly larger shell nudged up and back from the skull:
    // it hugs over the crown and occiput while the face stays bare.
    const hair = sphere(0.142, "#33241a", 0, 1.07, -0.035, root);
    // A touch wider than the hair so a headband wraps visibly over it.
    const headband = cylinder(0.146, 0.05, court.net, 0, 1.095, -0.035, root);
    headband.visible = false;
    const racket = new THREE.Group();
    // Gripped at the racket arm's hand (arm bottom ~y 0.63), head up front.
    racket.position.set(0.145, 0.635, 0.1);
    root.add(racket);
    box(0.026, 0.15, 0.026, court.post, 0, 0.075, 0, racket); // grip
    const hoop = mesh(
      new THREE.TorusGeometry(0.12, 0.024, 6, 20),
      "#e4d668",
      0,
      0.27,
      0,
      racket,
    );
    // Invisible, generous hit volume so the easter egg stays easy to
    // double-click while the players are on the move.
    const hitbox = cylinder(0.45, 1.5, court.post, 0, 0.7, 0, root);
    hitbox.visible = false;
    hitbox.castShadow = false;
    hitbox.receiveShadow = false;
    return { root, torso, head, hair, headband, arms, legs, racket, hoop } as PlayerRig;
  };
  const players = [
    buildPlayer(2.1, 4.2, Math.PI / 2, 0), // near baseline, facing +X
    buildPlayer(7.2, 5.1, -Math.PI / 2, 1), // far baseline, facing -X
  ];
  const applyIdentity = (player: PlayerRig, identity: TennisIdentity) => {
    player.torso.material = material(identity.shirt);
    const sleeve = material(identity.sleeveless ? identity.skin : identity.shirt);
    player.arms.forEach((arm) => (arm.material = sleeve));
    player.legs.forEach((leg) => (leg.material = material(identity.shorts)));
    player.head.material = material(identity.skin);
    player.hair.material = material(identity.hair);
    if (identity.longHair) {
      // Fuller mop: grows down to the nape and back past the skull.
      player.hair.scale.set(1, 1.05, 1.18);
      player.hair.position.set(0, 1.05, -0.06);
    } else {
      player.hair.scale.set(1, 1, 1);
      player.hair.position.set(0, 1.07, -0.035);
    }
    player.headband.visible = identity.headband !== null;
    if (identity.headband)
      player.headband.material = material(identity.headband);
    player.hoop.material = material(identity.racket);
  };
  const ball = sphere(0.095, court.ball, 3.2, 1, 4.6, tennis);

  /* Rally simulation — a tiny state machine, not a canned sine loop.
     Each shot leaves a player's racket and lands on a fresh random spot in
     the receiver's court. The receiver sprints to that spot and answers,
     so the pair trade deeper and shorter balls, come to the net, recover,
     and time their swings as the ball arrives. Flight time is derived from
     how far the receiver must run, so ball and player land together. */
  const rally = {
    striker: 0, // who just hit the ball
    prev: -1, // previous animate() time, for a frame-rate-free dt
    t: 0, // seconds elapsed on the current shot
    duration: 1,
    arc: 1,
    from: new THREE.Vector3(), // racket contact point (frozen for the flight)
    land: new THREE.Vector3(), // where the ball bounces / receiver will be
    recvStart: new THREE.Vector3(), // receiver position when the shot began
    started: false,
  };
  const home = [
    new THREE.Vector3(2.1, 0, 4.6), // near baseline center
    new THREE.Vector3(7.2, 0, 4.6), // far baseline center
  ];
  const lerp = THREE.MathUtils.lerp;
  const contactPoint = (player: number, target: THREE.Vector3) => {
    const p = players[player].root.position;
    target.set(p.x + (player === 0 ? 0.42 : -0.42), 0.72, p.z);
    return target;
  };
  const startShot = (striker: number) => {
    const receiver = 1 - striker;
    rally.striker = striker;
    contactPoint(striker, rally.from);
    const r = players[receiver].root.position;
    rally.recvStart.set(r.x, 0, r.z);
    const [minX, maxX] = receiver === 1 ? [5.1, 7.35] : [1.85, 4.05];
    rally.land.set(
      lerp(minX, maxX, Math.random()),
      0,
      lerp(2.7, 6.5, Math.random()),
    );
    // Run distance sets the pace: sprint for a wide ball, jog for one served
    // straight to the racket, so rallies breathe instead of metronoming.
    const run = Math.hypot(rally.land.x - r.x, rally.land.z - r.z);
    rally.duration = THREE.MathUtils.clamp(0.55 + run * 0.32, 0.72, 1.6);
    rally.arc = lerp(0.8, 1.25, Math.random()) + run * 0.12;
    rally.t = 0;
  };

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
      // Advance the rally by real elapsed time so it plays identically at
      // any frame rate; the first call just primes the clock.
      const dt = rally.prev < 0 ? 0 : Math.min(time - rally.prev, 0.05);
      rally.prev = time;
      if (!rally.started) {
        rally.started = true;
        startShot(0);
        ball.position.copy(rally.from);
      } else {
        rally.t += dt;
        // A hard frame hitch (tab hidden) can skip a full shot; just resume
        // mid-rally rather than fast-forwarding through many hits.
        let guard = 2;
        while (rally.t >= rally.duration && guard-- > 0) {
          const runner = players[1 - rally.striker];
          runner.root.position.copy(rally.land);
          startShot(1 - rally.striker);
        }
        const u = THREE.MathUtils.clamp(rally.t / rally.duration, 0, 1);
        const receiver = 1 - rally.striker;
        // Turn only when there is a real direction to aim at (a player the
        // ball flies directly over would otherwise snap toward atan2(0,0)).
        const face = (rig: THREE.Object3D, x: number, z: number) => {
          const dx = x - rig.position.x;
          const dz = z - rig.position.z;
          if (dx * dx + dz * dz > 0.014) rig.rotation.y = Math.atan2(dx, dz);
        };
        // Ball: parabola from the striker's strings down to the landing spot.
        ball.position.set(
          lerp(rally.from.x, rally.land.x, u),
          lerp(rally.from.y, 0.12, u) + rally.arc * Math.sin(Math.PI * u),
          lerp(rally.from.z, rally.land.z, u),
        );
        // Receiver: ease onto the ball (fast away from a bad position,
        // settling as the racket arrives), tracking it and winding up late.
        const chase = 1 - (1 - u) * (1 - u);
        const runner = players[receiver].root;
        runner.position.x = lerp(rally.recvStart.x, rally.land.x, chase);
        runner.position.z = lerp(rally.recvStart.z, rally.land.z, chase);
        face(runner, ball.position.x, ball.position.z);
        const windup = Math.max(0, (u - 0.72) / 0.28);
        players[receiver].racket.rotation.x = -0.15 + windup * windup * 0.5;
        runner.position.y *= Math.exp(-6 * dt);
        // Striker: swings through contact, then recovers toward the middle
        // with the racket easing back to the ready position.
        const hitter = players[rally.striker].root;
        const swing = Math.max(0, 1 - u * 2.6);
        face(hitter, ball.position.x, ball.position.z);
        players[rally.striker].racket.rotation.x = -0.15 - swing * 1.2;
        hitter.position.y = swing * 0.06;
        hitter.position.x = lerp(
          hitter.position.x,
          home[rally.striker].x,
          dt * 1.4,
        );
        hitter.position.z = lerp(
          hitter.position.z,
          home[rally.striker].z,
          dt * 1.4,
        );
      }
      molecule.rotation.y = time * 0.2;
      mathRing.rotation.y = time * 0.25;
    },
    /** Swap a player's look for the easter egg; index matches the roster. */
    setIdentity(playerIndex: number, identityIndex: number) {
      const player = players[playerIndex];
      if (!player) return;
      const roster = tennisRoster.length;
      applyIdentity(player, tennisRoster.at(((identityIndex % roster) + roster) % roster)!);
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}
