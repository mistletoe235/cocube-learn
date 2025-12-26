### 1. 案例目的

学习 AI 视觉感知模块的线条检测功能，并用 CoCube 实现自动巡线功能

<video width="320" height="240" controls>
  <source src="line.mp4" type="video/mp4">
</video>

### 2. 使用材料

![个人电脑 或 平板](PC.png =300x*)
![CoCube机器人 + AI 视觉感知模块](Sentry2.png =300x*)

[巡线地图.pdf](map.pdf)

巡线地图，可下载并用A3纸印刷

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. 算法知识

#### 参考教程

文档教程：[算法介绍 — 线条检测 Line](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-line-index)

#### **需要使用到的积木说明**

1. **Sengo 1 初始化积木**

在使用 摄像头前需要先执行初始化积木。通常会放在"当启动时"帽子积木下。

![](init.png)

2. **Sengo1 设置模式积木**

![](line_detect_mode.png)

3. **Sengo1 线条检测对象属性**

![](get_angle.png)

返回线条检测对象的属性，包括线段终点x1坐标（高处）、线段终点y1坐标（高处）、线段起点x2坐标（低处）、线段起点y2坐标（低处）、线段的倾斜角度。

![](image.png)

#### **使用技巧**

> 1. 背景与线条应清晰分明，比如白底黑线，如果背景杂乱，则可能会检测出背景中的线条
>
> 2. 线条粗细应适中，不可过细，也不可太宽
>
> 3. 一般来说，巡线时，第一条线段始终为屏幕下方先发现的线段，然后是分支线段

### 5. 开始编程

1. **连接设备：**通过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 AI 视觉感知模块拓展在 CoCube 机器人前方。

2. **载入积木库：**添加机器人积木库中的"CoCube Sengo1"或者"CoCube Sengo2"，具体库的选择依据摄像头硬件型号，两者使用上无明显区别，Sengo2性能更好，以下案例教程以Sengo1库演示。

![](image-1.png =300x*)
![](image-2.png =300x*)

3. **摄像头模块初始化：**选择启动时先将Sengo1初始化，将摄像头的算法模式设置为线条检测模式。

![](init_code.png)

4. **线条检测：**判断是否有检测到线条，当检测到时，输出该线条的5种属性。你可以实时观察该线条的位置与角度属性

![](get_line.png)

现在考虑如何根据线条的位置和角度来让CoCube保持在巡线上，因为CoCube是履带式差速轮，当其偏离巡线时需要通过调整两个车轮的转速来进行转向校正。同前类似，这是一种负反馈控制。所以我们就需要判断什么情况下需要调整转向，如下图所示：

* 1. 首先当直线本身位置偏左时，说明此时CoCube已经偏向于巡线的右侧，而我们最希望的是CoCube能尽快回到最近的训线的中心，所以选择bottom_X与屏幕中心(50)作差，然后除以一个比例系数得到差速值，定义为error_1

* 2.其次当直线角度不是90度(即前方巡线存在拐弯)时说明我们需要进行转向来跟踪巡线。因此选择直角(90)与angle作差，然后除以另一个比例系数得到差速值，定义为error_2;

![](Screenshot.png)

最终左轮的速度等于直线速度(默认25)+error_1+error_2, 右轮的速度等于直线速度(默认25)-error_1-error_2。

（注：这里error_1和error_2采用了负反馈的思想，根据实际的误差调整车轮转速，进而减少误差）

代码如下（[自动巡线](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20430%2049%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%202000%0A%27Sengo1%20change%20algorithm%27%20%27Line%20Detect%27%0A%7D%0A%0Ascript%20428%20211%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%20%27number%27%29%20%7B%0A%20%20%20%20local%20%27%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%27%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%0A%20%20%20%20local%20%27%E8%A7%92%E5%BA%A6%27%20%28%27Sengo1%20get%20line%27%20%27degree%27%29%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%E5%BA%95%E9%83%A8x%E5%9D%90%E6%A0%87%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20%E8%A7%92%E5%BA%A6%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2825%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2825%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20819%20107%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0A%7D%0A%0Ascript%20913%20179%20%7B%0AwhenCondition%20true%0Aif%20%28%28%27Sengo1%20get%20line%27%20%27x1%27%29%20%21%3D%200%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20line%27%20%27x1%27%29%20%28%27Sengo1%20get%20line%27%20%27y1%27%29%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%20%28%27Sengo1%20get%20line%27%20%27y2%27%29%20%28%27Sengo1%20get%20line%27%20%27degree%27%29%0A%7D%0A%7D%0A%0A)）：

![](main_code.png)

5. **编写自己的程序：**有了上述的调试代码，不妨尝试下改用其他参数作为负反馈项实现更高精度的跟踪，也可以自己试试组合更多的功能！
