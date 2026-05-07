### 1. Goal

Want to make a fun little game for your robot? You may have played the classic game Flappy Bird. The rules are simple, but it really tests your reaction speed. In this activity, you will use the robot screen to build a simple Flappy Bird style game and learn the whole process from drawing the screen to implementing the game logic.

### 2. Materials

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Background

#### Key Parts of a Flappy Bird Game

* Build a clear game scene.

* Make pipes appear and move.

* Control the character so it keeps jumping.

* Design a scoring system.

**Think:** What is the key to flying through the pipes? What systems do we need, and how should we design them?

![game preview](game_preview.png =360x*)

<video controls style="width: 320px; max-width: 100%; height: auto;">
  <source src="jumpy_ball_demo.mp4" type="video/mp4">
</video>

**State switching**: Define the start screen, playing state, and game-over screen. Control the transition between them.

**Main loop**: While the game is running, update the picture and the logic repeatedly.

**Rules and detection**: Add scoring, collision detection, and boundary checks that end the game.

#### Blocks You Will Use
Core blocks: In this activity, we mainly use blocks from the **TFT** library. Screen display is needed for the interface, the character, and the moving game elements, so **TFT** is the main library for this game.

![tft text block](tft_text_block.png)

This block has 5 important inputs:

**Text:** The text to display. You can also use a variable.

**x / y position:** The coordinates of the upper-left corner.

**Color:** The text color.

**Scale:** The size ratio of the text. Click the small white triangle to see this input. A value of 1 means one pixel is used as the smallest unit, while 60 means the text uses 60 pixels as one unit.

We also need two blocks for drawing shapes: **rectangle** and **circle**.

![tft rectangle block](tft_rectangle_block.png)

![tft circle block](tft_circle_block.png)
### 5. Design a Text Tool

1. **Drawing text:** The start screen and game-over screen both use text. If we set the size, color, and position every time, the work becomes repetitive and easy to get wrong. We can make a custom text block, a small text tool, so we can reuse the same style.

![write block definition](write_block_definition.png)

By calling this custom block with different inputs, we can write different text on the screen.

![write block example](write_block_example.png)

In this text tool, the x position is centered. Why should the **width** variable be calculated this way?

* **Drawing screens:** After this custom text block is ready, drawing the start and game-over screens becomes easier. We call the block and enter the text we want to show, which keeps the style consistent.

![welcome screen](welcome_screen.png)

![game over screen](game_over_screen.png)

On the start screen, we only need the most important information:

* The game name.

* How to start the game.

The player can immediately understand what the game is and what to press.

The game-over screen needs to show two things:

1. The game has ended, for example **Game Over**.

2. The score, which is what players care about most.

So we prepare a score variable named **score**. Each time the player earns a point, **score** increases by 1. At the end of the game, we can display **SCORE:** followed by **score**.

Try different **scale** values and positions so the start and game-over screens do not overlap.

### 6. Design the Main Game Elements

1. **Draw the ball:** The ball is the main character. Its position changes while the game runs, so each update needs to erase the old ball and draw the new one. Use the previous ball y position to cover the old ball with the background color, then draw the ball at its new position.

![draw ball](draw_ball.png)

PS: Here, **X ball radius** means the ball stays near the left side of the screen. Its x coordinate stays mostly unchanged, while its y coordinate changes.

You may wonder how **previous ball y** and **ball y** are related. The ball needs to fall automatically when no button is pressed. Otherwise, it would float in the air.

* **Ball movement**: In the real world, a ball falls faster and faster because of acceleration. In the game, we use two variables: acceleration and speed. Each frame updates the speed and then updates the ball position.

![ball speed](ball_speed.png)

You can set the initial speed and acceleration yourself.

After the speed is updated, **previous ball y** stores the last frame's **ball y**:

![previous and current ball y](previous_and_current_ball_y.png)

When the player presses a button, the ball jumps up. We can set the speed to 0 and then use acceleration to move the ball upward. Because this action is independent, we make it a function:

![check button](check_button.png)

The **button pressed** block only checks whether a button is pressed. The **playing** variable is a Boolean variable that tells whether the game is still running. Together, they control the game rhythm.

If the player presses too quickly, the ball may fly out of the top of the screen. We choose to add a ceiling: when **ball y** becomes too small, force it back into the screen.

![top boundary](top_boundary.png)

We also need to check whether the ball falls below the bottom of the screen. We can compare **ball y** with the screen height.

![check playing](check_playing.png)

After these parts are complete, the ball's frame-by-frame movement can be grouped into a function named **step ball**:

![step ball](step_ball.png)
* **Draw the pipes:**

  The pipes are similar to the ball: we erase the old position and draw the new one. But a pipe is not one shape. It has a top part, a bottom part, and a gap between them.

  We need to handle:

  * The position and height of the top pipe.

  * The position and height of the bottom pipe.

  * The gap between them, named **gap**.

  The y values for the pipes are easy to determine using the screen height, the gap, and 0. The key to movement is **pipe x**. To make the pipe move left, **pipe x** must keep decreasing every frame.

![draw pipe](draw_pipe.png)

Like the ball, pipe movement can also be divided by frame.

1. First, move the pipe left at a fixed speed:

![pipe x fixed speed](pipe_x_fixed_speed.png)

To make the game more interesting, the difficulty can increase as **score** gets higher. We can connect **pipe x** movement to **score**:

![pipe x score speed](pipe_x_score_speed.png)
* When the pipe has moved far enough left, it has passed the player.

At that point, reset the pipe position and randomly generate a new height for the next challenge.

![reset pipe](reset_pipe.png)

We can also create a **step pipe** block to describe the pipe's frame-by-frame movement:

![step pipe](step_pipe.png)
* **Collision detection:** If the ball hits a pipe, the game ends. Since the ball stays near the left side and the pipes move, collision happens when the pipe reaches the left side.

The first condition is **pipe x <= pipe width**:

![collision condition x](collision_condition_x.png)

The second condition checks whether the ball hits the upper or lower edge of the gap:

![collision condition y](collision_condition_y.png)

When both conditions are true, set **playing** to false to finish collision detection.

PS: Did you notice that calculations involving **ball y** often include **/ 10**? At the start, we multiply **ball y** by 10 to get smoother movement using integers. When checking collisions or drawing, remember to divide by 10 to convert it back to the real screen position.

* Define initial variable values:

![new game variables](new_game_variables.png)
### 7. Challenge

You now have the main parts of a complete interactive game:

Variables -> movement -> boundary checks -> collision detection -> scoring -> screens -> improvements

Try building the program in MicroBlocks. A working version can be completed by connecting the blocks above:

![complete program](complete_program.png)

[Reference code: Jumpy Ball Game](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27ED1%20Buttons%27%20%27TFT%27%0A%0Aspec%20%27r%27%20%27button%20pressed%27%20%27button%20pressed%27%0Ato%20%27button%20pressed%27%20%7B%0A%20%20return%20%28or%20%28or%20%28buttonA%29%20%28buttonB%29%29%20%28or%20%28%27OK%20button%27%29%20%28%27cancel%20button%27%29%29%29%0A%7D%0A%0Aspec%20%27%20%27%20%27check%20buttons%27%20%27check%20buttons%27%0Ato%20%27check%20buttons%27%20%7B%0A%20%20if%20%28and%20playing%20%28%27button%20pressed%27%29%29%20%7B%0A%20%20%20%20%27ball%20speed%27%20%3D%200%0A%20%20%20%20%27ball%20y%27%20%2B%3D%20%28%28v%20%27ball%20acceleration%27%29%20%2A%20-10%29%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27check%20collision%27%20%27check%20collision%27%0Ato%20%27check%20collision%27%20%7B%0A%20%20if%20%28and%20%28%28v%20%27pipe%20x%27%29%20%3C%3D%20%28v%20%27pipe%20width%27%29%29%20%28or%20%28%28%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20%2B%20%28v%20%27ball%20radius%27%29%29%20%3E%3D%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%20%28%28%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20-%20%28v%20%27ball%20radius%27%29%29%20%3C%3D%20%28v%20%27pipe%20height%27%29%29%29%29%20%7Bplaying%20%3D%20%28booleanConstant%20false%29%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27draw%20ball%27%20%27draw%20ball%27%0Ato%20%27draw%20ball%27%20%7B%0A%20%20%27%5Btft%3Acircle%5D%27%20%28v%20%27ball%20radius%27%29%20%28%28v%20%27previous%20ball%20y%27%29%20%2F%2010%29%20%28%28v%20%27ball%20radius%27%29%20%2B%201%29%200%20true%0A%20%20%27%5Btft%3Acircle%5D%27%20%28v%20%27ball%20radius%27%29%20%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20%28v%20%27ball%20radius%27%29%2065535%20true%0A%7D%0A%0Aspec%20%27%20%27%20%27draw%20pipes%27%20%27draw%20pipe%27%0Ato%20%27draw%20pipes%27%20%7B%0A%20%20%27%5Btft%3Arect%5D%27%20%28%28v%20%27pipe%20x%27%29%20%2B%20%28v%20%27pipe%20width%27%29%29%200%20%28v%20%27pipe%20width%27%29%20%28v%20%27pipe%20height%27%29%200%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28v%20%27pipe%20x%27%29%200%20%28v%20%27pipe%20width%27%29%20%28v%20%27pipe%20height%27%29%2065280%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28%28v%20%27pipe%20x%27%29%20%2B%20%28v%20%27pipe%20width%27%29%29%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%20%28v%20%27pipe%20width%27%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%200%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28v%20%27pipe%20x%27%29%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%20%28v%20%27pipe%20width%27%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%2065280%20true%0A%7D%0A%0Aspec%20%27%20%27%20%27game%20over%27%20%27game%20over%27%0Ato%20%27game%20over%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20write%20%27GAME%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%27OVER%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%28%27%5Bdata%3Ajoin%5D%27%20%27SCORE%3A%27%20score%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2080%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%7D%0A%0Aspec%20%27%20%27%20%27new%20game%27%20%27new%20game%27%0Ato%20%27new%20game%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20score%20%3D%200%0A%20%20comment%20%27ball%20y%20is%20multiplied%20by%2010%20for%20precision%27%0A%20%20%27ball%20y%27%20%3D%20%28%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%202%29%20%2A%2010%29%0A%20%20playing%20%3D%20%28booleanConstant%20true%29%0A%20%20%27ball%20acceleration%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2060%29%0A%20%20%27ball%20speed%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2060%29%0A%20%20%27ball%20radius%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%0A%20%20gap%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%204%29%20%28%28v%20%27ball%20radius%27%29%20%2A%207%29%29%0A%20%20%27pipe%20x%27%20%3D%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20-%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20%2F%205%29%29%0A%20%20%27pipe%20height%27%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%20%28%28v%20%27ball%20radius%27%29%20%2A%2010%29%29%0A%20%20%27pipe%20width%27%20%3D%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%0A%7D%0A%0Aspec%20%27%20%27%20%27step%20ball%27%20%27step%20ball%27%0Ato%20%27step%20ball%27%20%7B%0A%20%20%27ball%20speed%27%20%2B%3D%20%28v%20%27ball%20acceleration%27%29%0A%20%20if%20%28%28v%20%27ball%20y%27%29%20%3C%200%29%20%7B%0A%20%20%20%20%27ball%20y%27%20%3D%20%28%28v%20%27ball%20y%27%29%20%2A%20%28v%20%27ball%20speed%27%29%29%0A%20%20%7D%0A%20%20%27previous%20ball%20y%27%20%3D%20%28v%20%27ball%20y%27%29%0A%20%20%27ball%20y%27%20%2B%3D%20%28v%20%27ball%20speed%27%29%0A%20%20if%20%28%28v%20%27ball%20y%27%29%20%3E%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2A%2010%29%29%20%7B%0A%20%20%20%20playing%20%3D%20%28booleanConstant%20false%29%0A%20%20%7D%0A%20%20%27check%20buttons%27%0A%7D%0A%0Aspec%20%27%20%27%20%27step%20pipe%27%20%27step%20pipe%27%0Ato%20%27step%20pipe%27%20%7B%0A%20%20%27pipe%20x%27%20%2B%3D%20%28%28score%20%2F%20-10%29%20-%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20%2F%20120%29%29%0A%20%20if%20%28%28v%20%27pipe%20x%27%29%20%3C%20%28%28%28v%20%27pipe%20width%27%29%20%2A%20-1%29%20-%202%29%29%20%7B%0A%20%20%20%20%27pipe%20x%27%20%3D%20%28%27%5Btft%3AgetWidth%5D%27%29%0A%20%20%20%20%27pipe%20height%27%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%20%28%28v%20%27ball%20radius%27%29%20%2A%2010%29%29%0A%20%20%20%20score%20%2B%3D%201%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27welcome%20screen%27%20%27welcome%20screen%27%0Ato%20%27welcome%20screen%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20write%20%27JUMPY%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%20%28colorSwatch%20244%2036%20215%20255%29%0A%20%20write%20%27BALL%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%20%28colorSwatch%20244%2036%20215%20255%29%0A%20%20write%20%27Press%20OK%20or%20A%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%20120%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%204%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%27to%20play%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%20120%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%208%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%7D%0A%0Aspec%20%27%20%27%20%27write%27%20%27write%20_%20centered%20at%20scale%20_%20y%20_%20color%20_%27%20%27str%20auto%20auto%20color%27%20%27Hello%21%27%203%20%2710%27%0Ato%20write%20text%20scale%20y%20color%20%7B%0A%20%20local%20%27width%27%20%28%28%28scale%20%2A%206%29%20%2A%20%28size%20text%29%29%20-%20scale%29%0A%20%20%27%5Btft%3Atext%5D%27%20text%20%28%28%28%27%5Btft%3AgetWidth%5D%27%29%20-%20width%29%20%2F%202%29%20y%20color%20scale%20false%0A%7D%0A%0Ascript%20319%2074%20%7B%0AwhenStarted%0A%27welcome%20screen%27%0Aforever%20%7B%0A%20%20waitUntil%20%28%27button%20pressed%27%29%0A%20%20%27new%20game%27%0A%20%20repeatUntil%20%28not%20playing%29%20%7B%0A%20%20%20%20%27step%20ball%27%0A%20%20%20%20%27draw%20ball%27%0A%20%20%20%20%27step%20pipe%27%0A%20%20%20%20%27draw%20pipes%27%0A%20%20%20%20%27check%20collision%27%0A%20%20%20%20waitMillis%2010%0A%20%20%7D%0A%20%20%27game%20over%27%0A%20%20waitUntil%20%28not%20%28%27button%20pressed%27%29%29%0A%7D%0A%7D%0A%0A)
