### ESP-NOW 萤火虫同步闪烁

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="fireflies.mp4" type="video/mp4">
</video>

夜晚的树林里，很多萤火虫一开始各闪各的。过一会儿，它们会慢慢形成节奏：先是一小群一起闪，再变成一大片几乎同时闪烁。

这个案例会用 ESP-NOW 做一个“电子萤火虫”实验。每块主板都是一只萤火虫：自己按节奏闪光，听到附近伙伴闪光时，就把自己的节奏往前推一点。运行一段时间后，几块主板会逐渐同步闪烁。

参考资料：

- [Nicky Case: Fireflies](https://ncase.me/fireflies/)

#### 1. 效果演示

准备 3 块或更多支持 ESP-NOW 的 MicroBlocks 主板，并给每块主板下载同一个程序 [`firefly.ubp`](firefly.ubp)。

运行后，每块主板都会启动自己的内部时钟，定时闪光，并接收其他主板发来的闪光消息。刚开始时，它们的闪光时间可能不一样；观察一会儿后，会看到闪光逐渐靠近，最后形成越来越整齐的同步。

![完整程序](allScripts.png)

[在 MicroBlocks 中打开完整程序](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20400%2078%20%7B%0AwhenStarted%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0Atick%20%3D%20100%0Aclock%20%3D%200%0Acircle%20%3D%2012%0AsendBroadcast%20%27heartbeat%27%0AsendBroadcast%20%27listen%27%0A%7D%0A%0Ascript%201028%2078%20%7B%0AwhenBroadcastReceived%20%27flash%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2033554431%0A%27play%20tone%27%20%27nt%3Bc%27%201%20tick%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20400%20308%20%7B%0AwhenBroadcastReceived%20%27heartbeat%27%0Aforever%20%7B%0A%20%20waitMillis%20tick%0A%20%20clock%20%2B%3D%201%0A%20%20if%20%28clock%20%3E%3D%20circle%29%20%7B%0A%20%20%20%20espNow_send_pair%20%27light%27%2010%0A%20%20%20%20sendBroadcast%20%27flash%27%0A%20%20%20%20clock%20%3D%200%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20693%20308%20%7B%0AwhenBroadcastReceived%20%27listen%27%0Aforever%20%7B%0A%20%20if%20%28espNow_receive_pair%29%20%7Bif%20%28clock%20%3C%20circle%29%20%7B%0A%20%20%20%20clock%20%2B%3D%201%0A%20%20%7D%7D%0A%7D%0A%7D%0A%0Ascript%20676%2077%20%7B%0AwhenButtonPressed%20%27A%27%0Aclock%20%3D%20%28random%200%20circle%29%0A%7D%0A%0A)


课堂演示可以按这个顺序进行：

1. 先只打开 1 块主板，观察它按照固定节奏闪光。
2. 再打开第 2、3 块主板，观察它们一开始不同步。
3. 把几块主板放近一些，等待它们逐渐同步。
4. 按某一块主板的 A 键，随机打乱它的内部时钟，再观察它如何重新加入集体节奏。

#### 2. 萤火虫同步闪烁的原理

这个程序用三个变量模拟一只萤火虫的内部节奏：

- `tick`：时钟跳动一次的时间。本程序中默认是 `100` 毫秒。
- `clock`：当前时钟数值，可以理解为“已经走到第几格”。
- `circle`：一轮完整周期。本程序中默认是 `12`。

可以把 `clock` 想象成一圈小钟：

编号依次为 `0, 1, 2, 3, ... 11, 12`。

当 `clock` 增加到 `circle` 时，主板闪光一次，并把 `clock` 重新归零。

![时钟程序](clock.png)

核心逻辑可以理解成：

1. 每过 `1` 个 `tick`，`clock` 增加 `1`。
2. 当 `clock >= circle` 时，发送 ESP-NOW 消息 `light`。
3. 自己闪光，并把 `clock` 设回 `0`。

同步的关键在于“听到别人闪光时，轻轻推一下自己的时钟”。

1. 收到 ESP-NOW 消息时，检查 `clock < circle` 是否成立。
2. 如果成立，就让 `clock` 增加 `1`。

![接收后推进时钟](nudge.png)

这个动作叫做“推进”或“轻推”。它不会让所有主板立刻同步，只是让落后的主板稍微赶上前面的伙伴。很多次小小的推进叠加在一起，就会让整个群体逐渐形成相同节奏。

#### 3. ESP-NOW 的优势

ESP-NOW 很适合做这个案例，因为它不是“连接一个服务器再通信”的方式，而是让设备之间直接发送短消息。

在这个案例里，ESP-NOW 有几个明显优势：

1. 不需要路由器。教室里不需要提前配置 WiFi 名称和密码。

2. 适合一对多广播。一只“萤火虫”发出 `light` 消息，附近设备都可以收到。

3. 延迟低，反馈直观。学生能直接看到“我闪了一下，别人被影响了”的效果。

4. 适合做群体行为实验。2 块板子可以看到互相影响，3 块以上更容易观察到同步过程。

特别的，ESP-NOW的通信距离很长，如果有条件的话，可以在整个教室中开展萤火虫同步闪烁的实验。

#### 4. 可以继续探索的问题

1. 改变 `tick`  
   `tick` 越小，闪烁节奏越快；`tick` 越大，节奏越慢。

2. 改变 `circle`  
   `circle` 越小，闪光越频繁；`circle` 越大，闪光间隔越长。

3. 改变推进幅度  
   现在收到消息后只让 `clock += 1`。如果改成 `clock += 2` 或 `clock += 3`，同步会不会更快？会不会更容易乱？

4. 增加消息过滤  
   只响应 `light` 消息，可以让程序在多人、多设备的课堂环境中更稳定。

5. 设置不同频道  
   把不同小组设置到不同 ESP-NOW 频道，可以让每组萤火虫只和本组同步。
