[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Visualize Sound Volume

#### Color gradient

- In this unit we will make a colored bar, to represent the volume of the sound. The Neopixel strip will light up from green to red, passing through yellow.

- One way to do this would be to check the LED number and assign it a specific color, but it is an inefficient and not a very scalable method.

- It is possible to get a color (or rather, the RGB values ​​of it) from a single value using a block available in the library **Graphics > HSV Colors**.

![HSV Colors Library](cm07-01-llibreria-hsv.png)

![HSV blocks](cm07-02-bloc-hsv.png)

#### HSV to RGB

- This block allows us to obtain a color by specifying the **hue** (hue), **saturation** (saturation) and **brightness or value** (value).

- If we set the saturation and brightness values ​​to the maximum (100) we only need to vary the hue (H) from 0 to 360 to obtain any color.

  | ![HSV Model 1](cm07-03-hsv-model1.png) | ![HSV Model 2](cm07-04-hsv-model2.png) |
  | --------------------------------------------- | --------------------------------------------- |

- The result we get is a list with the RGB values ​​of the color. The saturation and brightness values ​​will respectively define the minimum and maximum value that these can obtain.

![HSV Example 1](cm07-05-hsv-e1.png)
![HSV Example 2](cm07-06-hsv-e2.png)
![HSV Example 3](cm07-07-hsv-e3.png)

##### Challenge 1: Find the range of values ​​to go from red to green

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm07-s1a.png" title="Solution challenge 1"><br>
    <b>Green</b><br>
    <img src="cm07-s1b.png" title="Solution challenge 1"><br>
    <b>Yellow</b><br>
    <img src="cm07-s1c.png" title="Solution challenge 1 "><br>
    <b>Red</b>
</details>

#### Get color from RGB values

Once we have the list of RGB values ​​of a color we will have to extract them one by one using the **element _ of _** block that we have in **Data**.

<img src="cm07-08-element1.png" title="Element 1 (R)">
<img src="cm07-09-element2.png" title="Element 2 (G)">
<img src="cm07-10-element3.png" title="Element 3 (B)">

Then we will use the block that allows us to get the numerical value of a color using its RGB values.

![Color of RGB values](cm07-11-color-elements.png)

#### Creation of custom blocks

- Although the block we formed earlier can be placed inside the one that turns on the NeoPíxel, visually it is a bit bulky.

- To solve this we can try to create a block where this process of obtaining the color is hidden by going to **My blocks** and clicking on Create a reporting block.

![Block creation step 1](cm07-12-bloc-nou1.png)
![Block creation step 2](cm07-13-bloc-nou2.png)

- After giving it a name (for example “**color with hues _**”) we will see that the block appears under the previous button in addition to its definition. The underscore is used to indicate that a parameter is required.

![Block creation step 3](cm07-14-bloc-nou3.png)
![Block creation step 4](cm07-15-bloc-nou4.png)

- We will click on the name of the args variable to change its name, and then click on the arrow next to it to configure the type of data it will receive (number/text, boolean or color)

![Block creation step 5](cm07-16-bloc-nou5.png)

- Now we will put below the definition the block we formed earlier to obtain the color. We will need the **return _** block that we have in the **Control** category.

- Then we will drag the variable to the first slot of the **RGB of hue _** blocks to pass the value we will enter.

![Creating the RGB block with tone _](cm07-17-bloc-nou-final.png).
#### Application of the new block

- All that remains is to use this block in the program of the previous unit, in order to obtain the color gradient.

- Since the range we want is from 0 to 120 and we have 10 LEDs, we will have to use a factor of 12.

![Color gradient](cm07-18-gradient.png)

- But is the order of the colors correct?

##### Challenge 2: Reverse the order of the gradient so it starts in green and ends in red

![Challenge 2](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm07-s2.png" title="Solution challenge 2">
</details>

#### Microphone

- Now we will change the potentiometer for a microphone, so that the volume of the sound it receives will be reflected in the number of illuminated NeoPixels.

- To use the microphone we will have to open the Sensing > Microphone library.

![Microphone library](cm07-19-llibreria-microfon.png)

![Microphone connection](cm07-20-microfon-connexio.jpg)

#### Last steps

- Finally, you just need to use the **loudness** block to capture the level of the sound that the microphone receives.

- We can "control" the sensitivity level of this by reducing the division factor of 1023 to a smaller value, for example half.

![Sound Volume](cm07-21-volum-so.png)

[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-06-en) | [Next activity ➡️](../citilab-course-08-en) |
|--|--|

[[/fact]]
