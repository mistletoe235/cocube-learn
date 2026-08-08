在上一课[《MQTT 通信》](../cocube_basic_21_mqtt_communication-cn/)中，我们已经完成了 CoCube 与 MQTTX 之间的基本消息收发。本课将在此基础上实现更通用的远程控制：

- CoCube 向 MQTTX 上报自己的位置和方向；
- MQTTX 向 CoCube 发送“函数名 + 参数”；
- CoCube 拆分消息，并调用对应的积木函数完成动作。

本课使用的控制消息示例为：

```text
CoCube move for msecs,cocube;forward,40,1000
```

它表示：调用“CoCube move for msecs”函数，以速度 40 向前移动 1000 毫秒。

### 1. 为什么本课使用 MQTT，而不是直接使用蓝牙

直接蓝牙适合近距离、一台控制设备直接连接一台机器人的场景。MQTT 则在 Broker（代理服务器）的帮助下，把控制端和机器人分开：双方不需要直接连接，只要都能连接同一个 Broker，并使用约定好的 Topic，就可以交换消息。

| 对比项 | MQTT | 直接蓝牙/BLE |
| --- | --- | --- |
| 通信距离 | 只要能够访问 Broker，就可以跨房间、跨校园或通过互联网通信 | 通常要求控制设备位于机器人附近 |
| 连接关系 | 支持一对多、多对一和多对多 | 常见方式是一对一直接连接 |
| 多端观察 | MQTTX、网页、服务器等可以同时订阅数据 | 通常只有当前蓝牙连接端直接接收数据 |
| 多机器人扩展 | 为不同机器人分配不同 Topic 即可 | 需要分别发现、连接和管理设备 |
| 云端接入 | 容易连接数据库、可视化平台和自动化服务 | 通常需要额外的蓝牙网关 |
| 网络要求 | 依赖 Wi-Fi、Broker 或互联网 | 近距离使用时不依赖互联网 |
| 功耗 | Wi-Fi 通信的功耗通常高于 BLE | BLE 更适合低功耗近距离通信 |
| 延迟 | 会受到网络和 Broker 状态影响 | 近距离直连时通常更稳定 |

因此，MQTT 的主要优势不是“任何时候都比蓝牙快”，而是：

- 控制端与机器人解耦，不需要直接配对；
- 可以远程控制和监测；
- 可以让多个客户端同时参与；
- 容易扩展成多机器人或物联网平台。

如果只在机器人旁边进行单机控制，且重视低功耗、低延迟和离线运行，蓝牙仍然可能更合适。本课使用 MQTT，是为了学习更适合远程、多端和多设备场景的控制结构。

### 2. 第一步：创建 MQTT 连接和两个 Topic

#### 2.1 创建 EMQX 服务器连接

与上一课相同，在 MQTTX 中新建一个连接。这里的“创建服务器”是指在 MQTTX 中创建服务器连接配置，并不是自己部署一台服务器。

填写以下参数：

| 配置项 | 值 |
| --- | --- |
| Name | `mqtt_test` |
| Host | `broker.emqx.io` |
| Protocol | `mqtt://` |
| Port | `1883` |
| Client ID | 使用 MQTTX 自动生成的唯一值 |
| Username | 留空 |
| Password | 留空 |
| SSL/TLS | 关闭 |

保存配置并单击“Connect”。连接名称旁出现绿色标志，表示 MQTTX 已成功连接 EMQX 公共 Broker。

> `broker.emqx.io` 是公开测试服务器。请勿发送密码、个人信息等敏感内容，也不要将公共测试 Broker 用于正式项目。

#### 2.2 新建两个 Topic

本课不再使用一个 Topic 同时收发，而是按通信方向建立两个 Topic：

| Topic | 通信方向 | 用途 |
| --- | --- | --- |
| `cocube_mqtt_send` | CoCube → MQTTX | CoCube 发送 X、Y 坐标和方向 |
| `cocube_mqtt_receive` | MQTTX → CoCube | MQTTX 向 CoCube 发送控制消息 |

在 MQTTX 中单击“New Subscription”，分别添加 `cocube_mqtt_send` 和 `cocube_mqtt_receive`，QoS 均选择 `0`。

<p align="center"><img src="create_new_topic.png" alt="在 MQTTX 中添加发送和接收 Topic" width="300"></p>

截图中还保留了上一课使用的 `cocube_mqtt`。本课实际使用的是下面两个新 Topic：

```text
cocube_mqtt_send
cocube_mqtt_receive
```

在 MQTT 中，Topic 并不需要在服务器后台预先建立。第一次订阅或发布某个 Topic 时，它就可以用于消息传递。这里所说的“新建两个 Topic”，实际是指在 MQTTX 中添加相应的订阅，并在后面的程序中使用同样的名称。

#### 2.3 CoCube 连接 Broker

在 MicroBlocks 中先连接 Wi-Fi，再连接 `broker.emqx.io`。

<p align="center"><img src="connect.png" alt="CoCube 连接 Wi-Fi 和 MQTT Broker" width="760"></p>

连接成功后，CoCube 需要：

1. 订阅 `cocube_mqtt_receive`；
2. 启动消息接收脚本；
3. 启动位置发送脚本。

两个方向必须对应正确：CoCube 发布到 `cocube_mqtt_send`，但订阅的是 `cocube_mqtt_receive`。

### 3. 第二步：导入 Function Calls 积木库并查看函数定义

#### 3.1 导入 Function Calls 积木库

动态调用积木函数需要使用“Function Calls”积木库：

1. 打开 MicroBlocks 的积木库窗口；
2. 选择“Other（其他）”分类。

<p align="center"><img src="add1.png" alt="在 MicroBlocks 积木库中选择 Other" width="240"></p>

3. 选择“Function Calls”；
4. 单击“打开”完成导入。

<p align="center"><img src="add2.png" alt="导入 Function Calls 积木库" width="240"></p>

导入后，可以找到用于动态调用函数的“call”积木：

<p align="center"><img src="call_function.png" alt="Function Calls 库中的 call 积木" width="360"></p>

这个积木接收两部分内容：

- 要调用的函数名；
- 传递给函数的参数列表。

后面会将 MQTT 消息中的第一项作为函数名，其余项目组成参数列表，再交给这个积木执行。

#### 3.2 “Comment”积木有什么用途

“Comment（注释）”积木不会控制机器人，也不会影响程序运行。它主要用于：

- 记录某段程序的用途；
- 解释消息格式或参数含义；
- 临时保存文本；
- 查看积木复制到剪贴板后的 GP Script 表示。

<p align="center"><img src="comment.png" alt="MicroBlocks 的 Comment 积木" width="600"></p>

本课会利用“Comment”积木查看 CoCube 积木的内部函数定义。这样得到的函数名和参数比根据界面文字猜测更准确。

#### 3.3 查看积木的函数定义

以“向前、速度 40、移动 1000 毫秒”积木为例：

1. 右键单击目标积木；
2. 选择“复制到剪贴板”。

<p align="center"><img src="first.png" alt="把 CoCube 移动积木复制到剪贴板" width="530"></p>

3. 新建一个“Comment”积木；
4. 把剪贴板中的内容粘贴到“Comment”中。

<p align="center"><img src="record1.png" alt="在 Comment 中查看积木的 GP Script 定义" width="760"></p>

可以读到：

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

它包含一个函数名和三个参数：

| 位置 | 内容 | 含义 |
| --- | --- | --- |
| 函数名 | `CoCube move for msecs` | 按时间移动 |
| 参数 1 | `cocube;forward` | 方向 |
| 参数 2 | `40` | 速度 |
| 参数 3 | `1000` | 移动时间，单位为毫秒 |

远程调用时使用的是这些内部名称，而不是界面上显示的中文。例如，前进方向应使用 `cocube;forward`，不能直接写“前”或 `forward`。

### 4. 第三步：为什么使用函数调用，而不是用指令代称

#### 4.1 用单个字母代称动作的方法

最直观的做法是规定：

| 指令 | 动作 |
| --- | --- |
| `w` | 向前移动 |
| `a` | 向左转 |
| `s` | 后退 |
| `d` | 向右转 |

接收 MQTT 消息后，把消息作为广播发送：

<p align="center"><img src="one_to_one.png" alt="收到 MQTT 消息后广播消息内容" width="760"></p>

再为每一个代号编写一段对应程序。例如收到 `w` 时，向前移动：

<p align="center"><img src="receive_w.png" alt="收到 w 广播后让 CoCube 向前移动" width="700"></p>

这种方法容易理解，但它是一种“一条指令对应一段程序”的结构。新增一个动作，就要新增一个代号和一段接收脚本。

#### 4.2 指令代称存在的问题

如果还需要改变速度和时间，就必须继续增加大量代号，例如：

| 指令 | 动作 |
| --- | --- |
| `w1` | 速度 20，前进 500 毫秒 |
| `w2` | 速度 40，前进 1000 毫秒 |
| `w3` | 速度 50，前进 2000 毫秒 |

随着方向、速度、时间和动作种类增加，代号会越来越多，也越来越难记。MQTT 接收逻辑中还会出现大量判断或“当接收到”脚本。

#### 4.3 函数名和参数的优势

使用函数调用后，消息直接说明“调用哪个函数、传入什么参数”：

```text
CoCube move for msecs,cocube;forward,40,1000
CoCube move for msecs,cocube;backward,30,800
CoCube rotate for msecs,cocube;left,30,1000
```

这种方式有以下优点：

- 同一个函数可以通过不同参数完成多种动作；
- 不需要为每个速度和时间组合设计新代号；
- 可以直接复用 CoCube 库中已有的移动和旋转函数；
- MQTT 程序只负责解析消息，动作细节由 CoCube 函数负责；
- 后续增加可调用函数时，不需要改变统一的消息结构。

换句话说，`w` 只表达“某一个固定动作”，而“函数名 + 参数”表达的是一类可以调整的动作。

### 5. 第四步：完成 MQTT 接收、函数调用和状态发送

本项目采用消息结构：`函数名,参数1,参数2,参数3...`。

这里选择英文逗号 `,` 作为分隔符，只是本项目的协议约定，并不是 MQTT 的强制规定。也可以根据项目需要选择 `|`、`#` 等其他符号，但必须满足：

- MQTTX 和 CoCube 使用同一个分隔符；
- 分隔符不会出现在函数名或参数内容中；
- 修改分隔符后，MicroBlocks 的“分割”积木也要同步修改。

本项目不适合使用分号 `;` 作为分隔符，因为 `cocube;forward` 和 `cocube;left` 本身已经包含分号。

#### 5.1 接收 MQTT 消息并调用函数

CoCube 订阅 `cocube_mqtt_receive`。接收脚本持续读取最新 MQTT 事件，将载荷保存到变量 `MESSAGE`；只有 `MESSAGE` 不为空时，才显示并继续处理。

<p align="center"><img src="storage.png" alt="接收 MQTT 载荷并保存到 MESSAGE" width="780"></p>

收到下面这条消息时：

```text
CoCube move for msecs,cocube;forward,40,1000
```

变量赋值和函数调用应作为一个连续过程来理解和搭建：

1. 用英文逗号拆分 `MESSAGE`，把完整结果保存到 `STORAGE`；
2. 把 `STORAGE` 的第 1 项保存到 `NAME`，它就是函数名；
3. 从 `STORAGE` 的第 2 项开始复制，把其余内容保存到 `LIST`，它就是参数列表；
4. 使用 `call NAME with LIST` 调用函数。

<p align="center"><img src="get_message.png" alt="把 MQTT 消息按逗号拆分到 STORAGE" width="780"></p>

<p align="center"><img src="get_function.png" alt="把 STORAGE 第一项赋值给函数名变量 NAME" width="720"></p>

<p align="center"><img src="get_param.png" alt="把 STORAGE 第二项以后的内容赋值给参数列表 LIST" width="720"></p>

<p align="center"><img src="call_function_by_mqtt.png" alt="使用 NAME 和 LIST 调用函数" width="650"></p>

整个过程中各变量的内容为：

| 变量/操作 | 内容 |
| --- | --- |
| `MESSAGE` | `CoCube move for msecs,cocube;forward,40,1000` |
| `STORAGE` | `[CoCube move for msecs, cocube;forward, 40, 1000]` |
| `NAME` | `CoCube move for msecs` |
| `LIST` | `[cocube;forward, 40, 1000]` |
| 执行 | `call NAME with LIST` |

因此，程序最终等效于调用：

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

#### 5.2 在 MQTTX 中发送控制指令

在 MQTTX 页面下方的发布区域填写：

| 项目 | 值 |
| --- | --- |
| Payload 格式 | `Plaintext` |
| QoS | `0` |
| Retain | 关闭 |
| Topic | `cocube_mqtt_receive` |
| Payload | 函数名和参数组成的控制消息 |

**发送前必须把发布对象改为 `cocube_mqtt_receive`。** 发布区可能仍保留上一课或上一次测试使用的 Topic，如果没有修改，CoCube 就收不到命令。

<p align="center"><img src="ps.png" alt="在 MQTTX 发布区修改控制消息的 Topic" width="760"></p>

> 图片用于标出 Topic 输入框的位置。MQTT Topic 区分大小写，参考 UBP 订阅的是全小写 `cocube_mqtt_receive`。即使截图中显示为 `CoCube_mqtt_receive`，实际输入时也必须改成全小写，否则无法匹配。

发送前进命令：

```text
CoCube move for msecs,cocube;forward,40,1000
```

CoCube 会以速度 `40` 向前移动 `1000` 毫秒。

发送左转命令：

```text
CoCube rotate for msecs,cocube;left,30,1000
```

CoCube 会以速度 `30` 向左旋转 `1000` 毫秒。下面是 MQTTX 中的控制消息记录和 CoCube 的实际执行效果：

<p align="center"><img src="receive_result.png" alt="MQTTX 中的移动和旋转控制消息" width="600"></p>

<video style="width: 240px; max-width: 100%; height: auto;" controls preload="metadata">
  <source src="result.mp4" type="video/mp4">
  当前 Markdown 阅读器不支持内嵌视频。你可以<a href="result.mp4">单击这里打开演示视频</a>。
</video>

#### 5.3 CoCube 向 MQTTX 发送位置和方向

发送脚本使用 `cocube_mqtt_send`：

- CoCube 在 CoMap 上时，发送 `X位置,Y位置,方向`；
- CoCube 不在 CoMap 上时，发送 `0,0,0`。

<p align="center"><img src="send_message.png" alt="CoCube 发布 X、Y 和方向" width="650"></p>

例如：

```text
103,56,163
```

表示 X 坐标为 `103`，Y 坐标为 `56`，方向为 `163`。MQTTX 订阅 `cocube_mqtt_send` 后，会持续收到这些数据：

<p align="center"><img src="send_result.png" alt="MQTTX 接收 CoCube 的位置和方向" width="780"></p>

这里再次体现了两个 Topic 的方向关系：

| 发布方 | Topic | 接收方 |
| --- | --- | --- |
| CoCube 发布状态 | `cocube_mqtt_send` | MQTTX 接收 |
| MQTTX 发布指令 | `cocube_mqtt_receive` | CoCube 接收 |

### 6. 第五步：进一步思考与注意事项

#### 6.1 分隔符没有固定答案，但必须统一

英文逗号只是本课选择的分隔符。选择其他字符也可以，但不能与字段内容冲突。尤其要注意：

- 中文全角逗号 `，` 与英文逗号 `,` 不同；
- 分隔符两侧不要随意增加空格；
- 当前简单分割方法无法正确处理本身包含分隔符的文本；
- 如果参数可能包含逗号，可以改用 `|`，或进一步使用 JSON。

例如，若改用竖线，发送端和接收端都要改成：

```text
CoCube move for msecs|cocube;forward|40|1000
```

#### 6.2 函数名、参数数量和顺序必须正确

`CoCube move for msecs` 需要三个参数，顺序为：方向、速度、时间。

缺少参数、增加参数或调换顺序，都可能导致调用失败或机器人产生错误动作。函数名和菜单参数也必须与 GP Script 定义完全一致。

#### 6.3 参数需要做类型和范围检查

MQTT 载荷本质上是文本。正式程序在执行前应检查：

- 速度和时间是否为数字；
- 速度是否在 `0～50` 范围内；
- 时间是否在允许的安全范围内；
- 方向是否属于允许值；
- 参数列表的长度是否正确。

例如，可以把单次运动时间限制为 `50～3000` 毫秒，避免错误消息让机器人长时间运动。

#### 6.4 动态调用必须增加函数白名单

参考工程会直接执行 `call NAME with LIST`。这适合受控课堂实验，但不适合直接暴露在公开网络中。更安全的程序只允许指定函数：

| 处理方式 | 函数 |
| --- | --- |
| 允许 | `CoCube move for msecs` |
| 允许 | `CoCube rotate for msecs` |
| 允许 | `CoCube wheels stop` |
| 拒绝 | 其他函数 |

白名单还应分别规定每个函数的参数数量、类型和范围。

#### 6.5 运动命令不要启用 Retain

如果 MQTTX 对运动命令启用 Retain，CoCube 重新连接或重新订阅时，Broker 可能再次发送旧命令，导致机器人意外运动。因此控制消息应关闭 Retain。

#### 6.6 为每台 CoCube 使用唯一 Topic

公共 Broker 上不要让多组同学共用相同的控制 Topic，否则一条命令可能控制多台机器人。可以加入设备编号：

```text
cocube/023/send
cocube/023/receive
```

修改后，MQTTX 和 CoCube 两端必须保持一致。

#### 6.7 给状态发送循环增加等待时间

参考 UBP 的位置发送循环中没有等待积木，可能以很高频率发布消息。建议每次发送后等待 `100～500` 毫秒：

- 降低 Wi-Fi 和 Broker 的负担；
- 减少 MQTTX 界面刷屏；
- 避免发送任务占用过多运行时间。

#### 6.8 QoS 和重复执行

- QoS `0` 适合本课实验和高频状态数据，但消息可能丢失；
- QoS `1` 会确保至少送达一次，但同一控制命令可能重复到达；
- 如果控制项目使用 QoS `1`，应为每条命令增加编号并进行去重。

对于机器人运动控制，无论使用哪种 QoS，都应提供停止命令和超时保护。

#### 6.9 可以继续加入执行结果反馈

目前 MQTTX 看到“消息已发布”，不等于机器人一定成功执行。可以让 CoCube 在处理后返回：

| 结果 | 返回格式 |
| --- | --- |
| 成功 | `OK,命令编号` |
| 失败 | `ERROR,命令编号,错误原因` |

这样控制端就能判断命令是否通过校验并真正执行。

### 7. 参考工程

完成上述步骤后，可以下载参考工程，对照连接、收发、消息分割和函数调用结构：

<a href="CoCube_MQTT_02.ubp" download="CoCube_MQTT_02.ubp">下载 <code>CoCube_MQTT_02.ubp</code> 参考工程</a>

参考工程的核心流程为：

1. CoCube 接收 `cocube_mqtt_receive`，取得 `MESSAGE`。
2. 按逗号拆分到 `STORAGE`。
3. 将第 1 项赋值给 `NAME`，第 2 项以后赋值给 `LIST`。
4. 执行 `call NAME with LIST`。
5. CoCube 向 `cocube_mqtt_send` 发布状态；在 CoMap 上发送 X、Y、方向，不在 CoMap 上发送 `0,0,0`。

> 参考工程只用于完成教程后的对照和排错。运行前请填写自己的 Wi-Fi 信息；分享前应删除真实 Wi-Fi 密码。用于多人或远程环境前，建议补充发送间隔、函数白名单、参数校验和停止保护。
