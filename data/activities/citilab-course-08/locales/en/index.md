[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Parking Alarm

#### Distance sensor VL53L0X

- In this example we will work with a distance sensor, with a measurement range between 2 and 50 cm.

- This is a sensor that measures the time it takes for a laser to bounce off the surface to be measured (Time of Flight TOF).

- It is a digital sensor, and it is connected via the I²C serial bus. The I²C connection needs 4 cables, two for power and two for sending and receiving signals.

![VL53L0X distance sensor](cm08-01-sensor_front.png)

#### Distance sensor connection (I²C)

- The sensor has a *Groove* connector and an adapter is needed for the ED1.

- Black corresponds to GND (Ground).

- The red corresponds to the 5V (it is important not to cross the GND and the 5V as the sensor or the board can be damaged.

- The other connections are represented with white and yellow colors. In the case of the adapters indicated, the white goes to the SDA connector of the ED1 and the yellow to the SDL connector (they are crossed in relation to the colors drawn on the sensor).

| ![Grove Connector](cm08-02-sensor_back.png) | ![ED1 I²C Pins](cm08-03-ed1.png)               |
| ---------------------------------------------------- | ------------------------------------------------------ |
| ![Dupont-Grove Cables](cm08-04-wires.png)   | ![Connection with ED1](cm08-05-connection.png) |

#### VL53L0X library

- The library for this sensor is in the Sensing category with the name VL53L0X.

![VL53L0X library](cm08-06-library.png)

- Just add 2 blocks one that returns the distance in millimeters and another that tells us if the sensor is connected.

![VL53L0X blocks](cm08-07-blocks.png)

##### Challenge 1: Make a program that displays the distance in mm per screen

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm08-s1.png" title="Solution challenge 1">
</details>

#### Tone Library

- MicroBlocks incorporates a library for boards that support the generation of sounds. This is the **Tone** library. In the case of the ED1, it is loaded automatically.

![Tone library blocks](cm08-08-tone_blocks.png)

- The basic block is **play frequency _ for _ ms** which plays for the specified time, a tone at the specified frequency.

![Tone frequency block](cm08-s2.png)

- The values ​​that the ED1 mini speaker can reproduce are between **100 and 10,000 Hz**. The maximums perceptible by the human ear are between **20-20,000 Hz**.

#### Play notes with the ED1

- The block **play the note _ in the octave _ for _ ms** allows you to play musical notes in both Anglo-Saxon and European notation.

| ![Anglo-saxon notation](cm08-s3a.png) | ![European notation](cm08-s3b.png) |
| -------------------------------------------- | ---------------------------------------- |

![Notes Notation](cm08-09-notes_notation.png)

- In the **Music** folder of the examples, you can find several projects that play melodies.

- The **Ringtone** library allows you to play melodies in RTTTL format from Nokia. Examples [1](https://www.vex.net/~lawrence/ringtones.html).

#### Parking sensor

- The reverse parking sensors measure the distance and generate visual and acoustic signals to warn of the proximity of an obstacle.

![Traffic Light](cm08-10-semaphor.png)

- Our sensor does not detect very short or very long distances (2-100 cm) and therefore we will have to take this into account in our code.

- We can define multiple conditions with **_ and _** and **_ or _** operators.

![Distance blocks](cm08-s4.png)

##### Challenge 2: Make a visual and audible parking sensor

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 2</summary>
    <img src="cm08-s5.png" title="Solution challenge 2">

</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-07-en) | [Next activity ➡️](../citilab-course-09-en) |
|--|--|

[[/fact]]
