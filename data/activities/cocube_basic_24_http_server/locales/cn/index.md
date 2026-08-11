平时我们用浏览器访问网站，网页通常保存在远方的服务器上。这一次，CoCube 自己就是一台小型 HTTP 服务器。

只要电脑或手机与 CoCube 连接到同一个 Wi-Fi，就可以在浏览器地址栏中发送请求，让 CoCube 显示文字、点亮像素，甚至向前、向后和旋转。

本教程参考了 MicroBlocks Learn 的 [Controlling the Robot with WiFi](https://learn.microblocks.fun/en/activities/citilab-course-17-en/)，并将案例改写为适合 CoCube 的版本。

### 1. 准备工作

你需要准备：

- 一台 CoCube
- 一台电脑或手机
- 一个 2.4 GHz Wi-Fi 网络
- MicroBlocks
- Chrome 或 Edge 网页浏览器

电脑或手机必须和 CoCube 连接到**同一个 Wi-Fi 网络**。

在 MicroBlocks 中点击“添加积木库”，进入“网络”，找到并打开“HTTP 服务器”。

<p align="center"><img src="add_library.png" alt="添加 HTTP 服务器积木库" width="460"></p>

“HTTP 服务器”依赖 Wi-Fi 库，添加后可以使用连接 Wi-Fi、读取 IP 地址、接收 HTTP 请求和回复请求等积木。

### 2. 让 CoCube 连接 Wi-Fi

先编写下面的程序，将“网络名称”和“密码”替换为你使用的 Wi-Fi 信息。

<p align="center"><img src="scriptImage01_connect.png" alt="连接 Wi-Fi 并显示 IP 地址" width="680"></p>

程序启动后，CoCube 会连接 Wi-Fi，并把自己的 IP 地址显示在 TFT 屏幕上，例如：

```text
172.20.10.2
```

IP 地址就像 CoCube 在局域网中的门牌号。稍后，浏览器要通过这个地址找到它。

你的 CoCube 得到的地址可能与示例不同，请使用 TFT 屏幕上实际显示的地址。

> Wi-Fi 名称和密码会保存在程序中。分享程序或截图前，请删除自己的密码。

### 3. 浏览器向 CoCube 发出请求

HTTP 通信中，浏览器是**客户端**，CoCube 是**服务器**：

- 浏览器向 CoCube 发送 HTTP 请求。
- CoCube 向浏览器返回 HTTP 响应。

搭建下面的程序：

<p align="center"><img src="scriptImage02_request.png" alt="接收并回复 HTTP 请求" width="720"></p>

程序不断读取“HTTP 服务器请求”：

- 没有人访问时，它返回空内容。
- 浏览器访问 CoCube 时，它返回一条请求。
- 程序收到请求后，回复状态 `200 OK` 和文字 `Hello, This is CoCube.`。

在电脑或手机的浏览器中输入：

```text
CoCube的IP地址/test
```

例如：

```text
172.20.10.2/test
```

浏览器会显示 CoCube 返回的文字：

<p align="center"><img src="response.png" alt="浏览器收到 CoCube 的响应" width="360"></p>

浏览器可能会把局域网中的 `http://` 页面标记为“不安全”。本实验没有输入账号、密码或个人信息，可以继续进行。

### 4. 认识请求路径

上一个网址可以分成两部分：

| 部分 | 示例 |
| --- | --- |
| CoCube 地址 | `http://172.20.10.2` |
| 请求路径 | `/test` |

路径是 IP 地址后面以 `/` 开头的内容。我们可以用“请求路径”积木读取它。

<p align="center"><img src="scriptImage03_path.png" alt="读取 HTTP 请求路径" width="680"></p>

访问不同地址时，程序会得到不同路径：

| 浏览器地址 | 请求路径 |
| --- | --- |
| `172.20.10.2/test` | `/test` |
| `172.20.10.2/on` | `/on` |
| `172.20.10.2/forward` | `/forward` |

“HTTP 服务器请求”积木中的内容每读取一次就会被取走，因此程序先把它保存到变量 `request`，后面再从这个变量中读取路径。

### 5. 用网址点亮和熄灭像素

现在让不同路径执行不同任务：

<p align="center"><img src="scriptImage04_pixel_control.png" alt="用 HTTP 路径控制像素" width="720"></p>

程序收到请求后：

- 路径是 `/on`：点亮坐标 `(3,3)` 的像素，并回复 `ON`。
- 路径是 `/off`：熄灭坐标 `(3,3)` 的像素，并回复 `OFF`。

在浏览器中分别访问：

```text
CoCube的IP地址/on
CoCube的IP地址/off
```

访问 `/on` 后，浏览器会显示 `ON`，CoCube 的像素也会被点亮。

<p align="center"><img src="pixel_on.png" alt="访问 on 路径" width="360"></p>

这里的关键不是网页上的 `ON`，而是浏览器通过路径向 CoCube 发出了一条命令。

### 6. 用浏览器遥控 CoCube

把像素控制换成机器人动作，就可以把浏览器地址栏变成一个简单的遥控器。

<p align="center"><img src="scriptImage05_robot_control.png" alt="用 HTTP 路径控制 CoCube" width="720"></p>

程序使用四条路径：

| 请求路径 | CoCube 的动作 |
| --- | --- |
| `/forward` | 向前移动 |
| `/backward` | 向后移动 |
| `/left` | 向左旋转 |
| `/right` | 向右旋转 |

依次访问：

```text
CoCube的IP地址/forward
CoCube的IP地址/backward
CoCube的IP地址/left
CoCube的IP地址/right
```

例如，访问：

```text
172.20.10.2/forward
```

CoCube 就会向前移动。

完成路径判断后，程序会把收到的请求路径返回给浏览器：

| 请求路径 | CoCube 动作 | 浏览器显示 |
| --- | --- | --- |
| `/forward` | 向前移动 | `/forward` |
| `/backward` | 向后移动 | `/backward` |
| `/left` | 向左旋转 | `/left` |
| `/right` | 向右旋转 | `/right` |

响应积木放在路径判断之后，所以只要收到请求，无论路径是否对应一个动作，浏览器都会及时得到回复，不会一直等待。

### 7. 常见问题

#### 浏览器打不开 CoCube 的地址

- 确认 CoCube 已成功连接 Wi-Fi，并显示了 IP 地址。
- 确认电脑或手机与 CoCube 在同一个 Wi-Fi 网络中。
- 在地址前明确输入 `http://`，不要使用 `https://`。
- 检查 IP 地址是否与 TFT 屏幕显示的一致。
- 部分校园、酒店和公共网络会隔离不同设备，可以改用手机热点测试。

#### 浏览器一直加载

- 检查程序是否读取到了 HTTP 请求。
- 确认“回应至 HTTP 请求”积木位于路径判断之后。
- 确认响应积木仍在 `request` 不为空的判断里面。

#### 机器人没有执行动作

- 路径必须以 `/` 开头。
- 路径区分大小写，`/forward` 和 `/Forward` 不相同。
- 检查 CoCube 动作积木是否能单独正常运行。

### 8. 拓展：网页遥控器

每次控制机器人都要修改浏览器地址并不方便。我们还可以让 CoCube 直接提供一个带按钮的控制网页。

[在 MicroBlocks 中打开网页遥控器完整程序][网页遥控器]

更改 Wi-Fi 名称和密码，运行完整程序后，在手机或电脑的浏览器中打开 CoCube 屏幕显示的 IP 地址。按住方向按钮，机器人开始运动；松开按钮，机器人立即停止。网页还会自动更新 CoCube 的坐标和方向。

这个程序加入了 HTML、CSS 和 JavaScript，代码比前面的例子复杂，不要求现在全部读懂。它的核心仍然是本节学习的 HTTP 请求：

| 请求路径 | 作用 |
| --- | --- |
| `/forward` | 向前运动 |
| `/backward` | 向后运动 |
| `/left` | 向左旋转 |
| `/right` | 向右旋转 |
| `/stop` | 停止车轮 |
| `/position` | 读取坐标和方向 |

网页只是把手动输入地址的过程变成了按钮。按下按钮时，网页发送运动请求；松开按钮时，网页发送 `/stop`。这也是网页控制机器人最基本的思路。

[网页遥控器]: https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27HTTP%20server%27%20%27TFT%27%20%27WiFi%27%0A%0Aspec%20%27r%27%20%27control%20page%27%20%27control%20page%27%0Ato%20%27control%20page%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27page%20style%27%29%20%27%3Ch2%3ECoCube%20Control%3C%2Fh2%3E%0A%3Cp%3E%0A%20%20X%3A%20%3Cspan%20id%3D%22x%22%3E%27%20%28%27CoCube%20position_X%27%29%20%27%3C%2Fspan%3E%0A%20%20Y%3A%20%3Cspan%20id%3D%22y%22%3E%27%20%28%27CoCube%20position_Y%27%29%20%27%3C%2Fspan%3E%0A%20%20Angle%3A%20%3Cspan%20id%3D%22angle%22%3E%27%20%28%27CoCube%20direction%27%29%20%27%3C%2Fspan%3E%0A%3C%2Fp%3E%27%20%28%27page%20buttons%27%29%20%28%27page%20script%27%29%20%28%27position%20script%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27page%20buttons%27%20%27page%20buttons%27%0Ato%20%27page%20buttons%27%20%7B%0A%20%20return%20%27%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22forward%22%3EForward%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22left%22%3ELeft%3C%2Fbutton%3E%0A%20%20%3Cbutton%20data-command%3D%22right%22%3ERight%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22backward%22%3EBackward%3C%2Fbutton%3E%0A%3C%2Fp%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20script%27%20%27page%20script%27%0Ato%20%27page%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20send%28command%29%20%7B%0A%20%20%20%20fetch%28%22%2F%22%20%2B%20command%2C%20%7Bcache%3A%20%22no-store%22%7D%29%3B%0A%20%20%7D%0A%0A%20%20function%20stop%28%29%20%7B%0A%20%20%20%20send%28%22stop%22%29%3B%0A%20%20%7D%0A%0A%20%20for%20%28const%20button%20of%20document.querySelectorAll%28%22button%22%29%29%20%7B%0A%20%20%20%20button.onpointerdown%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%20%20%20%20button.setPointerCapture%28event.pointerId%29%3B%0A%20%20%20%20%20%20send%28button.dataset.command%29%3B%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20button.onpointerup%20%3D%20stop%3B%0A%20%20%20%20button.onpointercancel%20%3D%20stop%3B%0A%20%20%7D%0A%0A%20%20window.onblur%20%3D%20stop%3B%0A%20%20document.oncontextmenu%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%20%20document.onselectstart%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20style%27%20%27page%20style%27%0Ato%20%27page%20style%27%20%7B%0A%20%20return%20%27%3C%21doctype%20html%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%22%3E%0A%3Cstyle%3E%0A%20%20body%20%7B%0A%20%20%20%20text-align%3A%20center%3B%0A%20%20%20%20font%3A%2022px%20Arial%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%0A%20%20button%20%7B%0A%20%20%20%20width%3A%2090px%3B%0A%20%20%20%20height%3A%2060px%3B%0A%20%20%20%20margin%3A%206px%3B%0A%20%20%20%20font-size%3A%2018px%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%3C%2Fstyle%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27position%20data%27%20%27position%20data%27%0Ato%20%27position%20data%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27position%20script%27%20%27position%20script%27%0Ato%20%27position%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20updatePosition%28%29%20%7B%0A%20%20%20%20fetch%28%22%2Fposition%22%2C%20%7Bcache%3A%20%22no-store%22%7D%29%0A%20%20%20%20%20%20.then%28function%20%28response%29%20%7B%0A%20%20%20%20%20%20%20%20return%20response.text%28%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.then%28function%20%28text%29%20%7B%0A%20%20%20%20%20%20%20%20const%20position%20%3D%20text.split%28%22%2C%22%29%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22x%22%29.textContent%20%3D%20position%5B0%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22y%22%29.textContent%20%3D%20position%5B1%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22angle%22%29.textContent%20%3D%20position%5B2%5D%3B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20300%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.catch%28function%20%28%29%20%7B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20500%29%3B%0A%20%20%20%20%20%20%7D%29%3B%0A%20%20%7D%0A%0A%20%20updatePosition%28%29%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27%20%27%20%27run%20path%27%20%27run%20path%20_%27%20%27auto%27%20%27%2Fforward%27%0Ato%20%27run%20path%27%20path%20%7B%0A%20%20if%20%28path%20%3D%3D%20%27%2Fforward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fbackward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fleft%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fright%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fstop%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20341%20-24%20%7B%0AwhenStarted%0AwifiConnect%20%27%E7%BD%91%E7%BB%9C%E5%90%8D%E7%A7%B0%27%20%27%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Open%20this%20address%3A%27%205%205%20%28colorSwatch%20255%20255%20255%20255%29%202%20false%0A%27%5Btft%3Atext%5D%27%20%28getIPAddress%29%205%2035%20%28colorSwatch%2080%20210%20230%20255%29%202%20false%0Aforever%20%7B%0A%20%20local%20%27request%27%20%28%27%5Bnet%3AhttpServerGetRequest%5D%27%29%0A%20%20if%20%28request%20%21%3D%20%27%27%29%20%7B%0A%20%20%20%20local%20%27path%27%20%28%27path%20of%20request%27%20request%29%0A%20%20%20%20if%20%28path%20%3D%3D%20%27%2Ffavicon.ico%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2Fposition%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27position%20data%27%29%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2F%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27control%20page%27%29%20%27Content-Type%3A%20text%2Fhtml%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%27run%20path%27%20path%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%27OK%27%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20waitMillis%2020%0A%7D%0A%7D%0A%0A
