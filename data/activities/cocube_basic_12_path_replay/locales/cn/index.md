### 1. 案例目的

想不想让机器人学会“记路”和“自己再走一遍”呢？不知道大家有没有玩过“跟着脚印走回去”的小游戏，虽然听起来简单，却很考验机器人的“记忆力”。在本案例中，我们将通过编程让 CoCube 机器人自己记住走过的每一步路，并让它完整地重复一遍，带你体验从轨迹记录到路线回放的完整过程。

### 2. 使用材料

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
![comap](comap.png =420x*)
### 3. 软件平台

[MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![microblocks cocube](microblocks_cocube.png =520x*)
### 4. 理论小知识

#### 需要使用到的积木说明：
1. **列表积木**：在“数据”积木库里，有一个叫 “列表” 的积木。刚拿出来的时候，它里面可能带着默认的内容“cat”。别担心！只要点击它左边那个灰色的小三角形，它就会变成一个空列表，就像一张干干净净的空白表格，等着你往里面填东西。

![list](list.png)

![empty list](empty_list.png)
2. **列表存储：**有了“列表”这个“大仓库”，我们就可以把零散的数据信息整整齐齐地存进去、随时取出来啦！

不过，光有仓库还不够，我们还需要一个往仓库里放东西的积木。这个积木会把新物品自动放在仓库的最后面（就像排队一样，新来的站队尾）。

它有两个参数要填：

* 前一个空格：你要放进仓库的“东西”（比如一个数字、一个字母）。

* 后一个空格：你要放进哪个“仓库”（选择你之前创建的那个列表）。

![append to list](append_to_list.png)

PS：当看到这，尝试一下，将列表积木填入后，是不是会出现你想要的结果。

* **列表读取：**当我们把东西整整齐齐地放进“仓库”之后，下一步最关键的是：怎么从某个位置把它再取出来用？

就像你在图书馆里放了一本书，想知道它在第几排第几格，然后把它拿回来。

这就需要用到另一个“读取积木”——它能帮你根据位置编号（索引），从仓库里精准地取出你想要的那一项数据

![read list](read_list.png)
* **变量初始化：**想让机器人记住一个数字、一个名字，随时都能拿出来用吗？那就得给它准备一个专属的小盒子——这个盒子在编程里叫做“变量”。

怎么找到这个小盒子呢？很简单：

* 先找到橙色的“变量”积木库。

* 在积木库的最左上角，有一个按钮叫 “新建一个变量”。

* 点击创建变量。

![variable category](variable_category.png)

![create variable](create_variable.png)

为了确保变量在使用前有一个确定的起点，我们通常会在创建时对其进行初始化。同时也需要在后续“值”发生变化时，对其进行改变。

![local variable init](local_variable_init.png)

局部变量初始化

![set variable](set_variable.png)

变量设置

PS：局部变量，只在当前的积木块中有用。

* **仓库命名：**如果直接把普通列表当作‘仓库’，会遇到一个棘手的问题：**缺乏标签**。试想，如果面前摆着两个一模一样的列表仓库，我们该如何判断数据究竟藏在哪个里面呢？因此我们可以借助变量来帮助我们给仓库命名。通过如图操作，我们就给我们的“目标仓库”取了名字“list\_x”

![named list](named_list.png)
### 5. 让机器人具备记忆能力

1. **制作变量与仓库：**为了让机器人能够有记忆能力，应该怎么做呢？

我们肯定要先给它设计一个存储记忆的地方，因此我们建立一个有名字的‘仓库’（列表），用于后续存放机器人的坐标数据。同时，引入一个索引变量作为‘账本’，时刻追踪仓库中存了多少个位置，让数目一目了然。

![create lists](create_lists.png)
* **存储位置：**接下来，我们就要把机器人走过的“足迹”（也就是地图上的 X 坐标和 Y 坐标）分别存进两个对应的列表里。这里有一个非常重要的小规则：

第 1 个 X 坐标必须和第 1 个 Y 坐标同时存储，第 2 个跟第 2 个，依次类推。也就是说，两个列表里相同位置上的数据要配对好，就像一双鞋子，左脚和右脚要对应上。这样才能保证我们后面取数据的时候，X 和 Y 不会“串位”。这么做的好处是什么呢？

![save position](save_position.png)

我们知道，同一个点位的这两个坐标是同时出现的，我们把它捆绑在一起，所以我们可以把它们捆绑在一起来记忆，这样就不用分别记两个单独的位置啦，大大降低了记忆的难度。不需要再额外分别记忆两个的位置，这可以大大节省记忆的难度，就好像在你学习的时候是不是类似的东西，往往会联想到一块。

![paired coordinates](paired_coordinates.png)

其实，我们还可以更进一步：把 X 和 Y 两个坐标直接“粘”在一起，当作一个点，整个儿放进一个仓库（列表）里。这样就不用分两个列表来记啦，一个列表就能搞定所有点的坐标，省心又省力！就像你把作业本和笔袋一起放进书包，不用分开找两次。

### 6. 实现记忆中的路径移动

1. **路径复现：**还记得以前学过的知识吗？只要告诉 CoCube 一个目标点的坐标，它就能又快又准地跑过去！

那么，想让机器人重复之前记忆的路，关键就变成了：把“仓库”里存好的坐标，一个一个取出来，再用“移动到目标点”积木，指挥机器人按顺序走一遍。路线就完整复现啦！

![read route](read_route.png)

你看，这里我们取出的都是两个仓库里的第 1 项坐标——这正好体现了前面说的“坐标捆绑”：X 的第 1 项和 Y 的第 1 项是一对。

你可能会问：为什么是第 1 项呢？

答案很简单：因为我们是按顺序把坐标一个一个存进仓库的——先走过的路，就先存进去。

所以，第 1 项就是机器人第一个记下的位置，就像排队一样，谁先来谁排在最前面。

* 有没有想过接下来更多的坐标该如何实现复现呢？

熟练使用带“变化因子i”的“重复执行”的你，一定能快速想到，我们可以获取仓库的长度，并使用这个积木去逐项读取我们的坐标对不对？当然是可以的

![for index](for_index.png)

今天我们来学一种新方法，叫“边取边删”。什么意思呢？当我们从仓库里取出第 1 项坐标之后，这一项就已经用完了，不再需要了。那我们就干脆把它删掉！

删掉之后，原来的第 2 项就会自动往前移动，变成新的第 1 项。这样一来，我们每次只需要取第 1 项就行，不用费心去记“这次该取第几个”了。就像排队买东西，第一个人买完就走了，后面的人自然就站到了第一个位置。是不是很简单？这种方法下，我们的“列表”有一个专业的名词叫做“栈”的数据结构，先存储的先删除。

![delete first item](delete_first_item.png)

你可能会发现，如果一直“边取边删”，外面的那个“重复执行”就会没完没了地跑下去——就像一台停不下来的跑步机，永远不让你下来。这可不行！我们需要在合适的时候打断它。这时候就要使用 “退出循环” 积木啦！，这个积木需要你先打开设置里的“高级模式”，然后从“控制”积木库的最下方找到。

![exit loop](exit_loop.png)

当然我们也可以使用，“重复执行，直到”积木来代替，这个“如果”+“重复执行”的组合：

![repeat until empty](repeat_until_empty.png)
### 7. 操作指南

1. **制作目录：**为了让操作更一目了然，咱们可以先用 CoCube 自带的 “TFT” 屏幕把要用到的功能写在上面，就像游戏菜单一样，利用一个“start”自定义积木来完成该功能。然后利用 CoCube 机器人身上的实体 A、B 按键来指挥它：

   * 按 A 键 → 机器人开始 “记录”（Record）自己走过的位置

   * 按 B 键 → 机器人 “开始复现”（Start）之前存好的路线

   * 同时按下 A + B → “重置”（Restart）清空所有存储的坐标，重新开始

![start menu](start_menu.png)
* **Restart：**如果前面采用的是“边取边删”的办法，那我们的“Restart”就可以非常简单，只用停止所有任务，重新回到目录界面就行。

![ab restart](ab_restart.png)

如果使用的是“带变化因子i的”积木，我们可以把删除记忆放在这里：

![ab restart delete memory](ab_restart_delete_memory.png)

使用上述讲解过程实现机器人的位置存储与路径复现功能，结合“TFT”显示与音乐设计，使整个过程更有趣。

<video controls style="width: 320px; max-width: 100%; height: auto;">
  <source src="path_replay_demo.mp4" type="video/mp4">
</video>

[参考代码示例：MicroBlocks——CoCube案例 路径复现](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27TFT%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27start%27%20%27start%27%0Ato%20start%20%7B%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%3A%20Record%27%2010%2060%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27B%3A%20Start%27%2010%20100%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%2BB%3A%20Restart%27%2010%20140%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%7D%0A%0Ascript%20416%2065%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27%5Btft%3Aclear%5D%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0Astart%0A%7D%0A%0Ascript%20602%2065%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0Aif%20%28%28size%20list_x%29%20%3D%3D%200%29%20%7B%0A%20%20list_x%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20list_y%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20num%20%3D%200%0A%7D%0Aif%20%28%27CoCube%20on%20the%20mat%27%29%20%7B%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_X%27%29%20list_x%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_Y%27%29%20list_y%0A%20%20num%20%2B%3D%201%0A%20%20sendBroadcast%20%27show%20number%27%0A%7D%0A%7D%0A%0Ascript%20416%20508%20%7B%0AwhenStarted%0Acomment%20%27%E5%B0%86CoCube%E6%94%BE%E7%BD%AE%E5%9C%A8CoMaps%E5%9C%B0%E5%9B%BE%E4%B8%8A%E7%9A%84%E4%B8%8D%E5%90%8C%E4%BD%8D%E7%BD%AE%EF%BC%8C%0A%E6%8C%89%E4%B8%8BA%E9%94%AE%E8%AE%B0%E5%BD%95%E6%AF%8F%E4%B8%80%E4%B8%AA%E5%9D%90%E6%A0%87%EF%BC%8C%0A%E6%8C%89%E4%B8%8BB%E9%94%AE%EF%BC%8CCoCube%E5%B0%86%E6%8C%89%E9%A1%BA%E5%BA%8F%E7%A7%BB%E5%8A%A8%E5%88%B0%E8%BF%99%E4%BA%9B%E5%9D%90%E6%A0%87%E4%BD%8D%E7%BD%AE%E3%80%82%27%0Acomment%20%27Place%20the%20CoCube%20at%20different%20locations%20on%20the%20CoMap.%0APress%20the%20A%20button%20to%20record%20each%20coordinate.%0AAnd%20then%20press%20the%20B%20button%2C%20the%20CoCube%20will%20move%20to%20these%20recorded%20locations%20in%20sequence.%27%0Astart%0A%7D%0A%0Ascript%20416%20741%20%7B%0AwhenBroadcastReceived%20%27show%20number%27%0A%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%27play%20tone%27%20%27nt%3Bg%27%200%20150%0AwaitMillis%20200%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20416%20971%20%7B%0AwhenButtonPressed%20%27B%27%0Anum%20%3D%200%0A%27%5Btft%3Atext%5D%27%20%270%27%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0Aforever%20%7B%0A%20%20if%20%28%28size%20list_x%29%20%21%3D%200%29%20%7B%0A%20%20%20%20%27CoCube%20move%20to%27%20%28at%201%20list_x%29%20%28at%201%20list_y%29%2040%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_x%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_y%0A%20%20%20%20num%20%2B%3D%201%0A%20%20%20%20%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20150%0A%20%20%7D%20else%20%7B%0A%20%20%20%20waitMillis%20300%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20exitLoop%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20976%201240%20%7B%0Ato%20start%20%7B%7D%0A%7D%0A%0A)
