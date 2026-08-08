本教程使用 **CoCube + MicroBlocks + MQTTX + EMQX 公共 MQTT 服务器**，完成一个最小但完整的物联网项目：

- CoCube 每隔 1 秒发布一次电量百分比；
- MQTTX 订阅主题并接收 CoCube 的电量；
- MQTTX 向同一主题发布文字；
- CoCube 接收文字并显示在 TFT 屏幕上。

### 1. MQTT 与 MQTTX 简介

#### 1.1 什么是 MQTT

MQTT（Message Queuing Telemetry Transport，消息队列遥测传输）是一种轻量级、基于发布/订阅模式的通信协议，专为低带宽、不稳定或高延迟的网络环境设计。它最初由 IBM 在 1999 年开发，主要用于物联网（IoT）设备之间的通信。

MQTT 协议的核心思想是通过“主题”（Topic）组织消息：设备可以向特定主题发布消息，也可以订阅感兴趣的主题来接收消息。由于协议开销小、传输效率高，MQTT 很适合传感器、嵌入式设备、移动设备等资源受限的终端。

#### 1.2 MQTT 的三个主要角色

MQTT 采用“发布/订阅”方式传递消息，参与通信的三个核心角色是：

- **Publisher（发布者）**：把消息发布到某个主题。本项目中，CoCube 会发布电量，MQTTX 会发布需要显示的文字。
- **Subscriber（订阅者）**：订阅感兴趣的主题，并接收该主题上的消息。本项目中，CoCube 和 MQTTX 都会充当订阅者。
- **Broker（代理服务器）**：接收发布者发来的消息，再根据订阅列表把消息转发给相应的订阅者。本教程使用 EMQX 提供的公共 Broker：`broker.emqx.io`。

**Topic（主题）**不是一个独立角色，而是组织和路由消息的“频道名称”。本教程使用的主题是 `cocube_mqtt`。

本项目的消息流如下：

| 消息方向 | 传递过程 |
| --- | --- |
| CoCube 发布电量 | CoCube → `broker.emqx.io` → MQTTX |
| MQTTX 发布文字 | MQTTX → `broker.emqx.io` → CoCube |

两个方向都使用主题 `cocube_mqtt`。

#### 1.3 什么是 MQTTX

[MQTTX](https://mqttx.app/zh) 是由 [EMQ](https://www.emqx.com/zh) 开发的一款开源、跨平台 MQTT 5.0 客户端，兼容 Windows、macOS 和 Linux。

MQTTX 的界面采用聊天式设计，操作直观。它支持快速创建和保存多个 MQTT 连接，可用于测试 MQTT/MQTTS 连接以及 MQTT 消息的订阅和发布。本教程使用 MQTTX 与 CoCube 互发消息，并观察通信结果。

如果不想安装桌面客户端，也可以直接打开 [MQTTX Web 在线客户端](https://mqttx.app/web-client) 进行实验。

需要特别区分：**EMQX** 是 MQTT 代理服务器软件或服务，负责转发消息；**MQTTX** 是 MQTT 客户端工具，用来连接服务器、订阅主题和发布测试消息。

### 2. 准备工作

开始前需要准备：

- 一台 CoCube；
- 一台能够运行 MicroBlocks 的电脑；
- CoCube 可以连接的 Wi-Fi；
- [MQTTX 桌面客户端](https://mqttx.app/zh)，或可直接访问的 [MQTTX Web 在线客户端](https://mqttx.app/web-client)。

在 MicroBlocks 中新建一个空白工程，并连接 CoCube。接下来先添加 MQTT 积木库，再逐步搭建程序。

### 3. 在 MicroBlocks 中添加 MQTT 积木库

MQTT 连接、订阅、发布和事件积木来自 MQTT 库。开始搭建程序前，先把它添加到 MicroBlocks：

1. 打开 MicroBlocks 的“文件”菜单，选择“打开”；
2. 在“文件打开”窗口左侧选择“积木库”；
3. 在中间的分类列表中选择“网络”。

<p align="center"><img src="add_library_category.png" alt="打开 MicroBlocks 的网络积木库分类" width="480"></p>

4. 在右侧列表中选择“MQTT”；
5. 单击右下角的“打开”，完成添加。

<p align="center"><img src="add_mqtt_library.png" alt="选择并添加 MQTT 积木库" width="190"></p>

添加完成后，积木面板中会出现 MQTT 相关积木。MQTT 库依赖 WiFi 库，通常会同时加载连接 Wi-Fi 所需的积木。如果没有看到“连接 WiFi”积木，可用相同方法在“网络”分类中添加“WiFi”库。

### 4. 在 MQTTX 中创建 EMQX 服务器连接

这里所说的“创建服务器”，实际是指在 MQTTX 中新建一个连接配置。`broker.emqx.io` 已经是可用的公共 Broker，不需要自己部署服务器。

#### 4.1 新建连接

打开 MQTTX，在连接页面单击左侧的“+”或页面中的“New Connection”。

<p align="center"><img src="mqttx_new_connection.png" alt="在 MQTTX 中新建连接" width="760"></p>

建议填写以下参数：

| 配置项 | 推荐值 | 说明 |
| --- | --- | --- |
| Name | `mqtt_test` | 仅用于在 MQTTX 中识别连接 |
| Client ID | 自动生成的唯一值 | 不要与其他客户端重复 |
| Host | `broker.emqx.io` | 不要在 MicroBlocks 积木中加 `http://` 或 `https://` |
| Protocol | `mqtt://` | MQTTX 桌面版可使用原生 MQTT |
| Port | `1883` | 非加密 MQTT 的常用端口 |
| Username | 留空 | EMQX 公共 Broker 不要求此项 |
| Password | 留空 | EMQX 公共 Broker 不要求此项 |
| SSL/TLS | 关闭 | 与端口 `1883` 对应 |

如果使用的是基于浏览器或 WebSocket 的 MQTTX，可改用 `ws://broker.emqx.io:8083/mqtt`。MQTTX 与 CoCube 可以使用不同传输端口，只要它们连接的是同一个 Broker，就仍然能通过同一主题通信。

保存后单击“Connect”。连接名称旁出现绿色状态标志，表示 MQTTX 已成功连接到服务器。

> `broker.emqx.io` 是公开测试服务器。任何人都可能发布或订阅公共主题，请勿发送密码、个人信息等敏感内容，也不要将它用于正式项目。

### 5. 创建并订阅主题

MQTT 主题不需要先在服务器后台建立。客户端第一次订阅或发布某个主题时，这个主题就可以开始传递消息。

连接成功后，单击“New Subscription”，填写：

| 配置项 | 本教程使用的值 |
| --- | --- |
| Topic | `cocube_mqtt` |
| QoS | `0` |
| Alias | 可留空，或填写 `CoCube` |

然后单击“Confirm”。

<p align="center"><img src="mqttx_subscription.png" alt="在 MQTTX 中新建主题订阅" width="700"></p>

> 截图中的 `testtopic/#` 是 MQTTX 的通配符订阅示例。跟随本教程时应填写 `cocube_mqtt`，这样才能与后面搭建的 CoCube 程序保持一致。

主题名称区分大小写，空格、斜杠和下划线也必须完全一致。公共服务器上建议把主题改成带个人编号的名称，例如 `cocube_mqtt_023`；修改后，MQTTX 和所有 MicroBlocks 积木中的主题都必须一起更改。

### 6. 本项目会用到的关键积木

#### 6.1 连接 Wi-Fi

<p align="center"><img src="wifi_connect_block.png" alt="连接 Wi-Fi 积木" width="560"></p>

“连接 WiFi”积木的两个输入框分别填写 Wi-Fi 名称（SSID）和密码。它必须在连接 MQTT 之前执行，因为 MQTT 通信依赖网络连接。正式搭建时，还要先使用“清除 TFT 屏幕显示”积木清理上一次运行留下的内容。

#### 6.2 连接 MQTT 服务器

“连接到 MQTT 服务器”积木用于填写 Broker 地址：

<p align="center"><img src="mqtt_connect_block.png" alt="连接 MQTT 服务器积木" width="560"></p>

本教程填入 EMQX 公共 Broker：

<p align="center"><img src="connect_broker.png" alt="填写 broker.emqx.io" width="720"></p>

本教程只填写服务器域名。此时 MQTT 库会使用默认缓冲区大小、以设备 MAC 地址作为客户端 ID，并留空用户名和密码。

#### 6.3 判断连接是否成功

<p align="center"><img src="mqtt_connected_block.png" alt="MQTT 服务器已连接判断积木" width="400"></p>

“MQTT 服务器已连接”是布尔值积木。把它放进“如果”条件中，可以确保后续的订阅和收发脚本只在连接成功后启动。

#### 6.4 订阅主题

<p align="center"><img src="mqtt_subscribe_block.png" alt="订阅主题积木" width="460"></p>

“订阅主题”表示希望接收该主题上的消息。图片里的 `testTopic` 是积木自带的示例文字，实际搭建时要把它替换为 `cocube_mqtt`，并使用默认 QoS `0`。

#### 6.5 发布消息

<p align="center"><img src="mqtt_publish_block.png" alt="发布主题与载荷积木" width="680"></p>

“向主题发布载荷”包含两个关键参数：

- **主题**：消息要进入哪个频道；
- **载荷（Payload）**：真正要发送的文字、数字或数据。

图片中的 `testTopic` 和 `Hello!` 只是积木的默认示例。发送 CoCube 电量时，主题应改为 `cocube_mqtt`，载荷位置放入“电量百分比”积木。

#### 6.6 读取 MQTT 事件和载荷

<p align="center"><img src="mqtt_event_block.png" alt="MQTT 事件积木" width="320"></p>

“MQTT 事件”用于取得新到达的 MQTT 事件。

<p align="center"><img src="mqtt_event_payload_block.png" alt="从 MQTT 事件中提取载荷" width="430"></p>

“MQTT 事件的载荷”从事件中取出消息正文。我们会把这个结果保存到变量 `MESSAGE`，再显示到 TFT 屏幕上。

### 7. 搭建完整的消息收发程序

完整程序由三段主要脚本组成。搭建前先新建变量 `MESSAGE`，用于保存收到的载荷。本节使用的积木图片是按功能截取的局部图片，因此下面会明确说明每张图片对应哪一部分；图片没有展示的帽子积木或广播会单独列出。

#### 7.1 第一段：联网、连接 Broker、订阅并启动任务

##### 第一步：清屏并连接 Wi-Fi

先放置“清除 TFT 屏幕显示”积木，再把“连接 WiFi”积木接在它下面。将图片中的两个空白输入框分别替换为自己的 Wi-Fi 名称和密码。

<p align="center"><img src="main_connect_wifi.png" alt="主脚本的清屏和连接 Wi-Fi 部分" width="620"></p>

##### 第二步：连接 MQTT 服务器

在“连接 WiFi”积木下面接入“连接到 MQTT 服务器”积木，并在输入框中填写 `broker.emqx.io`。

<p align="center"><img src="connect_broker.png" alt="主脚本的 MQTT 服务器连接部分" width="720"></p>

##### 第三步：判断连接状态并订阅主题

在“连接到 MQTT 服务器”积木下面放置“如果”积木，并把“MQTT 服务器已连接”作为判断条件。图片显示的“如果”分支中依次包含：

1. 在 TFT 的 `(5, 5)` 位置写入 `MQTT Server Connected.`；
2. 订阅主题 `cocube_mqtt`。

<p align="center"><img src="connect_and_subscribe.png" alt="连接成功后显示提示并订阅主题" width="780"></p>

上图只展示“如果”分支，没有展示前面的 Wi-Fi 和 MQTT 连接积木。请将前三张局部图片所示积木按本节顺序上下连接。

##### 第四步：启动发送和接收脚本

在“订阅主题 `cocube_mqtt`”积木下面继续加入：

1. 广播 `start_sending_message`；
2. 广播 `start_receiving_message`。

<p align="center"><img src="start_broadcasts.png" alt="广播 start_sending_message 和 start_receiving_message" width="650"></p>

把图中的两条广播接在“订阅主题”积木下面。它们用于启动后面两段独立脚本。如果 MQTT 没有连接成功，“如果”分支内的显示、订阅和广播都不会执行。

#### 7.2 第二段：每秒发布一次 CoCube 电量

先放置“当收到广播 `start_sending_message`”帽子积木，再把下面的循环接在帽子积木下方：

1. 重复执行；
2. 向主题 `cocube_mqtt` 发布“电量百分比”；
3. 等待 `1000000` 微秒。

<p align="center"><img src="publish_battery.png" alt="电量发送脚本中的重复执行部分" width="720"></p>

图片从“重复执行”积木开始，没有包含上方的“当收到广播 `start_sending_message`”帽子积木。`1000000` 微秒等于 1 秒。等待积木很重要：如果没有等待，设备会以极高频率发布消息，既占用网络和服务器资源，也不利于观察结果。

#### 7.3 第三段：接收消息并显示到 TFT

先放置“当收到广播 `start_receiving_message`”帽子积木，在其下方加入“重复执行”，然后把下图所示积木放入循环内部。

图片中的积木顺序是：

1. 把变量 `MESSAGE` 设为“MQTT 事件的载荷”，其输入为“MQTT 事件”；
2. 如果 `MESSAGE` 的长度大于 `0`，执行条件分支；
3. 清除 TFT 屏幕；
4. 在 `(5, 5)` 位置写入 `MQTT Server Connected. Receive Message:`；
5. 在 `(5, 50)` 位置写入变量 `MESSAGE`。

<p align="center"><img src="receive_and_display.png" alt="接收循环内部的载荷读取与 TFT 显示积木" width="780"></p>

图片没有包含外层的“当收到广播”帽子积木和“重复执行”积木。先判断消息长度，可以避免在没有收到有效载荷时清屏。

#### 7.4 三段脚本的对应关系

1. 主脚本连接 Wi-Fi 和 MQTT，并订阅 `cocube_mqtt`。
2. 主脚本广播 `start_sending_message`，启动每秒发布电量的发送脚本。
3. 主脚本广播 `start_receiving_message`，启动读取载荷并显示到 TFT 的接收脚本。

### 8. 完整收发测试

为了避免漏掉程序刚启动时的消息，建议按照下面的顺序测试。

#### 8.1 让 MQTTX 先等待消息

1. 在 MQTTX 中连接 `broker.emqx.io`；
2. 确认已经订阅 `cocube_mqtt`；
3. 保持 MQTTX 的连接页面打开。

#### 8.2 启动 CoCube 程序

1. 在 MicroBlocks 中连接 CoCube；
2. 将 Wi-Fi 名称和密码改成自己的实际信息；
3. 单击主脚本最上方的“清除 TFT 屏幕显示”积木，运行整段主脚本；
4. 等待 TFT 显示 `MQTT Server Connected.`。

连接成功时，CoCube 的实际显示效果如下。由于屏幕宽度有限，英文会自动换行。

<p align="center"><img src="cocube_connected.jpg" alt="CoCube 成功连接 MQTT 服务器" width="380"></p>

连接和订阅成功后，MQTTX 应每隔约 1 秒收到一个电量数值，例如 `40`、`41`。

<p align="center"><img src="mqttx_battery_messages.png" alt="MQTTX 接收 CoCube 发布的电量" width="780"></p>

这说明数据已经完成以下路径：

```text
CoCube → broker.emqx.io → MQTTX
```

#### 8.3 从 MQTTX 向 CoCube 发送文字

在 MQTTX 页面底部的发布区域设置：

| 项目 | 值 |
| --- | --- |
| Payload 格式 | `Plaintext` |
| QoS | `0` |
| Topic | `cocube_mqtt` |
| Payload | `hello`、`word` 或任意简短文字 |

单击右下角的绿色发送按钮。

<p align="center"><img src="mqttx_publish_message.png" alt="MQTTX 向 cocube_mqtt 发布文字" width="780"></p>

CoCube 收到消息后，会清除 TFT，并在屏幕上显示消息正文。下图中 MQTTX 发布的载荷是 `word`，CoCube 的屏幕也显示了 `word`。

<p align="center"><img src="message_on_cocube.jpg" alt="CoCube 显示从 MQTTX 收到的 word 消息" width="360"></p>

此时数据走完反方向：

```text
MQTTX → broker.emqx.io → CoCube
```

MQTTX 中同时出现已发布和已接收的消息，说明主题已经可以双向传递数据：

<p align="center"><img src="mqttx_message_result.png" alt="同一主题上的完整收发结果" width="780"></p>

### 9. 为什么 CoCube 可能收到自己的电量

为了减少入门阶段需要配置的内容，本教程只使用一个主题 `cocube_mqtt`。CoCube 既订阅这个主题，又向这个主题发布电量，因此 Broker 也可能把 CoCube 自己发布的电量转发回 CoCube。

这会产生两个现象：

- TFT 可能显示 CoCube 自己的电量；
- MQTTX 发出的文字可能只显示不到 1 秒，随后被下一条电量覆盖。

下图中的 `40` 就是 CoCube 发布到 `cocube_mqtt` 后，又从同一主题收到的电量载荷：

<p align="center"><img src="battery_on_cocube.jpg" alt="CoCube 收到并显示自己发布的电量 40" width="360"></p>

进行第一次实验时，可以暂时停止电量发送脚本，以便观察接收结果。完成基础实验后，更推荐使用两个方向不同的主题：

| 方向 | 推荐主题 |
| --- | --- |
| CoCube → MQTTX | `cocube_mqtt/设备编号/up` |
| MQTTX → CoCube | `cocube_mqtt/设备编号/down` |

例如设备编号是 `023`：

```text
cocube_mqtt/023/up
cocube_mqtt/023/down
```

对应修改方式：

1. CoCube 的“订阅主题”改为 `cocube_mqtt/023/down`；
2. CoCube 的“发布载荷”主题改为 `cocube_mqtt/023/up`；
3. MQTTX 订阅 `cocube_mqtt/023/up`；
4. MQTTX 向 `cocube_mqtt/023/down` 发布文字。

### 10. 检查清单

- [ ] CoCube 已在 MicroBlocks 中正常连接；
- [ ] 工程中的 Wi-Fi 名称和密码已替换；
- [ ] MQTTX 和 CoCube 都连接到 `broker.emqx.io`；
- [ ] MQTTX 显示绿色连接状态；
- [ ] MQTTX 和 CoCube 使用的主题完全相同；
- [ ] 两端都使用 QoS `0` 进行基础测试；
- [ ] TFT 显示 `MQTT Server Connected.`；
- [ ] MQTTX 能每秒收到一次电量；
- [ ] MQTTX 发布文字后，CoCube 的 TFT 能显示该文字。

### 11. 常见问题

#### MQTTX 无法连接

检查网络、Broker 地址和端口。桌面版原生 MQTT 通常使用 `broker.emqx.io:1883`；WebSocket 通常使用 `ws://broker.emqx.io:8083/mqtt`。Client ID 应保持唯一。

#### CoCube 没有显示连接成功

先检查 Wi-Fi 名称和密码，再确认服务器积木中只填写 `broker.emqx.io`。连接失败后，程序不会启动收发广播，因此需要修正配置并重新运行主脚本。

#### MQTTX 收不到电量

确认 MQTTX 订阅的是 `cocube_mqtt`，而不是截图中的示例主题 `testtopic/#`。同时检查电量发送脚本是否已经收到 `start_sending_message` 广播。

#### CoCube 收不到 MQTTX 的文字

确认 MQTTX 发布区域的主题也是 `cocube_mqtt`，载荷格式选择 `Plaintext`，并且消息内容不为空。主题区分大小写。

#### 文字刚显示就变成数字

这是单主题双向通信造成的正常现象：下一条电量覆盖了文字。可以暂停电量发送脚本，或按第 9 节改成 `/up` 和 `/down` 两个主题。

#### 多组同学的消息互相干扰

公共 Broker 上的 `cocube_mqtt` 不是私有主题。给每台设备添加唯一编号，例如 `cocube_mqtt_023`，并在 MQTTX 与 MicroBlocks 中同时修改。

### 12. 小结

完成本项目后，你已经走通了物联网通信的完整闭环：

1. CoCube 连接 Wi-Fi；
2. CoCube 和 MQTTX 连接同一个 EMQX Broker；
3. 客户端通过同名主题建立消息通道；
4. CoCube 发布电量，MQTTX 订阅并接收；
5. MQTTX 发布文字，CoCube 订阅、解析载荷并显示。

在此基础上，可以把电量替换为传感器数据，也可以把收到的文字扩展成 `forward`、`left`、`right`、`stop` 等控制命令，实现真正的远程机器人控制。

### 13. 参考工程

完成上述教程后，可以下载并打开参考工程，对照三段脚本的结构、积木参数和广播名称：

<a href="CoCube_MQTT_01.ubp" download="CoCube_MQTT_01.ubp">下载 <code>CoCube_MQTT_01.ubp</code> 参考工程</a>

参考工程只用于完成教程后的对照和排错，不替代前面的逐步搭建过程。

> 运行参考工程前，请先把其中的 Wi-Fi 名称和密码替换成自己的网络信息。对外分享 `.ubp` 文件前，也应删除真实的 Wi-Fi 密码。
