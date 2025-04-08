### 1. Purpose of the Case

Program the CoCube robot to implement the LED display function of the LCD screen.

### 2. Materials Used

![CoCube Robot × 1](img1.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Start Programming

The CoCube robot is equipped with a full-color LCD screen that can display content in different ways. The most basic display method is through a 5×5 block array. To light up the CoCube, follow these steps:

1. **Connect the Device:** Connect the MicroBlocks IDE and the CoCube robot via wired or wireless means.

2. **Find the Blocks:** Find the "Display" block in the "LED Display" block library and drag it to the workspace.

3. **Run the Program:** Left-click the block. When a green halo lights up around the block, it means the program has been successfully executed, and you can observe that the LCD screen of the CoCube robot is displaying a smiley face.

4. **Display and Clear:** To clear the current pattern on the screen, you can use the "Clear Display" block. Click the "Clear Display" block directly in the block area, or drag the "Clear Display" block to the workspace and click it, and all content on the screen will be cleared.

![](simulator.png)

Reference Code Example: [MicroBlocks - CoCube Case 01 Display and Clear](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20396%20276%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20395%20132%20%7B%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%7D%0A%0A)

### 5. Challenge: Flowing Lights

In the "LED Display" library, you can control each LED block individually using the "Light up x _ y _" and "Turn off x _ y _" blocks. Refer to the blocks below and try to write a flowing lights program!

You can try changing the wait time to control the speed of the flowing lights; you can also try using the "Hat Block" - for example, "When Button A/B is Pressed" to set different display colors for the flowing lights.

![](<Flowing_lights_en.png>)

![](light.gif =300x*)

Reference Code Example: [MicroBlocks - CoCube Case 01 Flowing Lights](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20440%2088%20%7B%0AwhenStarted%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0Aforever%20%7B%0A%20%20for%20i%205%20%7B%0A%20%20%20%20for%20j%205%20%7B%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbPlot%5D%27%20i%20j%0A%20%20%20%20%20%20waitMillis%20100%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%7D%0A%0Ascript%20786%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0A%7D%0A%0Ascript%20790%20199%20)