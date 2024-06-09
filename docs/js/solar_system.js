// solar_system.js

let sun;
let planets = [];
let au; // Astronomical Unit

function setup() {
  let canvas = createCanvas(400, 380);
  canvas.parent('canvas-container');
  sun = new Planet(0, 0, 30, color(255, 204, 0)); // Sun at the center, with a larger radius

  // Define 1 AU as a smaller scale factor to fit our smaller canvas
  au = 20;

  // Create planets with realistic distances and sizes, ensuring no collisions
  let planetData = [
    { distance: 0.3, radius: 8, color: color(100, 200, 255), speed: 0.05 },  // Mercury
    { distance: 0.5, radius: 12, color: color(150, 100, 255), speed: 0.03 },  // Venus
    { distance: 1.0, radius: 14, color: color(100, 150, 100), speed: 0.02 },  // Earth
    { distance: 1.5, radius: 10, color: color(255, 100, 100), speed: 0.018 }, // Mars
  ];

  let lastDistance = sun.r;
  for (let data of planetData) {
    let distance = (data.distance * au) + lastDistance + data.radius;
    planets.push(new Planet(distance, 0, data.radius, data.color, data.speed));
    lastDistance = distance + data.radius;
  }
}

function draw() {
  background(255); // Change background color to white
  translate(width / 2, height / 2); // Center the canvas
  
  // Draw the orbits first
  for (let planet of planets) {
    planet.drawOrbit();
  }

  // Draw the sun and planets on top of the orbits
  sun.display();
  for (let planet of planets) {
    planet.update();
    planet.display();
  }
}

class Planet {
  constructor(x, y, r, c, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.angle = 0;
    this.speed = speed;
    this.distance = dist(0, 0, this.x, this.y);
  }

  update() {
    this.angle += this.speed;
    this.x = cos(this.angle) * this.distance;
    this.y = sin(this.angle) * this.distance;
  }

  display() {
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  drawOrbit() {
    noFill();
    stroke(200);
    ellipse(0, 0, this.distance * 2);
  }
}
