### 1. Goal

Learn to use the ToF (Time of Flight) module and create more interesting interactive applications.

ToF (Time of Flight) works by emitting infrared laser light, measuring the time it takes for the light to reach an object and reflect back, thereby obtaining precise distance data. It has excellent adaptability to lighting conditions and is unaffected by the reflectivity of the target, allowing it to work stably in various lighting conditions and usage scenarios.

### 2. Materials Used

![CoCube Robot × 1](robot.png =200x*)
![ToF External Module](ToF.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Software Platform

[MicroBlocks——CoCube & CoCube Module](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. Quick Experience

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection, and attach the ToF module to the CoCube robot.

2. **Add Block Library**: Under the "Robot" directory, add the "CoCube Module Library" — this library includes all the functions of the ToF external module: "ToF Connected" and "ToF Distance (mm)."

![](image-2.png)

![](image.png)

* **ToF Connected**: Drag out the "ToF Connected" block, place it in the workspace, and click to run. This block checks whether the CoCube robot is connected to the ToF laser rangefinder module.

![](scriptImage6864473.png)

**Note**: Since the module requires some time to power up, there’s a chance that the first run might return "false." Simply click to run again.

* **ToF Distance (mm)**: Drag out the "ToF Distance (mm)" block and click to run. This will return the distance from the ToF laser rangefinder sensor to the obstacle in front.

If you want to output the measurement results in real-time, you can write the following program:

![](scriptImage6901001.png)

### 5. Advanced Features

Can you write a program that controls the CoCube robot to follow your hand? If the CoCube is far enough from the obstacle in front, it moves forward; if the CoCube is close to the obstacle, it reverses.

###### Example Program – Think and Try First!

![](scriptImage8014138.png)

### 6. Challenge Yourself

Using materials at hand, build a simple 3D maze! Then try writing code to make the CoCube robot autonomously navigate out of the maze using the ToF laser rangefinder module.

### 7. Reference Code Examples

All tutorial code examples above:

[MicroBlocks —— ToF Laser Rangefinder Module Cases](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20663%20105%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28%28%27ccmodule_ToF%20distance%27%29%20%3E%20120%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204347332%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28%28%27ccmodule_ToF%20distance%27%29%20%3C%2080%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204674692%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%7D%0A%0A)
