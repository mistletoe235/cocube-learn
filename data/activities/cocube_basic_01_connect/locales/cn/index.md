<!-- show-mobile-notice -->

#### 1. 连接 CoCube机器人

在MicroBlocks页面中，可以通过两种方式连接CoCube设备。优先推荐无线连接。

**1.1 无线连接** 

1. 务必使用**Chrome**或**Edge**浏览器，打开[MicroBlocks-CoCube](https://cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)编程界面。

2. 确保已开启计算机的蓝牙功能

3. 长按开关3秒（开关按键位于机器人底部），给CoCube机器人开机，开启之后，机器人屏幕上会显示三个字符，代表BLE的编号

4. 点击MicroBlocks界面上的“USB”图标，点击无线连接（BLE）

5. 正常情况下，可以识别出“MicroBlocks XXX”或者“CoCube XXX”的字样，XXX与机器人开机显示的编号一致

6. 在Linux系统下，需要额外开启网页的BLE权限：

   在浏览器导航栏输入 **chrome://flags/**

   搜索“Bluetooth”，查找到**Use the new permissions backend for Web Bluetooth**一栏，将Default设置为Enable。

   重启浏览器即可。

![](image-3.png)

**1.2 有线连接**

1. **推荐使用Chrome或Edge浏览器**，打开[MicroBlocks-CoCube](https://cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)编程界面

2. 用USB线缆连接电脑和CoCube

3. 长按开关3秒（开关按键位于机器人底部），给CoCube机器人开机

4. 点击MicroBlocks界面上的“USB”图标，点击有线连接

5. 正常情况下，可以识别出串口（在Windows系统下为COM\*\*\*，在MacOS系统下为cu.wchusbserial\*\*\*）

6. 若无法正常识别出串口，则可能是电脑没有安装串口驱动，需要安装CH343串口转USB芯片的驱动

   [MacOS驱动](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html)

   [Windows驱动](https://www.wch.cn/downloads/CH341SER_ZIP.html)

7. 若还无法连接，请检查USB线缆是否正常

#### 2. 为CoCube更新固件

第一次使用设备时，请为CoCube更新最新的固件，以获得最佳体验。

1. 有线连接CoCube机器人

2. 点击MicroBlocks IDE的设置，点击“升级主板固件”，选择“CoCube”，选择对应的端口号。

![](image-4.png =300x*)
![](image-5.png =450x*)

* 升级过程大约需要1分钟，在过程中**请保持MicroBlocks IDE位于浏览器显示界面**。期间尽可能**不要有其他任何操作**。否则有可能导致固件升级失败，如果升级失败，请重新升级一次。

### 四、CoCube 手机 APP

CoCube 提供了移动端应用程序，支持蓝牙无线连接，您可以使用手机或平板电脑对机器人进行遥控驾驶与编程互动。

扫描下方二维码即可下载安装：

![CoCube Android App 下载](cocube-android.png =200x*) 
![CoCube ios App 下载](cocube-ios.png =200x*)

> 注：iOS用户也可在 App Store 搜索 "CoCube" 下载。

### 五、常见问题解答 (FAQ)

#### 5.1 蓝牙连接相关问题

**Q: 使用蓝牙(BLE)连接时,弹出是否升级主板上的 MicroBlocks 提示怎么办?**

A: 请选择**"否"**。蓝牙连接不支持固件升级功能,如需升级固件,必须使用有线连接方式。

**Q: 为什么无法通过蓝牙升级固件?**

A: 由于蓝牙传输的带宽和稳定性限制,固件升级必须通过USB有线连接完成。请参考"1.2 有线连接"和"2. 为CoCube更新固件"章节进行操作。

#### 5.2 浏览器兼容性问题

**Q: 在微信内置浏览器中无法连接CoCube怎么办?**

A: MicroBlocks编程平台**不支持微信内置浏览器**。请复制链接到以下推荐浏览器中打开:
- **Chrome 浏览器**(推荐)
- **Edge 浏览器**(推荐)

微信内置浏览器不支持 Web Bluetooth 和 Web Serial API,无法实现设备连接功能。

#### 5.3 连接失败排查

**Q: 按照步骤操作仍无法连接设备怎么办?**

A: 请依次检查以下项目:
1. 确认使用的是 Chrome 或 Edge 浏览器
2. 确认计算机蓝牙功能已开启(无线连接时)
3. 确认 CoCube 已开机(长按底部开关3秒)
4. 确认 USB 线缆支持数据传输(有线连接时)
5. 确认已安装 CH343 串口驱动(有线连接时)
6. 在 Linux 系统下,确认已开启浏览器的 BLE 权限


