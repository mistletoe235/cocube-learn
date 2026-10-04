In this activity, you will make a phone controller for CoCube with MIT App Inventor. Tap the Smile button and CoCube shows a happy face; tap Go and it moves forward a short distance before stopping.

First, connect the phone and CoCube over Bluetooth Low Energy (BLE) and send a message. Then make the robot act on the message it receives.

### 1. Preparation

Have CoCube, an Android phone, and a computer ready.

On the computer, open [MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27) and [MIT App Inventor](https://ai2.appinventor.mit.edu/). Install the App Inventor Companion on the phone to test your app.

App Inventor needs two extensions: **BluetoothLE** for the connection and **MicroBlocks** for messages. Download both `.aix` files from the [MicroBlocks extension guide](https://wiki.microblocks.fun/en/appinventor/ai2extension).

### 2. Receive a message on CoCube

Connect CoCube to MicroBlocks and add the **LED Display** library. Build this receiver:

![MicroBlocks: when smile is received, display the happy image](scriptImageSmile.png)

Broadcast `smile` in MicroBlocks and check that CoCube displays a happy face. You do not need the phone yet. If CoCube cannot respond to `smile` on its own, connecting an app will not fix the receiver.

`smile` is a message shared by the two programs. The text on the phone and on CoCube must match exactly.

### 3. Connect from App Inventor

Create a project called `CoCubeControlLearn`. Choose **Extension → Import extension** for each downloaded `.aix` file, then drag both extensions into the Designer. They appear below the phone preview. Add one **TextBox**, three **Buttons**, and one **Label** in this order: `DeviceName`, `ConnectButton`, `StatusLabel`, `SmileButton`, `GoButton`. Give the input the hint `CoCube BLE device name`. Set the visible text to `Connect`, `Disconnected`, `Smile`, and `Go`. Uncheck **Enabled** for both `SmileButton` and `GoButton` so neither action can run before a connection.

Check the component names in the Designer. Rename any components still called `Button1` or `TextBox1`. The imported extensions should appear as `BluetoothLE1` and `MicroBlocks1` under **Non-visible components** below the phone preview. Importing an extension is not enough to add its blocks to the project.

<p align="center"><img src="01-designer.png" alt="App Inventor Designer with English phone controls and two non-visible extensions" width="665"></p>

In **Blocks**, look at the Connect button blocks, then build them yourself:

<p align="center"><img src="02-connect-blocks.png" alt="ConnectButton.Click calls MicroBlocks1.Connect with the BLE component and device name" width="505"></p>

1. From the `ConnectButton` drawer, drag out **`when ConnectButton.Click`**.
2. Put **`call MicroBlocks1.Connect`** from the `MicroBlocks1` drawer inside it. Its two sockets are `bleExtension` and `name`.
3. Plug the **BluetoothLE1 component block** into `bleExtension`—not a text block with the word `BluetoothLE1`.
4. Plug **`DeviceName.Text`** into `name` so Connect reads the device name entered on the phone.

Next, look at the **connection status** blocks. Tapping Connect requests a connection; only when `isConnected` is true should the action buttons become available.

<p align="center"><img src="03-connection-blocks.png" alt="MicroBlocks1.ConnectionChanged updates the status label and enables or disables the buttons" width="515"></p>

1. Add a separate **`when MicroBlocks1.ConnectionChanged`** event beside—not inside—the Connect button event.
2. Add **if / else** from **Control**, with the event's **`get isConnected`** as the condition.
3. If connected, set `StatusLabel.Text` to `Connected` and set `SmileButton.Enabled` and `GoButton.Enabled` to `true`.
4. Otherwise, show `Disconnected` and set both buttons' `Enabled` to `false`.

The `name` input needs CoCube's **full BLE device name**. Check what MicroBlocks shows when connecting to your robot.

There are **two separate connections** to make:

1. Connect the computer and phone to the same Wi-Fi network. In the App Inventor menu choose **Connect → AI Companion**. Scan the QR code with the Companion on the phone, or enter the code. When the controls appear on your phone, the Wi-Fi preview is working; the phone has not connected to CoCube yet.

<p align="center"><img src="03-companion-wifi.png" alt="App Inventor Companion showing the Connect, Smile, and Go controls on an Android phone before connecting to CoCube" width="300"></p>

`Disconnected` and the disabled buttons mean the phone is not yet connected to CoCube.

2. **Disconnect the MicroBlocks IDE's BLE connection to CoCube**, keeping the robot switched on. Allow Bluetooth permissions on the phone if prompted.
3. In the app preview on the phone, enter CoCube's full device name and tap Connect. When the label says `Connected` and the action buttons become available, the phone is connected to CoCube. Otherwise, check the device name and whether MicroBlocks has disconnected; scanning the Companion QR code again will not connect the robot.

<p align="center"><img src="04-cocube-connected.png" alt="Phone app connected to a CoCube advertising as MicroBlocks GDK, with the Smile and Go buttons enabled" width="300"></p>

### 4. Send the first message

Back in **Blocks**, follow the Smile button example:

<p align="center"><img src="04-smile-blocks.png" alt="SmileButton.Click sends the smile message" width="435"></p>

Drag out **`when SmileButton.Click`** from the `SmileButton` drawer. Put **`call MicroBlocks1.SendMessage`** inside it, and plug in a text block containing `smile` as its `message` input.

Tap the smile button in the phone preview and watch CoCube display `happy`. The phone sends `smile` over BLE; the robot receives the matching message and runs its script.

Temporarily change `smile` in the app to `Smile` and test again. Why does the robot stop responding? Change it back. This helps distinguish a message mismatch from a connection problem.

### 5. Move CoCube forward

Build Go the same way as Smile, but send a different message:

<p align="center"><img src="05-go-blocks.png" alt="GoButton.Click sends the go message" width="432"></p>

In a separate **`when GoButton.Click`** event, call **`MicroBlocks1.SendMessage`** with `go` as its `message`.

Add this script to CoCube:

![MicroBlocks: when go is received, move forward at speed 20 for 400 milliseconds](scriptImageGo.png)

Use the **CoCube move ... for ... msecs** block, not the continuous move block. The timed block brakes the robot at the end of the interval. Place CoCube in the open test area, predict how far it will travel, and tap Go.

Mark the starting point and measure the distance on three trials. Does the robot travel exactly the same distance each time? Change the duration from `400` to `600` milliseconds and try again. This command controls **time**, not a destination on the map. Reaching a maze waypoint will require position feedback.

> Test on the floor, away from table edges. Do not use Bluetooth disconnection as a stop command.

### 6. Troubleshooting

#### The app cannot find or connect to CoCube

Check the phone's Bluetooth permissions, the robot's full device name, and whether MicroBlocks has released its BLE connection. If the extension blocks are missing, confirm that both `.aix` files were imported and restart the Companion.

#### The phone says “Connected,” but nothing happens

First test the `smile` receiver in MicroBlocks. Then compare the text sent by the app, including capitalization. If the smile works but Go does not, test the timed move block by itself and make sure both programs say `go`.

### 7. Try it yourself

Add a Left button that sends a short, time-limited turn command. Predict the angle, then use a CoMap to measure CoCube's actual heading and adjust the duration.

### 8. Compare and share

Compare your work with the completed [App Inventor controller (.aia)](CoCubeControlLearn.aia) and [CoCube receiver (.ubp)](CoCubeControlLearn.ubp). Import the `.aia` via **Projects → Import project (.aia) from my computer**; open the `.ubp` in MicroBlocks. Share these links for the finished example. To share your own changes, choose **Projects → Export selected project (.aia) to my computer** and send the exported file.
