[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Virtual Dial

#### Potentiometer

- In this example we will use the potentiometer, a component that allows us to regulate the voltage level that can be read on an analog input pin.

![Potentiometer](cm04-01-potenciometre1.png)

- It has three terminals: one for the power input (5V), another for ground (GND) and the last one for the output voltage.

![internal potentiometer](cm04-02-potenciometre2.png)

- It works as a voltage divider: the output will give a voltage value depending on the position of the dial (the closer to the power pin, the higher the value).

#### Connection and reading

- To connect it to the board you will need to use one of the analog pins.

- It must be connected following the same color scheme, i.e. red with red, black with black, etc.

  ![ED1 analog connection](cm04-03-ed1-a1.png)

- Once connected, we can find out its value using the **read analog pin _** block, while specifying the pin number where we have connected it.

![Analog reading block](cm04-04-lectura-analogica.png)

##### Challenge 1: Make a small program that displays the value read from the potentiometer

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm04-05-llibreria-tft.png" title="Imported TFT library">
      <img src="cm04-s1.png" title="Solution challenge 1">
</details>

#### Turtle Library

- In addition to the numerical value, we will try to represent the movement of the potentiometer on the screen with a "virtual dial".

- For this we will use the **Turtle** library, which allows you to draw on the screen in a way similar to the language  [LOGO](https://en.wikipedia.org/wiki/Logo_(programming_language) and of course, as in Scratch).

![Turtle library](cm04-06-llibreria-tortuga.png)

#### Draw a line

- To be able to draw a line, the following blocks should be used:
  - **home/go to x 0 y 0**: to start from the center of the screen.
  - **set pen color to**: select a color (default is black).
  - **pen down**.
  - **point in direction _**: point in the desired direction before drawing the line. (return home includes points in direction 0).
  - **move _**: number of pixels to move.

![Draw a line](cm04-07-linia.png) ![Line on screen](cm04-08-linia-real.png)

##### Challenge 2: Find the formula to go from the analog input value range (0-1023) to the direction range (0-360º)

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
      <img src="cm04-s2.png" title="Solution challenge 1">
</details>

- Once we have the formula we can use it to vary the direction of the line according to the position of the potentiometer reading.

- The blocks for fixing the pencil color and lowering it do not need to be inside the loop, they only need to be executed once before starting to draw.

- We will take advantage of the code we had previously to display the value per screen and move the dial at the same time.

![Virtual Dial](cm04-09-dial-virtual.png)

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-03-en) | [Next activity ➡️](../citilab-course-05-en) |
|--|--|

[[/fact]]
