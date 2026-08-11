### MicroBlocks 高级程序调用：用广播消息控制 CoCube

在 MicroBlocks 里，广播不只是“发一条消息”。它可以唤醒脚本、传递命令、调用自定义积木，甚至可以像“远程函数调用”一样，从网页或 Python 上位机控制 CoCube 执行任务。

本教程会从最基础的广播开始，一步步过渡到：

- 用网页通过 BLE 给 CoCube 发送广播消息。
- 用“最后消息”读取广播内容。
- 用广播调用无参数的自定义积木。
- 用 `call,函数名,参数列表` 的格式调用带参数的自定义积木。
- 查看已有积木的函数名和参数列表，并通过广播调用它们。
- 把同样的消息机制扩展到 Python 上位机，以及之后的 MQTT、UDP 等通信方式。

#### 1. 广播机制：从网页遥控 CoCube

先打开网页遥控器：

[https://microblocks.fun/rfp/remote.html](https://microblocks.fun/rfp/remote.html)

这个网页可以通过 BLE 连接运行 MicroBlocks 的 CoCube，然后发送广播消息。连接成功后，在网页输入框中输入消息，再点击 `Send`，CoCube 端对应的“当收到”脚本就会被唤醒。

![网页遥控器](2_website_page.png)

最简单的写法是：不同的广播消息对应不同的任务。

![基础广播控制](1_boardcast.png)

例如：

| 收到的消息 | 执行的任务 |
| --- | --- |
| `forward` | 向前移动 |
| `backward` | 向后移动 |
| `left` | 向左旋转 |
| `right` | 向右旋转 |
| `smile` | 显示笑脸并播放提示音 |

这种写法很适合刚开始理解广播机制。网页发送的不是复杂数据，而是一个个“任务名字”。CoCube 端提前写好对应的任务脚本，收到哪个广播，就执行哪个任务。

可以在网页中依次发送：

- `forward`
- `backward`
- `left`
- `right`
- `smile`

观察 CoCube 是否完成对应动作。

这里要注意：广播消息的文字必须和“当收到”积木里的文字一致。比如网页发送的是 `forward`，程序里就要有“当收到 forward”。

#### 2. 最后消息：读取广播内容

上一节中，每一种消息都写一个“当收到”脚本。如果消息很多，程序会变得很散。

MicroBlocks 里有一个很重要的积木：`最后消息`。它可以读取刚刚收到的广播内容。

我们可以写一个统一的接收脚本：先读取 `最后消息`，再把消息放进 `if / 否则如果` 判断中，决定机器人要执行哪个任务。

![最后消息驱动任务](2_last_message_new.png)

这个程序的意思是：

1. 当收到任意广播时，把“最后消息”保存到变量 `msg`。
2. 清空 TFT 屏幕，并在 TFT 屏幕上显示 `msg`。
3. 如果 `msg = forward`，向前移动。
4. 否则如果 `msg = backward`，向后移动。
5. 否则如果 `msg = left`，向左旋转。
6. 否则如果 `msg = right`，向右旋转。
7. 否则如果 `msg = smile`，显示笑脸并播放提示音。

现在通过网页发送：

- `forward`
- `backward`
- `left`
- `right`
- `smile`

CoCube 会先把收到的消息显示到屏幕上，再根据 `msg` 的内容执行对应动作。

这一节的重点是理解一件事：

广播消息本身可以被程序读取和使用。

有了 `最后消息`，程序就不需要为每条消息都写一个单独的“当收到 xxx”脚本。所有消息可以先进入同一个入口，再由 `if` 判断分发到不同任务：

| 判断条件 | 执行的任务 |
| --- | --- |
| `msg = forward` | 向前移动 |
| `msg = backward` | 向后移动 |
| `msg = left` | 向左旋转 |
| `msg = right` | 向右旋转 |

这样，所有消息都可以进入同一个“消息处理脚本”，程序结构会更清楚。

#### 3. 广播调用自定义、无参数的函数

在 MicroBlocks 里，我们可以定义自己的积木。比如定义一个 `myBlock`：

`myBlock` 的流程是：

1. 显示“心”。
2. 等待 `500` 毫秒。
3. 显示“小心脏”。

![无参数自定义积木](3_myBlock.png =680x*)

平时调用这个自定义积木，可以直接把 `myBlock` 积木拖出来执行。

或者添加积木库调用方法（添加积木库-其他-调用方法），通过调用函数名的方式来调用函数。

你可能不知道的是，直接广播消息也能起到类似“调用同名函数”的效果。

![广播调用无参数函数](4_call_function.png =680x*)

这时候可以把网页遥控器里的 `myBlock` 按钮看成一个远程按钮。网页发送 `myBlock`，CoCube 收到后执行同名任务。

这种方式适合没有参数的任务，例如：

- `smile`
- `blink`
- `beep`
- `dance`
- `reset`

通过广播消息实现“调用函数”的优点是非常直观、轻量。

#### 4. 广播调用自定义、有参数的函数

如果函数需要参数，单纯广播 `myBlock` 就不够了。

例如我们定义了一个带参数的自定义积木：

```text
myBlock2 time
```

它可以根据参数 `time` 决定等待时间。

如果想通过广播调用它，可以约定一种消息格式：

```text
call,函数名,参数
```

例如：

```text
call,myBlock2,100
```

这条消息可以理解为：

调用 `myBlock2`，参数是 `100`。

程序接收到广播后，需要先解析 `最后消息`：

![解析 call 消息](5_call_function_with_args.png =680x*)

解析思路如下：

1. 收到任意广播。
2. 将 `msg` 设为“最后消息”。
3. 如果 `msg` 的前 4 个字符是 `call`，就用逗号分割 `msg`。
4. 第 2 项是函数名。
5. 第 3 项开始是参数列表。
6. 调用对应函数，并传入参数列表。

以 `call,myBlock2,100` 为例：

| 分割位置 | 内容 |
| --- | --- |
| 第 1 项 | `call` |
| 第 2 项 | `myBlock2` |
| 第 3 项 | `100` |

所以程序会执行：

调用 `myBlock2`，参数是 `100`。

这种格式的好处是：网页只需要发送不同的字符串，就可以调用不同函数，并且传入不同参数。

可以尝试：

```text
call,myBlock2,100
call,myBlock2,500
call,myBlock2,1000
```

观察等待时间是否发生变化。

如果以后有多个参数，也可以继续放在后面：

```text
call,函数名,参数1,参数2,参数3
```

例如：

```text
call,setColor,255,0,0
call,moveTo,100,80,40
call,playTone,c,1,200
```

这已经很接近一个“小型命令系统”了。

#### 5. 调用已有任意函数

不仅自定义积木可以这样调用，MicroBlocks 里很多已有积木也可以通过函数名调用。

关键问题是：怎样知道一个积木真正的函数名和参数列表？

可以在 MicroBlocks 中右键点击一个积木，然后选择“复制至剪贴板”。

然后再注释积木或者别的地方粘贴，就可以查看积木对应的 GP Script。

![查看函数名](6_function_name.png)

例如，CoCube 的“向前移动 1000 毫秒”积木，复制出来的脚本里可以看到类似内容：

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

这说明它真正调用的函数名是：

```text
CoCube move for msecs
```

参数是：

```text
cocube;forward
40
1000
```

所以就可以通过广播发送：

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

再比如，显示笑脸图像的积木可以看到类似函数名：

```text
led_displayImage
```

如果参数是 `happy`，就可以发送：

```text
call,led_displayImage,happy
```

网页遥控器里也可以提前写好这些命令，发送一下试试吧：

```text
call,myBlock2,100
call,led_displayImage,happy
```

##### 查看函数名时的建议

1. 先用普通积木搭出你想要的动作。
2. 右键这个积木，选择复制或查看脚本。
3. 找到真正的函数名。
4. 记录参数的顺序。
5. 用 `call,函数名,参数列表` 的格式测试广播调用。

对于 CoCube 机器人，这种方式特别适合做远程控制，例如：

```text
call,CoCube move for msecs,cocube;forward,40,1000
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
call,CoCube wheels stop
```

如果某个函数调用失败，优先检查三件事：

- 函数名是否完全一致。
- 参数数量是否正确。
- 参数顺序是否正确。

#### 6. 不止网页：也可以用 Python 上位机发送消息

前面的例子使用网页发送广播消息，是因为它直观、方便演示。

但这套机制并不限制消息来源。只要能向 MicroBlocks 发送同样的广播字符串，就可以控制 CoCube。

例如，可以使用 Python 上位机：

[MicroBlocks Messaging Library 项目页面](https://github.com/wwj718/microblocks_messaging_library)

这个库可以让 Python 程序和运行 MicroBlocks 的设备通过消息通信。也就是说，网页里点击 `Send` 发送的内容，Python 程序也可以发送。

可以把网页中的命令迁移到 Python：

- `forward`
- `backward`
- `left`
- `right`
- `smile`
- `myBlock`
- `call,myBlock2,100`
- `call,CoCube move for msecs,cocube;forward,40,1000`
- `call,CoCube wheels stop`

这样就可以做出更复杂的上位机控制系统，例如：

- 用键盘方向键控制 CoCube。
- 用 Python 自动发送一串动作指令。
- 用摄像头识别结果，再发送控制命令。
- 用多个 CoCube 机器人组成队形。
- 用电脑界面发送 `call,函数名,参数列表` 命令。

网页适合课堂演示，Python 适合做更完整的项目。两者背后的核心都是同一件事：

1. 把任务写成广播消息。
2. 让 MicroBlocks 程序解析消息。
3. 再调用对应的函数。

#### 7. 不只 BLE：同样的思路也适合其他消息系统

这一篇教程里，我们主要通过 BLE 广播消息实现任务调用。网页遥控器和 Python 上位机发送的都是类似这样的字符串：

- `forward`
- `smile`
- `call,myBlock2,100`
- `call,CoCube move for msecs,cocube;forward,40,1000`

但更重要的不是 BLE 本身，而是这套“消息驱动任务”的设计思路：

1. 外部系统发送一条消息。
2. MicroBlocks 程序接收消息。
3. 读取消息内容。
4. 解析命令和参数。
5. 调用对应任务或函数。

因此，将来即使消息不是从 BLE 来的，也可以使用类似结构。例如：

- MQTT 消息：电脑、网页或服务器发布一条控制消息，CoCube 接收后执行任务。
- UDP 消息：局域网中的设备直接发送短消息，机器人收到后解析执行。
- WiFi 网页控制：网页按钮发送命令，MicroBlocks 程序根据命令调用函数。
- ESP-NOW 消息：多个机器人之间发送命令，实现协作控制。

也就是说，BLE 只是这节课使用的通信入口。真正可以复用的是：

- 用字符串描述任务。
- 用“最后消息”读取任务。
- 用 `call` 机制分发任务。
- 用函数名和参数列表扩展任务。

MQTT、UDP 等具体实现方式，会在之后的教程中继续介绍。
