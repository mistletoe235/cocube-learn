### 1. 案例目的
学会使用 MicroBlocks 和 Snap 两个编程平台，通过 WiFi 网络同时控制多个 CoCube 机器人，体验多机器人协同工作的乐趣！

### 2. 使用材料

![CoCube 机器人 × 1](robot.png =200x*)
![个人电脑 或 平板](PC.png =250x*)
![基站](cudy.png =250x*)

### 3. 软件平台

1. [MicroBlocks——CoCube & CoCube Module](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

2. [Snap](http://snap.codelab.club/snap.html)

![](img3.png)

### 4. 第一步：打开基站

1. 找到Type-C线，将它插入基站的Type-C电源接口
2. 耐心等待约1分钟，让基站完全启动
3. 在电脑上连接基站的WiFi网络（一般是COCUBEXXXX），或者用网线连接基站
   - 💡 **小提示**：如果使用网线，请确保插入基站的LAN口（通常标有"LAN"字样）

![](tr1200-1-0-4.png)


### 5. 第二步：让CoCube连接到WiFi网络

1. **连接CoCube机器人：** 如果你的机器人还没有连接过WiFi，需要先在MicroBlocks中设置。如果已经连接过，可以直接跳过这一步。用数据线或无线方式连接 MicroBlocks 编程环境和你的 CoCube 机器人。

2. **设置WiFi连接：** 将下面的程序拖到 MicroBlocks 工作区，然后按照你的实际情况修改：
   - 机器人ID（给每个机器人设置一个编号，比如1号、2号）
   - WiFi名称（你要连接的网络名）
   - 路由器地址（默认是192.168.10.1）
   
   设置好后，点击这个积木块，再点击右上角的▶️开始按钮。

![](allScripts11770207.png)

如果你看到积木显示了机器人的IP地址（就像下图这样），恭喜你连接成功了！如果要连接更多CoCube机器人，重复上面的操作就行。

![](img4.png)

### 6. 第三步：用Snap控制你的机器人

1. **导入控制程序：** 打开Snap网站，将 `cocube_websokets.xml` 文件拖进去。你会在左上角看到 "CoCube WebSockets" 积木库出现了！<a href="cocube_websokets.xml" download="cocube_websokets.xml">点击下载cocube_websokets.xml</a>  
   **提示：** 如果打开的 Snap 网站默认是 https://snap.codelab.club/snap.html，请手动删除地址中的 "s"（改为 http）后按回车。

![](img6.png)

2. **连接机器人：** 
   - 输入刚才设置的机器人ID，连接你的第一个机器人
   - 想控制更多机器人？点击右边的"添加一个海龟角色"按钮
   - ⚠️ 重要提醒：千万不要用"复制"或"克隆"功能，每个机器人都需要独立的角色

![](img5.png)

3. **设置舞台：** 你可以点击右下角的舞台，然后点击背景按钮，拖入你喜欢的舞台图片！设置后记得重新点击你要控制的角色进行编程。

![](img7.png =250x*) ![](img8.png =250x*)

4. **开始编程控制：** 机器人连接成功后，你就可以用左边的积木块自由组合程序啦！让机器人前进、后退、转弯，甚至跳舞都可以！

### 7. 挑战时间 🚀

现在你已经掌握了多机器人控制的秘诀，试试这些有趣的挑战：
- 让多个机器人排成队列行进
- 编程让机器人们跳一支同步舞蹈
- 结合 CoCube 的定位地图功能，创造一个机器人足球比赛
- 你还能想到什么更酷的玩法呢？快来试试吧！