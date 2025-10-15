### 1. Goal

To program the CoCube robot to learn the coordinate positioning function of the positioning mat and the robot's point-to-point directional movement, and to understand the output functions in MicroBlocks during this process.

### 2. Materials Used

![CoCube Robot × 1](robot.png =200x*)
![Personal Computer or Tablet](PC.png =200x*)
![CoCube Positioning Map](image.png =200x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-1.png)

### 4. Start Programming

#### 4.1 Understanding CoMaps Positioning Map

CoMaps can provide precise positioning functions for the CoCube robot.

![CoMaps Example —— Maze Challenge Themed Positioning Map](comap.png)

Take out a maze challenge themed positioning map and observe it carefully:

- The top-left corner of the map has coordinates (0,0), and the bottom-right corner has coordinates (300,200).
- The X-axis runs from left to right (0~300), and the Y-axis runs from top to bottom (0~200).
- The robot faces 0 degrees when pointing in the positive direction of the Y-axis, and 180 degrees when pointing in the negative direction of the Y-axis. The angle increases in a counterclockwise direction.
- Dotted lines are printed every 50 units on the map to help quickly locate coordinates.

#### 4.2 **Let CoCube Announce Its Position**

How can we obtain the precise position and angle of the CoCube robot on the CoMaps map?

1. **Connect Devices**: Connect the Microblocks IDE to the CoCube robot via Bluetooth and place the CoCube robot on the positioning mat.

2. **Use the "Say" Block**

   - Open the "Output" block library and drag out the "Say 123" block. Click to run it, and you will see a small bubble in the top-right corner of the block in the MicroBlocks IDE, displaying "123".
   - This is the function of the "say \_" block! It does not make the CoCube robot speak but displays content in the MicroBlocks IDE for you to see.

![](image-2.png)  
![](scriptImage1819646.png)

- If you want to say two pieces of content simultaneously, simply click the small triangle on the right side of the "say \_" block and enter the content you want to output in the new input field.
- You can also fill in blocks from the "Math" block library, and CoCube will output the final result to the MicroBlocks IDE.

![](scriptImage2100985.png)  
![](scriptImage2239731.png)

- **Output CoCube Coordinates**

  - Drag out the "X Position," "Y Position," and "Direction Angle" blocks from the CoCube block library and place them in the "say \_" block. Click the block to announce CoCube's current coordinates.
  - To continuously output CoCube's coordinates and angle, nest a "Repeat" block.

![](scriptImage2340058.png)

- Move the CoCube robot and observe whether the coordinates and angle in MicroBlocks change accordingly.

#### 4.3 Plotting CoCube's Position

If you find the "say \_" block not intuitive enough, you can also use the "Plot" block to display CoCube's coordinates on a data chart.

1. **Connect Devices**: Connect the Microblocks IDE to the CoCube robot via Bluetooth and place the CoCube robot on the positioning mat.

2. **Use the "Plot" Block**: Write the following code and run it. Click the plot button in the top-right corner of the MicroBlocks IDE. The red, green, and blue curves represent the values of CoCube's "X Position," "Y Position," and "Direction Angle," respectively.

![](image-3.png)

#### 4.4 Precise Movement

After mastering the above skills, you should be able to explore the remaining functions on your own.

![](image-4.png)

We will rewrite a program for the CoCube robot to draw a square trajectory:

![](scriptImage3089043.png)  

![](scriptImage3097549.png)

Reference program example: [MicroBlocks —— CoCube Case 03 Drawing a Square Trajectory](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20971%20248%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20rotate%20to%20angle%27%200%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20180%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20270%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%7D%0A%7D%0A%0Ascript%20596%20312%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%7D%0A%7D%0A%0A)

### 5. Challenge

Use the coordinate feedback function and point-to-point movement function of the positioning mat to navigate from the entrance to the exit of the maze.

![](scriptImage256581.png)  
![](comap.gif)

Reference example program: [MicroBlocks —— CoCube Case 03 Maze Challenge](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20437%20194%20%7B%0A%27CoCube%20move%20to%27%20124%2022%2040%0A%27CoCube%20move%20to%27%20124%2053%2040%0A%27CoCube%20move%20to%27%20155%2053%2040%0A%27CoCube%20move%20to%27%20156%20118%2040%0A%27CoCube%20move%20to%27%20286%20118%2040%0A%27CoCube%20move%20to%27%20286%20180%2040%0A%27CoCube%20move%20to%27%20223%20180%2040%0A%27CoCube%20move%20to%27%20220%20150%2040%0A%27CoCube%20move%20to%27%20155%20150%2040%0A%27CoCube%20move%20to%27%20155%20180%2040%0A%7D%0A%0A)

You may find that CoCube turns too quickly and is not stable enough. We can slow down the speed and move after facing a specific angle at each coordinate point. Give it a try!