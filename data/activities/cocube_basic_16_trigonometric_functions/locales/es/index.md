### Dibujo con funciones trigonométricas en MicroBlocks

Las funciones trigonométricas pueden sonar como fórmulas de una clase de matemáticas, pero en programación son más parecidas a herramientas para dibujar círculos y ondas. Si sabemos usar `sin`, podemos dibujar trayectorias circulares, curvas onduladas, patrones de caleidoscopio e incluso un pequeño modelo de planetas en la pantalla TFT de CoCube.

En esta actividad vamos a aprender a usar el bloque `fixed sine` de MicroBlocks y lo aplicaremos en varios proyectos gráficos.

Archivos del programa:

- [`trigonometric_functions.ubp`](trigonometric_functions.ubp): pruebas de seno, curva, círculo y caleidoscopio.
- [`planet.ubp`](planet.ubp): modelo de planetas.

#### 1. ¿Qué son sin y cos?

Empecemos con un círculo.

Imagina que dibujamos una línea de longitud `r` desde el centro del círculo. El punto final es `P(x, y)`. El ángulo entre esta línea y el eje x es `θ`.

![Definición de sin y cos](sin_cos_definition_es.png)

Podemos entenderlo así:

cos(θ) = x / r<br>
sin(θ) = y / r

Para programar y dibujar, esta forma es más útil:

x = r × cos(θ)<br>
y = r × sin(θ)

Es decir:

- `cos` calcula qué tan lejos está el punto del centro en la dirección horizontal.
- `sin` calcula qué tan lejos está el punto del centro en la dirección vertical.

Si `θ` cambia poco a poco de `0` grados a `360` grados, el punto `P` dará una vuelta completa alrededor del centro. Los proyectos de círculo, caleidoscopio y órbitas de planetas salen de esta misma idea.

#### 2. Encontrar fixed sine en MicroBlocks

MicroBlocks no muestra el bloque de trigonometría por defecto. Primero hay que añadir una biblioteca del sistema:

1. Haz clic en **Añadir biblioteca**.
2. Elige **Sistema**.
3. Busca y añade `miscPrims`.
4. En la paleta de bloques, busca **fixed sine 9000**.

![Bloque fixed sine](1_sine_function.png)

Hay un detalle que puede confundir: en **fixed sine 9000**, el valor `9000` no significa 9000 grados. Significa `90.00` grados.

Este bloque usa la regla "ángulo multiplicado por 100":

```text
0 grados      se escribe 0
30 grados     se escribe 3000
45 grados     se escribe 4500
90 grados     se escribe 9000
180 grados    se escribe 18000
360 grados    se escribe 36000
```

Por eso, si la variable `t` representa un ángulo normal, por ejemplo `t = 90`, dentro de **fixed sine** debemos escribir:

```text
t * 100
```

#### 3. ¿Por qué dividir entre 16384 o desplazar 14 bits a la derecha?

En matemáticas:

```text
sin(90°) = 1
sin(30°) = 0.5
```

Pero MicroBlocks solo usa operaciones con números enteros. Para evitar decimales, **fixed sine** agranda el resultado `16384` veces.

Por ejemplo:

```text
fixed sine 9000 = 16384
fixed sine 3000 ≈ 8192
fixed sine 0 = 0
```

Para volver a la escala que conocemos, hay que dividir entre `16384`:

![Dividir entre 16384](2_sine_16384.png)

También se puede desplazar 14 bits a la derecha:

![Desplazar 14 bits a la derecha](3_sine_14.png)

Porque:

```text
2^14 = 16384
```

Entonces:

```text
desplazar 14 bits a la derecha es casi lo mismo que dividir entre 16384
```

Al dibujar, normalmente no calculamos primero `sin` para obtener un decimal. Multiplicamos primero por el radio y después desplazamos 14 bits a la derecha:

```text
100 * fixed sine 9000 >> 14
```

Esto significa:

```text
100 * sin(90°)
```

El resultado es `100`.

#### 4. Probar algunos ángulos

Antes de dibujar figuras complejas, prueba algunos ángulos y observa los resultados.

![Programa de prueba de sin y cos](4_sin_cos_test_es.png)

Para `100 * sin(ángulo)`, puedes probar estos valores:

```text
100 * sin(0°)   ≈ 0
100 * sin(30°)  ≈ 50
100 * sin(45°)  ≈ 70
100 * sin(60°)  ≈ 86
100 * sin(90°)  ≈ 100
```

En el programa, las expresiones correspondientes son:

```text
100 * fixed sine 0 >> 14
100 * fixed sine 3000 >> 14
100 * fixed sine 4500 >> 14
100 * fixed sine 6000 >> 14
100 * fixed sine 9000 >> 14
```

¿Y `cos`?

En este programa usamos `sin` para representar `cos`:

```text
cos(t) = sin(t + 90°)
```

Como el ángulo de `fixed sine` debe multiplicarse por 100, en el programa se escribe así:

```text
fixed sine (t * 100 + 9000)
```

Por ejemplo:

```text
100 * cos(30°)
= 100 * sin(30° + 90°)
= 100 * fixed sine (3000 + 9000) >> 14
```

Modifica el ángulo `t` y observa cómo cambian `sin(t)` y `cos(t)`:

- Cuando `t = 0`, `sin(t)` está cerca de `0` y `cos(t)` está cerca de `100`.
- Cuando `t = 90`, `sin(t)` está cerca de `100` y `cos(t)` está cerca de `0`.
- Cuando `t = 180`, `sin(t)` está cerca de `0` y `cos(t)` está cerca de `-100`.

#### 5. Dibujar la curva y = 100 * sin(3x)

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_sinx.mp4" type="video/mp4">
</video>

Ahora dibujemos la primera curva:

```text
y = 100 * sin(3x)
```

La idea principal es hacer que `i` avance de izquierda a derecha y usarlo como coordenada x de la pantalla. Para cada valor de `i`, calculamos la coordenada y correspondiente y dibujamos un píxel.

![Programa de la curva seno](6_sint_es.png)

La expresión principal es:

```text
x = i
y = 120 - (100 * fixed sine (3 * i * 100) >> 14)
```

Hay tres puntos importantes:

1. `100` es la altura de la onda. Si lo cambias a `50`, la onda será más baja; si lo cambias a `110`, será más alta.
2. `3 * i` significa que el ángulo cambia más rápido. Si lo cambias a `1 * i`, la onda será más suave; si lo cambias a `5 * i`, la onda será más densa.
3. `120 - ...` se usa porque el eje y de la pantalla TFT aumenta hacia abajo. En matemáticas, un valor y más grande va hacia arriba; en la pantalla, un valor y más grande va hacia abajo.

Prueba estas variaciones:

```text
y = 50 * sin(3x)
y = 100 * sin(1x)
y = 100 * sin(5x)
y = 80 * sin(2x)
```

Preguntas para explorar:

- ¿Qué cambia cuando modificas el `100` del principio?
- ¿Qué cambia cuando modificas el `3` de `3x`?
- ¿Qué ocurre si cambias `120 -` por `120 +`?

#### 6. Dibujar un caleidoscopio

Un patrón de caleidoscopio puede entenderse como un círculo cuyo radio también cambia.

Al dibujar un círculo, el radio es fijo:

```text
r = 100
```

Al dibujar un caleidoscopio, el radio cambia con el ángulo:

```text
r = 10 * sin(n * t)
```

Después usamos ese `r` cambiante para calcular las coordenadas:

```text
x = r * 10 * cos(t)
y = r * 10 * sin(t)
```

![Programa del caleidoscopio](7_Kaleidoscope_es.png)

El parámetro más interesante para modificar es `n`. Afecta al número de pétalos y a la simetría del patrón.

Estos son los resultados con distintos valores de `n`:

![n igual a 3](Kaleidoscope_n=3.png)

![n igual a 4](Kaleidoscope_n=4.png)

![n igual a 5](Kaleidoscope_n=5.png)

![n igual a 6](Kaleidoscope_n=6.png)

En clase, cada grupo puede elegir un valor de `n` y luego modificar el color y el tamaño de los puntos para crear su propio caleidoscopio.

Prueba:

```text
n = 2
n = 3
n = 4
n = 5
n = 6
radio del punto = 1
radio del punto = 3
radio del punto = 5
```

Preguntas para explorar:

- Cuando `n` aumenta, ¿el patrón se vuelve más simple o más complejo?
- ¿Qué diferencia hay entre valores pares e impares de `n`?
- ¿Qué pasa si el color se vuelve aleatorio?

#### 7. Dibujar un círculo

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_circle.mp4" type="video/mp4">
</video>

Para dibujar un círculo, necesitamos x e y:

```text
x = 100 * cos(t)
y = 100 * sin(t)
```

En la pantalla, colocamos el centro del círculo en `(120, 120)`, así que el punto real que dibujamos es:

```text
x en pantalla = 120 + x
y en pantalla = 120 - y
```

![Programa del círculo](5_circle_es.png)

En MicroBlocks, esto se escribe así:

```text
x = 120 + (100 * fixed sine (t * 100 + 9000) >> 14)
y = 120 - (100 * fixed sine (t * 100) >> 14)
```

Aquí:

- `fixed sine (t * 100 + 9000)` significa `cos(t)`.
- `fixed sine (t * 100)` significa `sin(t)`.
- `100` es el radio del círculo.
- `t` cambia de `0` a `359`, lo que forma una vuelta completa.

Prueba:

```text
radio = 30
radio = 60
radio = 100
espera = 1 milisegundo
espera = 20 milisegundos
```

Un radio más grande crea un círculo más grande. Un tiempo de espera más corto dibuja más rápido.

#### 8. Modelo de planetas

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="video_palnet.mp4" type="video/mp4">
</video>

Finalmente, convertimos la trayectoria circular en un pequeño modelo de planetas.

Antes, al dibujar el círculo, dibujábamos píxeles. Ahora agrandamos cada punto dibujando un círculo pequeño, como si fuera un planeta moviéndose por su órbita.

![Programa de planetas](8_planet_es.png)

El programa define un bloque personalizado:

```text
planet radius _ speed _ color _ size _
```

Tiene cuatro parámetros:

- `radius`: el radio de la órbita, que controla qué tan lejos está el planeta del centro.
- `speed`: la velocidad de movimiento, que controla qué tan rápido se mueve el planeta.
- `color`: el color del planeta.
- `size`: el tamaño del planeta.

Dentro del bloque personalizado seguimos usando las mismas fórmulas del círculo:

```text
x = radius * cos(t)
y = radius * sin(t)
```

En MicroBlocks:

```text
x = radius * fixed sine (t * 100 + 9000) >> 14
y = radius * fixed sine (t * 100) >> 14
```

Posición en pantalla:

```text
x en pantalla = 120 + x
y en pantalla = 120 - y
```

Cuando se presiona el botón A, el programa dibuja primero el sol en el centro y luego emite `go!` para que los planetas de distintas órbitas empiecen a moverse al mismo tiempo.

Por ejemplo:

```text
planet radius 30  speed 50  size 3
planet radius 50  speed 20  size 5
planet radius 70  speed 10  size 7
planet radius 100 speed 5   size 9
```

Para pensar:

- ¿Un planeta con radio más grande siempre debe moverse más despacio?
- ¿Cómo se vería si el planeta más exterior fuera el más rápido?
- Si cada planeta no borra el fotograma anterior, ¿dibujará su órbita?
- Si cada planeta tiene un color distinto, ¿podemos convertirlo en un "reloj del sistema solar"?
