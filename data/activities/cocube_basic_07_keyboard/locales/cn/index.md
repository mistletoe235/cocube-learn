### 1. 案例目的

使用键盘控制CoCube机器人。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*) ![个人电脑 或 平板](PC.png =300x*)


### 3. 软件平台

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-3.png)

### 4. 开始编程

1. **开启键盘事件功能：**&#x901A;过读取键盘信号，可以控制CoCube机器人进行相应的动作，实现遥控功能，首先需要打开键盘事件，点开设置按钮，单击键盘事件，当其前面的√由灰色变为白色便成功。

![](image-4.png)

* **连接设备：**&#x901A;过无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。将夹爪模块拓展到 CoCube 机器人上。

* **为 CoCube 机器人加载接口程序**

从 MicroBlocks 在线示例库中加载接口程序

文件——>打开——>示例——>按板子分类——>CoCube——>CoCube KeyBoard Control

![](image-2.png)

* **自定义功能按键**

打开的示例代码如下图所示：

![](allScripts3466150.png)

同时可以通过自定义按键来实现键盘操&#x63A7;**，**&#x901A;过将“当接收到”和“说”“最后消息”可以监听到键盘事件对应的名称，将名称填入“当接受到”即可确定相应的键盘事件。

![](image.png)

[MicroBlocks - CoCube 键盘控制](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%20%27Ringtone%27%20%27TFT%27%20%27Tone%27%0A%0Ascript%20390%2065%20%7B%0Acomment%20%27%E9%94%AE%E7%9B%98%E6%8E%A7%E5%88%B6CoCube%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E7%A4%BA%E4%BE%8B%E7%A8%8B%E5%BA%8F%27%0Acomment%20%27https%3A%2F%2Fkeyboard.cocube.fun%2F%27%0A%7D%0A%0Ascript%20390%20135%20%7B%0AwhenBroadcastReceived%20%27w%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2050%0A%7D%0A%0Ascript%20750%20135%20%7B%0AwhenBroadcastReceived%20%27w-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20135%20%7B%0AwhenBroadcastReceived%20%271%27%0AstartTone%20262%0A%7D%0A%0Ascript%201200%20135%20%7B%0AwhenBroadcastReceived%20%271-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20235%20%7B%0AwhenBroadcastReceived%20%27s%27%0A%27CoCube%20move%27%20%27cocube%3Bbackward%27%2050%0A%7D%0A%0Ascript%20750%20235%20%7B%0AwhenBroadcastReceived%20%27s-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20235%20%7B%0AwhenBroadcastReceived%20%272%27%0AstartTone%20294%0A%7D%0A%0Ascript%201200%20235%20%7B%0AwhenBroadcastReceived%20%272-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20335%20%7B%0AwhenBroadcastReceived%20%27a%27%0A%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2050%0A%7D%0A%0Ascript%20750%20335%20%7B%0AwhenBroadcastReceived%20%27a-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20335%20%7B%0AwhenBroadcastReceived%20%273%27%0AstartTone%20330%0A%7D%0A%0Ascript%201200%20335%20%7B%0AwhenBroadcastReceived%20%273-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20435%20%7B%0AwhenBroadcastReceived%20%27d%27%0A%27CoCube%20rotate%27%20%27cocube%3Bright%27%2050%0A%7D%0A%0Ascript%20750%20435%20%7B%0AwhenBroadcastReceived%20%27d-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20435%20%7B%0AwhenBroadcastReceived%20%274%27%0AstartTone%20349%0A%7D%0A%0Ascript%201200%20435%20%7B%0AwhenBroadcastReceived%20%274-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20535%20%7B%0AwhenBroadcastReceived%20%27q%27%0A%27set%20display%20color%27%20%28makeColor%20255%200%200%29%0Aled_displayImage%20%27sad%27%0A%27play%20ringtone%27%20%27Punish%3Ad%3D16%2Co%3D5%2Cb%3D150%3A%20g5%2Ce5%2Cc5%2Cd5%2Cc5%2Cb4%2Ca4%2Cg4%27%0A%7D%0A%0Ascript%201000%20535%20%7B%0AwhenBroadcastReceived%20%275%27%0AstartTone%20392%0A%7D%0A%0Ascript%201200%20535%20%7B%0AwhenBroadcastReceived%20%275-up%27%0AstopTone%0A%7D%0A%0Ascript%201000%20635%20%7B%0AwhenBroadcastReceived%20%276%27%0AstartTone%20440%0A%7D%0A%0Ascript%201200%20635%20%7B%0AwhenBroadcastReceived%20%276-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20685%20%7B%0AwhenBroadcastReceived%20%27e%27%0A%27set%20display%20color%27%20%28makeColor%200%20255%200%29%0Aled_displayImage%20%27happy%27%0A%27play%20ringtone%27%20%27Reward%3Ad%3D16%2Co%3D6%2Cb%3D180%3A%20e6%2Cg6%2Ca6%2Cb6%2Ce7%2Cd7%2Cc7%2Cb6%2Ca6%27%0A%7D%0A%0Ascript%201000%20735%20%7B%0AwhenBroadcastReceived%20%277%27%0AstartTone%20494%0A%7D%0A%0Ascript%201200%20735%20%7B%0AwhenBroadcastReceived%20%277-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20835%20%7B%0AwhenBroadcastReceived%20%27j%27%0A%27ccmodule_gripper%20close%27%0A%7D%0A%0Ascript%20600%20835%20%7B%0AwhenBroadcastReceived%20%27k%27%0A%27ccmodule_gripper%20open%27%0A%7D%0A%0A)

### 5. 进阶功能

除在MicroBlocks IDE中开启键盘事件，控制 CoCube 机器人外，也可以通过下方的网页控制 CoCube 机器人。

![](image-1.png)

确保给 CoCube 机器人编写好键盘控制的程序后，断开 CoCube 机器人与 MicroBlocks IDE的连接，然后打开下方链接，并重新通过 BLE 无线连接 CoCube 机器人。

[键盘页面](https://keyboard.cocube.fun/)

### 6. 挑战一下

自由发挥，使用键盘控制功能设计一个黄金矿工小游戏吧。

![](<162321b34eaf25ab4ae8a7a9af7fd43e 00_00_00-00_00_30.gif>)

