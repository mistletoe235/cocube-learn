### Follow the Car Ahead

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower_2.mp4" type="video/mp4">
</video>

In a dragon dance, the dragon head moves first, and the body sections follow one by one. In nature, when an inchworm crawls forward, the back half of its body keeps catching up with the front half. This project creates a similar leader-follower formation: the CoCube in front is the "leader," and the CoCube behind it automatically follows based on the leader's position.

This program uses ESP-NOW to send position messages between robots. Each robot continuously broadcasts its own position. If a robot finds that it should follow the robot in front of it, it reads that robot's position and moves toward it when the distance is too large.

#### 1. Demo

Prepare two or more CoCubes and download the same [leader_follower online program][leader-follower-program] to each robot. This project uses CoCube's map positioning function, so place the robots on a map that supports positioning, such as the soccer map, maze map, transparent map, or another custom map.

After the program starts, each robot displays its own ID on the screen:

- ID `1`: the leader robot.
- ID `2`: follows robot `1`.
- ID `3`: follows robot `2`.

Press A to decrease the ID by 1, and press B to increase the ID by 1. It is recommended to start numbering from `1`. If the ID is accidentally set to `0`, press B to change it back. After setting the IDs, place the robots on the map. Move robot `1` by hand, and robot `2` will try to follow it. If there is a robot `3`, it will follow robot `2`, forming a long robot line.

![Complete program](allScripts_en.png)

A classroom demo can follow this order:

1. Start with two robots, set them to `1` and `2`, move robot `1` by hand on the positioning map, and observe robot `2` following it.
2. Change the distance between the two robots and observe when the follower starts and stops.
3. Add a third robot, set its ID to `3`, and observe whether the formation follows section by section like a dragon lantern.

#### 2. Core idea of the program

The key idea is to give each robot an `ID`.

Each robot continuously sends its position through ESP-NOW:

- Message content: X coordinate, Y coordinate, and direction.
- Message number: its own `ID`.

When receiving a message, the robot first checks whether the message comes from the robot directly in front:

If my `ID` equals the received `ID + 1`, the message comes from the robot directly in front.

For example:

- Robot `2` only follows robot `1`.
- Robot `3` only follows robot `2`.
- Robot `4` only follows robot `3`.

In this way, all robots can run the same program. By setting different IDs, they form a leader-follower formation.

#### 3. ESP-NOW communication setup

When the program starts, it does several things:

1. Set `ID` to `1`.
2. Set `D_limit` to `60`.
3. Set the ESP-NOW channel to `13` and the group to `255`.
4. Broadcast `send_pos`.
5. Display the current `ID`.

`D_limit` is the following-distance threshold. When the distance between the front robot and the follower is greater than or equal to `60`, the follower starts moving. When the distance is less than `60`, the follower stops.

The `send_pos` script sends the current position every `50` milliseconds:

1. Send the position and ID as an ESP-NOW pair message.
2. Store the X coordinate, Y coordinate, and direction in the string part.
3. Store `ID` in the number part.
4. Wait `50` milliseconds and send again.

Using ESP-NOW pair messages has two advantages here:

- The string part can store position data.
- The number part can store the robot ID.

#### 4. How to decide whether to follow

When a robot receives an ESP-NOW message, it reads the sender's ID `id`.

If my `ID` equals `id + 1`, the program will:

1. Read the position of the front robot.
2. Calculate the distance `D` between the two robots.
3. Broadcast `go!`.

The program splits the position string from the front robot into three values:

| Variable | Meaning |
| --- | --- |
| `robot_x` | Front robot X coordinate |
| `robot_y` | Front robot Y coordinate |
| `robot_theta` | Front robot direction |

This program mainly uses `robot_x` and `robot_y`, which are the position of the front robot. It then calculates the distance using the coordinate difference:

- `dx` = front robot X coordinate - this robot's X coordinate
- `dy` = front robot Y coordinate - this robot's Y coordinate
- `D = sqrt(dx * dx + dy * dy)`

If `D` is too large, the follower is falling behind. If `D` is not large, the follower is already close enough.

#### 5. Following action

After receiving the `go!` broadcast, the robot decides what to do based on the distance:

- If `D >= D_limit`, run `move to target robot_x robot_y 50`.
- Otherwise, run `CoCube wheels break`.

In other words, the follower does not keep moving all the time. It only moves toward the current position of the front robot when the distance is greater than the threshold.

The program includes an advanced block called **track target**. You need to turn on **Advanced Mode** before it appears in the CoCube library. This block makes the robot first point toward the target, then keep correcting its direction while moving:

1. Calculate the distance to the target.
2. If the distance is greater than `3`, point toward the target.
3. Until the distance is less than `3`, keep recalculating the distance and angle error.
4. Adjust the left and right wheel speeds according to the angle error.

This prevents the follower from rushing in a straight line randomly. Instead, it keeps correcting the left and right wheel speeds according to the direction of the target point. Compared with the **move to target point** function in the CoCube library, **track target** is non-blocking. You can continuously send new coordinates to the robot, and it will always move toward the latest coordinate point.

#### 6. Extension challenges

1. Dragon lantern formation

   Use 4 or more CoCubes and set their IDs to `1, 2, 3, 4`. Observe whether they can form a continuous following line.

2. Group competition

   Set different ESP-NOW groups or channels for different groups so each robot team only follows its own group.

3. Add autonomous movement to robot `1`, such as moving along a circular path, and see whether the other robots can keep up.

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower.mp4" type="video/mp4">
</video>

[leader-follower-program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Misc%20Primitives%27%20%27Tone%27%0A%0Ascript%20800%2078%20%7B%0AwhenButtonPressed%20%27A%27%0Aif%20%28ID%20%3E%3D%201%29%20%7B%0A%20%20ID%20%2B%3D%20-1%0A%20%20displayCharacter%20%28ID%20%25%2010%29%0A%20%20%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%7D%0A%0Ascript%201124%2080%20%7B%0AwhenButtonPressed%20%27B%27%0AID%20%2B%3D%201%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%0Ascript%20515%2088%20%7B%0AwhenStarted%0AID%20%3D%201%0AD_limit%20%3D%2060%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0A%27%5Bnet%3AESPNowSetGroup%5D%27%20255%0AsendBroadcast%20%27send_pos%27%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%7D%0A%0Ascript%20514%20338%20%7B%0AwhenCondition%20%28espNow_receive_pair%29%0Alocal%20%27id%27%20%28espNow_last_number%29%0Aif%20%28ID%20%3D%3D%20%28id%20%2B%201%29%29%20%7B%0A%20%20local%20%27pos%27%20%28%27%5Bdata%3Asplit%5D%27%20%28espNow_last_string%29%20%27%2C%27%29%0A%20%20robot_x%20%3D%20%28at%201%20pos%29%0A%20%20robot_y%20%3D%20%28at%202%20pos%29%0A%20%20local%20%27robot_theta%27%20%28at%203%20pos%29%0A%20%20local%20%27dx%27%20%28robot_x%20-%20%28%27CoCube%20position_X%27%29%29%0A%20%20local%20%27dy%27%20%28robot_y%20-%20%28%27CoCube%20position_Y%27%29%29%0A%20%20D%20%3D%20%28%27%5Bmisc%3Asqrt%5D%27%20%28%28dx%20%2A%20dx%29%20%2B%20%28dy%20%2A%20dy%29%29%29%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20979%20354%20%7B%0AwhenBroadcastReceived%20%27send_pos%27%0Aforever%20%7B%0A%20%20espNow_send_pair%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%20ID%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20980%20606%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aif%20%28D%20%3E%3D%20D_limit%29%20%7B%0A%20%20%27CoCube%20track%20target%27%20robot_x%20robot_y%20%2740%27%0A%7D%20else%20%7B%0A%20%20%27CoCube%20wheels%20break%27%0A%7D%0A%7D%0A%0A
