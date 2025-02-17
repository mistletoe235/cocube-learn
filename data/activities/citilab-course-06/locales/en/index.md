[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Playing with NeoPixels

#### Connection of the Neopixel strip

- The NeoPixels are a strip of RGB (colored) LEDs that have a controller inside each one. This allows them to be controlled individually or collectively, achieving different visual effects.

- We will work with a strip of 10 NeoPíxel LEDs with a connector prepared for the ED1.

![Strip of NeoPixels](cm06-01-neopixel.png)

- As in the case of the standard LED that we used in the previous practices, we will connect it to a digital pin following the same color code of the cables.

- Several strips can be connected, up to a maximum of 40 LEDs fully illuminated in white (10mA per LED).

#### Initialization

- To use any NeoPixels strip (either integrated or external) we will need the **NeoPixels** library.

![NeoPixel Library](cm06-02-llibreria-neopixel.png)

- Before starting to program with it, we must indicate the pin where it is connected with the block **attach _ LED NeoPixel strip to pin _**.

- To check that it works, we can use the **set all NeoPixels color _** block.

![NeoPixel Library](cm06-03-blocs-neopixels-basics.png)

#### Programming the LEDs

- In addition to the above, we have different blocks available to work with the LEDs:

  - **set NeoPixel _ color _**: Turn on an LED by specifying the color.
  - **rotate NeoPixels by _**: rotate the color positions of all LEDs.
  - **color r _ g _ b _ (0-255)**: Get a color by specifying RGB (Red-Green-Blue) values.
  - **random color**: get a random color.

![NeoPixel Library](cm06-04-blocs-neopixels-mes.png)

| ![Traffic-light example](cm06-05-semafor-blocs.png) | ![traffic-light example result](cm06-06-semafor-real.png) |
| ----------------------------------------------------- | ------------------------------------------------------------- |

#### Lighting effects

- With the help of the loops we can make different lighting effects.

- Using the **for _ in _** block of the **control** category, we can “loop” the strip of LEDs using the **i** variable to point to the LED that needs to be lit at any given time.

![NeoPixels example 1](cm06-07-neopixels-efecte1.png)

- To turn off an LED, it is enough to assign it the color black.

- You must remember to use the **wait _ milliseconds** block to be able to visualize it properly!

##### Challenge 1: Try to reverse the order in which the LEDs turn off in the previous example

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm06-s1.png" title="Solution challenge 1">
</details>

#### Turn on the LEDs

- We can try to manipulate the LEDs we want to illuminate with a potentiometer. For this it is necessary to map the value we obtain from the potentiometer to the number of LEDs to turn on.

- In our case we will have to use a factor of 10, since it is the number of LEDs that our NeoPíxels strip has.

![LED bar 1](cm06-08-barra1.png)

- It is recommended to create a variable to save the LED number to better understand the program.

#### Turn off the LEDs

- We will see that the LEDs, once lit, do not turn off, unless we run the program again.

- If we want the LEDs to turn off progressively in the same way as they turn on, it will be necessary to turn off the LEDs that are "above" what we control with the potentiometer.

- In other words, it will be necessary to go through the strip of LEDs with a **for _ in _** and check with an **if _ else** if they need to be turned on or off.

![LED bar 2](cm06-09-barra2.png)

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-05-en) | [Next activity ➡️](../citilab-course-07-en) |
|--|--|

[[/fact]]
