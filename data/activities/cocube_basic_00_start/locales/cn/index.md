CoCube 桌面级 AI 教育机器人，由上海交通大学与复旦大学的硕博团队联合研发，旨在为青少年开启通向人工智能的大门，打造一个充满互动性、成就感与趣味性的创作平台。CoCube 通过让学生参与人工智能机器人的设计，从简单的程序编写到复杂的互动系统构建，帮助他们将创意和灵感转化为现实，从而激发学生的好奇心和创造力。

### 一、CoCube平台亮点

![](cocube_platform.png)

### 二、CoCube 技术规格

#### 1. CoCube 机器人本体

![CoCube 机器人前侧](CoCube_front.png =300x*)
![CoCube 机器人后侧](robot.png =300x*)

| **规格** | **参数**                                        |
| ------ | --------------------------------------------- |
| 主控     | ESP32 Xtensa® 32-bit LX6 单/双核处理器              |
| Wi-Fi  | 802.11 b/g/n (2.4Ghz)                         |
| 蓝牙     | 蓝牙 V4.2 BR/EDR 和 BLE 标准                       |
| 移动     | 双履带差速底盘，最大移动速度50单位/s                          |
| 定位     | 高帧率、毫米级绝对定位，角度分辨率为1°                          |
| TFT 屏幕 | 1.54寸 全彩屏幕 @240\*240                          |
| 按键     | 电源键（底部，长按3s开关机）、AB按键（机身后方）                    |
| 蜂鸣器    | 无源蜂鸣器                                         |
| 磁吸接口   | CoCube 4Pin 磁吸接口（I2C + I/O + UART），5V @ 600mA |
| 锂电池    | 450mAh @ 7.4V                                 |
| 充电电压   | Type C接口，5V @ 1.2A                            |
| 续航时间   | 有线编程模式下，无限制蓝牙无线编程模式下，约2小时Wi-Fi模式下，约1小时        |
| 产品尺寸   | 45 × 45 × 38mm                                |
| 产品重量   | 63g                                           |

#### 2. CoMaps 定位地图

CoCube 机器人能够在 CoMaps 定位地图上获取精准位置和角度。

对于标准 CoMaps 而言，整体尺寸约为 A3 纸大小，设计有迷宫挑战、驾驶挑战、火星救援等多种主题。

![CoMaps 示例——迷宫挑战主题定位地图](comap.png)

地图左上角坐标为 (0,0)，右下角坐标为 (300,200)，X轴从左到右（0\~300），Y轴从上到下（0\~200）。

机器人朝 Y 轴正方向时为 0 度，机器人面朝 Y 轴负方向时为180度，逆时针旋转角度增加。

地图上每隔50单位印有虚线，可以快速定位坐标位置。



CoMaps 定位地图支持拓展拼接，以获得更大尺寸的定位范围。

> 如有 CoMaps 定位地图主题或大尺寸 CoMaps 地图定制需求，请咨询 CoCube 团队。



#### 3. CoModules 拓展模块

CoCube 机器人可通过磁吸连接器，极其方便地拓展不同的传感、执行、显示以及 AI 模块。

目前支持的拓展模块如下：

| 拓展模块                 | 图片 | 功能与场景介绍                                                                                                                                                         |
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 舵机夹爪                 | ![](gripper.png =200x*) | 定制高性能舵机，运行不卡顿<br>设计硅胶防滑垫，抓取更顺畅<br>适用于物流搬运等课程与赛事场景。                                                                                                  |
| ToF (Time of Flight) | ![](ToF.png =200x*) | 通过发射红外激光，测量光线到达物体并反射回来的时间，从而获得精确的距离数据。具有优异的光照适应性，且不受目标的反射率影响，能够在各种光照条件、使用场景下稳定工作。                                                         |
| WS2812全彩灯板           | ![](NeoPixel.png =200x*) | 采用 6 x 8 阵列，提供48个独立可控的RGB灯珠，支持多种颜色和动态效果，且能够通过单片机或专用控制器轻松编程控制，支持逐像素调节，表现效果丰富。                                                          |
| 3D手势识别               | ![](3Dgesture.png =200x*) | 集成高精度、低功耗的手势识别传感器，支持三维空间内的手势识别，实现与机器人的互动控制。                                                                                              |
| AI 视觉感知模块            | ![](image-1.png =200x*) | AI 视觉感知模块由先进的 64 位 RISC-V 神经网络处理器 K210 设计，集成了颜色识别、斑点检测、线段检测、卡片识别、人脸识别、AprilTag识别、二维码识别等多种先进的视觉算法，让 AI 视觉应用触手可及。适用于 AI + 机器人创意沙盘等课程与赛事场景。 |
| dlight          | ![](dlight.png =200x*) | xxx |
| ASR          | ![](ASR.png =200x*) | 语音识别模块，内置150条常用命令词，支持自学习唤醒词和命令词。适用于语音对话、智能家居控制等场景 |

> 如有新的 CoModule 拓展模块的场景需求，请联系 CoCube 团队协助开发。

### 三、MicroBlocks 图形化编程平台

CoCube 可基于 MicroBlocks 平台，在浏览器中直接完成图形化编程，无需下载或安装。

MicroBlocks 是受 Scratch 启发，为“物理计算”而生的图形化编程语言。

主页：[MicroBlocks-Home](https://microblocksfun.cn/)

编程环境：[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

不要被吓到，相信我，小学二年级的小朋友只需要5分钟就可以上手如何为 CoCube 编程了！你也可以！

![](image-2.png)

注意：目前 MicroBlocks 平台在PC（Windows、MacOS、Linux）上兼容性较好，暂不推荐用iPad连接CoCube机器人。



#### 1. 连接 CoCube机器人

在MicroBlocks页面中，可以通过两种方式连接CoCube设备。优先推荐无线连接。

**1.1 无线连接** 

1. 务必使用**Chrome**或**Edge**浏览器，打开[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)编程界面。

2. 确保已开启计算机的蓝牙功能

3. 长按开关3秒（开关按键位于机器人底部），给CoCube机器人开机，开启之后，机器人屏幕上会显示三个字符，代表BLE的编号

4. 点击MicroBlocks界面上的“USB”图标，点击无线连接（BLE）

5. 正常情况下，可以识别出“MicroBlocks XXX”或者“CoCube XXX”的字样，XXX与机器人开机显示的编号一致

6. 在Linux系统下，需要额外开启网页的BLE权限：

   在浏览器导航栏输入 **chrome://flags/**

   搜索“Bluetooth”，查找到**Use the new permissions backend for Web Bluetooth**一栏，将Default设置为Enable。

   重启浏览器即可。

![](image-3.png)

**1.2 有线连接**

1. **推荐使用Chrome或Edge浏览器**，打开[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)编程界面

2. 用USB线缆连接电脑和CoCube

3. 长按开关3秒（开关按键位于机器人底部），给CoCube机器人开机

4. 点击MicroBlocks界面上的“USB”图标，点击有线连接

5. 正常情况下，可以识别出串口（在Windows系统下为COM\*\*\*，在MacOS系统下为cu.wchusbserial\*\*\*）

6. 若无法正常识别出串口，则可能是电脑没有安装串口驱动，需要安装CH343串口转USB芯片的驱动


   [MacOS驱动](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html)

   
   [Windows驱动](https://www.wch.cn/downloads/CH341SER_ZIP.html)

7. 若还无法连接，请检查USB线缆是否正常



#### 2. 为CoCube更新固件

第一次使用设备时，请为CoCube更新最新的固件，以获得最佳体验。

1. 有线连接CoCube机器人

2. 点击MicroBlocks IDE的设置，点击“升级主板固件”，选择“CoCube”，选择对应的端口号。

![](image-4.png =300x*)
![](image-5.png =450x*)

* 升级过程大约需要1分钟，在过程中**请保持MicroBlocks IDE位于浏览器显示界面**。期间尽可能**不要有其他任何操作**。否则有可能导致固件升级失败，如果升级失败，请重新升级一次。



