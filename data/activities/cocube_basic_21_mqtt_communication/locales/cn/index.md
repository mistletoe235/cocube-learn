MQTT 是一种轻量级的物联网通信方式。在这个案例中，我们会让 CoCube 和电脑连接到同一个 MQTT 服务器，并完成两项任务：

- 电脑向 CoCube 发送文字，CoCube 将文字显示在 TFT 屏幕上。
- CoCube 向电脑发送自己的 `x`、`y` 坐标和方向角。

完成这个案例后，即使 CoCube 和电脑不在同一个局域网中，只要它们都能访问互联网，就可以通过 MQTT 交换消息。

### 1. 准备工作

你需要准备：

- 一台 CoCube 机器人
- 一台可以运行 MicroBlocks 的电脑
- 一个 2.4 GHz Wi-Fi 网络
- MQTTX 网页客户端或桌面客户端

打开以下网站，可以直接使用 MQTTX 网页客户端：

[打开 MQTTX Web](https://mqttx.app/web-client)

本教程使用 EMQX 提供的公共 MQTT 服务器。公共服务器适合课堂实验，但不要发送 Wi-Fi 密码、个人信息或其他敏感内容。

### 2. MQTT 如何传递消息

MQTT 通信中有三个重要角色：

- **服务器（Broker）**：负责接收和转发消息。本教程使用 `broker.emqx.io`。
- **发布者（Publisher）**：把消息发送到某个主题。
- **订阅者（Subscriber）**：订阅主题，并接收该主题中的消息。

主题（Topic）就像消息的频道。只有发布和订阅使用相同的主题，消息才能正确送达。

本案例使用以下主题：

| 主题 | 消息方向 | 内容 |
| --- | --- | --- |
| `cocube/control` | 电脑 → CoCube | 要显示的文字 |
| `cocube/x` | CoCube → 电脑 | x 坐标 |
| `cocube/y` | CoCube → 电脑 | y 坐标 |
| `cocube/direction` | CoCube → 电脑 | 方向角 |

> `broker.emqx.io` 是公共服务器。多人同时使用 `cocube/control` 时，可能会收到别人的消息。正式上课时，建议加入班级或设备名称，例如 `cocube/class1/eow/control`，并在 MicroBlocks 和 MQTTX 中同时修改。

### 3. 添加 MQTT 积木库

打开 MicroBlocks，连接 CoCube，然后点击“添加积木库”：

1. 选择“网络”。
2. 找到 `MQTT`。
3. 点击“打开”。

<p align="center"><img src="add_library.png" alt="添加 MQTT 积木库" width="420"></p>

MQTT 库依赖 Wi-Fi 库。添加完成后，可以在积木区中找到连接服务器、订阅主题、发布消息和读取事件等积木。

### 4. 连接 Wi-Fi 和 MQTT 服务器

搭建下面的程序：

<p align="center"><img src="code_connect.png" alt="连接 Wi-Fi 和 MQTT 服务器" width="680"></p>

把“网络名称”和“密码”替换成你所使用的 Wi-Fi 信息。程序的执行过程是：

1. 同时按下 CoCube 的 A、B 按键。
2. CoCube 连接 Wi-Fi。
3. 程序尝试连接 MQTT 服务器 `broker.emqx.io`。
4. 连接成功后退出循环，并显示笑脸图案。

看到笑脸图案，就表示 CoCube 已经连接到 MQTT 服务器。

### 5. 从电脑向 CoCube 发送消息

#### 5.1 CoCube 订阅控制主题

搭建下面的程序：

<p align="center"><img src="code_receive.png" alt="接收并显示 MQTT 消息" width="780"></p>

按下 A 键后，CoCube 会订阅主题：

```text
cocube/control
```

随后，程序每隔 50 毫秒检查一次 MQTT 事件。当收到新消息时，它会：

1. 清空 TFT 屏幕。
2. 显示消息来自哪个主题。
3. 显示消息的具体内容。

“MQTT 事件的主题”用来读取主题，“MQTT 事件的载荷”用来读取消息内容。载荷（Payload）就是消息中真正携带的数据。

#### 5.2 连接 MQTTX

在 MQTTX 中新建连接。连接名称可以随意填写，例如：

| 设置 | 内容 |
| --- | --- |
| Name | `CoCube` |

其他设置保持默认，然后点击“Connect”。

<p align="center"><img src="mqttx_connection.png" alt="MQTTX 连接设置" width="760"></p>

#### 5.3 发送第一条消息

确认 CoCube 已经按过 A 键并开始订阅，在 MQTTX 底部，将消息格式选为“Plaintext”，然后填写主题名和消息内容：

```text
Topic: cocube/control
Message: Hello CoCube!
```

点击右下角的发送按钮。发送成功后，CoCube 的 TFT 屏幕上会显示主题和 `Hello CoCube!`。

<p align="center"><img src="mqttx_send_message.png" alt="从 MQTTX 发送消息" width="760"></p>

<p align="center"><img src="cocube_screen.png" alt="CoCube 收到消息后的屏幕" width="300"></p>


### 6. 从 CoCube 向电脑发送位置

把 CoCube 机器人放到定位地图上，下面的程序会在按下 B 键时，分别发布 CoCube 的位置和方向：

<p align="center"><img src="code_publish_position.png" alt="发布 CoCube 的位置" width="680"></p>

三条消息分别发送到：

```text
cocube/x
cocube/y
cocube/direction
```

#### 6.1 在 MQTTX 中订阅主题

点击“New Subscription”，输入 `cocube/x`，然后点击“Confirm”。

<p align="center"><img src="mqttx_new_subscription.png" alt="新建 MQTT 订阅" width="520"></p>

用相同方法继续订阅：

```text
cocube/y
cocube/direction
```

按下 CoCube 的 B 键，MQTTX 就会收到三条消息。

<p align="center"><img src="mqttx_subscriptions.png" alt="接收 CoCube 的位置消息" width="780"></p>

也可以订阅下面的通配主题，一次接收这三个子主题：

```text
cocube/+
```

符号 `+` 表示“匹配这一层中的任意名称”。因此，`cocube/+` 可以匹配 `cocube/x`、`cocube/y` 和 `cocube/direction`。

### 7. 完整操作顺序

第一次测试时，按照下面的顺序操作：

1. 在 MicroBlocks 中运行全部程序。
2. 同时按下 A、B 键，连接 Wi-Fi 和 MQTT 服务器。
3. 等待 CoCube 显示笑脸图案。
4. 按下 A 键，让 CoCube 订阅 `cocube/control`。
5. 在 MQTTX 中发送 `Hello CoCube!`。
6. 在 MQTTX 中订阅三个位置主题，或直接订阅 `cocube/+`。
7. 按下 B 键，查看 CoCube 发来的位置数据。

### 8. 常见问题

#### CoCube 没有显示笑脸

- 确认 Wi-Fi 名称和密码正确。
- 确认使用的是 2.4 GHz Wi-Fi。
- 确认当前网络可以访问互联网。
- 部分校园或酒店网络需要网页认证，CoCube 无法直接连接这类网络。

#### MQTTX 无法连接

- 检查服务器地址是否为 `broker.emqx.io`。
- 可以稍后重试，公共服务器偶尔会出现短暂拥堵。

#### CoCube 收不到电脑的消息

- 先确认 CoCube 已显示笑脸，再按 A 键订阅。
- 检查两端的主题是否完全一致。
- MQTT 主题区分大小写，`cocube/control` 和 `CoCube/control` 不相同。
- 如果使用了自己的主题前缀，两端必须同时修改。

#### MQTTX 收不到位置数据

- 确认已经订阅 `cocube/x`、`cocube/y`、`cocube/direction` 或 `cocube/+`。
- 确认 CoCube 已连接服务器，再按 B 键。
- 检查 CoCube 是否处于可以读取地图坐标的位置。

### 9. 继续挑战

完成基础通信后，可以尝试：

1. 让 CoCube 每隔 1 秒自动发布一次位置。
2. 发送 `forward`、`backward`、`left`、`right` 等消息，控制 CoCube 移动。
3. 给多台 CoCube 分配不同的主题前缀，分别查看和控制它们。

MQTT 的价值不只是“发送一段文字”。只要约定好主题和消息格式，网页、Python 程序、手机和机器人都可以通过同一个 MQTT 服务器互相协作。
