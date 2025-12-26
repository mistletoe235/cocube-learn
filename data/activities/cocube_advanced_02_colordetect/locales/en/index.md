### 1. Goal

Learn the color block detection function of the AI vision perception module and use CoCube to react to different color blocks.

<video width="320" height="240" controls>
  <source src="colordetect.mp4" type="video/mp4">
</video>

### 2. Materials

![PC or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Module](Sentry2.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Algorithm Knowledge

#### Reference Tutorial

Documentation: [Algorithm Introduction — Color Block Detection (Blob)](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

The running status of Sengo1's screen is shown below. The screen is divided into 100 equal parts horizontally (X) and vertically (Y). The top-left corner of the camera image is the origin (0,0), the bottom-right corner is (100,100), and the center is (50,50). When a corresponding color block is detected, it returns its X, Y, W, and H.

![](image.png =400x*)
![](image-1.png =300x*)

#### Block Descriptions

1. **Sengo 1 Initialization Block**

The initialization block must be executed before using the camera. It is usually placed under the "when started" hat block.

![](init.png)

2. **Sengo1 Set Mode Block**

![](setmode.png)

3. **Color Detection Algorithm Parameter Settings**

Select the color to detect and the size of the recognition area.

![](setparam.png)

4. **Sengo1 Color Block Result Reading**

![](result.png)

![](property.png)

Returns the detection results of the color block, including center x-coordinate, center y-coordinate, width (w), and height (h).

### 5. Programming

1. **Connect Device:** Connect the MicroBlocks IDE to the CoCube robot via wired or wireless connection, and attach the AI vision module to the front of the CoCube robot.

2. **Load Block Libraries:** Add "CoCube Sengo1" or "CoCube Sengo2" from the robot library. The choice depends on the camera hardware model; there is no significant difference in usage. Sengo2 has more features. This tutorial uses the Sengo1 library.

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **Camera Module Initialization:** Initialize Sengo1 on startup. Set the camera's algorithm mode to "Blob Detect" for color recognition. Initialize variables "dx" and "dy" to 0, which will be used to judge the target color block's position.

![](camera_init.png)

4. **Repeatedly Get Color Block Position:** Use the "Sengo1 get blob" attribute to observe the position and size labels when the target color block is on the screen. Determine the center parameters. Use "dx" and "dy" to calculate the deviation from the screen center and decide how CoCube should adjust its direction and position.

![](adjust_process.png)

![](get_position.png)

**Question:** What is this block equivalent to?

![](multithread.png)

5. **Write Your Own Program:** With the debugging code above, try combining more functions!

### 6. Challenge

Based on the color recognition function, implement a feature to follow a moving blue cylinder.

Note: You need to manually set the color recognition parameters for the Sengo1 camera, changing the detected color from the factory default red to blue.

![](final_code.png)

Reference Code: [Case: Sengo1 Color Detection](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20494%2078%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20906%2078%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%28%27Sengo1%20get%20blob%27%20%27w%27%29%20%28%27Sengo1%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20494%20334%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20920%20334%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20502%20638%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)

Reference Code: [Case: Sengo2 Color Detection](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20841%20335%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20415%2078%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%203000%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20415%20335%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20828%2079%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%28%27Sengo2%20get%20blob%27%20%27w%27%29%20%28%27Sengo2%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20424%20639%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)

