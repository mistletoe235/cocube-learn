### 1. 案例目的

学习掌握 3D 手势模块的使用，并完成更多有趣的互动。

集成高精度、低功耗的手势识别传感器，支持三维空间内的手势识别，实现与机器人的互动控制。

**注意：使用 3D 手势模块时，请勿将 CoCube 机器人放置在 CoMaps 定位地图上。**

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =200x*)
![3D 手势模块](3Dgesture.png =180x*)
![个人电脑 或 平板](PC.png =250x*)

### 3. 软件平台

[MicroBlocks——CoCube & CoCube Module](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. 快速体验

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 3D 手势传感器模块连接到 CoCube 机器人上。

2. **添加积木库：**&#x5728;“机器人”目录下，添加 “CoCube Module库”——“CoCube Module库”中涵盖了 ToF 外接模块的所有功能——“3D 手势传感器已连接”和“3D 手势传感器读取数据”。

![](image-1.png)

![](image.png)

* **3D 手势传感器已连接：**&#x62D6;拽出“3D 手势传感器已连接”积木块，拖拽到工作区，并单击运行。该积木可判断 CoCube 机器人是否已经连接到 3D 手势传感器模块。

![](scriptImage9339087.png)

**注意：由于模块上电需要一定时间，所以第一次运行积木时，有一定概率会报“false”，请多等待一段时间后再测试。**

* **3D 手势传感器读取数据：**&#x62D6;拽出“3D 手势传感器读取数据”积木，用手在前方挥动的同时单击运行，发现很有可能读取到一个“?” (也有可能十分幸运，读取到了left、right、或者其他手势)。模仿 ToF 激光测距传感器的做法，循环读取，也只能读取到一个个“?”。显然这样的做法是不太正确的。

![](scriptImage9438390.png)



![](scriptImage9501061.png)

3D 手势传感器默认支持 **9种手势识别**, 最大更新频率可达 **240Hz**，只有捕捉到手势的情况下才有正确的输入，否则均输出“?”。因此，如果希望实时输出测量结果，你需要编写下面的程序。

![](scriptImage9927037.png)

### 5. 进阶功能

能否编写一个手势控制机器人的程序？例如向一侧挥手，机器人就像该测旋转。

###### 示例程序——要思考+动手后再看呀！

![](scriptImage11809588.png)

### 6. 挑战一下

再尝试用其他手势控制 CoCube 机器人播放音乐、做运动吧！

### 7. 参考代码示例

以上所有教程代码示例：

[MicroBlocks —— 3D 手势模块案例](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20711%2082%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27ccmodule_gesture%20read%27%29%0A%20%20if%20%28var%20%21%3D%20%27%3F%27%29%20%7B%0A%20%20%20%20if%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27left%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204488452%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%20500%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27right%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204291652%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20500%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0A)

