### 1. Objetivo

Este tutorial presenta la idea de recursión de forma sencilla. Aprenderás cómo un programa puede llamarse a sí mismo para dibujar patrones fractales complejos y bonitos. También usaremos el dibujo con Turtle para ver el resultado directamente en la pantalla.

![fractal tree result](fractal_tree_result.png =260x*)
![koch snowflake result](koch_snowflake_result.jpg =260x*)
### 2. Materiales

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conceptos básicos

#### Recursión

1. **Dividir un problema grande en copias más pequeñas**
   Toma un problema grande, divídelo en problemas más pequeños que se parecen al original y resuelve esos problemas de la misma manera.

2. **Siempre debe haber un punto de parada**
   La recursión no puede continuar para siempre. Necesita una condición que indique cuándo detenerse. Cuando el problema ya es suficientemente pequeño, el programa da una respuesta directa y deja de llamarse a sí mismo.

**Ejemplo: pasar un mensaje en un cine**

Imagina que estás en un cine oscuro y quieres saber en qué fila estás sentado.

* **Tu acción:** Tocas el hombro de la persona de delante y preguntas: "¿Qué fila es esta?"

* **Ocurre la recursión:** Esa persona tampoco lo sabe, así que pregunta a la persona de delante. La misma acción se repite.

* **Punto de parada:** Al final, la pregunta llega a la persona de la primera fila. Esa persona sabe la respuesta: "¡Estoy en la fila 1!"

* **Devolver el resultado:** La respuesta vuelve fila por fila.

  * La segunda fila piensa: "Entonces soy 1 + 1 = 2", y se lo dice a la tercera fila.

  * El mensaje vuelve hasta que recibes tu respuesta.

**Esto es recursión:** divides una pregunta grande en copias más pequeñas de la misma pregunta, te detienes cuando la respuesta es clara y devuelves el resultado paso a paso.

#### Copo de nieve de Koch

¿Has notado que los copos de nieve reales no tienen bordes lisos al ampliarlos? Sus bordes están llenos de detalles cada vez más pequeños.

En 1904, el matemático Helge von Koch se preguntó si una regla sencilla podía dibujar un copo de nieve con detalle infinito.

Así nació el copo de nieve de Koch, una figura que crece mediante recursión.

Reglas de dibujo:

Paso 0: Dibuja un triángulo equilátero.

Paso 1: Divide cada lado en tres partes y levanta un pequeño triángulo sobre la parte central.

Paso 2: Aplica la misma regla a cada nuevo lado.

Paso 3: Sigue repitiendo. Aparecen más lados y la figura se parece cada vez más a un copo de nieve.

![koch snowflake example](koch_snowflake_example.png =260x*)
#### Bloques de dibujo Turtle

Imagina Turtle como un pequeño robot con un lápiz. Tú escribes un plan de movimiento, y Turtle lo sigue mientras dibuja.

1. **Levantar y bajar el lápiz:** Cuando el lápiz está abajo, Turtle deja una línea al moverse. Cuando quieres moverte a otro lugar sin dibujar, levanta el lápiz, muévete y vuelve a bajarlo.

![pen up](pen_up.png)

![pen down](pen_down.png)
* **Avanzar:** Este bloque controla el movimiento de Turtle. Escribe un número en píxeles. Ese número decide la longitud de la línea dibujada.

![move forward](move_forward.png)
* **Girar:** Este bloque cambia la dirección de Turtle. Escribe un ángulo en grados.

  * Un número positivo, como `90`, gira Turtle en sentido horario.

  * Un número negativo, como `-90`, gira Turtle en sentido antihorario.

  Nota: este bloque solo cambia la dirección. No mueve Turtle ni dibuja una línea.

![turn degrees](turn_degrees.png)
* **Mover el lápiz a una posición exacta:** Si ya sabes las coordenadas x e y a las que quieres ir, no hace falta avanzar paso a paso. Usa este bloque para moverte directamente a esa posición.

![go to xy](go_to_xy.png)
* **Cambiar colores:** Usa estos dos bloques para cambiar el color de fondo y el color del lápiz.

![fill background](fill_background.png)

![set pen color](set_pen_color.png)
### 5. Dibujar un Árbol Fractal

1. **Añadir una biblioteca:** ¿Quieres que Turtle siga tus instrucciones y dibuje formas interesantes? En el editor de MicroBlocks, abre **Gráficos y pantallas**, busca la **biblioteca Turtle** y haz clic en **Añadir biblioteca**. Entonces Turtle estará lista para dibujar.

![add library button](add_library_button.png)

![graphics and displays](graphics_and_displays.png)

![turtle library](turtle_library.png)
* **Calentamiento:** Antes de dibujar copos de nieve o árboles con ramas, empieza con un triángulo equilátero sencillo usando Turtle.

Elige un color de lápiz. Para que el dibujo quede centrado, mueve Turtle al centro de la pantalla y luego baja el lápiz.

![select pen](select_pen.png)

Dibujar un triángulo equilátero es sencillo:

Mueve Turtle hacia delante para dibujar un lado.

Gira 120 grados y dibuja el siguiente lado.

Repite "avanzar + girar" 3 veces, y el triángulo estará completo.

![triangle code](triangle_code.png)

![triangle result](triangle_result.png =300x*)
* Árbol fractal recursivo:

Ahora vamos a dibujar un árbol que crea ramas por sí mismo.

Su regla es sencilla:

* Paso 0: Dibuja un tronco recto.

* Paso 1: En la parte superior del tronco, dibuja una rama más corta hacia la izquierda y otra hacia la derecha.

* Paso 2: Trata cada rama nueva como un tronco más pequeño. Repite la misma acción en su punta.

* Paso 3: Sigue repitiendo. Las ramas se vuelven más pequeñas y detalladas.
  Después de varias repeticiones, aparece un árbol fractal.

Esta regla de llamarse a sí mismo se llama recursión en programación. Sigue los pasos y podrás dibujar un árbol fractal.

![fractal tree diagram](fractal_tree_diagram.png =320x*)

**¿Qué es lo más importante antes de usar recursión?**

Decidir cuándo detenerse.

Como en el ejemplo del cine, debe haber una condición en la que el programa pueda dar una respuesta directa y no volver a preguntar.

Si no hay condición de parada, la recursión se ejecutará para siempre y el programa puede quedarse bloqueado.

En este árbol, cada rama nueva es más corta que la anterior.

Por eso podemos detenernos cuando la longitud de la rama sea suficientemente pequeña, por ejemplo menor que 5.

Además, la recursión no solo debe detenerse en el fondo. También debe retornar para que el nivel anterior pueda continuar.

Así que creamos un **bloque personalizado** y escribimos el caso de parada:

![drawtree base case](drawtree_base_case.png)

PS: En recursión, el bloque **retorna** es importante. Termina la llamada actual y vuelve al nivel anterior. También puedes usar una estructura **si... si no...** para obtener el mismo resultado.

Ahora podemos dibujar todo el árbol:

1. Dibuja el tronco avanzando con la longitud actual.

2. Dibuja la rama izquierda girando a la izquierda y dibujando una rama más corta.

3. Dibuja la rama derecha girando a la derecha y dibujando otra rama más corta.

4. Vuelve al punto de división y recupera la dirección original para que el nivel anterior de recursión pueda continuar.

![drawtree steps](drawtree_steps.png)

Aquí tienes dos definiciones completas del bloque:

![drawtree definition a](drawtree_definition_a.png)

![drawtree definition b](drawtree_definition_b.png)

En el programa principal, primero coloca Turtle cerca de la parte inferior de la pantalla:

Mueve el lápiz a un buen punto inicial, orienta Turtle hacia arriba con el bloque **orientar a -90 grados**, baja el lápiz y llama a **drawtree**.

![tree main program](tree_main_program.png)
### 6. Probar el Copo de Nieve de Koch

La regla del copo de nieve de Koch es: divide cada segmento en tres partes iguales y levanta una pequeña punta en la parte central.

Si seguimos haciendo esto, los segmentos se vuelven más cortos y aumenta el número de niveles.

En el bloque personalizado necesitamos dos entradas:

* Longitud: la longitud actual del segmento.

* Nivel: cuántas subdivisiones quedan.

La condición de parada es:
Cuando nivel = 0, no se subdivide más y se dibuja una línea recta con la longitud dada.

![koch base case](koch_base_case.png)

En el copo de nieve de Koch, el nivel decide cuántas veces subdividimos y la longitud decide cuánto mide el segmento actual.

#### ¿Por qué el nivel disminuye en 1 cada vez?

Piensa en quitar capas a una cebolla. Cada vez que quitas una capa, queda una capa menos. En el copo de nieve, cada llamada recursiva usa un nivel, así que la siguiente llamada usa nivel - 1. Cuando el nivel llega a 0, se dibuja una línea recta.

#### ¿Por qué dividir la longitud entre 3?

La regla de Koch convierte un segmento en 4 segmentos más pequeños, cada uno de un tercio de la longitud original. Por eso la siguiente llamada recursiva usa longitud / 3.

Pasos detallados:

1. Dibuja la curva de Koch con longitud / 3 y nivel - 1.

2. Gira a la izquierda 60 grados.

3. Dibuja la curva de Koch con longitud / 3 y nivel - 1.

4. Gira a la derecha 120 grados.

5. Dibuja la curva de Koch con longitud / 3 y nivel - 1.

6. Gira a la izquierda 60 grados.

7. Dibuja la curva de Koch con longitud / 3 y nivel - 1.

![koch recursive case](koch_recursive_case.png)

PS:

* Girar a la izquierda 60 grados y a la derecha 120 grados crea los dos giros exteriores de un triángulo equilátero.

* El último giro a la izquierda de 60 grados recupera la dirección original de Turtle.

El bloque **kochshow** dibuja un lado del copo. Un copo completo necesita 3 lados, así que el programa principal lo llama 3 veces y gira a la derecha 120 grados después de cada lado.

![koch main program](koch_main_program.png)

[Código de referencia: patrones fractales](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%20%27Turtle%27%0A%0Aspec%20%27%20%27%20%27drawtree%27%20%27drawtree%20_%27%20%27auto%27%20%2710%27%0Ato%20drawtree%20length%20%7B%0A%20%20if%20%28length%20%3C%2010%29%20%7B%0A%20%20%20%20move%205%0A%20%20%20%20move%20-5%0A%20%20%20%20return%200%0A%20%20%7D%0A%20%20move%20length%0A%20%20turnBy%2015%0A%20%20drawtree%20%28length%20-%205%29%0A%20%20turnBy%20-30%0A%20%20drawtree%20%28length%20-%205%29%0A%20%20turnBy%2015%0A%20%20move%20%280%20-%20length%29%0A%7D%0A%0Aspec%20%27%20%27%20%27kochsnow%27%20%27kochsnow%20_%20_%27%20%27auto%20auto%27%20%2710%27%20%2710%27%0Ato%20kochsnow%20size%20level%20%7B%0A%20%20if%20%28level%20%3D%3D%200%29%20%7B%0A%20%20%20%20%27pen%20down%27%0A%20%20%20%20%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%20%20%20%20move%20size%0A%20%20%20%20%27pen%20up%27%0A%20%20%7D%20else%20%7B%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20-60%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20120%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%20%20turnBy%20-60%0A%20%20%20%20kochsnow%20%28size%20%2F%203%29%20%28level%20-%201%29%0A%20%20%7D%0A%7D%0A%0Ascript%20423%2082%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%27go%20to%20x%27%20120%20240%0AsetHeading%20-90%0A%27pen%20down%27%0Adrawtree%2050%0A%7D%0A%0Ascript%20192%2082%20%7B%0Ato%20drawtree%20length%20%7B%7D%0A%7D%0A%0Ascript%20876%2082%20%7B%0Ato%20kochsnow%20size%20level%20%7B%7D%0A%7D%0A%0Ascript%20620%2077%20%7B%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%27set%20pen%20color%20to%27%20%28colorSwatch%20255%20255%20255%20255%29%0A%27go%20to%20x%27%20100%20100%0Alocal%20%27size%27%2081%0Alocal%20%27l%27%203%0Arepeat%203%20%7B%0A%20%20kochsnow%20size%20l%0A%20%20turnBy%20120%0A%7D%0AsayIt%20%28size%20%2F%203%29%0A%7D%0A%0A)
