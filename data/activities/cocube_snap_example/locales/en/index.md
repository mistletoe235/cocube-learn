### 1. Project Objectives
Master multi-robot cluster control technology by programming four CoCube robots to achieve coordinated formation and circular movement on different sized maps, experiencing precise multi-robot coordination control!

### 2. Materials Required

![CoCube Robot × 4](robot.png =200x*)
![Personal Computer or Tablet](PC.png =250x*)
![Base Station](cudy.png =250x*)

![300x200 Map](map_300200.png =400x*)

### 3. Software Platforms

1. [MicroBlocks——CoCube & CoCube Module](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

2. [Snap](http://https://snap.berkeley.edu//snap.html)

![](img3.png)

### 4. Environment Setup

1. **Deploy Map:** Choose a suitable flat area and lay out the 300x200 or 600x600 positioning map
2. **Start Base Station:** Follow the basic tutorial method to start the base station and connect your computer to the base station network
   - 💡 **Tip**: You can choose wired or WiFi connection, ensure stable network

![](map_setup.png)

### 5. Configure Four Robots

For easy management, we'll assign IDs to the four robots: 1, 2, 3, 4

1. **Connect Robots One by One:** Use data cable or Bluetooth to connect each CoCube robot to the MicroBlocks programming environment
2. **Set Robot Parameters:** Configure each robot with:
   - Unique robot ID (Robot 1, Robot 2, Robot 3, Robot 4)
   - Same WiFi connection information
   - Same router address (default 192.168.10.1)
3. **Verify Connection:** Ensure all four robots successfully obtain IP addresses and display on the blocks

⚠️ **Important Reminder**: Each robot's ID must be different, but WiFi information must be identical!

### 6. 300x200 Map Linear Formation Control

#### 6.1 Import Control Program

1. **Download Example Program:** <a href="cocube_snap_example1.xml" download="cocube_snap_example1.xml">Click to download example program 1</a>
2. **Import to Snap:** Open the Snap website and drag the `cocube_snap_example1.xml` file into the window
3. **View Robot Sprites:** You'll see the file has already created four numbered robot sprites!

![](snap1.png)

#### 6.2 Execute Formation Control

1. **Understand Control Keys:** Click on the stage on the right to see the preset control commands:
   - Click green flag: Connect four robots
   - Press keyboard "1": Move to starting position  
   - Press keyboard "2": Start forming a straight line
   - Press keyboard "3": Arrange in circle formation
   - Press keyboard "4": Circular orbit movement

![](snap2.png =600x*)

2. **Start Control:** 
   - First click the green flag button in the upper right to connect robots
   - After successful connection, Snap's upper right corner will display real-time robot positions, moving the physical robots will show synchronized position changes!
   
![](snap3.png =300x*)

   - Then press keyboard number keys "1-4" to execute different formation actions, achieving the effects shown in the video below

<video width="320" height="240" controls>
  <source src="video_720p.mp4" type="video/mp4">
</video>

3. **Custom Programming:** Want to modify actions? Click any robot sprite, then drag blocks from the left to create your own formation programs!

### 7. Step 4: 600x600 Map Exploration Challenge

Through the above example, you've mastered the basic methods of multi-robot cluster control! Now let's challenge a larger map!

**Download Large Map Program:** <a href="cocube_snap_example2.xml" download="cocube_snap_example2.xml">Click to download example program 2</a>

This program includes:
- 600x600 map coordinate mapping
- Basic control framework for eight robots  
- Expandable programming block combinations

### 8. Challenge Time 🚀

Now you're a multi-robot control expert! Try these advanced challenges:
- Program four robots to form a square formation for complex geometric movements
- Create a robot "snake" formation, making them move like the game Snake
- Design robot relay races, having them complete different task points in sequence
- What cooler cluster control gameplay can you think of? Start creating!