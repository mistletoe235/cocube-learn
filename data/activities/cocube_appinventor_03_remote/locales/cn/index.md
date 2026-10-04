如果能用拇指推着摇杆，让 CoCube 前进、后退，还能边走边转弯，会是什么体验？这一节，我们来做一个手机遥控器：摇杆控制车轮，四个按键切换屏幕图案。

从[第一节 App Inventor 教程](../cocube_appinventor_01_control-cn/)的项目开始。保留原来的蓝牙连接，换上新的控制界面，并让 CoCube 接收摇杆指令。准备 Android 手机、电脑、CoCube 和一块平坦开阔的测试区域。

### 1. 搭好遥控界面

在 App Inventor 打开第一节项目，用 `Projects → Save project as` 另存为 `CoCubeRemote`，接下来修改副本。它已经包含 BluetoothLE 和 MicroBlocks 扩展。把 `Screen1.Title` 设为 `CoCube Remote`，与下图的界面标题一致。

在 `Designer` 里，按屏幕从上到下修改组件：

1. 保留 `DeviceName`（TextBox）、`ConnectButton`（Button）、`StatusLabel`（Label），以及不可见组件 `BluetoothLE1`、`MicroBlocks1`；删除 `SmileButton` 和 `GoButton`。如果旧按钮的 Click 事件或 Enabled 积木还留在 Blocks 中，也一并删掉。
2. 加一个 Label，命名 `HelpLabel`，将 `Text` 设为 `Drag the joystick. Release to stop.`。
3. 加一个 Canvas，命名 `JoystickCanvas`，将 `Width` 和 `Height` 都设为 `200 pixels`。先<a href="joystick.png" download="joystick.png">下载 joystick.png</a>，把保存的图片上传到 `Media`，设为 Canvas 的 `BackgroundImage`，再把 `PaintColor` 设为橙色，让移动的小圆点更醒目。
4. 加两个 HorizontalArrangement：`TopButtons` 和 `BottomButtons`，两者的 `AlignHorizontal` 都选 `Center`。上排放 `XButton`、`YButton`，下排放 `AButton`、`BButton`。每个按钮的 `Text` 设为对应字母，`Width` 为 `76 pixels`，`Height` 为 `44 pixels`。
5. 在两排按钮下方加 `StopButton`，`Text` 设为 `STOP`。先取消五个新按钮的 `Enabled` 勾选；连接 CoCube 后再启用。
6. 添加不可见组件 Clock，命名 `Clock1`；`TimerInterval` 设为 `150` 毫秒，取消勾选 `TimerAlwaysFires`。

对照下图检查界面布局；组件名称要在 Designer 的组件列表里核对。

<p align="center"><img src="01-designer.png" alt="设计器：连接区、200 像素摇杆、X/Y 与 A/B 两排按钮、STOP 和不可见组件" width="455"></p>

### 2. 让应用知道何时连上机器人

切到 **Blocks**。保留第一节的 `when ConnectButton.Click`：它调用 `MicroBlocks1.Connect`，把 `BluetoothLE1` 组件积木接到 `bleExtension`，把 `DeviceName.Text` 接到 `name`。

从 **Variables** 建立四个全局变量：`connected = false`、`active = false`、`leftSpeed = 0`、`rightSpeed = 0`。`connected` 表示手机是否已通过 BLE 连上机器人；`active` 表示手指正在操纵摇杆。

修改第一节的 `when MicroBlocks1.ConnectionChanged(isConnected)`：

- `isConnected` 为真时，把 `global connected` 设为 `true`，将 `StatusLabel.Text` 改为 `Connected`，并将 `AButton`、`BButton`、`XButton`、`YButton`、`StopButton` 的 **Enabled** 都设为 `true`。
- 否则，把 `global connected`、`global active` 设为 `false`，显示 `Disconnected`，再把这五个按钮的 **Enabled** 都设为 `false`。

这个事件与 `ConnectButton.Click` 是并列的：按下 Connect，不代表已经连上。再添加 `when Screen1.Initialize`：调用 `JoystickCanvas.Clear`，然后调用 `JoystickCanvas.DrawCircle`，填入 `centerX = 100`、`centerY = 100`、`radius = 12`、`fill = true`，画出起始的小圆点。

### 3. 用手指控制左右轮

200 × 200 的 Canvas 中心是 `(100, 100)`。X 往右增大，Y 却是**往下**增大；所以手指往上推，`100 − Y` 就是正数。我们把前进量和转弯量组合起来：

```text
forward = 100 − Y
turn = X − 100
leftSpeed = round(
  (forward + turn) / 4
)
rightSpeed = round(
  (forward − turn) / 4
)
```

移到 `(100, 60)`，两轮都是 `10`，机器人向前走；移到 `(140, 100)`，左轮 `10`、右轮 `−10`，机器人原地转弯。那移到 `(140, 60)` 时，两轮各是多少？除以 4 后，即使移到画布角落，轮速也不会超出 `−50`～`50`。

对照图片，按下面的顺序搭 **`when JoystickCanvas.Touched`**：

<p align="center"><img src="02-joystick-blocks.png" alt="Touched：判断连接、计算左右轮速度、画圆点、发送 wheel,left,right" width="900"></p>

1. 在事件中放一个 **if**，条件填 `get global connected`。后面的操作全部放进这个 if 中。
2. 把 `global leftSpeed` 设为 `round(((100 − get y) + (get x − 100)) / 4)`，把 `global rightSpeed` 设为 `round(((100 − get y) − (get x − 100)) / 4)`。`round` 在 **Math** 中；`get x`、`get y` 要用事件给出的变量积木，不能输入字母文本。
3. 把 `global active` 设为 `true`；调用 `JoystickCanvas.Clear`，然后调用 `JoystickCanvas.DrawCircle`，参数为 `centerX = get x`、`centerY = get y`、`radius = 12`、`fill = true`。
4. 调用 `MicroBlocks1.SendMessage`。在 `message` 处使用 **Text → join**，拼接四项：文本 `wheel,`、`get global leftSpeed`、文本 `,`、`get global rightSpeed`。发送的内容形如 `wheel,20,8`，两个数字依次是左轮、右轮速度。

接着添加 `when JoystickCanvas.Dragged`：复制 **Touched** 内部的积木，包括 `if connected`，但把所有 `get x` 换成 `get currentX`，所有 `get y` 换成 `get currentY`。触碰时先发送一次轮速，拖动时继续更新。

### 4. 松手停车，持续发送

对照下图：上半部分负责松手停车，下半部分是定时重发轮速。

<p align="center"><img src="03-safety-blocks.png" alt="TouchUp 松手时发送 stop；Clock 在操纵摇杆时重复发送轮速" width="900"></p>

在 `when JoystickCanvas.TouchUp` 中，把 `active` 设为 `false`，两轮速度都设为 `0`；**如果 connected 为真**，就用 `MicroBlocks1.SendMessage` 发送 `stop`。然后清空 Canvas，把圆点重新画在 `(100, 100)`。在 `when StopButton.Click` 中重复这一组操作。

在 `when Clock1.Timer` 中判断 `get global active`：为真就重新发送第三步拼好的轮速消息。只要按着摇杆，哪怕手指没动，Clock 也会每 150 毫秒重发一次。

最后分别添加四个 **Click** 事件，每个调用 `MicroBlocks1.SendMessage` 发送一个小写字母：`AButton → a`、`BButton → b`、`XButton → x`、`YButton → y`。

### 5. 把接收程序交给 CoCube

下载 [CoCubeRemote.ubp](CoCubeRemote.ubp)，用 MicroBlocks 连接 CoCube，打开下载的项目。检查工作区里有轮速接收脚本、`stop` 接收脚本，以及 `a` / `b` / `x` / `y` 四个表情脚本。先不要断开 MicroBlocks：在里面广播 `a`，看看 CoCube 是否显示 **happy** 图案。如果没有，检查打开的是否为 `CoCubeRemote.ubp`，以及机器人是否已连接。看到图案后，让程序继续在 CoCube 上运行，再断开 MicroBlocks IDE，准备让手机连接。下面的两张图只展示完整项目中的驾驶部分。

第一个脚本的**消息接收槽留空**，用来接收数字不断变化的 `wheel,left,right` 文本。它按逗号拆分消息，确认一共有三段、第一段是 `wheel`，再把后两段转成数字并更新左右轮速度。每收到一条有效轮速消息，安全计数器就会归零。

![MicroBlocks：接收 wheel,left,right，拆分文本并转换两轮速度](scriptImageRemoteReceive.png)

另一个脚本每 100 毫秒检查 BLE 连接和安全计数器。如果 BLE 断开，或大约 **0.4～0.5 秒**没有收到新的轮速消息，CoCube 就会刹停。独立的 `stop` 接收脚本负责立即刹车；四个字母接收脚本分别显示 **happy**、**sad**、**heart**、**yes**。

![MicroBlocks：BLE 断开或轮速消息超时后刹停](scriptImageRemoteSafety.png)

### 6. 在手机上试驾

先连接**应用预览**，再连接**机器人**：

1. 在电脑上的 App Inventor 选择 **Connect → AI Companion**，用 Android 手机上的 Companion 扫二维码（或输入代码）。实时预览时，手机和电脑应在同一网络。手机上出现控制界面后，状态仍是 `Disconnected`：还没连上机器人。
2. 保持 CoCube 开机、接收程序运行，让 **MicroBlocks IDE** 断开与机器人的 BLE 连接。在手机界面的 `DeviceName` 输入 CoCube 的**完整蓝牙设备名**，点击 Connect；如需蓝牙权限，请允许。状态变成 `Connected` 后，五个按钮就可以使用了。

先按 A/B/X/Y，检查四个图案。第一次测试运动时，在安全开阔处**拿起 CoCube，让车轮悬空**。轻轻向上推动摇杆再松开：两轮应该转动，随后停下。再试左转、右转、后退和斜向转弯，也试试 STOP。都检查通过，再把 CoCube 放到地面上。

在地上摆两个纸标记，试着从中间开过去。在中心附近小幅移动，还是拖远一点，更容易控制？先预测把 `/ 4` 改成 `/ 8` 后轮速会怎样，再修改并比较。如果转弯方向不对，检查左轮是否用了 `+ turn`、右轮是否用了 `− turn`；如果按钮有效但车轮不转，检查 CoCube 是否运行着下载的 `.ubp`，收到的消息是否以 `wheel,` 开头。

### 7. 查看 App Inventor 完成版

完成后下载 [CoCubeRemote.aia](CoCubeRemote.aia)，在 App Inventor 中选择 **Projects → Import project (.aia) from my computer**，对照你的设计与积木。想分享给同学，发送这个文件的下载链接即可。
