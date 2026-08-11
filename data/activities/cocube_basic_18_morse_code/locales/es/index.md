### Construye una máquina de código Morse con CoCube

Antes de que existieran el teléfono e Internet, las personas utilizaban el código Morse para enviar mensajes. Este sistema solo emplea dos señales: una señal corta llamada **punto** y una señal larga llamada **raya**. Cada combinación de puntos y rayas representa una letra diferente.

En esta actividad convertiremos CoCube en una máquina de código Morse. Pulsa brevemente el botón A para introducir un punto o mantenlo pulsado para introducir una raya. Cuando termines una letra, espera un momento y CoCube mostrará la letra correspondiente.

Programa en línea: [Abrir en MicroBlocks][morse-program]

Archivo del programa: [`Morse_code.ubp`](Morse_code.ubp)

#### 1. Demostración

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="Morse_Code.mp4" type="video/mp4">
</video>

En el vídeo se introducen `C`, `U`, `B` y `E` para formar la palabra `CUBE`.

#### 2. Conocer el código Morse

El código Morse utiliza dos señales básicas:

- Punto `.`: una señal corta.
- Raya `-`: una señal larga.

Por ejemplo, A es `.-`, B es `-...` y C es `-.-.`.

| Letra | Código | Letra | Código | Letra | Código |
| --- | --- | --- | --- | --- | --- |
| A | `.-` | J | `.---` | S | `...` |
| B | `-...` | K | `-.-` | T | `-` |
| C | `-.-.` | L | `.-..` | U | `..-` |
| D | `-..` | M | `--` | V | `...-` |
| E | `.` | N | `-.` | W | `.--` |
| F | `..-.` | O | `---` | X | `-..-` |
| G | `--.` | P | `.--.` | Y | `-.--` |
| H | `....` | Q | `--.-` | Z | `--..` |
| I | `..` | R | `.-.` |  |  |

Puedes utilizar la imagen siguiente para memorizar rápidamente el código Morse de cada letra y número.

![Tabla para memorizar el código Morse](morse_memory.jpeg =640x*)

CoCube distingue los puntos y las rayas midiendo cuánto tiempo se mantiene pulsado el botón A:

```text
Botón pulsado durante 200 ms o menos  -> punto
Botón pulsado durante más de 200 ms   -> raya
Botón suelto durante 1000 ms           -> letra terminada
```

#### 3. Crear el programa

El programa contiene tres scripts: preparar la tabla de códigos, leer el botón y mostrar la letra descifrada.

##### 3.1 Preparar la tabla de códigos

Crea tres variables:

- `buff`: guarda los puntos y rayas introducidos.
- `codes`: guarda los códigos Morse de A a Z.
- `letters`: guarda las letras de A a Z.

![Preparar la tabla de código Morse](1_code_es.png)

Los elementos de `codes` y `letters` se corresponden por su posición. Por ejemplo, `.-` ocupa la posición 1 en `codes` y A ocupa la posición 1 en `letters`.

##### 3.2 Introducir puntos y rayas

Al pulsar el botón A, el programa reinicia el temporizador y reproduce un sonido. Cuando se suelta el botón, comprueba la duración de la pulsación:

- `200` milisegundos o menos: añade un punto `.` a `buff`.
- Más de `200` milisegundos: añade una raya `-` a `buff`.

![Introducir puntos y rayas](2_code_es.png)

El temporizador vuelve a reiniciarse para medir la pausa después de soltar el botón.

##### 3.3 Buscar y mostrar la letra

Cuando el botón lleva suelto más de `1000` milisegundos y `buff` no está vacío, el programa considera que la letra está terminada.

El programa busca `buff` en `codes`. Si lo encuentra, muestra la letra situada en la misma posición de `letters`. Si no lo encuentra, CoCube muestra `?`. Finalmente, borra `buff` para poder introducir la siguiente letra.

![Descifrar y mostrar la letra](3_code_es.png)

Por ejemplo, `-.-.` ocupa la posición 3 en `codes`, así que el programa muestra el tercer carácter de `letters`: `C`.

#### 4. Probar el programa

Empieza con algunas letras sencillas:

| Letra | Entrada |
| --- | --- |
| E | Pulsación corta |
| T | Pulsación larga |
| A | Corta, larga |
| N | Larga, corta |
| U | Corta, corta, larga |

Si las pulsaciones cortas resultan difíciles, cambia el límite entre punto y raya de `200` milisegundos a `250` o `300` milisegundos.

#### 5. Reto de programación: añadir números

El programa actual solo reconoce las letras de A a Z. ¿Puedes utilizar la tabla siguiente para enseñar a CoCube a reconocer los números del `0` al `9`?

| Número | Código Morse | Número | Código Morse |
| --- | --- | --- | --- |
| 0 | `-----` | 5 | `.....` |
| 1 | `.----` | 6 | `-....` |
| 2 | `..---` | 7 | `--...` |
| 3 | `...--` | 8 | `---..` |
| 4 | `....-` | 9 | `----.` |

[morse-program]: https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20410%2078%20%7B%0AwhenStarted%0Abuff%20%3D%20%27%27%0Acodes%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%20%27.-%27%20%27-...%27%20%27-.-.%27%20%27-..%27%20%27.%27%20%27..-.%27%20%27--.%27%20%27....%27%20%27..%27%20%27.---%27%20%27-.-%27%20%27.-..%27%20%27--%27%20%27-.%27%20%27---%27%20%27.--.%27%20%27--.-%27%20%27.-.%27%20%27...%27%20%27-%27%20%27..-%27%20%27...-%27%20%27.--%27%20%27-..-%27%20%27-.--%27%20%27--..%27%29%0Aletters%20%3D%20%27ABCDEFGHIJKLMNOPQRSTUVWXYZ%27%0A%7D%0A%0Ascript%20408%20348%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%27%5Bdisplay%3AmbPlot%5D%27%203%203%0AresetTimer%0Atone_startNote%20%27nt%3Bc%27%201%0AwaitUntil%20%28not%20%28buttonA%29%29%0AstopTone%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0Aif%20%28%28timer%29%20%3C%3D%20200%29%20%7B%0A%20%20sayIt%20%27.%27%0A%20%20buff%20%3D%20%28%27%5Bdata%3Ajoin%5D%27%20buff%20%27.%27%29%0A%7D%20else%20%7B%0A%20%20sayIt%20%27-%27%0A%20%20buff%20%3D%20%28%27%5Bdata%3Ajoin%5D%27%20buff%20%27-%27%29%0A%7D%0AresetTimer%0A%7D%0A%0Ascript%20898%20224%20%7B%0AwhenCondition%20%28and%20%28%28timer%29%20%3E%3D%201000%29%20%28%28size%20buff%29%20%3E%200%29%29%0Aif%20%28%28%27%5Bdata%3Afind%5D%27%20buff%20codes%29%20%3E%200%29%20%7B%0A%20%20displayCharacter%20%28at%20%28%27%5Bdata%3Afind%5D%27%20buff%20codes%29%20letters%29%0A%7D%20else%20%7B%0A%20%20displayCharacter%20%27%3F%27%0A%7D%0AsayIt%20buff%0Abuff%20%3D%20%27%27%0A%7D%0A%0A
