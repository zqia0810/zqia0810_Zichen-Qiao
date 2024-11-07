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
}