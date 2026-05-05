¿Sabías que la pantalla de CoCube puede esconder una tortuga invisible? Cuando aprendes su lenguaje, puede dibujar todo tipo de arte geométrico en la pantalla.

### 1. Preparación: conoce el lienzo de la tortuga

La pantalla de CoCube tiene 240 x 240 píxeles de color.

- Coordenadas de la pantalla: la esquina superior izquierda es (0, 0), y el centro de la pantalla, (120, 120), es la casa inicial de la tortuga.

- Antes de ejecutar un programa de dibujo, recuerda enviar primero la tortuga a casa.

#### Abre la caja de herramientas de dibujo

En MicroBlocks, haz clic en **Añadir biblioteca** y elige **Gráficos y pantallas** -> **Tortuga** para añadir la biblioteca.

![bloques](allScriptsTurtleBlocks.png)

Estos son los comandos principales:

- **vuelve a casa**: mueve la tortuga al centro de la pantalla y la orienta hacia la derecha.
- **muévete x pasos**: mueve la tortuga hacia delante en la dirección a la que mira.
- **gira x grados**: cambia la dirección de la tortuga. Girar a la derecha usa un valor positivo, y girar a la izquierda usa un valor negativo.
- **gira _ / _ de vuelta**: es una forma más intuitiva de pensar en rotaciones, como media vuelta o 1/4 de vuelta.
- **limpia pantalla**: borra el dibujo de la tortuga y prepara uno nuevo.
- **baja el lápiz** y **sube el lápiz**: la tortuga solo deja trazo cuando el lápiz está bajado.

### 2. Dibujo básico: empieza con formas sencillas

#### Paso 1: dibuja un cuadrado

Un cuadrado tiene 4 lados. Después de dibujar cada lado, la tortuga gira 90 grados.

![Código1](scriptImageSquare.png)

<video width="320" height="240" controls>
  <source src="Rectangle.mp4" type="video/mp4">
</video>

#### Paso 2: dibuja un pentágono y un hexágono regulares

Para dibujar un pentágono o un hexágono, cambia el número de repeticiones del bucle y el ángulo de giro.

![Código1](scriptImagePentagon.png)

![imagen1](pentagon_boardie.png)
![imagen2](pentagon_image.png)

![Código2](scriptImageHexagon.png)

![imagen3](hexagon_boardie.png)
![imagen4](hexagon_image.png)

Para un polígono regular de n lados, la tortuga gira 360 grados / n cada vez.

- Pentágono regular: gira 72 grados, o 1/5 de vuelta.
- Hexágono regular: gira 60 grados, o 1/6 de vuelta.

### 3. Más ideas de dibujo

#### Ejemplo A: cuadrados rotados

¿Qué pasa si la tortuga dibuja un cuadrado, gira un poco y luego dibuja el siguiente?

![Código5](scriptImageRotatingSquares.png)

![imagen1](turtle_square.png)

Obtendrás un bonito patrón en capas.

#### Ejemplo B: laberinto de ángulos rectos

¿Qué pasa si la tortuga se mueve como si recorriera un laberinto, girando 90 grados cada vez, mientras cada avance se hace un poco más largo?

![Código6](scriptImageRightAngleMaze.png)

![imagen2](90.png)

#### Ejemplo C: ¿un laberinto de 91 grados?

¿Qué ocurre si cambias 90 grados por 91 grados?

![Código7](scriptImage91DegreeMaze.png)

![imagen3](91.png)

Ese pequeño cambio hace que la forma rote poco a poco y se abra de una manera muy interesante.

#### Ejemplo D: hazlo en bucle

¿Qué pasa si el ángulo de giro cambia desde 0 grados hasta 180 grados?

Las líneas pueden plegarse y girar hasta formar un patrón parecido a un caleidoscopio.

![Código8](scriptImageAngleLoop.png)

<video width="320" height="240" controls>
  <source src="loop_mv.mp4" type="video/mp4">
</video>

### 4. Reto y creación

- Reto de color: añade dentro del bucle un bloque **fija el color del lápiz a** y convierte tu geometría en un arcoíris.
- Ángulos extremos: prueba ángulos poco comunes, como 144 grados, 160 grados o 170 grados, y observa qué patrones aparecen.
