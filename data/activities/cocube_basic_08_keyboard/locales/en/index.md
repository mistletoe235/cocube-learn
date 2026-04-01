### 1. Goal

Control the CoCube robot using a keyboard.

### 2. Materials Used

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-3.png)

### 4. Start Programming

1. **Enable Keyboard Event Functionality**: By reading keyboard signals, you can control the CoCube robot to perform corresponding actions, enabling remote control functionality. First, enable the keyboard event by clicking the settings button and selecting "Keyboard Event." When the checkmark (√) in front of it changes from gray to white, it has been successfully enabled.

![](image-4.png)

* **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot wirelessly. Attach the gripper module to the CoCube robot.

* **Load Interface Program for CoCube Robot**

Load the interface program from the MicroBlocks online example library:

File -> Open -> Examples -> By Board -> CoCube -> CoCube KeyBoard Control

![](image-2.png)

* **Customize Functional Keys**

The loaded example code is shown below:

![](allScripts3466150.png)

You can also customize keys to implement keyboard control. Use the "When I Receive" and "Say Last Message" blocks to listen for the names of keyboard events. Enter the name into the "When I Receive" block to assign the corresponding keyboard event.

![](image.png)

[MicroBlocks - CoCube Keyboard Control](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%20%27Ringtone%27%20%27TFT%27%20%27Tone%27%0A%0Ascript%20390%2065%20%7B%0Acomment%20%27Example%20program%20for%20keyboard-controlled%20CoCube%20robot%27%0Acomment%20%27https%3A%2F%2Fkeyboard.cocube.fun%2F%27%0A%7D%0A%0Ascript%20390%20135%20%7B%0AwhenBroadcastReceived%20%27w%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2050%0A%7D%0A%0Ascript%20750%20135%20%7B%0AwhenBroadcastReceived%20%27w-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20135%20%7B%0AwhenBroadcastReceived%20%271%27%0AstartTone%20262%0A%7D%0A%0Ascript%201200%20135%20%7B%0AwhenBroadcastReceived%20%271-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20235%20%7B%0AwhenBroadcastReceived%20%27s%27%0A%27CoCube%20move%27%20%27cocube%3Bbackward%27%2050%0A%7D%0A%0Ascript%20750%20235%20%7B%0AwhenBroadcastReceived%20%27s-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20235%20%7B%0AwhenBroadcastReceived%20%272%27%0AstartTone%20294%0A%7D%0A%0Ascript%201200%20235%20%7B%0AwhenBroadcastReceived%20%272-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20335%20%7B%0AwhenBroadcastReceived%20%27a%27%0A%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2050%0A%7D%0A%0Ascript%20750%20335%20%7B%0AwhenBroadcastReceived%20%27a-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20335%20%7B%0AwhenBroadcastReceived%20%273%27%0AstartTone%20330%0A%7D%0A%0Ascript%201200%20335%20%7B%0AwhenBroadcastReceived%20%273-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20435%20%7B%0AwhenBroadcastReceived%20%27d%27%0A%27CoCube%20rotate%27%20%27cocube%3Bright%27%2050%0A%7D%0A%0Ascript%20750%20435%20%7B%0AwhenBroadcastReceived%20%27d-up%27%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%201000%20435%20%7B%0AwhenBroadcastReceived%20%274%27%0AstartTone%20349%0A%7D%0A%0Ascript%201200%20435%20%7B%0AwhenBroadcastReceived%20%274-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20535%20%7B%0AwhenBroadcastReceived%20%27q%27%0A%27set%20display%20color%27%20%28makeColor%20255%200%200%29%0Aled_displayImage%20%27sad%27%0A%27play%20ringtone%27%20%27Punish%3Ad%3D16%2Co%3D5%2Cb%3D150%3A%20g5%2Ce5%2Cc5%2Cd5%2Cc5%2Cb4%2Ca4%2Cg4%27%0A%7D%0A%0Ascript%201000%20535%20%7B%0AwhenBroadcastReceived%20%275%27%0AstartTone%20392%0A%7D%0A%0Ascript%201200%20535%20%7B%0AwhenBroadcastReceived%20%275-up%27%0AstopTone%0A%7D%0A%0Ascript%201000%20635%20%7B%0AwhenBroadcastReceived%20%276%27%0AstartTone%20440%0A%7D%0A%0Ascript%201200%20635%20%7B%0AwhenBroadcastReceived%20%276-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20685%20%7B%0AwhenBroadcastReceived%20%27e%27%0A%27set%20display%20color%27%20%28makeColor%200%20255%200%29%0Aled_displayImage%20%27happy%27%0A%27play%20ringtone%27%20%27Reward%3Ad%3D16%2Co%3D6%2Cb%3D180%3A%20e6%2Cg6%2Ca6%2Cb6%2Ce7%2Cd7%2Cc7%2Cb6%2Ca6%27%0A%7D%0A%0Ascript%201000%20735%20%7B%0AwhenBroadcastReceived%20%277%27%0AstartTone%20494%0A%7D%0A%0Ascript%201200%20735%20%7B%0AwhenBroadcastReceived%20%277-up%27%0AstopTone%0A%7D%0A%0Ascript%20390%20835%20%7B%0AwhenBroadcastReceived%20%27j%27%0A%27ccmodule_gripper%20close%27%0A%7D%0A%0Ascript%20600%20835%20%7B%0AwhenBroadcastReceived%20%27k%27%0A%27ccmodule_gripper%20open%27%0A%7D%0A%0A)

### 5. Advanced Features

In addition to enabling keyboard events in the MicroBlocks IDE to control the CoCube robot, you can also control the CoCube robot through the following webpage.

![](image-1.png)

After ensuring that the CoCube robot has been programmed with keyboard control, disconnect the CoCube robot from the MicroBlocks IDE, then open the link below and reconnect the CoCube robot via BLE wireless connection.

[Keyboard Page](https://keyboard.cocube.fun/)

### 6. Challenge

Get creative and design a Gold Miner mini-game using the keyboard control feature.

![](keyboard.gif)
