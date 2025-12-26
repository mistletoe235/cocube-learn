### 1. Goal

Program the CoCube robot to understand AI technology in computer vision. Complete color recognition and traffic sign card recognition to perform corresponding actions, ultimately realizing a creative smart traffic sandbox.

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 2. Materials

![PC or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Module](robot.png =300x*)
![Traffic Sign Cards × 5](image-3.png =300x*)
![Signpost Assembly](assembly.png =300x*)

Use the AI vision module—"Sengo1 AI Camera" or "Sengo2 AI Camera". As shown, the circular lens identifies images. The algorithm mode can be switched manually via the black button or controlled through MicroBlocks.

### 3. Software Platform

[MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Basic Knowledge

#### **Block Descriptions**

1. **Sengo1 Initialization Block**

The initialization block must be executed before using the camera. It is usually placed under the "when started" hat block.

![](init.png)

2. **Sengo1 Set Mode Block**

![](mode_select.png)

Built-in algorithms include "Color Recognition", "Blob Detection", "Ball Detection", "Line Tracking", "Card Recognition", "Face Recognition", and "QR Code Recognition".

This case uses "Card Recognition" and "Color Recognition" to explain the AI camera principles.

3. **Sengo1 Color Reading**

![](read_color.png)

![](get_color_rgb.png)

Reading the color provides a basic type (e.g., "red", "black"). Obtaining RGB values allows for more precise color recording and reproduction.

4. **Sengo1 Color Detection Area Adjustment**

![](adjust_area.png)

The detection area is rectangular. Use this block to adjust its size: x and y control the top-left corner, while width and height control the dimensions. Usually, the area is centered; reducing the size allows for more detailed recognition.

![](image-2.png =200x*)
![](image.png =200x*)
![](image-1.png =200x*)

The border color of the detection area changes according to the identified color. The right image shows an expanded detection area.

5. **Sengo1 Card Result Reading**

![](read_card.png)

Returns the traffic card recognition result.

![](card_property.png)

Returns attributes of the detected object ID, including center x-coordinate, center y-coordinate, width (w), and height (h).

Sengo1 currently recognizes 5 traffic cards: "Forward", "Turn around", "Left", "Right", and "Park", corresponding to results "forward", "back", "left", "right", and "park".

Assemble the blocks and paste the cards onto LEGO bricks to create traffic signs as shown:

![](traffic_cards.png =200x*)
![](assembly_detail.png =200x*)
![](traffic_card_forward.jpg =200x*)

### 5. Programming

1. **Connect Device:** Connect the MicroBlocks IDE to the CoCube robot via wired or wireless connection. Attach the AI vision module to the front of the robot.

2. **Load Libraries:** Add "CoCube Sengo1" or "CoCube Sengo2" from the library. Sengo2 offers more features, but their basic usage is similar. This tutorial uses Sengo1.

![](image-4.png =300x*)
![](image-5.png =300x*)

3. **Color Recognition:** Combine the color recognition algorithm with the TFT display. When the camera captures a color, it extracts the RGB components and sends them to the TFT screen to dynamically change the color of the character "王".

![](color_change.png)

4. **Camera Module Initialization:** Place "Sengo1 init" under "when started" and set the algorithm to "Card Recog". Use broadcasts to set up parallel programs and define a custom "camera" command block.

![](camera_init.png)

![](parallel_part.png)

5. **Traffic Card Recognition:** Use conditional logic to map recognized card info to specific movements. When a specific card is identified, CoCube performs the corresponding action.

![](recognition.png)

#### Pro Tip

> Card recognition can detect distant cards, which might trigger actions too early. Use "card width" to filter these out; for example, only trigger actions when card width > threshold.

6. **Distance Adjustment:** Add a width check at the beginning of the "camera" block to control the trigger distance.

![](scriptImage3274595.png)

![](scriptImage3141615.png)

Comparison before and after adjustment:

<video width="320" height="240" controls>
  <source src="video2.mp4" type="video/mp4">
</video>

<video width="320" height="240" controls>
  <source src="video1.mp4" type="video/mp4">
</video>

### 6. Challenge

Try to implement a small-scale smart traffic sandbox using cards and bricks to simulate autonomous driving.

Reference Code: [Smart Traffic Sengo1 Version](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Aspec%20%27%20%27%20%27camera%27%20%27camera%27%0Ato%20camera%20%7B%0A%20%20waitUntil%20%28judge%29%0A%20%20local%20%27var%27%20%28%27Sengo1%20read%20card%27%29%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27back%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27judge%27%20%27judge%27%0Ato%20judge%20%7B%0A%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20card%27%29%20%27string%27%29%0A%20%20%20%20if%20%2830%20%3C%20%28%27Sengo1%20get%20card%27%20%27w%27%29%29%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20true%29%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20false%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Ascript%20563%2078%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Card%20Recog%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0Aforever%20%7B%0A%20%20camera%0A%7D%0A%7D%0A%0Ascript%20400%20126%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0A%7D%0A%0Ascript%20971%20231%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20451%20236%20%7B%0Ato%20camera%20%7B%7D%0A%7D%0A%0Ascript%20467%201290%20%28booleanConstant%20false%29%0A%0Ascript%20799%20292%20%7B%0Ato%20judge%20%7B%7D%0A%7D%0A%0A)

Reference Code: [Smart Traffic Sengo2 Version](https://microblocks.fun/run-pilot/microblocks.html/#scripts=GP%20Scripts%0Adepends%20%27BMP%27%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Aspec%20%27r%27%20%27Sengo2%20read%20card%27%20%27Sengo2%20read%20card%27%0Ato%20%27Sengo2%20read%20card%27%20%7B%0A%20%20if%20%28%28i2cGet%20_sg2_i2c_address%20%28hexToInt%20%2734%27%29%29%20%21%3D%200%29%20%7B%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2720%27%29%206%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2735%27%29%201%0A%20%20%20%20local%20%27var%27%20%28%27_sg2_read_reg_byte%27%20%28hexToInt%20%2788%27%29%29%0A%20%20%20%20if%20%28and%20%28var%20%3C%3D%2010%29%20%28var%20%3E%3D%201%29%29%20%7B%0A%20%20%20%20%20%20return%20%28at%20var%20_sg2_card_classes%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27main%27%20%27main%27%0Ato%20main%20%7B%0A%20%20local%20%27var%27%20%28%27Sengo2%20read%20card%27%29%0A%20%20sayIt%20var%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_around%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20364%2044%20%7B%0Ato%20main%20%7B%7D%0A%7D%0A%0Ascript%20728%2044%20%7B%0AwhenStarted%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20364%20582%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%27Sengo2%20reset%27%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20697%20582%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20main%0A%7D%0A%7D%0A%0A)
