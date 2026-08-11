在前面的 MQTT 案例中，电脑和 CoCube 通过 MQTT 服务器交换消息。这一次，我们使用 UDP，让同一局域网中的电脑和 CoCube 直接通信。

本教程会完成三个任务：

1. 用电脑向 CoCube 发送文字。
2. 让 CoCube 向电脑回复消息。
3. 通过 UDP 消息远程调用 CoCube 的函数。

[在 MicroBlocks 中打开完整程序][完整程序]

### 1. 准备工作

你需要准备：

- 一台 CoCube
- 一台 Windows、macOS 或 Linux 电脑
- 一个 2.4 GHz Wi-Fi 网络
- [Packet Sender](https://packetsender.com/)

Packet Sender 是一款免费、开源的网络调试工具，可以发送和接收 UDP 数据包。

电脑和 CoCube 必须连接到**同一个 Wi-Fi 网络**。UDP 通信不需要注册账号，也不需要连接公共服务器。

在 MicroBlocks 中添加以下积木库：

- “添加积木库”→“网络”→“UDP”
- “CoCube”
- “添加积木库”→“其他”→“调用方法”

### 2. 启动 CoCube 的 UDP 服务

搭建下面的程序，并填写 Wi-Fi 名称和密码：

<p align="center"><img src="scriptImage01_connect.png" alt="连接 Wi-Fi 并启动 UDP 服务" width="680"></p>

同时按下 A、B 键后，CoCube 会：

1. 连接 Wi-Fi。
2. 在 MicroBlocks 中报告自己的 IP 地址。
3. 启动 UDP 服务，并监听 `5000` 端口。

<p align="center"><img src="ip_address.png" alt="查看 CoCube 的 IP 地址" width="420"></p>

图中的 `172.20.10.2` 只是示例。你的 CoCube 会得到不同的 IP 地址，请记录 MicroBlocks 实际显示的地址。

可以把 IP 地址和端口理解成收件地址：

- IP 地址用于找到局域网中的 CoCube。
- 端口 `5000` 用于把消息交给 CoCube 的 UDP 程序。

> Wi-Fi 名称和密码会保存在程序中。分享程序或截图前，请删除自己的密码。

### 3. 电脑向 CoCube 发送消息

#### 3.1 编写接收程序

搭建下面的程序：

<p align="center"><img src="scriptImage02_receive.png" alt="CoCube 接收 UDP 数据包" width="680"></p>

按下 A 键后，程序会不断检查是否收到了 UDP 数据包：

- 没有新消息时，接收到的内容长度为 `0`。
- 收到消息时，程序会报告消息，并把它显示到 TFT 屏幕上。

循环末尾等待 `50` 毫秒，可以避免程序过于频繁地检查数据。

#### 3.2 使用 Packet Sender 发送

打开 Packet Sender，在发送区域填写：

| 设置 | 内容 |
| --- | --- |
| ASCII | `Hello CoCube!` |
| Address | CoCube 的实际 IP 地址 |
| Port | `5000` |
| Protocol | `UDP` |

确认 CoCube 已经按下 A 键开始接收，然后点击“Send”。

<p align="center"><img src="packet_sender.png" alt="使用 Packet Sender 收发 UDP 消息" width="760"></p>

如果通信成功，CoCube 的 TFT 屏幕会显示：

```text
Hello CoCube!
```

### 4. CoCube 向电脑发送消息

Packet Sender 窗口顶部会显示电脑的 IP 地址，底部会显示当前监听的 UDP 端口。请记录这两个值。

在示例截图中：

| 项目 | 示例值 |
| --- | --- |
| 电脑 IP | `172.20.10.4` |
| 电脑 UDP 端口 | `50843` |

把程序中的 IP 地址和端口替换成你在 Packet Sender 中看到的实际数值：

<p align="center"><img src="scriptImage03_send.png" alt="CoCube 向电脑发送 UDP 数据包" width="680"></p>

按下 B 键后，CoCube 会向电脑发送 `Hello!`。收到的数据包会出现在 Packet Sender 下方的日志中。

> `172.20.10.4` 和 `50843` 都是示例。电脑重新联网或重新打开软件后，这些数值可能发生变化，需要重新查看并修改程序。

到这里，我们已经完成了双向通信：

- Packet Sender 向 `CoCube:5000` 发送 `Hello CoCube!`。
- CoCube 向 Packet Sender 回复 `Hello!`。

### 5. 用 UDP 消息控制 CoCube

收到的数据不一定只是文字，也可以把它当作控制命令。

用下面的程序替换第 3 节的接收程序：

<p align="center"><img src="scriptImage04_control.png" alt="根据 UDP 消息控制 CoCube" width="680"></p>

在 Packet Sender 中保持 CoCube 的 IP、端口 `5000` 和 UDP 协议不变，依次发送：

| 消息 | CoCube 的动作 |
| --- | --- |
| `forward` | 向前移动 |
| `backward` | 向后移动 |
| `left` | 向左旋转 |
| `right` | 向右旋转 |

这种写法很容易理解：收到什么文字，就执行对应的动作。但是每增加一个命令，都要增加一次判断。

### 6. 通过 UDP 调用函数

如果希望调用更多积木，可以把函数名和参数一起放进 UDP 消息中：

```text
call,函数名,参数1,参数2……
```

使用下面的通用接收程序替换第 5 节的固定命令程序：

<p align="center"><img src="scriptImage05_function_call.png" alt="解析 UDP 函数调用消息" width="680"></p>

程序会：

1. 接收一个 UDP 数据包。
2. 检查消息开头是不是 `call`。
3. 用英文逗号分割消息。
4. 取出第 2 项作为函数名。
5. 取出第 3 项及后面的内容作为参数列表。
6. 使用“调用”积木执行函数。

在 Packet Sender 中发送：

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

这条消息会让 CoCube 以速度 `40` 向前移动 `1000` 毫秒。

还可以尝试：

```text
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
```

`scriptImage04_control.png` 和 `scriptImage05_function_call.png` 是接收程序的两个版本。完成固定命令实验后，请用通用函数调用程序替换它，不要同时运行。

### 7. 查看积木的函数名

UDP 消息中的函数名和参数必须与积木实际使用的内容一致。

在 MicroBlocks 中右键点击积木，选择“复制至剪贴板”，再把内容粘贴到注释中，就可以查看它对应的 GP Script。

<p align="center"><img src="scriptImage06_show_function.png" alt="查看积木的函数名和参数" width="680"></p>

图中的内容是：

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

因此：

- 函数名是 `CoCube move for msecs`。
- 参数是 `cocube;forward`、`40`、`1000`。

把它们用英文逗号连接，并在开头加上 `call`，就得到了完整的 UDP 控制消息。

函数调用的详细原理，可以参考：[高级程序调用](../cocube_basic_17_advanced_program_calls-cn/)。

### 8. UDP 通信的特点

与 MQTT 相比，UDP 的通信过程更直接：

- 不需要 MQTT 服务器。
- 不需要账号或主题。
- 适合在同一局域网内快速传递消息。
- 发送时必须知道接收设备的 IP 地址和端口。

UDP 不会确认消息是否成功到达，也不保证消息一定按顺序到达。因此，它适合遥控命令、位置数据等允许偶尔丢失的实时信息，不适合直接传输必须完整保存的重要文件。

### 9. 常见问题

#### Packet Sender 发出消息，但 CoCube 没有收到

- 确认电脑和 CoCube 连接到同一个 Wi-Fi。
- 确认填写的是 CoCube 当前显示的 IP 地址。
- 确认目标端口为 `5000`，协议为 UDP。
- 确认已经按 A 键运行接收程序。
- 检查电脑或路由器是否启用了设备隔离功能。

#### CoCube 发出消息，但 Packet Sender 没有收到

- 检查程序中的电脑 IP 和 Packet Sender 底部的 UDP 端口。
- 如果 Packet Sender 的端口发生变化，请同步修改 MicroBlocks 程序。
- 第一次运行时，允许 Packet Sender 通过系统防火墙。

#### 函数调用没有反应

- 确认已经添加“调用方法”积木库。
- 确认消息使用英文逗号。
- 确认消息以小写 `call` 开头。
- 检查函数名、参数数量和参数顺序。

[完整程序]: https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27TFT%27%20%27UDP%27%20%27WiFi%27%0A%0Ascript%20358%20233%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20358%20302%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28size%20var%29%20%21%3D%200%29%20%7B%0A%20%20%20%20sayIt%20var%0A%20%20%20%20%27%5Btft%3Aclear%5D%27%0A%20%20%20%20%27%5Btft%3Atext%5D%27%20var%205%205%20%28colorSwatch%20255%2017%2081%20255%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20358%20600%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20362%2065%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0AwifiConnect%20%27%E7%BD%91%E7%BB%9C%E5%90%8D%E7%A7%B0%27%20%27%27%0AsayIt%20%28getIPAddress%29%0A%27%5Bnet%3AudpStart%5D%27%205000%0A%7D%0A%0Ascript%20714%2081%20%7B%0AwhenButtonPressed%20%27B%27%0A%27%5Bnet%3AudpSendPacket%5D%27%20%27Hello%21%27%20%27172.20.10.4%27%2050843%0A%7D%0A%0Ascript%20358%20667%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28size%20var%29%20%21%3D%200%29%20%7B%0A%20%20%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bforward%27%2040%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27backward%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%201000%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20357%201235%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20358%201302%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28%27%5Bdata%3AcopyFromTo%5D%27%20var%201%204%29%20%3D%3D%20%27call%27%29%20%7B%0A%20%20%20%20local%20%27msg%27%20%28%27%5Bdata%3Asplit%5D%27%20var%20%27%2C%27%29%0A%20%20%20%20local%20%27cmd_name%27%20%28at%202%20msg%29%0A%20%20%20%20local%20%27cmd_args%27%20%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%203%29%0A%20%20%20%20callCustomCommand%20cmd_name%20cmd_args%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A
