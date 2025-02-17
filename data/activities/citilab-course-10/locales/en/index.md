[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Shutter Controlled with Buttons

#### DC motors

- DC motors use direct current. These motors are also known as **CC** motors, from **c**orrent **c**ontinu, which in English is **d**irect **c**urrent, from where the English motors **DC**.

- Motors that use alternating current, in Catalan, are also called **CA** motors and in English **AC** motors, from the English **a**lternating **c**urrent).

![DC Motors](cm10-01-dc_motors.png)

![AC Motors](cm10-02-ac_motors.png)

#### Servo motors

- A servomotor is a direct current (DC) motor whose behavior can be controlled thanks to a small electronic board and a set of gears.

- Although there are different types of servomotors, the way to control them is the same: by means of an electric pulse with a specific duration.

- Depending on the duration of this pulse, the servomotor will turn to a certain angle (standard) or it will turn continuously to one side or the other (continuous rotation).

![Servo motor](cm10-03-servomotor.png)

![Parts of the servo motor](cm10-04-servomotor_parts.png)

#### Angular servomotors

- These servomotors consume about 100-200 mA and can reach 500mA at the time of start-up or change of direction. You must avoid giving commands to the engines while they are turning.

- The servomotor can be connected to any of the digital outputs, although D1 and D2 give 3.3V and therefore the servomotor works with less power, while D3 and D4 work at 5V. The D4 output is connected internally to the speaker and small noises may occur.

- **Important! If using outputs 3 and 4 on an ED1 prior to version 2.3 it is recommended to do so with battery and the switch in "ON"**.

![Connection with ED1](cm10-05-connection_ed1.png)

![consumption](cm10-06-consumption.png)

#### Angular servomotors

- Standard or angular servomotors move a specific angle between 2 values. The most typical is SG90 which moves between 0 and 180º, taking about 150ms to make this angle. This engine does not spin!

- It comes with a series of accessories that allow you to connect with gears or pull other elements.

- The angular servomotors we will use are the SG90, a small and very affordable model.

![angular servomotor](cm10-07-servomotor_angle.png)

![Animatronic eye](cm10-08-animatronic_eye.png)

#### Angle control by pulse width

- To set the angle, a pulse is sent every 20 ms. According to the duration of the pulse, the servo changes the angle. It is a pulse width modulation (**PWM** in English).

- If the duration is approximately 1ms the servo is placed at an angle of 0º and if it is 2ms at 180º.

- Once the angle is set, the servomotor does not move even if we send more pulses.

![Pulse widths](cm10-09-pulse_widths.png)

##### Challenge 1: Make a program that makes the servo move from one angle to another, alternately

![Challege](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm10-s1.png" title="Solution challenge 1">
</details>

#### Servo library

- To work with servomotors it is more practical to use the **Servo** library.

- The block **set servo _ to _ degrees (-90 to 90)** is used with the angle motors, whereas the **rotate the servo _ to speed _ (-100 to 100) ** used with continuous rotation motors.

<img src="cm10-10-servo_library.png" title="Servos Library" width="500" alt="" data-align="center">

<img title="Servo blocks" src="cm10-s2.png" alt="" width="400" data-align="center">

##### Challenge 2: Control a continuous rotation motor with the up and down button

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 2</summary>
    <img src="cm10-s3.png" title="Solution challenge 1">
</details>

#### Home automation

- Application of different technologies to improve housing, especially to improve energy efficiency.

- It can also be applied to the improvement of schools, public buildings or even cities.

- As an example, we will make a shutter that is controlled by the level of light and a lighting system that can be set in motion with the snap of a hand.

![home automation](cm10-13-domotics.png)

#### Shutter simulation

- We will use a simple drawing on the screen to simulate a shutter, whose height will vary according to the value of the **y** variable.

- In a real case we should use limit switches that indicate that the shutter has reached the upper and lower limits. Here we will do this control by program using the value of the variable (0 = upper, 128 = lower).

![Shutter program](cm10-s4.png)

##### Challenge 3: Simulate a shutter (with screen and servo motor) controlled by the up and down buttons.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 3</summary>
    <img src="cm10-s5.png" title="Solution challenge 1">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-09-en) | [Next activity ➡️](../citilab-course-11-en) |
|--|--|

[[/fact]]
