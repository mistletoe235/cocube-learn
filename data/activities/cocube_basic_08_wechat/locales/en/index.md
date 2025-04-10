### 1. Purpose of the Case

Control the CoCube robot using a WeChat mini-program.

![](miniapp-control.gif)

### 2. Materials Used

![CoCube Robot × 1](robot.png =300x*)
![Driving Challenge Positioning Map](map.png =300x*)
![Personal Computer or Tablet](PC.png =300x*)
![Mobile Phone with WeChat Installed](107854029ea28e4dc9a4e6d5a1ca6bb-1.jpg =120x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-1.png)

### 4. Start Programming

The WeChat mini-program communicates with the CoCube robot via Bluetooth Low Energy (BLE). First, you need to load an interface program onto the CoCube robot using MicroBlocks IDE and customize it as needed. Then disconnect the MicroBlocks IDE from the CoCube robot. Finally, connect to the CoCube robot using the WeChat mini-program to achieve real-time control!

1. **Load Interface Program for CoCube Robot**

[MicroBlocks - Case 08 WeChat Mini-Program Interface](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27LED%20Display%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27handle_message%27%20%27handle_message%27%0Ato%20handle_message%20%7B%0A%20%20local%20%27msg%27%20%28getLastBroadcast%29%0A%20%20if%20%28%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%201%204%29%20%3D%3D%20%27call%27%29%20%7B%0A%20%20%20%20local%20%27msg%27%20%28%27%5Bdata%3Asplit%5D%27%20msg%20%27%2C%27%29%0A%20%20%20%20local%20%27msg_id%27%20%28at%202%20msg%29%0A%20%20%20%20local%20%27cmd_name%27%20%28at%203%20msg%29%0A%20%20%20%20local%20%27cmd_args%27%20%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%204%29%0A%20%20%20%20local%20%27result%27%20%28callCustomReporter%20cmd_name%20%28to_mb_args%20cmd_args%29%29%0A%20%20%20%20sendBroadcast%20%28%27%5Bdata%3AjoinStrings%5D%27%20%28%27%5Bdata%3AmakeList%5D%27%20%27%5Bresponse%5D%27%20msg_id%20result%29%20%27%2C%27%29%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27to_mb_args%27%20%27to_mb_args%20_%27%20%27auto%27%20%27%27%0Ato%20to_mb_args%20args%20%7B%0A%20%20local%20%27json%27%20%28%27%5Bdata%3Ajoin%5D%27%20%27%5B%27%20%28%27%5Bdata%3AjoinStrings%5D%27%20args%20%27%2C%27%29%20%27%5D%27%29%0A%20%20local%20%27json_count%27%20%28%27%5Bmisc%3AjsonCount%5D%27%20json%20%27%27%29%0A%20%20local%20%27result%27%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20for%20i%20json_count%20%7B%0A%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27%5Bmisc%3AjsonGet%5D%27%20json%20%28%27%5Bdata%3AconvertType%5D%27%20i%20%27string%27%29%29%20result%0A%20%20%7D%0A%20%20return%20result%0A%7D%0A%0Ascript%20275%2054%20%7B%0Acomment%20%27Please%20manually%20add%20the%20CoCube%20library%2C%20%0ACoCube%20Module%20library%2C%20%0Aand%20other%20required%20libraries.%27%0Acomment%20%27%E8%AF%B7%E6%89%8B%E5%8A%A8%E6%B7%BB%E5%8A%A0CoCube%E5%BA%93%E3%80%81CoCube%E5%A4%96%E6%8E%A5%E6%A8%A1%E5%9D%97%E5%BA%93%E5%92%8C%E5%85%B6%E4%BB%96%E9%9C%80%E8%A6%81%E7%9A%84%E5%BA%93%27%0A%7D%0A%0Ascript%20729%20172%20%7B%0AwhenBroadcastReceived%20%27b%27%0A%27ccmodule_gripper%20close%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0Aled_displayImage%20%27sad%27%0A%7D%0A%0Ascript%20540%20178%20%7B%0AwhenBroadcastReceived%20%27a%27%0A%27ccmodule_gripper%20open%27%0A%27set%20display%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aled_displayImage%20%27happy%27%0A%7D%0A%0Ascript%20539%20324%20%7B%0AwhenBroadcastReceived%20%27y%27%0A%27play%20tone%27%20%27nt%3Bg%23%27%200%20500%0A%7D%0A%0Ascript%20273%20324%20%7B%0AwhenBroadcastReceived%20%27x%27%0A%27play%20frequency%27%20261%20500%0A%7D%0A%0Ascript%20275%20174%20%7B%0AwhenBroadcastReceived%20%27%27%0Ahandle_message%0A%7D%0A%0A)

* **Connect CoCube Robot and MicroBlocks IDE**

* **Customize Functional Keys**

The example code is shown below:

![](allScripts2111301.png)

In this code:
- The "When I Receive \_" hat block handles joystick messages to control the movement of the CoCube robot. No modifications are required.
- The "When I Receive A," "When I Receive B," "When I Receive X," and "When I Receive Y" blocks correspond to the A, B, X, and Y buttons in the WeChat mini-program and can be customized as needed.

* **Disconnect CoCube Robot from MicroBlocks IDE**

After debugging, remember to disconnect the CoCube robot from the MicroBlocks IDE; otherwise, the robot cannot be connected to the phone simultaneously.

### 5. WeChat Mini-Program

1. **Open the WeChat Mini-Program**

   Open the WeChat app on your phone, scan the QR code for the WeChat mini-program, and open the "CoCube Robot" mini-program.

![](QRcode.jpg)

2. **Connect to CoCube Robot**

   Click the "Search for CoCube Devices" button. If it's your first time using it, you may be prompted to enable Bluetooth permissions; click confirm.

   From the list of devices, find the Bluetooth ID for your CoCube robot and click to connect.

![](107854029ea28e4dc9a4e6d5a1ca6bb.jpg =200x*)
![](a8d4232dc718a44baad3e4e273db437.jpg =200x*)

3. **Remote Control CoCube Robot**

   The virtual joystick on the left controls the movement of the CoCube robot's chassis. The size of the stick input adjusts the speed, and it supports mixed control (e.g., sliding forward-left will make the robot turn forward-left).

   The A, B, X, and Y buttons on the right correspond to the custom functions defined earlier in the MicroBlocks IDE.

![](phonescreen3.jpg)

![](image.png)

### 6. Challenge: Simulated Driving

Using the driving simulation map, test your driving skills!

Can you design a timer directly in the CoCube to track your race performance?

![](<success.gif>)