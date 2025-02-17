[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Theremin

#### Theremin

- The [Theremin](https://en.wikipedia.org/wiki/Theremin) is an electronic musical instrument that is played with the hands but without contact.

- The tone of the instrument varies depending on the distance to the hand. Use the other hand to adjust the volume.

[![Sheldon's Theremin](https://img.youtube.com/vi/_YYABE0R3uA/0.jpg)](https://www.youtube.com/watch?v=_YYABE0R3uA)

#### Theremin without volume control

- From version 2.2 of the ED1 board it can be connected directly to the Groove I2C connector.

![I2C connection with Groove connector](cm09-01-i2c-groove.jpg)

- We will use the touch block **play frequency _ for _**, adapting the distance values ​​(0-500) to the frequency values ​​(100-5000).

![Simple theremin with volume control](cm09-02-theremin1.png)

- We will notice that the sound is not continuous, as the sensor takes time to read. To solve it, you need to make two separate programs, one that does the reading and another that reproduces the sound.

##### Challenge 1: Make a Theremin, without volume control, with the distance sensor.

![Challege](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm09-s1.png" title="Solution challenge 1">
</details>

#### Theremin with volume control

- To adjust the volume of the generated tone we can use the **System -> sound Prims** library.

- With the **DAC write _** block we can generate a wave of the desired frequency and with depending on the values ​​the volume changes.

- We can connect a potentiometer to analog pin 1 to control the volume.

![Theremin with volume control](cm09-03-theremin2.png)

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-08-en) | [Next activity ➡️](../citilab-course-10-en) |
|--|--|

[[/fact]]
