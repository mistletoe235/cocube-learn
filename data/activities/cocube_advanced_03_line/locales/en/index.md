### 1. Case Objective

Learn the line detection function of the AI Vision Perception module and use CoCube to implement automatic line-following functionality.

<video width="320" height="240" controls>
  <source src="line.mp4" type="video/mp4">
</video>

### 2. Materials Used

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Perception Module](Sentry2.png =300x*)

[Line Following Map.pdf](map.pdf)

Line following map, can be downloaded and printed on A3 paper.

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

Or directly open the programming environment with the AI Vision Perception module added: [MicroBlocks-AI Camera](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Algorithm Knowledge

#### Algorithm Introduction

![](image-2.png)

Detect whether there are lines in the image. If so, it will return the two endpoints and tilt angle of the line. It can detect up to 5 line segments simultaneously. If it is a curve, it will return an approximate straight segment.

Click to watch video: [Sentry2 Vision Sensor - Line Detection Algorithm Introduction_Bilibili_bilibili](https://www.bilibili.com/video/BV1de4y137QU/)

#### Configuration Parameters

![](image-1.png)

In the UI interface, you can set the algorithm performance and the number of line segments detected simultaneously.

**Algorithm Performance:**

Choose the appropriate algorithm performance based on different application requirements. There are three options: "Sensitive," "Balanced," and "Accurate."

In sensitive mode, it is more responsive to small line segments. In accurate mode, smaller line segments will be ignored. The default is balanced mode.

**Number of Line Segments:**

You can set 1~5 line segments.

#### Return Results

![](image-3.png)

After detecting a line, it returns its two endpoints and tilt angle.

**Note:** Horizontal right is 0 degrees, increasing counterclockwise; vertical up is 90 degrees, horizontal left is 180 degrees, generally not detecting downward angles.

![](image.png)

It can detect up to 5 line segments simultaneously. To distinguish between them in the UI interface, they are marked in the order of results using five colors: "red, yellow, green, blue, purple."

When reading registers through the main controller, the following data will be returned:

| **Result** | **Meaning**      |
| ------ | ----------- |
| 1      | Endpoint x-coordinate (high) |
| 2      | Endpoint y-coordinate (high) |
| 3      | Starting point x-coordinate (low) |
| 4      | Starting point y-coordinate (low) |
| 5      | Tilt angle of the line     |

#### **Usage Tips**

1. The background and lines should be clearly distinct, such as a white background with black lines. If the background is cluttered, it may detect lines in the background.

2. The thickness of the lines should be moderate, neither too thin nor too wide.

3. Generally speaking, when line-following, the first line segment is always the one found at the bottom of the screen, followed by branch line segments.

#### **Block Descriptions Needed**

1. **Sentry2 Initialization Block**

An optional parameter is the i2c address. Default is 96 (0x60).

Before using Sentry2, execute the initialization block first. Typically placed under the "when started" hat block.

![](init.png)

2. **Sentry2 Set Mode Block**

![](<setmodeline.png>)

The mode needs to be set to "line," i.e., line detection mode.

3. **Sentry2 Detection Result**

![](result.png)

Before using this block, ensure that the line algorithm mode has been enabled.

This block is also used to trigger detection; only after using this block can you obtain detection results.

The returned result is the number of results currently identified by the line algorithm.

The number of results will be affected by the corresponding algorithm parameters.

4. **Sentry2 Line Detection Object Attribute**

![](linedetect.png)

Returns the attributes of the line detection object id, including endpoint x-coordinate (high), endpoint y-coordinate (high), starting point x-coordinate (low), starting point y-coordinate (low), and tilt angle of the line.

### 5. Start Programming

1. **Connect Device:** Connect MicroBlocks IDE to the CoCube robot via wired or wireless means, and extend the AI Vision Perception module in front of the CoCube robot.

2. **Load Block Library:** If the Sentry2 AI camera library and CoCube external module library have not been added, load the CoCube external module library and Sentry2 AI camera library.

3. **Camera Module Initialization:** Choose to start by enabling the external module power, then wait 4 seconds for the camera module to successfully start before initializing the I2C interface. Then set the camera's algorithm mode to line mode for blob recognition.

![](linedetectinit.png)

4. **Line Detection:** Continuously check if any Blob blobs are detected. When the number of detected blobs is 1, output the five attributes of that blob. You can observe the position, size, and color tag of the blob in real time.

![](detectresult.png)

Now consider how to keep CoCube on the line based on the position and angle of the line. Since CoCube uses a tracked differential wheel system, when it deviates from the line, it needs to adjust the speed of the two wheels to correct the steering. Therefore, we need to determine when to adjust the steering, as shown in the figure below:

* 1\. First, if the line itself is positioned to the left, it indicates that CoCube is already biased to the right side of the line. Ideally, we want CoCube to return to the center of the nearest line as soon as possible. Therefore, subtract the screen center (50) from bottom_X, and divide by a proportional coefficient to get the differential value, defined as error_1.

* 2\. Secondly, when the line angle is not 90 degrees (i.e., there is a turn ahead on the line), it indicates that we need to steer to track the line. Thus, subtract angle from the right angle (90), and divide by another proportional coefficient to get the differential value, defined as error_2.

![](Screenshot.png)

The final left wheel speed equals the linear speed (default 25) + error_1 + error_2, and the right wheel speed equals the linear speed (default 25) - error_1 - error_2.

(Note: Here, error_1 and error_2 adopt the idea of negative feedback, adjusting the wheel speed according to actual errors to reduce errors.)

Code as follows ([Automatic Line Following](https://microblocks.fun/run/microblocks.html#scripts=GP%20Script%0Adepends%20%27CoCube%27%20%27Sentry2%20AI%20camera%27%0A%0Ascript%20681%2084%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28%28Sentry2_detect_result%200%29%20%3D%3D%201%29%20%7B%0A%20%20%20%20bottom_x%20%3D%20%28%27Sentry2%20detect%20lineobj%27%201%20%27bottomX%27%29%0A%20%20%20%20angle%20%3D%20%28%27Sentry2%20detect%20lineobj%27%201%20%27angle%27%29%0A%20%20%20%20wheel_error%20%3D%20%28%28%28bottom_x%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20angle%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2825%20%2B%20wheel_error%29%20%2825%20-%20wheel_error%29%0A%20%20%20%20waitMillis%2030%0A%20%20%7D%0A%7D%0A%7D%0A%0A)):

![](scriptImage560372.png)

* **Write Your Own Program:** With the above debugging code, try changing other parameters as negative feedback items to achieve higher precision tracking, or experiment with combining more features!

### 6. Challenge Yourself

Based on the blob recognition feature, implement the function of following a blue cylinder movement.

Note: You need to manually set the blob recognition parameters of the Sentry2 camera, changing the recognized blob color from the factory default red to blue.