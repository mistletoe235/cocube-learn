### Tocar música con el zumbador sobre el mapa

CoCube no solo puede desplazarse sobre un mapa de posicionamiento. También puede convertir el mapa musical en un teclado que se toca deslizando el robot. En esta actividad no hace falta conectar un módulo MIDI: la música se reproduce con el zumbador integrado de CoCube.

Programa en línea: [Abrir en MicroBlocks][program]

Archivo del programa: [`Buzzer.ubp`](Buzzer.ubp)

#### 1. Preparación

Necesitarás:

- Un CoCube
- Un mapa musical de CoCube
- Un ordenador o una tableta con MicroBlocks

Conecta CoCube a MicroBlocks y ejecuta el programa. Coloca el robot sobre el mapa musical y deslízalo a mano por diferentes teclas para escuchar distintas alturas de sonido.

##### Opcional: soporte impreso en 3D

Al empujar CoCube directamente, la fricción entre las ruedas y el mapa puede dificultar el deslizamiento. El soporte de chasis incluido levanta ligeramente las ruedas para que el robot se deslice con mayor suavidad sobre el mapa musical.

[Descargar el archivo STL del soporte de CoCube](CoCube_Chassis_Bracket.stl)

Después de imprimirlo, coloca el soporte debajo de CoCube y desliza el robot a mano para tocar. El soporte está pensado únicamente para el deslizamiento manual; retíralo antes de poner en marcha los motores.

#### 2. Cómo produce sonido el mapa musical

CoCube puede leer el **ID de tarjeta** situado debajo del robot. Las teclas del mapa musical utilizan los números del `60` al `84`, que también son números de notas MIDI.

Por ejemplo:

- `60`: do central
- `61`: do sostenido
- `62`: re
- Cada incremento de 1 eleva el sonido un semitono

El bloque **iniciar tecla MIDI** de la biblioteca Tone convierte directamente estos números en tonos del zumbador, por lo que no hace falta crear una tabla de notas adicional.

#### 3. Programa completo

![Tocar música con el zumbador sobre el mapa](code_es.png)

El programa utiliza solo dos variables:

- `key`: el ID de tarjeta actual.
- `last_key`: el ID de tarjeta anterior.

##### Leer la tecla actual

El programa lee continuamente el ID de tarjeta de CoCube y guarda el resultado en `key`.

```text
key = ID de tarjeta de CoCube
```

##### Cambiar el sonido solo cuando cambia la tecla

Cuando `key` es diferente de `last_key`, CoCube ha entrado en una zona nueva. El programa cambia el sonido solo en ese momento, evitando que la misma nota se reinicie continuamente mientras el robot permanece sobre una tecla.

##### Iniciar y detener las notas

Cuando cambia la tecla, el programa detiene primero la nota anterior. Si el nuevo ID está entre `60` y `84`, inicia la nota MIDI correspondiente.

Cuando CoCube sale de la zona del teclado, el ID queda fuera de ese intervalo y el programa solo detiene el sonido. Finalmente, `last_key = key` guarda el estado actual.

La espera de `10` milisegundos mantiene una respuesta rápida sin ejecutar el bucle innecesariamente deprisa.

#### 4. Pruébalo

- Muestra el valor actual de `key` en la pantalla y observa el número de cada tecla.
- Registra las teclas por las que pasa CoCube y haz que reproduzca automáticamente la melodía.

[program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27Tone%27%0A%0Ascript%20506%20113%20%7B%0AwhenStarted%0Akey%20%3D%200%0Alast_key%20%3D%200%0Aforever%20%7B%0A%20%20key%20%3D%20%28%27CoCube%20card%20ID%27%29%0A%20%20if%20%28key%20%21%3D%20last_key%29%20%7B%0A%20%20%20%20stopTone%0A%20%20%20%20if%20%28and%20%28key%20%3E%3D%2060%29%20%28key%20%3C%3D%2084%29%29%20%7B%0A%20%20%20%20%20%20tone_startMIDIKey%20key%0A%20%20%20%20%7D%0A%20%20%20%20last_key%20%3D%20key%0A%20%20%7D%0A%20%20waitMillis%2010%0A%7D%0A%7D%0A%0A
