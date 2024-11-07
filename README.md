# Functioning prototype

## Interactive Notes
Elements such as the sun, water and windows automatically move in a loop when the page loads.
## Time-Based
I use time to drive the personal part of the code. This time-driven approach allows the elements in the animation to automatically cut and smooth out the animation. Its suitable for slow and periodic phenomena in nature.
## Animated Elements
1. Sun: Use the time drive to create a slow sunrise and sunset effect by gradually changing the angle so that the sun moves along a semicircular trajectory.
2. By lighting up and extinguishing the windows at regular intervals, a gradual lighting effect of the window lights is realized, simulating the turning on of the lights inside the building at night.
3. The up and down rise and fall of the wave line on the water surface is controlled by a sinusoidal function, which creates a natural vibration effect in the waves.
## Inspirations
The assignment was inspired by two gifs. the first shows the sun rising and setting in a semi-circular trajectory, with the colors of the sky changing as the sun rises and sets. The buildings of the city show a brown outline. I was inspired by the movement of the sun in this image, and its combination with the buildings gave the scene more depth. The second image shows the golden ripples created by the sun's light on the water. The shimmering water creates an unparalleled sense of natural immersion in the scene. Both images inspire me, both the curved path of the sun's movement and the brown silhouettes of the buildings and the golden ripples of the water. The combination of these elements can give my project a more natural and aesthetic feel and provide an immersive experience for the viewer.

![Sunrise and Sunset](readmeImages/Sunrise_and_Sunset.gif)
![sparkling water](readmeImages/sparkling_water.gif)


## Technical Explanation
1. Sun: I use time-driven animation to animate the sun, water waves, and windows in a loop. I use angles and trigonometric functions (cos and sin) in the updateSunPosition() function to control the movement of the sun along a semi-circular path, thus simulating the rising and setting of the sun. The speed of its movement is controlled using setInterval(). 
2. Window: I designed an updateWindowLights() function to simulate the effect of randomly turning on the lights inside a building by lighting and extinguishing the windows at regular intervals. windowLights array stores the lit state of each window. updateWindowLights() function updates the currently lit windows regularly and resets the array when all the windows are lit. The updateWindowLights() function regularly updates the currently lit windows and resets the array when all windows are lit. Use setInterval() to control the speed at which the window lights come on in sequence. 
3. Water: To achieve a more natural water wave, I used the sin function to make the water wave go up and down. I used sin(frameCount * waveFrequency + this.index) * 25 in the translate() function to make the vertical position of the wave line change with the number of frames and make it go up and down periodically.
