[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en). Check it out!
[[/fact]]

### Fantastic Robot with Memory

#### Lists

- To make the robot able to reproduce a few commands in a row, it is necessary to save them beforehand.

- We have already used variables to store numbers or texts. In this case we will use one to store a **list** of commands.

- Lists allow us to save a set of data that we can access individually.

- The **Data** category blocks are used to manipulate the lists.

![List blocks](cm15-01-lists.png)

![List Inputs](cm15-02-list_inputs.png)

![Item from a list](cm15-03-item_from_list.png)

#### Saving and deleting commands

- The block **add _ to list _** allows you to add items to a list, on the other hand with the block **remove item _ from list _** you can remove one or all the items from the list .

- Our robot will have to empty the command list when starting or when we press the **X** button. This can be done by saving an empty list to the variable, or using the remove-items block with the **all** option selected.

- Each movement button will save an identifier of the corresponding order. The **500 milliseconds** wait prevents many commands from being added when a button is pressed.

![Initialize Command list](cm15-s1.png)

![Delete Commands](cm15-s2.png)

![Add Command](cm15-s3.png)

#### Selecting and executing commands

- In the commands list we have the sequence of movements that we want the robot to execute.

![Variable with list of commands](cm15-04-orders.png)

- To access a command, use the block **item _ of list _**.

![Access an item](cm15-05-get_order.png)

- The control block **for *i* in _** allows iterating through the list. The value of ***i*** corresponds to each of the saved items or commands.

![Add command](cm15-s4.png)

- All that remains is to move the engines based on the commands in the list with the **OK button**.

##### Challenge 1: Program the robot with memory.

![Challenge](cm-challenge-en.png)

<details>
  <summary>Solution to challenge 1</summary>
    <img src="cm15-s5.png" title="Solution challenge 1">
</details>

#### Child ED1 robot

- The program used in schools with the Fantastic robot adds sounds and images to the screen to improve interactivity.

- You can download it from [here](https://cloud.citilab.eu/s/CK6ErCf6BdZEbtC).

![ED1 Child Robot Program](cm15-s6.png)

[![ED1 Child Robot](https://img.youtube.com/vi/ZGvE_8RV73w/0.jpg)](https://www.youtube.com/watch?v=ZGvE_8RV73w)


[[fact]]
This activity is part of the [Citilab Course](../citilab-course-en).

| [⬅️ Previous activity](../citilab-course-14-en) | [Next activity ➡️](../citilab-course-16-en) |
|--|--|

[[/fact]]
