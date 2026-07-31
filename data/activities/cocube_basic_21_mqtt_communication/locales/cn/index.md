### CoCube 桌面机器人与 MQTT 通信

本教程将使用 MicroBlocks 和 CoCube 桌面机器人完成一个双向 MQTT 通信项目：

- CoCube 每隔 1 秒向 MQTT 服务器发布一次电量百分比；
- 电脑端订阅主题，实时查看 CoCube 上传的电量；
- 电脑端向另一个主题发布消息；
- CoCube 接收消息，并把消息显示在 TFT 屏幕上。

#### 1. MQTT 是什么

MQTT 是一种轻量级消息通信协议。通信时，设备不直接把消息发送给另一台设备，而是先把消息交给 MQTT 服务器（Broker）。接收方通过订阅相同的“主题”（Topic）取得消息。

本项目使用两个主题：

| 通信方向 | 示例主题 | 消息内容 |
| --- | --- | --- |
| CoCube → 电脑 | `cocube_user_007_pub` | CoCube 电量百分比 |
| 电脑 → CoCube | `cocube_user_007_sub` | 要在 TFT 屏幕显示的文本 |

> `007` 是设备或用户编号。多人同时实验时，请给每台 CoCube 分配不同编号，并保证 MicroBlocks 程序与电脑端 MQTT 客户端中的主题完全一致。主题区分大小写。

#### 2. 准备工作

需要准备：

- 一台 CoCube 桌面机器人；
- 一台安装或能够运行 MicroBlocks 的电脑；
- 可用的 Wi-Fi 网络；
- MQTT.fx 客户端，用于在电脑上发布和订阅消息。Windows 版安装包可在教程末尾下载；
- MQTT 服务器地址、用户名和密码（如果服务器要求认证）。

请新建一个 MicroBlocks 项目，并按照本教程逐步搭建程序。建议亲手完成 Wi-Fi 连接、MQTT 发布与订阅、消息判断和 TFT 显示等积木，这样能够更好地理解完整通信流程。

教程末尾提供的 UBP 工程仅用于完成程序后的对照和排查，不建议在开始学习时直接打开或照搬。

示例工程中的 MQTT 服务器地址是本教程课堂环境使用的 Broker。公开页面不提供通用账号密码；请使用老师或服务器管理员提供的 Broker 地址、端口、用户名和密码。如果服务器不要求认证，则相应字段可以留空。

#### 3. 安装并连接 MQTT.fx

本教程使用 MQTT.fx 作为电脑端 MQTT 客户端。请从 MQTT.fx 官方渠道或学校提供的安装包完成安装；学校电脑若没有安装权限，请联系管理员。安装完成后，按下面的 10 个步骤连接 MQTT 服务器。

##### 3.1 打开连接配置

**步骤 1：** 单击 Windows 任务栏上的“搜索”按钮。

**步骤 2：** 搜索“MQTT.fx”，单击搜索结果进入软件主界面。

**步骤 3：** 在主界面中单击连接配置框旁边的齿轮“设置”按钮，进入 MQTT 连接配置界面。

![在 MQTT.fx 主界面打开连接设置](mqtt1.png =640x*)

##### 3.2 新建 Broker 连接

进入“Edit Connection Profiles”界面后继续配置：

**步骤 4：** 单击左下角的“+”，新建一个连接配置。“Profile Name”可填写“CoCube MQTT”，“Profile Type”保持为“MQTT Broker”。

**步骤 5：** 在“Broker Address”中填写服务器地址，在“Broker Port”中填写端口。

| 字段 | 填写内容 |
| --- | --- |
| “Broker Address” | 老师或服务器管理员提供的 Broker 地址 |
| “Broker Port” | `1883` |

**步骤 6：** 单击“Client ID”右侧的“Generate”，生成唯一的客户端 ID。

![设置 MQTT Broker 地址、端口和客户端 ID](mqtt2.png =520x*)

> 每个 MQTT 客户端都应使用不同的 Client ID。不要让 MQTT.fx 与 CoCube 使用相同的 Client ID，否则后连接的客户端可能把先连接的客户端挤下线。

##### 3.3 填写认证信息

**步骤 7：** 单击“User Credentials”，进入认证信息设置界面。

**步骤 8：** 如果服务器要求认证，在“User Name”和“Password”中填写老师或服务器管理员提供的用户名和密码。

**步骤 9：** 单击右下角的“OK”保存配置。

![填写 MQTT 用户名和密码](mqtt3.png =640x*)

> 连接服务器时，不要照抄他人的账号信息，应使用当前服务器提供的认证信息；如果服务器不需要认证，可将用户名和密码留空。

##### 3.4 连接并检查状态

**步骤 10：** 返回 MQTT.fx 主界面，在连接配置下拉框中选择刚创建的“CoCube MQTT”，然后单击“Connect”。如果右上角状态灯变为绿色，并且“Disconnect”按钮可用，表示连接成功。

![MQTT.fx 成功连接服务器](mqtt4.png =640x*)

如果连接失败，请依次检查 Broker 地址、端口 `1883`、用户名、密码和网络连接。还要确认客户端 ID 没有与其他在线设备重复。

#### 4. 连接 Wi-Fi

程序开始时，先清除 TFT 屏幕，再连接 Wi-Fi。

![清除 TFT 屏幕并连接 Wi-Fi](conect_wifi_CN.png)

将积木中的两个空白参数分别改为：

1. Wi-Fi 名称（SSID）；
2. Wi-Fi 密码。

“连接 WiFi 至 [你的 Wi-Fi 名称] 密码 [你的 Wi-Fi 密码]”

不要在公开分享的截图或 UBP 文件中保留真实 Wi-Fi 密码。

#### 5. 连接 MQTT 服务器

Wi-Fi 连接命令之后，使用 MQTT 积木连接服务器。

![连接 MQTT 服务器](conect_server_CN.png)

示例参数如下：

| 参数 | 示例值 | 说明 |
| --- | --- | --- |
| MQTT 服务器 | 由服务器提供 | Broker 的主机名 |
| 缓存大小 | `128` | 收发消息的缓存大小，不是端口号 |
| 客户端 ID | MAC 地址 | 使用 CoCube 的 MAC 地址，避免客户端 ID 重复 |
| 用户名 | 由服务器提供 | 如果服务器要求认证，请填写对应用户名 |
| 密码 | 由服务器提供 | 如果服务器要求认证，请填写对应密码 |

示例 UBP 中的用户名和密码输入框为空。如果服务器要求认证，请填入服务器提供的账号和密码，并确保 CoCube 与 MQTT.fx 使用相同的服务器认证信息。如果使用其他服务器，应将服务器地址、端口及认证信息全部替换为该服务器的实际配置。

#### 6. 判断连接状态并订阅主题

连接命令发出后，用“MQTT 服务器已连接”条件判断连接是否成功。

![判断 MQTT 连接并订阅主题](judge_CN.png)

连接成功后依次执行：

1. 在 TFT 屏幕显示 `MQTT Server Connected.`；
2. 订阅电脑向 CoCube 发送消息所用的主题；
3. 广播 `start_sending_message`，启动电量发布脚本；
4. 广播 `start_receiving_message`，启动消息接收脚本。

示例工程默认订阅 `cocube_user_sub`。如果设备编号是 `007`，应将它改为 `cocube_user_007_sub`。

连接成功后，CoCube 屏幕显示如下内容：

![CoCube 成功连接 MQTT 服务器](result1.png =360x*)

#### 7. 让 CoCube 发布电量

示例工程收到 `start_sending_message` 广播后，会重复执行以下流程：

1. 发布主题 `cocube_user_pub`，载荷为 CoCube 电量百分比。
2. 等待 `1` 秒。

若使用编号 `007`，请把发布主题改成 `cocube_user_007_pub`。

其中“CoCube 电量百分比”积木会返回当前电量，程序每隔 1 秒发布一次，因此电脑端会持续收到新的数值。

##### 在电脑端查看电量

1. 打开 MQTT 客户端并连接到与 CoCube 相同的服务器；
2. 打开“Subscribe”页面；
3. 输入 `cocube_user_007_pub`；
4. 单击“Subscribe”。

如果配置正确，消息列表中会不断出现 CoCube 上传的电量数值。

![电脑端订阅 CoCube 电量主题](send1.png =640x*)

截图中的 `79`、`80`、`81` 等数字就是 CoCube 发布的电量百分比。

#### 8. 让 CoCube 接收电脑消息

示例工程收到 `start_receiving_message` 广播后，会不断读取最近一次 MQTT 事件的载荷，并将载荷保存到变量 `MESSAGE`。

![读取 MQTT 消息并显示在 TFT 屏幕](receive_CN.png)

程序逻辑如下：

1. 重复读取最近一次 MQTT 事件的载荷，并保存到变量 `MESSAGE`。
2. 如果 `MESSAGE` 的长度大于 `0`，清除 TFT 屏幕。
3. 显示“MQTT Server Connected. Receive Message:”。
4. 在下一行显示 `MESSAGE`。

先判断消息长度是否大于 `0`，可以避免在没有收到有效消息时反复刷新屏幕。

##### 从电脑向 CoCube 发送消息

1. 在 MQTT 客户端中打开“Publish”页面；
2. 主题填写 `cocube_user_007_sub`；
3. 在载荷输入框中填写要发送的文字或数字；
4. 单击“Publish”。

![电脑端向 CoCube 发布消息](receive1.png =640x*)

截图中发送的载荷为 `1145141919810`。

CoCube 收到消息后，会将它显示在 TFT 屏幕上：

![CoCube TFT 屏幕显示收到的 MQTT 消息](receive_result.png =360x*)

#### 9. 完整程序流程

1. 启动程序。
2. 清除 TFT 屏幕。
3. 连接 Wi-Fi。
4. 连接 MQTT 服务器。
5. 如果连接失败，检查网络和服务器配置。
6. 如果连接成功，显示连接成功并订阅 `sub` 主题。
7. 同时启动两个循环：每秒向 `pub` 主题发布电量；读取 `sub` 主题消息并显示到 TFT。

在示例 UBP 中，三个主要脚本分别负责：

- 主脚本：连接 Wi-Fi 和 MQTT、订阅主题、发送启动广播；
- 发送脚本：每隔 1 秒发布一次 CoCube 电量；
- 接收脚本：读取 MQTT 事件载荷并显示在 TFT 屏幕上。

#### 10. 测试检查表

按下面的顺序测试，可以快速确定问题出现在哪一步：

- [ ] CoCube 已与 MicroBlocks 正常连接；
- [ ] Wi-Fi 名称和密码正确；
- [ ] MQTT.fx 已安装，连接后右上角状态灯为绿色；
- [ ] MQTT.fx 和 CoCube 使用不同的 Client ID；
- [ ] TFT 屏幕出现 `MQTT Server Connected.`；
- [ ] 电脑端和 CoCube 使用同一个 MQTT 服务器；
- [ ] 电脑订阅的主题与 CoCube 发布主题完全相同；
- [ ] 电脑发布的主题与 CoCube 订阅主题完全相同；
- [ ] 电脑端能够连续收到电量数值；
- [ ] 电脑发送消息后，CoCube TFT 屏幕能够显示载荷。

#### 11. 常见问题

##### MQTT.fx 无法连接服务器

确认“Broker Address”没有包含 `http://` 或 `https://`，端口、用户名和密码符合所用服务器的实际配置，并为 MQTT.fx 生成一个未被占用的 Client ID。不同服务器的端口和认证方式可能不同。

##### TFT 屏幕没有出现连接成功提示

检查 Wi-Fi 名称、密码和 MQTT 服务器地址。若 Broker 要求认证，还要填写正确的用户名和密码。客户端 ID 重复时，服务器也可能断开已有连接，因此建议使用 CoCube 的 MAC 地址作为客户端 ID。

##### 电脑端收不到 CoCube 电量

确认电脑订阅的是 CoCube 的发布主题。例如 CoCube 发布到 `cocube_user_007_pub`，电脑也必须订阅 `cocube_user_007_pub`，不能订阅 `_sub` 主题。

##### CoCube 收不到电脑发送的消息

确认 CoCube 已订阅 `cocube_user_007_sub`，电脑也向同一个主题发布。注意主题区分大小写，并检查编号、下划线和后缀是否一致。

##### 短消息正常，长消息显示不完整

示例连接积木的缓存大小为 `128`。消息过长时可以适当增加缓存，但会占用更多内存。课堂实验建议先使用较短的纯文本载荷。

##### 多台 CoCube 收到了同一条消息

这些设备很可能订阅了相同主题。为每台设备分配唯一编号，例如：

- `cocube_user_001_pub` / `cocube_user_001_sub`
- `cocube_user_002_pub` / `cocube_user_002_sub`
- `cocube_user_003_pub` / `cocube_user_003_sub`

#### 12. 进一步尝试

完成基础通信后，可以继续扩展：

- 发布 CoCube 的传感器数据或运动状态；
- 用 `forward`、`left`、`right`、`stop` 等消息远程控制机器人；
- 使用 JSON 同时发送命令和参数；
- 为不同 CoCube 设计独立主题；
- 增加断线检测与自动重连提示。

例如，可以约定电脑发送 `forward`、`left`、`right`、`stop`。

CoCube 收到消息后，通过条件判断执行对应的运动积木，就能把本项目扩展成一个基于 MQTT 的桌面机器人远程控制系统。

#### 配套参考文件

[下载 `CoCube_MQTT_01.ubp`](CoCube_MQTT_01.ubp)

[下载 `mqttfx-1.7.1-windows-x64.exe`](mqttfx-1.7.1-windows-x64.exe)

> 此 UBP 工程仅供完成教程后对照程序结构、检查积木参数或排查问题。建议先根据教程自行搭建程序，再使用参考工程进行比较。
