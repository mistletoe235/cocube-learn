### 1. Goal

Program the CoCube robot to achieve music programming.

### 2. Materials Used

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Software Platform

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Start Programming

The CoCube robot is equipped with a buzzer, which can be programmed to produce sounds of different pitches, adjust the duration of the tones, and control intervals to compose and play music:

1. **Connect Device**: Connect the MicroBlocks IDE to the CoCube robot via a wired or wireless connection.

2. **Find Blocks**: In the "Tone" block library, locate the "play frequency (261) for (500) ms" block and drag it into the workspace.

3. **Run Program**: Left-click the block. When a green halo appears around the block, it indicates that the program has been successfully executed, and you will hear the CoCube robot's buzzer sound for 0.5 seconds before stopping.

4. **Adjust Pitch**: Modify the pitch number and duration to produce sounds of different pitches.

5. **Compose Music**: Here’s a set of middle-note frequencies: Do (523), Re (587), Mi (659), Fa (698), So (784), La (880), Xi (988). You can also look up the corresponding notes and frequencies online. Drag multiple blocks and modify the frequency and duration of each block to compose music.

6. **Stop Tone**: To stop the buzzer from sounding, use the "stop tone" block. Simply click the "stop tone" block in the block area or drag it into the workspace and click it, and CoCube will immediately stop playing the sound.

![](1734678667505.png)

### 5. Advanced Features

Looking up note-to-frequency mappings can be tedious. Is there a simpler way? MicroBlocks provides two convenient methods.

#### 5.1 Notes

In music, notes like c, d, e, f, g, a, b represent Do-Re-Mi-Fa-So-La-Ti. A sharp (♯) raises the pitch by a semitone, and octaves (0, 1, 2...) indicate low, medium, high pitches, etc.

![](image-1.png =350x*)

Try composing "Two Tigers". To make it easier to adjust the tempo of the music, we create a global variable `beat` and place it in each "play tone" block.

![](scriptImage5407537.png)

#### 5.2 MIDI

In MIDI keyboards, MIDI Note Numbers correspond to musical pitches, mainly used for digital music production and communication between instruments.

For example, 60 represents middle C on the piano, 61 represents C#, 62 represents D, etc.

Try creating a sound effect:

![](scriptImage5528060.png)

### 6. Challenge

Use CoCube to try playing "Twinkle, Twinkle, Little Star."

Reference Example Program:

![](scriptImage5737979.png)

[MicroBlocks——CoCube Case 04 - Music Programming](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27Tone%27%0A%0Ascript%20382%20144%20%7B%0AwhenStarted%0Acomment%20%27Two%20Tigers%27%0Abeat%20%3D%20400%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%20%20%27play%20tone%27%20%27D%27%201%20beat%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%7D%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27F%27%201%20beat%0A%20%20%27play%20tone%27%20%27G%27%201%20%282%20%2A%20beat%29%0A%7D%0A%7D%0A%0Ascript%20827%20141%20%7B%0AwhenButtonPressed%20%27A%27%0Acomment%20%27Twinkle%2C%20Twinkle%2C%20Little%20Star%27%0Abeat%20%3D%20400%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0AwaitMillis%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%7D%0A%0Ascript%201212%20145%20%7B%0AwhenButtonPressed%20%27B%27%0Acomment%20%27MIDI%20Sound%20Effect%27%0Alocal%20%27delay%27%205%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%20delay%0A%7D%0A%7D%0A%0A)