### 1. Purpose of the Case

Program the CoCube robot to achieve basic movement functions.

### 2. Materials Used

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Start Programming

#### CoCube Motion Control

1. **Connect Device**: Connect the Microblocks IDE with the CoCube robot via Bluetooth.

2. **Control the robot to move forward, backward, left, and right**: In the "CoCube" block library, drag out the first two blocks related to motor control. These blocks can control the movement direction, speed, and duration of the CoCube robot.

![](allScripts112573.png)

* **"Wheels Break" and "Wheels Stop"**: Write the following code to experience the difference between "wheels break" and "wheels stop". The "wheels break" will stop the robot immediately, while "wheels stop" simply removes the power from the motor, causing the CoCube robot to continue sliding forward a short distance due to inertia. You may need to use different stopping blocks for certain specific tasks.

![](allScripts313641.png)

* **Control the robot to perform "circular motion"**: The CoCube robot chassis is designed in a tracked shape. By controlling different speeds for the left and right wheels, more motion trajectories can be simulated, such as making the CoCube robot drive in a circle.

![](scriptImage671505.png)

![](circle.gif)

Reference Code Example: [MicroBlocks——CoCube Case 02 Motion Basics](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20649%20268%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%20929%20263%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20break%27%0A%7D%0A%0Ascript%20648%20456%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27CoCube%20set%20wheel%27%2040%2020%0A%7D%0A%0A)

### 5. Challenge

Use motor control blocks to manipulate the CoCube to complete a square trajectory motion.

Try experimenting: how long does it take for the robot to rotate left at a speed of 30 to turn precisely 90 degrees?

![](scriptImage251172.png)

![](GIF.gif)

Reference Code Example:

[MicroBlocks——CoCube Case 02 Square Trajectory Motion](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%0A%0Ascript%20559%20174%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0Aforever%20%7B%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bforward%27%2040%201000%0A%20%20waitMillis%20250%0A%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20900%0A%20%20waitMillis%20250%0A%7D%0A%7D%0A%0A)

Careful observation might reveal that after some time, the accumulated error of CoCube's left turns will become increasingly larger, causing the square trajectory to gradually distort. How can we achieve more precise movements?

In the next case study, let’s learn how to use the CoMap!
