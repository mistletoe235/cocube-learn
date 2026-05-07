### 1. Objetivo

¿Quieres crear un pequeño juego divertido para tu robot? Tal vez hayas jugado al clásico Flappy Bird. Las reglas son sencillas, pero exige buenos reflejos. En esta actividad usarás la pantalla del robot para construir una versión sencilla de Flappy Bird y aprenderás el proceso completo, desde dibujar la pantalla hasta implementar la lógica del juego.

### 2. Materiales

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conceptos básicos

#### Partes Necesarias de un Juego Tipo Flappy Bird

* Construir una escena de juego clara.

* Hacer que los tubos aparezcan y se muevan.

* Controlar el personaje para que siga saltando.

* Diseñar un sistema de puntuación.

**Piensa:** ¿Cuál es la clave para pasar entre los tubos? ¿Qué sistemas necesitamos y cómo debemos diseñarlos?

![game preview](game_preview.png =360x*)

<video controls style="width: 320px; max-width: 100%; height: auto;">
  <source src="jumpy_ball_demo.mp4" type="video/mp4">
</video>

**Cambio de estado**: Define la pantalla inicial, el estado de juego y la pantalla de final. Controla la transición entre ellas.

**Bucle principal**: Mientras el juego está activo, actualiza la imagen y la lógica muchas veces.

**Reglas y detección**: Añade puntuación, detección de colisiones y comprobaciones de límites que terminan el juego.

#### Bloques Que Vas a Usar
Bloques principales: En esta actividad usamos sobre todo bloques de la biblioteca **TFT**. La pantalla se usa para la interfaz, el personaje y los elementos en movimiento, así que **TFT** es la biblioteca principal del juego.

![tft text block](tft_text_block.png)

Este bloque tiene 5 entradas importantes:

**Texto:** El texto que se mostrará. También puedes usar una variable.

**Posición x / y:** Las coordenadas de la esquina superior izquierda.

**Color:** El color del texto.

**Escala:** La proporción del tamaño del texto. Haz clic en el pequeño triángulo blanco para ver esta entrada. Un valor de 1 significa que se usa un píxel como unidad mínima, mientras que 60 significa que el texto usa 60 píxeles como unidad.

También necesitamos dos bloques para dibujar figuras: **rectángulo** y **círculo**.

![tft rectangle block](tft_rectangle_block.png)

![tft circle block](tft_circle_block.png)
### 5. Diseñar una Herramienta de Texto

1. **Dibujar texto:** La pantalla inicial y la pantalla de final usan texto. Si configuramos tamaño, color y posición cada vez, el trabajo se vuelve repetitivo y fácil de equivocar. Podemos crear un bloque de texto personalizado, una pequeña herramienta de texto, para reutilizar el mismo estilo.

![write block definition](write_block_definition.png)

Al llamar este bloque personalizado con diferentes entradas, podemos escribir distintos textos en la pantalla.

![write block example](write_block_example.png)

En esta herramienta de texto, la posición x está centrada. ¿Por qué debe calcularse así la variable **width**?

* **Dibujar pantallas:** Cuando este bloque de texto personalizado está listo, dibujar la pantalla inicial y la de final es más fácil. Llamamos el bloque e introducimos el texto que queremos mostrar, manteniendo un estilo uniforme.

![welcome screen](welcome_screen.png)

![game over screen](game_over_screen.png)

En la pantalla inicial solo necesitamos la información más importante:

* El nombre del juego.

* Cómo empezar a jugar.

Así el jugador entiende enseguida qué juego es y qué debe pulsar.

La pantalla de final debe mostrar dos cosas:

1. Que el juego terminó, por ejemplo **Game Over**.

2. La puntuación, que es lo que más interesa al jugador.

Por eso preparamos una variable de puntuación llamada **score**. Cada vez que el jugador gana un punto, **score** aumenta en 1. Al final del juego, mostramos **SCORE:** seguido de **score**.

Prueba distintos valores de **scale** y posiciones para que las pantallas no se superpongan.

### 6. Diseñar los Elementos Principales

1. **Dibujar la pelota:** La pelota es el personaje principal. Su posición cambia durante el juego, así que cada actualización debe borrar la pelota anterior y dibujar la nueva. Usa la posición y anterior para cubrir la pelota vieja con el color de fondo y luego dibuja la pelota en la nueva posición.

![draw ball](draw_ball.png)

PS: Aquí, **X ball radius** significa que la pelota se mantiene cerca del lado izquierdo de la pantalla. Su coordenada x casi no cambia, mientras que la coordenada y sí cambia.

Quizá te preguntes cómo se relacionan **previous ball y** y **ball y**. La pelota debe caer automáticamente cuando no se pulsa ningún botón. Si no, quedaría flotando en el aire.

* **Movimiento de la pelota**: En el mundo real, una pelota cae cada vez más rápido por la aceleración. En el juego usamos dos variables: aceleración y velocidad. Cada fotograma actualiza la velocidad y luego la posición de la pelota.

![ball speed](ball_speed.png)

Puedes configurar tú mismo los valores iniciales de velocidad y aceleración.

Después de actualizar la velocidad, **previous ball y** guarda el valor de **ball y** del fotograma anterior:

![previous and current ball y](previous_and_current_ball_y.png)

Cuando el jugador pulsa un botón, la pelota salta hacia arriba. Podemos poner la velocidad en 0 y luego usar la aceleración para mover la pelota hacia arriba. Como esta acción es independiente, la convertimos en una función:

![check button](check_button.png)

El bloque **button pressed** solo comprueba si se ha pulsado un botón. La variable **playing** es booleana e indica si el juego sigue activo. Juntos controlan el ritmo del juego.

Si el jugador pulsa demasiado rápido, la pelota puede salir por la parte superior. Elegimos añadir un techo: cuando **ball y** sea demasiado pequeño, lo forzamos a volver dentro de la pantalla.

![top boundary](top_boundary.png)

También necesitamos comprobar si la pelota cae por debajo de la pantalla. Podemos comparar **ball y** con la altura de la pantalla.

![check playing](check_playing.png)

Cuando estas partes están completas, el movimiento de la pelota por fotogramas se puede agrupar en una función llamada **step ball**:

![step ball](step_ball.png)
* **Dibujar los tubos:**

  Los tubos se parecen a la pelota: borramos la posición anterior y dibujamos la nueva. Pero un tubo no es una sola figura. Tiene una parte superior, una parte inferior y un espacio entre ellas.

  Necesitamos controlar:

  * La posición y altura del tubo superior.

  * La posición y altura del tubo inferior.

  * El espacio entre ellos, llamado **gap**.

  Los valores y de los tubos se determinan fácilmente usando la altura de la pantalla, el espacio y 0. La clave del movimiento es **pipe x**. Para mover el tubo hacia la izquierda, **pipe x** debe disminuir en cada fotograma.

![draw pipe](draw_pipe.png)

Como con la pelota, el movimiento del tubo también puede dividirse por fotogramas.

1. Primero, mueve el tubo a la izquierda con una velocidad fija:

![pipe x fixed speed](pipe_x_fixed_speed.png)

Para que el juego sea más interesante, la dificultad puede aumentar cuando sube **score**. Podemos conectar el movimiento de **pipe x** con **score**:

![pipe x score speed](pipe_x_score_speed.png)
* Cuando el tubo se ha movido lo suficiente hacia la izquierda, ya pasó al jugador.

Entonces se reinicia la posición del tubo y se genera aleatoriamente una nueva altura para el siguiente reto.

![reset pipe](reset_pipe.png)

También podemos crear un bloque **step pipe** para describir el movimiento del tubo por fotogramas:

![step pipe](step_pipe.png)
* **Detección de colisiones:** Si la pelota toca un tubo, el juego termina. Como la pelota se mantiene cerca del lado izquierdo y los tubos se mueven, la colisión ocurre cuando el tubo llega a la zona izquierda.

La primera condición es **pipe x <= pipe width**:

![collision condition x](collision_condition_x.png)

La segunda condición comprueba si la pelota toca el borde superior o inferior del espacio:

![collision condition y](collision_condition_y.png)

Cuando ambas condiciones son verdaderas, define **playing** como falso para completar la detección de colisiones.

PS: ¿Notaste que los cálculos con **ball y** suelen incluir **/ 10**? Al inicio multiplicamos **ball y** por 10 para conseguir un movimiento más suave usando enteros. Al comprobar colisiones o dibujar, recuerda dividir entre 10 para volver a la posición real de la pantalla.

* Definir valores iniciales de variables:

![new game variables](new_game_variables.png)
### 7. Reto

Ya tienes las partes principales de un juego interactivo completo:

Variables -> movimiento -> límites -> colisiones -> puntuación -> pantallas -> mejoras

Prueba a construir el programa en MicroBlocks. Una versión funcional se completa conectando los bloques anteriores:

![complete program](complete_program.png)

[Código de referencia: Jumpy Ball](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27ED1%20Buttons%27%20%27TFT%27%0A%0Aspec%20%27r%27%20%27button%20pressed%27%20%27button%20pressed%27%0Ato%20%27button%20pressed%27%20%7B%0A%20%20return%20%28or%20%28or%20%28buttonA%29%20%28buttonB%29%29%20%28or%20%28%27OK%20button%27%29%20%28%27cancel%20button%27%29%29%29%0A%7D%0A%0Aspec%20%27%20%27%20%27check%20buttons%27%20%27check%20buttons%27%0Ato%20%27check%20buttons%27%20%7B%0A%20%20if%20%28and%20playing%20%28%27button%20pressed%27%29%29%20%7B%0A%20%20%20%20%27ball%20speed%27%20%3D%200%0A%20%20%20%20%27ball%20y%27%20%2B%3D%20%28%28v%20%27ball%20acceleration%27%29%20%2A%20-10%29%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27check%20collision%27%20%27check%20collision%27%0Ato%20%27check%20collision%27%20%7B%0A%20%20if%20%28and%20%28%28v%20%27pipe%20x%27%29%20%3C%3D%20%28v%20%27pipe%20width%27%29%29%20%28or%20%28%28%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20%2B%20%28v%20%27ball%20radius%27%29%29%20%3E%3D%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%20%28%28%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20-%20%28v%20%27ball%20radius%27%29%29%20%3C%3D%20%28v%20%27pipe%20height%27%29%29%29%29%20%7Bplaying%20%3D%20%28booleanConstant%20false%29%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27draw%20ball%27%20%27draw%20ball%27%0Ato%20%27draw%20ball%27%20%7B%0A%20%20%27%5Btft%3Acircle%5D%27%20%28v%20%27ball%20radius%27%29%20%28%28v%20%27previous%20ball%20y%27%29%20%2F%2010%29%20%28%28v%20%27ball%20radius%27%29%20%2B%201%29%200%20true%0A%20%20%27%5Btft%3Acircle%5D%27%20%28v%20%27ball%20radius%27%29%20%28%28v%20%27ball%20y%27%29%20%2F%2010%29%20%28v%20%27ball%20radius%27%29%2065535%20true%0A%7D%0A%0Aspec%20%27%20%27%20%27draw%20pipes%27%20%27draw%20pipe%27%0Ato%20%27draw%20pipes%27%20%7B%0A%20%20%27%5Btft%3Arect%5D%27%20%28%28v%20%27pipe%20x%27%29%20%2B%20%28v%20%27pipe%20width%27%29%29%200%20%28v%20%27pipe%20width%27%29%20%28v%20%27pipe%20height%27%29%200%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28v%20%27pipe%20x%27%29%200%20%28v%20%27pipe%20width%27%29%20%28v%20%27pipe%20height%27%29%2065280%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28%28v%20%27pipe%20x%27%29%20%2B%20%28v%20%27pipe%20width%27%29%29%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%20%28v%20%27pipe%20width%27%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%200%20true%0A%20%20%27%5Btft%3Arect%5D%27%20%28v%20%27pipe%20x%27%29%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%20%28v%20%27pipe%20width%27%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28v%20%27pipe%20height%27%29%20%2B%20gap%29%29%2065280%20true%0A%7D%0A%0Aspec%20%27%20%27%20%27game%20over%27%20%27game%20over%27%0Ato%20%27game%20over%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20write%20%27GAME%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%27OVER%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%28%27%5Bdata%3Ajoin%5D%27%20%27SCORE%3A%27%20score%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2080%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%7D%0A%0Aspec%20%27%20%27%20%27new%20game%27%20%27new%20game%27%0Ato%20%27new%20game%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20score%20%3D%200%0A%20%20comment%20%27ball%20y%20is%20multiplied%20by%2010%20for%20precision%27%0A%20%20%27ball%20y%27%20%3D%20%28%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%202%29%20%2A%2010%29%0A%20%20playing%20%3D%20%28booleanConstant%20true%29%0A%20%20%27ball%20acceleration%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2060%29%0A%20%20%27ball%20speed%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2060%29%0A%20%20%27ball%20radius%27%20%3D%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%0A%20%20gap%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%204%29%20%28%28v%20%27ball%20radius%27%29%20%2A%207%29%29%0A%20%20%27pipe%20x%27%20%3D%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20-%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20%2F%205%29%29%0A%20%20%27pipe%20height%27%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%20%28%28v%20%27ball%20radius%27%29%20%2A%2010%29%29%0A%20%20%27pipe%20width%27%20%3D%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%0A%7D%0A%0Aspec%20%27%20%27%20%27step%20ball%27%20%27step%20ball%27%0Ato%20%27step%20ball%27%20%7B%0A%20%20%27ball%20speed%27%20%2B%3D%20%28v%20%27ball%20acceleration%27%29%0A%20%20if%20%28%28v%20%27ball%20y%27%29%20%3C%200%29%20%7B%0A%20%20%20%20%27ball%20y%27%20%3D%20%28%28v%20%27ball%20y%27%29%20%2A%20%28v%20%27ball%20speed%27%29%29%0A%20%20%7D%0A%20%20%27previous%20ball%20y%27%20%3D%20%28v%20%27ball%20y%27%29%0A%20%20%27ball%20y%27%20%2B%3D%20%28v%20%27ball%20speed%27%29%0A%20%20if%20%28%28v%20%27ball%20y%27%29%20%3E%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2A%2010%29%29%20%7B%0A%20%20%20%20playing%20%3D%20%28booleanConstant%20false%29%0A%20%20%7D%0A%20%20%27check%20buttons%27%0A%7D%0A%0Aspec%20%27%20%27%20%27step%20pipe%27%20%27step%20pipe%27%0Ato%20%27step%20pipe%27%20%7B%0A%20%20%27pipe%20x%27%20%2B%3D%20%28%28score%20%2F%20-10%29%20-%20%28%28%27%5Btft%3AgetWidth%5D%27%29%20%2F%20120%29%29%0A%20%20if%20%28%28v%20%27pipe%20x%27%29%20%3C%20%28%28%28v%20%27pipe%20width%27%29%20%2A%20-1%29%20-%202%29%29%20%7B%0A%20%20%20%20%27pipe%20x%27%20%3D%20%28%27%5Btft%3AgetWidth%5D%27%29%0A%20%20%20%20%27pipe%20height%27%20%3D%20%28random%20%28%28v%20%27ball%20radius%27%29%20%2A%202%29%20%28%28v%20%27ball%20radius%27%29%20%2A%2010%29%29%0A%20%20%20%20score%20%2B%3D%201%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27welcome%20screen%27%20%27welcome%20screen%27%0Ato%20%27welcome%20screen%27%20%7B%0A%20%20%27%5Btft%3Aclear%5D%27%0A%20%20write%20%27JUMPY%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2015%29%20%28colorSwatch%20244%2036%20215%20255%29%0A%20%20write%20%27BALL%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%2030%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%203%29%20%28colorSwatch%20244%2036%20215%20255%29%0A%20%20write%20%27Press%20OK%20or%20A%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%20120%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%204%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20write%20%27to%20play%27%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%20120%29%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20-%20%28%28%27%5Btft%3AgetHeight%5D%27%29%20%2F%208%29%29%20%28colorSwatch%20255%20255%20255%20255%29%0A%7D%0A%0Aspec%20%27%20%27%20%27write%27%20%27write%20_%20centered%20at%20scale%20_%20y%20_%20color%20_%27%20%27str%20auto%20auto%20color%27%20%27Hello%21%27%203%20%2710%27%0Ato%20write%20text%20scale%20y%20color%20%7B%0A%20%20local%20%27width%27%20%28%28%28scale%20%2A%206%29%20%2A%20%28size%20text%29%29%20-%20scale%29%0A%20%20%27%5Btft%3Atext%5D%27%20text%20%28%28%28%27%5Btft%3AgetWidth%5D%27%29%20-%20width%29%20%2F%202%29%20y%20color%20scale%20false%0A%7D%0A%0Ascript%20319%2074%20%7B%0AwhenStarted%0A%27welcome%20screen%27%0Aforever%20%7B%0A%20%20waitUntil%20%28%27button%20pressed%27%29%0A%20%20%27new%20game%27%0A%20%20repeatUntil%20%28not%20playing%29%20%7B%0A%20%20%20%20%27step%20ball%27%0A%20%20%20%20%27draw%20ball%27%0A%20%20%20%20%27step%20pipe%27%0A%20%20%20%20%27draw%20pipes%27%0A%20%20%20%20%27check%20collision%27%0A%20%20%20%20waitMillis%2010%0A%20%20%7D%0A%20%20%27game%20over%27%0A%20%20waitUntil%20%28not%20%28%27button%20pressed%27%29%29%0A%7D%0A%7D%0A%0A)
