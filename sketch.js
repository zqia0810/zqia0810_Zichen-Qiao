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