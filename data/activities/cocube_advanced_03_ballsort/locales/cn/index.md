### 1. 案例目的

学习 AI 视觉感知模块的色块识别功能，并用 CoCube夹爪实现色块分类。

<video width="320" height="240" controls>
  <source src="ball_sorting.mp4" type="video/mp4">
</video>

### 2. 使用材料

![个人电脑 或 平板](PC.png =300x*)
![CoCube机器人 + AI 视觉感知模块](Sentry2.png =200x*)
![夹爪模块](gripper.png =200x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. 算法知识

#### 参考教程

文档教程：[算法介绍 — 色块检测 Blob](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

从 Sengo1的屏幕运行状态如下所示，屏幕沿水平方向X与竖直方向Y将图像100等分， 摄像头画面左上角为原点坐标(0,0)，右下角坐标为(100,100)，图像中心区域坐标为(50,50)，当识别到相应的色块会返回其X，Y，W，H

![](image.png =400x*)
![](image-1.png =300x*)

#### **需要使用到的积木说明**

1. **Sengo 1 初始化积木**

在使用 摄像头前需要先执行初始化积木。通常会放在"当启动时"帽子积木下。

![](init.png)

2. **Sengo1 设置模式积木**

![](setmode.png)

3. **色块检测算法参数设置**

选择检测的颜色，以及识别的区域大小

![](setparam.png)

4. **Sengo1 色块结果读取**

![](read_blob.png)

![](property.png)

返回色块的检测结果

包括中心x坐标、中心y坐标、宽度w、高度h

### 5. 开始编程

1. **连接设备：**通过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 AI 视觉感知模块拓展在 CoCube 机器人前方。

2. **载入积木库：**添加机器人积木库中的"CoCube Sengo1"或者"CoCube Sengo2"，具体库的选择依据摄像头硬件型号，两者使用上无明显区别，Sengo2具备更多的功能，以下案例教程以Sengo1库演示。

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **摄像头模块初始化：**选择启动时先将Sengo1初始化，将摄像头的算法模式设置为色块检测模式用于色块识别，设置目标检测颜色与区域大小。在使用夹爪功能时必须使用摄像头初始化积木来确保对夹爪模块的供电功能。

![](init_wait.png)

4. **目标检测与参数确定：**通过调整色块y的临界值（蓝色圈内的数字）既可以控制CoCube与小球的距离，但这一个值取决于摄像头的位姿以及当下的环境，积木逻辑类似于之前的识别卡片

![](detect_target.png)

**提问：**上图的积木中还缺少x方向的判断，以及具体的运动调整，可以怎么做呢？

5. **运动调整：**因为CoCube是履带式差速轮，当其目标小球偏离时需要通过调整两个车轮的转速来进行转向校正。所以我们就需要在调整方向的同时调整距离，因此我们可以利用控制左右轮转速来实现位置调整。当目标偏左时，左轮速度将小于右轮速度，反之同理。这属于一种简单的负反馈控制。

![](adjust_horizontal.png)

**知识补充——负反馈控制：**负反馈控制就像是走钢丝时维持平衡的本能：一旦你的身体不由自主地向左歪（出现了偏差），大脑就会立刻指挥身体向右倾斜（进行反向调节）；这种"哪边多了减哪边，哪边少了补哪边"的机制，通过时刻与偏差"唱反调"，最终抵消干扰，让你稳稳地保持在目标路线上。

6. **编写自己的程序：**有了上述的调试代码，不妨自己试试组合更多的功能吧！

### 6. 挑战一下

使用CoCube实现自动的小球分拣功能，可以增加按键A和B来实现更加自由的使用和停止。

![](final_code.png)

参考代码：[案例 Sengo1 小球分拣](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20440%2069%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20592%2069%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20763%2069%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo1%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)

参考代码：[案例 Sengo2 小球分拣](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20400%2088%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20552%2088%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20723%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo2%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)
