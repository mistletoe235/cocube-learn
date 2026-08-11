### Grabar y reproducir música

En la actividad anterior, [Tocar música con el zumbador sobre el mapa](../cocube_basic_19_buzzer_music_map-es/), CoCube leía los ID de tarjeta del mapa musical y reproducía las notas correspondientes con su zumbador.

Esta vez añadiremos una nueva capacidad: **recordar las teclas por las que pasa y reproducir automáticamente la melodía.**

Programa en línea: [Abrir en MicroBlocks][program]

Archivo del programa: [`Buzzer_Record_and_Replay.ubp`](Buzzer_Record_and_Replay.ubp)

#### 1. Cómo utilizarlo

1. Pulsa A. La pantalla muestra `Recording...` y comienza una nueva grabación.
2. Desliza CoCube por las teclas del mapa musical.
3. Pulsa B. La pantalla muestra `Playing...` y CoCube reproduce la melodía grabada.
4. Vuelve a pulsar B para reproducir la misma melodía tantas veces como quieras.
5. Pulsa A de nuevo para borrar la melodía anterior y comenzar otra grabación.

El programa solo registra el orden de las notas, no la velocidad del movimiento. Durante la reproducción, cada nota dura `300` milisegundos y después hay una pausa de `50` milisegundos.

#### 2. Preparar una lista de notas

El programa utiliza tres variables:

- `key`: el ID de tarjeta de la tecla actual.
- `last_key`: el ID de tarjeta anterior.
- `notes`: una lista que guarda en orden todas las notas grabadas.

![Inicializar las variables](1_when_start_es.png)

Al iniciar, `key` y `last_key` se establecen en `0`, y `notes` se convierte en una lista vacía.

Una lista es como un recipiente que puede crecer. Si CoCube pasa por las teclas `60`, `64` y `67`, la lista queda así:

```text
notes = [60, 64, 67]
```

#### 3. Pulsar A para comenzar a grabar

![Pulsar A para grabar](2_A_button_es.png)

Al pulsar A, el programa limpia la pantalla, muestra `Recording...` y prepara una grabación nueva:

```text
notes = lista vacía
last_key = 0
```

Esto elimina la melodía anterior. La lectura y reproducción de las teclas funciona casi igual que en la actividad anterior: el programa cambia de nota solo cuando `key` es diferente de `last_key`.

El bloque nuevo es:

```text
añadir key a notes
```

Cada vez que CoCube entra en una tecla válida, el programa reproduce la nota y añade su número al final de `notes`. De este modo, todas las teclas visitadas quedan guardadas en orden.

#### 4. Pulsar B para reproducir la melodía

![Pulsar B para reproducir](3_B_Button_es.png)

Al pulsar B, **detener otras tareas** finaliza el bucle de grabación. Después, el programa recorre la lista `notes`:

```text
para cada note de notes:
    reproducir note durante 300 milisegundos
    esperar 50 milisegundos
```

El bucle toma las notas desde el principio de la lista y las reproduce hasta completar toda la melodía.

La lista `notes` no se borra después de la reproducción, por lo que se puede pulsar B varias veces. La melodía anterior solo se elimina al volver a pulsar A.

#### 5. Pruébalo

- Cambia los `300` milisegundos y compara distintas velocidades de reproducción.
- Cambia los `50` milisegundos y escucha las pausas entre las notas.
- Muestra el número MIDI actual durante la reproducción.
- ¿Qué otro dato habría que registrar para conservar el ritmo original?

[program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27TFT%27%20%27Tone%27%0A%0Ascript%20400%2070%20%7B%0AwhenStarted%0Akey%20%3D%200%0Alast_key%20%3D%200%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%7D%0A%0Ascript%20400%20225%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Recording...%27%2040%20110%20%28colorSwatch%200%20255%200%20255%29%0Anotes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0Alast_key%20%3D%200%0Aforever%20%7B%0A%20%20key%20%3D%20%28%27CoCube%20card%20ID%27%29%0A%20%20if%20%28key%20%21%3D%20last_key%29%20%7B%0A%20%20%20%20stopTone%0A%20%20%20%20if%20%28and%20%28key%20%3E%3D%2060%29%20%28key%20%3C%3D%2084%29%29%20%7B%0A%20%20%20%20%20%20tone_startMIDIKey%20key%0A%20%20%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20key%20notes%0A%20%20%20%20%7D%0A%20%20%20%20last_key%20%3D%20key%0A%20%20%7D%0A%20%20waitMillis%2010%0A%7D%0A%7D%0A%0Ascript%20844%20224%20%7B%0AwhenButtonPressed%20%27B%27%0AstopAll%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Playing...%27%2060%20110%20%28colorSwatch%200%20255%200%20255%29%0Afor%20note%20notes%20%7B%0A%20%20playMIDIKey%20note%20300%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A
