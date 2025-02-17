### Addendum: Working with external graphics

If you're serious about game development with MicroBlocks, you probably want to
draw your sprites on an external drawing program. This would also let you use
higher bitdepths and bigger color palettes. Here's a very short tutorial to help
you import sprites from GIMP to MicroBlocks.

### Importing images from GIMP

#### Remove the alpha channel

Right click on the *Layers* panel and click on *Remove Alpha Channel*. This will
take away any transparency information from the colors in your image.

#### Convert image to indexed

The *8 Bit Graphics* library wants indexed images. That is, images where each
pixel points to an index in a palette. To ask GIMP to turn your image into an
indexed one, you need to navigate to the *Image* menu, *Mode* submenu, and
select *Indexed...*.

This will pop up a new dialog with several options. Under *Colormap* you should
choose *Generate optimum palette*, selecting the maximum number of colors you
want to work with (recommended for MicroBlocks is a maximum of 256 colors). You
can also check *Remove unused and duplicate colors from colormap*.

You can play with different options under the *Dithering* section. If your image
has more colors than the palette can handle, dithering will attempt to trick
your eyes into seeing these extra colors by sprinkling in pixels of different
colors close together. Different dithering strategies will result in different
effects.

#### Export as raw image data

From the *File* menu, select *Export As...*. In the *Export* dialog, you should
look for the *Select File Type (By Extension)* option, and click on it. This
will unfold a long list of file types, from which you need to find and select
*Raw image data*.

This will generate and export two different files: a `.data` file, with your
image data in it, and a `.data.pal` file, with your palette data.

#### Import files into MicroBlocks

[[safety]] This will only work on boards with a file system, such as ESP32-based
ones.  Boardie has a simulated file system, too. [[/safety]]

While connected to your board, you can just drag and drop these files onto the
MicroBlocks IDE to upload them to the board.

#### Read back the palette from the .data.pal file

To read the palette file into MicroBlocks, you can use this block from the *8
Bit Graphics* library:

![a block that reads a palette from a file](../palette-from-file-block.png)

Most often, you will want to set the palette to the one in the file. Here's how
you'd do it:

![a block that sets a palette from a file](../set-palette-from-file-block.png)

#### Read back the sprite from the .data file

Finally, you can now read your sprite from the `.data` file.

![a block that reads a bitmap from a file](../bitmap-from-file-block.png)

Your game, of course, will have more than one sprite. The best way to proceed
here would be to work with a set palette in GIMP, and create all your graphics
with that palette.

### Reading palettes and sprites from BMP files

The *8 Bit Graphics* library also lets you read your palettes and bitmaps from
BMP files. To do it, you just have to drop your BMP file into the MicroBlocks
IDE while your board is connected to it, and use these two blocks to read the
palette and bitmap out of it:

![a block that reads a palette from a BMP file](../palette-from-BMP-block.png)

![a block that reads a bitmap from a BMP file](../bitmap-from-BMP-block.png)
