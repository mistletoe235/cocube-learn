In this tutorial, you will use **CoCube + MicroBlocks + MQTTX + the public EMQX MQTT broker** to build a small but complete IoT project:

- CoCube publishes its battery percentage once per second;
- MQTTX subscribes to the topic and receives the battery data;
- MQTTX publishes text to the same topic;
- CoCube receives the text and displays it on its TFT screen.

### 1. Introduction to MQTT and MQTTX

#### 1.1 What is MQTT?

MQTT (Message Queuing Telemetry Transport) is a lightweight communication protocol based on the publish/subscribe model. It is designed for networks with low bandwidth, unreliable connections, or high latency. Originally developed by IBM in 1999, it is now widely used for communication between Internet of Things (IoT) devices.

MQTT organizes messages by **topics**. A device can publish a message to a topic or subscribe to a topic to receive its messages. Because MQTT has little protocol overhead and transfers data efficiently, it is well suited to resource-constrained devices such as sensors, embedded systems, and mobile devices.

#### 1.2 The three main MQTT roles

MQTT communication involves three main roles:

- **Publisher**: publishes a message to a topic. In this project, CoCube publishes its battery level, while MQTTX publishes text for CoCube to display.
- **Subscriber**: subscribes to topics of interest and receives their messages. In this project, both CoCube and MQTTX act as subscribers.
- **Broker**: receives messages from publishers and forwards them to the appropriate subscribers. This tutorial uses the public EMQX broker at `broker.emqx.io`.

A **topic** is not a separate role. It is the channel name used to organize and route messages. This tutorial uses the topic `cocube_mqtt`.

The project uses the following message flow:

```text
CoCube  --battery data-->  broker.emqx.io  --forward-->  MQTTX
CoCube  <--text message--  broker.emqx.io  <--publish--  MQTTX
                              Topic: cocube_mqtt
```

#### 1.3 What is MQTTX?

[MQTTX](https://mqttx.app/) is an open-source, cross-platform MQTT 5.0 client developed by [EMQ](https://www.emqx.com/). It supports Windows, macOS, and Linux.

MQTTX uses a chat-style interface that makes MQTT communication easy to follow. It can create and save multiple connections, test MQTT/MQTTS connections, subscribe to topics, and publish messages. In this tutorial, MQTTX communicates with CoCube and displays the messages exchanged between them.

If you do not want to install the desktop client, you can use the [MQTTX Web client](https://mqttx.app/web-client) directly in a browser.

Keep these two names separate: **EMQX** is MQTT broker software or a broker service that forwards messages, while **MQTTX** is a client used to connect to a broker, subscribe to topics, and publish test messages.

### 2. What you need

Prepare the following:

- One CoCube;
- A computer that can run MicroBlocks;
- A Wi-Fi network that CoCube can access;
- The [MQTTX desktop client](https://mqttx.app/) or access to the [MQTTX Web client](https://mqttx.app/web-client).

Create a blank project in MicroBlocks and connect CoCube. You will first add the MQTT block library and then build the program step by step.

### 3. Add the MQTT block library in MicroBlocks

The blocks for MQTT connection, subscription, publishing, and events are provided by the MQTT library. Add it before building the program:

1. Open the **File** menu in MicroBlocks and select **Open**;
2. Select **Libraries** on the left side of the Open window;
3. Select the **Network** category in the middle column.

4. Select **MQTT** from the list on the right;
5. Click **Open** in the lower-right corner.

The MQTT blocks will now appear in the block palette. The MQTT library depends on the WiFi library, so the Wi-Fi connection blocks are normally loaded at the same time. If the **connect WiFi** block is missing, use the same process to add the **WiFi** library from the Network category.

### 4. Create an EMQX broker connection in MQTTX

Here, “create a server” means creating a connection profile in MQTTX. `broker.emqx.io` is already a working public broker, so you do not need to deploy your own server.

#### 4.1 Create a new connection

Open MQTTX and click the `+` icon on the left or the **New Connection** button.

<p align="center"><img src="mqttx_new_connection.png" alt="Create a new connection in MQTTX" width="760"></p>

Use the following settings:

| Setting | Recommended value | Description |
| --- | --- | --- |
| Name | `mqtt_test` | Identifies this connection in MQTTX |
| Client ID | An automatically generated unique value | Do not reuse another client's ID |
| Host | `broker.emqx.io` | Do not add `http://` or `https://` in the MicroBlocks block |
| Protocol | `mqtt://` | The MQTTX desktop app can use native MQTT |
| Port | `1883` | Standard port for unencrypted MQTT |
| Username | Leave blank | The public EMQX broker does not require it |
| Password | Leave blank | The public EMQX broker does not require it |
| SSL/TLS | Off | Matches port `1883` |

If you use a browser-based or WebSocket MQTTX client, use `ws://broker.emqx.io:8083/mqtt` instead. MQTTX and CoCube may use different transport ports and still communicate, provided that they connect to the same broker and use the same topic.

Save the profile and click **Connect**. A green status indicator next to the connection name means that MQTTX is connected.

> `broker.emqx.io` is a public test broker. Anyone may publish or subscribe to public topics. Do not send passwords, personal information, or other sensitive data, and do not use it for production projects.

### 5. Create and subscribe to a topic

An MQTT topic does not need to be created in a server dashboard. It becomes usable when a client first subscribes to it or publishes a message to it.

After connecting, click **New Subscription** and enter:

| Setting | Value used in this tutorial |
| --- | --- |
| Topic | `cocube_mqtt` |
| QoS | `0` |
| Alias | Leave blank or enter `CoCube` |

Click **Confirm**.

<p align="center"><img src="mqttx_subscription.png" alt="Create a topic subscription in MQTTX" width="700"></p>

> The `testtopic/#` shown in the screenshot is only an MQTTX wildcard subscription example. Enter `cocube_mqtt` for this tutorial so that the subscription matches the CoCube program built later.

Topic names are case-sensitive. Spaces, slashes, and underscores must also match exactly. On a public broker, it is safer to include a unique student or device number, such as `cocube_mqtt_023`. If you change the topic, change it everywhere in both MQTTX and MicroBlocks.

### 6. MQTT blocks used in this project

#### 6.1 Connect to Wi-Fi

<p align="center"><img src="wifi_connect_block.png" alt="Connect WiFi block" width="560"></p>

The two inputs in the **connect WiFi** block are the Wi-Fi name (SSID) and password. This block must run before the MQTT connection because MQTT requires network access. In the complete program, you will also use **clear TFT display** first to remove content left by an earlier run.

#### 6.2 Connect to the MQTT broker

The **MQTT connect to broker** block specifies the broker address:

<p align="center"><img src="mqtt_connect_block.png" alt="MQTT broker connection block" width="560"></p>

Enter the public EMQX broker used in this tutorial:

<p align="center"><img src="connect_broker.png" alt="Enter broker.emqx.io in the MQTT connection block" width="720"></p>

Only the broker hostname is entered. The MQTT library will then use its default buffer size, use the device MAC address as the client ID, and leave the username and password empty.

#### 6.3 Check the connection

<p align="center"><img src="mqtt_connected_block.png" alt="MQTT connected Boolean block" width="400"></p>

**MQTT connected** is a Boolean block. Use it as the condition of an **if** block so that subscription and message tasks start only after the connection succeeds.

#### 6.4 Subscribe to a topic

<p align="center"><img src="mqtt_subscribe_block.png" alt="MQTT topic subscription block" width="460"></p>

The subscription block tells the broker which topic the device wants to receive. `testTopic` in the image is the block's default example. Replace it with `cocube_mqtt` and use the default QoS value of `0`.

#### 6.5 Publish a message

<p align="center"><img src="mqtt_publish_block.png" alt="MQTT topic and payload publishing block" width="680"></p>

The publishing block has two essential inputs:

- **Topic**: the channel to which the message is sent;
- **Payload**: the actual text, number, or data being sent.

`testTopic` and `Hello!` in the image are default examples. To publish CoCube's battery level, change the topic to `cocube_mqtt` and place the **battery percentage** reporter in the payload input.

#### 6.6 Read an MQTT event and its payload

<p align="center"><img src="mqtt_event_block.png" alt="MQTT event block" width="320"></p>

The **MQTT event** block returns the latest incoming MQTT event.

<p align="center"><img src="mqtt_event_payload_block.png" alt="Extract the payload from an MQTT event" width="430"></p>

The **MQTT event payload** block extracts the message body from the event. The program stores this result in a variable named `MESSAGE` and displays it on the TFT screen.

### 7. Build the complete send-and-receive program

The complete program consists of three main scripts. Before building them, create a variable named `MESSAGE` to store received payloads. The block images in this section show individual parts of the program. Any hat blocks or outer control blocks not visible in an image are described separately.

#### 7.1 Script 1: connect, subscribe, and start the tasks

##### Step 1: Clear the TFT and connect to Wi-Fi

Place **clear TFT display**, then connect **connect WiFi** below it. Replace the two blank inputs shown in the image with your Wi-Fi name and password.

<p align="center"><img src="main_connect_wifi.png" alt="Clear the TFT and connect to Wi-Fi in the main script" width="620"></p>

##### Step 2: Connect to the MQTT broker

Connect **MQTT connect to broker** below the Wi-Fi block and enter `broker.emqx.io`.

<p align="center"><img src="connect_broker.png" alt="Connect to the MQTT broker in the main script" width="720"></p>

##### Step 3: Check the connection and subscribe

Place an **if** block below the broker connection block and use **MQTT connected** as its condition. The branch shown in the image contains these blocks in order:

1. Write `MQTT Server Connected.` to the TFT at `(5, 5)`;
2. Subscribe to `cocube_mqtt`.

<p align="center"><img src="connect_and_subscribe.png" alt="Display the connection message and subscribe after MQTT connects" width="780"></p>

The image shows only the **if** branch. It does not include the Wi-Fi and MQTT connection blocks above it. Connect the three program sections vertically in the order described here.

##### Step 4: Start the sending and receiving scripts

Add these blocks below **subscribe to `cocube_mqtt`**:

1. Broadcast `start_sending_message`;
2. Broadcast `start_receiving_message`.

<p align="center"><img src="start_broadcasts.png" alt="Broadcast start_sending_message and start_receiving_message" width="650"></p>

Connect the two broadcast blocks below the subscription block. They start the two independent scripts described next. If the MQTT connection fails, none of the display, subscription, or broadcast blocks inside the **if** branch will run.

#### 7.2 Script 2: publish the CoCube battery level once per second

Place a **when I receive `start_sending_message`** hat block, then attach the following loop below it:

1. Run forever;
2. Publish the **battery percentage** payload to `cocube_mqtt`;
3. Wait `1000000` microseconds.

<p align="center"><img src="publish_battery.png" alt="Forever loop in the battery publishing script" width="720"></p>

The image begins with the **forever** block and does not include the **when I receive `start_sending_message`** hat block above it. `1000000` microseconds equals 1 second. The delay is important: without it, CoCube would publish at a very high rate, wasting network and broker resources and making the results difficult to observe.

#### 7.3 Script 3: receive a message and display it on the TFT

Place a **when I receive `start_receiving_message`** hat block. Add a **forever** block below it, and place the blocks shown in the following image inside that loop.

The blocks in the image run in this order:

1. Set `MESSAGE` to **MQTT event payload**, using **MQTT event** as its input;
2. If the length of `MESSAGE` is greater than `0`, run the conditional branch;
3. Clear the TFT screen;
4. Write `MQTT Server Connected. Receive Message:` at `(5, 5)`;
5. Write `MESSAGE` at `(5, 50)`.

<p align="center"><img src="receive_and_display.png" alt="Read an MQTT payload and display it inside the receiving loop" width="780"></p>

The image does not include the outer **when I receive** hat block or **forever** block. Checking the message length prevents the program from clearing the screen when no valid payload has arrived.

#### 7.4 How the three scripts work together

```text
Main script
  ├─ Connect to Wi-Fi and MQTT
  ├─ Subscribe to cocube_mqtt
  ├─ Broadcast start_sending_message
  │    └─ Sending script: publish the battery level every second
  └─ Broadcast start_receiving_message
       └─ Receiving script: read the payload and display it on the TFT
```

### 8. Test the complete message flow

To avoid missing messages sent immediately after startup, test in the following order.

#### 8.1 Prepare MQTTX to receive messages

1. Connect MQTTX to `broker.emqx.io`;
2. Confirm that MQTTX is subscribed to `cocube_mqtt`;
3. Keep the MQTTX connection page open.

#### 8.2 Start the CoCube program

1. Connect CoCube in MicroBlocks;
2. Replace the Wi-Fi name and password with your own network details;
3. Click the **clear TFT display** block at the top of the main script to run the entire stack;
4. Wait for `MQTT Server Connected.` to appear on the TFT.

When the connection succeeds, CoCube displays the following result. The English text wraps because of the limited screen width.

<p align="center"><img src="cocube_connected.jpg" alt="CoCube connected to the MQTT broker" width="380"></p>

After CoCube has connected and subscribed, MQTTX should receive a battery value such as `40` or `41` approximately once per second.

<p align="center"><img src="mqttx_battery_messages.png" alt="MQTTX receiving battery values published by CoCube" width="780"></p>

The data has now completed this path:

```text
CoCube → broker.emqx.io → MQTTX
```

#### 8.3 Send text from MQTTX to CoCube

In the publishing area at the bottom of MQTTX, use these settings:

| Setting | Value |
| --- | --- |
| Payload format | `Plaintext` |
| QoS | `0` |
| Topic | `cocube_mqtt` |
| Payload | `hello`, `word`, or another short message |

Click the green Send button in the lower-right corner.

<p align="center"><img src="mqttx_publish_message.png" alt="Publish text to cocube_mqtt from MQTTX" width="780"></p>

After receiving the message, CoCube clears its TFT and displays the payload. In the following image, MQTTX published `word`, and CoCube displays `word`.

<p align="center"><img src="message_on_cocube.jpg" alt="CoCube displaying the word message received from MQTTX" width="360"></p>

The message has now completed the reverse path:

```text
MQTTX → broker.emqx.io → CoCube
```

When MQTTX shows both published and received messages, the topic is successfully carrying data in both directions:

<p align="center"><img src="mqttx_message_result.png" alt="Complete two-way message exchange on one topic" width="780"></p>

### 9. Why CoCube may receive its own battery value

To keep the first project simple, this tutorial uses only one topic: `cocube_mqtt`. CoCube both subscribes to this topic and publishes its battery value to it. The broker may therefore forward CoCube's own battery message back to CoCube.

This causes two visible effects:

- The TFT may display CoCube's own battery value;
- Text sent by MQTTX may be visible for less than one second before the next battery message replaces it.

In the following image, `40` is the battery payload that CoCube published to `cocube_mqtt` and then received again from the same topic:

<p align="center"><img src="battery_on_cocube.jpg" alt="CoCube receiving and displaying its own battery value of 40" width="360"></p>

For the first experiment, you can temporarily stop the battery publishing script so that the incoming text remains visible. After completing the basic experiment, use separate topics for the two directions:

| Direction | Recommended topic |
| --- | --- |
| CoCube → MQTTX | `cocube_mqtt/device_id/up` |
| MQTTX → CoCube | `cocube_mqtt/device_id/down` |

For example, for device `023`:

```text
cocube_mqtt/023/up
cocube_mqtt/023/down
```

Make these changes:

1. Change CoCube's subscription topic to `cocube_mqtt/023/down`;
2. Change CoCube's publishing topic to `cocube_mqtt/023/up`;
3. Subscribe MQTTX to `cocube_mqtt/023/up`;
4. Publish MQTTX text messages to `cocube_mqtt/023/down`.

### 10. Checklist

- [ ] CoCube is connected correctly in MicroBlocks;
- [ ] The Wi-Fi name and password have been replaced;
- [ ] MQTTX and CoCube are both connected to `broker.emqx.io`;
- [ ] MQTTX shows a green connection status;
- [ ] MQTTX and CoCube use exactly the same topic;
- [ ] Both clients use QoS `0` for the basic test;
- [ ] The TFT displays `MQTT Server Connected.`;
- [ ] MQTTX receives one battery message per second;
- [ ] CoCube displays the text published by MQTTX.

### 11. Troubleshooting

#### MQTTX cannot connect

Check the network, broker address, and port. Native MQTT in the desktop client normally uses `broker.emqx.io:1883`; WebSocket normally uses `ws://broker.emqx.io:8083/mqtt`. Make sure that the Client ID is unique.

#### CoCube does not display the connection message

Check the Wi-Fi name and password first. Then make sure that the broker block contains only `broker.emqx.io`. When the connection fails, the program does not broadcast the start messages, so correct the settings and run the main script again.

#### MQTTX does not receive battery data

Confirm that MQTTX is subscribed to `cocube_mqtt`, not the example topic `testtopic/#` shown in the screenshot. Also check that the battery script has received the `start_sending_message` broadcast.

#### CoCube does not receive text from MQTTX

Make sure that the MQTTX publishing topic is also `cocube_mqtt`, the payload format is `Plaintext`, and the payload is not empty. Topic names are case-sensitive.

#### Text is immediately replaced by a number

This is an expected result of using one topic in both directions: the next battery message replaces the text. Stop the battery publishing script temporarily, or follow Section 9 to use separate `/up` and `/down` topics.

#### Messages from different student groups interfere with each other

`cocube_mqtt` is not a private topic on the public broker. Give each device a unique number, such as `cocube_mqtt_023`, and change the topic in both MQTTX and MicroBlocks.

### 12. Summary

You have now completed a full IoT communication loop:

1. CoCube connects to Wi-Fi;
2. CoCube and MQTTX connect to the same EMQX broker;
3. The clients establish a message channel by using the same topic;
4. CoCube publishes its battery level, and MQTTX subscribes and receives it;
5. MQTTX publishes text, and CoCube subscribes, extracts the payload, and displays it.

You can now replace the battery value with sensor data or interpret received text such as `forward`, `left`, `right`, and `stop` as commands to build a remotely controlled robot.

### 13. Reference project

After completing the tutorial, download and open the reference project to compare the three scripts, block parameters, and broadcast names:

<a href="CoCube_MQTT_01.ubp" download="CoCube_MQTT_01.ubp">Download the <code>CoCube_MQTT_01.ubp</code> reference project</a>

Use the project only for comparison and troubleshooting after completing the tutorial. It is not a replacement for building the program step by step.

> Before running the reference project, replace its saved Wi-Fi name and password with your own network details. Remove real Wi-Fi passwords before sharing the `.ubp` file.
