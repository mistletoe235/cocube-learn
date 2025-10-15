### 1. Goal

Learn to use the NeoPixel RGB LED panel module and further understand loops and other logic.

The NeoPixel RGB LED panel is driven by the WS2812 chip, which allows independent control of the color and brightness of each LED. Each LED module has a built-in driver circuit and can be daisy-chained via digital signals, simplifying wiring. The WS2812 is commonly used in creative lighting, displays, decorative lighting effects, stage lighting, billboards, home decor, and more.

### 2. Materials Used

![CoCube Robot × 1](robot.png =200x*)
![NeoPixel RGB LED Panel Module](NeoPixel.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Software Platform

[MicroBlocks——CoCube & CoCube Module](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. Quick Experience

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection, and attach the NeoPixel RGB LED panel module to the CoCube robot.

2. **Add Block Library**: Under the "Robot" directory, add the "CoCube Module Library" — this library includes the three most commonly used functions for the NeoPixel panel: connect, light up, and turn off.

![](image-1.png)
![](image.png)

* **Connect NeoPixels**: In the "CoCube Module" block library, find the "attach NeoPixels" block, drag it into the workspace, and click to run.

![](scriptImage1186229.png)

* **Light Up All NeoPixels**: Drag out the "Set all NeoPixels color" block, click to run, and all 48 LEDs on the NeoPixel panel will light up. You can try adjusting the LED colors.

![](scriptImage1235412.png)

* **Clear Display**: To turn off the NeoPixels, drag out the "clear NeoPixels" block and click to run.

![](scriptImage1624535.png)

* **Note**: The WS2812 is a power-hungry component, so the CoCube robot's battery will drain faster. Be sure to monitor the battery level and recharge it promptly.

### 5. Advanced Features

The NeoPixel RGB LED panel is driven by the WS2812 chip, and the LEDs are arranged from left to right and top to bottom. The color and brightness of each LED can be independently controlled. After adding the "CoCube Module" library, you'll notice that the NeoPixel library it depends on is also loaded into the MicroBlocks IDE. Based on this, we can achieve richer effects.

![](image-3.png =400x*)

#### 5.1 Running Lights

Recall [01 LCD Screen Programming], where we implemented a running light program for a 5x5 LCD screen. Now let's re-implement it on the NeoPixel RGB LED panel.

![](<flowing.gif>)

###### Reference Program — Think First!

![](scriptImage3745294.png)

#### 5.2 Multi-Color Running Lights

Think about how you could implement running lights with different colors on each row.

###### Reference Code — Think First!

![](scriptImage4454974.png)

#### 5.3 Rotation

![](scriptImage4858302.png)

The "Rotate NeoPixel Spacing" block shifts the current LED colors as a whole.

![](scriptImage5077164.png)

![](rotating.gif)

#### 5.4 Color Flow

How can you make the LED panel display a smooth gradient effect?

![](scriptImage6112209.png)

![](gradient.gif)

Taking it a step further, can you create a rainbow gradient?

###### Reference Code — Think First!

![](scriptImage5796430.png)

### 6. Challenge Yourself

Working with the CoCube robot's positioning map, what more interesting creations can you come up with?

### 7. Reference Code Examples

All case code examples above:

[MicroBlocks——NeoPixel RGB LED Panel Module Cases](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27NeoPixel%27%20%27TFT%27%0A%0Ascript%20632%20-43%20%7B%0Acomment%20%27step1%27%0Aforever%20%7B%0A%20%20%27ccmodule_attach%20NeoPixels%27%0A%20%20local%20%27var%27%20%28randomColor%29%0A%20%20for%20i%2048%20%7B%0A%20%20%20%20setNeoPixelColor%20i%20var%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27ccmodule_clear%20NeoPixels%27%0A%7D%0A%7D%0A%0Ascript%201023%20-55%20%7B%0Acomment%20%27step2%27%0A%27ccmodule_attach%20NeoPixels%27%0Aforever%20%7B%0A%20%20for%20i%206%20%7B%0A%20%20%20%20local%20%27var%27%20%28randomColor%29%0A%20%20%20%20for%20j%208%20%7B%0A%20%20%20%20%20%20setNeoPixelColor%20%28%28%28i%20-%201%29%20%2A%208%29%20%2B%20j%29%20var%0A%20%20%20%20%20%20waitMillis%2050%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20633%20289%20%7B%0Acomment%20%27step3%27%0A%27ccmodule_attach%20NeoPixels%27%0Afor%20i%208%20%7B%0A%20%20setNeoPixelColor%20i%20%28colorSwatch%2035%20190%2030%20255%29%0A%7D%0Aforever%20%7B%0A%20%20rotateNeoPixelsBy%20-8%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0Ascript%201028%20306%20%7B%0Acomment%20%27step4%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%205%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20632%20566%20%7B%0Acomment%20%27step5%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Afor%20i%2048%20%7B%0A%20%20NeoPixel_shift_color%20i%20%28i%20%2A%205%29%0A%7D%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%2010%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0A)