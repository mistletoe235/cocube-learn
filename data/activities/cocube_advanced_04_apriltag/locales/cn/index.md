### 1. 案例目的

学习 AI 视觉感知模块的AprilTag识别功能。

### 2. 使用材料

![个人电脑 或 平板](PC.png =300x*)
![CoCube机器人 + AI 视觉感知模块](Sentry2.png =300x*)

自行打印合适规格和尺寸的AprilTag标签。

[Apriltags标签编码-16h5 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/69489d7ebc0ff9d43cc92893281b6731/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-16h5.pdf)

[Apriltags标签编码-25h9 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/2d2a4bff63b80e05f846a60d48b27afd/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-25h9.pdf)

[Apriltags标签编码-36h11 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/d9438412c56f6105a50ac4057d980c49/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-36h11.pdf)

也可以通过网页在线生成合适规格和尺寸的AprilTag标签并打印：[ArUco markers generator!](https://chev.me/arucogen/)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

或直接打开添加有 AI 视觉感知模组的编程环境：[MicroBlocks-AI Camera](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. 算法知识

#### 算法简介

![](image-2.png)

判断图像中是否有Apriltag标签图案，目前支持16H5，25H9，36H11的编码形式，算法运行时需要先指定用哪一种解码方式，不同的编码形式不可以同时检测，但同一种编码可同时检测25个标签。

**注意**：该算法不可以与其他带\*号的算法同时运行

**分类标签**

![](image-3.png)

apriltag标签为一组已经定义好的黑白方块图案，不同的编码形式使用的方块数量是不同的。每个图案都有一个预定义的分类标签值，识别后会返回该值。

自行打印合适规格和尺寸的AprilTag标签。

[Apriltags标签编码-16h5 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/69489d7ebc0ff9d43cc92893281b6731/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-16h5.pdf)

[Apriltags标签编码-25h9 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/2d2a4bff63b80e05f846a60d48b27afd/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-25h9.pdf)

[Apriltags标签编码-36h11 本地下载](https://tosee.readthedocs.io/zh/latest/_downloads/d9438412c56f6105a50ac4057d980c49/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-36h11.pdf)

也可以通过网页在线生成合适规格和尺寸的AprilTag标签并打印：[ArUco markers generator!](https://chev.me/arucogen/)

#### 配置参数

![](image-1.png)

UI界面中可以设置算法性能和编码形式

> **算法性能：**
>
> 根据不同的应用需求来选择合适能算法性能，有3个选项可以设置，分别为“灵敏”、“均衡”、“准确”
>
> 在灵敏模式下识别速度快，帧率高。准确模式下可以检测远处的标签，但速度会降低。默认为均衡性能
>
> **编码形式：**
>
> 当点击按钮时，会循环切换“16H5”，“25H9”，“36H11”三种编码模式，切换后需要重启算法，下次启动时生效

#### **返回结果**

![](image.png)

识别到标签后会返回其坐标、大小和标签编号

当通过主控读取寄存器时，将会返回以下的数据：

| **结果** | **含义**  |
| ------ | ------- |
| 1      | 标签中心x坐标 |
| 2      | 标签中心y坐标 |
| 3      | 标签宽度w   |
| 4      | 标签高度h   |
| 5      | 标签编号    |

#### **使用技巧**

1. 所识别到的标签宽度和高度具有较稳定的输出，可以利用这一点进行距离判断，标签旋转后不会改变其大小，但倾斜时可能会有影响

2. 当需要识别多个标签时，可以关闭坐标线的显示，看起来比较简洁

3. 标签越大，识别的距离就越远

#### **需要使用到的积木说明**

1. **Sentry2 初始化积木**

一个可选参数是 i2c 地址。默认为 96。（0x60）

在使用 Sentry2 前需要先执行初始化积木。通常会放在“当启动时”帽子积木下。

![](init.png)

2. **Sentry2 设置模式积木**

![](apriltag.png)

需要设置模式为apriltag，即AprilTag检测模式。

3. **Sentry2 检测结果**

![](resultblock.png)

使用这个积木前需要确定apriltag算法模式已开启。

这块积木也是用来触发检测的积木，只有先使用这块积木，才能获得检测结果。

返回的结果为当前AprilTag算法识别到的结果数量。

结果的数量会受对应算法的参数设置影响。

4. **Sentry2 检测对象属性**

![](property.png)

返回检测对象id的属性，包括色块中心x坐标、色块中心y坐标、色块宽度w、色块高度h以及标签编号。

### 5. 开始编程

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 AI 视觉感知模块拓展在 CoCube 机器人前方。

2. **载入积木库：**&#x5982;未添加 Sentry2 AI 摄像头库和 CoCube 外接模块库，可先加载CoCube的外接模块库和Sentry2 AI 摄像头库。

3. **摄像头模块初始化：**&#x9009;择启动时先启用外接模块电源，然后等4秒后摄像头模块启动成功再初始化I2C接口，然后再将摄像头的算法模式设置为AprilTag模式。

![](apriltaginit.png)

* **色块识别：**&#x5FAA;环判断是否有检测到AprilTag色块，当检测到的标签数量为1时，输出该标签的5种属性。你可以实时观察该标签的位置、大小以及标签。

![](result.png)

* **编写自己的程序：**&#x6709;了上述的调试代码，不妨自己试试探索更多的功能吧！

