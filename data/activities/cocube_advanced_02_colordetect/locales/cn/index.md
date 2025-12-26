### 1. 案例目的

学习 AI 视觉感知模块的色块检测功能，并用 CoCube 对不同的色块做出反应。

<video width="320" height="240" controls>
  <source src="colordetect.mp4" type="video/mp4">
</video>

### 2. 使用材料

![个人电脑 或 平板](PC.png =300x*)
![CoCube机器人 + AI 视觉感知模块](Sentry2.png =300x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. 算法知识

#### 参考教程

文档教程：[算法介绍 — 色块检测 Blob](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

从 Sengo1的屏幕运行状态如下所示，屏幕沿水平方向X与竖直方向Y将图像100等分， 摄像头画面左上角为原点坐标(0,0)，右下角坐标为(100,100)，图像中心区域坐标为(50,50)，当识别到相应的色块会返回其X，Y，W，H

![](image.png =400x*)
![](image-1.png =300x*)

#### 需要使用到的积木说明

1. **Sengo 1 初始化积木**

在使用 摄像头前需要先执行初始化积木。通常会放在"当启动时"帽子积木下。

![](init.png)

2. **Sengo1 设置模式积木**

![](setmode.png)

3. **色块检测算法参数设置**

选择检测的颜色，以及识别的区域大小

![](setparam.png)

4. **Sengo1 色块结果读取**

![](result.png)

![](property.png)

返回色块的检测结果

包括中心x坐标、中心y坐标、宽度w、高度h

### 5. 开始编程

1. **连接设备：**通过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 AI 视觉感知模块拓展在 CoCube 机器人前方。

2. **载入积木库：**添加机器人积木库中的"CoCube Sengo1"或者"CoCube Sengo2"，具体库的选择依据摄像头硬件型号，两者使用上无明显区别，Sengo2具备更多的功能，以下案例教程以Sengo1库演示。

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **摄像头模块初始化：**选择启动时先将Sengo1初始化，将摄像头的算法模式设置为色块检测模式用于色块识别，同时将"dx""dy"初始化为0，两个变量作为后续判断目标色块的位置判断的关键参数。

![](camera_init.png)

4. **重复获取色块位置：**通过"Sengo1获取色块的"属性，观察当目标色块在摄像头屏幕中时的位置与尺寸标签，以及确定中央位置的参数，通过"dx"和"dy"判断色块离屏幕中心位置的偏差与CoCube后续应该怎么调整方向与位置。

![](adjust_process.png)

![](get_position.png)

**提问：**该积木相当于什么？

![](multithread.png)

5. **编写自己的程序：**有了上述的调试代码，不妨自己试试组合更多的功能吧！

### 6. 挑战一下

基于色块识别功能，实现跟随蓝色圆柱移动的功能。

注意，需要手动设置Sengo1摄像头的色块识别的参数，将识别色块的颜色由出厂默认红色，更改为蓝色。

![](final_code.png)

参考代码：[案例 Sengo1 色块检测](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20494%2078%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20906%2078%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%28%27Sengo1%20get%20blob%27%20%27w%27%29%20%28%27Sengo1%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20494%20334%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20920%20334%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20502%20638%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)

参考代码：[案例 Sengo2 色块检测](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20841%20335%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20415%2078%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%203000%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20415%20335%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20828%2079%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%28%27Sengo2%20get%20blob%27%20%27w%27%29%20%28%27Sengo2%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20424%20639%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)

