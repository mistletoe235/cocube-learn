### Seguir al coche de delante

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower_2.mp4" type="video/mp4">
</video>

En una danza del dragón, la cabeza del dragón se mueve primero y las secciones del cuerpo la siguen una por una. En la naturaleza, cuando una oruga medidora avanza, la parte trasera de su cuerpo también alcanza continuamente a la parte delantera. Este proyecto crea una formación similar de líder-seguidor: el CoCube de delante es el "líder" y el CoCube de atrás lo sigue automáticamente según su posición.

Este programa usa ESP-NOW para enviar mensajes de posición entre robots. Cada robot transmite continuamente su propia posición. Si un robot descubre que debe seguir al robot de delante, lee su posición y se mueve hacia él cuando la distancia es demasiado grande.

#### 1. Demostración

Prepara dos o más CoCubes y descarga el mismo [programa en línea leader_follower][leader-follower-program] en cada robot. Este proyecto usa la función de posicionamiento en mapa de CoCube, así que coloca los robots sobre un mapa que permita el posicionamiento, como el mapa de fútbol, el mapa de laberinto, el mapa transparente u otro mapa personalizado.

Al ejecutar el programa, cada robot muestra su propio ID en la pantalla:

- ID `1`: robot líder.
- ID `2`: sigue al robot `1`.
- ID `3`: sigue al robot `2`.

Pulsa A para disminuir el ID en 1 y pulsa B para aumentarlo en 1. Se recomienda empezar la numeración desde `1`. Si por accidente el ID llega a `0`, pulsa B para volver a cambiarlo. Después de configurar los IDs, coloca los robots sobre el mapa. Mueve el robot `1` con la mano y el robot `2` intentará seguirlo. Si hay un robot `3`, seguirá al robot `2`, formando una larga fila de robots.

![Programa completo](allScripts_es.png)

La demostración en clase puede seguir este orden:

1. Empieza con dos robots, configúralos como `1` y `2`, mueve el robot `1` con la mano sobre el mapa de posicionamiento y observa cómo el robot `2` lo sigue.
2. Cambia la distancia entre los dos robots y observa cuándo el robot seguidor empieza a moverse y cuándo se detiene.
3. Añade un tercer robot, configúralo con ID `3` y observa si la formación sigue sección por sección como una danza del dragón.

#### 2. Idea principal del programa

La clave de este proyecto es dar a cada robot un `ID`.

Cada robot envía continuamente su posición mediante ESP-NOW:

```text
Contenido enviado: coordenada X, coordenada Y, dirección
Número enviado: su propio ID
```

Al recibir un mensaje, el robot primero decide si ese mensaje viene del robot que está justo delante:

```text
Si mi ID == ID recibido + 1:
    este mensaje viene del robot que debo seguir
```

Por ejemplo:

- El robot `2` solo sigue al robot `1`.
- El robot `3` solo sigue al robot `2`.
- El robot `4` solo sigue al robot `3`.

De esta forma, todos los robots ejecutan el mismo programa. Solo hace falta configurar IDs distintos para formar una estructura líder-seguidor.

#### 3. Configuración de comunicación ESP-NOW

Cuando el programa empieza, realiza varias acciones:

```text
ID = 1
D_limit = 60
establecer el canal ESP-NOW en 13
establecer el grupo ESP-NOW en 255
emitir "send_pos"
mostrar el ID actual
```

`D_limit` es el umbral de distancia de seguimiento. Cuando la distancia entre el robot delantero y el robot seguidor es mayor o igual que `60`, el seguidor empieza a avanzar. Cuando la distancia es menor que `60`, el seguidor se detiene.

El script `send_pos` envía la posición actual cada `50` milisegundos:

```text
Repetir:
    ESP-NOW envía pair:
        cadena = coordenada X, coordenada Y, dirección
        número = ID
    esperar 50 milisegundos
```

Aquí, usar mensajes pair de ESP-NOW tiene dos ventajas:

- La parte de cadena puede contener los datos de posición.
- La parte numérica puede contener el ID del robot.

#### 4. Cómo decidir si debe seguir

Cuando un robot recibe un mensaje ESP-NOW, lee el ID `id` del emisor.

```text
Si mi ID == id + 1:
    leer la posición del robot delantero
    calcular la distancia D entre el robot delantero y yo
    emitir "go!"
```

El programa separa la cadena enviada por el robot delantero en tres datos:

```text
robot_x = coordenada X del robot delantero
robot_y = coordenada Y del robot delantero
robot_theta = dirección del robot delantero
```

El programa actual usa principalmente `robot_x` y `robot_y`, es decir, la posición del robot delantero. Luego calcula la distancia usando la diferencia de coordenadas:

```text
dx = X del robot delantero - mi X
dy = Y del robot delantero - mi Y
D = sqrt(dx * dx + dy * dy)
```

Si `D` es demasiado grande, significa que el robot seguidor se ha quedado atrás. Si `D` no es grande, significa que el seguidor ya está suficientemente cerca.

#### 5. Acción de seguimiento

Después de recibir la difusión `go!`, el robot decide qué hacer según la distancia:

```text
Si D >= D_limit:
    move to target robot_x robot_y 50
En caso contrario:
    CoCube wheels break
```

Es decir, el robot seguidor no se mueve todo el tiempo. Solo se mueve hacia la posición actual del robot delantero cuando la distancia supera el umbral.

El programa incluye un bloque avanzado llamado **track target**. Debes activar el **Modo avanzado** para que aparezca en la biblioteca de CoCube. Este bloque hace que el robot primero apunte hacia el objetivo y luego corrija continuamente su dirección mientras avanza:

```text
Calcular la distancia al objetivo
Si la distancia es mayor que 3:
    apuntar hacia el objetivo
    repetir hasta que la distancia sea menor que 3:
        recalcular la distancia y el error de ángulo
        ajustar las velocidades de las ruedas izquierda y derecha según el error de ángulo
```

Así, el robot seguidor no avanza en línea recta sin control, sino que corrige continuamente las velocidades de sus ruedas según la dirección del punto objetivo. En comparación con la función **move to target point** de la biblioteca de CoCube, **track target** no es bloqueante. Puedes enviar nuevas coordenadas continuamente al robot, y siempre se moverá hacia el punto de coordenadas más reciente.

#### 6. Retos de ampliación

1. Formación tipo dragón

   Usa 4 o más CoCubes y configura sus IDs como `1, 2, 3, 4`. Observa si pueden formar una fila continua de seguimiento.

2. Competición por grupos

   Configura diferentes grupos o canales ESP-NOW para diferentes equipos, de modo que cada equipo de robots solo siga a su propio grupo.

3. Añade movimiento autónomo al robot `1`, por ejemplo una trayectoria circular, y observa si los demás robots pueden seguirlo.

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="leader_follower.mp4" type="video/mp4">
</video>

[leader-follower-program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Misc%20Primitives%27%20%27Tone%27%0A%0Ascript%20800%2078%20%7B%0AwhenButtonPressed%20%27A%27%0Aif%20%28ID%20%3E%3D%201%29%20%7B%0A%20%20ID%20%2B%3D%20-1%0A%20%20displayCharacter%20%28ID%20%25%2010%29%0A%20%20%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%7D%0A%0Ascript%201124%2080%20%7B%0AwhenButtonPressed%20%27B%27%0AID%20%2B%3D%201%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%27play%20tone%27%20%27nt%3Bc%27%200%20100%0A%27play%20tone%27%20%27nt%3Bg%27%200%20100%0A%7D%0A%0Ascript%20515%2088%20%7B%0AwhenStarted%0AID%20%3D%201%0AD_limit%20%3D%2060%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0A%27%5Bnet%3AESPNowSetGroup%5D%27%20255%0AsendBroadcast%20%27send_pos%27%0AdisplayCharacter%20%28ID%20%25%2010%29%0A%7D%0A%0Ascript%20514%20338%20%7B%0AwhenCondition%20%28espNow_receive_pair%29%0Alocal%20%27id%27%20%28espNow_last_number%29%0Aif%20%28ID%20%3D%3D%20%28id%20%2B%201%29%29%20%7B%0A%20%20local%20%27pos%27%20%28%27%5Bdata%3Asplit%5D%27%20%28espNow_last_string%29%20%27%2C%27%29%0A%20%20robot_x%20%3D%20%28at%201%20pos%29%0A%20%20robot_y%20%3D%20%28at%202%20pos%29%0A%20%20local%20%27robot_theta%27%20%28at%203%20pos%29%0A%20%20local%20%27dx%27%20%28robot_x%20-%20%28%27CoCube%20position_X%27%29%29%0A%20%20local%20%27dy%27%20%28robot_y%20-%20%28%27CoCube%20position_Y%27%29%29%0A%20%20D%20%3D%20%28%27%5Bmisc%3Asqrt%5D%27%20%28%28dx%20%2A%20dx%29%20%2B%20%28dy%20%2A%20dy%29%29%29%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20979%20354%20%7B%0AwhenBroadcastReceived%20%27send_pos%27%0Aforever%20%7B%0A%20%20espNow_send_pair%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%20ID%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20980%20606%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aif%20%28D%20%3E%3D%20D_limit%29%20%7B%0A%20%20%27CoCube%20track%20target%27%20robot_x%20robot_y%20%2740%27%0A%7D%20else%20%7B%0A%20%20%27CoCube%20wheels%20break%27%0A%7D%0A%7D%0A%0A
