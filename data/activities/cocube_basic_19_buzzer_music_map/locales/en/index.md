### Play Buzzer Music on the Map

CoCube can do more than move around a positioning map. It can also turn the music map into a keyboard that you play by sliding the robot. In this activity, no external MIDI module is needed: the music is played through CoCube's built-in buzzer.

Online program: [Open in MicroBlocks][program]

Program file: [`Buzzer.ubp`](Buzzer.ubp)

#### 1. Preparation

You will need:

- One CoCube
- A CoCube music map
- A computer or tablet with MicroBlocks

Connect CoCube to MicroBlocks and run the program. Place the robot on the music map and slide it by hand across different keys to hear different pitches.

##### Optional: 3D-Printed Bracket

When CoCube is pushed directly, friction between its wheels and the map can make it harder to slide. The included chassis bracket lifts the wheels slightly so the robot moves more smoothly across the music map.

[Download the CoCube chassis bracket STL](CoCube_Chassis_Bracket.stl)

After printing, attach the bracket underneath CoCube and slide the robot by hand to play. The bracket is intended only for manual sliding; remove it before running the motors.

#### 2. How the Music Map Produces Sound

CoCube can read the **card ID** underneath it. The keys on the music map use IDs from `60` to `84`, which are also MIDI note numbers.

For example:

- `60`: middle C
- `61`: C sharp
- `62`: D
- Each increase of 1 raises the pitch by one semitone

The **start MIDI key** block in the Tone library converts these numbers directly into buzzer pitches, so no separate note table is required.

#### 3. Complete Program

![Play buzzer music on the map](code_en.png)

The program uses only two variables:

- `key`: the current card ID.
- `last_key`: the previous card ID.

##### Read the Current Key

The program continuously reads CoCube's card ID and stores it in `key`.

```text
key = CoCube card ID
```

##### Switch Sound Only When the Key Changes

When `key` is different from `last_key`, CoCube has entered a new area. The program changes the sound only at this moment, preventing it from repeatedly restarting the same note while the robot remains on one key.

##### Start and Stop Notes

When the key changes, the program first stops the previous note. If the new card ID is between `60` and `84`, it starts the corresponding MIDI note.

When CoCube leaves the keyboard area, the card ID is outside this range, so the program only stops the sound. Finally, `last_key = key` remembers the current state.

The `10` millisecond delay keeps the response quick without running the loop unnecessarily fast.

#### 4. Try It

- Display the current `key` on the screen and observe the number assigned to each key.
- Record the keys CoCube passes over and make it replay the melody automatically.

[program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27Tone%27%0A%0Ascript%20506%20113%20%7B%0AwhenStarted%0Akey%20%3D%200%0Alast_key%20%3D%200%0Aforever%20%7B%0A%20%20key%20%3D%20%28%27CoCube%20card%20ID%27%29%0A%20%20if%20%28key%20%21%3D%20last_key%29%20%7B%0A%20%20%20%20stopTone%0A%20%20%20%20if%20%28and%20%28key%20%3E%3D%2060%29%20%28key%20%3C%3D%2084%29%29%20%7B%0A%20%20%20%20%20%20tone_startMIDIKey%20key%0A%20%20%20%20%7D%0A%20%20%20%20last_key%20%3D%20key%0A%20%20%7D%0A%20%20waitMillis%2010%0A%7D%0A%7D%0A%0A
