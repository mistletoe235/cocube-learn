这次，我们用 MIT App Inventor 给 CoCube 制作一个手机控制器。按下 `Smile`，CoCube 显示表情；按下 `Go`，它向前走一小段，然后停下。

手机通过蓝牙低功耗（BLE）发送消息，CoCube 收到消息后就会做出相应的动作。

### 1. 准备工作

准备一台 CoCube、一部 Android 手机和一台电脑。

电脑上打开 [MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)和 [MIT App Inventor](https://ai2.appinventor.mit.edu/)，手机上安装 App Inventor Companion。我们会在电脑上搭建积木，用手机试运行。

App Inventor 还需要两个扩展：**BluetoothLE** 负责蓝牙连接，**MicroBlocks** 负责发送消息。先从 [MicroBlocks 的扩展说明](https://wiki.microblocks.fun/en/appinventor/ai2extension)下载这两个 `.aix` 文件。

### 2. 让 CoCube 接收消息

先让 CoCube 认识我们的第一条指令。在 MicroBlocks 中连接 CoCube，添加 **LED Display** 积木库，搭建：

![MicroBlocks：接收到 smile 后显示开心图案](scriptImageSmile.png)

在 MicroBlocks 中发送一次 `smile` 广播。CoCube 显示笑脸了吗？如果没有，先检查这段程序：机器人自己还听不懂 `smile`，手机发来的 `smile` 也不会起作用。

手机发出的 `smile` 必须和机器人接收的 `smile` 完全一样，大小写也不能变。

### 3. 用 App Inventor 连接 CoCube

在 App Inventor 中新建项目，命名为 `CoCubeControlLearn`。点击 **Extension → Import extension**，分别导入准备好的两个 `.aix` 文件，再将它们拖进 **Designer**。接着按顺序放入五个可见组件，组件名称与屏幕文字都用英文：

| 组件 | 名称 | 屏幕上显示什么 |
| --- | --- | --- |
| TextBox | `DeviceName` | 提示文字 `CoCube BLE device name` |
| Button | `ConnectButton` | `Connect` |
| Label | `StatusLabel` | `Disconnected` |
| Button | `SmileButton` | `Smile` |
| Button | `GoButton` | `Go` |

在右侧组件栏中确认名称与表格一致。如果还是 `Button1`、`TextBox1`，选中组件，点击 **Rename**。两个扩展会出现在手机预览图下方的 **Non-visible components** 区域，名字分别是 `BluetoothLE1` 和 `MicroBlocks1`。如果找不到 `MicroBlocks1` 的积木，检查是否把扩展拖进了 Designer。

选中 `SmileButton` 和 `GoButton`，分别在右侧属性中取消勾选 **Enabled**。机器人还没连接时，两个动作按钮都不能点击。

<p align="center"><img src="01-designer.png" alt="英文组件名称与手机界面的 Designer 截图" width="665"></p>

切到 **Blocks**。先看**连接按钮**的积木，再一步步搭出来：

<p align="center"><img src="02-connect-blocks.png" alt="ConnectButton.Click 调用 MicroBlocks1.Connect，并传入蓝牙组件和设备名" width="505"></p>

1. 从 `ConnectButton` 抽屉拖出 **`when ConnectButton.Click`**。
2. 把 `MicroBlocks1` 抽屉中的 **`call MicroBlocks1.Connect`** 放进事件。它有 `bleExtension` 和 `name` 两个空位。
3. 把 `BluetoothLE1` 抽屉中的**组件积木**接到 `bleExtension`；这里不是输入文字 `BluetoothLE1`。
4. 把 `DeviceName` 抽屉中的 **`DeviceName.Text`** 接到 `name`：连接时就会读取输入框里的设备名。

接着看**连接状态**积木。按下 Connect 只是发起连接；只有 `isConnected` 为真，才启用动作按钮：

<p align="center"><img src="03-connection-blocks.png" alt="MicroBlocks1.ConnectionChanged 根据连接状态更新标签及两个按钮" width="515"></p>

1. 拖出独立的 **`when MicroBlocks1.ConnectionChanged`** 事件，放在连接按钮事件旁边。
2. 加入 **if / else**，条件接入事件提供的 **`get isConnected`**。
3. 如果连接成功，将 `StatusLabel.Text` 设为 `Connected`，将 `SmileButton.Enabled` 和 `GoButton.Enabled` 设为 `true`。
4. 否则显示 `Disconnected`，两个按钮的 `Enabled` 都设为 `false`。

`Connect` 的 `name` 需要 CoCube 的**完整蓝牙设备名**，以 MicroBlocks 中看到的名称为准。

**先把 App 显示在手机上，再让手机连接 CoCube。**这是两件事：

1. 让电脑与手机接入同一个 Wi-Fi。在电脑的 App Inventor 顶部菜单点击 **Connect → AI Companion**，用手机上的 Companion 扫描二维码（或输入屏幕上的代码）。看到手机上出现按钮，就完成了**手机预览**；这时还没有连接机器人。

<p align="center"><img src="03-companion-wifi.png" alt="安卓手机上的 App Inventor Companion 实机预览，尚未连接 CoCube" width="300"></p>

图中的 `Disconnected` 和灰色按钮表示手机还没连上 CoCube。

2. 在 MicroBlocks IDE 中**断开与 CoCube 的 BLE 连接**，保持 CoCube 上电。手机首次连接时允许蓝牙权限。
3. 在手机界面的 `DeviceName` 输入框中填写 CoCube 的完整设备名，再按 `Connect`。等 `StatusLabel` 显示 `Connected`，`Smile` 和 `Go` 按钮可以点击，手机就连上了 CoCube。

<p align="center"><img src="04-cocube-connected.png" alt="手机已连接蓝牙名称为 MicroBlocks GDK 的 CoCube，Smile 与 Go 按钮可用" width="300"></p>

如果界面已出现，却始终显示 `Disconnected`，检查机器人设备名和 MicroBlocks 的 BLE 连接，而不是重新扫码。

### 4. 发送第一条消息

回到 **Blocks**，对照下图搭建笑脸按钮：

<p align="center"><img src="04-smile-blocks.png" alt="SmileButton.Click 发送 smile 消息" width="435"></p>

从 `SmileButton` 抽屉拖出 **`when SmileButton.Click`**，放入 **`call MicroBlocks1.SendMessage`**，再把 **Text** 抽屉中的文本块填为 `smile`，接到 `message`。

现在点击手机上的 `Smile`。CoCube 显示笑脸了吗？手机发出 `smile`，CoCube 收到相同的消息，就会显示 `happy` 图案。

试着把 App 里的 `smile` 改成 `Smile`，再按一次。笑脸还会出现吗？改回去后呢？蓝牙虽然连着，消息只要有一个字母不同，CoCube 就不会运行这段积木。

### 5. 让 CoCube 向前走

显示表情不需要担心机器人跑出场地；运动就不同了。我们先让它只走 **400 毫秒**，到时间自动刹车。

最后搭 Go 按钮，结构与 Smile 一样，只是发送的文字不同：

<p align="center"><img src="05-go-blocks.png" alt="GoButton.Click 发送 go 消息" width="432"></p>

在独立的 **`when GoButton.Click`** 事件中调用 **`MicroBlocks1.SendMessage`**，将 `message` 设为 `go`。

在 CoCube 中增加：

![MicroBlocks：接收到 go 后以速度 20 向前移动 400 毫秒](scriptImageGo.png)

在 CoCube 积木库里，选择带有“**持续多少毫秒**”的移动积木。不要选没有时间限制、会一直向前走的那一个。把机器人放在平整、开阔的地面，猜一猜它会走多远，再按手机上的 `Go`。

试着在地面上标出起点，连续测量三次行驶距离。三次结果完全一样吗？把持续时间从 `400` 毫秒改为 `600` 毫秒，又会发生什么？我们现在能控制的是**运动时间**，还不能保证机器人恰好到达某个位置——这就是以后要用到地图定位的原因。

> 在地面上测试，不要靠近桌边；也不要用断开蓝牙的方式停车。

### 6. 遇到问题怎么办？

#### 找不到或连接不上 CoCube

检查手机的蓝牙权限，确认输入的是本机完整设备名，并确保 MicroBlocks IDE 已经断开 BLE。如果找不到扩展的积木，检查两个 `.aix` 文件是否都已导入；必要时重启 Companion。

#### 手机显示 `Connected`，CoCube 却没有反应

先回到第 2 步，在 MicroBlocks 中单独测试 `smile`。机器人端没问题，再核对手机发出的文字，特别是大小写。如果笑脸能显示，前进却没有反应，检查 App 是否发送 `go`，CoCube 是否有接收 `go` 的脚本；也可以在 MicroBlocks 中单独运行限时移动积木，看看电机是否正常。

### 7. 挑战一下

为手机加一个“左转”按钮，让 CoCube 转动一小段时间后停下。先猜转过了多少度，再把机器人放在定位垫上读出实际方向。如果猜错了，应该调整转动速度，还是持续时间？试着修改一项，再测一次。

现在，手机已经会向机器人**发指令**了。下一步，试着让 CoCube 把自己的位置**发回手机**。

### 8. 查看与分享完整作品

完成后对照 [App Inventor 控制器（.aia）](CoCubeControlLearn.aia)和 [CoCube 接收程序（.ubp）](CoCubeControlLearn.ubp)。下载 `.aia` 后，在 App Inventor 选择 **Projects → Import project (.aia) from my computer**；`.ubp` 在 MicroBlocks 中打开。分享完成版，可以发送这两个下载链接；分享自己修改的 App，则用 **Projects → Export selected project (.aia) to my computer** 导出文件。
