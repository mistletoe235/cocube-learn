试试在手机上用拇指推摇杆：往上推，CoCube 前进；往左推，它就转弯。这次，你会做一个屏幕摇杆，还能用四个按钮换 CoCube 的表情。

打开[第一节做的 App](../cocube_appinventor_01_control-cn/)：蓝牙连接还能用，我们只需换上摇杆和按钮，再让 CoCube 看懂新消息。准备 Android 手机、电脑和 CoCube，找一块开阔的地方试车。

### 1. 在手机上搭摇杆

在 App Inventor 打开第一节项目，用 `Projects → Save project as` 另存为 `CoCubeRemote`，接下来修改副本。它已经包含 BluetoothLE 和 MicroBlocks 扩展。把 `Screen1.Title` 设为 `CoCube Remote`，与下图的界面标题一致。

在 `Designer` 里，按屏幕从上到下修改组件：

1. 保留 `DeviceName`（TextBox）、`ConnectButton`（Button）、`StatusLabel`（Label），以及不可见组件 `BluetoothLE1`、`MicroBlocks1`；删除 `SmileButton` 和 `GoButton`。如果旧按钮的 Click 事件或 Enabled 积木还留在 Blocks 中，也一并删掉。
2. 加一个 Label，命名 `HelpLabel`，将 `Text` 设为 `Drag the joystick. Release to stop.`。
3. 加一个 Canvas，命名 `JoystickCanvas`，将 `Width` 和 `Height` 都设为 `200 pixels`。先<a href="joystick.png" download="joystick.png">下载 joystick.png</a>，把保存的图片上传到 `Media`，设为 Canvas 的 `BackgroundImage`，再把 `PaintColor` 设为橙色，让移动的小圆点更醒目。
4. 加两个 HorizontalArrangement：`TopButtons` 和 `BottomButtons`，两者的 `AlignHorizontal` 都选 `Center`。上排放 `XButton`、`YButton`，下排放 `AButton`、`BButton`。每个按钮的 `Text` 设为对应字母，`Width` 为 `76 pixels`，`Height` 为 `44 pixels`。
5. 在两排按钮下方加 `StopButton`，`Text` 设为 `STOP`。先取消五个新按钮的 `Enabled` 勾选；连接 CoCube 后再启用。
6. 添加不可见组件 Clock，命名 `Clock1`；`TimerInterval` 设为 `150` 毫秒，取消勾选 `TimerAlwaysFires`。

对照下图看看按钮的位置，再检查 Designer 组件列表里的名字。

<p align="center"><img src="01-designer.png" alt="设计器：连接区、200 像素摇杆、X/Y 与 A/B 两排按钮、STOP 和不可见组件" width="455"></p>

### 2. 连上后再启用按钮

切到 **Blocks**。保留第一节的 `when ConnectButton.Click`：它调用 `MicroBlocks1.Connect`，把 `BluetoothLE1` 组件积木接到 `bleExtension`，把 `DeviceName.Text` 接到 `name`。

从 **Variables** 建立四个全局变量：`connected = false`、`active = false`、`leftSpeed = 0`、`rightSpeed = 0`。`connected` 记录手机有没有连上 CoCube，`active` 记录你有没有按住摇杆；另外两个变量分别记住左右轮的速度。

修改第一节的 `when MicroBlocks1.ConnectionChanged(isConnected)`：

- `isConnected` 为真时，把 `global connected` 设为 `true`，将 `StatusLabel.Text` 改为 `Connected`，并将 `AButton`、`BButton`、`XButton`、`YButton`、`StopButton` 的 **Enabled** 都设为 `true`。
- 否则，把 `global connected`、`global active` 设为 `false`，显示 `Disconnected`，再把这五个按钮的 **Enabled** 都设为 `false`。

别把这个事件放进 `ConnectButton.Click`：按下 Connect 后，手机还要等连接成功。再添加 `when Screen1.Initialize`：调用 `JoystickCanvas.Clear`，然后调用 `JoystickCanvas.DrawCircle`，填入 `centerX = 100`、`centerY = 100`、`radius = 12`、`fill = true`，在摇杆中心画一个小圆点。

### 3. 手指往哪推，CoCube 往哪走

200 × 200 的 Canvas 中心是 `(100, 100)`。X 往右增大，Y 却是**往下**增大；所以手指往上推，`100 − Y` 就是正数。两轮同速，就直走；两轮速度不同，就转弯。用下面的算式算出左右轮速度：

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

### 4. 松手就停下

对照下图搭积木：松开摇杆时发送 `stop`；按住摇杆时，每隔一小会儿重发一次轮速。

<p align="center"><img src="03-safety-blocks.png" alt="TouchUp 松手时发送 stop；Clock 在操纵摇杆时重复发送轮速" width="900"></p>

在 `when JoystickCanvas.TouchUp` 中，把 `active` 设为 `false`，两轮速度都设为 `0`；**如果 connected 为真**，就用 `MicroBlocks1.SendMessage` 发送 `stop`。然后清空 Canvas，把圆点重新画在 `(100, 100)`。在 `when StopButton.Click` 中重复这一组操作。

在 `when Clock1.Timer` 中判断 `get global active`：为真就重新发送第三步拼好的轮速消息。只要按着摇杆，哪怕手指没动，Clock 也会每 150 毫秒重发一次，让 CoCube 知道你还在控制它。

最后分别添加四个 **Click** 事件，每个调用 `MicroBlocks1.SendMessage` 发送一个小写字母：`AButton → a`、`BButton → b`、`XButton → x`、`YButton → y`。

### 5. 让 CoCube 听懂摇杆消息

下载 [CoCubeRemote.ubp](CoCubeRemote.ubp)，用 MicroBlocks 连接 CoCube，再打开下载的项目。工作区里应该有处理 `wheel` 和 `stop` 消息的积木，还有处理 `a` / `b` / `x` / `y` 四个表情的积木。

先别断开 MicroBlocks。在里面广播 `a`，CoCube 显示 **happy** 图案了吗？如果没有，检查打开的是否为 `CoCubeRemote.ubp`，以及 CoCube 是否已连接。看到图案后，让程序继续在 CoCube 上运行，再断开 MicroBlocks IDE，让手机来连接。下面两张图展示控制车轮的部分。

第一张图中，最上方“当收到”积木的**中间一格留空**，这样才能收到 `wheel,20,8` 这类速度不断变化的消息。积木用逗号把消息分成三段：确认第一段是 `wheel`，再把后两个数字交给左右轮。每收到一次新速度，用来检查消息有没有中断的计数器就重新从零开始。

![MicroBlocks：接收 wheel,left,right，拆分文本并转换两轮速度](scriptImageRemoteReceive.png)

第二张图每 100 毫秒检查一次：手机还连着吗？有没有收到新的轮速？如果蓝牙断开，或大约 **0.4～0.5 秒**没有新消息，CoCube 就会停下。收到 `stop` 时也会立即刹车；收到 `a`、`b`、`x`、`y` 时，依次显示 **happy**、**sad**、**heart**、**yes**。

![MicroBlocks：BLE 断开或轮速消息超时后刹停](scriptImageRemoteSafety.png)

### 6. 试试你的手机摇杆

先连接**应用预览**，再连接**机器人**：

1. 在电脑上的 App Inventor 选择 **Connect → AI Companion**，用 Android 手机上的 Companion 扫二维码（或输入代码）。实时预览时，手机和电脑应在同一网络。手机上出现控制界面后，状态仍是 `Disconnected`：还没连上机器人。
2. 保持 CoCube 开机、接收程序运行，让 **MicroBlocks IDE** 断开与机器人的 BLE 连接。在手机界面的 `DeviceName` 输入 CoCube 的**完整蓝牙设备名**，点击 Connect；如需蓝牙权限，请允许。状态变成 `Connected` 后，五个按钮就可以使用了。

先按 A/B/X/Y，检查四个图案。第一次测试运动时，在安全开阔处**拿起 CoCube，让车轮悬空**。轻轻向上推动摇杆再松开：两轮应该转动，随后停下。再试左转、右转、后退和斜向转弯，也试试 STOP。都检查通过，再把 CoCube 放到地面上。

在地上摆两个纸标记，试着从中间开过去。手指在中心附近轻轻移动，和推到边缘相比，哪个更好控制？猜猜把算式里的 `/ 4` 改成 `/ 8` 后会怎样，再改一改、试一试。如果转弯方向不对，检查左轮是否用了 `+ turn`、右轮是否用了 `− turn`；如果表情按钮有效但车轮不转，检查 CoCube 是否运行着下载的 `.ubp`，收到的消息是否以 `wheel,` 开头。

### 7. 查看 App Inventor 完成版

完成后下载 [CoCubeRemote.aia](CoCubeRemote.aia)，在 App Inventor 中选择 **Projects → Import project (.aia) from my computer**，对照你的设计与积木。想分享给同学，发送这个文件的下载链接即可。
