### 1. Goal

When combined with external modules, the CoCube robot can achieve more complex functions. This section introduces how to program the use of the gripper module.

### 2. Materials Used

![CoCube Robot × 1](robot.png =200x*) ![Gripper Module](image.png =200x*) ![Personal Computer or Tablet](PC.png =250x*)

### 3. Software Platform

[MicroBlocks——CoCube & CoCube Module](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. Start Programming

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection. Then attach the servo gripper module to the CoCube robot.

2. **Load External Module Block Library**: Click in the order shown in the image to load the CoCube external module library.

![](image-2.png =200x*)

![](image-3.png =200x*)

![](image-4.png =200x*)

* **Find Gripper Blocks**: Click on the "CoCube Module" tab in the block library on the left, and drag the "gripper open" "gripper close" and "gripper degrees" blocks into the workspace on the right.

* **Run Gripper Blocks**: Left-click the "gripper open" or "gripper close" block. When a green halo appears around the block, it indicates that the program has been successfully executed, and you will see the gripper open or close. Input an angle value (between 0 and 70) into the "gripper degrees" block to move the gripper to the corresponding angle.

![](scriptImage257997.png)

### 5. Challenge

Try using the gripper module to pick up some small objects around you. Move a small foam cylinder from point C to point E on the maze map.

![](scriptImage225548.png)

![](c7635be25d2040f3c514dd4f9c9cef5d_00_00_00-00_00_30.gif)

Reference Example Program: [MicroBlocks——CoCube Case 05 Transport Robot](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%0A%0Ascript%20408%20121%20%7B%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20to%27%20100%20120%2050%0A%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%27ccmodule_gripper%20degree%27%2010%0A%27CoCube%20move%20to%27%20200%20150%2050%0AwaitMillis%201000%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%7D%0A%0A)