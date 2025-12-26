### 1. Goal

Learn the line detection function of the AI vision sensor and implement automatic line following with CoCube.

<video width="320" height="240" controls>
  <source src="line.mp4" type="video/mp4">
</video>

### 2. Materials

![PC or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Sensor](Sentry2.png =300x*)

[Line Following Map.pdf](map.pdf)

Line following map, downloadable and printable on A3 paper.

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Algorithm Knowledge

#### Reference Tutorial

Documentation: [Algorithm Introduction — Line Detection](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-line-index)

#### **Block Descriptions**

1. **Sengo 1 Initialization Block**

The initialization block must be executed before using the camera. It is usually placed under the "when started" hat block.

![](init.png)

2. **Sengo 1 Set Mode Block**

![](line_detect_mode.png)

3. **Sengo 1 Line Detection Attributes**

![](get_angle.png)

Returns the attributes of the detected line, including the end point x1 (top), end point y1 (top), start point x2 (bottom), start point y2 (bottom), and the tilt angle of the line segment.

![](image.png)

#### **Tips**

> 1. The background and lines should be clearly distinct (e.g., black lines on a white background). If the background is cluttered, lines in the background might be detected.
>
> 2. The line thickness should be moderate—neither too thin nor too wide.
>
> 3. Generally, during line following, the first line segment detected is the one at the bottom of the screen, followed by branch segments.

### 5. Programming

1. **Connect Device:** Connect the MicroBlocks IDE to the CoCube robot via wired or wireless connection, and attach the AI vision sensor to the front of the CoCube robot.

2. **Load Libraries:** Add "CoCube Sengo1" or "CoCube Sengo2" from the robot library. The choice depends on your camera hardware model; there is no significant difference in usage, though Sengo2 offers better performance. This tutorial uses the Sengo1 library.

![](image-1.png =300x*)
![](image-2.png =300x*)

3. **Camera Initialization:** Initialize Sengo1 at startup and set the camera's algorithm mode to Line Detect.

![](init_code.png)

4. **Line Detection:** Determine if a line is detected. If so, output its 5 attributes. You can observe the line's position and angle in real-time.

![](get_line.png)

Now consider how to keep CoCube on the line based on its position and angle. Since CoCube uses tracked differential drive, it needs to adjust the speed of the two wheels to correct its steering when it deviates. This is a form of negative feedback control. We need to determine when to adjust the steering as shown below:

* 1. When the line position is to the left, it means CoCube has deviated to the right. To return to the center, we calculate the difference between bottom_X and the screen center (50), then divide by a proportional coefficient to get a speed difference value, defined as error_1.

* 2. When the line angle is not 90 degrees (indicating a turn ahead), we need to steer to follow the line. We calculate the difference between 90 degrees and the angle, then divide by another proportional coefficient to get a speed difference value, defined as error_2.

![](Screenshot.png)

The final left wheel speed equals base speed (default 25) + error_1 + error_2, and the right wheel speed equals base speed (default 25) - error_1 - error_2.

(Note: error_1 and error_2 use negative feedback to adjust wheel speed based on actual error, thereby reducing the error.)

![](main_code.png)

5. **Write Your Own Program:** With the debugging code above, try using other parameters as negative feedback terms for higher precision, or combine more functions!

Código de Referencia: [Sengo1 Automatic Line Following](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20442%2096%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%202000%0A%27Sengo1%20change%20algorithm%27%20%27Line%20Detect%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20440%20258%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%20%27number%27%29%20%7B%0A%20%20%20%20local%20%27%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%27%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%0A%20%20%20%20local%20%27%E8%A7%92%E5%BA%A6%27%20%28%27Sengo1%20get%20line%27%20%27degree%27%29%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20%E8%A7%92%E5%BA%A6%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20825%2078%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0A)

Código de Referencia: [Sengo2 Automatic Line Following](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20825%2078%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20442%2096%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%202000%0A%27Sengo2%20change%20algorithm%27%20%27Line%20Detect%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20440%20258%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo2%20get%20line%27%20%27x2%27%29%20%27number%27%29%20%7B%0A%20%20%20%20local%20%27%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%27%20%28%27Sengo2%20get%20line%27%20%27x2%27%29%0A%20%20%20%20local%20%27%E8%A7%92%E5%BA%A6%27%20%28%27Sengo2%20get%20line%27%20%27degree%27%29%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20%E8%A7%92%E5%BA%A6%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A)