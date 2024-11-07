let shapes = [];
let sunRadius = 300; // Radius of the sun's movement
let sunAngle = 0; // Current angle of the sun
let sunCenterX, sunCenterY; // Center of semicircle
let waveAmplitude = 4; // Amplitude of Line ripple
let waveFrequency = 0.001; // Frequency of line ripple
let windowLights = [false, false, false, false, false]; // Window light status
let currentWindow = 0; // Currently lit window


function setup() {
  createCanvas(800, 600); // Creat canvas
  


  // Setting the center of the solar arc motion
  sunCenterX = width / 2;
  sunCenterY = height / 2;

  // Creating Sky
  for (let y = 0; y < height / 2; y += 10) {
    let skyColor = lerpColor(color(25, 60, 150), color(255, 190, 120), y / (height / 2));
    shapes.push(new BauhausRect(0, y, width, 10, skyColor));
  }

  // Add sun
   shapes.push(new BauhausCircle(sunCenterX, sunCenterY - sunRadius, 80, color(255, 200, 50, 180)));

  // Creating water surfaces
  for (let y = height / 2; y < height; y += 10) {
    let waterColor = lerpColor(color(255, 150, 100), color(0, 100, 150), (y - height / 2) / (height / 2));
    shapes.push(new BauhausRect(0, y, width, 10, waterColor));
  }

  // Adding water lines with ripple effect
  for (let i = 0; i < width; i += 15) {
    let y = height / 2 + 50; // Water surface position
    shapes.push(new BauhausLine(i, y, 100, 0, color(252, 147, 55, 80), i));
  }

 
  // Add cloud
  shapes.push(new BauhausCloud(100, 70, 90, 200)); // The first cloud
  shapes.push(new BauhausCloud(300, 50, 120, 230)); // The second cloud
  shapes.push(new BauhausCloud(500, 100, 100, 180)); // The third cloud
  shapes.push(new BauhausCloud(650, 80, 130, 200)); // The fourth cloud
  shapes.push(new BauhausCloud(750, 120, 85, 220)); // The fifth cloud
  

  // Add building
  shapes.push(new BauhausRect(220, 80, 30, 100, color(0, 0, 0))); //left part
  shapes.push(new BauhausRect(210, 120, 50, 80, color(20, 10, 60))); // middle part
  shapes.push(new BauhausRect(190, 180, 300, 120, color(50, 30, 80))); // right part

  //  Add the reflection of the building in the water
  shapes.push(new BauhausRect(220, 300, 80, 200, color(0, 0, 0, 80))); // top reflection, transparent black
  shapes.push(new BauhausRect(230, 450, 50, 80, color(20, 10, 60, 80))); // middle reflection, transparent purple
  shapes.push(new BauhausRect(250, 500, 30, 60, color(150, 30, 80, 80))); // bottom reflection, transparent red


  // Control the update of the sun's position every 50 milliseconds.
  setInterval(updateSunPosition, 50);

  // Switching to the next window every 500 milliseconds.
  setInterval(updateWindowLights, 500);
}
  // Functions for sun position update
  function updateSunPosition() {
  let sun = shapes.find(shape => shape instanceof BauhausCircle);
  sunAngle = (sunAngle + 0.01) % PI; // Increase the angle to control the sun's movement along a semicircular trajectory
  sun.x = sunCenterX + sunRadius * cos(sunAngle);  
  sun.y = sunCenterY - sunRadius * sin(sunAngle); 
}

// Currently lit window
function updateWindowLights() {
  // Reset the light status of all windows to false
  // Only set the current window to be lit
  windowLights[currentWindow] = true;
  currentWindow = (currentWindow + 1);
  if(currentWindow==6)
  {
    windowLights.fill(false);
    currentWindow=0
  }
}

// draw() 
function draw() {
  background(255);

  // Draw all shapes
  for (let shape of shapes) {
    shape.draw();
    if (shape instanceof BauhausCloud) {
      shape.move(); // move cloud
    }
  }

  // Drawing a building's windows and applying a light-up effect
  let startX = 200; 
  let startY = 200; 
  let windowWidth = 20;
  let windowHeight = 30;
  for (let i = 0; i < 5; i++) {
    fill(windowLights[i] ? color(255, 255, 0) : color(150, 150, 150)); // Yellow for light on, gray for light off
    noStroke();
    rect(startX + i * (windowWidth + 10), startY, windowWidth, windowHeight);
  }
}



// BauhausShape class
class BauhausShape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

// BauhausRect class
class BauhausRect extends BauhausShape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  draw() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}

// BauhausCircle class
class BauhausCircle extends BauhausShape {
  constructor(x, y, size, color) {
    super(x, y, color);
    this.size = size;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// BauhausLine class
class BauhausLine extends BauhausShape {
  constructor(x, y, length, angle, color, index) {
    super(x, y+70, color);
    this.length = length;
    this.angle = angle/2;
    this.index = index; 
  }

  draw() {
    stroke(this.color);
    strokeWeight(2);
    push();
    //  Controls the up and down movement of lines
    translate(this.x, this.y + waveAmplitude * sin(frameCount * waveFrequency + this.index)*25); // Each line goes up and down with time
    rotate(radians(this.angle));
    line(0, 0, this.length, 0);
    pop();
  }
}

// Cloud class，Use multiple circles to form clouds and add motion effects
class BauhausCloud extends BauhausShape {
  constructor(x, y, size, alpha) {
    super(x, y, color(255, 255, 255, alpha));
    this.size = size;
    this.speedX = random(0.2, 1);
    this.speedY = random(-0.2, 0.2);
  }

  draw() {
    noStroke();
    fill(this.color);

    // Draw the cloud with multiple ellipses
    ellipse(this.x, this.y, this.size, this.size * 0.5);
    ellipse(this.x - this.size * 0.4, this.y + this.size * 0.2, this.size * 0.6, this.size * 0.4);
    ellipse(this.x + this.size * 0.4, this.y + this.size * 0.2, this.size * 0.6, this.size * 0.4);
    ellipse(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.5, this.size * 0.3);
    ellipse(this.x + this.size * 0.2, this.y - this.size * 0.2, this.size * 0.5, this.size * 0.3);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // If the cloud moves out of the left edge of the canvas, reset its position to the right edge
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
    // If the cloud moves out of the top or bottom edge of the canvas, reverse its moving direction
    if (this.y > height / 2 || this.y < 0) {
      this.speedY *= -1;
    }
  }
}
