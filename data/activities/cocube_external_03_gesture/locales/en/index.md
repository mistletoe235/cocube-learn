### 1. Purpose of the Case

Learn to use the 3D gesture module and create more interesting interactive applications.

The module integrates a high-precision, low-power gesture recognition sensor that supports gesture recognition in three-dimensional space, enabling interactive control with the robot.

**Note: When using the 3D gesture module, do not place the CoCube robot on the CoMaps positioning map.**

### 2. Materials Used

![CoCube Robot × 1](robot.png =200x*)
![3D Gesture Module](3Dgesture.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Software Platform

[MicroBlocks——CoCube & CoCube Module](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. Quick Experience

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection, and attach the 3D gesture sensor module to the CoCube robot.

2. **Add Block Library**: Under the "Robot" directory, add the "CoCube Module Library" — this library includes all functions of the external modules: "3D Gesture Connected" and "3D Gesture Read."

![](image-1.png)

![](image.png)

* **3D Gesture Sensor Connected**: Drag out the "3D Gesture Connected" block, place it in the workspace, and click to run. This block checks whether the CoCube robot is connected to the 3D gesture sensor module.

![](scriptImage9339087.png)

**Note: Since the module requires some time to power up, there’s a chance that the first run might return "false." Please wait a little longer before testing again.**

* **3D Gesture Sensor Read Data**: Drag out the "3D Gesture Read" block, wave your hand in front while clicking to run, and you will likely read a "?" (though you might be lucky and read "left," "right," or another gesture). Mimicking the approach used with the ToF laser rangefinder, looping the reading will still only give you individual "?". Clearly, this approach is not ideal.

![](scriptImage9438390.png)

![](scriptImage9501061.png)

The 3D gesture sensor supports **9 types of gesture recognition by default**, with a maximum update frequency of **240Hz**. It only provides correct input when a gesture is captured; otherwise, it outputs "?". Therefore, if you want to output measurement results in real-time, you need to write the following program:

![](scriptImage9927037.png)

### 5. Advanced Features

Can you write a program to control the robot with gestures? For example, waving to one side makes the robot rotate in that direction.

###### Example Program – Think and Try First!

![](scriptImage11809588.png)

### 6. Challenge Yourself

Try controlling the CoCube robot to play music or perform movements using other gestures!

### 7. Reference Code Examples

All tutorial code examples above:

[MicroBlocks —— 3D Gesture Module Cases](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20711%2082%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27ccmodule_gesture%20read%27%29%0A%20%20if%20%28var%20%21%3D%20%27%3F%27%29%20%7B%0A%20%20%20%20if%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27left%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204488452%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%20500%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27right%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204291652%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20500%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0A)