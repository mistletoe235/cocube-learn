### ESP-NOW Firefly Synchronization

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="fireflies.mp4" type="video/mp4">
</video>

In a forest at night, many fireflies may start by flashing at different times. After a while, they can gradually form a rhythm: first a small group flashes together, and later a large group flashes almost at the same time.

This project uses ESP-NOW to create an "electronic firefly" experiment. Each board acts as one firefly: it flashes according to its own rhythm, and when it hears a nearby partner flash, it nudges its own rhythm forward a little. After running for a while, several boards will gradually synchronize their flashes.

Reference:

- [Nicky Case: Fireflies](https://ncase.me/fireflies/)

#### 1. Demo

Prepare 3 or more MicroBlocks boards that support ESP-NOW, and download the same program [`firefly.ubp`](firefly.ubp) to each board.

After the program starts, each board starts its own internal clock, flashes at regular intervals, and receives flash messages from other boards. At first, their flash times may be different. After observing for a while, you will see the flashes gradually move closer together and finally become more synchronized.

![Complete program](allScripts_en.png)

[Open the complete program in MicroBlocks](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20400%2078%20%7B%0AwhenStarted%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0Atick%20%3D%20100%0Aclock%20%3D%200%0Acircle%20%3D%2012%0AsendBroadcast%20%27heartbeat%27%0AsendBroadcast%20%27listen%27%0A%7D%0A%0Ascript%201028%2078%20%7B%0AwhenBroadcastReceived%20%27flash%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2033554431%0A%27play%20tone%27%20%27nt%3Bc%27%201%20tick%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20400%20308%20%7B%0AwhenBroadcastReceived%20%27heartbeat%27%0Aforever%20%7B%0A%20%20waitMillis%20tick%0A%20%20clock%20%2B%3D%201%0A%20%20if%20%28clock%20%3E%3D%20circle%29%20%7B%0A%20%20%20%20espNow_send_pair%20%27light%27%2010%0A%20%20%20%20sendBroadcast%20%27flash%27%0A%20%20%20%20clock%20%3D%200%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20693%20308%20%7B%0AwhenBroadcastReceived%20%27listen%27%0Aforever%20%7B%0A%20%20if%20%28espNow_receive_pair%29%20%7Bif%20%28clock%20%3C%20circle%29%20%7B%0A%20%20%20%20clock%20%2B%3D%201%0A%20%20%7D%7D%0A%7D%0A%7D%0A%0Ascript%20676%2077%20%7B%0AwhenButtonPressed%20%27A%27%0Aclock%20%3D%20%28random%200%20circle%29%0A%7D%0A%0A)

A classroom demo can follow this order:

1. Turn on only 1 board first and observe it flashing at a fixed rhythm.
2. Turn on the 2nd and 3rd boards and observe that they are not synchronized at the beginning.
3. Put the boards closer together and wait for them to gradually synchronize.
4. Press the A button on one board to randomly disturb its internal clock, then observe how it joins the group rhythm again.

#### 2. How fireflies synchronize

This program uses three variables to simulate the internal rhythm of one firefly:

- `tick`: the time for one clock step. In this program, the default value is `100` milliseconds.
- `clock`: the current clock value. You can think of it as "which step the firefly has reached."
- `circle`: one complete cycle. In this program, the default value is `12`.

You can imagine `clock` as a small circular clock:

```text
0, 1, 2, 3, ... 11, 12
```

When `clock` reaches `circle`, the board flashes once and resets `clock` to 0.

![Clock program](clock.png)

The core logic can be understood as:

```text
Every 1 tick:
    clock increases by 1

If clock >= circle:
    send ESP-NOW message "light"
    flash itself
    clock = 0
```

The key to synchronization is: when a board hears another board flash, it gently pushes its own clock forward.

```text
If an ESP-NOW message is received:
    If clock < circle:
        clock increases by 1
```

![Nudge the clock after receiving](nudge.png)

This action is called a "nudge." It does not make all boards synchronize immediately; it only lets boards that are behind catch up a little. Many small nudges added together gradually make the whole group form the same rhythm.

#### 3. Advantages of ESP-NOW

ESP-NOW is well suited for this project because it does not require devices to connect to a server before communicating. Instead, devices can directly send short messages to each other.

In this project, ESP-NOW has several clear advantages:

1. No router is needed. There is no need to configure a WiFi name or password in the classroom.

2. It is suitable for one-to-many broadcasts. When one "firefly" sends the `light` message, nearby devices can receive it.

3. It has low latency and visible feedback. Students can directly see the effect of "I flashed once, and others were affected."

4. It is suitable for group behavior experiments. With 2 boards, students can observe mutual influence; with 3 or more boards, the synchronization process is easier to see.

ESP-NOW also has a relatively long communication range. If conditions allow, the firefly synchronization experiment can be carried out across the whole classroom.

#### 4. Questions to explore

1. Change `tick`  
   A smaller `tick` makes the flashing rhythm faster; a larger `tick` makes the rhythm slower.

2. Change `circle`  
   A smaller `circle` makes flashes more frequent; a larger `circle` makes the interval between flashes longer.

3. Change the nudge size  
   Currently, after receiving a message, the program only does `clock += 1`. What happens if it becomes `clock += 2` or `clock += 3`? Will synchronization be faster? Will it become easier to disturb?

4. Add message filtering  
   Responding only to the `light` message can make the program more stable in a classroom with many people and many devices.

5. Use different channels  
   Set different groups to different ESP-NOW channels so each group of fireflies only synchronizes within its own group.
