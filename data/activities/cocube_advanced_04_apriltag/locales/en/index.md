### 1. Goal

To learn the AprilTag recognition function of the AI visual perception module.

### 2. Materials Used

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Visual Perception Module](Sentry2.png =300x*)

Print AprilTag labels of appropriate specifications and sizes.

- [Download Apriltags Encoding - 16h5](https://tosee.readthedocs.io/zh/latest/_downloads/69489d7ebc0ff9d43cc92893281b6731/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-16h5.pdf)  
- [Download Apriltags Encoding - 25h9](https://tosee.readthedocs.io/zh/latest/_downloads/2d2a4bff63b80e05f846a60d48b27afd/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-25h9.pdf)  
- [Download Apriltags Encoding - 36h11](https://tosee.readthedocs.io/zh/latest/_downloads/d9438412c56f6105a50ac4057d980c49/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-36h11.pdf)  

You can also generate and print AprilTag labels of appropriate specifications and sizes online using the [ArUco markers generator](https://chev.me/arucogen/).

### 3. Software Platform

- [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)  
- Or directly open the programming environment with the AI visual perception module: [MicroBlocks-AI Camera](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Algorithm Knowledge

#### Algorithm Introduction

![](image-2.png)

The algorithm detects whether there is an Apriltag pattern in the image. It currently supports 16H5, 25H9, and 36H11 encoding formats. The decoding method must be specified before running the algorithm. Different encoding formats cannot be detected simultaneously, but up to 25 tags of the same encoding format can be detected at once.

**Note**: This algorithm cannot run simultaneously with other algorithms marked with an asterisk (*).

**Classification Labels**

![](image-3.png)

Apriltag labels are predefined black and white square patterns, with different encoding formats using different numbers of squares. Each pattern has a predefined classification label value, which is returned upon recognition.

You can print AprilTag labels of appropriate specifications and sizes using the provided links or generate them online using the [ArUco markers generator](https://chev.me/arucogen/).

#### Configuration Parameters

![](image-1.png)

The UI interface allows setting algorithm performance and encoding format.

> **Algorithm Performance:**
>
> Choose the appropriate algorithm performance based on different application requirements. There are three options: "Sensitive," "Balanced," and "Accurate."
>
> - In Sensitive mode, the recognition speed is fast, and the frame rate is high.
> - In Accurate mode, distant tags can be detected, but the speed will decrease.
> - The default setting is Balanced performance.
>
> **Encoding Format:**
>
> Clicking the button cycles through the three encoding modes: "16H5," "25H9," and "36H11." After switching, the algorithm must be restarted for the changes to take effect.

#### Return Results

![](image.png)

After recognizing a tag, the algorithm returns its coordinates, size, and tag number.

When reading the register via the main controller, the following data is returned:

| **Result** | **Meaning**          |
|------------|----------------------|
| 1          | Center x-coordinate of the tag |
| 2          | Center y-coordinate of the tag |
| 3          | Width (w) of the tag       |
| 4          | Height (h) of the tag      |
| 5          | Tag number             |

#### Tips for Use

1. The width and height of the recognized tags are stable outputs, which can be used for distance judgment. The size does not change when the tag rotates, but it may be affected when the tag is tilted.
2. When recognizing multiple tags, you can turn off the display of coordinate lines for a cleaner appearance.
3. The larger the tag, the farther the recognition distance.

#### Blocks to Be Used

1. **Sentry2 Initialization Block**

   - An optional parameter is the I2C address. The default is 96 (0x60).
   - Initialize Sentry2 before use. Typically placed under the "When Started" hat block.

   ![](init.png)

2. **Sentry2 Set Mode Block**

   - Set the mode to apriltag (AprilTag detection mode).

   ![](apriltag.png)

3. **Sentry2 Detection Result**

   - This block triggers the detection. Use it to obtain detection results.
   - The block returns the number of AprilTag results detected.

   ![](resultblock.png)

4. **Sentry2 Detection Object Properties**

   - Returns properties of the detected object, including center x-coordinate, center y-coordinate, width (w), height (h), and tag number.

   ![](property.png)

### 5. Start Programming

1. **Connect Devices**: Connect MicroBlocks IDE to the CoCube robot via wired or wireless connection, and attach the AI visual perception module to the front of the CoCube robot.

2. **Load Block Libraries**: If the Sentry2 AI camera library and CoCube external module library are not added, load the CoCube external module library and Sentry2 AI camera library first.

3. **Initialize Camera Module**: Enable the external module power supply at startup, wait for 4 seconds for the camera module to start successfully, then initialize the I2C interface, and set the camera algorithm mode to AprilTag mode.

   ![](apriltaginit.png)

* **Color Block Recognition**: Continuously check if AprilTag color blocks are detected. When the number of detected tags is 1, output the 5 properties of the tag. You can observe the tag's position, size, and tag number in real time.

   ![](result.png)

* **Write Your Own Program**: After debugging with the above code, try exploring more functions on your own!