### 1. 案例目的

为 CoCube 机器人编程，学习定位垫的坐标定位功能与机器人的定点定向移动，在此期间了解 MicroBlocks 中的输出功能。

### 2. 使用材料

![CoCube 机器人 × 1](images/立体图.png)

![个人电脑 或 平板](images/PC.png)

![CoCube 定位地图](images/image.png)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](images/image-1.png)

### 4. 开始编程

#### 4.1 认识 CoMaps 定位地图

CoMaps 可以为 CoCube 机器人提供精准的定位功能。

![CoMaps 示例——迷宫挑战主题定位地图](images/地图说明.png)

拿出一张迷宫挑战主题定位地图仔细观察：

地图左上角坐标为 (0,0)，右下角坐标为 (300,200)，X轴从左到右（0\~300），Y轴从上到下（0\~200）。

机器人朝 Y 轴正方向时为 0 度，机器人面朝 Y 轴负方向时为180度，逆时针旋转角度增加。

地图上每隔50单位印有虚线，可以辅助快速定位坐标位置。

#### 4.2 **让 CoCube 说出自己的位置**

如何才能获取 CoCube 机器人在 CoMaps 地图上更加精确地位置和角度呢？

1. **连接设备**：通过蓝牙连接的方式，连接 Microblocks IDE 与 CoCube 机器人，并将 CoCube 机器人放置在定位垫上。

2. **使用“说”积木**

连接打开“输出”积木库，拖出“说 123”积木，并点击运行，可以看到在 MicroBlocks IDE 中，积木右上角出现一个小气泡，写有“123”。

这就是“说 \_”积木的功能！它不是让 CoCube 机器人真正去说话，而是会将一些内容呈现在 MicroBlocks IDE 中给你看。

![](images/image-2.png)

![](images/scriptImage1819646.png)

如果想要同时说两个内容，只需要点击“说 \_”积木右侧的小三角，在新增的输入栏中写上需要输出的内容即可。

我们还可以将“运算”积木库中的积木填写进来，CoCube 会将最终结果输出到 MicroBlocks IDE 上。

![](images/scriptImage2100985.png)

![](images/scriptImage2239731.png)

* **输出 CoCube 坐标**

将 CoCube 积木库中的“位置X”、“位置Y”和“方向角”积木拖拽出来，放置在“说 \_”积木中。单击积木，即可说出 CoCube 当下的坐标。

为了实时输出 CoCube 的坐标和角度，可以嵌套一个“重复执行”积木。

![](images/scriptImage2340058.png)

移动一下 CoCube 机器人，观察 MicroBlocks 中的坐标和角度是否跟着变化？

#### 4.3 绘制 CoCube 位置

如果觉得“说 \_”积木不够直观，还可以借助“绘图”积木，在数据图表中显示 CoCube 的坐标。

1. **连接设备：**&#x901A;过蓝牙连接的方式，连接 Microblocks IDE 与 CoCube 机器人，并将 CoCube 机器人放置在定位垫上。

2. **使用“绘图”积木：**&#x7F16;写如下的代码并运行，点击 MicroBlocks IDE 右上方的图标绘制按钮，红色、绿色和蓝色曲线分别代表 CoCube 机器人“位置X”、“位置Y”和“方向角”的数值。

![](images/image-3.png)

#### 4.4 精准移动

&#x20;    在掌握了上述技巧之后，相信你可以自己探索剩下的功能啦。

![](images/image-4.png)

我们重新编写一个 CoCube 机器人绘制正方形轨迹的程序：

![](images/scriptImage3089043.png)



![](images/scriptImage3097549.png)



参考程序示例：[MicroBlocks —— CoCube 案例03 绘制正方形轨迹](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20971%20248%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20rotate%20to%20angle%27%200%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20180%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20270%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%7D%0A%7D%0A%0Ascript%20596%20312%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%7D%0A%7D%0A%0A)

### 1. 挑战一下

使用定位垫的坐标反馈功能与定点移动功能，从迷宫的入口走向出口。

![](images/scriptImage256581.png)

![](<images/c894f182d53640cd5ad5e84a4b741c3f 00_00_01-~1.gif>)

参考示例程序：[MicroBlocks——CoCube案例03 迷宫挑战](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20437%20194%20%7B%0A%27CoCube%20move%20to%27%20124%2022%2040%0A%27CoCube%20move%20to%27%20124%2053%2040%0A%27CoCube%20move%20to%27%20155%2053%2040%0A%27CoCube%20move%20to%27%20156%20118%2040%0A%27CoCube%20move%20to%27%20286%20118%2040%0A%27CoCube%20move%20to%27%20286%20180%2040%0A%27CoCube%20move%20to%27%20223%20180%2040%0A%27CoCube%20move%20to%27%20220%20150%2040%0A%27CoCube%20move%20to%27%20155%20150%2040%0A%27CoCube%20move%20to%27%20155%20180%2040%0A%7D%0A%0A)

你可能会发现，CoCube 在转弯时速度过快，不够平稳，我们可以每到达一个坐标点后，以更小的速度朝向特定角度后，再移动。自己试试看吧！

