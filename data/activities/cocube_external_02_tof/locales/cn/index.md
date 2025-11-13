### 1. 案例目的

学习掌握 ToF 模块的使用，并完成更多有趣的互动。

ToF (Time of Flight)，通过发射红外激光，测量光线到达物体并反射回来的时间，从而获得精确的距离数据。具有优异的光照适应性，且不受目标的反射率影响，能够在各种光照条件、使用场景下稳定工作。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =200x*)
![ToF 外接模块](ToF.png =180x*)
![个人电脑 或 平板](PC.png =250x*)

### 3. 软件平台

[MicroBlocks——CoCube & CoCube Module](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. 快速体验

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 ToF 模块连接到 CoCube 机器人上。

2. **添加积木库：**&#x5728;“机器人”目录下，添加 “CoCube Module库”——“CoCube Module库”中涵盖了 ToF 外接模块的所有功能——“ToF 已连接”和“ToF 距离(mm)”。

![](image-2.png)

![](image.png)

* **ToF 已连接：拖拽出“ToF 已连接”**&#x79EF;木块，拖拽到工作区，并单击运行。该积木可判断 CoCube 机器人是否已经连接到 ToF 激光测距模块。

![](scriptImage6864473.png)

注意：由于模块上电需要一定时间，所以第一次运行积木时，有一定概率会报“false”，再次点击运行即可。

* **ToF 距离(mm)：**&#x62D6;拽出“ToF 距离(mm)”积木，单击运行，即可返回 ToF 激光测距传感器到前方障碍物的距离。

如果希望实时输出测量结果，你可以编写下面的程序。

![](scriptImage6901001.png)

### 5. 进阶功能

能否编写一个控制 CoCube 机器人跟手的程序？当 CoCube 与前方障碍足够远的话，就向前移动；当 CoCube 与障碍距离足够近时，就向后倒车。

###### 示例程序——要思考+动手后再看呀！

![](scriptImage8014138.png)



### 6. 挑战一下

用你手边的材料，搭建一个简易的立体迷宫吧！并尝试编写代码，让 CoCube 机器人借助 ToF 激光测距模块，自主走出迷宫。

### 7. 参考代码示例

以上所有教程代码示例：

[MicroBlocks —— ToF 激光测距模块案例](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20663%20105%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28%28%27ccmodule_ToF%20distance%27%29%20%3E%20120%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204347332%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28%28%27ccmodule_ToF%20distance%27%29%20%3C%2080%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204674692%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%7D%0A%0A)
