### 1. 案例目的

为 CoCube 机器人编程，实现机器人的基础移动功能。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*) ![个人电脑 或 平板](PC.png =300x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. 开始编程

##### CoCube 运动控制

1. **连接设备**：通过蓝牙连接的方式，连接 Microblocks IDE 与 CoCube 机器人。

2. **控制机器人实现前后左右前进：**&#x5728;“CoCube”积木库中，拖出前两个与电机控制相关的积木块。这些积木可以控制 CoCube 机器人的运动方向、速度与运动时间。

![](allScripts112573.png)

* **“电机停转”与“电机刹车”：**&#x7F16;写下面的代码，体会一下“电机刹车”和“电机停转”两者的差别！“电机刹车”会让机器人及时停止，而“电机停转”仅仅是撤掉了电机的动力，由于惯性，CoCube机器人还会继续向前滑动一小段距离。可能在某些特定任务中，你需要用到不同的停止积木哦。

![](allScripts313641.png)

* **控制机器人实现“绕圈运动”**：CoCube 机器人底盘设计为履带造型。通过控制左右轮的速度不同，可以模拟多更多运动轨迹，比如让 CoCube 机器人绕个圈吧！

![](scriptImage671505.png)

![](circle.gif)

参考代码示例：[MicroBlocks——CoCube 案例02 基础运动控制](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20649%20268%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%20929%20263%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20break%27%0A%7D%0A%0Ascript%20648%20456%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27CoCube%20set%20wheel%27%2040%2020%0A%7D%0A%0A)

### 5. 挑战一下

使用电机控制类积木实现操控CoCube完成正方形轨迹运动。

可以试试，机器人以30的速度向左旋转多长时间，可以比较精确地转动90度呢？

![](scriptImage251172.png)

![](GIF.gif)

参考代码示例：

[MicroBlocks——CoCube案例02 方形轨迹运动](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%0A%0Ascript%20559%20174%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0Aforever%20%7B%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bforward%27%2040%201000%0A%20%20waitMillis%20250%0A%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20900%0A%20%20waitMillis%20250%0A%7D%0A%7D%0A%0A)



细心的你可能会发现，经过一段时间，CoCube 向左转积累的误差将变得越来越大，正方形轨迹也逐渐歪曲。如何才能实现更精准的运动呢？

在下一节案例，一起学习定位垫的使用吧！

