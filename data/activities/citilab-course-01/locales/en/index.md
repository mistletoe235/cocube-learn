[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Introduction

#### What is MicroBlocks

* MicroBlocks is a free programming environment that allows working with different boards (Citilab ED1, micro:bit, M5Stack, ESP32 STEAMaker, etc.).
* The code is visualized on the computer but executed directly on the board. This means that it can be disconnected and continue to function without any additional operation.
* It is available both to install on [different systems](https://microblocks.fun/releases) (Windows, MacOS, Linux) and to use it [online](https://microblocks.fun/run/microblocks.html).

![The same block on different boards](cm01-01-bloc-pantalla.png)

#### Features ED1 (Front)

![ED1 front view](cm01-02-ED1-frontal.png)

#### Features ED1 (Back)

![ED1 back view](cm01-03-ED1-darrere.png)

#### Installation and connection with board

* Download the program directly from [here](https://microblocks.fun/download) or go to the web version (a recent version of Chrome or compatible is required).
* With some boards you need to install a driver in case the system does not detect the board automatically. In the case of the ED1, [this driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) is needed.
* Once the computer detects it, the program should automatically connect to the board. In the web version, the connection must be made manually by clicking on the corresponding icon.

| ![USB browser connection](cm01-04-connectar1.png) | ![USB connection indicator](cm01-04-connectar2.png) |
|--|--|

#### Blocks and libraries

Like many block programming environments, we have a palette of blocks divided into **categories**.

![Categories](cm01-05-categories.png)

We also have a number of **libraries** available, which are collections of blocks with a single purpose. Some of these are made up of other blocks.

![Libraries](cm01-06-llibreries.png)

By default, the program will load some libraries or others depending on the board connected.

![Default Libraries](cm01-07-defecte.png)

### 1. First steps

#### 1.1 - Let's start programming

* We will start by using the screen block of **LED Screen** by taking it and dragging it to the programming area.
* We will also take the starting block from the control category and connect it to the previous one.
* Click on the start button to see how it works.
* Unplug the board, turning it off and on to check that the program has indeed been saved on it.

![Let's start programming](cm01-08-comencem.png)

#### Challenge 1: Try making other drawings with the screen block!

![Challenge accepted](cm-challenge-en.png)

<details> <summary>Solution to Challenge 1</summary> <img src="cm01-s1.png" alt="Solution challenge 1"> </details>

#### 1.2 Iterations (I)

* If we want to repeat an action several times, for example making a drawing change to perform an animation, we can use the iteration blocks like “**forever**” or “**repeat \_ times**” ( among others) that we have in Control.

![forever and repeat blocks](cm01-09-iteracions.png)

* You will also need to wait a little between the blocks to give time to visualize the changes on the screen, otherwise it will happen too quickly and you won't be able to appreciate it.

![Wait block](cm01-10-espera.png)

#### Challenge 2: Try to make an animation that repeats continuously with the previous blocks

![Challenge accepted](cm-challenge-en.png)

<details> <summary>Solution to challenge 2</summary> <img src="cm01-s2.png" alt="Solution challenge 3"> </details>

#### 1.3 Iterations (II)

* There are other repetition blocks that are also very useful, such as the “**repeat until \_**” and the “**for every and in \_**”.
* In the first, the repetition is repeated until a condition occurs, for example if we press a button on the board.

![repeat until block](cm01-11-repeteix-fins.png)

* In the case of the second, the value of **i** will start at **1** and will grow at each iteration until reaching the established value (by default 10). It is also used to iterate through lists, as we will see later.

![for i in block](cm01-12-per-cada.png)

#### Challenge 3: Try to do an integer count from 5 to 0 with a repeat block.

![Challenge accepted](cm-challenge-en.png)

<details> <summary>Solution to challenge 3</summary> <img src="cm01-s3.png" alt="Solution challenge 3"> </details>

#### 1.4 - Buttons and conditionals

* For this board we have a library available to use the buttons. If it is not loaded automatically, we can add it by clicking on the + symbol (Add Library) and going to **Other > ED1 Buttons.ubl**.

  ![ED1 buttons library](cm01-13-llibreria-botons.png)
* Buttons return a **digital value (true or false)** represented as a **green** or red switch. This type of block can be inserted into any other block that has the slot represented in the same way.

![False](cm01-14-boto-ok0.png) ![True](cm01-15-boto-ok1.png)

<img title="Conditional blocks" src="cm01-16-blocs-codicionales.png" alt="" data-align="inline">

#### Challenge 4: Show a drawing on the screen and clear it using two buttons.

![Challenge](cm-challenge-en.png)

<details> <summary>Solution to challenge 4 (when)</summary> <img src="cm01-s4a.png" title="Solution challenge 4" alt="" > </details>

<details> <summary>Solution to challenge 4 (forever) </summary> <img src="cm01-s4b.png" title="Solution challenge 4" alt="" > </details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [Next activity ➡️](../citilab-course-02-en) |
|--|

[[/fact]]
