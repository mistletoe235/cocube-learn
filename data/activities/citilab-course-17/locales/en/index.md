[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Controlling the Robot with WiFi

#### WiFi connection

- To connect the board to a WiFi network or create one of your own, you need to import the **WiFi** library that is inside the **Network** folder.

![WiFi Library](cm17-01-llibreria-wifi.png)

- Once the library is open, we will use the corresponding block to connect to a Wi-Fi network by entering both the name of this network and the password.

![connect to WiFi bllock](cm17-02-bloc-connectar.png)

- If we want to see the IP address assigned by the network to the board, we can use the IP address block.

![IP address block](cm17-03-bloc-ip.png)

##### Challenge 1: Make a program that displays the IP address on the screen

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm17-s1.png" title="Solution challenge 1">
</details>

#### Web server

-To start a web server, you need to import the **HTTP Server** library which is also in the **Network** folder.

![HTTP Server](cm17-04-llibreria-server.png)

- The basic blocks to be able to manage requests to the server and to send responses are those of "HTTP request to the server", "path of the request []" and "reply [] to the HTTP request".

![HTTP server blocks](cm17-05-blocs-server.png)

#### Receiving requests

- When a client connects to the HTTP server, its request is recorded in the "**HTTP request ...**" block.

- As they are actually text strings, one way to see if there is a request or not is to check that this block returns an empty result.

![Receive requests 1](cm17-06-peticions1.png)

If you also want to respond with a text, click on the arrow in the "**respond …**" block and then change the text of the content.

![Receive requests 2](cm17-07-peticions2.png)

![Receive requests 3](cm17-08-peticions3.png)

##### Challenge 2: Run a web server on the board that responds with text to any request

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 2</summary>
    <img src="cm17-s2.png" title="Solution challenge 2">
</details>

#### Application path

- For a web server to perform different actions according to the request received, routes or **paths** are used.

![Paths 1](cm17-09-camins1.png)

- The path of a web request is the text that we put after the name of an IP address or web domain in the browser bar, including the slash (/).

![Paths 2](cm17-10-camins2.png)

- It is important to know that the "request ..." block is emptied every time it is used, so you need to save its result to be able to work with it (for example with a variable).

![Paths 3](cm17-11-camins3.png)
![Paths 4](cm17-12-camins4.png)

##### Challenge 3: Make a web server that acts as an "echo", answering the same path text

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 3</summary>
    <img src="cm17-s3.png" title="Solution challenge 3">
</details>

#### Manage requests

- Now that we know how to identify the path used in the request we can make the board do things besides respond via web.

- For example we can turn on or off the integrated LED of the sending board by specifying the "on" and "off" commands through the path to the request.

- It's important to add a block that **responds with something by default** if you don't use any of the established paths, otherwise the browser will hang waiting for a response.

![LED controlled with HTTP](cm17-13-led-server.png)

##### Challenge 4: Make the robot move by sending commands through the browser

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 4</summary>
    <img src="cm17-s4.png" title="Solution challenge 4">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-16-en) | [Next activity ➡️](../citilab-course-18-en) |
|--|--|

[[/fact]]
