### 1. Goal

Program the CoCube robot to achieve synchronized processes using broadcasting.

### 2. Materials Used

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Start Programming

In previous lessons, we primarily dealt with sequential structures, where programs execute instructions in a predetermined order. However, in practical applications, we often encounter situations where multiple tasks need to run simultaneously. In such cases, the broadcast feature becomes particularly important. This case will explain how the broadcast feature triggers signals and how to use this mechanism to achieve parallel execution of two program components.

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection.

2. **Find Blocks**: Open the "Control" block library and locate the "when received" and "broadcast" blocks. Drag them into the workspace as shown in the image. The broadcast function is implemented through these two blocks.

![](image-1.png)

* **Run Program**: Using the broadcast feature, you can control the CoCube robot's movement and LED display in parallel. Run the following two programs and experience the difference brought by the broadcast feature.

![](allScripts7227041.png)

![](allScripts7476361.png)

### 5. Challenge

You’ve probably encountered a sprinkler truck in real life. When it's working, it sprays water while emitting sounds to alert nearby pedestrians to move away. Let’s try simulating the operation of a sprinkler truck.

![](allScripts475744.png)

![](<broadcast_car.gif>)

Reference Example Program: [MicroBlocks——CoCube Case 06 Sprinkler Truck](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20354%20110%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20733%20107%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Ascroll_text%20%27careful%27%2020%0A%7D%0A%0Ascript%20733%20253%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%2020%0A%7D%0A%7D%0A%0A)