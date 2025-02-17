[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Windshield Wiper

#### Stepper motors

- Stepper motors are a type of motor that rotate by small steps in one direction or the other.

- Stepper motors are very precise and versatile, since they can move by precise angles as well as full-turns.
For example, stepper motors are used in to move the print head in plotters and 3D printers.

- A typical model is the 28BYJ-48. It works at 5 Volts and allows you to take 512 steps per lap.

![Stepper Motors](cm13-01-stepper_motors.png)

![Steppers Info](cm13-02-stepper_motors_info.png)

#### Operation of stepper motors

- These motors have several windings that are activated to achieve the rotary movement.

![Stepper motors](cm13-03-coils.png)

- For each winding there is a specific cable to activate it.

- To use them you need a specific "driver" circuit that applies the appropriate voltages.

- The Citilab ED1 board incorporates 2 outputs prepared for this type of motor.

| ![ED1 Stepmotor connections](cm13-05-stepper_connection.png) | ![Stepmotor info](cm13-04-circuit_scheme.png) |
| ------------------------------------------------------------- | ------------------------------------------------------- |

#### "ED1 Stepper Motor" Library

- To work with the 28BYJ-48 stepper motors you need to use the ED1 Stepper Motor library found in the Others category.

![Stepper motor library](cm13-06-stepper_library.png)

- There are blocks to work with the 2 motors independently and a specific one to move the two motors at the same time.

![Stepper motor blocks](cm13-07-stepper_blocks.png)

##### Challenge 1: Make a wiper with the speed controlled by a potentiometer.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm13-s1.png" title="Solution challenge 1">
</details>


[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-12-en) | [Next activity ➡️](../citilab-course-14-en) |
|--|--|

[[/fact]]
