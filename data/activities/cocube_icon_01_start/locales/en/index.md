<h2 class="tutorial-title">Getting Started with CoCube ICON</h2>

CoCube ICON represents actions with picture blocks. Children can join the pictures in order to make a robot move, turn, play notes, and display patterns.

<p class="tutorial-actions"><a class="c_button button tutorial-launch" href="https://icon.cocube.fun/" target="_blank" rel="noopener"><span>Open ICON programming</span></a></p>

### 1. Connect CoCube

#### On a computer

Use Chrome or Edge on a computer that supports Bluetooth.

1. Turn on CoCube and your computer's Bluetooth.
2. Open ICON, click the blue connection button at the top right, and choose Bluetooth.
3. Select your CoCube in the browser's device list, then pair or connect.
4. Wait until the page shows that it is connected before testing blocks.

You can also use a USB data cable and choose USB in the connection menu. If the robot is missing, check its power, Bluetooth, or cable, then scan again.

#### On a phone or tablet

Install the CoCube App. It opens in MicroBlocks by default. Use the programming mode button in the toolbar to switch to ICON, then connect using the top-right button. iOS uses Bluetooth; Android supports Bluetooth or USB.

<div class="tutorial-apps"><div><h4>Android App</h4><a href="https://wiki.cocube.fun/app/apk"><img src="cocube-android.png" alt="CoCube Android download QR code" width="180"></a><p><a href="https://wiki.cocube.fun/app/apk">Download the Android app</a></p></div><div><h4>iOS App</h4><a href="https://apps.apple.com/app/id6752908157"><img src="cocube-ios.png" alt="CoCube iOS download QR code" width="180"></a><p><a href="https://apps.apple.com/app/id6752908157">Open the App Store</a></p></div></div>

### 2. Explore the interface

<img class="tutorial-image" src="icon-interface.png" alt="ICON interface: project menu, connection button, canvas, green Run button, and block palette">

- **Home, at the top left**: open the project menu to create, open, save, undo, or change language.
- **Connection button, at the top right**: connect CoCube and check its connection status.
- **Canvas, in the center**: join blocks from left to right.
- **Green Run button**: run programs that begin with a Start block.
- **Block palette, at the bottom**: swipe sideways to find more blocks and drag them onto the canvas.
- **Zoom buttons, at the bottom left**: resize blocks on both the canvas and the palette.

### 3. Your first program: move forward one cell

Before using movement blocks, put CoCube at the center of a cell on the positioning mat, with one free cell in front of it.

1. Find the yellow Start block on the canvas.
2. Drag the upward-arrow Forward block from the palette and attach it to the right of Start.
3. Click the number field below Forward and choose **1**.
4. Click the green Run button and watch the robot move one cell forward.

The picture above shows this “Start → Forward 1” program. Forward and Backward use a number picker, so no keyboard is needed.

### 4. Add actions and test

Add turns, waits, repeats, sounds, or display blocks. Click a block's parameter field to change its number, color, note, or other setting.

Once connected and ready, click an action block in the palette to try it, or click a block sequence on the canvas to run it. Use the green Run button for a complete task.

Event blocks can start several programs at the same time. For example, one program can control movement while another plays a sound when ToF detects an object. ToF and DLight events need the matching sensor module.

### 5. Block reference

#### Events and program control

<table class="icon-block-table"><thead><tr><th scope="col">Icon</th><th scope="col">Block</th><th scope="col">What it does</th></tr></thead><tbody><tr><td><img src="01-start.png" alt="Start" width="76" height="64"></td><td><strong>Start</strong></td><td>Run the program attached to this block.</td></tr><tr><td><img src="02-button-a.png" alt="Button event" width="76" height="64"></td><td><strong>Button event</strong></td><td>Run the attached program when the selected CoCube button is pressed.</td></tr><tr><td><img src="03-receive-message.png" alt="Receive message" width="76" height="64"></td><td><strong>Receive message</strong></td><td>Run the attached program when a message of the selected color arrives.</td></tr><tr><td><img src="04-send-message.png" alt="Send message" width="76" height="64"></td><td><strong>Send message</strong></td><td>Broadcast a colored message to trigger other programs.</td></tr><tr><td><img src="05-wait.png" alt="Wait" width="76" height="64"></td><td><strong>Wait</strong></td><td>Pause for the selected time, then continue.</td></tr><tr><td><img src="06-forever.png" alt="Forever" width="76" height="64"></td><td><strong>Forever</strong></td><td>Repeat the blocks inside until the program is stopped.</td></tr><tr><td><img src="07-repeat.png" alt="Repeat" width="76" height="64"></td><td><strong>Repeat</strong></td><td>Repeat the blocks inside a selected number of times.</td></tr><tr><td><img src="08-stop.png" alt="Stop" width="76" height="64"></td><td><strong>Stop</strong></td><td>Stop the running programs.</td></tr></tbody></table>

#### Sound and screen

<table class="icon-block-table"><thead><tr><th scope="col">Icon</th><th scope="col">Block</th><th scope="col">What it does</th></tr></thead><tbody><tr><td><img src="09-play-note.png" alt="Play note" width="76" height="64"></td><td><strong>Play note</strong></td><td>Choose a note and octave, then play it.</td></tr><tr><td><img src="10-draw-screen.png" alt="Draw pattern" width="76" height="64"></td><td><strong>Draw pattern</strong></td><td>Edit and display a single-color pixel pattern.</td></tr><tr><td><img src="11-screen-color.png" alt="Display color" width="76" height="64"></td><td><strong>Display color</strong></td><td>Choose the color used for single-color patterns.</td></tr><tr><td><img src="12-screen-image.png" alt="Built-in image" width="76" height="64"></td><td><strong>Built-in image</strong></td><td>Choose and display an image stored on the robot.</td></tr><tr><td><img src="13-color-matrix.png" alt="Color matrix" width="76" height="64"></td><td><strong>Color matrix</strong></td><td>Choose a color for each cell to create a multicolor pattern.</td></tr></tbody></table>

#### Movement and positioning

<table class="icon-block-table"><thead><tr><th scope="col">Icon</th><th scope="col">Block</th><th scope="col">What it does</th></tr></thead><tbody><tr><td><img src="14-forward.png" alt="Forward" width="76" height="64"></td><td><strong>Forward</strong></td><td>Move forward by the selected number of grid cells.</td></tr><tr><td><img src="15-backward.png" alt="Backward" width="76" height="64"></td><td><strong>Backward</strong></td><td>Move backward by the selected number of grid cells.</td></tr><tr><td><img src="16-turn-left.png" alt="Turn left" width="76" height="64"></td><td><strong>Turn left</strong></td><td>Turn left in 90° steps.</td></tr><tr><td><img src="17-turn-right.png" alt="Turn right" width="76" height="64"></td><td><strong>Turn right</strong></td><td>Turn right in 90° steps.</td></tr><tr><td><img src="18-go-to-position.png" alt="Go to position" width="76" height="64"></td><td><strong>Go to position</strong></td><td>Use the positioning mat to move to the selected X and Y coordinates.</td></tr><tr><td><img src="19-face-direction.png" alt="Heading" width="76" height="64"></td><td><strong>Heading</strong></td><td>In ICON: up is 0°, right 90°, down 180°, and left 270°.</td></tr></tbody></table>

#### Gripper and sensors

<table class="icon-block-table"><thead><tr><th scope="col">Icon</th><th scope="col">Block</th><th scope="col">What it does</th></tr></thead><tbody><tr><td><img src="20-gripper-open.png" alt="Open gripper" width="76" height="64"></td><td><strong>Open gripper</strong></td><td>Open the servo gripper module.</td></tr><tr><td><img src="21-gripper-close.png" alt="Close gripper" width="76" height="64"></td><td><strong>Close gripper</strong></td><td>Close the servo gripper module.</td></tr><tr><td><img src="22-tof-trigger.png" alt="Distance event" width="76" height="64"></td><td><strong>Distance event</strong></td><td>Connect a ToF module; run the program when distance meets the selected condition.</td></tr><tr><td><img src="23-light-trigger.png" alt="Light event" width="76" height="64"></td><td><strong>Light event</strong></td><td>Connect a DLight module; run the program when light level meets the selected condition.</td></tr></tbody></table>


### 6. Run and debug

Check that blocks are joined, parameters are correct, and the page shows a connection. Movement tasks need a positioning mat and should start at a cell center. Add only one or two actions at a time so that changes are easy to check.

Forward and Backward move between cell centers. Adjust the route near the edge to keep the robot inside the positioning area. For football activities, place both the robot and the ball at the centers of their cells.

<img class="tutorial-image" src="comaps-football-map.png" alt="CoCube football map; dotted-line intersections mark cell centers">

### 7. Manage projects

Open Home at the top left:

- **New, Open, and Save**: manage projects stored on your device.
- **Undo**: undo several steps, including deleted blocks or clearing the canvas.
- **Clear canvas**: remove the program from the canvas.
- **Language**: change the interface language.
- **Blocks programming**: return to MicroBlocks.

The Web version also lets you return to the CoCube entry page. After changing programming mode, reconnect the robot in the editor you switch to.

### 8. Try map challenges

Use the standard maze and racing maps to plan routes, or create your own themed map with Map Builder.

<img class="tutorial-image" src="comaps-maze-map.png" alt="CoCube standard maze map">
<img class="tutorial-image" src="comaps-racing-map.png" alt="CoCube standard racing map">

[Read the Map Builder guide](../cocube_icon_02_map_builder-en/) to learn how to choose a theme, draw a route, export, and print.

<img class="tutorial-image" src="polar-map-A3.svg" alt="A3 Polar Expedition map exported from Map Builder">

<a href="polar-map-A3.svg" download>Download this A3 polar map as SVG</a>

Start with a route from Start to End. Then try collecting rewards, avoiding obstacles, or using fewer blocks. Add loops, lights, and sounds as children become more confident.
