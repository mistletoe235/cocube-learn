### MicroBlocks 三角函数绘图

三角函数听起来像数学课里的公式，但在编程里，它更像一个“画圆和画波浪的工具”。只要会使用 `sin`，我们就可以在 CoCube 的 TFT 屏幕上画出圆形轨迹、波浪曲线、万花筒图案，甚至做一个小小的天体行星模型。

本案例会重点学习 MicroBlocks 中的 `fixed sine` 积木，并用它完成几个图形项目。

程序文件：

- [`trigonometric_functions.ubp`](trigonometric_functions.ubp)：包含正弦测试、曲线、圆形、万花筒。
- [`planet.ubp`](planet.ubp)：包含天体行星模型。

#### 1. sin 和 cos 是什么

先从一个圆开始理解三角函数。

想象从圆心出发，画一条长度为 `r` 的线，线的末端是点 `P(x, y)`。这条线和 x 轴之间的夹角是 `θ`。

![sin 和 cos 的定义](sin_cos_definition.png)

这时可以这样理解：

cos(θ) = x / r<br>
sin(θ) = y / r

换一种更适合编程画图的写法：

x = r × cos(θ)<br>
y = r × sin(θ)

也就是说：

- `cos` 负责算出这个点在水平方向上离圆心多远。
- `sin` 负责算出这个点在竖直方向上离圆心多远。

如果让 `θ` 从 `0` 度慢慢变到 `360` 度，点 `P` 就会绕圆心走一圈。后面画圆、画万花筒、画行星轨道，都是从这个想法变出来的。

#### 2. 找到 MicroBlocks 里的 fixed sine

MicroBlocks 里默认不显示三角函数积木，需要先添加系统积木库：

1. 点击“添加积木库”。
2. 选择“系统”。
3. 找到并添加 `miscPrims`。
4. 在积木区里找到 `fixed sine 9000`。

![fixed sine 积木](1_sine_function.png)

这里有一个容易困惑的地方：`fixed sine 9000` 里的 `9000` 不是 9000 度，而是 `90.00` 度。

MicroBlocks 这个积木使用“角度乘以 100”的写法：

```text
0 度      写成 0
30 度     写成 3000
45 度     写成 4500
90 度     写成 9000
180 度    写成 18000
360 度    写成 36000
```

所以，如果变量 `t` 表示普通的角度，例如 `t = 90`，在 `fixed sine` 里要写成：

```text
t * 100
```

#### 3. 为什么要除以 16384 或右移 14 位

在数学里：

```text
sin(90°) = 1
sin(30°) = 0.5
```

但是 MicroBlocks 里仅仅使用整数运算。为了避免小数，`fixed sine` 会把结果放大 `16384` 倍。

例如：

```text
fixed sine 9000 = 16384
fixed sine 3000 ≈ 8192
fixed sine 0 = 0
```

所以，要把它变回我们熟悉的比例，需要除以 `16384`：

![除以 16384](2_sine_16384.png)

也可以右移 14 位：

![右移 14 位](3_sine_14.png)

因为：

```text
2^14 = 16384
```

所以：

```text
右移 14 位 约等于 除以 16384
```

在画图时，常见写法不是先求 `sin`，再得到小数，而是先乘半径，再右移 14 位：

```text
100 * fixed sine 9000 >> 14
```

这句话的意思是：

```text
100 * sin(90°)
```

它的结果是 `100`。

#### 4. 先试几个角度

先不要急着画复杂图形，可以先测试不同角度的结果。

![sin 和 cos 测试程序](4_sin_cos_test.png)

测试 `100 * sin(角度)` 时，可以试这些角度：

```text
100 * sin(0°)   ≈ 0
100 * sin(30°)  ≈ 50
100 * sin(45°)  ≈ 70
100 * sin(60°)  ≈ 86
100 * sin(90°)  ≈ 100
```

在程序里对应写法是：

```text
100 * fixed sine 0 >> 14
100 * fixed sine 3000 >> 14
100 * fixed sine 4500 >> 14
100 * fixed sine 6000 >> 14
100 * fixed sine 9000 >> 14
```

那 `cos` 怎么办？

在这个程序里，我们用 `sin` 来表示 `cos`：

```text
cos(t) = sin(t + 90°)
```

因为 `fixed sine` 的角度要乘以 100，所以程序里写成：

```text
fixed sine (t * 100 + 9000)
```

例如：

```text
100 * cos(30°)
= 100 * sin(30° + 90°)
= 100 * fixed sine (3000 + 9000) >> 14
```

可以修改角度 `t`，观察 `sin(t)` 和 `cos(t)` 的变化：

- `t = 0` 时，`sin(t)` 接近 `0`，`cos(t)` 接近 `100`。
- `t = 90` 时，`sin(t)` 接近 `100`，`cos(t)` 接近 `0`。
- `t = 180` 时，`sin(t)` 接近 `0`，`cos(t)` 接近 `-100`。

#### 5. 绘制 y = 100 * sin(3x) 的曲线

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_sinx.mp4" type="video/mp4">
</video>

现在开始画第一条曲线：

```text
y = 100 * sin(3x)
```

程序的核心是让 `i` 从左到右变化，把它当作屏幕上的 x 坐标。每一个 `i` 都计算一个对应的 y 坐标，然后在屏幕上画一个像素点。

![正弦曲线程序](6_sint.png)

核心写法是：

```text
x = i
y = 120 - (100 * fixed sine (3 * i * 100) >> 14)
```

这里有三个重点：

1. `100` 是波浪的高度。改成 `50`，波浪会变矮；改成 `110`，波浪会更高。
2. `3 * i` 表示角度变化更快。改成 `1 * i`，波浪更平缓；改成 `5 * i`，波浪更密。
3. `120 - ...` 是因为 TFT 屏幕的 y 轴向下增大。数学里的 y 越大越向上，但屏幕里的 y 越大越向下，所以要用减法。

可以再尝试这些参数：

```text
y = 50 * sin(3x)
y = 100 * sin(1x)
y = 100 * sin(5x)
y = 80 * sin(2x)
```

观察问题：

- 改变前面的 `100`，图形发生了什么变化？
- 改变 `3x` 里的 `3`，图形发生了什么变化？
- 如果把 `120 -` 改成 `120 +`，曲线会怎样？

#### 6. 绘制万花筒

万花筒图案可以看成“半径也在变化的圆”。

画圆时，半径是固定的：

```text
r = 100
```

画万花筒时，半径跟着角度变化：

```text
r = 10 * sin(n * t)
```

再用这个变化的 `r` 去计算坐标：

```text
x = r * 10 * cos(t)
y = r * 10 * sin(t)
```

![万花筒程序](7_Kaleidoscope.png)

这里的 `n` 是最值得修改的参数。它会影响图案的花瓣数量和对称感。

下面是不同 `n` 的效果：

![n 等于 3](Kaleidoscope_n=3.png)

![n 等于 4](Kaleidoscope_n=4.png)

![n 等于 5](Kaleidoscope_n=5.png)

![n 等于 6](Kaleidoscope_n=6.png)

课堂上可以让每个小组选择一个 `n`，再修改颜色和圆点大小，做出自己的万花筒。

可以尝试：

```text
n = 2
n = 3
n = 4
n = 5
n = 6
圆点半径 = 1
圆点半径 = 3
圆点半径 = 5
```

观察问题：

- `n` 变大后，图案更简单还是更复杂？
- 偶数的 `n` 和奇数的 `n`，图案对称性有什么不同？
- 如果把颜色改成随机颜色，会发生什么？

#### 7. 绘制圆形

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_circle.mp4" type="video/mp4">
</video>

画圆时，需要同时使用 x 和 y：

```text
x = 100 * cos(t)
y = 100 * sin(t)
```

在屏幕上，我们把圆心放在 `(120, 120)`，所以实际画点的位置是：

```text
屏幕 x = 120 + x
屏幕 y = 120 - y
```

![圆形程序](5_circle.png)

对应到 MicroBlocks 里：

```text
x = 120 + (100 * fixed sine (t * 100 + 9000) >> 14)
y = 120 - (100 * fixed sine (t * 100) >> 14)
```

其中：

- `fixed sine (t * 100 + 9000)` 表示 `cos(t)`。
- `fixed sine (t * 100)` 表示 `sin(t)`。
- `100` 是圆的半径。
- `t` 从 `0` 变化到 `359`，刚好绕一圈。

可以尝试：

```text
半径 = 30
半径 = 60
半径 = 100
等待 = 1 毫秒
等待 = 20 毫秒
```

半径越大，圆越大；等待时间越短，画得越快。

#### 8. 天体行星模型

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_palnet.mp4" type="video/mp4">
</video>

最后把圆形轨迹变成一个小小的天体模型。

前面画圆时，我们画的是一个个像素点。现在把每个点放大成小圆，就像一颗行星沿着轨道运动。

![天体行星程序](8_planet.png)

程序里定义了一个自定义积木：

```text
planet radius _ speed _ color _ size _
```

它有四个参数：

- `radius`：轨道半径，决定行星离中心多远。
- `speed`：运动速度，决定行星转得快不快。
- `color`：行星颜色。
- `size`：行星大小。

自定义积木内部仍然使用同一组圆形公式：

```text
x = radius * cos(t)
y = radius * sin(t)
```

在 MicroBlocks 中写成：

```text
x = radius * fixed sine (t * 100 + 9000) >> 14
y = radius * fixed sine (t * 100) >> 14
```

屏幕位置：

```text
屏幕 x = 120 + x
屏幕 y = 120 - y
```

这个程序按下 A 键后，会先画出中间的太阳，再广播 `go!`，让不同轨道的行星同时开始运动。

例如：

```text
planet radius 30  speed 50  size 3
planet radius 50  speed 20  size 5
planet radius 70  speed 10  size 7
planet radius 100 speed 5   size 9
```

留给你思考：

- 半径越大的行星，是不是一定要转得更慢？
- 如果让最外圈行星转得最快，画面会有什么感觉？
- 如果每颗行星都不擦除上一帧，会不会画出轨道？
- 如果给每颗行星不同颜色，能不能做成“太阳系时钟”？
