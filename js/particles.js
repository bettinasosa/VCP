// Particles, 29/7/2019, Bettina Sosa
// Derived from https://github.com/nebbles/js-sandbox/blob/master/p5js-haze/main.js
var canvas;
var dots = [];

function setup() {
  let height = calcCanvasHeight();
  canvas = createCanvas(windowWidth, height);
  canvas.elt.style.position = "absolute";
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.style("z-index", "-1");

  for (var i = 0; i < 40; i++) {
    let ra = random(15, 35); // radius
    let x = random(0 + ra, windowWidth - ra);
    let y = random(0 + ra, windowHeight - ra);
    let a = random(100, 220);
    var r = random([
      [3, 218, 196],
      [250, 43, 28],
      [255, 104, 72],
      [33, 235, 80],
      [125, 59, 255],
      [249, 207, 0]
    ]);
    var c = color(r[0], r[1], r[2], a);

    dots.push(new Circle(x, y, ra, c));
  }
}

function calcCanvasHeight() {
  let header = document.getElementsByClassName("header")[0];
  let margin = window
    .getComputedStyle(document.body)
    .getPropertyValue("margin");
  margin = margin.substring(0, margin.length - 2);
  return Number(header.offsetHeight) + Number(margin);
}

function windowResized() {
  let height = calcCanvasHeight();
  resizeCanvas(windowWidth, height);
}

function draw() {
  background("rgba(255, 255, 255)");

  mouseXpc = mouseX / windowWidth;
  mouseYpc = mouseY / height;

  mouseXpc = map(mouseX, 0, width, -0.3, 0.5);
  mouseYpc = map(mouseY, 0, height, -0.3, 0.5);

  for (dot of dots) {
    // dot.applyForce(); // add this for extra vectors to apply
    dot.update();
    dot.render();
  }
}

class Circle {
  constructor(x, y, radius, colour) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.pScale = 8;
    this.colour = colour;

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.drift = createVector(random(-1, 1), random(-1, 1));
  }

  applyForce(vector) {
    if (vector instanceof p5.Vector) {
      this.acc.add(vector);
    } else {
      console.warn("applyForce must take a p5.Vector as argument.");
    }
  }

  update() {
    // Update acceleration
    this.acc.set(0);
    this.acc.add(this.drift);

    // Update velocity
    this.vel.add(this.acc);
    this.vel.limit(0.1);

    // Update position
    this.pos.add(this.vel);
    // Wrap position at window edges
    if (this.pos.x > width + this.radius) {
      this.pos.x = 0 - this.radius;
    }
    if (this.pos.x < 0 - this.radius) {
      this.pos.x = width + this.radius;
    }
    if (this.pos.y > height + this.radius) {
      this.pos.y = 0 - this.radius;
    }
    if (this.pos.y < 0 - this.radius) {
      this.pos.y = height + this.radius;
    }
  }

  render() {
    fill(this.colour);
    noStroke();
    ellipse(
      this.pos.x + this.pScale * mouseXpc,
      this.pos.y + this.pScale * mouseYpc,
      this.radius,
      this.radius
    );
  }
}
