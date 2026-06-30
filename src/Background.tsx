export default function ConstructionBackground() {
  const STROKE = "#f59e0b"; // amber-500, matches the warm wireframe tone

  // ---------- helpers ----------
  const lerp = (a, b, t) => a + (b - a) * t;

  // Lattice tower (crane mast): two vertical rails + horizontal rungs + zig-zag bracing
  const buildMast = (xLeft, xRight, yTop, yBottom, step) => {
    const lines = [];
    let toggle = true;
    for (let y = yTop; y < yBottom; y += step) {
      const yNext = Math.min(y + step, yBottom);
      lines.push({ x1: xLeft, y1: y, x2: xRight, y2: y }); // rung
      if (toggle) {
        lines.push({ x1: xLeft, y1: y, x2: xRight, y2: yNext });
      } else {
        lines.push({ x1: xRight, y1: y, x2: xLeft, y2: yNext });
      }
      toggle = !toggle;
    }
    lines.push({ x1: xLeft, y1: yBottom, x2: xRight, y2: yBottom });
    return lines;
  };

  // Tapered jib/boom: two rails that converge to a single tip point, with a Warren truss between them
  const buildBoom = (rootTop, rootBottom, tip, segments) => {
    const lines = [];
    const topRail = [];
    const bottomRail = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      topRail.push({ x: lerp(rootTop.x, tip.x, t), y: lerp(rootTop.y, tip.y, t) });
      bottomRail.push({ x: lerp(rootBottom.x, tip.x, t), y: lerp(rootBottom.y, tip.y, t) });
    }
    for (let i = 0; i < segments; i++) {
      lines.push({ x1: topRail[i].x, y1: topRail[i].y, x2: topRail[i + 1].x, y2: topRail[i + 1].y });
      lines.push({ x1: bottomRail[i].x, y1: bottomRail[i].y, x2: bottomRail[i + 1].x, y2: bottomRail[i + 1].y });
      lines.push({ x1: topRail[i].x, y1: topRail[i].y, x2: bottomRail[i].x, y2: bottomRail[i].y });
      if (i % 2 === 0) {
        lines.push({ x1: topRail[i].x, y1: topRail[i].y, x2: bottomRail[i + 1].x, y2: bottomRail[i + 1].y });
      } else {
        lines.push({ x1: bottomRail[i].x, y1: bottomRail[i].y, x2: topRail[i + 1].x, y2: topRail[i + 1].y });
      }
    }
    return { lines, trolleyAt: (t) => ({ x: lerp(rootBottom.x, tip.x, t), y: lerp(rootBottom.y, tip.y, t) }) };
  };

  // Building facade: outer rect + floor lines + mullions
  const buildFacade = (x, y, w, h, floorStep, colStep) => {
    const floors = [];
    const cols = [];
    for (let fy = y + floorStep; fy < y + h; fy += floorStep) {
      floors.push({ x1: x, y1: fy, x2: x + w, y2: fy });
    }
    for (let cx = x + colStep; cx < x + w; cx += colStep) {
      cols.push({ x1: cx, y1: y, x2: cx, y2: y + h });
    }
    return { floors, cols };
  };

  // ---------- crane geometry ----------
  const mastX1 = 300;
  const mastX2 = 372;
  const mastTop = 130;
  const mastBottom = 1006;
  const mastLines = buildMast(mastX1, mastX2, mastTop, mastBottom, 58);

  const cab = { x: 282, y: 96, w: 110, h: 34 }; // slewing unit / operator cab
  const apex = { x: 337, y: 54 };

  const mainBoom = buildBoom(
    { x: cab.x + cab.w, y: cab.y },
    { x: mastX2 + 6, y: cab.y + cab.h },
    { x: 905, y: 298 },
    11
  );

  const counterBoom = buildBoom(
    { x: cab.x, y: cab.y + 6 },
    { x: mastX1 - 6, y: cab.y + cab.h },
    { x: 112, y: 158 },
    6
  );

  const trolley = mainBoom.trolleyAt(0.37); // hoist point along the bottom chord
  const hookY = trolley.y + 150;
  const boxTop = hookY + 12;

  // suspended container (simple 3-point-perspective wireframe box)
  const box = {
    flX: trolley.x - 70, flY: boxTop, // front-left
    frX: trolley.x + 70, frY: boxTop, // front-right
    h: 108,
    dx: 36, // depth offset x
    dy: -22, // depth offset y
  };

  // counterweight blocks near the tail of the counter-jib
  const counterweights = [
    { x: 98, y: 168, w: 70, h: 22 },
    { x: 104, y: 190, w: 58, h: 20 },
  ];

  // ---------- buildings ----------
  const towerA = { x: 1328, y: 556, w: 168, h: 452 };
  const towerB = { x: 1478, y: 700, w: 188, h: 308 };
  const facadeA = buildFacade(towerA.x, towerA.y, towerA.w, towerA.h, 40, 24);
  const facadeB = buildFacade(towerB.x, towerB.y, towerB.w, towerB.h, 40, 24);
  const roofUnit = { x: 1556, y: 590, w: 64, h: 50 };

  // ---------- stacked containers / scaffolding (bottom-left) ----------
  const stackRows = [
    [
      { x: 0, y: 862, w: 132, h: 148 },
      { x: 132, y: 862, w: 132, h: 148 },
      { x: 264, y: 862, w: 132, h: 148 },
      { x: 396, y: 862, w: 132, h: 148 },
    ],
    [
      { x: 60, y: 720, w: 134, h: 142 },
      { x: 194, y: 720, w: 134, h: 142 },
      { x: 328, y: 720, w: 134, h: 142 },
    ],
    [
      { x: 122, y: 606, w: 132, h: 114 },
      { x: 254, y: 606, w: 132, h: 114 },
    ],
  ];

  // ---------- small boxes near the building base (bottom-right) ----------
  const groundBoxes = [
    { x: 1224, y: 870, w: 108, h: 108 },
    { x: 1332, y: 870, w: 108, h: 108 },
    { x: 1224, y: 762, w: 108, h: 108 },
  ];

  // ---------- ambient particles ----------
  const dots = [
    { x: 337, y: 54, r: 3, o: 0.9 },
    { x: 378, y: 96, r: 2, o: 0.6 },
    { x: 905, y: 298, r: 3, o: 0.85 },
    { x: 112, y: 158, r: 2, o: 0.6 },
    { x: trolley.x, y: trolley.y, r: 2.5, o: 0.8 },
    { x: box.flX, y: box.flY, r: 2, o: 0.5 },
    { x: box.frX, y: box.frY, r: 2, o: 0.5 },
    { x: mastX1, y: 320, r: 1.5, o: 0.4 },
    { x: mastX2, y: 560, r: 1.5, o: 0.4 },
    { x: mastX1, y: 800, r: 1.5, o: 0.4 },
    { x: towerA.x, y: towerA.y, r: 2, o: 0.6 },
    { x: towerA.x + towerA.w, y: towerA.y, r: 2, o: 0.5 },
    { x: towerB.x + towerB.w, y: towerB.y, r: 2, o: 0.6 },
    { x: towerA.x + towerA.w, y: mastBottom, r: 2, o: 0.5 },
    { x: 1660, y: 480, r: 1.5, o: 0.35 },
    { x: 1820, y: 220, r: 1.5, o: 0.3 },
    { x: 1750, y: 700, r: 1.5, o: 0.3 },
    { x: 60, y: 1006, r: 2, o: 0.5 },
    { x: 460, y: 862, r: 1.5, o: 0.4 },
    { x: 30, y: 220, r: 1.5, o: 0.3 },
    { x: 660, y: 120, r: 1.5, o: 0.3 },
    { x: 980, y: 460, r: 1.5, o: 0.3 },
    { x: 1140, y: 180, r: 1.5, o: 0.3 },
    { x: 1480, y: 1006, r: 2, o: 0.45 },
    { x: 1900, y: 980, r: 1.5, o: 0.3 },
    { x: 200, y: 1006, r: 1.5, o: 0.4 },
    { x: 1600, y: 614, r: 1.5, o: 0.4 },
  ];

  // faint long blueprint reference lines, scattered for atmosphere
  const blueprintLines = [
    { x1: 80, y1: 0, x2: 80, y2: 420, dash: "2 6" },
    { x1: 1450, y1: 60, x2: 1450, y2: 1080, dash: "2 6" },
    { x1: 0, y1: 980, x2: 1920, y2: 980, dash: "1 0" },
    { x1: 700, y1: 0, x2: 1000, y2: 220, dash: "2 6" },
    { x1: 1600, y1: 0, x2: 1850, y2: 260, dash: "2 6" },
    { x1: 1920, y1: 140, x2: 1550, y2: 140, dash: "2 6" },
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 1920 1080"
      fill="none"
      stroke={STROKE}
      strokeWidth="1"
    >
      {/* Ground line */}
      <line x1="0" y1="1006" x2="1920" y2="1006" />

      {/* Blueprint accent lines */}
      <g strokeWidth="0.5" strokeOpacity="0.5">
        {blueprintLines.map((l, i) => (
          <line key={`bp-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeDasharray={l.dash} />
        ))}
      </g>

      {/* Crane mast */}
      <g>
        {mastLines.map((l, i) => (
          <line key={`mast-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      {/* Crane cab / slewing unit */}
      <rect x={cab.x} y={cab.y} width={cab.w} height={cab.h} />
      <line x1={apex.x} y1={apex.y} x2={cab.x} y2={cab.y} />
      <line x1={apex.x} y1={apex.y} x2={cab.x + cab.w} y2={cab.y} />

      {/* Main jib */}
      <g>
        {mainBoom.lines.map((l, i) => (
          <line key={`jib-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      <line x1={apex.x} y1={apex.y} x2={905} y2={298} strokeWidth="0.6" />
      <line x1={apex.x} y1={apex.y} x2={trolley.x} y2={trolley.y} strokeWidth="0.6" />

      {/* Counter-jib */}
      <g>
        {counterBoom.lines.map((l, i) => (
          <line key={`cjib-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      <line x1={apex.x} y1={apex.y} x2="112" y2="158" strokeWidth="0.6" />
      {counterweights.map((c, i) => (
        <rect key={`cw-${i}`} x={c.x} y={c.y} width={c.w} height={c.h} />
      ))}

      {/* Hoist cable, hook & suspended container */}
      <line x1={trolley.x} y1={trolley.y} x2={trolley.x} y2={hookY} />
      <line x1={trolley.x - 10} y1={hookY} x2={trolley.x + 10} y2={hookY} />
      <line x1={trolley.x} y1={hookY} x2={box.flX} y2={box.flY} />
      <line x1={trolley.x} y1={hookY} x2={box.frX} y2={box.frY} />
      {/* front face */}
      <rect x={box.flX} y={box.flY} width={box.frX - box.flX} height={box.h} />
      {/* top face (depth) */}
      <line x1={box.flX} y1={box.flY} x2={box.flX + box.dx} y2={box.flY + box.dy} />
      <line x1={box.frX} y1={box.flY} x2={box.frX + box.dx} y2={box.flY + box.dy} />
      <line x1={box.flX + box.dx} y1={box.flY + box.dy} x2={box.frX + box.dx} y2={box.flY + box.dy} />
      {/* right side face (depth) */}
      <line x1={box.frX + box.dx} y1={box.flY + box.dy} x2={box.frX + box.dx} y2={box.flY + box.dy + box.h} />
      <line x1={box.frX} y1={box.flY + box.h} x2={box.frX + box.dx} y2={box.flY + box.dy + box.h} />

      {/* Building wireframes */}
      <g>
        <rect x={towerA.x} y={towerA.y} width={towerA.w} height={towerA.h} />
        {facadeA.floors.map((l, i) => (
          <line key={`fa-floor-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth="0.5" />
        ))}
        {facadeA.cols.map((l, i) => (
          <line key={`fa-col-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth="0.4" strokeOpacity="0.6" />
        ))}

        <rect x={towerB.x} y={towerB.y} width={towerB.w} height={towerB.h} />
        {facadeB.floors.map((l, i) => (
          <line key={`fb-floor-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth="0.5" />
        ))}
        {facadeB.cols.map((l, i) => (
          <line key={`fb-col-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth="0.4" strokeOpacity="0.6" />
        ))}

        <rect x={roofUnit.x} y={roofUnit.y} width={roofUnit.w} height={roofUnit.h} strokeWidth="0.6" />
        <line x1={roofUnit.x} y1={roofUnit.y} x2={roofUnit.x + roofUnit.w} y2={roofUnit.y + roofUnit.h} strokeWidth="0.4" />
        <line x1={roofUnit.x + roofUnit.w} y1={roofUnit.y} x2={roofUnit.x} y2={roofUnit.y + roofUnit.h} strokeWidth="0.4" />
      </g>

      {/* Stacked containers / scaffolding (bottom-left) */}
      <g>
        {stackRows.flat().map((b, i) => (
          <rect key={`stack-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} />
        ))}
      </g>

      {/* Boxes near building base */}
      <g>
        {groundBoxes.map((b, i) => (
          <rect key={`gbox-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} />
        ))}
      </g>

      {/* Ambient particles */}
      <g stroke="none">
        {dots.map((d, i) => (
          <circle key={`dot-${i}`} cx={d.x} cy={d.y} r={d.r} fill={STROKE} fillOpacity={d.o} />
        ))}
      </g>
    </svg>
  );
}

