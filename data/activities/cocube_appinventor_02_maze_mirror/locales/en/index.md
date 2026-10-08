CoCube is on a maze, and the same maze appears on your phone. Can you make a dot on the phone follow the real robot? In the [previous activity](../cocube_appinventor_01_control-en/), the phone sent `smile` and `go` to CoCube. This time CoCube will send something back: its position.

This time, show CoCube's real movement on the maze map on your phone. Move CoCube on the CoMap, and the dot on your phone follows it.

### 1. Get the maze ready

You will need CoCube, the production maze CoMap, an Android phone, and your App Inventor and MicroBlocks projects from the previous activity. Put the CoMap on a flat surface with **A** near the top left. Start by moving CoCube **by hand**, not by pressing Go.

Here is the [maze image for the phone](maze-map.png), cropped from the [production maze map](comaps-maze-map.png) to match its coordinates. It is 300 × 200 pixels. On this CoMap, X goes from 0 to 300 across the page and Y goes from 0 to 200 down the page. App Inventor's Canvas also starts counting at the top left. That means you can draw a dot using CoCube's `(X, Y)`. Turn the CoMap around, though, and the dot will no longer match CoCube's real position.

### 2. Make CoCube report its position

Open your CoCube program in MicroBlocks. Keep the `smile` and `go` receivers. Add the new script below:

![MicroBlocks script that sends CoCube's position every half-second while it is on the mat](scriptImagePosition.png)

When CoCube is on the mat and connected, it sends a message like `pos,125.5,62.25` every 500 milliseconds. `pos` means position; the next two numbers are X and Y, which can have decimal places. The commas help the phone separate the three parts. Off the mat, CoCube sends `off-map` instead. Before opening the phone app, try the **CoCube on the mat**, **CoCube position_X**, and **CoCube position_Y** blocks in MicroBlocks while CoCube is on the CoMap. Do the numbers change as you move it by hand?

Make sure the new script is running on CoCube. Then disconnect MicroBlocks from CoCube so your phone can connect to it.

### 3. Put the maze on the phone

In App Inventor, continue your controller project from the previous activity. Add a **Canvas** between `StatusLabel` and the two action buttons; rename it `MapCanvas`. <a href="maze-map.png" download="maze-map.png">Download maze-map.png</a>, upload the saved image under **Media**, and set `MapCanvas.BackgroundImage` to `maze-map.png`. Set its **Width** to **300 pixels**, **Height** to **200 pixels**, and **PaintColor** to red. Under the Canvas, add a **Label** called `LocationLabel` with the text `Place CoCube on the maze map`.

Your Designer should now look like this. Keep `BluetoothLE1` and `MicroBlocks1` in **Non-visible components**; they still handle the connection.

<p align="center"><img src="01-designer.png" alt="App Inventor Designer with maze Canvas and location label below the connection status" width="820"></p>

### 4. Draw the position dot

In **Blocks**, add a separate **`when MicroBlocks1.MicroBlocksMessageReceived`** event—not a block inside the Connect button. Look at the blocks below as you build:

<p align="center"><img src="02-blocks.png" alt="App Inventor message receiver splits position into X and Y and redraws a dot" width="720"></p>

1. If `message = off-map`, call `MapCanvas.Clear` and set `LocationLabel.Text` to `Place CoCube on the maze map`.
2. Otherwise, split `message` at each comma. If item **1** is `pos`, clear the Canvas and set the label to `X: ` + item **2** + `    Y: ` + item **3**.
3. Call `MapCanvas.DrawCircle`. Put item **2** in `centerX`, item **3** in `centerY`, **5** in `radius`, and **true** in `fill`.

Items in a list start at **1**, so X is item 2 and Y is item 3. `Clear` removes the old dot, not the maze background: the dot shows the **current** position rather than leaving a trail.

### 5. Does the dot follow CoCube?

First show your app on the phone, then connect to CoCube:

1. Connect the computer and phone to the same Wi-Fi network. In App Inventor, choose **Connect → AI Companion**. Scan the QR code with the Companion on your phone, or enter the six-letter code and tap **connect with code**. Wait for the maze screen to appear on your phone.
2. Keep CoCube switched on with its position script running, and disconnect the computer's MicroBlocks BLE connection. Enter the full device name shown in MicroBlocks, such as `CoCube QCX`, in the phone's `DeviceName` box and tap Connect. When the status says `Connected`, the position dot should appear.

If the phone stays on the code screen and the computer reports a connection failure, close and reopen the Companion. On the computer, choose **Connect → Reset Connection**, then **AI Companion**, and connect using the new code. Make sure the input contains only the new six-letter code.

Place CoCube at **A** on the physical map. Does the red dot appear near **A** on the phone? Now move it slowly by hand to **B** and **C**. You can also start at **E**, or another spot that's easy to reach. Before looking at the phone, predict which number should change more: X or Y. Check the numbers below the image as well as the dot.

Lift CoCube off the CoMap. The dot should disappear and the label should ask you to put it back. If the dot stays still, check whether the two **CoCube position** blocks change in MicroBlocks; if they do, check the phone's connection and the `pos,` message. If the dot moves in the wrong direction, check the CoMap's orientation and that `centerX` uses item 2, while `centerY` uses item 3.

Try the Go button only after moving CoCube by hand works. Keep it well away from the edge: Go makes it move for a set **time**, not stop at a particular place. The printed maze lines won't stop it either. Your phone map shows where CoCube is; it won't find a path for CoCube.

### 6. Your turn

At which spot—A, B, or C—are X and Y closest to each other? Write down the coordinates at all three spots and compare your prediction with the phone. Then change `MapCanvas.DrawCircle`'s radius: what size makes the robot easy to see without covering the maze paths?

### 7. Compare and share

Compare your work with the finished [App Inventor maze mirror (.aia)](CoCubeMazeMirror.aia) and [CoCube MicroBlocks project (.ubp)](CoCubeMazeMirror.ubp). To share your own version, choose **Projects → Export selected project (.aia) to my computer**. A classmate can import the `.aia` in App Inventor and open the `.ubp` in MicroBlocks.
