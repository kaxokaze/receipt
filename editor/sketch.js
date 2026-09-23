  // SPIDER WEB // RECEIPT EDITION
  // 384px wide, monochrome, seeded, no external assets.

  export const receipt = {
    height: 1400,
    seed: 67,
  };

  const CX = 192;
  const CY = 690;

  export function drawReceipt(p) {
    const w = p.width;
    const h = p.height;

    p.background(0);
    p.strokeCap(p.SQUARE);
    p.strokeJoin(p.MITER);

    drawBackgroundTexture(p, w, h);
    drawWeb(p);
    drawSpider(p);
    drawNodes(p);
    drawFooter(p, w, h);
  }

  // ---------------------------------------------------------
  // BACKGROUND TEXTURE
  // ---------------------------------------------------------

  function drawBackgroundTexture(p, w, h) {
    p.noFill();
    p.stroke(255);
    p.strokeWeight(0.35);

    const size = 9;

    for (let row = -2; row < h / 14 + 2; row++) {
      for (let col = -2; col < w / 15 + 2; col++) {
        const x =
          col * size * 1.72 +
          ((row & 1) ? size * 0.86 : 0);

        const y =
          row * size * 1.5;

        const n =
          p.noise(
            col * 0.17,
            row * 0.19,
            4
          );

        if (n > 0.70) {
          hexagon(
            p,
            x,
            y,
            size * 0.34
          );
        }
      }
    }

    p.noStroke();
    p.fill(255);

    for (let i = 0; i < 420; i++) {
      const x = p.random(0, w);
      const y = p.random(0, h);

      if (p.random() < 0.58) {
        p.rect(
          x,
          y,
          1,
          1
        );
      }
    }
  }

  function hexagon(
    p,
    cx,
    cy,
    r
  ) {
    p.beginShape();

    for (let i = 0; i < 6; i++) {
      const a =
        p.TWO_PI * i / 6 +
        p.PI / 6;

      p.vertex(
        cx + p.cos(a) * r,
        cy + p.sin(a) * r
      );
    }

    p.endShape(p.CLOSE);
  }

  // ---------------------------------------------------------
  // WEB
  // ---------------------------------------------------------

  function drawWeb(p) {
    const spokeCount = 12;

    const rings = [
      90,
      140,
      195,
      255,
      325,
      405,
      495,
      595,
      705
    ];

    for (let i = 0; i < spokeCount; i++) {
      const a =
        -p.HALF_PI +
        p.TWO_PI * i / spokeCount;

      drawRadialWeb(
        p,
        a
      );
    }

    for (let i = 0; i < rings.length; i++) {
      drawWebRing(
        p,
        rings[i],
        i
      );
    }

    drawOuterFrame(p);
  }

  function drawRadialWeb(
    p,
    angle
  ) {
    const points = [];

    for (
      let r = 30;
      r <= 820;
      r += 12
    ) {
      const wobble =
        p.noise(
          r * 0.012,
          angle * 3,
          10
        ) * 10 - 5;

      const rr =
        r + wobble;

      points.push({
        x:
          CX +
          p.cos(angle) *
            rr,

        y:
          CY +
          p.sin(angle) *
            rr *
            0.90
      });
    }

    p.noFill();

    // Black outline.
    p.stroke(0);
    p.strokeWeight(4.2);

    drawPath(
      p,
      points
    );

    // White/silver web.
    p.stroke(255);
    p.strokeWeight(2.1);

    drawPath(
      p,
      points
    );

    // Dark center bevel.
    p.stroke(0);
    p.strokeWeight(0.65);

    drawPath(
      p,
      points
    );
  }

  function drawWebRing(
    p,
    radius,
    index
  ) {
    const points = [];
    const samples = 120;

    for (
      let i = 0;
      i <= samples;
      i++
    ) {
      const t =
        p.TWO_PI *
        i /
        samples;

      const wobble =
        p.noise(
          radius * 0.015,
          t * 1.15,
          index * 4
        ) * 13 -
        6.5;

      const rr =
        radius +
        wobble;

      points.push({
        x:
          CX +
          p.cos(t) *
            rr,

        y:
          CY +
          p.sin(t) *
            rr *
            0.90
      });
    }

    p.noFill();

    // Black outline.
    p.stroke(0);

    p.strokeWeight(
      index < 2
        ? 4.5
        : 3.5
    );

    drawPath(
      p,
      points
    );

    // White/silver thread.
    p.stroke(255);

    p.strokeWeight(
      index < 2
        ? 2.3
        : 1.7
    );

    drawPath(
      p,
      points
    );

    // Dark bevel.
    p.stroke(0);
    p.strokeWeight(0.55);

    drawPath(
      p,
      points
    );
  }

  // IMPORTANT:
  // Uses only vertex(), because the Receipt editor
  // does not provide curveVertex().

  function drawPath(
    p,
    points
  ) {
    if (points.length < 2) {
      return;
    }

    p.beginShape();

    for (
      let i = 0;
      i < points.length;
      i++
    ) {
      p.vertex(
        points[i].x,
        points[i].y
      );
    }

    p.endShape();
  }

  // ---------------------------------------------------------
  // OUTER FRAME
  // ---------------------------------------------------------

  function drawOuterFrame(p) {
    p.noFill();

    const lines = [
      [-30, 35, 110, 505],
      [414, 35, 274, 505],
      [-20, 320, 115, 620],
      [404, 320, 269, 620],
      [-15, 760, 115, 850],
      [399, 760, 269, 850],
      [20, 1200, 145, 875],
      [364, 1200, 239, 875]
    ];

    // Black under-stroke.
    p.stroke(0);
    p.strokeWeight(5);

    for (const seg of lines) {
      drawCurvedSegment(
        p,
        seg[0],
        seg[1],
        seg[2],
        seg[3],
        24
      );
    }

    // White/silver layer.
    p.stroke(255);
    p.strokeWeight(2);

    for (const seg of lines) {
      drawCurvedSegment(
        p,
        seg[0],
        seg[1],
        seg[2],
        seg[3],
        24
      );
    }
  }

  function drawCurvedSegment(
    p,
    x1,
    y1,
    x2,
    y2,
    bend
  ) {
    const mx =
      (x1 + x2) / 2;

    const my =
      (y1 + y2) / 2;

    const dx =
      x2 - x1;

    const dy =
      y2 - y1;

    const len =
      Math.sqrt(
        dx * dx +
        dy * dy
      ) || 1;

    const nx =
      -dy / len;

    const ny =
      dx / len;

    p.beginShape();

    for (
      let i = 0;
      i <= 18;
      i++
    ) {
      const t =
        i / 18;

      const s =
        t * t *
        (3 - 2 * t);

      const bx =
        x1 +
        (x2 - x1) *
          s;

      const by =
        y1 +
        (y2 - y1) *
          s;

      const curve =
        Math.sin(
          Math.PI * t
        ) *
        bend;

      p.vertex(
        bx + nx * curve,
        by + ny * curve
      );
    }

    p.endShape();
  }

  // ---------------------------------------------------------
  // SPIDER
  // ---------------------------------------------------------

  function drawSpider(p) {
    // Black silhouette/outline.
    p.noStroke();
    p.fill(0);

    drawSpiderBody(
      p,
      1.18
    );

    const legs = [
      [
        210, 612,
        246, 555,
        284, 500,
        319, 430
      ],

      [
        215, 632,
        270, 595,
        327, 552,
        365, 492
      ],

      [
        220, 660,
        281, 655,
        337, 635,
        382, 607
      ],

      [
        218, 690,
        271, 718,
        326, 772,
        361, 836
      ],

      [
        212, 723,
        250, 778,
        287, 855,
        307, 955
      ],

      [
        204, 748,
        225, 819,
        239, 922,
        236, 1018
      ]
    ];

    for (const leg of legs) {
      drawLeg(
        p,
        leg,
        1.0
      );

      drawLeg(
        p,
        mirrorLeg(leg),
        1.0
      );
    }

    // Main metallic body.
    p.fill(255);

    drawSpiderBody(
      p,
      1.0
    );

    // White legs.
    for (const leg of legs) {
      drawLegWhite(
        p,
        leg
      );

      drawLegWhite(
        p,
        mirrorLeg(leg)
      );
    }

    drawSpiderDetails(p);
  }

  function drawSpiderBody(
    p,
    scale
  ) {
    p.push();

    p.translate(
      CX,
      CY
    );

    p.scale(scale);

    // Head / thorax.
    p.beginShape();

    p.vertex(
      0,
      -103
    );

    p.vertex(
      -24,
      -72
    );

    p.vertex(
      -27,
      -28
    );

    p.vertex(
      -16,
      12
    );

    p.vertex(
      16,
      12
    );

    p.vertex(
      27,
      -28
    );

    p.vertex(
      24,
      -72
    );

    p.endShape(
      p.CLOSE
    );

    // Horn-like top detail.
    p.beginShape();

    p.vertex(
      -15,
      -84
    );

    p.vertex(
      -22,
      -122
    );

    p.vertex(
      -9,
      -105
    );

    p.vertex(
      0,
      -78
    );

    p.vertex(
      9,
      -105
    );

    p.vertex(
      22,
      -122
    );

    p.vertex(
      15,
      -84
    );

    p.endShape(
      p.CLOSE
    );

    // Abdomen.
    p.beginShape();

    p.vertex(
      -22,
      2
    );

    p.vertex(
      -34,
      52
    );

    p.vertex(
      -28,
      120
    );

    p.vertex(
      -14,
      184
    );

    p.vertex(
      0,
      232
    );

    p.vertex(
      14,
      184
    );

    p.vertex(
      28,
      120
    );

    p.vertex(
      34,
      52
    );

    p.vertex(
      22,
      2
    );

    p.endShape(
      p.CLOSE
    );

    p.pop();
  }

  // ---------------------------------------------------------
  // LEGS
  // ---------------------------------------------------------

  function drawLeg(
    p,
    pts
  ) {
    drawSegment(
      p,
      pts[0],
      pts[1],
      pts[2],
      pts[3],
      22,
      17
    );

    drawSegment(
      p,
      pts[2],
      pts[3],
      pts[4],
      pts[5],
      18,
      12
    );

    drawSegment(
      p,
      pts[4],
      pts[5],
      pts[6],
      pts[7],
      13,
      7
    );
  }

  function drawLegWhite(
    p,
    pts
  ) {
    p.noStroke();
    p.fill(255);

    drawSegment(
      p,
      pts[0],
      pts[1],
      pts[2],
      pts[3],
      15,
      11
    );

    drawSegment(
      p,
      pts[2],
      pts[3],
      pts[4],
      pts[5],
      12,
      8
    );

    drawSegment(
      p,
      pts[4],
      pts[5],
      pts[6],
      pts[7],
      8,
      3.5
    );

    // Black bevel center line.
    p.stroke(0);
    p.strokeWeight(1.4);

    p.line(
      pts[0],
      pts[1],
      pts[2],
      pts[3]
    );

    p.line(
      pts[2],
      pts[3],
      pts[4],
      pts[5]
    );

    p.line(
      pts[4],
      pts[5],
      pts[6],
      pts[7]
    );
  }

  function drawSegment(
    p,
    x1,
    y1,
    x2,
    y2,
    wa,
    wb
  ) {
    const dx =
      x2 - x1;

    const dy =
      y2 - y1;

    const len =
      Math.sqrt(
        dx * dx +
        dy * dy
      ) || 1;

    const nx =
      -dy / len;

    const ny =
      dx / len;

    p.beginShape();

    p.vertex(
      x1 + nx * wa * 0.5,
      y1 + ny * wa * 0.5
    );

    p.vertex(
      x2 + nx * wb * 0.5,
      y2 + ny * wb * 0.5
    );

    p.vertex(
      x2 - nx * wb * 0.5,
      y2 - ny * wb * 0.5
    );

    p.vertex(
      x1 - nx * wa * 0.5,
      y1 - ny * wa * 0.5
    );

    p.endShape(
      p.CLOSE
    );
  }

  function mirrorLeg(leg) {
    const out = [];

    for (
      let i = 0;
      i < leg.length;
      i += 2
    ) {
      out.push(
        CX * 2 -
          leg[i]
      );

      out.push(
        leg[i + 1]
      );
    }

    return out;
  }

  // ---------------------------------------------------------
  // SPIDER DETAILS
  // ---------------------------------------------------------

  function drawSpiderDetails(p) {
    p.stroke(0);
    p.strokeWeight(3);
    p.noFill();

    // Main spine.
    p.line(
      CX,
      CY - 75,
      CX,
      CY + 220
    );

    // Upper separation.
    p.line(
      CX - 18,
      CY - 18,
      CX + 18,
      CY - 18
    );

    // Abdomen cuts.
    p.line(
      CX - 21,
      CY + 48,
      CX - 6,
      CY + 92
    );

    p.line(
      CX + 21,
      CY + 48,
      CX + 6,
      CY + 92
    );

    p.line(
      CX - 23,
      CY + 103,
      CX - 7,
      CY + 144
    );

    p.line(
      CX + 23,
      CY + 103,
      CX + 7,
      CY + 144
    );

    // Eyes/details.
    p.fill(0);
    p.noStroke();

    p.ellipse(
      CX - 8,
      CY - 69,
      5,
      7
    );

    p.ellipse(
      CX + 8,
      CY - 69,
      5,
      7
    );

    // Metallic scratches.
    p.stroke(0);
    p.strokeWeight(0.8);

    for (let i = 0; i < 50; i++) {
      const x =
        CX +
        p.random(-24, 24);

      const y =
        CY +
        p.random(-108, 215);

      p.line(
        x,
        y,
        x + p.random(-4, 4),
        y + p.random(2, 8)
      );
    }
  }

  // ---------------------------------------------------------
  // WEB NODES
  // ---------------------------------------------------------

  function drawNodes(p) {
    const radii = [
      140,
      255,
      405,
      595
    ];

    const count = 12;

    for (const r of radii) {
      for (
        let i = 0;
        i < count;
        i++
      ) {
        const a =
          -p.HALF_PI +
          p.TWO_PI *
            i /
            count;

        const x =
          CX +
          p.cos(a) *
            r;

        const y =
          CY +
          p.sin(a) *
            r *
            0.90;

        p.noStroke();
        p.fill(255);

        p.circle(
          x,
          y,
          6
        );

        p.fill(0);

        p.circle(
          x,
          y,
          2
        );
      }
    }
  }

  // ---------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------

  function drawFooter(p, w, h) {
  const y = h - 92;

  // Separator
  p.stroke(255);
  p.strokeWeight(1);

  p.line(
    22,
    y,
    w - 22,
    y
  );

  // Text
  p.noStroke();
  p.fill(255);

  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);

  p.textSize(7);

  p.text(
    "MADE WITH",
    w / 2,
    y + 8
  );

  // Simple heart made only from circles + triangle
  const hx = w / 2;
  const hy = y + 25;

  p.fill(255);
  p.noStroke();

  p.circle(
    hx - 4,
    hy - 2,
    8
  );

  p.circle(
    hx + 4,
    hy - 2,
    8
  );

  p.triangle(
    hx - 8,
    hy,
    hx + 8,
    hy,
    hx,
    hy + 9
  );

  // BY KAXOKAZE
  p.textSize(7);

  p.text(
    "BY KAXOKAZE",
    w / 2,
    y + 36
  );

  // Large GitHub URL
  p.textSize(10);

  p.text(
    "GITHUB.COM/KAXOKAZE",
    w / 2,
    y + 54
  );
}