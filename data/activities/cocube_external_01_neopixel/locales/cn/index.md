### 1. 案例目的

学习掌握 NeoPixel 全彩灯板模块的使用，并在此基础上，进一步了解循环等逻辑。

NeoPixel 全彩灯板采用 WS2812 芯片驱动，能够实现独立控制每个 LED 的颜色和亮度。每个LED模块都具有内置驱动电路，可通过数字信号链式连接，简化控制线路的布置。WS2812 常用于各种创意照明、显示屏、装饰性光效、舞台灯光、广告牌、家庭装饰等领域。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =200x*)
![NeoPixel 全彩灯版模块](NeoPixel.png =180x*)
![个人电脑 或 平板](PC.png =250x*)

### 3. 软件平台

[MicroBlocks——CoCube & CoCube Module](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. 快速体验

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 NeoPixel 全彩灯板模块安装到 CoCube 机器人上。

2. **添加积木库：**&#x5728;“机器人”目录下，添加 “CoCube Module库”——“CoCube Module库”中涵盖了 NeoPixel 灯板最常用的三种功能——连接、点亮以及关闭。

![](image-1.png)
![](image.png)

* **连接NeoPixels：**&#x5728;“CoCube Module”积木库中找到“连接 NeoPixels”积木块，拖拽到工作区，并单击运行。

![](scriptImage1186229.png)

* **点亮所有 NeoPixels：**&#x62D6;拽出“设置所有 NeoPixels 的颜色”积木，单击运行，NeoPixel灯板的48枚灯珠将全部发光。你可以试着调整灯珠的颜色。

![](scriptImage1235412.png)

* **清除显示：**&#x82E5;希望熄灭 NeoPixel，则可拖拽出“关闭 NeoPixels”积木，单击运行。

![](scriptImage1624535.png)

* **注意：**&#x57;S2812 是一种功耗较大的元器件，因此 CoCube 机器人的电量下降也更快。请注意查看电量并及时充电。

### 5. 进阶功能

NeoPixel 全彩灯板采用 WS2812 芯片驱动，LED 灯珠按照从左到右，从上到下的次序排布，每个 LED 灯珠的颜色和亮度均能被独立控制。添加“CoCube Module”库之后，可以看到该库所依赖的 NeoPixel 库也被同时加载进了 MicroBlocks IDE 中，基于它，我们可以实现更加丰富的效果。

![](image-3.png)

#### 5.1 流水灯

回顾 [ 案例01 LCD 屏幕编程](https://sjtu-colab.feishu.cn/wiki/RC48wJsOZiz4x3kF5nOcqo7AnRg)，我们对 5 \* 5 的 LCD 屏幕编写了流水灯程序。现在我们在 NeoPixel 全彩灯板上重新实现一下。

![](<flowing.gif>)

###### 参考程序——要先自己思考呀！

![](scriptImage3745294.png)

#### 5.2 多色流水灯

思考一下，如果希望每一行都是不同颜色的流水灯，应该如何实现呢？

###### 参考代码——要先自己思考呀！

![](scriptImage4454974.png)



#### 5.3 轮转

![](scriptImage4858302.png)

“轮转 NeoPixel 间距”积木，指的是将现有的灯珠颜色整体移位。

![](scriptImage5077164.png)

![](rotating.gif)

#### 5.4 颜色移动

如何让灯板呈现出自然渐变的效果呢？

![](scriptImage6112209.png)

![](gradient.gif)

那更进一步，你是否可以完成七彩的渐变呢？

###### 参考代码——要先自己思考呀！

![](scriptImage5796430.png)



### 6. 挑战一下

与 CoCube 机器人的定位地图联动，你能创作出哪些更有趣的作品呢？

### 7. 参考代码示例

以上所有案例代码：

[MicroBlocks——NeoPixel 全彩灯板模块案例](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27NeoPixel%27%20%27TFT%27%0A%0Ascript%20632%20-43%20%7B%0Acomment%20%27step1%27%0Aforever%20%7B%0A%20%20%27ccmodule_attach%20NeoPixels%27%0A%20%20local%20%27var%27%20%28randomColor%29%0A%20%20for%20i%2048%20%7B%0A%20%20%20%20setNeoPixelColor%20i%20var%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27ccmodule_clear%20NeoPixels%27%0A%7D%0A%7D%0A%0Ascript%201023%20-55%20%7B%0Acomment%20%27step2%27%0A%27ccmodule_attach%20NeoPixels%27%0Aforever%20%7B%0A%20%20for%20i%206%20%7B%0A%20%20%20%20local%20%27var%27%20%28randomColor%29%0A%20%20%20%20for%20j%208%20%7B%0A%20%20%20%20%20%20setNeoPixelColor%20%28%28%28i%20-%201%29%20%2A%208%29%20%2B%20j%29%20var%0A%20%20%20%20%20%20waitMillis%2050%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20633%20289%20%7B%0Acomment%20%27step3%27%0A%27ccmodule_attach%20NeoPixels%27%0Afor%20i%208%20%7B%0A%20%20setNeoPixelColor%20i%20%28colorSwatch%2035%20190%2030%20255%29%0A%7D%0Aforever%20%7B%0A%20%20rotateNeoPixelsBy%20-8%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0Ascript%201028%20306%20%7B%0Acomment%20%27step4%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%205%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20632%20566%20%7B%0Acomment%20%27step5%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Afor%20i%2048%20%7B%0A%20%20NeoPixel_shift_color%20i%20%28i%20%2A%205%29%0A%7D%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%2010%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0A)

