[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Controlling the Robot with Infrared

#### Infrared communication

- In this unit we will see how to control the robot wirelessly using infrared technology.

- This technology is based on sending infrared waves between two LEDs (one emitter and one receiver).

- As the ED1 board has an infrared receiver built in, we can use any television remote control or a generic one to send commands to it.


| ![TV Remote Controls](cm16-01-tv_remotes.png) | ![Remote conrols](cm16-02-electronics_remote.png) |
| -------------------------------------------- | ------------------------------------------------------------ |

#### Infrared library

- In order to be able to use the infrared receiver on the board, you need to import the **IR Remote** library under the **Other** folder.

![Infrared library](cm16-03-ir_remote_library.png)

- Although there is a block to initialize the receiver in our case it is not needed, since the block to receive codes calculates it automatically. It would only be necessary if you have another board and an external receiver.

- To receive codes you just need to use the corresponding block and press a button on the remote to test if it works.

![Block to receive code](cm16-04-receive_ir_code.png)

##### Challenge 1: Make a program that moves the robot with the remote.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm16-s1.png" title="Solution challenge 1">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-15-en) | [Next activity ➡️](../citilab-course-17-en) |
|--|--|

[[/fact]]
