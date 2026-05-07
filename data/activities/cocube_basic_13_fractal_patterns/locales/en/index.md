### 1. Goal

This tutorial introduces the idea of recursion in a friendly way. You will learn how a program can call itself to draw complex and beautiful fractal patterns. We will also use classic Turtle drawing so you can see the result directly on the screen.

![fractal tree result](fractal_tree_result.png =260x*)
![koch snowflake result](koch_snowflake_result.jpg =260x*)
### 2. Materials

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Background

#### Recursion

1. **Break a big problem into smaller copies**
   Take a big problem, split it into smaller problems that look similar, and solve those smaller problems in the same way.

2. **Always have a stopping point**
   Recursion cannot continue forever. It needs a condition that says when to stop. When the problem becomes small enough, the program gives an answer directly and stops calling itself.

**Example: passing a message in a movie theater**

Imagine you are in a dark movie theater and want to know which row you are sitting in.

* **Your action:** You tap the person in front of you and ask, "Which row is this?"

* **Recursion happens:** That person does not know either, so they ask the person in front of them. The same action repeats.

* **Stopping point:** Eventually the question reaches the person in the first row. That person knows the answer: "I am in row 1!"

* **Returning the result:** The answer is passed back row by row.

  * The second row thinks, "Then I am 1 + 1 = 2," and tells the third row.

  * The message travels back until you get your answer.

**This is recursion:** you break one big question into smaller copies of the same question, stop when the answer is obvious, and then return the result step by step.

#### Koch Snowflake

Have you noticed that real snowflakes do not have smooth edges when you zoom in? Their edges are full of smaller and smaller details.

In 1904, the mathematician Helge von Koch wondered whether a simple rule could draw a snowflake with endless detail.

That idea became the Koch snowflake, a shape that grows through recursion.

Drawing rules:

Step 0: Draw an equilateral triangle.

Step 1: Divide each side into three parts, and raise a small triangle on the middle part.

Step 2: Apply the same rule to every new side.

Step 3: Keep repeating. The sides become more numerous, and the figure looks more and more like a snowflake.

![koch snowflake example](koch_snowflake_example.png =260x*)
#### Turtle Drawing Blocks

Imagine Turtle as a tiny robot holding a pencil. You write a walking plan, and it follows the plan while drawing.

1. **Pen up and pen down:** When the pen is down, Turtle leaves a trail as it moves. When you want to move to another place without drawing, lift the pen, move, and then put the pen down again.

![pen up](pen_up.png)

![pen down](pen_down.png)
* **Forward:** This block controls Turtle's movement. Enter a number in pixels. The number decides how long the drawn line will be.

![move forward](move_forward.png)
* **Turn:** This block changes Turtle's direction. Enter an angle in degrees.

  * A positive number, such as `90`, turns Turtle clockwise.

  * A negative number, such as `-90`, turns Turtle counterclockwise.

  Note: this block only changes direction. It does not move Turtle or draw a line.

![turn degrees](turn_degrees.png)
* **Move the pen to an exact position:** If you already know the x and y coordinates you want to reach, you do not need to move forward step by step. Use this block to move directly to that position.

![go to xy](go_to_xy.png)
* **Change colors:** Use these two blocks to change the background color and pen color.

![fill background](fill_background.png)

![set pen color](set_pen_color.png)
### 5. Draw a Fractal Tree

1. **Add a library:** Want Turtle to follow your commands and draw interesting shapes? In the MicroBlocks editor, open **Graphics and Displays**, find the **Turtle library**, and click **Add Library**. Then Turtle is ready to draw.

![add library button](add_library_button.png)

![graphics and displays](graphics_and_displays.png)

![turtle library](turtle_library.png)
* **Warm-up:** Before drawing snowflakes or branching trees, start with a simple equilateral triangle using Turtle drawing.

Choose a pen color. To keep the drawing centered, move Turtle to the middle of the screen first, then put the pen down.

![select pen](select_pen.png)

Drawing an equilateral triangle is simple:

Move Turtle forward to draw one side.

Turn 120 degrees, then draw the next side.

Repeat "move + turn" 3 times, and the triangle is complete.

![triangle code](triangle_code.png)

![triangle result](triangle_result.png =300x*)
* Recursive fractal tree:

Now let us draw a tree that grows branches by itself.

Its rule is simple:

* Step 0: Draw a straight trunk.

* Step 1: At the top of the trunk, draw a shorter branch to the left and another to the right.

* Step 2: Treat each new branch as a smaller trunk. Repeat the same action at its top.

* Step 3: Keep repeating. The branches become smaller and more detailed.
  After several repeats, a fractal tree appears.

This self-calling rule is called recursion in programming. Follow the steps, and you can draw a fractal tree.

![fractal tree diagram](fractal_tree_diagram.png =320x*)

**What is the most important thing before using recursion?**

Decide when to stop.

Just like the movie theater example, there must be a condition where the program can give an answer directly and stop asking again.

If there is no stopping condition, recursion will run forever and the program may get stuck.

In this tree, every new branch is shorter than the previous one.

So we can stop when the branch length becomes small enough, for example less than 5.

Also, recursion should not only stop at the bottom. It must also return so the previous level can continue.

So we create a **custom block** and write the stopping case:

![drawtree base case](drawtree_base_case.png)

PS: In recursion, the **return** block is important. It ends the current call and returns to the previous level. You can also use an **if else** structure to get the same result.

Now we can draw the whole tree:

1. Draw the trunk by moving forward with the current length.

2. Draw the left branch by turning left and drawing a shorter branch.

3. Draw the right branch by turning right and drawing another shorter branch.

4. Move back to the branching point and restore the original direction so the previous recursion level can continue.

![drawtree steps](drawtree_steps.png)

Here are two complete block definitions:

![drawtree definition a](drawtree_definition_a.png)

![drawtree definition b](drawtree_definition_b.png)

In the main program, first place Turtle near the bottom of the screen:

Move the pen to a good starting point, point Turtle upward with the **face -90 degrees** block, put the pen down, and call **drawtree**.

![tree main program](tree_main_program.png)
### 6. Try the Koch Snowflake

The Koch snowflake rule is: divide each line segment into three equal parts, then raise a small bump on the middle part.

If we keep doing this, the segments become shorter and the number of levels increases.

In the custom block, we need two inputs:

* Length: the current segment length.

* Level: how many more times to subdivide.

The stopping condition is:
When level = 0, stop subdividing and draw a straight line of the given length.

![koch base case](koch_base_case.png)

In the Koch snowflake, level decides how many times we subdivide, and length decides how long the current segment is.

#### Why does level decrease by 1 each time?

Think of peeling layers from an onion. Each time you remove one layer, there is one fewer layer left. For the snowflake, each recursive call uses one level, so the next call uses level - 1. When level reaches 0, draw a straight line.

#### Why divide the length by 3?

The Koch rule turns one line segment into 4 smaller segments, each one-third of the original length. So the next recursive call uses length / 3.

Detailed steps:

1. Draw Koch curve with length / 3 and level - 1.

2. Turn left 60 degrees.

3. Draw Koch curve with length / 3 and level - 1.

4. Turn right 120 degrees.

5. Draw Koch curve with length / 3 and level - 1.

6. Turn left 60 degrees.

7. Draw Koch curve with length / 3 and level - 1.

![koch recursive case](koch_recursive_case.png)

PS:

* Turning left 60 degrees and right 120 degrees creates the two outside turns of an equilateral triangle.

* The final left 60-degree turn restores Turtle's original direction.

The **kochshow** block draws one side of the snowflake. A full snowflake needs 3 sides, so the main program calls it 3 times and turns right 120 degrees after each side.

![koch main program](koch_main_program.png)

[Reference code: Fractal Patterns](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%20%27Turtle%27%0A%0Aspec%20%27%20%27%20%27drawtree%27%20%27drawtree%20_%27%20%27auto%27%20%2710%27%0Ato%20drawtree%20length%20%7B%0A%20%20if%20%28length%20%3C%2010%29%20%7B%0A%20%20%20%20move%205%0A%20%20%20%20move%20-5%0A%20%20%20%20return%200%0A%20%20%7D%0A%20%20move%20length%0A%20%20turnBy%2015%0A%20%20drawtree%20%28length%20-%205%29%0A%20%20turnBy%20-30%0A%20%20drawtree%20%28length%20-%205%29%0A%20%20turnBy%2015%0A%20%20move%20%280%20-%20length%29%0A%7D%0A%0Aspec%20%27%20%27%20%27kochsnow%27%20%27kochsnow%20_%20_%27%20%27auto%20auto%27%20%2710%27%20%2710%27%0Ato%20kochsnow%20size%20level%20%7B%0A%20%20if%20%28level%20%3D%3D%200%29%20%7B%0A%20%20%20%20%27pen%20down%27%0A%20%20%20%20%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20%20%20move%20size%0A%20%20%20%20%27pen%20up%27%0A%20%20%7D%20else%20%7B%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20-60%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20120%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20-60%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%7D%0A%7D%0A%0Ascript%20423%2082%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%27go%20to%20x%27%20120%20240%0AsetHeading%20-90%0A%27pen%20down%27%0Adrawtree%2050%0A%7D%0A%0Ascript%20192%2082%20%7B%0Ato%20drawtree%20length%20%7B%7D%0A%7D%0A%0Ascript%20876%2082%20%7B%0Ato%20kochsnow%20size%20level%20%7B%7D%0A%7D%0A%0Ascript%20620%2077%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%27go%20to%20x%27%20100%20100%0Alocal%20%27size%27%2081%0Alocal%20%27l%27%203%0Arepeat%203%20%7B%0A%20%20kochsnow%20size%20l%0A%20%20turnBy%20120%0A%7D%0AsayIt%20%28size%20%2F%203%29%0A%7D%0A%0A)
