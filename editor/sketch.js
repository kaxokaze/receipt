// STILL EXPLORING — robust p5 version
// Prehistoric human + CRT computer + campfire + moonlit forest.
// Designed specifically for Hack Club Receipt: 384px wide, pure black/white.

export const receipt = {
  height: 1440,
  seed: 67,
};

export function drawReceipt(p) {
  const w = p.width;
  const h = p.height;
  const m = 18;

  p.background(255);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);

  header(p, w, m);
  stars(p, w, 115, 465, m);
  moon(p, 294, 235, 58);
  skyClouds(p, w);
  mountains(p, w);
  distantForest(p, w);
  river(p);
  foregroundForest(p, w);
  mainScene(p);
  dataTrail(p);
  footer(p, w, h, m);
}

function header(p, w, m) {
  p.noStroke();
  p.fill(0);
  p.textStyle(p.BOLD);
  p.textSize(25);
  p.text("STILL EXPLORING", w / 2, 24);
  p.textStyle(p.NORMAL);
  p.textSize(9);
  p.text("NEW WORLDS. SAME CURIOSITY.", w / 2, 58);
  dashed(p, m, 80, w - m, 80);
  p.textSize(7);
  p.text("FIELD REPORT // HUMAN-001 // NIGHT SESSION", w / 2, 91);
}

function stars(p, w, y0, y1, m) {
  p.noStroke();
  for (let i = 0; i < 230; i += 1) {
    const x = p.random(m, w - m);
    const y = p.random(y0, y1);
    const dx = x - 294;
    const dy = y - 235;
    if (dx * dx + dy * dy < 72 * 72) continue;
    const r = p.random();
    p.fill(0);
    if (r < 0.08) {
      p.rect(x - 2, y, 5, 1);
      p.rect(x, y - 2, 1, 5);
    } else if (r < 0.3) {
      p.rect(x, y, 2, 2);
    } else {
      p.rect(x, y, 1, 1);
    }
  }
}

function moon(p, cx, cy, r) {
  p.noStroke();
  p.fill(0);
  p.circle(cx, cy, r * 2 + 8);
  p.fill(255);
  p.circle(cx, cy, r * 2);
  p.fill(0);
  for (let i = 0; i < 46; i += 1) {
    const a = p.random(0, p.TWO_PI);
    const rr = p.sqrt(p.random()) * (r - 7);
    const x = cx + p.cos(a) * rr;
    const y = cy + p.sin(a) * rr;
    const s = p.random(2, 9);
    p.ellipse(x, y, s, s * p.random(0.6, 1.2));
  }
  for (let i = 0; i < 170; i += 1) {
    const a = p.random(0, p.TWO_PI);
    const rr = p.sqrt(p.random()) * (r - 4);
    p.rect(cx + p.cos(a) * rr, cy + p.sin(a) * rr, 1, 1);
  }
}

function skyClouds(p, w) {
  p.noStroke();
  p.fill(255);
  for (let i = 0; i < 34; i += 1) {
    p.ellipse(p.random(-20, w + 20), p.random(350, 425), p.random(8, 38), p.random(2, 9));
  }
  p.fill(0);
  for (let i = 0; i < 20; i += 1) {
    p.ellipse(p.random(-10, w + 10), p.random(415, 452), p.random(8, 32), p.random(2, 6));
  }
}

function mountains(p, w) {
  p.noStroke();
  p.fill(0);
  p.beginShape();
  p.vertex(0, 650);
  p.vertex(0, 560);
  for (let x = 0; x <= w; x += 6) {
    p.vertex(x, 525 - p.noise(x * 0.014, 5) * 105);
  }
  p.vertex(w, 560);
  p.vertex(w, 650);
  p.endShape(p.CLOSE);

  p.fill(255);
  p.beginShape();
  p.vertex(0, 600);
  p.vertex(50, 535);
  p.vertex(73, 560);
  p.vertex(118, 500);
  p.vertex(152, 548);
  p.vertex(210, 470);
  p.vertex(244, 530);
  p.vertex(292, 488);
  p.vertex(326, 535);
  p.vertex(w, 575);
  p.vertex(w, 620);
  p.vertex(0, 620);
  p.endShape(p.CLOSE);

  p.fill(0);
  p.beginShape();
  p.vertex(0, 680);
  p.vertex(0, 625);
  p.vertex(52, 575);
  p.vertex(92, 611);
  p.vertex(142, 528);
  p.vertex(180, 572);
  p.vertex(222, 500);
  p.vertex(266, 570);
  p.vertex(305, 530);
  p.vertex(354, 595);
  p.vertex(w, 575);
  p.vertex(w, 680);
  p.endShape(p.CLOSE);

  p.fill(255);
  p.triangle(202, 531, 222, 500, 240, 529);
  p.triangle(126, 552, 142, 528, 157, 551);
  p.triangle(291, 556, 305, 530, 321, 554);

  p.stroke(255);
  p.strokeWeight(1);
  for (let i = 0; i < 130; i += 1) {
    const x = p.random(5, w - 5);
    const y = p.random(552, 665);
    p.line(x, y, x - p.random(3, 10), y + p.random(3, 11));
  }
}

function pine(p, x, base, width, height, whiteCuts) {
  p.noStroke();
  p.fill(0);
  p.rect(x - 2, base - height * 0.25, 4, height * 0.25);
  const layers = whiteCuts ? 7 : 5;
  for (let i = 0; i < layers; i += 1) {
    const t = i / (layers - 1);
    const yy = base - height * (0.15 + t * 0.76);
    const half = width * (0.17 + t * 0.8);
    p.triangle(x, yy - height * 0.18, x - half, yy + height * 0.12, x + half, yy + height * 0.12);
  }
  if (whiteCuts) {
    p.stroke(255);
    p.strokeWeight(1);
    for (let i = 0; i < 12; i += 1) {
      const yy = base - p.random(20, height * 0.78);
      const dx = p.random(3, width * 0.35);
      p.line(x - dx, yy, x + dx, yy + p.random(2, 5));
    }
  }
}

function distantForest(p, w) {
  for (let x = -4; x < w + 10; x += 9) {
    pine(p, x, p.random(645, 715), p.random(10, 18), p.random(60, 110), false);
  }
  for (let i = 0; i < 35; i += 1) {
    pine(p, p.random(-10, w + 10), p.random(720, 850), p.random(18, 36), p.random(100, 190), true);
  }
}

function river(p) {
  p.noStroke();
  p.fill(255);
  p.beginShape();
  p.vertex(171, 650);
  p.vertex(221, 650);
  p.vertex(220, 755);
  p.vertex(231, 835);
  p.vertex(211, 915);
  p.vertex(188, 915);
  p.vertex(170, 835);
  p.vertex(180, 755);
  p.endShape(p.CLOSE);

  p.beginShape();
  p.vertex(188, 875);
  p.vertex(214, 875);
  p.vertex(300, 1110);
  p.vertex(325, 1370);
  p.vertex(120, 1370);
  p.vertex(145, 1110);
  p.endShape(p.CLOSE);

  p.stroke(0);
  p.strokeWeight(1);
  for (let y = 880; y < 1365; y += 12) {
    const center = 200 + p.noise(y * 0.012, 7) * 45;
    const half = p.map(y, 880, 1365, 14, 88);
    const gap = p.random(5, 18);
    p.line(center - half, y, center - gap, y);
    p.line(center + gap, y, center + half, y);
  }
}

function foregroundForest(p, w) {
  p.noStroke();
  p.fill(0);
  p.rect(-6, 450, 25, 780);
  p.rect(w - 19, 500, 25, 730);

  p.stroke(255);
  p.strokeWeight(1);
  for (let i = 0; i < 35; i += 1) {
    const yy = p.random(470, 1210);
    p.line(3, yy, 14, yy + p.random(-6, 7));
    p.line(w - 15, yy, w - 4, yy + p.random(-7, 6));
  }
}

function mainScene(p) {
  p.noStroke();
  p.fill(255);
  p.ellipse(165, 1050, 285, 105);

  spear(p, 70, 1120, 52, 820);
  human(p, 105, 1087);
  computer(p, 249, 980);
  fire(p, 191, 1120);
  logs(p, 191, 1150);
  wolf(p, 48, 1190);
  labels(p, 314, 1134);
  sparks(p, 191, 1110);
}

function spear(p, x0, y0, x1, y1) {
  p.stroke(0);
  p.strokeWeight(4);
  p.line(x0, y0, x1, y1);
  p.strokeWeight(2);
  p.line(x1, y1, x1 - 8, y1 + 18);
  p.line(x1, y1, x1 + 8, y1 + 18);
}

function human(p, x, y) {
  p.noStroke();
  p.fill(0);
  p.ellipse(x - 10, y - 154, 56, 49);
  p.triangle(x - 39, y - 155, x - 10, y - 184, x + 6, y - 150);
  p.ellipse(x + 14, y - 145, 31, 38);
  p.triangle(x + 25, y - 144, x + 43, y - 136, x + 26, y - 130);
  p.rect(x, y - 130, 23, 30);

  p.push();
  p.translate(x, y - 72);
  p.rotate(-0.13);
  p.ellipse(0, 0, 72, 116);
  p.pop();

  p.push();
  p.translate(x + 4, y - 27);
  p.rotate(0.35);
  p.ellipse(0, 0, 34, 112);
  p.pop();

  p.push();
  p.translate(x + 42, y - 25);
  p.rotate(-0.92);
  p.ellipse(0, 0, 32, 113);
  p.pop();

  p.ellipse(x + 4, y + 14, 44, 13);
  p.ellipse(x + 61, y + 6, 41, 13);

  p.push();
  p.translate(x + 21, y - 89);
  p.rotate(-0.22);
  p.ellipse(0, 0, 18, 82);
  p.pop();

  p.push();
  p.translate(x + 35, y - 83);
  p.rotate(-0.48);
  p.ellipse(0, 0, 16, 73);
  p.pop();

  p.ellipse(x + 52, y - 114, 18, 12);
  p.ellipse(x + 61, y - 104, 15, 10);

  p.stroke(255);
  p.strokeWeight(1);
  for (let i = 0; i < 48; i += 1) {
    const sx = x - 30 + p.random(0, 64);
    const sy = y - 124 + p.random(12, 112);
    p.line(sx, sy, sx + p.random(-4, 4), sy + p.random(3, 8));
  }
  p.line(x + 13, y - 152, x + 30, y - 151);
  p.point(x + 31, y - 151);
}

function computer(p, cx, cy) {
  p.noStroke();
  p.fill(0);
  p.rect(cx - 73, cy + 59, 133, 14, 3);
  p.rect(cx - 62, cy + 73, 9, 70);
  p.rect(cx + 43, cy + 73, 9, 70);

  p.rect(cx - 69, cy - 80, 130, 101, 9);
  p.fill(255);
  p.rect(cx - 55, cy - 66, 102, 74, 4);
  p.fill(0);
  p.rect(cx - 47, cy - 58, 86, 58, 3);

  p.fill(255);
  p.textAlign(p.LEFT, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(8);
  p.text("NEW WORLDS", cx - 39, cy - 49);
  p.text("SAME CURIOSITY", cx - 39, cy - 37);
  p.text("> SEARCH", cx - 39, cy - 24);
  p.text(">_", cx - 39, cy - 11);

  p.stroke(255);
  p.strokeWeight(1);
  for (let yy = cy - 51; yy < cy - 4; yy += 5) {
    p.line(cx - 44, yy, cx + 36, yy);
  }

  p.noStroke();
  p.fill(0);
  p.rect(cx - 10, cy + 21, 20, 18);
  p.rect(cx - 30, cy + 37, 60, 7);
  p.rect(cx - 47, cy + 46, 86, 25, 3);

  p.fill(255);
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 11; col += 1) {
      p.rect(cx - 41 + col * 7, cy + 51 + row * 6, col === 10 ? 5 : 4, 3);
    }
  }

  p.stroke(0);
  p.strokeWeight(2);
  p.line(cx + 52, cy + 48, cx + 82, cy + 80);
  p.line(cx + 82, cy + 80, cx + 72, cy + 122);

  p.noStroke();
  p.fill(0);
  p.rect(cx + 69, cy + 55, 16, 17, 2);
  p.stroke(0);
  p.strokeWeight(2);
  p.arc(cx + 85, cy + 63, 10, 11, -p.HALF_PI, p.HALF_PI);
}

function fire(p, cx, gy) {
  p.noStroke();
  p.fill(0);
  p.beginShape();
  p.vertex(cx, gy + 24);
  p.vertex(cx - 42, gy - 8);
  p.vertex(cx - 27, gy - 51);
  p.vertex(cx - 8, gy - 104);
  p.vertex(cx + 5, gy - 57);
  p.vertex(cx + 19, gy - 76);
  p.vertex(cx + 40, gy - 26);
  p.vertex(cx + 45, gy + 13);
  p.endShape(p.CLOSE);

  p.fill(255);
  p.beginShape();
  p.vertex(cx + 1, gy + 12);
  p.vertex(cx - 15, gy - 9);
  p.vertex(cx - 4, gy - 60);
  p.vertex(cx + 7, gy - 28);
  p.vertex(cx + 18, gy - 53);
  p.vertex(cx + 24, gy - 14);
  p.endShape(p.CLOSE);

  p.fill(0);
  p.beginShape();
  p.vertex(cx + 8, gy + 10);
  p.vertex(cx + 2, gy - 7);
  p.vertex(cx + 10, gy - 33);
  p.vertex(cx + 18, gy - 7);
  p.endShape(p.CLOSE);
}

function logs(p, cx, y) {
  p.stroke(0);
  p.strokeWeight(8);
  p.line(cx - 46, y, cx + 39, y + 13);
  p.line(cx + 46, y, cx - 36, y + 13);
  p.strokeWeight(2);
  p.circle(cx - 46, y, 13);
  p.circle(cx + 46, y + 1, 13);
}

function wolf(p, x, y) {
  p.noStroke();
  p.fill(0);
  p.ellipse(x + 31, y - 19, 59, 29);
  p.ellipse(x + 2, y - 31, 31, 31);
  p.triangle(x - 10, y - 37, x - 6, y - 58, x + 2, y - 34);
  p.triangle(x + 5, y - 38, x + 16, y - 58, x + 17, y - 34);
  p.triangle(x - 9, y - 31, x - 29, y - 23, x - 8, y - 20);
  p.rect(x + 18, y - 8, 8, 29);
  p.rect(x + 48, y - 7, 8, 29);
  p.stroke(0);
  p.strokeWeight(8);
  p.noFill();
  p.bezier(x + 53, y - 27, x + 77, y - 49, x + 78, y - 3, x + 92, y - 5);
  p.noStroke();
  p.fill(255);
  p.circle(x - 8, y - 32, 2);
}

function labels(p, x, y) {
  p.noStroke();
  p.fill(0);
  p.rect(x - 31, y - 2, 56, 49);
  p.fill(255);
  p.textAlign(p.LEFT, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(6);
  p.text("EXPLORE", x - 25, y + 3);
  p.text("LEARN", x - 20, y + 15);
  p.text("ADAPT", x - 20, y + 27);
  p.text("BELONG", x - 22, y + 39);
}

function sparks(p, cx, cy) {
  p.noStroke();
  p.fill(0);
  for (let i = 0; i < 60; i += 1) {
    const x = cx + p.random(-65, 65);
    const y = cy - p.random(70, 180);
    if (p.random() < 0.72) p.rect(x, y, 1, p.random(1, 3));
  }
}

function dataTrail(p) {
  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);
  for (let row = 0; row < 8; row += 1) {
    const y = 1210 + row * 16;
    p.beginShape();
    for (let x = 32; x <= 352; x += 8) {
      const yy = y + (p.noise(x * 0.02, row * 0.45, 42) - 0.5) * 15;
      p.vertex(x, yy);
    }
    p.endShape();
  }
  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(8);
  p.text("> SEARCHING FOR NEW WORLDS...", 192, 1326);
}

function footer(p, w, h, m) {
  const y = h - 77;
  dashed(p, m, y, w - m, y);
  p.noStroke();
  p.fill(0);
  p.textAlign(p.LEFT, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(8);
  p.text("DIFFERENT TIMES.", m, y + 11);
  p.text("SAME HUMANS.", m, y + 24);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("// 001", w - m, y + 11);
  p.text("HUMAN.EXE", w - m, y + 24);
  fakeBarcode(p, w / 2, y + 43);
}

function fakeBarcode(p, cx, y) {
  p.noStroke();
  p.fill(0);
  for (let i = 0; i < 64; i += 1) {
    const n = p.random();
    const bw = n < 0.58 ? 2 : n < 0.82 ? 3 : 1;
    const bh = n < 0.15 ? 11 : 18;
    p.rect(cx - 96 + i * 3, y, bw, bh);
  }
}

function dashed(p, x1, y1, x2, y2) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += 9) {
    p.line(x, y1, Math.min(x + 5, x2), y2);
  }
}
