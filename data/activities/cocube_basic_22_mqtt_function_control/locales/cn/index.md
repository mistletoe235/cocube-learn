上一节中，我们已经让 CoCube 和 MQTTX 互相发送消息。这一次，我们不再只把消息显示在屏幕上，而是让 CoCube 根据收到的消息执行动作。

本教程会完成两个小实验：

1. 发送 `forward`、`backward`、`left`、`right`，控制 CoCube 移动。
2. 发送函数名和参数，调用 CoCube 中已有的积木。

如果你还没有完成 MQTT 的连接实验，请先阅读：[《MQTT 通信》](../cocube_basic_21_mqtt_communication-cn/)。关于函数调用的详细原理，可以参考：[《高级程序调用》](../cocube_basic_17_advanced_program_calls-cn/)。

### 1. 连接 MQTT

本案例继续使用上一节的连接程序。把 Wi-Fi 名称和密码填写完整，同时按下 CoCube 的 A、B 键。

<p align="center"><img src="code_connect.png" alt="连接 Wi-Fi 和 MQTT 服务器" width="680"></p>

当 CoCube 显示笑脸时，表示已经连接到 MQTT 服务器。

程序中还需要使用以下积木库：

- `MQTT`
- `CoCube`
- `调用方法`

“调用方法”积木库可以从“添加积木库”→“其他”→“调用方法”中找到。

### 2. 用简单消息控制 CoCube

先从最直观的方法开始：让每一条消息对应一个动作。

<p align="center"><img src="code_simple_control.png" alt="根据 MQTT 消息控制 CoCube" width="780"></p>

按下 A 键后，CoCube 会订阅：

```text
cocube/control
```

收到消息后，程序读取“MQTT 事件的载荷”，再通过“如果 / 否则如果”判断要执行的动作：

| 收到的消息 | CoCube 的动作 |
| --- | --- |
| `forward` | 向前移动 |
| `backward` | 向后移动 |
| `left` | 向左旋转 |
| `right` | 向右旋转 |

在 MQTTX 中，将主题设置为 `cocube/control`，依次发送这四条消息，观察 CoCube 的动作。

这种写法简单直观，但是每增加一个新命令，就要增加一次判断。如果希望远程调用更多积木，程序会越来越长。

### 3. 用一条消息描述函数调用

我们可以把要执行的函数和参数都放进 MQTT 消息中，格式为：

```text
call,函数名,参数1,参数2……
```

例如，下面的消息表示：让 CoCube 向前移动，速度为 `40`，持续 `1000` 毫秒。

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

消息中的每一部分用英文逗号分开：

| 内容 | 含义 |
| --- | --- |
| `call` | 表示这是一条函数调用消息 |
| `CoCube move for msecs` | 函数名 |
| `cocube;forward` | 方向参数 |
| `40` | 速度参数 |
| `1000` | 时间参数，单位为毫秒 |

### 4. 解析并调用函数

用下面的通用程序替换上一节的固定命令判断程序：

<p align="center"><img src="code_function_call.png" alt="解析 MQTT 消息并调用函数" width="780"></p>

程序收到 MQTT 消息后，会按照以下顺序处理：

1. 读取消息载荷，并保存到 `msg`。
2. 检查消息的前四个字符是不是 `call`。
3. 用英文逗号分割消息。
4. 取出第 2 项作为函数名 `cmd_name`。
5. 取出第 3 项及后面的内容作为参数列表 `cmd_args`。
6. 使用“调用”积木执行这个函数。

这样一来，不需要为每个动作分别编写判断。只要消息中包含正确的函数名和参数，同一段程序就能执行不同任务。

> 以上是两个不同阶段的接收程序。完成第 2 节后，请用第 4 节的程序替换它，不要同时运行两个版本。

### 5. 在 MQTTX 中测试

在 MQTTX 中保持主题为：

```text
cocube/control
```

依次发送：

```text
call,CoCube move for msecs,cocube;forward,40,1000
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
```

<p align="center"><img src="mqttx_function_messages.png" alt="通过 MQTTX 发送函数调用消息" width="680"></p>

这四条消息会让 CoCube 分别向前、向后、向左旋转和向右旋转。

### 6. 如何找到积木的函数名

消息中的函数名必须和积木真正的函数名完全一致。

在 MicroBlocks 中右键点击积木，选择“复制至剪贴板”，再把内容粘贴到注释中，就可以查看它对应的 GP Script。

<p align="center"><img src="code_show_function.png" alt="查看积木的函数名和参数" width="680"></p>

图中的积木会得到：

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

因此：

- 函数名是 `CoCube move for msecs`。
- 参数依次是 `cocube;forward`、`40` 和 `1000`。

把它们按照 `call,函数名,参数列表` 的格式组合起来，就得到了可以通过 MQTT 发送的完整命令。

### 7. 尝试更多函数

选择一个你想远程执行的 CoCube 积木，查看它的函数名和参数，然后在 MQTTX 中组成新的 `call` 消息。

还可以给不同的机器人设置不同主题，例如：

```text
cocube/eow/control
cocube/eop/control
```

这样就能从同一个 MQTTX 界面分别控制多台 CoCube。

本教程使用的是公共 MQTT 服务器。请使用不容易重复的主题，不要发送个人信息，也不要让连接公共主题的机器人在无人看管时运行。
