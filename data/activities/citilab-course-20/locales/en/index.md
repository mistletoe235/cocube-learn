[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Connecting MicroBlocks to Snap!

#### Introduction to Snap!

* In this session we will see how we can create a video game with Snap!, a programming environment similar to Scratch that allows us to develop more complex projects.
* The idea will be to control it through the ED1 board, to which we will load a program called **Signada**, in order to be able to interact with the video game created with Snap!
* Then to Snap! we will load a library with the same name that will allow us to connect to the board and interact with it.

![Game created with Snap!](cm20-01-joc-snap.png)

#### Movement of the ship

* We have a template available with the objects already created at [this link](http://extensions.snap.berkeley.edu/snap/snap.html#present:Username=edutec&ProjectName=Asteroids%20-%20Template).
* We will start by programming the movement of the ship. Since we only want to move it from left to right, we just need to modify the x component of its position using the \**set x to \_* block in the Movement category.

![Block change x by \_](cm20-02-bloc-assigna.png)

* To test it for now we can use the mouse to move it, we need the **mouse x** block that is in the **Sensors** category.

![Mouse x block](cm20-03-bloc-ratolix.png)

##### Challenge 1: Make the ship always follow the mouse x when starting the game

![Challenge](cm-challenge-en.png)

<details> <summary>Solution to challenge 1</summary> <img src="cm20-s1.png" title="Solution challenge 1"> </details>

#### Shoot Laser (I)

* To fire the laser we will create copies or "clones" of the Laser object. To do this we need to look for the **create a clone of \_** block that we have in **Control**.
* Instead of "myself" we must select the **Laser** object.

  | ![Block create a clone of \_](cm20-04-bloc-clon.png) | ![Create a clone of Laser](cm20-05-bloc-clon-laser.png) |
  |--|--|
* We can do the shooting action when we click the mouse, so we will have to look for the block corresponding to Sensors and use a conditional to execute the action.

![Laser Clone](cm20-06-laser1.png)

#### Shoot Laser (II)

* To create copies of the Laser we will first select it and look for the block **when I start as a clone.** You must select the laser object to apply this code.

![Bloc when I start as a clone](cm20-07-bloc-copia-comenci.png)

\-Once the copy is created, we will make it go to the ship and also point in the same direction as it.

![Go to Starship Object](cm20-08-laser2.png)

* Finally, we will make it move until it touches the edge, where we will also delete it.

![Rise until touching the edge](cm20-09-laser3.png)

##### Challenge 2: Make the ship always follow the mouse x when starting the game

![Challenge](cm-challenge-en.png)

<details> <summary>Solution to challenge 2</summary> <img src="cm20-s2.png" title="Solution challenge 2"> </details>

#### Asteroid movement (I)

* With the asteroids we will do the same, we will create copies that fall from top to bottom.
* To do this, we will run the create clone block every 2 seconds (for example) from the start.

![Create asteroid clones every 2 seconds](cm20-10-asteroid1.png)

* Once the copy is created, we'll make it go to a point on the top edge with a random x. For this we will need the pick random \_ to \_ block that we have in Operators.

![Random Asteroid Position](cm20-11-asteroid2.png)

#### Asteroid movement (II)

* Once the copy of the asteroid is located, we will make it move down by subtracting 1 (or rather, adding -1) to its y using the **change y by \_**.
* In addition to falling, we can also make it rotate using the **rotate \_ degrees** block.
* To make the copy deleted when the Laser is touched **or** or when its **y-position** is lower than -200, you need to use a conditional with the **\_ or\_** block. ![Asteroid Motion](cm20-12-asteroid3.png)

##### Challenge 3: Make the Asteroid object hide at startup and only show when the copy is created

![Challenge](cm-challenge-en.png)

<details> <summary>Solution to challenge 3</summary> <img src="cm20-s3.png" title="Solution challenge 3"> </details>

#### End of game (I)

* The idea is that the game ends once the ship collides with an asteroid.
* Although this check can be done on either one object or the other, in this example we will do it on the ship.

![Endgame, send a message and hide](cm20-13-final1.png)

* The only thing that needs to be done is that, in case of touching the Asteroid, send a "game over" message and also hide the ship (as if it had been destroyed).
* Don't forget to make it show at the start, otherwise **it will stay hidden**!

#### End of game (II)

* When the message is received we will make the Game Over object appear and stop the program using the **stop all** block.
* In addition, it will be necessary to hide the Game Over object at the beginning, since otherwise it will remain visible the whole time while we play!

![Game Over](cm20-14-final2.png)

#### Signada MicroBlocks

* To be able to control the ship remotely with the ED1 board, it will be necessary to load a program on it using MicroBlocks.
* This program is located in the **Network** folder and is called **Signada (network remote control).**

![Signada MicroBlocks 1](cm20-15-signada1.png)

![Signada MicroBlocks 2](cm20-16-signada2.png)

![Signada MicroBlocks 3](cm20-17-signada3.png)

* Once opened, it is necessary to enter the credentials of the WiFi network in the indicated block.

![Configure WIFI](cm20-18-configurar-wifi.png)

#### Signada (Snap!)

* On Snap! you will need to load the **Signada (network remote control)** library.

![Signada Snap! 1](cm20-19-snap-signada1.png)

![Signada Snap! 2](cm20-20-snap-signada2.png)

* Once loaded, we will see that a few blocks are added in some categories, for example in **Movement, Sound, Pen, Sensors and Variables**.

![Signada Snap! 3](cm20-21-snap-signada3.png)

* In our case we are mainly interested in the blocks of the last two categories.

![Signada Snap! 4](cm20-22-snap-signada4.png)

#### Connection with board

To connect the Snap! with the ED1 it will be necessary to use the block connect to \_ using the IP shown on the screen.

![Connection with board 1](cm20-23-connexio1.png)

![Connection with board 2](cm20-24-connexio2.png)

If the connection is successful, the screen will change to show the text "Connected.".

![Connection with board 3](cm20-25-connexio3.png)

We can also check the connection status in Snap! through the connected block.

![Connection with board 4](cm20-26-connexio4.png)

* Once connected we can make the appropriate changes to use the board to control the ship.
* For example, instead of the x-position of the mouse, we will use the tilt in the x-axis of the plate to move the ship from one side to the other.
* And to shoot the laser we can use either the OK button or the X.

##### Final Challenge: Complete the game!

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-19-en) |
|--|

[[/fact]]
