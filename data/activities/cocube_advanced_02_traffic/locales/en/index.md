### Case Objective

Program the CoCube robot to recognize traffic sign cards and automatically perform corresponding actions, realizing a smart traffic creative sandbox.

Understand artificial intelligence technology in image vision during the process.

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 1. Materials Used

![CoCube Robot × 1](robot.png =300x*)
![Personal Computer or Tablet](PC.png =300x*)
![AI Vision Perception Module × 1](Sentry2.png =300x*)
![Traffic Sign Cards × 10](image-1.png =300x*)

### 2. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

Or directly open the programming environment with the AI Vision Perception module added: [MicroBlocks-AI Camera](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 3. Algorithm Knowledge

#### Algorithm Introduction

![](image-2.png)

Identify whether there are specified card patterns in the image, returning information such as card coordinates, size, classification labels, etc. Including traffic signs, graphic symbols, and numbers. The classification labels are shown in the table below.

**Traffic Signs**

| **Classification Label** | **English Identifier** | **Chinese Meaning** | **Classification Label** | **English Identifier**    | **Chinese Meaning** |
| -------- | -------- | -------- | -------- | ----------- | -------- |
| 1        | Forward  | Forward      | 2        | Left        | Turn Left     |
| 3        | Right    | Turn Right     | 4        | Turn Around | U-turn       |
| 5        | Park     | Park       | 6        | Green       | Green Light   |
| 7        | Red      | Red Light    | 8        | Speed 40    | Speed Limit 40 |
| 9        | Speed 60 | Speed Limit 60 | 10       | Speed 80    | Speed Limit 80 |

#### Configuration Parameters: None

#### Return Results

![](image-3.png)

This algorithm supports simultaneous recognition of multiple cards. Cards rotated within 30 degrees can still be recognized; excessive rotation cannot be recognized.

When reading registers through the main controller, the following data will be returned:

| **Result** | **Meaning**  |
| ------ | ------- |
| 1      | Card center x coordinate |
| 2      | Card center y coordinate |
| 3      | Card width w   |
| 4      | Card height h   |
| 5      | Card classification label  |

#### Usage Tips

1. This algorithm can detect cards at a long distance, but this is not always the desired detection position for users. At this time, "card width" can be used to exclude those distant cards. For example, actions will only be triggered when the card width > 50%.

2. When there are multiple cards in the image (e.g., a row of cards), their detection output order is based on the card’s center point, scanned row by row from the top-left corner (0,0), from top to bottom, and from left to right.

#### **Block Descriptions Needed**

1. **Sentry2 Initialization Block**

An optional parameter is the i2c address. Default is 96 (0x60).

Before using Sentry2, execute the initialization block first. Typically placed under the "when started" hat block.

![](init.png)

2. **Sentry2 Set Mode Block**

![](<setmodecard.png>)

The mode needs to be set to "card," i.e., traffic sign card recognition mode.

3. **Sentry2 Detection Result**

![](result.png)

Before using this block, ensure that the card algorithm mode has been enabled.

This block is also used to trigger detection; only after using this block can you obtain detection results.

The returned result is the number of results currently identified by the card algorithm.

4. **Sentry2 Detected Card**

![](image.png)

Returns the tag attribute of the detected object id. This block determines whether the object with ID 1 is a forward card—if yes, return True; otherwise, return False.

5. **Sentry2 Detected Object Attribute**

![](property.png)

Returns the attributes of the detected object id, including the color block center x coordinate, color block center y coordinate, color block width w, color block height h, and tag.

Each tag corresponds to a different card category (such as red light, green light, numbers, etc.)



### 4. Start Programming

1. **Connect Device:** Connect MicroBlocks IDE to the CoCube robot via wired or wireless means. Connect the metal contacts of the gripper module to CoCube's contacts magnetically.

2. **Load Block Library:** Load the CoCube external module library and the Sentry2 AI camera library. Refer to [All-in-One Kit](https://sjtu-colab.feishu.cn/wiki/J6o5woK8AizzAVkLUkzcG1m1nob#share-PZOqdKGuUod4HYxEQKacjmIpnLf).

3. **Camera Module Initialization:** Choose to start by enabling the external module power, then wait 4 seconds for the camera module to successfully start before initializing the I2C interface. Then set the camera's algorithm mode to "card" mode to detect card information.

![](scriptImage7286394.png)

4. **Recognize Cards and Perform Logic Processing:** First, we need to use the "Sentry2 Detected Card Object ID ##" block, which determines whether the tag detection result of the card with id sequence number "##" is "\*\*".

![](scriptImage7734694.png)

For ease of starting, we can set up logic to begin judgment after pressing button A. Now, just use a combination of loops and conditional judgments to implement different logical processing for different card tags, as shown in the figure below, including handling stop at red light, go at green light, and parking:

![](scriptImage7817072.png)

### 5. Challenge Yourself

The camera's card mode also supports several other tag recognitions, including speed limits, turns, etc. Try adding them!

![](scriptImage8322899.png)

Reference code: [Case 02 Smart Traffic](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27%0A%0Ascript%20583%2081%20%7B%0AwhenStarted%0A%27Power%20on%20module%27%0AwaitMillis%204000%0A%27Sentry2%20init%27%2096%0A%27Sentry%20turn%27%20%27card%27%20true%0A%7D%0A%0Ascript%20851%2080%20%7B%0AwhenButtonPressed%20%27A%27%0Alocal%20%27var%27%2030%0Aforever%20%7B%0A%20%20if%20%28%27Sentry2%20detect%20card%27%20%27RedLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27GreenLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Park%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Left%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Right%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27right%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27TurnAround%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%201640%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed40%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2017%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed60%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2033%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed80%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2050%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%0A%20%20waitMillis%2030%0A%7D%0A%7D%0A%0A)
