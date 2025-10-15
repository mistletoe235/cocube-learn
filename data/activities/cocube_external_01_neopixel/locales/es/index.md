### 1. Propósito

Aprenda a usar el módulo de tablero de luz a todo color de NeoPixel y obtenga más información sobre la lógica, como los bucles.

Alimentado por el chip WS2812, el panel de luz a todo color NeoPixel permite el control independiente del color y el brillo de cada LED. Cada módulo LED tiene un circuito controlador incorporado que se puede conectar a través de una cadena de señal digital, lo que simplifica el diseño del circuito de control. WS2812 se usa comúnmente en una variedad de iluminación creativa, exhibiciones, efectos de iluminación decorativos, iluminación de escenarios, vallas publicitarias, decoración del hogar y más.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =200x*)
![NeoPixel RGB LED Panel Module](NeoPixel.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Plataformas de software

[MicroBlocks——CoCube y módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. Experiencia rápida

1. **Conecte dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos e instale el módulo de placa de luz a todo color NeoPixel en el robot CoCube.

2. **Agregue una biblioteca de bloques**: En la categoría "Robots", agregue la "Biblioteca de módulos CoCube" (la "Biblioteca de módulos CoCube" cubre las tres funciones más comunes de la placa de luz NeoPixel: conectar, iluminar y apagar.

![](image-1.png)
![](image.png)

* **Conectar NeoPixels**: Busque el bloque "Conectar NeoPixels" en la biblioteca de bloques "Módulo CoCube", arrástrelo al espacio de trabajo y haga clic en Ejecutar.

![](scriptImage1186229.png)

* **Ilumina todos los NeoPixels**: Arrastra y suelta el bloque "Establecer el color de todos los NeoPixels", haz clic en Ejecutar y las 48 perlas de luz de la placa NeoPixel se iluminarán. Puedes intentar ajustar el color de las cuentas de la lámpara.

![](scriptImage1235412.png)

* **Pantalla borrada**: Si desea desactivar NeoPixel, puede arrastrar el bloque "Desactivar NeoPixels" y hacer clic en Ejecutar.

![](scriptImage1624535.png)

* **Nota**: El WS2812 es un componente que consume mucha energía, por lo que el robot CoCube cae más rápido. Preste atención para verificar el nivel de la batería y cárguela a tiempo.

### 5. Funciones avanzadas

Impulsados por el chip WS2812, los paneles de luz a todo color NeoPixel están dispuestos de izquierda a derecha, de arriba a abajo, de cuentas LED, y el color y el brillo de cada cuenta LED se pueden controlar de forma independiente. Después de agregar la biblioteca "CoCube Module", puede ver que la biblioteca NeoPixel de la que depende la biblioteca también se carga en el IDE de MicroBlocks al mismo tiempo y, en función de ella, podemos lograr efectos más ricos.

![](image-3.png =400x*)

#### 5.1 Lámparas de agua corriente

Revise el caso 01 de programación de la pantalla LCD, hemos escrito un programa de luces de marcha para una pantalla LCD de 5 * 5. Ahora volvamos a implementarlo en el panel de luz a todo color de NeoPixel.

![](<flowing.gif>)

###### Consulte el programa: ¡piense primero por usted mismo!

![](scriptImage3745294.png)

#### 5.2 Luces de circulación multicolor

Piénsalo, si quieres que cada fila sea una lámpara de agua corriente de diferente color, ¿cómo lo logras?

###### Código de referencia: ¡piénselo usted mismo primero!

![](scriptImage4454974.png)

#### 5.3 Rotación

![](scriptImage4858302.png)

El bloque "Rotar espaciado de NeoPixel" se refiere al desplazamiento general del color de la lámpara existente.

![](scriptImage5077164.png)

![](rotating.gif)

#### 5.4 Cambio de color

¿Cómo hacer que el panel de luz muestre un efecto de degradado natural?

![](scriptImage6112209.png)

![](gradient.gif)

Así que da un paso más, ¿puedes completar el colorido degradado?

###### Código de referencia: ¡piénselo usted mismo primero!

![](scriptImage5796430.png)

### 6. Reto

Vinculado con el mapa de posicionamiento del robot CoCube, ¿qué obras más interesantes puedes crear?

### 7. Consulte los ejemplos de código

Todos los códigos de caso anteriores:

[MicroBlocks——NeoPixel Caja de módulo de panel de lámpara a todo color](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27NeoPixel%27%20%27TFT%27%0A%0Ascript%20632%20-43%20%7B%0Acomment%20%27step1%27%0Aforever%20%7B%0A%20%20%27ccmodule_attach%20NeoPixels%27%0A%20%20local%20%27var%27%20%28randomColor%29%0A%20%20for%20i%2048%20%7B%0A%20%20%20%20setNeoPixelColor%20i%20var%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27ccmodule_clear%20NeoPixels%27%0A%7D%0A%7D%0A%0Ascript%201023%20-55%20%7B%0Acomment%20%27step2%27%0A%27ccmodule_attach%20NeoPixels%27%0Aforever%20%7B%0A%20%20for%20i%206%20%7B%0A%20%20%20%20local%20%27var%27%20%28randomColor%29%0A%20%20%20%20for%20j%208%20%7B%0A%20%20%20%20%20%20setNeoPixelColor%20%28%28%28i%20-%201%29%20%2A%208%29%20%2B%20j%29%20var%0A%20%20%20%20%20%20waitMillis%2050%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20633%20289%20%7B%0Acomment%20%27step3%27%0A%27ccmodule_attach%20NeoPixels%27%0Afor%20i%208%20%7B%0A%20%20setNeoPixelColor%20i%20%28colorSwatch%2035%20190%2030%20255%29%0A%7D%0Aforever%20%7B%0A%20%20rotateNeoPixelsBy%20-8%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0Ascript%201028%20306%20%7B%0Acomment%20%27step4%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%205%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20632%20566%20%7B%0Acomment%20%27step5%27%0A%27ccmodule_attach%20NeoPixels%27%0A%27ccmodule_set%20all%20NeoPixels%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Afor%20i%2048%20%7B%0A%20%20NeoPixel_shift_color%20i%20%28i%20%2A%205%29%0A%7D%0Aforever%20%7B%0A%20%20NeoPixel_shift_all_colors%2010%0A%20%20waitMillis%20100%0A%7D%0A%7D%0A%0A)