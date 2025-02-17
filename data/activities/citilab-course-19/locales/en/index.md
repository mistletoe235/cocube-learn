### Controlling the Robot with AppInventor

#### AppInventor

- AppInventor is a block programming environment created by Google Labs at the end of 2008 to develop Android applications.

![Kids programming in AppInventor](cm19-01-kids_programming.png)

- Allows you to create applications in an easier way and in less time than with other more complex environments.

- Apps can be tested in real-time before being compiled and installed on the device.

- It has many tutorials to learn independently in addition to a very large community that shares its projects.

![AppInventor Tutorials](cm19-02-appinventor_tutorials.png)

#### Getting started with AppInventor

- Go to [AppInventor](https://code.appinventor.mit.edu) website.

- Click on the button that says **Create Apps!**.

- Click on "Continue Without An Account", or enter your Google account credentials if you have them.

- Click on **Continue** in the welcome window that appears below.

![AppInventor Welcome Screen](cm19-03-appinventor_welcome.png)

#### Create a new project

- **Optional:** Change the language by clicking on **English** (above and on the right) and select your preferred language.

- Create a new project by clicking "**Projects > Create a new project…**".

![Create New Project](cm19-04-new_project.png)

- Name it (for example **RobotED1**) and accept.

![Name the Project](cm19-05-set_project_name.png)


#### Synchronize with the Companion

- Download the **AppInventor 2 Companion** to your Android smartphone or tablet and open it.

![Download Companion](cm19-06-download_companion.png)

- Click on **Connect > AI Companion**.

![Connect the Companion](cm19-07-connect_companion.png)

- Scan the QR code with the **Scan QR Code** option or write the code directly.

![Scan QR Code](cm19-08-qr_code.png)

- **NOTE: The computer and device must be on the same network**.

#### Adding buttons

- We will start by adding buttons to be able to send commands to the robot. To add one, drag the **Button** element from the **Palette** to the **Viewer**.

![Add button](cm19-09-add_button.png)

- Then we can change the names of these buttons by selecting them and clicking below where it says **Rename** (putting **Next Button** for example).

![Rename](cm19-10-rename.png)

- We can also change the text it shows by going to the **Properties** section and modifying the **Text** property, introducing a new one (putting **Next** for example).

![Edit text](cm19-11-set_text.png)

##### Challenge 1: Add 3 more buttons and change their name and display text.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm19-s1.png" title="Solution challenge 1">
</details>

#### Organize the buttons

- By default AppInventor places the screen components one under the other. To organize the components we need the elements found in the **Layout** category.

- If we want to place the buttons in a distributed manner on the screen, we can use the **TableArrangement** component.

![![Table Arrangement](cm19-12-table_arrangement.png)](cm19-12-table_arrangement.png)

##### Challenge 2: Place the buttons like those on a remote control.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 2</summary>
    <img src="cm19-s2a.png" title="Tabular Container Properties"> <img src="cm19-s2b.png" title="Button Table">
</details>

#### Change button size

- When we add a visual component to our application they have the **Height** and **Width** properties set as **Automatic**. This means that their content is adjusted, as in the case of text of the buttons  .

- If we want to make the buttons have regular dimensions (square shape) we can assign a specific value of pixels in both properties, for example **100**.

![Rename](cm19-13-buttons_size.png)

![Square button](cm19-14-square_button.png)

#### Detect pressed button

- To start programming the application, go to the **Blocks** section, next to **Designer**.

![Section Blocks](cm19-15-blocks_section.png)

- Once inside, to detect when we press a button, select it in the **Blocks** section and take the **when Button.Click** block.

![Button Blocks](cm19-16-button_blocks.png)

![when Button click](cm19-17-when_button_click.png)

#### Send web requests

- In order to send web requests we need the **Web** component in the **Connectivity** category.

![Web Component](cm19-18-web_component.png)

- To make a web request you must first use the **set Web1 block. Url** specifying the address and then use the **call Web1.Get** block to execute the request.

![Web URL Block](cm19-19-web_url_block.png)

![Block Web get](cm19-20-web_get_block.png)

- To put the address we must use the first block available in the **Text** category.

![Text block](cm19-21-text_block.png)

![URL text block](cm19-22-text_block_url.png)

##### Challenge 3: Make each button execute the corresponding web request when pressed.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 3</summary>
    <img src="cm19-s3.png" title="Solution challenge 3">
</details>

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-18-en) | [Next activity ➡️](../citilab-course-20-en) |
|--|--|

[[/fact]]
