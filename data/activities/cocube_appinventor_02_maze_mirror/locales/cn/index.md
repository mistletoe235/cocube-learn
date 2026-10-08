CoCube 走在迷宫里，手机上也有一张相同的迷宫图。能不能让手机上的小圆点跟着真实的机器人移动？[上一节](../cocube_appinventor_01_control-cn/)，手机向 CoCube 发送了 `smile` 和 `go`。这一次，换 CoCube 把自己的位置发回来。

这一节，我们让真实迷宫里的 CoCube 和手机上的地图同步：你移动机器人，手机上的圆点就跟着走。

### 1. 摆好迷宫

准备 CoCube、量产版迷宫定位垫、Android 手机，以及上一节的 App Inventor 和 MicroBlocks 项目。把定位垫平放，让印有 **A** 的一角位于左上方。先用**手**移动 CoCube，暂时不用 Go。

这张[手机迷宫图片](maze-map.png)由[量产版迷宫原图](comaps-maze-map.png)按坐标范围裁出，宽 300、高 200 像素。定位垫上的 X 从左到右是 0～300，Y 从上到下是 0～200。App Inventor 的 Canvas 也从左上角开始数，所以 CoCube 报告的 `(X, Y)` 可以直接用来画圆点。如果把定位垫转了方向，手机上的圆点就对不上实际位置。

### 2. 让 CoCube 报告位置

在 MicroBlocks 中打开上一节的 CoCube 程序，保留 `smile` 和 `go` 的接收脚本，再加入下面这段：

![CoCube 位于定位垫上时，每隔半秒发送一次当前位置的 MicroBlocks 积木](scriptImagePosition.png)

CoCube 连上手机、位于定位垫上时，每隔 500 毫秒发送一次类似 `pos,125.5,62.25` 的消息。`pos` 表示位置，后面两个数字分别是 X 和 Y，坐标可以带小数；逗号让手机能把三部分分开。CoCube 离开定位垫时，改发 `off-map`。打开手机应用前，先在 MicroBlocks 中试试 **CoCube on the mat**、**CoCube position_X** 和 **CoCube position_Y**：用手移动机器人，数字会变化吗？

确认新脚本已经在 CoCube 上运行，然后断开 MicroBlocks 与 CoCube 的连接，让手机连接它。

### 3. 在手机上放一张迷宫图

在 App Inventor 中继续上一节的控制器项目。在 `StatusLabel` 和两个操作按钮之间加入一个 **Canvas**，重命名为 `MapCanvas`。先<a href="maze-map.png" download="maze-map.png">下载 maze-map.png</a>，再把图片上传到 **Media**，设置 `MapCanvas.BackgroundImage` 为 `maze-map.png`；**Width** 设为 **300 pixels**、**Height** 设为 **200 pixels**，**PaintColor** 设为红色。在画布下方加入 **Label**，命名为 `LocationLabel`，文字设为 `Place CoCube on the maze map`。

对照下图检查设计器。保留 **Non-visible components** 中的 `BluetoothLE1` 和 `MicroBlocks1`，连接还要用到它们。

<p align="center"><img src="01-designer.png" alt="App Inventor 设计器中有迷宫画布和位置文字" width="820"></p>

### 4. 画出位置圆点

切到 **Blocks**，新增独立的 **`when MicroBlocks1.MicroBlocksMessageReceived`** 事件，不要把它放在 Connect 按钮的事件里。先对照下图，再搭积木：

<p align="center"><img src="02-blocks.png" alt="App Inventor 接收位置消息并拆出 X、Y，重新绘制圆点" width="720"></p>

1. 如果 `message = off-map`，执行 `MapCanvas.Clear`，把 `LocationLabel.Text` 设为 `Place CoCube on the maze map`。
2. 否则用逗号拆开 `message`。如果第 **1** 项是 `pos`，清空画布，再把第 **2** 项和第 **3** 项拼成 `X: …    Y: …` 显示在标签中。
3. 调用 `MapCanvas.DrawCircle`：第 **2** 项接 `centerX`，第 **3** 项接 `centerY`，`radius` 填 **5**，`fill` 选 **true**。

列表从 **1** 开始数，所以 X 是第 2 项，Y 是第 3 项。`Clear` 会擦掉旧圆点，不会擦掉迷宫背景。这样画布显示的是 CoCube 的**当前位置**，而不是一路留下的轨迹。

### 5. 看看红点跟得上吗？

先让手机显示你的 App，再连接 CoCube：

1. 电脑和手机接入同一个 Wi-Fi。在 App Inventor 选择 **Connect → AI Companion**，用手机上的 Companion 扫二维码；也可以输入六位码，再点击 **connect with code**。等迷宫界面出现在手机上。
2. 保持 CoCube 开机、位置发送脚本运行，让电脑的 MicroBlocks 断开与它的 BLE 连接。在手机的 `DeviceName` 中输入 MicroBlocks 显示的完整设备名，例如 `CoCube QCX`，点击 Connect。状态变成 `Connected` 后，位置圆点就会出现。

如果手机还停在六位码页面、电脑提示连接失败，关闭并重新打开 Companion，在电脑的 **Connect** 菜单中选择 **Reset Connection**，再选择 **AI Companion**，用新码连接。输入框里只保留这一次的六位码。

把 CoCube 放在真实地图的 **A** 点附近，手机上的红点也在 **A** 附近吗？再用手缓缓移动到 **B** 和 **C**。也可以从 **E** 等方便放置的位置开始。看手机之前，先猜猜：X 和 Y 哪个变化更大？除了红点，也观察图片下方的数字。

把 CoCube 从定位垫上拿起来。圆点应该消失，标签应该提示你放回迷宫。如果圆点不动，先在 MicroBlocks 里看两个 **CoCube position** 数字是否变化；如果数字会变，再检查手机连接状态和 `pos,` 消息。如果圆点朝反方向走，看看定位垫有没有放反，并确认 `centerX` 用第 2 项、`centerY` 用第 3 项。

用手移动测试成功后再试 Go 按钮，让 CoCube 远离垫子边缘：Go 只让机器人走一段**时间**，不会让它自动停在某个地点。迷宫线也不会挡住机器人；这张手机地图只会显示它的位置，不会替它找路。

### 6. 轮到你

A、B、C 三处中，哪里的 X 和 Y 最接近？记下三处的坐标，再和猜测对照。还可以修改 `MapCanvas.DrawCircle` 的 `radius`：圆点多大才能看清机器人，同时又不遮住迷宫路线？

### 7. 查看与分享完整作品

完成后对照 [App Inventor 迷宫项目（.aia）](CoCubeMazeMirror.aia)和 [CoCube MicroBlocks 项目（.ubp）](CoCubeMazeMirror.ubp)。分享自己的版本时，用 **Projects → Export selected project (.aia) to my computer** 导出项目文件；同学在 App Inventor 中导入 `.aia`，在 MicroBlocks 中打开 `.ubp`。
