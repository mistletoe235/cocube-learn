### 1. Project Objectives
Learn to use both MicroBlocks and Snap programming platforms to simultaneously control multiple CoCube robots through WiFi networks, and experience the fun of multi-robot collaborative work!

### 2. Materials Required

![CoCube Robot × 1](robot.png =200x*)
![Personal Computer or Tablet](PC.png =250x*)
![Base Station](cudy.png =250x*)

### 3. Software Platforms

1. [MicroBlocks——CoCube & CoCube Module](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

2. [Snap](http://snap.codelab.club/snap.html)

![](img3.png)

### 4. Step 1: Start the Base Station

1. Find the Type-C cable and insert it into the Type-C power port of the base station
2. Wait patiently for about 1 minute to let the base station fully start up
3. Connect to the base station's WiFi network on your computer (usually COCUBEXXXX), or connect with an ethernet cable
   - 💡 **Tip**: If using an ethernet cable, make sure to plug it into the base station's LAN port (usually labeled "LAN")

![](tr1200-1-0-4.png)


### 5. Step 2: Connect CoCube to WiFi Network

1. **Connect CoCube Robot:** If your robot hasn't connected to WiFi before, you need to set it up in MicroBlocks first. If it has already been connected, you can skip this step. Connect your CoCube robot to the MicroBlocks programming environment using a data cable or wirelessly.

2. **Set up WiFi Connection:** Drag the following program into the MicroBlocks workspace, then modify it according to your actual situation:
   - Robot ID (assign each robot a number, like Robot 1, Robot 2)
   - WiFi name (the network you want to connect to)
   - Router address (default is 192.168.10.1)
   
   After setting up, click this block, then click the ▶️ start button in the upper right corner.

![](allScripts11770207.png)

If you see the block displaying your robot's IP address (like in the image below), congratulations, you've connected successfully! To connect more CoCube robots, simply repeat the above process.

![](img4.png)

### 6. Step 3: Control Your Robot with Snap

1. **Import Control Program:** Open the Snap website and drag the `cocube_websokets.xml` file into it. You'll see the "CoCube WebSockets" block library appear in the upper left corner!

![](img6.png)

2. **Connect Robot:** 
   - Enter the robot ID you set earlier to connect your first robot
   - Want to control more robots? Click the "Add a turtle sprite" button on the right
   - ⚠️ Important reminder: Never use the "copy" or "clone" functions - each robot needs its own independent sprite

![](img5.png)

3. **Set up Stage:** You can click on the stage in the lower right corner, then click the background button to drag in your favorite stage image! After setting up, remember to click on the sprite you want to control again for programming.

![](img7.png =250x*) ![](img8.png =250x*)

4. **Start Programming Control:** Once the robot is successfully connected, you can freely combine programs using the blocks on the left! Make the robot move forward, backward, turn, or even dance!

### 7. Challenge Time 🚀

Now that you've mastered the secrets of multi-robot control, try these fun challenges:
- Make multiple robots march in formation
- Program the robots to perform a synchronized dance
- Combine CoCube's positioning map functionality to create a robot soccer match
- What other cool applications can you think of? Give them a try!