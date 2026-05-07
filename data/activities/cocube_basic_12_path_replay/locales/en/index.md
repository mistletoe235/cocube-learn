### 1. Goal

Want your robot to learn how to remember a route and walk it again by itself? You may have played a game where you follow footprints back to where you started. It sounds simple, but it tests the robot's memory. In this activity, you will program the CoCube robot to remember each position it has visited and then replay the full path.

### 2. Materials

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
![comap](comap.png =420x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![microblocks cocube](microblocks_cocube.png =520x*)
### 4. Background

#### Blocks You Will Use
1. **List block**: In the **Data** category, there is a block called **list**. When you first drag it out, it may contain the default item **cat**. Click the small gray triangle on the left to turn it into an empty list, like a clean table waiting for data.

![list](list.png)

![empty list](empty_list.png)
2. **Storing data in a list:** Once we have a **list** warehouse, we can store pieces of data neatly and read them later.

But a warehouse is not enough. We also need a block that puts things into the warehouse. This block adds the new item to the end of the list, just like a new person joining the back of a line.

It has two inputs:

* The first input: the item you want to store, such as a number or a letter.

* The second input: the list where you want to store it.

![append to list](append_to_list.png)

PS: Try putting a **list** block into this block. Do you get the result you expected?

* **Reading a list:** After we store data in the warehouse, the next key question is how to get an item back from a certain position.

It is like putting a book on a library shelf and then finding it again by its shelf number.

This is where the **item of list** block comes in. It can use a position number, or index, to read exactly the item you need.

![read list](read_list.png)
* **Initializing variables:** Want the robot to remember a number or a name so it can use it later? Give it a small box. In programming, that box is called a **variable**.

How do you find this box?

* Find the orange **Variables** category.

* At the top-left of the category, click **Add a variable**.

* Create the variable.

![variable category](variable_category.png)

![create variable](create_variable.png)

Before using a variable, we usually give it a clear starting value. Later, when the value changes, we update it.

![local variable init](local_variable_init.png)

Local variable initialization

![set variable](set_variable.png)

Setting a variable

PS: A local variable only works inside the block or script where it is created.

* **Naming a warehouse:** If we use plain lists as warehouses, we run into a problem: they have no labels. If there are two identical list warehouses, how can we tell which data is in which one? We can use variables to name our warehouses. In the image below, the target warehouse is named **list_x**.

![named list](named_list.png)
### 5. Give the Robot a Memory

1. **Create variables and warehouses:** How can we give the robot memory?

First, we need a place to store that memory. We create named warehouses, or lists, to store the robot's coordinate data. We also introduce an index variable as a counter, so we always know how many positions have been stored.

![create lists](create_lists.png)
* **Store positions:** Next, we store the robot's footprints, which are the X and Y coordinates on the map, into two matching lists. There is one important rule:

The 1st X coordinate must be stored with the 1st Y coordinate, the 2nd with the 2nd, and so on. Items at the same position in the two lists must stay paired. Otherwise, X and Y values may get mixed up when we read them later.

![save position](save_position.png)

The two coordinates of the same point appear together, so we bundle them together in memory. This makes the robot's memory easier to manage.

![paired coordinates](paired_coordinates.png)

We can go one step further: join the X and Y coordinates together as one point and store that whole point in a single list. Then one list can store all positions, which is simpler and easier to manage.

### 6. Move Along the Remembered Path

1. **Path replay:** Remember what you learned before: if you give CoCube a target coordinate, it can move there quickly and accurately.

To replay a route, we read the stored coordinates from the warehouse one by one, then use the **CoCube move to** block to guide the robot through them in order.

![read route](read_route.png)

Here we read the 1st coordinate from each warehouse. This matches the idea of coordinate pairs: the 1st X value and the 1st Y value belong together.

Why the 1st item?

Because we stored the coordinates in order. The first place the robot remembered is at the front of the list.

* How can we replay more coordinates?

If you are familiar with the **for** block with an index variable, you may quickly think of reading the length of the warehouse and then reading each coordinate pair in order. That works.

![for index](for_index.png)

Today we will use a new method called "read and delete." After we read the 1st coordinate, that item has been used and is no longer needed, so we delete it.

After deletion, the old 2nd item moves forward and becomes the new 1st item. That means we only need to read item 1 every time. With this method, our **list** behaves like a queue: the item stored first is used and removed first.

![delete first item](delete_first_item.png)

If we keep "read and delete" running forever, the outer **forever** loop will never stop. We need to break out at the right time. Use the **exit loop** block. To find it, first turn on **advanced mode**, then look at the bottom of the **Control** category.

![exit loop](exit_loop.png)

We can also use the **repeat until** block to replace the combination of **if** plus **forever**:

![repeat until empty](repeat_until_empty.png)
### 7. Instructions

1. **Create a menu:** To make the controls clear, we can use the CoCube **TFT** screen to show a simple menu. The custom block **start** draws this menu. Then we use the physical A and B buttons on the CoCube robot:

   * Press A: start **Record**, so the robot records its positions.

   * Press B: start **Start**, so the robot replays the stored path.

   * Press A + B together: **Restart**, which clears all stored coordinates and starts over.

![start menu](start_menu.png)
* **Restart:** If you used the "read and delete" method, **Restart** can be simple: stop all tasks and return to the menu.

![ab restart](ab_restart.png)

If you use the **for** block with an index variable, you can place the memory deletion here:

![ab restart delete memory](ab_restart_delete_memory.png)

Use the blocks described above to store and replay the robot's positions. Add **TFT** display and music to make the activity more interesting.

<video controls style="width: 320px; max-width: 100%; height: auto;">
  <source src="path_replay_demo.mp4" type="video/mp4">
</video>

[Reference code: MicroBlocks CoCube Path Replay](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27TFT%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27start%27%20%27start%27%0Ato%20start%20%7B%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%3A%20Record%27%2010%2060%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27B%3A%20Start%27%2010%20100%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%2BB%3A%20Restart%27%2010%20140%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%7D%0A%0Ascript%20416%2065%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27%5Btft%3Aclear%5D%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0Astart%0A%7D%0A%0Ascript%20602%2065%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0Aif%20%28%28size%20list_x%29%20%3D%3D%200%29%20%7B%0A%20%20list_x%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20list_y%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20num%20%3D%200%0A%7D%0Aif%20%28%27CoCube%20on%20the%20mat%27%29%20%7B%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_X%27%29%20list_x%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_Y%27%29%20list_y%0A%20%20num%20%2B%3D%201%0A%20%20sendBroadcast%20%27show%20number%27%0A%7D%0A%7D%0A%0Ascript%20416%20508%20%7B%0AwhenStarted%0Acomment%20%27%E5%B0%86CoCube%E6%94%BE%E7%BD%AE%E5%9C%A8CoMaps%E5%9C%B0%E5%9B%BE%E4%B8%8A%E7%9A%84%E4%B8%8D%E5%90%8C%E4%BD%8D%E7%BD%AE%EF%BC%8C%0A%E6%8C%89%E4%B8%8BA%E9%94%AE%E8%AE%B0%E5%BD%95%E6%AF%8F%E4%B8%80%E4%B8%AA%E5%9D%90%E6%A0%87%EF%BC%8C%0A%E6%8C%89%E4%B8%8BB%E9%94%AE%EF%BC%8CCoCube%E5%B0%86%E6%8C%89%E9%A1%BA%E5%BA%8F%E7%A7%BB%E5%8A%A8%E5%88%B0%E8%BF%99%E4%BA%9B%E5%9D%90%E6%A0%87%E4%BD%8D%E7%BD%AE%E3%80%82%27%0Acomment%20%27Place%20the%20CoCube%20at%20different%20locations%20on%20the%20CoMap.%0APress%20the%20A%20button%20to%20record%20each%20coordinate.%0AAnd%20then%20press%20the%20B%20button%2C%20the%20CoCube%20will%20move%20to%20these%20recorded%20locations%20in%20sequence.%27%0Astart%0A%7D%0A%0Ascript%20416%20741%20%7B%0AwhenBroadcastReceived%20%27show%20number%27%0A%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%27play%20tone%27%20%27nt%3Bg%27%200%20150%0AwaitMillis%20200%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20416%20971%20%7B%0AwhenButtonPressed%20%27B%27%0Anum%20%3D%200%0A%27%5Btft%3Atext%5D%27%20%270%27%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0Aforever%20%7B%0A%20%20if%20%28%28size%20list_x%29%20%21%3D%200%29%20%7B%0A%20%20%20%20%27CoCube%20move%20to%27%20%28at%201%20list_x%29%20%28at%201%20list_y%29%2040%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_x%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_y%0A%20%20%20%20num%20%2B%3D%201%0A%20%20%20%20%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20150%0A%20%20%7D%20else%20%7B%0A%20%20%20%20waitMillis%20300%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20exitLoop%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20976%201240%20%7B%0Ato%20start%20%7B%7D%0A%7D%0A%0A)
