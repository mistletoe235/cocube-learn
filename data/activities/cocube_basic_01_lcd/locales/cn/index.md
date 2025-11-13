
### 1. 案例目的

为 CoCube 机器人编程，实现 LCD 显示屏的 LED 显示功能。

### 2. 使用材料

![CoCube Robot × 1](img1.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. 开始编程

CoCube 机器人配备了一块全彩 LCD 显示屏，可以通过不同的显示方式进行内容呈现。最基本的显示方式是通过 5×5 的方块阵列进行显示。要点亮 CoCube，可以按照以下步骤操作：

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。

2. **找到积木：**&#x5728;“LED 显示”积木库中找到“显示”积木块，并拖拽到工作区。

3. **执行程序：**&#x5DE6;键单击积木块。当积木块周围亮起绿色光环时，表示程序已成功执行，可以观察到 CoCube 机器人的 LCD 显示屏已经显示笑脸。

4. **显示与清除：**&#x82E5;要清空当前屏幕上的图案，可以使用“清除显示”积木块。直接在积木区中点击“清除显示”积木块，或将“清除显示”积木块拖到工作区并点击，屏幕上的所有内容将被清除。

![](simulator.png)

参考代码示例：[MicroBlocks——CoCube 案例01 显示与清除](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20396%20276%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20395%20132%20%7B%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%7D%0A%0A)

### 5. 挑战一下：流水灯

在“LED 显示”库中，可以通过“点亮 x \_ y \_”和“熄灭 x \_ y \_”积木，单独对每一个 LED 方块进行控制，参考下面的积木，尝试编写一个流水灯程序吧！

你可以尝试更改等待时间，控制流水灯的快慢；也可以尝试使用“帽子积木”——例如“当按键 A/B 被按下”，为流水灯设置不同的显示颜色。

![](Flowing_lights.png)

![](light.gif =300x*)

参考代码示例：[MicroBlocks——CoCube 案例01 流水灯](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20440%2088%20%7B%0AwhenStarted%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0Aforever%20%7B%0A%20%20for%20i%205%20%7B%0A%20%20%20%20for%20j%205%20%7B%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbPlot%5D%27%20i%20j%0A%20%20%20%20%20%20waitMillis%20100%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%7D%0A%0Ascript%20786%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0A%7D%0A%0Ascript%20790%20199%20%7B%0AwhenButtonPressed%20%27B%27%0A%27set%20display%20color%27%20%28colorSwatch%200%20255%200%20255%29%0A%7D%0A%0Ascript%20787%20318%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27set%20display%20color%27%20%28colorSwatch%200%200%20255%20255%29%0A%7D%0A%0A)

