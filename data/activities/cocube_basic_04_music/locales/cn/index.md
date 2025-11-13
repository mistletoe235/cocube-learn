### 1. 案例目的

为 CoCube 机器人编程，实现音乐编程。

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =300x*) ![个人电脑 或 平板](PC.png =300x*)

### 3. 软件平台

[MicroBlocks-CoCube](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. 开始编程

CoCube 机器人配备了蜂鸣器，可以通过编程发出不同音调的声音，并调整音调持续时间和间隔时间，完成谱曲和播放：

1. **连接设备：**&#x901A;过有线或者无线方式，连接 MicroBlocks IDE 与 CoCube 机器人。

2. **找到积木：**&#x5728;“音调”积木库中找到“弹奏频率（261）持续（500）毫秒”积木块，并拖拽到工作区。

3. **执行程序：**&#x5DE6;键单击积木块。当积木块周围亮起绿色光环时，表示程序已成功执行，可以听到 CoCube 机器人蜂鸣器发出声音，0.5秒后停止。

4. **调整音调：**&#x66F4;改音调数字和持续时间，发出不同音调的声音。

5. **编曲：**&#x8FD9;里提供一组中音音符和频率对应关系：Do（523） Re（587） Mi（659） Fa（698） So（784） La（880） Xi（988），也可以自行上网查询对应音符和频率之间的关系。拖动多个积木库并修改每个积木块的频率和持续时间完成编曲。

6. **停止音调：**&#x82E5;要使蜂鸣器停止发声，可以使用“停止音调”积木块。直接在积木区中点击“停止音调”积木块，或将“停止音调”积木块拖到工作区并点击，CoCube会立即停止播放声音。

![](1734678667505.png)

### 5. 进阶功能

自己搜音符和频率的对照关系，十分繁琐。是否有更简便的方法呢？在MicroBlocks中，提供了两种简便的方法。

#### 5.1 音符

在音乐领域，可以用音符c、d、e、f、g、a、b来表示Do-Re-Mi-Fa-So-La-Ti，升记号（♯）表示将基本音级升高半个音，音阶为0、1、2……则可以表示低音、中音、高音等。

![](image-1.png)

试试看，编写一首《两只老虎》，为了更方便地修改音乐的节奏速度，我们创建一个全局变量beat，放置到每一个弹奏音符积木中。

![](scriptImage5407537.png)

#### 5.2 MIDI

在MIDI键盘中，MIDI音符编号（MIDI Note Number）与音乐中的音高相对应，主要用于数字音乐制作和乐器之间的通信。

例如，60代表钢琴上中央C，61代表C#，62代表D……

试试看，编写一个音乐特效：

![](scriptImage5528060.png)

### 6. 挑战一下

使用CoCube尝试演奏一下《小星星》吧。

参考示例程序：

![](scriptImage5737979.png)

[MicroBlocks——CoCube案例04-音乐编程](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27Tone%27%0A%0Ascript%20382%20144%20%7B%0AwhenStarted%0Acomment%20%27%E4%B8%A4%E5%8F%AA%E8%80%81%E8%99%8E%27%0Abeat%20%3D%20400%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%20%20%27play%20tone%27%20%27D%27%201%20beat%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%7D%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27F%27%201%20beat%0A%20%20%27play%20tone%27%20%27G%27%201%20%282%20%2A%20beat%29%0A%7D%0A%7D%0A%0Ascript%20827%20141%20%7B%0AwhenButtonPressed%20%27A%27%0Acomment%20%27%E5%B0%8F%E6%98%9F%E6%98%9F%27%0Abeat%20%3D%20400%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0AwaitMillis%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%7D%0A%0Ascript%201212%20145%20%7B%0AwhenButtonPressed%20%27B%27%0Acomment%20%27MIDI%E9%9F%B3%E4%B9%90%E7%89%B9%E6%95%88%27%0Alocal%20%27delay%27%205%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%20delay%0A%7D%0A%7D%0A%0A)
