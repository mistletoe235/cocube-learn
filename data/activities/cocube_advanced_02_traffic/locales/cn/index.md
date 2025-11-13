### 案例目的

为 CoCube 机器人编程，完成交通路牌卡片识别并自动做出相应动作的功能，实现智慧交通创意沙盘。

在过程中了解图像视觉中的人工智能技术。

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 1. 使用材料

![CoCube 机器人 × 1](robot.png =300x*)
![个人电脑 或 平板](PC.png =300x*)
![AI 视觉感知模块 × 1](Sentry2.png =300x*)
![交通路牌卡片 × 10](image-1.png =300x*)

### 2. 软件平台

[MicroBlocks-CoCube](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

或直接打开添加有 AI 视觉感知模组的编程环境：[MicroBlocks-AI Camera](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 3. 算法知识

#### 算法简介

![](image-2.png)

识别图像中是否有指定的卡片图案，返回其卡片坐标、大小、分类标签等信息。包括交通标志类，图形符号类，数字类，其分类标签见下表

**交通标志**

| **分类标签** | **英文标识** | **中文含义** | **分类标签** | **英文标识**    | **中文含义** |
| -------- | -------- | -------- | -------- | ----------- | -------- |
| 1        | Forward  | 前进       | 2        | Left        | 左转       |
| 3        | Right    | 右转       | 4        | Turn Around | 掉头       |
| 5        | Park     | 停车       | 6        | Green       | 绿灯       |
| 7        | Red      | 红灯       | 8        | Speed 40    | 限速40     |
| 9        | Speed 60 | 限速60     | 10       | Speed 80    | 限速80     |

#### 配置参数：无

#### 返回结果

![](image-3.png)

该算法支持多张卡片同时识别，卡片在30度以内的旋转仍然可以识别，角度旋转过大则无法识别

当通过主控读取寄存器时，将会返回以下的数据：

| **结果** | **含义**  |
| ------ | ------- |
| 1      | 卡片中心x坐标 |
| 2      | 卡片中心y坐标 |
| 3      | 卡片宽度w   |
| 4      | 卡片高度h   |
| 5      | 卡片分类标签  |

#### 使用技巧

1. 该算法可以检测到远距离的卡片，但此时并不是用户所期望的检测位置，此时可以通过判断“卡片宽度”来排除那些远距离的卡片，比如只有当卡片宽度>50%时，才会触发接下来的动作行为

2. 图像中有多个卡片时，比如拍成一排的卡片，其检测输出顺序以卡片中心点为基准，从左上角(0,0)点逐行扫描，自上而下，从左到右的顺序输出。

#### **需要使用到的积木说明**

1. **Sentry2 初始化积木**

一个可选参数是 i2c 地址。默认为 96。（0x60）

在使用 Sentry2 前需要先执行初始化积木。通常会放在“当启动时”帽子积木下。

![](init.png)

2. **Sentry2 设置模式积木**

![](<setmodecard.png>)

需要设置模式为card，即交通路牌卡片识别模式。

3. **Sentry2 检测结果**

![](result.png)

使用这个积木前需要确定card算法模式已开启。

这块积木也是用来触发检测的积木，只有先使用这块积木，才能获得检测结果。

返回的结果为当前card算法识别到的结果数量。

4. **Sentry2 检测到卡片**

![](image.png)

返回检测对象id的标签属性。该积木判断识别到的ID为1的对象是否是前进卡片——如果是则返回True，不是则返回False。

5. **Sentry2 检测对象属性**

![](property.png)

返回检测对象id的属性，包括色块中心x坐标、色块中心y坐标、色块宽度w、色块高度h以及标签

其中每一个标签对应不同的卡片类别（如红灯、绿灯、数字等等）



### 4. 开始编程

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。将夹爪模块的金属触点与CoCube的触点通过磁力对应连接。

2. **载入积木库：**&#x52A0;载CoCube的外接模块库和Sentry2 AI 摄像头库，可参考[ 全能套件](https://sjtu-colab.feishu.cn/wiki/J6o5woK8AizzAVkLUkzcG1m1nob#share-PZOqdKGuUod4HYxEQKacjmIpnLf)

3. **摄像头模块初始化：**&#x9009;择启动时先启用外接模块电源，然后等4秒后摄像头模块启动成功再初始化I2C接口，然后再将摄像头的算法模式设置为card模式用于检测卡片信息

![](scriptImage7286394.png)

4. **识别卡片并做逻辑处理：**首先我们需要利用"Sentry2 检测到卡片\*\*对象id ##"积木，该积木的作用是判断id序号为"##"的卡片标签检测的结果是否为"\*\*"，

![](scriptImage7734694.png)

为了方便开始，我们可以设置按下按键A以后再开始判断的逻辑。现在只需要用重复执行和条件判断的方式组合实现用不同的逻辑处理不同卡片标签，如下图所示，包括了红灯停绿灯行和停止的处理方式：

![](scriptImage7817072.png)

### 5. 挑战一下

摄像头card模式还支持其他几种标签识别，包括限速，转向等，尝试把它们也加入进去吧！

![](scriptImage8322899.png)

参考代码：[案例02 智慧交通](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27%0A%0Ascript%20583%2081%20%7B%0AwhenStarted%0A%27Power%20on%20module%27%0AwaitMillis%204000%0A%27Sentry2%20init%27%2096%0A%27Sentry%20turn%27%20%27card%27%20true%0A%7D%0A%0Ascript%20851%2080%20%7B%0AwhenButtonPressed%20%27A%27%0Alocal%20%27var%27%2030%0Aforever%20%7B%0A%20%20if%20%28%27Sentry2%20detect%20card%27%20%27RedLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27GreenLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Park%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Left%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Right%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27right%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27TurnAround%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%201640%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed40%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2017%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed60%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2033%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed80%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2050%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%0A%20%20waitMillis%2030%0A%7D%0A%7D%0A%0A)



