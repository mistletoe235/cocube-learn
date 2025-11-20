### 1. 案例目的

实现微信小程序遥控CoCube机器人。

![](miniapp-control.gif)

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*)
![驾驶挑战定位地图](map.png =300x*)
![个人电脑 或 平板](PC.png =300x*)
![安装有微信的手机](107854029ea28e4dc9a4e6d5a1ca6bb-1.jpg =120x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-1.png)

### 4. 开始编程

微信小程序通过低功耗蓝牙（BLE）与 CoCube 机器人通信。需要先通过 MicroBlocks IDE 为 CoCube 机器人加载接口程序，并根据需要进行自定义编程；然后断开 MicroBlocks IDE 与 CoCube 机器人；最后用微信小程序连接 CoCube 机器人，就可以实现实时遥控啦！

1. **为 CoCube 机器人加载接口程序**

[MicroBlocks - 案例08 微信小程序接口](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27LED%20Display%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27handle_message%27%20%27handle_message%27%0Ato%20handle_message%20%7B%0A%20%20local%20%27msg%27%20%28getLastBroadcast%29%0A%20%20if%20%28%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%201%204%29%20%3D%3D%20%27call%27%29%20%7B%0A%20%20%20%20local%20%27msg%27%20%28%27%5Bdata%3Asplit%5D%27%20msg%20%27%2C%27%29%0A%20%20%20%20local%20%27msg_id%27%20%28at%202%20msg%29%0A%20%20%20%20local%20%27cmd_name%27%20%28at%203%20msg%29%0A%20%20%20%20local%20%27cmd_args%27%20%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%204%29%0A%20%20%20%20local%20%27result%27%20%28callCustomReporter%20cmd_name%20%28to_mb_args%20cmd_args%29%29%0A%20%20%20%20sendBroadcast%20%28%27%5Bdata%3AjoinStrings%5D%27%20%28%27%5Bdata%3AmakeList%5D%27%20%27%5Bresponse%5D%27%20msg_id%20result%29%20%27%2C%27%29%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27to_mb_args%27%20%27to_mb_args%20_%27%20%27auto%27%20%27%27%0Ato%20to_mb_args%20args%20%7B%0A%20%20local%20%27json%27%20%28%27%5Bdata%3Ajoin%5D%27%20%27%5B%27%20%28%27%5Bdata%3AjoinStrings%5D%27%20args%20%27%2C%27%29%20%27%5D%27%29%0A%20%20local%20%27json_count%27%20%28%27%5Bmisc%3AjsonCount%5D%27%20json%20%27%27%29%0A%20%20local%20%27result%27%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20for%20i%20json_count%20%7B%0A%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27%5Bmisc%3AjsonGet%5D%27%20json%20%28%27%5Bdata%3AconvertType%5D%27%20i%20%27string%27%29%29%20result%0A%20%20%7D%0A%20%20return%20result%0A%7D%0A%0Ascript%20275%2054%20%7B%0Acomment%20%27Please%20manually%20add%20the%20CoCube%20library%2C%20%0ACoCube%20Module%20library%2C%20%0Aand%20other%20required%20libraries.%27%0Acomment%20%27%E8%AF%B7%E6%89%8B%E5%8A%A8%E6%B7%BB%E5%8A%A0CoCube%E5%BA%93%E3%80%81CoCube%E5%A4%96%E6%8E%A5%E6%A8%A1%E5%9D%97%E5%BA%93%E5%92%8C%E5%85%B6%E4%BB%96%E9%9C%80%E8%A6%81%E7%9A%84%E5%BA%93%27%0A%7D%0A%0Ascript%20729%20172%20%7B%0AwhenBroadcastReceived%20%27b%27%0A%27ccmodule_gripper%20close%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0Aled_displayImage%20%27sad%27%0A%7D%0A%0Ascript%20540%20178%20%7B%0AwhenBroadcastReceived%20%27a%27%0A%27ccmodule_gripper%20open%27%0A%27set%20display%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aled_displayImage%20%27happy%27%0A%7D%0A%0Ascript%20539%20324%20%7B%0AwhenBroadcastReceived%20%27y%27%0A%27play%20tone%27%20%27nt%3Bg%23%27%200%20500%0A%7D%0A%0Ascript%20273%20324%20%7B%0AwhenBroadcastReceived%20%27x%27%0A%27play%20frequency%27%20261%20500%0A%7D%0A%0Ascript%20275%20174%20%7B%0AwhenBroadcastReceived%20%27%27%0Ahandle_message%0A%7D%0A%0A)

* **连接 CoCube 机器人和 MicroBlocks IDE**

* **自定义功能按键**

打开的示例代码如下图所示：

![](allScripts2111301.png)

其中

“当接收到 \_”帽子积木用于处理摇杆消息，控制 CoCube 机器人移动，无需修改

“当接收到 a”、“当接收到 b”、“当接收到 x”、“当接收到 y”四个帽子积木分别对应微信小程序的A、B、X、Y按键，可根据需要自定义编程。

* **断开 CoCube 机器人 和 MicroBlocks IDE 的连接**

调试完成后，务必记得断开 CoCube 机器人和 MicroBlocks IDE 的连接，否则 CoCube 无法同时被手机连接。

### 5. 微信小程序

1. **打开微信小程序**

   手机打开微信软件，扫描微信小程序码，打开“CoCube机器人”微信小程序。

![](QRcode.jpg)

2. **连接 CoCube 机器人**

  点击“搜索 CoCube 设备”按钮。当第一次使用时，可能会要求开启蓝牙权限，点击确认。

  在出现的设备中，找到自己 CoCube 机器人的蓝牙编号，点击连接

![](107854029ea28e4dc9a4e6d5a1ca6bb.jpg =200x*)
![](a8d4232dc718a44baad3e4e273db437.jpg =200x*)

3. **遥控 CoCube 机器人**

左侧虚拟摇杆可控制 CoCube 机器人底盘运动，杆量大小可调整运动速度，且具备混控功能（例如向左前方滑动，机器人也将向车头左前方转弯）

右侧A\B\X\Y按键分别对应刚刚在 MicroBlocks IDE 中自定义的功能。

![](phonescreen3.jpg)

![](image.png)

### 6. 挑战一下：模拟驾驶

基于模拟驾驶地图，历练一下你的驾驶技术吧！

是否可以直接在 CoCube 中设计一个计时器，看看自己的比赛成绩呢？

![](<success.gif>)

