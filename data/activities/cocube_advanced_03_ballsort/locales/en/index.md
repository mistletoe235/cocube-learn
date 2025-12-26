### 1. Goal

Learn the color block recognition function of the AI vision module and implement color block sorting using the CoCube gripper.

<video width="320" height="240" controls>
  <source src="ball_sorting.mp4" type="video/mp4">
</video>

### 2. Materials

![PC or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Module](Sentry2.png =200x*)
![Gripper Module](gripper.png =200x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Algorithm Knowledge

#### Reference Tutorial

Documentation: [Algorithm Introduction — Blob Detection](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

The running status on the Sengo1 screen is shown below. The screen divides the image into 100 equal parts horizontally (X) and vertically (Y). The top-left corner is the origin (0,0), the bottom-right is (100,100), and the center is (50,50). When a color block is detected, it returns its X, Y, W, and H values.

![](image.png =400x*)
![](image-1.png =300x*)

#### **Block Descriptions**

1. **Sengo 1 Initialization Block**

The initialization block must be executed before using the camera. It is usually placed under the "when started" hat block.

![](init.png)

2. **Sengo1 Set Mode Block**

![](setmode.png)

3. **Blob Detection Parameter Settings**

Select the color to detect and the minimum/maximum area size.

![](setparam.png)

4. **Sengo1 Read Blob Results**

![](read_blob.png)

![](property.png)

Returns the detection results of the color block, including center X coordinate, center Y coordinate, width W, and height H.

### 5. Programming

1. **Connect Device:** Connect the MicroBlocks IDE to the CoCube robot via wired or wireless connection, and attach the AI vision module to the front of the CoCube.

2. **Load Libraries:** Add "CoCube Sengo1" or "CoCube Sengo2" from the robot library. The choice depends on your camera hardware model; there is no significant difference in basic usage. Sengo2 has more features. This tutorial uses the Sengo1 library.

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **Camera Module Initialization:** Initialize Sengo1 at startup. Set the camera to "Blob Detect" mode and configure the target color and area size. When using the gripper, the camera initialization block must be used to ensure power supply to the gripper module.

![](init_wait.png)

4. **Target Detection and Parameter Determination:** By adjusting the threshold of the blob's Y-coordinate (the number in the blue circle), you can control the distance between CoCube and the ball. This value depends on the camera's pose and the current environment. The logic is similar to previous card recognition tasks.

![](detect_target.png)

**Question:** The blocks above lack judgment for the X direction and specific movement adjustments. How can we implement them?

5. **Movement Adjustment:** Since CoCube uses a tracked differential drive, it needs to adjust the speed of the two wheels to correct its heading when the target ball deviates. We can adjust the position by controlling the left and right wheel speeds simultaneously. When the target is to the left, the left wheel speed should be lower than the right wheel speed, and vice versa. This is a simple form of negative feedback control.

![](adjust_horizontal.png)

**Knowledge Supplement — Negative Feedback Control:** Negative feedback is like the instinct to maintain balance on a tightrope: if your body leans left (an error occurs), your brain immediately commands your body to lean right (reverse adjustment). This mechanism of "subtracting where there is too much, adding where there is too little" cancels out disturbances by acting against the deviation, keeping you steadily on the target path.

6. **Write Your Own Program:** With the debugging code above, try combining more functions yourself!

### 6. Challenge

Implement an automatic ball sorting function using CoCube. You can add buttons A and B for more flexible start and stop control.

![](final_code.png)

Reference Code: [Sengo1 Ball Sorting Case](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20440%2069%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20592%2069%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20763%2069%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo1%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)

Reference Code: [Sengo2 Ball Sorting Case](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20400%2088%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20552%2088%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20723%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo2%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)