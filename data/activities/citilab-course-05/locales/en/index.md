[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Playing with LEDs

#### LEDs

- An LED (Light Emitting Diode) is a device that emits light when an electric current passes through.

- ![LED](cm05-01-led.png)

- There are several types of LEDs, with different sizes and colors. There are even some that can light up with any color (RGB).

- There are also RGB LED strips that are widely used for home automation and lighting in public places.

  | ![Various LEDs](cm05-02-led-colors.png) | ![RGB LED](cm05-03-led-rgb.png) |
  | ------------------------------------------------ | --------------------------------------- |

#### Connecting the LED

- Connecting the LED to the board is done in a similar way to the potentiometer, but in this case we will use the digital pins instead of the analog ones.

![LED Connection](cm05-05-led-connexio.png)

- The colors of the cables and pins must be respected, otherwise the LED will not light up.

- To test how it turns on and off, we will use the block **set digital pin _ to _**, while changing the state of the logic switch.

![set digital pin block](cm05-06-bloc-digital.png)

##### Challenge 1: try to create a program that makes the blinking effect (blink) with the LED

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm05-s1.png" title="Solution challenge 1">
</details>

##### Challenge 2: Make the blinking effect faster or slower depending on the value read from the potentiometer

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 2</summary>
    <img src="cm05-s2.png" title="Solution challenge 2">
</details>

#### Brightness control

- MicroBlocks allows analog values ​​to be used on digital pins, so we can manipulate the level of light emitted by the LED.

- For this we will use the block **set pin _ to _** that we will find in the Pins category.

![set analog pin block](cm05-07-bloc-analogic.png)

- As the range of values ​​is the same for the inputs as for the analog outputs, we can insert the analog reading block directly inside the previous one.

![set analog pin block](cm05-08-exemple-analogic.png)

##### Challenge 3: Make the LED turn on gradually, like a beacon or a visual alarm.

> Hint: Use a variable to control the **brightness**.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 3</summary>
    <img src="cm05-s3.png" title="Solution challenge 3">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-04-en) | [Next activity ➡️](../citilab-course-06-en) |
|--|--|

[[/fact]]
