### 1. 案例目的

CoCube 机器人配合外接模块，能够实现更加复杂的功能，本节介绍了如何编程使用夹爪模块。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*) ![夹爪模块](image.png =300x*) ![个人电脑 或 平板](PC.png =300x*)



### 3. 软件平台

[MicroBlocks——CoCube & CoCube Module](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. 开始编程

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。并将舵机夹爪拓展到 CoCube 机器人上。

2. **载入外接模块积木库：**&#x6309;图示次序点击，加载CoCube的外接模块库。

![](image-2.png)

![](image-3.png)

![](image-4.png)

* **找到夹爪积木：**&#x70B9;击左侧积木库的“CoCube Module”卡片，拖动、“夹爪张开”、“夹爪闭合”、“夹爪角度”三个积木块至右侧工作区。

* **运行夹爪积木：**&#x5DE6;键点击“夹爪张开”或“夹爪闭合”积木块，当积木块周围亮起绿色光环时，表示程序已成功执行，可以看到夹爪张开和闭合。在“夹爪角度”模块里填入（0到70）的角度数字，夹爪转向对应角度。

![](scriptImage257997.png)

### 5. 挑战一下

尝试使用夹爪模块般取一些身边的小物件吧，将配件盒中的小泡沫圆柱，从迷宫地图的C点搬运到E点。

![](scriptImage225548.png)

![](<c7635be25d2040f3c514dd4f9c9cef5d 00_00_00-00_00_30.gif>)

参考示例程序：[MicroBlocks——CoCube案例05 搬运机器人](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%0A%0Ascript%20408%20121%20%7B%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20to%27%20100%20120%2050%0A%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%27ccmodule_gripper%20degree%27%2010%0A%27CoCube%20move%20to%27%20200%20150%2050%0AwaitMillis%201000%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%7D%0A%0A)

