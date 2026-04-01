### 1. 案例目的

为 CoCube 机器人编程，在过程中了解图像视觉中的人工智能技术。完成颜色识别与交通路牌卡片识别并自动做出相应动作的功能，最后实现智慧交通创意沙盘。

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 2. 使用材料

![个人电脑 或 平板](PC.png =300x*)
![CoCube机器人 + AI 视觉感知模块](robot.png =300x*)
![交通路牌卡片 × 5](image-3.png =300x*)
![路牌积木组装](assembly.png =300x*)


使用AI视觉感知模块——"Sengo1 AI摄像头"或"Sengo2 AI摄像头"，如图标注所示，圆孔摄像头识别图像，可通过黑色杆状按钮手动切换算法模式，也可通过Microblocks控制调节。

### 3. 软件平台

[MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. 基础知识

#### **需要使用到的积木说明**

1. **Sengo 1 初始化积木**

在使用 摄像头前需要先执行初始化积木。通常会放在"当启动时"帽子积木下。

![](init.png)

2. **Sengo1 设置模式积木**

![](mode_select.png)

内置算法包括"颜色识别" "色块检测" "球类检测" "线条检测" "卡片识别" "人脸识别" "二维码识别"。

本案例中选择"卡片识别"和"颜色识别"算法来作为AI摄像头使用原理讲解。

3. **Sengo1 颜色读取**

![](read_color.png)

![](get_color_rgb.png)

通过读取颜色可以初步识别颜色的类型，返回"red"、"black"等，通过获取颜色的RGB可以进行更精准的颜色记录与复现。

4. **Sengo1 颜色识别区域调整**

![](adjust_area.png)

颜色识别区域是一个矩形区域，可以通过该积木调整颜色检测区域的大小，x和y控制矩形左上角顶点的位置，宽度和高度则控制矩形大小，一般控制该区域位于屏幕中心，为了识别颜色区域更细致可以将矩形大小调低。

![](image-2.png =200x*)
![](image.png =200x*)
![](image-1.png =200x*)

可以注意到检测区域的边框颜色会随着识别的颜色变化而变化，右图则是通过区域调整积木扩大了检测区域。

5. **Sengo1 卡片结果读取**

![](read_card.png)

返回交通卡片的识别结果

![](card_property.png)

返回检测对象id的属性

包括中心x坐标、中心y坐标、宽度w、高度h

对于"Sengo 1"的识别目前仅限于5张交通卡片，分别为："Forward"、"Turn around"、"Left"、"Right"、"Park"，对应识别结果分别为"forward"、"back"、"left"、"right"、"park"。

如图所示，使用过程中，将积木按照该方式进行组装并将卡牌粘贴到乐高积木上，即可获得交通指示牌。

![](traffic_cards.png =200x*)
![](assembly_detail.png =200x*)
![](traffic_card_forward.jpg =200x*)

### 5. 开始编程

1. **连接设备：**通过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人，并将 AI 视觉感知模块拓展在 CoCube 机器人前方。

2. **载入积木库：**添加机器人积木库中的"CoCube Sengo1"或者"CoCube Sengo2"，具体库的选择依据摄像头硬件型号，两者使用上无明显区别，Sengo2具备更多的功能，以下案例教程以Sengo1库演示。

![](image-4.png =300x*)
![](image-5.png =300x*)

3. **颜色识别：**针对颜色识别算法进行了与TFT显示功能的结合应用。具体实现方式是，当摄像头实时捕捉到外部环境中的某一颜色后，提取其中的RGB分量信息，并将该数值传递给TFT显示屏，根据获取到的RGB分量动态调整显示效果，使得预设的"王"字能够随识别到的颜色变化而改变其显示颜色。

![](color_change.png)

4. **摄像头模块初始化：**将"Sengo1 初始化"绑定在"当启动时"下并将算法设置为"卡片识别"，为了后续识别方便，可通过广播设置并行程序，并自定义命令积木"camera"。

![](camera_init.png)

![](parallel_part.png)

5. **交通卡片识别：**在程序中设置条件判断，将摄像头识别到的不同卡片信息与预先设定的运动行为进行一一对应的绑定。当摄像头识别出某一特定卡片时，即可触发驱动cocube执行相应的动作。

![](recognition.png)

#### 使用技巧

> 我们可以发现卡片识别算法可以检测到远距离的卡片，但此时并不是用户所期望的反应位置，此时可以通过判断"卡片宽度"来排除那些远距离的卡片，比如只有当卡片宽度>阈值时，才会触发接下来的动作行为

6. **识别距离调整：**通过在camera积木块最前方增加对卡片宽度的判断，来实现对识别距离的精准把控。

![](scriptImage3274595.png)

![](scriptImage3141615.png)

调整前后对比：

<video width="320" height="240" controls>
  <source src="video2.mp4" type="video/mp4">
</video>

<video width="320" height="240" controls>
  <source src="video1.mp4" type="video/mp4">
</video>

**提问：**为什么不使用这个积木组合来表明Sengo1读取到了卡片的情况呢？

![](judge.png)

### 6. 挑战一下

尝试通过我们的卡牌与积木实现一个小范围的智慧交通沙盘，模拟无人驾驶的过程。

参考代码：[案例 智慧交通 Sengo1版](https://cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Aspec%20%27%20%27%20%27camera%27%20%27camera%27%0Ato%20camera%20%7B%0A%20%20waitUntil%20%28judge%29%0A%20%20local%20%27var%27%20%28%27Sengo1%20read%20card%27%29%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27back%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27judge%27%20%27judge%27%0Ato%20judge%20%7B%0A%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20card%27%29%20%27string%27%29%0A%20%20%20%20if%20%2830%20%3C%20%28%27Sengo1%20get%20card%27%20%27w%27%29%29%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20true%29%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20false%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Ascript%20563%2078%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Card%20Recog%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0Aforever%20%7B%0A%20%20camera%0A%7D%0A%7D%0A%0Ascript%20400%20126%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0A%7D%0A%0Ascript%20971%20231%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20451%20236%20%7B%0Ato%20camera%20%7B%7D%0A%7D%0A%0Ascript%20467%201290%20%28booleanConstant%20false%29%0A%0Ascript%20799%20292%20%7B%0Ato%20judge%20%7B%7D%0A%7D%0A%0A)

[案例 智慧交通 Sengo2版](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27BMP%27%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Aspec%20%27r%27%20%27Sengo2%20read%20card%27%20%27Sengo2%20read%20card%27%0Ato%20%27Sengo2%20read%20card%27%20%7B%0A%20%20if%20%28%28i2cGet%20_sg2_i2c_address%20%28hexToInt%20%2734%27%29%29%20%21%3D%200%29%20%7B%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2720%27%29%206%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2735%27%29%201%0A%20%20%20%20local%20%27var%27%20%28%27_sg2_read_reg_byte%27%20%28hexToInt%20%2788%27%29%29%0A%20%20%20%20if%20%28and%20%28var%20%3C%3D%2010%29%20%28var%20%3E%3D%201%29%29%20%7B%0A%20%20%20%20%20%20return%20%28at%20var%20_sg2_card_classes%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27main%27%20%27main%27%0Ato%20main%20%7B%0A%20%20local%20%27var%27%20%28%27Sengo2%20read%20card%27%29%0A%20%20sayIt%20var%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_around%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20364%2044%20%7B%0Ato%20main%20%7B%7D%0A%7D%0A%0Ascript%20728%2044%20%7B%0AwhenStarted%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20364%20582%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%27Sengo2%20reset%27%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20697%20582%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20main%0A%7D%0A%7D%0A%0A)
