[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Shutter Controlled with Light

#### Defining your own blocks

- Once the control with the buttons is done, it can be changed to any other type of sensor,
such as a light sensor, a remote, a control via the Internet or a mobile application.

- Adding an extra control that is compatible with button control requires complicating the program structure.
That's why they recommend defining their own blocks to help simplify the code before starting this process.

![Custom blocks](cm11-01-blocs-propis1.png)

![Shutter with buttons](cm11-02-base.png)

#### Control with The sensor reading must be done at intervals

- In this case we will use the **light level** block that we will find in the **Sensors** category.

- The reading of the sensor must be done with large time intervals, to give time to fully raise and lower the blind and also avoid minimal changes in lighting.

- It might be interesting to define a block to wait minutes instead of milliseconds.

![Minutes Block](cm11-03-bloc-minuts.png)

##### Challenge 1: Complete the shutter project with keyboard control and light sensor. The shutter stops if either button is pressed.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm11-s1.png" title="Solution challenge 1">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-10-en) | [Next activity ➡️](../citilab-course-12-en) |
|--|--|

[[/fact]]
