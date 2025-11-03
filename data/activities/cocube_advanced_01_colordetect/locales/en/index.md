### 1. Goal

Learn the color blob recognition function of the AI vision perception module and use CoCube to follow a blue cylinder.

<video width="320" height="240" controls>
  <source src="colordetect.mp4" type="video/mp4">
</video>

### 2. Materials Used

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Perception Module](Sentry2.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

Or directly open the programming environment with the AI vision perception module added: [MicroBlocks-AI Camera](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Algorithm Knowledge

#### Algorithm Overview

![](image-1.png)

The user specifies one or more colors to detect whether there are blobs of that color in the image, returning their coordinates and size. It supports multi-color and multi-blob detection, and the color classification tags are the same as those in color recognition.

#### Video Tutorial

Video Tutorial: [Sentry2 Vision Sensor - Color Blob Detection Algorithm Introduction](https://www.bilibili.com/video/BV1KM411C73u/)

#### Configuration Parameters

Users need to specify the color labels to be detected, allowing up to six colors to be detected simultaneously, but the speed will decrease. Users can also filter out blobs smaller than the specified minimum width w and height h to reduce false positives.

When setting registers via the main controller, the following parameters need to be set:

| **Parameter** | **Meaning**                                                                              |
| ------------- | ---------------------------------------------------------------------------------------- |
| 1             | None                                                                                     |
| 2             | None                                                                                     |
| 3             | Minimum width w of valid blobs                                                           |
| 4             | Minimum height h of valid blobs                                                          |
| 5             | Color classification labels 1~6. Special usage: Writing an RGB565 color value greater than 6 into parameter 5 can identify specific colors, e.g., writing 0xFB00 for orange, writing 0xA11E for purple |

**In the UI interface, there are several preset parameters available:**

**Algorithm Performance:**

Select an appropriate algorithm performance based on different application needs; there are three options: "Sensitive," "Balanced," and "Accurate."

In sensitive mode, the recognition speed is fast, and the frame rate is high. In accurate mode, distant blobs can be detected, but the speed will decrease. The default is balanced performance.

Special: In accurate mode, there is good recognition and tracking effect for blobs, but only one blob can be recognized.

**Maximum Number of Simultaneous Detections:**

Supports outputting 1~5 blobs per single color.

When set to 1, only the best result is returned. If there are multiple blobs in the image, the largest one is returned. If sizes are similar, the one in the upper-left corner is prioritized.

When set to greater than 1, the number of returned blobs will not exceed this value.

**Minimum Blob Area Size:**

If small blobs of the same color exist in the background, they can be filtered by setting a reasonable minimum value.

Preset values in the absolute coordinate system: 2x2, 4x4, 8x8, 16x16, 32x32, 64x64, 128x128 pixels

Preset values in the percentage coordinate system: 1x1, 2x3, 3x4, 6x8, 9x12, 21x28, 42x56 %

**Colors to Detect:**

Provided in button form for user selection. When a color is enabled, a small eye icon is displayed; if not enabled, a slashed eye icon is shown. One or more colors can be enabled simultaneously.

#### Return Results

![](image.png)

Identified blobs will be marked on the UI interface, showing their position, size, classification label, name, etc.

When reading registers via the main controller, the following data will be returned:

| **Result** | **Meaning**     |
| ---------- | --------------- |
| 1          | Blob center x-coordinate |
| 2          | Blob center y-coordinate |
| 3          | Blob width w    |
| 4          | Blob height h   |
| 5          | Color classification label |

#### **Usage Tips**

1. When it is determined that a single object needs to be tracked, such as detecting a white road or tracking a ball, the number of blobs can be set to 1 to improve speed and reduce false positives.
2. Using a smaller recognition area and accurate performance mode allows seeing objects farther away.
3. When recognizing large areas of color blobs, the frame rate will significantly drop. Use sensitive mode in this case.
4. When there is color bias in the picture, the white balance function needs to be locked.

#### **Explanation of Blocks Needed**

1. **Sentry2 Initialization Block**

An optional parameter is the i2c address. Default is 96 (0x60).

Before using Sentry2, the initialization block must be executed first. It is usually placed under the "when started" hat block.

![](init.png)

2. **Sentry2 Set Mode Block**

![](setmode.png)

The mode needs to be set to blob, i.e., color blob detection mode.

3. **Sentry2 Detection Result**

![](result.png)

This block must be used to trigger the detection before obtaining results. 

It returns the number of results identified by the current blob algorithm.

The number of results will be affected by the corresponding algorithm parameter settings.

4. **Sentry2 Detected Object Properties**

![](property.png)

Returns the properties of the detected object id, including the blob center x-coordinate, blob center y-coordinate, blob width w, blob height h, and color classification label.

The color classification labels are 1~5, representing black, white, red, green, and blue respectively.



### 5. Start Programming

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection, and attach the AI vision perception module to the front of the CoCube robot.

2. **Load Block Library**: If the Sentry2 AI camera library and CoCube external module library have not been added, load them first.

3. **Camera Module Initialization**: Choose to enable the external module power supply at startup, then wait 4 seconds for the camera module to start successfully before initializing the I2C interface, and then set the camera's algorithm mode to blob mode for color blob recognition.

![](scriptImage4423397.png)

* **Color Blob Recognition**: Continuously check if any Blob color blobs are detected. When the number of detected blobs is 1, output the five attributes of that blob. You can observe the position, size, and color label of the blob in real-time.

![](result2.png)

* **Write Your Own Program**: With the above debugging code, try combining more functions yourself!

### 6. Challenge Yourself

Based on the color blob recognition function, implement the feature of following a blue cylinder.

Note: Manually set the color blob recognition parameters of the Sentry2 camera, changing the recognized blob color from the factory default red to blue.