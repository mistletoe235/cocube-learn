CoCube is a desktop AI educational robot, jointly developed by a team of masters and doctoral students from Shanghai Jiao Tong University and Fudan University. It aims to open the door to artificial intelligence for teenagers and create an interactive, fulfilling, and fun creative platform. By engaging students in the design of AI robots, from simple programming to the construction of complex interactive systems, CoCube helps them turn their ideas and inspirations into reality, thereby stimulating their curiosity and creativity.

### I. Highlights of the CoCube Platform

![](image.png)

### II. Technical Specifications of CoCube

#### 1. CoCube Robot Body

![Front of CoCube Robot](CoCube_front.png =300x*)
![Back of CoCube Robot](robot.png =300x*)

| **Specification** | **Parameter**                                      |
| ------ | --------------------------------------------- |
| Main Controller   | ESP32 Xtensa® 32-bit LX6 single/dual-core processor |
| Wi-Fi  | 802.11 b/g/n (2.4Ghz)                         |
| Bluetooth | Bluetooth V4.2 BR/EDR and BLE standard                       |
| Mobility     | Dual-track differential chassis, maximum speed 50 units/s |
| Positioning  | High frame rate, millimeter-level absolute positioning, angle resolution 1° |
| TFT Screen   | 1.54-inch full-color screen @240\*240                          |
| Buttons      | Power button (bottom, long press 3s to power on/off), AB buttons (rear of the robot) |
| Buzzer       | Passive buzzer                                         |
| Magnetic Connector | CoCube 4Pin magnetic connector (I2C + I/O + UART), 5V @ 600mA |
| Lithium Battery | 450mAh @ 7.4V                                 |
| Charging Voltage | Type C interface, 5V @ 1.2A                            |
| Battery Life | No limit in wired programming mode, about 2 hours in Bluetooth wireless programming mode, about 1 hour in Wi-Fi mode |
| Product Dimensions | 45 × 45 × 38mm                                |
| Product Weight | 63g                                           |

#### 2. CoMaps Positioning Map

The CoCube robot can obtain precise position and angle on the CoMaps positioning map.

For standard CoMaps, the overall size is approximately A3 paper size, and it is designed with various themes such as maze challenge, driving challenge, and Mars rescue.

![CoMaps Example - Maze Challenge Theme Positioning Map](comap.png)

The coordinates of the top-left corner of the map are (0,0), and the coordinates of the bottom-right corner are (300,200). The X-axis runs from left to right (0\~300), and the Y-axis runs from top to bottom (0\~200).

When the robot faces the positive direction of the Y-axis, it is 0 degrees. When the robot faces the negative direction of the Y-axis, it is 180 degrees, and the angle increases counterclockwise.

Dashed lines are printed every 50 units on the map for quick coordinate positioning.

CoMaps positioning maps support expansion and splicing to obtain a larger positioning range.

> If you have custom requirements for CoMaps positioning map themes or large-size CoMaps maps, please contact the CoCube team.

#### 3. CoModules Expansion Modules

The CoCube robot can easily expand different sensing, actuating, displaying, and AI modules through a magnetic connector.

The currently supported expansion modules are as follows:

| Expansion Module | Image | Function and Application Scenario                                                                                                                                                         |
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Servo Gripper        | ![](gripper.png =200x*) | Custom high-performance servo, no jamming during operation<br>Designed with silicone anti-slip pads for smoother grasping<br>Applicable to logistics handling courses and competition scenarios.                                                                                                  |
| ToF (Time of Flight) | ![](ToF.png =200x*) | By emitting infrared laser, it measures the time it takes for the light to reach an object and reflect back, thus obtaining precise distance data. It has excellent light adaptability and is not affected by the reflectivity of the target, allowing stable operation under various lighting conditions and usage scenarios.                                                         |
| WS2812 RGB LED Panel | ![](NeoPixel.png =200x*) | Using a 6 x 8 array, it provides 48 individually controllable RGB LEDs, supporting a variety of colors and dynamic effects. It can be easily programmed and controlled through a microcontroller or dedicated controller, supporting pixel-by-pixel adjustment for rich performance.                                                          |
| 3D Gesture Recognition | ![](3Dgesture.png =200x*) | Integrates high-precision, low-power gesture recognition sensors to support gesture recognition in three-dimensional space, enabling interactive control with the robot.                                                                                              |
| AI Visual Perception Module | ![](image-1.png =200x*) | The AI visual perception module is designed with an advanced 64-bit RISC-V neural network processor K210, integrating various advanced visual algorithms such as color recognition, spot detection, line detection, card recognition, face recognition, AprilTag recognition, and QR code recognition, making AI visual applications easily accessible. Suitable for AI + robot creative sandbox courses and competition scenarios. |

> If you have new application scenarios for CoModule expansion modules, please contact the CoCube team for assistance in development.

### III. MicroBlocks Graphical Programming Platform

CoCube can be programmed directly in the browser using the MicroBlocks platform without the need for downloading or installing any software.

MicroBlocks is a graphical programming language inspired by Scratch, designed for "physical computing."

Home Page: [MicroBlocks-Home](https://microblocks.fun/)

Programming Environment: [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

Don't be intimidated; believe me, a second-grade elementary school student can learn to program CoCube in just 5 minutes! You can do it too!

![](microblocks.jpeg)

Note: Currently, the MicroBlocks platform has better compatibility on PCs (Windows, MacOS, Linux) and is not recommended for use with an iPad to connect to the CoCube robot.

#### 1. Connecting the CoCube Robot

On the MicroBlocks page, there are two ways to connect the CoCube device. Wireless connection is highly recommended.

**1.1 Wireless Connection**

1. Make sure to use **Chrome** or **Edge** browser and open the [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27) programming interface.

2. Ensure that the computer's Bluetooth function is turned on.

3. Long press the power button for 3 seconds (the power button is located at the bottom of the robot) to turn on the CoCube robot. After turning on, three characters will be displayed on the robot's screen, representing the BLE number.

4. Click the "USB" icon on the MicroBlocks interface and select "Wireless Connection (BLE)."

5. Under normal circumstances, you should be able to identify "MicroBlocks XXX" or "CoCube XXX," where XXX matches the number displayed on the robot when it is turned on.

6. On Linux systems, additional steps are required to enable BLE permissions for the web page:

   - Enter **chrome://flags/** in the browser's address bar.

   - Search for "Bluetooth" and find the option **Use the new permissions backend for Web Bluetooth**. Set it from Default to Enable.

   - Restart the browser.

![](image-3.png)

**1.2 Wired Connection**

1. **It is recommended to use Chrome or Edge browser** and open the [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27) programming interface.

2. Connect the computer to the CoCube robot using a USB cable.

3. Long press the power button for 3 seconds (the power button is located at the bottom of the robot) to turn on the CoCube robot.

4. Click the "USB" icon on the MicroBlocks interface and select "Wired Connection."

5. Under normal circumstances, the serial port should be recognized (COM\*\*\* on Windows systems, cu.wchusbserial\*\*\* on MacOS systems).

6. If the serial port is not recognized, it may be because the computer has not installed the serial port driver. You need to install the driver for the CH343 serial-to-USB chip.

   [MacOS Driver](https://www.wch.cn/downloads/CH34XSER _MAC_ZIP.html)

   [Windows Driver](https://www.wch.cn/downloads/CH341SER _ZIP.html)

7. If you still cannot connect, check whether the USB cable is functioning properly.

#### 2. Updating Firmware for CoCube

When using the device for the first time, please update the firmware for CoCube to ensure the best experience.

1. Connect the CoCube robot via a wired connection.

2. Click on the settings in the MicroBlocks IDE, select "Upgrade Mainboard Firmware," choose "CoCube," and select the corresponding port number.

![](image_upgrade.png =360x*)
![](image_upgrade_cocube.png =400x*)


* The upgrade process takes approximately 1 minute. During this time, **keep the MicroBlocks IDE on the browser display interface**. Avoid any other operations as much as possible. Otherwise, the firmware upgrade may fail. If it fails, please retry the upgrade.