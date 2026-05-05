### 1. BMP 图片介绍

BMP（Bitmap）是一种无损的、非压缩的位图图形格式，由微软开发。它像一张精密的“格子表”，将图像中的每个像素点颜色信息直接记录在文件里，不进行复杂的算法压缩。

由于画质完美、兼容性极佳，非常适合作为原始素材（但同时也有缺点是文件尺寸较大）。

MicroBlocks 支持在 TFT 屏幕上显示 BMP，下面我们用它做个石头剪刀布的小示例。

### 2. 准备工作

#### 步骤1：添加 BMP 图像库

在 MicroBlocks IDE 中，点击“添加积木库”，在“图形与显示”库文件夹下找到“BMP 图片”并添加。

在设置中，勾选“高级模式”，你将在左侧积木库中看到“文件”积木库。

![Code1](Add%20BMP%20library.png)

![Code2](advanced%20mode.png)

#### 步骤2：生成 BMP 图片素材

由于 BMP 文件体积巨大（因为它从不“偷懒”省略任何数据），且不支持透明图层，因此在互联网传输中并不常用。

不过没关系，我们可以用 PNG 图片生成 BMP 图片。

打开 [“PNG 转 BMP 工具”](PNG2BMP.html)，把图片调整为 240 x 240 或更小后转换并下载。

#### 步骤3：上传 BMP 图片到 CoCube 中

在 MicroBlocks 的“文件”菜单里选择“把文件上传到主板”，上传你转换好的 BMP。

![Code2](upload_bmp.png)

如果没有找到“把文件上传到主板”的话，请确认开启了“高级模式”。

上传时请耐心等待，不要切换标签页、最小化浏览器或者切换为别的程序，以免中断。

上传后可用“文件名”积木确认文件是否存在，确保 <a href="paper.bmp" download="paper.bmp">paper.bmp</a>、<a href="rock.bmp" download="rock.bmp">rock.bmp</a>、<a href="scissors.bmp" download="scissors.bmp">scissors.bmp</a> 已就位。

如果想直接使用本案例素材，可以先下载这三个 BMP 文件，再上传到 CoCube。

![Code3](scriptImage1024689.png)

### 3. 编写程序

- 按键 A：显示石头；按键 B：显示剪刀；同时按 A+B：显示布。
- 用几行积木检测按键并切换显示对应的 BMP，同时可以播放短音效增强反馈。

![Code4](allScripts1110912.png)

完成！找朋友或家人来一场对决吧！

<a href="BMP_Image.ubp" download="BMP_Image.ubp">下载示例项目</a>

### 4. 拓展与创作

试试上传自己喜欢的图片（比如小兔子 Rosa），做个个性化界面或主题吧。

![Code6](Bunny512.png)
