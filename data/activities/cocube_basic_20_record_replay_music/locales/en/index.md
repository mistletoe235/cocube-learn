### Record and Replay Music

In the previous activity, [Play Buzzer Music on the Map](../cocube_basic_19_buzzer_music_map-en/), CoCube read the card IDs on the music map and played the corresponding notes through its buzzer.

This time, we will give it a new ability: **remember the keys it passes over and replay the melody automatically.**

Online program: [Open in MicroBlocks][program]

Program file: [`Buzzer_Record_and_Replay.ubp`](Buzzer_Record_and_Replay.ubp)

#### 1. How to Use It

1. Press A. The screen shows `Recording...` and starts a new recording.
2. Slide CoCube across the keys on the music map.
3. Press B. The screen shows `Playing...` and CoCube replays the recorded melody.
4. Press B again to replay the same melody as many times as you like.
5. Press A again to erase the old melody and start a new recording.

The program records only the order of the notes, not the speed of your movement. During replay, every note lasts `300` milliseconds, followed by a `50` millisecond pause.

#### 2. Prepare a Note List

The program uses three variables:

- `key`: the card ID of the current key.
- `last_key`: the previous card ID.
- `notes`: a list that stores all recorded notes in order.

![Initialize the variables](1_when_start_en.png)

At startup, `key` and `last_key` are set to `0`, and `notes` is set to an empty list.

A list is like a container that can grow. If CoCube passes over keys `60`, `64`, and `67`, the list becomes:

```text
notes = [60, 64, 67]
```

#### 3. Press A to Start Recording

![Press A to record](2_A_button_en.png)

After A is pressed, the program clears the screen, shows `Recording...`, and prepares a new recording:

```text
notes = empty list
last_key = 0
```

This removes the previous melody. Reading and playing the map keys works in almost the same way as in the previous activity: the program changes notes only when `key` is different from `last_key`.

The new block is:

```text
add key to notes
```

Whenever CoCube enters a valid key, the program plays the note and adds its number to the end of `notes`. In this way, all visited keys are stored in order.

#### 4. Press B to Replay the Melody

![Press B to replay](3_B_Button_en.png)

After B is pressed, **stop other tasks** ends the recording loop. The program then goes through the `notes` list:

```text
for each note in notes:
    play note for 300 milliseconds
    wait 50 milliseconds
```

The loop takes each note from the beginning of the list and plays it until the entire melody is complete.

The `notes` list is not cleared after replay, so B can be pressed repeatedly. The old melody is erased only when A is pressed again.

#### 5. Try It

- Change `300` milliseconds and compare different playback speeds.
- Change `50` milliseconds and listen to the pauses between notes.
- Display the current MIDI number during replay.
- What else would the program need to record to preserve the original rhythm?

[program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27TFT%27%20%27Tone%27%0A%0Ascript%20400%2070%20%7B%0AwhenStarted%0Akey%20%3D%200%0Alast_key%20%3D%200%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%7D%0A%0Ascript%20400%20225%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Recording...%27%2040%20110%20%28colorSwatch%200%20255%200%20255%29%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0Alast_key%20%3D%200%0Aforever%20%7B%0A%20%20key%20%3D%20%28%27CoCube%20card%20ID%27%29%0A%20%20if%20%28key%20%21%3D%20last_key%29%20%7B%0A%20%20%20%20stopTone%0A%20%20%20%20if%20%28and%20%28key%20%3E%3D%2060%29%20%28key%20%3C%3D%2084%29%29%20%7B%0A%20%20%20%20%20%20tone_startMIDIKey%20key%0A%20%20%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20key%20notes%0A%20%20%20%20%7D%0A%20%20%20%20last_key%20%3D%20key%0A%20%20%7D%0A%20%20waitMillis%2010%0A%7D%0A%7D%0A%0Ascript%20844%20224%20%7B%0AwhenButtonPressed%20%27B%27%0AstopAll%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Playing...%27%2060%20110%20%28colorSwatch%200%20255%200%20255%29%0Afor%20note%20notes%20%7B%0A%20%20playMIDIKey%20note%20300%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A
