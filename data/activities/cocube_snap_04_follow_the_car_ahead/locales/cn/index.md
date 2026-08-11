### 跟上前面的车

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower_2.mp4" type="video/mp4">
</video>

在舞龙表演里，龙头先动，后面的身体一节一节跟上；在自然界里，尺蠖向前爬行时，身体后半段也会不断追上前半段。本案例要做一个类似的 leader-follower 队形：前面的 CoCube 是“领队”，后面的 CoCube 会根据前车的位置自动追上去。

这个程序使用 ESP-NOW 在机器人之间发送位置消息。每辆车都会持续广播自己的位置；如果某辆车发现自己应该跟随前一辆车，就会读取前车位置，并在距离过远时向前车移动。

#### 1. 效果演示

准备两辆或更多 CoCube，下载同一个程序 [leader_follower 在线程序][leader-follower-program]。这个案例需要使用 CoCube 的地图定位功能，请把机器人放在可识别定位的地图上运行（足球地图、迷宫地图、透明地图或者其他定制地图）。

运行后，每辆车屏幕上会显示自己的编号：

- 编号 `1`：领队车。
- 编号 `2`：跟随编号 `1` 的车。
- 编号 `3`：跟随编号 `2` 的车。

按 A 键可以让编号减 1，按 B 键可以让编号加 1。建议从 `1` 开始编号，如果不小心调到 `0`，按 B 键调回即可。设置好编号后，把几辆车放在地图上。移动编号 `1` 的车，编号 `2` 的车会尝试跟上；如果有编号 `3` 的车，它会继续跟随编号 `2`，形成一条“车队长龙”。

![完整程序](allScripts_cn.png)

课堂演示可以按这个顺序进行：

1. 先放两辆车，设置为 `1` 和 `2`，用手移动 `1` 车在定位地图上的位置，观察后车跟上前车。
2. 改变两车之间的距离，观察后车什么时候启动、什么时候停止。
3. 增加第 3 辆车，设置编号为 `3`，观察队形是否像龙灯一样一节跟一节。

#### 2. 程序的核心思路

这个案例的关键是给每辆车一个编号 `ID`。

每辆车都会不断通过 ESP-NOW 发送自己的位置：

- 发送内容：X 坐标、Y 坐标和方向。
- 发送编号：自己的 `ID`。

接收消息时，机器人会先判断这条消息是不是来自“前一辆车”：

如果“我的 `ID` 等于收到的 `ID + 1`”，这条消息就来自我要跟随的前车。

例如：

- 车 `2` 只跟随车 `1`。
- 车 `3` 只跟随车 `2`。
- 车 `4` 只跟随车 `3`。

这样所有机器人都运行同一个程序，只需要设置不同编号，就能形成 leader-follower 队形。

#### 3. ESP-NOW 通信设置

程序启动时会做三件事：

1. 把 `ID` 设为 `1`。
2. 把 `D_limit` 设为 `60`。
3. 把 ESP-NOW 频道设为 `13`，分组设为 `255`。
4. 广播 `send_pos`。
5. 显示当前 `ID`。

`D_limit` 是跟车距离阈值。当前车和后车距离大于等于 `60` 时，后车开始追；距离小于 `60` 时，后车停止。

`send_pos` 脚本会每隔 `50` 毫秒发送一次当前位置：

1. 用 ESP-NOW pair 消息发送位置和编号。
2. 字符串部分保存 X 坐标、Y 坐标和方向。
3. 数字部分保存 `ID`。
4. 等待 `50` 毫秒后再次发送。

这里用 ESP-NOW 的 pair 消息有两个好处：

- 字符串部分可以放位置数据。
- 数字部分可以放机器人编号。

#### 4. 如何判断要不要跟车

当机器人收到 ESP-NOW 消息后，会读取发送者的编号 `id`。

如果“我的 `ID` 等于 `id + 1`”，程序会：

1. 读取前车的位置。
2. 计算我和前车之间的距离 `D`。
3. 广播 `go!`。

程序会把前车发来的字符串拆成三个数据：

| 变量 | 含义 |
| --- | --- |
| `robot_x` | 前车 X 坐标 |
| `robot_y` | 前车 Y 坐标 |
| `robot_theta` | 前车方向 |

当前程序主要使用 `robot_x` 和 `robot_y`，也就是前车的位置。然后用两车坐标差计算距离：

- `dx` = 前车 X 坐标 - 本车 X 坐标
- `dy` = 前车 Y 坐标 - 本车 Y 坐标
- `D = sqrt(dx * dx + dy * dy)`

如果 `D` 太大，说明后车落后了；如果 `D` 不大，说明后车已经跟得足够近。

#### 5. 跟车动作

收到 `go!` 广播后，机器人根据距离决定动作：

- 如果 `D >= D_limit`，就执行 `move to target robot_x robot_y 50`。
- 否则，执行 `CoCube wheels break`。

也就是说，后车不是一直开动，而是只在距离超过阈值时，才向前车当前位置移动。

程序中包含了一个 `跟随目标` 的高级积木，需要打开高级模式后，才能在 CoCube 库中出现。它会让机器人先朝向目标点，再一边修正方向、一边向目标移动：

1. 计算目标点距离。
2. 如果距离大于 `3`，先朝向目标点。
3. 在距离小于 `3` 之前，持续重新计算距离和角度误差。
4. 根据角度误差调整左右轮速度。

这样后车就不会只是直线乱冲，而是会根据目标点方向不断修正左右轮速度。相比于CoCube机器人库中的“移动到目标点”函数， `跟随目标` 为非阻塞式的，即你可以不停地给机器人发送新的坐标点，机器人永远向最新的坐标点移动。

#### 6. 拓展挑战

1. 龙灯队形

   使用 4 辆或更多 CoCube，设置为 `1、2、3、4`，观察它们能否形成一条连续跟随的队伍。

2. 分组比赛

   给不同小组设置不同 ESP-NOW 分组或频道，让每组机器人只跟随本组队伍。

3. 给 1 号机器人增加自主运动的程序，例如可以走一个圆形轨迹，看看其他机器人能否跟上。

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower.mp4" type="video/mp4">
</video>

[leader-follower-program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Misc%20Primitives%27%20%27Tone%27%0A%0Ascript%20800%2078%20%7B%0AwhenButtonPressed%20%27A%27%0Aif%20%28ID%20%3E%3D%201%29%20%7B%0A%20%20ID%20%2B%3D%20-1%0A%20%20displayCharacter%20%28ID%20%25%2010%29%0A%20%20%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%7D%0A%0Ascript%201124%2080%20%7B%0AwhenButtonPressed%20%27B%27%0AID%20%2B%3D%201%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%0Ascript%20515%2088%20%7B%0AwhenStarted%0AID%20%3D%201%0AD_limit%20%3D%2060%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0A%27%5Bnet%3AESPNowSetGroup%5D%27%20255%0AsendBroadcast%20%27send_pos%27%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%7D%0A%0Ascript%20514%20338%20%7B%0AwhenCondition%20%28espNow_receive_pair%29%0Alocal%20%27id%27%20%28espNow_last_number%29%0Aif%20%28ID%20%3D%3D%20%28id%20%2B%201%29%29%20%7B%0A%20%20local%20%27pos%27%20%28%27%5Bdata%3Asplit%5D%27%20%28espNow_last_string%29%20%27%2C%27%29%0A%20%20robot_x%20%3D%20%28at%201%20pos%29%0A%20%20robot_y%20%3D%20%28at%202%20pos%29%0A%20%20local%20%27robot_theta%27%20%28at%203%20pos%29%0A%20%20local%20%27dx%27%20%28robot_x%20-%20%28%27CoCube%20position_X%27%29%29%0A%20%20local%20%27dy%27%20%28robot_y%20-%20%28%27CoCube%20position_Y%27%29%29%0A%20%20D%20%3D%20%28%27%5Bmisc%3Asqrt%5D%27%20%28%28dx%20%2A%20dx%29%20%2B%20%28dy%20%2A%20dy%29%29%29%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20979%20354%20%7B%0AwhenBroadcastReceived%20%27send_pos%27%0Aforever%20%7B%0A%20%20espNow_send_pair%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%20ID%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20980%20606%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aif%20%28D%20%3E%3D%20D_limit%29%20%7B%0A%20%20%27CoCube%20track%20target%27%20robot_x%20robot_y%20%2740%27%0A%7D%20else%20%7B%0A%20%20%27CoCube%20wheels%20break%27%0A%7D%0A%7D%0A%0A
