### 记录并回放音乐

在上一节[《用地图演奏蜂鸣器音乐》](../cocube_basic_19_buzzer_music_map-cn/) 中，CoCube 可以读取音乐地图的卡片 ID，并用蜂鸣器实时播放对应音符。

这一次，我们要给它增加一项新本领：**记住经过的琴键，并自动重放刚才的旋律。**

在线程序：[在 MicroBlocks 中打开程序][program]

程序文件：[`Buzzer_Record_and_Replay.ubp`](Buzzer_Record_and_Replay.ubp)

#### 1. 操作方法

1. 按下 A 键，屏幕显示 `Recording...`，开始一次新的录音。
2. 推动 CoCube 经过音乐地图上的琴键。
3. 按下 B 键，屏幕显示 `Playing...`，CoCube 自动回放刚才的旋律。
4. 可以反复按 B 键，多次播放同一段旋律。
5. 再次按 A 键会清除旧旋律，并开始重新录音。

程序只记录经过的音符顺序，不记录滑动速度。回放时，每个音符固定持续 `300` 毫秒，音符之间等待 `50` 毫秒。

#### 2. 准备一个音符列表

程序使用三个变量：

- `key`：当前琴键的卡片 ID。
- `last_key`：上一次读取到的卡片 ID。
- `notes`：按顺序保存录制的所有音符。

![初始化变量](1_when_start.png)

启动时，把 `key` 和 `last_key` 设为 `0`，并把 `notes` 设为空列表。

列表就像一个可以不断加长的盒子。例如，CoCube 依次经过编号为 `60`、`64`、`67` 的琴键，列表会变成 `notes = [60, 64, 67]`。

#### 3. 按 A 键开始录音

![按 A 键录音](2_A_button.png)

按下 A 键后，程序先清空屏幕并显示 `Recording...`，然后做两项准备：

- 把 `notes` 设为空列表
- `last_key = 0`

这会删除上一段旋律，并开始一次全新的录音。

后面的琴键读取与上一节基本相同：程序不断读取卡片 ID，只有当 `key` 和 `last_key` 不同时才切换音符。

新增加的积木是：

“添加 `key` 至列表 `notes`”

每当 CoCube 进入一个有效琴键，程序不仅播放这个音符，还把琴键编号添加到 `notes` 的末尾。这样，经过的所有琴键就会按顺序保存下来。

#### 4. 按 B 键回放旋律

![按 B 键回放](3_B_Button.png)

按下 B 键后，“停止其他任务”会结束正在运行的录音循环。程序随后遍历 `notes` 列表：

- 对于 `notes` 中的每一个 `note`：
  - 播放 `note`，持续 `300` 毫秒。
  - 等待 `50` 毫秒。

“变化因子 `note` 范围 `notes`”会从列表开头依次取出每个音符，直到整段旋律播放完毕。

回放后，`notes` 没有被清空，因此可以再次按 B 键重复播放。只有再次按下 A 键时，旧旋律才会被删除。

#### 5. 动手试一试

- 修改 `300` 毫秒，比较不同的演奏速度。
- 修改 `50` 毫秒，听听音符之间的停顿有什么变化。
- 在回放时显示当前的 MIDI 编号。
- 想一想：如果希望回放时保留原来的快慢节奏，还需要记录什么数据？

[program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27TFT%27%20%27Tone%27%0A%0Ascript%20400%2070%20%7B%0AwhenStarted%0Akey%20%3D%200%0Alast_key%20%3D%200%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%7D%0A%0Ascript%20400%20225%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Recording...%27%2040%20110%20%28colorSwatch%200%20255%200%20255%29%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0Alast_key%20%3D%200%0Aforever%20%7B%0A%20%20key%20%3D%20%28%27CoCube%20card%20ID%27%29%0A%20%20if%20%28key%20%21%3D%20last_key%29%20%7B%0A%20%20%20%20stopTone%0A%20%20%20%20if%20%28and%20%28key%20%3E%3D%2060%29%20%28key%20%3C%3D%2084%29%29%20%7B%0A%20%20%20%20%20%20tone_startMIDIKey%20key%0A%20%20%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20key%20notes%0A%20%20%20%20%7D%0A%20%20%20%20last_key%20%3D%20key%0A%20%20%7D%0A%20%20waitMillis%2010%0A%7D%0A%7D%0A%0Ascript%20844%20224%20%7B%0AwhenButtonPressed%20%27B%27%0AstopAll%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Playing...%27%2060%20110%20%28colorSwatch%200%20255%200%20255%29%0Afor%20note%20notes%20%7B%0A%20%20playMIDIKey%20note%20300%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A
