### 1. 案例目的

为 CoCube 机器人编程，通过广播方式实现同步进程。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*) ![个人电脑 或 平板](PC.png =300x*)


### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. 开始编程

在之前的学习中，我们主要接触到了顺序结构，即程序按照预定的顺序逐步执行每一条指令。然而，在实际应用中，我们经常会遇到需要同时运行多个任务的情况。这时，广播功能就显得尤为重要。本案例将来讲解广播功能如何触发信号，以及如何利用这种机制实现两个程序部分的并行执行。

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。

2. **找到积木块：**&#x6253;开“控制”积木库，寻找到“当接受到”和“广播”积木块，将其拖拽到工作区如图所示。广播功能便是通过上述俩积木块实现。

![](image-1.png)

* **执行程序：**&#x901A;过广播功能，可实现控制CoCube机器人运动与LED显示并行运行。执行下述两种程序，体会广播功能带来的区别。

![](allScripts7227041.png)

![](allScripts7476361.png)

### 5. 挑战一下

生活中一定遇到过洒水车，当洒水车工作的时候它在喷水的时候同时会有声音来提醒周边的行人避让，让我们尝试模拟一下洒水车的运行。

![](allScripts475744.png)

![](<broadcast_car.gif>)

参考示例程序：[MicroBlocks——CoCube 案例06 洒水车](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20354%20110%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20733%20107%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Ascroll_text%20%27careful%27%2020%0A%7D%0A%0Ascript%20733%20253%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%2020%0A%7D%0A%7D%0A%0A)
