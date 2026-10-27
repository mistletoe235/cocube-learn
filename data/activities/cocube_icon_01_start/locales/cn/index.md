<h2 class="tutorial-title"><span>CoCube ICON</span> <span>编程快速入门</span></h2>

CoCube ICON 用图标积木表示动作。孩子可以把图标按顺序拼起来，让机器人移动、转弯、播放音符和显示图案。

<p class="tutorial-actions"><a class="c_button button tutorial-launch" href="https://icon.cocube.fun/" target="_blank" rel="noopener"><span>打开 ICON 图标编程</span></a></p>

### 1. 连接 CoCube

#### 电脑浏览器

推荐使用支持蓝牙的电脑和 Chrome 或 Edge 浏览器。

1. 打开 CoCube 电源和电脑蓝牙。
2. 打开 ICON，点击右上角蓝色连接按钮，选择蓝牙。
3. 在浏览器的设备列表中选择对应的 CoCube，点击配对或连接。
4. 等待页面显示已连接，再开始测试积木。

电脑也可以用 USB 数据线连接，在连接菜单中选择 USB。找不到机器人时，检查电源、蓝牙或数据线，再重新扫描。

#### 手机或平板

安装 CoCube App 后，默认进入 MicroBlocks 积木编程。点击工具栏中的编程方式切换按钮，进入 ICON，再点击右上角连接机器人。iOS 使用蓝牙；Android 可以选择蓝牙或 USB。

<div class="tutorial-apps"><div><h4>Android App</h4><a href="https://wiki.cocube.fun/app/apk"><img src="cocube-android.png" alt="CoCube Android 下载二维码" width="180"></a><p><a href="https://wiki.cocube.fun/app/apk">下载 Android 安装包</a></p></div><div><h4>iOS App</h4><a href="https://apps.apple.com/app/id6752908157"><img src="cocube-ios.png" alt="CoCube iOS 下载二维码" width="180"></a><p><a href="https://apps.apple.com/app/id6752908157">打开 App Store</a></p></div></div>

### 2. 认识界面

<img class="tutorial-image" src="icon-interface.png" alt="ICON 界面：左上角项目菜单、右上角连接按钮、中央画布、绿色运行按钮和底部积木栏">

- **左上角 Home**：打开项目菜单，用于新建、打开、保存、撤回和切换语言。
- **右上角连接按钮**：连接 CoCube，查看连接状态。
- **中间画布**：把积木从左到右拼起来。
- **绿色运行按钮**：运行从开始积木出发的程序。
- **底部积木栏**：左右滑动查看更多积木，拖到画布中使用。
- **左下角缩放按钮**：一起调整画布和积木栏的积木大小。

### 3. 第一个程序：前进一格

使用移动积木前，先把 CoCube 放在定位垫的格子中心，并让前方留出一格空间。

1. 找到画布中的黄色开始积木。
2. 从底部拖出向上箭头的前进积木，接到开始积木右侧。
3. 点击前进积木下方的数字框，选择 **1**。
4. 点击绿色运行按钮，观察机器人前进一格。

图中的“开始 → 前进 1”就是这个程序。前进和后退的格数可以直接选择，不需要输入键盘。

### 4. 添加动作和测试

继续加入转弯、等待、重复、声音或显示积木。点击积木的参数框，可以修改数字、颜色、音符等设置。

连接成功并完成程序准备后，可以单击底部的动作积木进行测试，也可以单击画布中的积木组合运行。开始完整任务时，使用绿色运行按钮。

事件积木可以启动多段程序。例如，让一段程序控制移动，另一段程序在 ToF 检测到物体时发出声音。ToF 和 DLight 事件需要连接对应模块。

### 5. 图标积木速查

#### 事件与程序控制

<table class="icon-block-table"><thead><tr><th scope="col">图标</th><th scope="col">积木</th><th scope="col">功能</th></tr></thead><tbody><tr><td><img src="01-start.png" alt="开始" width="76" height="64"></td><td><strong>开始</strong></td><td>运行从这里开始的程序。</td></tr><tr><td><img src="02-button-a.png" alt="按键触发" width="76" height="64"></td><td><strong>按键触发</strong></td><td>按下选定的 CoCube 按键时，执行后续程序。</td></tr><tr><td><img src="03-receive-message.png" alt="接收消息" width="76" height="64"></td><td><strong>接收消息</strong></td><td>收到指定颜色的消息时，执行后续程序。</td></tr><tr><td><img src="04-send-message.png" alt="发送消息" width="76" height="64"></td><td><strong>发送消息</strong></td><td>广播指定颜色的消息，触发其他程序。</td></tr><tr><td><img src="05-wait.png" alt="等待" width="76" height="64"></td><td><strong>等待</strong></td><td>等待指定时间，再继续运行。</td></tr><tr><td><img src="06-forever.png" alt="永远循环" width="76" height="64"></td><td><strong>永远循环</strong></td><td>不断重复内部的积木，直到停止程序。</td></tr><tr><td><img src="07-repeat.png" alt="重复执行" width="76" height="64"></td><td><strong>重复执行</strong></td><td>按指定次数重复内部的积木。</td></tr><tr><td><img src="08-stop.png" alt="停止" width="76" height="64"></td><td><strong>停止</strong></td><td>停止正在运行的程序。</td></tr></tbody></table>

#### 声音与屏幕

<table class="icon-block-table"><thead><tr><th scope="col">图标</th><th scope="col">积木</th><th scope="col">功能</th></tr></thead><tbody><tr><td><img src="09-play-note.png" alt="播放音符" width="76" height="64"></td><td><strong>播放音符</strong></td><td>选择音名和八度，播放一个音符。</td></tr><tr><td><img src="10-draw-screen.png" alt="绘制图案" width="76" height="64"></td><td><strong>绘制图案</strong></td><td>编辑并显示一个单色点阵图案。</td></tr><tr><td><img src="11-screen-color.png" alt="设置显示颜色" width="76" height="64"></td><td><strong>设置显示颜色</strong></td><td>选择单色图案使用的颜色。</td></tr><tr><td><img src="12-screen-image.png" alt="显示内置图像" width="76" height="64"></td><td><strong>显示内置图像</strong></td><td>选择并显示机器人内置的图片。</td></tr><tr><td><img src="13-color-matrix.png" alt="彩色点阵" width="76" height="64"></td><td><strong>彩色点阵</strong></td><td>为各个色块选色，绘制彩色图案。</td></tr></tbody></table>

#### 移动与地图定位

<table class="icon-block-table"><thead><tr><th scope="col">图标</th><th scope="col">积木</th><th scope="col">功能</th></tr></thead><tbody><tr><td><img src="14-forward.png" alt="前进" width="76" height="64"></td><td><strong>前进</strong></td><td>沿当前方向向前移动指定格数。</td></tr><tr><td><img src="15-backward.png" alt="后退" width="76" height="64"></td><td><strong>后退</strong></td><td>沿当前方向向后移动指定格数。</td></tr><tr><td><img src="16-turn-left.png" alt="左转" width="76" height="64"></td><td><strong>左转</strong></td><td>向左转指定次数，每次 90°。</td></tr><tr><td><img src="17-turn-right.png" alt="右转" width="76" height="64"></td><td><strong>右转</strong></td><td>向右转指定次数，每次 90°。</td></tr><tr><td><img src="18-go-to-position.png" alt="移动到坐标" width="76" height="64"></td><td><strong>移动到坐标</strong></td><td>利用定位垫，移动到指定的 X、Y 坐标。</td></tr><tr><td><img src="19-face-direction.png" alt="朝向角度" width="76" height="64"></td><td><strong>朝向角度</strong></td><td>在 ICON 中，上为 0°、右为 90°、下为 180°、左为 270°。</td></tr></tbody></table>

#### 夹爪与传感器

<table class="icon-block-table"><thead><tr><th scope="col">图标</th><th scope="col">积木</th><th scope="col">功能</th></tr></thead><tbody><tr><td><img src="20-gripper-open.png" alt="张开夹爪" width="76" height="64"></td><td><strong>张开夹爪</strong></td><td>让舵机夹爪模块张开。</td></tr><tr><td><img src="21-gripper-close.png" alt="闭合夹爪" width="76" height="64"></td><td><strong>闭合夹爪</strong></td><td>让舵机夹爪模块闭合。</td></tr><tr><td><img src="22-tof-trigger.png" alt="距离触发" width="76" height="64"></td><td><strong>距离触发</strong></td><td>连接 ToF 模块，距离满足设定条件时触发程序。</td></tr><tr><td><img src="23-light-trigger.png" alt="光线触发" width="76" height="64"></td><td><strong>光线触发</strong></td><td>连接 DLight 模块，光强满足设定条件时触发程序。</td></tr></tbody></table>


### 6. 运行和调试

先检查积木是否接好、参数是否正确，以及页面是否显示已连接。移动任务需要定位垫，并应从格子中心开始。每次只加一两个动作，方便看出是哪一步需要调整。

前进或后退按格子中心移动。接近地图边缘时应调整路线，避免让机器人驶出定位区域。足球任务中，机器人和足球都应放在相应格子的中心。

<img class="tutorial-image" src="comaps-football-map.png" alt="CoCube 足球地图，虚线交点表示格子中心">

### 7. 管理项目

点击左上角 Home 打开菜单：

- **新建、打开、保存**：管理本地项目。
- **撤回**：逐步撤销操作；误删积木或清空画布后也可以撤回。
- **清空画布**：删除画布中的程序。
- **语言**：切换界面语言。
- **积木编程**：切回 MicroBlocks。

Web 版还可以返回 CoCube 入口页。切换编程方式后，需要在目标编辑器重新连接机器人。

### 8. 用地图开展挑战

标准迷宫和赛车地图可以用于路线规划。也可以用地图设计工具制作自己的主题地图。

<img class="tutorial-image" src="comaps-maze-map.png" alt="CoCube 标准迷宫地图">
<img class="tutorial-image" src="comaps-racing-map.png" alt="CoCube 标准赛车地图">

[阅读地图设计软件教程](../cocube_icon_02_map_builder-cn/)，学习选择主题、设计路线、导出和打印地图。

<img class="tutorial-image" src="polar-map-A3.svg" alt="地图设计工具导出的 A3 极地探险地图">

<a href="polar-map-A3.svg" download>下载这张 A3 极地地图 SVG</a>

可以从“起点到终点”开始，再加入收集奖励、绕过障碍或使用更少积木等挑战。熟悉后，再加入循环、灯光和声音。
