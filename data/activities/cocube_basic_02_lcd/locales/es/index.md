### 1. Propósito

Programación del robot CoCube para implementar la función de visualización LED de la pantalla LCD.

### 2. Materiales utilizados

![CoCube Robot × 1](img1.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Programación

El robot CoCube está equipado con una pantalla LCD a todo color, que permite presentar el contenido de diferentes maneras. La forma más básica de mostrarlo es a través de una matriz de 5×5 cuadrados. Para encender el CoCube, puedes seguir estos pasos:

1. **Conectar dispositivos:** Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos.

2. **Encuentre los bloques:** Localice el bloque de visualización en la biblioteca de bloques de pantalla LED y arrástrelo al espacio de trabajo.

3. **Para ejecutar el programa:** Haga clic con el botón izquierdo en el bloque. Cuando se enciende un halo verde alrededor de los bloques, significa que el programa se ha ejecutado con éxito y se puede observar que la pantalla LCD del robot CoCube muestra una cara sonriente.

4. **Mostrar y borrar:** Para borrar el patrón en la pantalla actual, puede usar el bloque Borrar pantalla. Toque el bloque Borrar pantalla directamente en el área del bloque, o arrastre el bloque Borrar pantalla al espacio de trabajo y tóquelo, y todo en la pantalla se borrará.

![](simulator.png)

Código de referencia de la muestra: [MicroBlocks.CoCube Caso 01 Pantalla y Clear](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20396%20276%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20395%20132%20%7B%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%7D%0A%0A)

### 5. Reto: linternas de agua corriente

En la biblioteca "Pantalla LED", puede controlar cada cuadrado LED por separado mediante los bloques "luz x _ y _" y "apagado x _ y _", consulte los siguientes bloques, intente escribir un programa de lámpara de agua corriente!

Puede intentar cambiar el tiempo de espera para controlar la velocidad de la luz de circulación; También puede intentar usar "bloques de sombreros", por ejemplo, "cuando se presiona la tecla A / B", para establecer un color de pantalla diferente para las luces de circulación.

![](<Flowing_lights.png>)

![](light.gif =300x*)

Código de referencia de la muestra: [MicroBlocks.CoCube Caso 1](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%0A%0Ascript%20440%2088%20%7B%0AwhenStarted%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0Aforever%20%7B%0A%20%20for%20i%205%20%7B%0A%20%20%20%20for%20j%205%20%7B%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbPlot%5D%27%20i%20j%0A%20%20%20%20%20%20waitMillis%20100%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%7D%0A%0Ascript%20786%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0A%7D%0A%0Ascript%20790%20199%20)