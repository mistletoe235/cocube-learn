### 1. Objetivo de la práctica

Programe el robot CoCube para que aprenda la función de posicionamiento de coordenadas de la plataforma de posicionamiento y el movimiento direccional de punto fijo del robot, mientras aprende sobre la función de salida en MicroBlocks.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =200x*)
![Personal Computer or Tablet](PC.png =200x*)
![CoCube Positioning Map](image.png =200x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-1.png)

### 4. Programación

#### 4.1 Conoce el mapa de ubicación de CoMaps

CoMaps proporciona capacidades de posicionamiento precisas para los robots CoCube.

![CoMaps Example —— Maze Challenge Themed Positioning Map](comap.png)

Saca un mapa de la ubicación temática del Maze Challenge y míralo más de cerca:

- Las coordenadas de la esquina superior izquierda del mapa son (0,0), las coordenadas de la esquina inferior derecha son (300,200), el eje X es de izquierda a derecha (0~300) y el eje Y es de arriba a abajo (0~200).
- El robot está 0 grados en la dirección positiva del eje Y y 180 grados cuando el robot está orientado hacia la dirección negativa del eje Y, y el ángulo de rotación en sentido contrario a las agujas del reloj aumenta.
- Hay líneas punteadas impresas en el mapa cada 50 unidades, lo que puede ayudar a localizar rápidamente la ubicación de las coordenadas.

#### 4.2 Deja que el CoCube diga dónde está

¿Cómo puedo obtener una posición y un ángulo más precisos del robot CoCube en el mapa de CoMaps?

1. **Conecte el dispositivo**: Conecte el IDE de Microblocks al robot CoCube a través de una conexión Bluetooth y coloque el robot CoCube en la plataforma de posicionamiento.

2. **Usa los bloques "Say"**

   - Conéctese para abrir la biblioteca de bloques "Salida", arrastre el bloque "Digamos 123" y haga clic en Ejecutar, puede ver que en el IDE de MicroBlocks, aparece una pequeña burbuja en la esquina superior derecha del bloque, escribiendo "123".
   - ¡Eso es lo que hace el bloque "Say _"! En lugar de dejar que el bot de CoCube realmente hable, le presentará algo en el IDE de MicroBlocks.

![](image-2.png)  


- Si desea decir dos cosas al mismo tiempo, simplemente haga clic en el pequeño triángulo a la derecha del bloque "Decir _" y escriba el contenido que desea generar en el nuevo campo de entrada.
- También podemos rellenar los bloques de la biblioteca de bloques "Compute", y CoCube enviará el resultado final al IDE de MicroBlocks.

![](scriptImage2100985.png)  

![](scriptImage2239731.png)

- **Salidas CoCube Coordenadas**

  - Arrastre los bloques "Posición X", "Posición Y" y "Ángulo de dirección" de la biblioteca de bloques CoCube y colóquelos en el bloque "Say _". Haga clic en el bloque para indicar las coordenadas del CoCube en ese momento.
  - Para generar las coordenadas y los ángulos del CoCube en tiempo real, se puede anidar un bloque "repetido".

![](scriptImage2340058.png)

- Mueva el robot CoCube y vea si las coordenadas y los ángulos de los MicroBlocks cambian.

#### 4.3 Lugares de dibujo CoCube

Si el bloque "Decir _" no es lo suficientemente intuitivo, también puede usar el bloque "Trazar" para mostrar las coordenadas del CoCube en un gráfico de datos.

1. **Conecte el dispositivo**: Conecte el IDE de Microblocks al robot CoCube a través de una conexión Bluetooth y coloque el robot CoCube en la plataforma de posicionamiento.

2. **Usando los bloques "Draw"**: Escriba el siguiente código y ejecútelo, haga clic en el icono en la parte superior derecha del IDE de MicroBlocks para dibujar botones, las curvas roja, verde y azul representan los valores de la "posición X", la "posición Y" y el "ángulo de dirección" del robot CoCube, respectivamente.

![](image-3.png)

#### 4.4 Movimiento preciso

Una vez que hayas dominado los consejos anteriores, podrás explorar el resto por tu cuenta.

![](image-4.png)

Vamos a reprogramar un robot CoCube para dibujar una trayectoria cuadrada:

![](scriptImage3089043.png)  

![](scriptImage3097549.png)

Ejemplo de programa de referencia: [MicroBlocks - CoCube Case 03 Trayectoria de dibujo cuadrada](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20971%20248%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20rotate%20to%20angle%27%200%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20180%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20to%20angle%27%20270%2030%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%7D%0A%7D%0A%0Ascript%20596%20312%20%7B%0Aforever%20%7B%0A%20%20%27CoCube%20move%20by%20step%27%20%27cocube%3Bforward%27%2040%2050%0A%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%7D%0A%7D%0A%0A)

### 5. Reto

Utilice la función de retroalimentación de coordenadas y la función de movimiento de punto fijo de la plataforma de posicionamiento para caminar desde la entrada hasta la salida del laberinto.

![](scriptImage256581.png)  

![](comap.gif)

Programa de muestra de referencia: [MicroBlocks--CoCube Case 03 Maze Challenge](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20437%20194%20%7B%0A%27CoCube%20move%20to%27%20124%2022%2040%0A%27CoCube%20move%20to%27%20124%2053%2040%0A%27CoCube%20move%20to%27%20155%2053%2040%0A%27CoCube%20move%20to%27%20156%20118%2040%0A%27CoCube%20move%20to%27%20286%20118%2040%0A%27CoCube%20move%20to%27%20286%20180%2040%0A%27CoCube%20move%20to%27%20223%20180%2040%0A%27CoCube%20move%20to%27%20220%20150%2040%0A%27CoCube%20move%20to%27%20155%20150%2040%0A%27CoCube%20move%20to%27%20155%20180%2040%0A%7D%0A%0A)

Es posible que descubras que el CoCube es demasiado rápido y no lo suficientemente suave como para hacer giros, y podemos movernos a una velocidad más pequeña hacia un ángulo específico después de cada punto de coordenadas. ¡Pruébalo tú mismo!