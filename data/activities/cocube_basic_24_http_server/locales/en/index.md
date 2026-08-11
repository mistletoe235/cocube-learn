Web pages are usually stored on remote servers. In this activity, CoCube itself becomes a small HTTP server.

When a computer or phone is connected to the same Wi-Fi network as CoCube, you can send requests from the browser address bar to display text, turn on a pixel, or make CoCube move and turn.

This tutorial is based on the MicroBlocks Learn activity [Controlling the Robot with WiFi](https://learn.microblocks.fun/en/activities/citilab-course-17-en/) and has been adapted for CoCube.

### 1. Preparation

You will need:

- One CoCube
- A computer or phone
- A 2.4 GHz Wi-Fi network
- MicroBlocks
- The Chrome or Edge web browser

The computer or phone must be connected to **the same Wi-Fi network** as CoCube.

In MicroBlocks, click **Add Library**, open **Network**, and select **HTTP Server**.

<p align="center"><img src="add_library.png" alt="Add the HTTP Server block library" width="460"></p>

The **HTTP Server** library depends on the WiFi library. After adding it, you can use blocks for connecting to Wi-Fi, reading the IP address, receiving HTTP requests, and sending responses.

### 2. Connect CoCube to Wi-Fi

Build the following program. Replace **Network name** and **Password** with your Wi-Fi information.

<p align="center"><img src="scriptImage01_connect.png" alt="Connect to Wi-Fi and display the IP address" width="680"></p>

When the program starts, CoCube connects to Wi-Fi and displays its IP address on the TFT screen, for example:

```text
172.20.10.2
```

The IP address is like CoCube's street address on the local network. The browser will use this address to find it.

Your CoCube may receive a different address. Always use the address shown on its TFT screen.

> The Wi-Fi name and password are stored in the program. Remove your password before sharing the program or screenshots.

### 3. Send a browser request to CoCube

In HTTP communication, the browser is the **client** and CoCube is the **server**:

- The browser sends an HTTP request to CoCube.
- CoCube returns an HTTP response to the browser.

Build the following program:

<p align="center"><img src="scriptImage02_request.png" alt="Receive and respond to an HTTP request" width="720"></p>

The program repeatedly reads the **HTTP server request**:

- When nobody is accessing CoCube, it returns an empty value.
- When a browser accesses CoCube, it returns a request.
- After receiving a request, the program responds with status `200 OK` and the text `Hello, This is CoCube.`.

Enter this in the address bar of a browser on the computer or phone:

```text
CoCube_IP_address/test
```

For example:

```text
172.20.10.2/test
```

The browser displays the text returned by CoCube:

<p align="center"><img src="response.png" alt="The browser receives a response from CoCube" width="360"></p>

The browser may label the local `http://` page as "Not secure." This experiment does not ask for an account, password, or personal information, so you can continue.

### 4. Understand request paths

The previous address has two parts:

| Part | Example |
| --- | --- |
| CoCube address | `http://172.20.10.2` |
| Request path | `/test` |

The path is the part after the IP address that begins with `/`. Use the **path of request** block to read it.

<p align="center"><img src="scriptImage03_path.png" alt="Read the HTTP request path" width="680"></p>

Different addresses produce different paths:

| Browser address | Request path |
| --- | --- |
| `172.20.10.2/test` | `/test` |
| `172.20.10.2/on` | `/on` |
| `172.20.10.2/forward` | `/forward` |

The content of the **HTTP server request** block is removed after it is read. The program therefore stores it in the `request` variable first and then reads the path from that variable.

### 5. Turn a pixel on and off with a URL

Now make different paths perform different tasks:

<p align="center"><img src="scriptImage04_pixel_control.png" alt="Control a pixel with HTTP paths" width="720"></p>

After the program receives a request:

- Path `/on`: turn on the pixel at `(3,3)` and respond with `ON`.
- Path `/off`: turn off the pixel at `(3,3)` and respond with `OFF`.

Open these addresses in the browser:

```text
CoCube_IP_address/on
CoCube_IP_address/off
```

After you open `/on`, the browser displays `ON` and the pixel on CoCube turns on.

<p align="center"><img src="pixel_on.png" alt="Open the on path" width="360"></p>

The important part is not the `ON` text on the page. The browser has sent a command to CoCube through the request path.

### 6. Control CoCube from the browser

Replace the pixel commands with robot actions to turn the browser address bar into a simple remote control.

<p align="center"><img src="scriptImage05_robot_control.png" alt="Control CoCube with HTTP paths" width="720"></p>

The program uses four paths:

| Request path | CoCube action |
| --- | --- |
| `/forward` | Move forward |
| `/backward` | Move backward |
| `/left` | Turn left |
| `/right` | Turn right |

Open these addresses one at a time:

```text
CoCube_IP_address/forward
CoCube_IP_address/backward
CoCube_IP_address/left
CoCube_IP_address/right
```

For example, opening:

```text
172.20.10.2/forward
```

makes CoCube move forward.

After checking the path, the program returns the received path to the browser:

| Request path | CoCube action | Browser display |
| --- | --- | --- |
| `/forward` | Move forward | `/forward` |
| `/backward` | Move backward | `/backward` |
| `/left` | Turn left | `/left` |
| `/right` | Turn right | `/right` |

The response block is placed after the path checks. Whenever a request arrives, the browser receives a response promptly, even if the path does not match an action.

### 7. Troubleshooting

#### The browser cannot open the CoCube address

- Confirm that CoCube has connected to Wi-Fi and displays an IP address.
- Confirm that the computer or phone is connected to the same Wi-Fi network as CoCube.
- Enter `http://` explicitly, not `https://`.
- Check that the IP address matches the one on the TFT screen.
- Some school, hotel, and public networks isolate devices. Try a phone hotspot instead.

#### The browser keeps loading

- Check whether the program received an HTTP request.
- Make sure the **respond to HTTP request** block is after the path checks.
- Make sure the response block is still inside the condition that checks whether `request` is not empty.

#### The robot does not move

- The path must begin with `/`.
- Paths are case-sensitive: `/forward` and `/Forward` are different.
- Check that the CoCube motion blocks work by themselves.

### 8. Extension: a web remote control

Changing the browser address for every command is inconvenient. CoCube can also serve a control page with buttons.

[Open the complete web remote-control program in MicroBlocks][web-remote-program]

Enter the Wi-Fi name and password in the complete program and run it. On a phone or computer, open the IP address shown on the CoCube screen. Hold a direction button to move the robot and release it to stop. The page also updates the CoCube position and direction automatically.

This program includes HTML, CSS, and JavaScript and is more complex than the previous examples. You do not need to understand all of it yet. Its core still uses the HTTP requests from this lesson:

| Request path | Action |
| --- | --- |
| `/forward` | Move forward |
| `/backward` | Move backward |
| `/left` | Turn left |
| `/right` | Turn right |
| `/stop` | Stop the wheels |
| `/position` | Read the position and direction |

The web page replaces manually typed addresses with buttons. Pressing a button sends a movement request, and releasing it sends `/stop`. This is the basic idea behind controlling a robot from a web page.

[web-remote-program]: https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27HTTP%20server%27%20%27TFT%27%20%27WiFi%27%0A%0Aspec%20%27r%27%20%27control%20page%27%20%27control%20page%27%0Ato%20%27control%20page%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27page%20style%27%29%20%27%3Ch2%3ECoCube%20Control%3C%2Fh2%3E%0A%3Cp%3E%0A%20%20X%3A%20%3Cspan%20id%3D%22x%22%3E%27%20%28%27CoCube%20position_X%27%29%20%27%3C%2Fspan%3E%0A%20%20Y%3A%20%3Cspan%20id%3D%22y%22%3E%27%20%28%27CoCube%20position_Y%27%29%20%27%3C%2Fspan%3E%0A%20%20Angle%3A%20%3Cspan%20id%3D%22angle%22%3E%27%20%28%27CoCube%20direction%27%29%20%27%3C%2Fspan%3E%0A%3C%2Fp%3E%27%20%28%27page%20buttons%27%29%20%28%27page%20script%27%29%20%28%27position%20script%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27page%20buttons%27%20%27page%20buttons%27%0Ato%20%27page%20buttons%27%20%7B%0A%20%20return%20%27%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22forward%22%3EForward%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22left%22%3ELeft%3C%2Fbutton%3E%0A%20%20%3Cbutton%20data-command%3D%22right%22%3ERight%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22backward%22%3EBackward%3C%2Fbutton%3E%0A%3C%2Fp%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20script%27%20%27page%20script%27%0Ato%20%27page%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20send%28command%29%20%7B%0A%20%20%20%20fetch%28%22%2F%22%20%2B%20command%2C%20%7Bcache%3A%20%22no-store%22%7D%29%3B%0A%20%20%7D%0A%0A%20%20function%20stop%28%29%20%7B%0A%20%20%20%20send%28%22stop%22%29%3B%0A%20%20%7D%0A%0A%20%20for%20%28const%20button%20of%20document.querySelectorAll%28%22button%22%29%29%20%7B%0A%20%20%20%20button.onpointerdown%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%20%20%20%20button.setPointerCapture%28event.pointerId%29%3B%0A%20%20%20%20%20%20send%28button.dataset.command%29%3B%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20button.onpointerup%20%3D%20stop%3B%0A%20%20%20%20button.onpointercancel%20%3D%20stop%3B%0A%20%20%7D%0A%0A%20%20window.onblur%20%3D%20stop%3B%0A%20%20document.oncontextmenu%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%20%20document.onselectstart%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20style%27%20%27page%20style%27%0Ato%20%27page%20style%27%20%7B%0A%20%20return%20%27%3C%21doctype%20html%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%22%3E%0A%3Cstyle%3E%0A%20%20body%20%7B%0A%20%20%20%20text-align%3A%20center%3B%0A%20%20%20%20font%3A%2022px%20Arial%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%0A%20%20button%20%7B%0A%20%20%20%20width%3A%2090px%3B%0A%20%20%20%20height%3A%2060px%3B%0A%20%20%20%20margin%3A%206px%3B%0A%20%20%20%20font-size%3A%2018px%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%3C%2Fstyle%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27position%20data%27%20%27position%20data%27%0Ato%20%27position%20data%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27position%20script%27%20%27position%20script%27%0Ato%20%27position%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20updatePosition%28%29%20%7B%0A%20%20%20%20fetch%28%22%2Fposition%22%2C%20%7Bcache%3A%20%22no-store%22%7D%29%0A%20%20%20%20%20%20.then%28function%20%28response%29%20%7B%0A%20%20%20%20%20%20%20%20return%20response.text%28%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.then%28function%20%28text%29%20%7B%0A%20%20%20%20%20%20%20%20const%20position%20%3D%20text.split%28%22%2C%22%29%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22x%22%29.textContent%20%3D%20position%5B0%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22y%22%29.textContent%20%3D%20position%5B1%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22angle%22%29.textContent%20%3D%20position%5B2%5D%3B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20300%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.catch%28function%20%28%29%20%7B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20500%29%3B%0A%20%20%20%20%20%20%7D%29%3B%0A%20%20%7D%0A%0A%20%20updatePosition%28%29%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27%20%27%20%27run%20path%27%20%27run%20path%20_%27%20%27auto%27%20%27%2Fforward%27%0Ato%20%27run%20path%27%20path%20%7B%0A%20%20if%20%28path%20%3D%3D%20%27%2Fforward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fbackward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fleft%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fright%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fstop%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20341%20-24%20%7B%0AwhenStarted%0AwifiConnect%20%27Network_Name%27%20%27%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Open%20this%20address%3A%27%205%205%20%28colorSwatch%20255%20255%20255%20255%29%202%20false%0A%27%5Btft%3Atext%5D%27%20%28getIPAddress%29%205%2035%20%28colorSwatch%2080%20210%20230%20255%29%202%20false%0Aforever%20%7B%0A%20%20local%20%27request%27%20%28%27%5Bnet%3AhttpServerGetRequest%5D%27%29%0A%20%20if%20%28request%20%21%3D%20%27%27%29%20%7B%0A%20%20%20%20local%20%27path%27%20%28%27path%20of%20request%27%20request%29%0A%20%20%20%20if%20%28path%20%3D%3D%20%27%2Ffavicon.ico%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2Fposition%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27position%20data%27%29%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2F%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27control%20page%27%29%20%27Content-Type%3A%20text%2Fhtml%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%27run%20path%27%20path%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%27OK%27%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20waitMillis%2020%0A%7D%0A%7D%0A%0A
