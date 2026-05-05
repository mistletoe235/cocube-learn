### 1. Cómo funciona

En robótica, el módulo de seguimiento de línea funciona como unos sensores de luz para CoCube. No ve lejos, pero lee muy bien el camino justo debajo del robot.

La idea principal es la reflexión infrarroja:

- Emisión y recepción: cada canal tiene un par de "ojos": un emisor infrarrojo y un receptor infrarrojo.

- Blanco y negro: una superficie blanca refleja la luz infrarroja hacia el receptor. Una línea negra absorbe más luz, así que el receptor recibe poca señal o ninguna.

- Decisión: CoCube comprueba cuál de los sensores 1 a 5 está sobre la línea negra y decide si la línea está a la izquierda, a la derecha o en el centro.

![Robot CoCube con sensor de seguimiento de línea](line_tracker.png)

Nota: cuando la cara sonriente mira hacia ti, los sensores están numerados del 1 al 5 de izquierda a derecha.

### 2. Preparación

Antes de hacer que el robot siga la línea, imprime un mapa de seguimiento y escribe un programa sencillo que muestre el estado de los cinco sensores en la pantalla LED de CoCube. Así podrás comprobar si el sensor funciona correctamente.

Abre la biblioteca **Módulo CoCube** y busca los bloques de seguimiento de línea.

![Código1](allScripts5824126.png)

#### Imprime el mapa de seguimiento

Descarga e imprime [A4_track.pdf](A4_track.pdf). Se recomienda usar papel mate para reducir las interferencias por reflejos.

![Pista](A4_track.png)

<a href="A4_track.png" download="A4_track.png">Descargar la imagen del mapa de seguimiento</a>

#### Programa de referencia

Usa un bucle para comprobar continuamente los sensores 1 a 5.

Si un sensor está sobre negro, enciende el píxel correspondiente en la pantalla LED.

Si un sensor está sobre blanco, apaga ese píxel.

![Código1](scriptImage5378404.png)

<video width="320" height="240" controls>
  <source src="20260502-125512.mp4" type="video/mp4">
</video>

Mueve el robot sobre el mapa con la mano. Si los puntos de la pantalla siguen la línea negra, el sensor está listo.

### 3. Crea el programa de seguimiento de línea

Ahora que CoCube puede detectar la línea, necesita una lógica de movimiento.

#### Idea principal: corregir el desplazamiento

Seguir una línea significa girar hacia el lado desde el que el robot se ha desviado:

Si el sensor central (3) está sobre la línea negra: avanza recto.

Si los sensores izquierdos (1 o 2) están sobre la línea negra: el robot se ha desviado hacia la derecha, así que debe girar a la izquierda.

Si los sensores derechos (4 o 5) están sobre la línea negra: el robot se ha desviado hacia la izquierda, así que debe girar a la derecha.

![Pista y CoCube](CoCube_on_line.png)

#### Escribe el programa de seguimiento

Caso especial: si todos los sensores (**ALL**) están sobre negro o todos están sobre blanco, por ejemplo al salir de la pista o al llegar a una línea transversal, frena los motores.

Giro fuerte a la izquierda: cuando el sensor 1 detecta negro, pon la rueda izquierda a 10 y la derecha a 50.

Giro fuerte a la derecha: cuando el sensor 5 detecta negro, pon la rueda izquierda a 50 y la derecha a 10.

Giro suave a la izquierda: cuando el sensor 2 detecta negro, pon la rueda izquierda a 20 y la derecha a 50.

Giro suave a la derecha: cuando el sensor 4 detecta negro, pon la rueda izquierda a 50 y la derecha a 20.

Movimiento recto por defecto: si no ocurre nada de lo anterior, normalmente cuando el sensor central está sobre la línea, mueve ambas ruedas a velocidad 50.

![Código2](scriptImage7107895.png)

<video width="320" height="240" controls>
  <source src="20260502-125523.mp4" type="video/mp4">
</video>

### 4. Piensa más: por qué importa el orden

En el programa, los sensores 1 y 5 se comprueban antes que los sensores 2 y 4.

¿Qué pasaría si invirtieras ese orden?

Pista: el programa se ejecuta de arriba abajo. Si el sensor 1 está sobre la línea, es posible que el sensor 2 también active su condición. Tratar primero los casos más extremos ayuda a mantener el robot en la pista.

### 5. Reto y creación

Después de completar la pista de rectángulo redondeado, prueba también a imprimir estos mapas.

¿Cómo deberías ajustar el programa para tomar bien los giros en ángulo recto?

![Pista2](A4_track_circle.png)
![Pista3](A4_track_rect.png)
![Pista4](A4_track_curve.png)

<a href="A4_track_circle.png" download="A4_track_circle.png">Descargar el mapa circular</a> / <a href="A4_track_rect.png" download="A4_track_rect.png">Descargar el mapa de ángulo recto</a> / <a href="A4_track_curve.png" download="A4_track_curve.png">Descargar el mapa de curvas</a>

Comparte un vídeo de tu robot completando una vuelta.
