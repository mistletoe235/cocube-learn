Try steering CoCube with your thumb. Push up to go forward; push sideways to turn. You'll build a joystick on your phone and add four buttons to change the picture on CoCube's screen.

Open [the app you made in Activity 1](../cocube_appinventor_01_control-en/). Its Bluetooth connection still works; now you'll add a joystick and buttons, then teach CoCube what the new messages mean. Have an Android phone, a computer, CoCube, and an open space to try it out.

### 1. Make a joystick on your phone

Open your Activity 1 project in App Inventor. Choose `Projects → Save project as` and call the copy `CoCubeRemote`. Continue in the copy; it already contains the BluetoothLE and MicroBlocks extensions. Set `Screen1.Title` to `CoCube Remote` to match the screen below.

In `Designer`, make these changes in the order they appear on the screen:

1. Keep `DeviceName` (TextBox), `ConnectButton` (Button), `StatusLabel` (Label), and the non-visible `BluetoothLE1` and `MicroBlocks1` components. Remove `SmileButton` and `GoButton`; in Blocks, remove any old Click events or Enabled blocks left over from those buttons.
2. Add a Label named `HelpLabel` with `Text` set to `Drag the joystick. Release to stop.`
3. Add a Canvas named `JoystickCanvas`. Set `Width` and `Height` to `200 pixels`. <a href="joystick.png" download="joystick.png">Download joystick.png</a>, upload the saved file to `Media`, set the Canvas `BackgroundImage` to `joystick.png`, and set `PaintColor` to orange for the moving dot.
4. Add two HorizontalArrangements, `TopButtons` and `BottomButtons`, each with `AlignHorizontal` set to `Center`. Put `XButton` and `YButton` in the top row; put `AButton` and `BButton` in the bottom row. Set each Button's `Text` to its letter, `Width` to `76 pixels`, and `Height` to `44 pixels`.
5. Add `StopButton` under the rows, with `Text` set to `STOP`. Uncheck `Enabled` for all five new buttons. They'll become available once CoCube connects.
6. Add a non-visible Clock named `Clock1`; set `TimerInterval` to `150` milliseconds and uncheck `TimerAlwaysFires`.

Compare the button positions with the picture below, then check their names in the Designer's component list.

<p align="center"><img src="01-designer.png" alt="Designer: Connect controls, 200-pixel joystick, X/Y and A/B rows, STOP, and non-visible components" width="455"></p>

### 2. Turn on the buttons when connected

Go to **Blocks**. Keep `when ConnectButton.Click` from Activity 1: it calls `MicroBlocks1.Connect` with the `BluetoothLE1` component in `bleExtension` and `DeviceName.Text` in `name`.

From **Variables**, create four global variables: `connected = false`, `active = false`, `leftSpeed = 0`, and `rightSpeed = 0`. `connected` remembers whether the phone is connected to CoCube; `active` remembers whether you're holding the joystick. The other two store the wheel speeds.

Update `when MicroBlocks1.ConnectionChanged(isConnected)` from Activity 1:

- If `isConnected` is true, set `global connected` to `true`, show `Connected` in `StatusLabel.Text`, and set **Enabled** to `true` for `AButton`, `BButton`, `XButton`, `YButton`, and `StopButton`.
- Otherwise set `global connected` and `global active` to `false`, show `Disconnected`, and set **Enabled** to `false` for those five buttons.

Don't put this event inside `ConnectButton.Click`: tapping Connect doesn't mean the phone has connected yet. In `when Screen1.Initialize`, call `JoystickCanvas.Clear`, then `JoystickCanvas.DrawCircle` with `centerX = 100`, `centerY = 100`, `radius = 12`, `fill = true` to draw a dot at the joystick's center.

### 3. Steer CoCube with your finger

On a 200 × 200 Canvas, `(100, 100)` is the center. X grows to the right and Y grows **down** the screen, so moving your finger up makes `100 − Y` positive. When both wheels spin at the same speed, CoCube goes straight; different speeds make it turn. Use these calculations to set the wheel speeds:

```text
forward = 100 − Y
turn = X − 100
leftSpeed = round(
  (forward + turn) / 4
)
rightSpeed = round(
  (forward − turn) / 4
)
```

At `(100, 60)`, both wheels get `10`, so CoCube moves forward. At `(140, 100)`, the left wheel gets `10` and the right gets `−10`, so CoCube turns in place. What speeds would `(140, 60)` produce? Dividing by 4 keeps the speeds between `−50` and `50`, even at the corners.

Use the picture to build **`when JoystickCanvas.Touched`** in this order:

<p align="center"><img src="02-joystick-blocks.png" alt="Touched event: check connected, calculate each wheel speed, draw the dot, and send wheel,left,right" width="900"></p>

1. Put an **if** inside the event, with `get global connected` as the condition. Put all the remaining steps **inside** this if.
2. Set `global leftSpeed` to `round(((100 − get y) + (get x − 100)) / 4)` and `global rightSpeed` to `round(((100 − get y) − (get x − 100)) / 4)`. Find `round` in **Math**; use the event's `get x` and `get y`, not a text block with those letters.
3. Set `global active` to `true`. Call `JoystickCanvas.Clear`, then `JoystickCanvas.DrawCircle` with `centerX = get x`, `centerY = get y`, `radius = 12`, `fill = true`.
4. Call `MicroBlocks1.SendMessage`. For its `message`, use a **Text → join** block with four parts: text `wheel,`, `get global leftSpeed`, text `,`, `get global rightSpeed`. The resulting message looks like `wheel,20,8`: the two numbers go to the left and right wheels in that order.

Now add `when JoystickCanvas.Dragged`. Duplicate the contents of **Touched**, including `if connected`, but replace each `get x` with `get currentX` and each `get y` with `get currentY`. Touching sends the first speed; dragging updates it.

### 4. Stop when you let go

Follow the picture: release the joystick to send `stop`. While you hold it, keep sending the wheel speeds every little while.

<p align="center"><img src="03-safety-blocks.png" alt="TouchUp sends stop on release; Clock resends wheel speeds while active" width="900"></p>

Make `when JoystickCanvas.TouchUp`: set `active` to `false`, set both speeds to `0`, and, **if connected**, send `stop` using `MicroBlocks1.SendMessage`. Clear the Canvas and draw the dot at `(100, 100)` again. Repeat these steps in `when StopButton.Click`.

In `when Clock1.Timer`, check `get global active`. If true, resend the same four-part wheel message from Step 3. The Clock sends it every 150 ms while you hold the joystick, even if your finger isn't moving, so CoCube knows you're still steering.

Add four separate **Click** events. Each calls `MicroBlocks1.SendMessage` with one lowercase letter: `AButton → a`, `BButton → b`, `XButton → x`, `YButton → y`.

### 5. Teach CoCube the joystick messages

[Download CoCubeRemote.ubp](CoCubeRemote.ubp), connect CoCube to MicroBlocks, and open the downloaded project. Look for blocks that handle `wheel` and `stop`, plus blocks for the `a` / `b` / `x` / `y` pictures.

Keep MicroBlocks connected for now. Broadcast `a`: does CoCube show the **happy** picture? If not, check that you opened `CoCubeRemote.ubp` and that CoCube is connected. Once the picture appears, leave the program running on CoCube and disconnect the MicroBlocks IDE so your phone can connect. The next two pictures show the wheel-control blocks.

In the first picture, leave the **space between “when” and “received” empty**. That lets the blocks receive messages such as `wheel,20,8`, even as the speeds change. The blocks split the message at each comma, check that the first part says `wheel`, and send the other two numbers to the wheels. Each new speed message resets a counter that checks whether messages have stopped arriving.

![MicroBlocks: receive wheel,left,right, split the message, and convert the two speeds](scriptImageRemoteReceive.png)

The second picture checks every 100 ms: is the phone still connected, and are new speeds arriving? If Bluetooth disconnects or no new speed arrives for roughly 0.4–0.5 seconds, CoCube stops. A `stop` message brakes immediately; `a`, `b`, `x`, and `y` display **happy**, **sad**, **heart**, and **yes** in that order.

![MicroBlocks: brake when BLE disconnects or the wheel message times out](scriptImageRemoteSafety.png)

### 6. Try your phone joystick

Connect the **app preview** first, then connect the **robot**:

1. On the computer, choose **Connect → AI Companion** in App Inventor. On your Android phone, open the Companion and scan the QR code (or enter its code). The phone and computer need to be on the same network for live preview. The controller appears on the phone, but the status still says `Disconnected`.
2. Leave CoCube on and its receiver running; disconnect the **MicroBlocks IDE** from the robot. On the phone, enter CoCube's **full BLE device name** in `DeviceName`, tap Connect, and allow Bluetooth permissions if prompted. When the status changes to `Connected`, the five buttons become available.

First press A/B/X/Y and check the four pictures. For the first motion test, **hold CoCube with its wheels off the floor** in a safe, open area. Push the stick slightly upward, then release: both wheels should turn, then stop. Try left, right, backward, and a curve; test STOP too. Put CoCube on the floor only after these checks pass.

Place two paper markers on the floor and drive between them. Is it easier to steer with small thumb movements near the center or by pushing toward the edge? Guess what will happen if you change `/ 4` to `/ 8` in the wheel-speed calculation, then try it. If steering is reversed, check `+ turn` on the left and `− turn` on the right. If the picture buttons work but the wheels don't, check that CoCube is running the downloaded `.ubp` and receiving messages beginning with `wheel,`.

### 7. Compare your app

After building your controller, [download CoCubeRemote.aia](CoCubeRemote.aia) and choose **Projects → Import project (.aia) from my computer** to compare its screen and blocks with yours. Share the download link with a classmate who wants to try it.
