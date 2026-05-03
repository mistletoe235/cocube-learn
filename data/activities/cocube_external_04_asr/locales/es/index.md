### 1. Objetivo

Aprende a usar el módulo ASR de reconocimiento de voz para que CoCube pueda escuchar tu voz y responder a órdenes.

También probarás órdenes personalizadas y construirás un programa sencillo de navegación por voz.

[[note]]
Esta actividad está escrita en español, pero el módulo ASR usa el firmware en inglés. Cuando hables con el módulo, usa las frases en inglés indicadas en la tabla.
[[/note]]

### 2. Materiales

![Robot CoCube x 1](robot.png =200x*)
![Módulo ASR de reconocimiento de voz](asr_module.png =180x*)
![Ordenador o tableta](PC.png =250x*)

### 3. Plataforma de software

[MicroBlocks - CoCube & Módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. Primeras pruebas

1. **Conecta el hardware**

- Conecta el IDE de MicroBlocks a CoCube por USB o BLE.
- Inserta bien el módulo ASR en CoCube.
- Trabaja en un lugar bastante silencioso. Habla claro y no demasiado rápido.

2. **Añade la biblioteca**

Abre **Añadir biblioteca** y añade **Módulo CoCube**. En esta actividad usaremos:

- `ASR obtén la orden`, que devuelve el ID de la orden reconocida.
- `ASR ejecuta la orden _`, que hace que el módulo ASR diga la respuesta de una orden.

![](image-1.png)

![](image.png)

![](scriptImage3526174.png)
![](scriptImage3536060.png)

3. **Prueba el reconocimiento y las respuestas de voz**

- Lee `ASR obtén la orden` repetidamente dentro de un bucle.
- Usa el ID recibido para hacer que CoCube avance, retroceda, se detenga o haga otra acción.
- Empieza con una palabra de activación, como **Hey CoCube** o **Hey robot**. Cuando el módulo se activa, se enciende su indicador.
- Di una orden en inglés. El módulo ASR responde y tu programa de MicroBlocks recibe el ID de la orden.

![](scriptImage3963949.png)

[[note]]
#### Consejos

Después de encender el módulo, espera un momento antes de hablar.

Si el sonido está demasiado alto, di **Decrease volume** o **Minimum volume**.
[[/note]]

#### Tabla de órdenes e ID
<details>
<summary>Mostrar u ocultar la lista completa de órdenes</summary>

| ID | Di esto en inglés | Tipo | Respuesta del ASR |
|----|--------------------|------|-------------------|
| 1 | Learned wake word | Palabra de activación | I'm here |
| 2 | Hey CoCube | Palabra de activación | I'm here |
| 3 | Hey robot | Palabra de activación | I'm here |
| 4 | Custom 1 | Orden | OK |
| 5 | Custom 2 | Orden | OK |
| 6 | Custom 3 | Orden | OK |
| 7 | Custom 4 | Orden | OK |
| 8 | Custom 5 | Orden | OK |
| 9 | Custom 6 | Orden | OK |
| 10 | Custom 7 | Orden | OK |
| 11 | Custom 8 | Orden | OK |
| 12 | Custom 9 | Orden | OK |
| 13 | Custom 10 | Orden | OK |
| 14 | Custom 11 | Orden | OK |
| 15 | Custom 12 | Orden | OK |
| 16 | Custom 13 | Orden | OK |
| 17 | Custom 14 | Orden | OK |
| 18 | Custom 15 | Orden | OK |
| 19 | Move forward | Orden | Moving forward |
| 20 | Move backward | Orden | Moving backward |
| 21 | Stop | Orden | Stopped |
| 22 | Turn left ninety degrees | Orden | Turning left ninety |
| 23 | Turn left forty-five degrees | Orden | Turning left forty-five |
| 24 | Turn left thirty degrees | Orden | Turning left thirty |
| 25 | Turn right ninety degrees | Orden | Turning right ninety |
| 26 | Turn right forty-five degrees | Orden | Turning right forty-five |
| 27 | Turn right thirty degrees | Orden | Turning right thirty |
| 28 | Speed up one level | Orden | Speed increased |
| 29 | Slow down one level | Orden | Speed decreased |
| 30 | Turn on headlights | Orden | Headlights on |
| 31 | Turn off headlights | Orden | Headlights off |
| 32 | Line-following mode | Orden | Line-following mode on |
| 33 | Light-tracking mode | Orden | Light-tracking mode on |
| 34 | Bluetooth control mode | Orden | Bluetooth control on |
| 35 | Obstacle avoidance mode | Orden | Obstacle avoidance on |
| 36 | Face recognition | Orden | Face recognition on |
| 37 | Object tracking | Orden | Object tracking on |
| 38 | Object detection | Orden | Object detection on |
| 39 | Line tracking | Orden | Line tracking on |
| 40 | Color recognition | Orden | Color recognition on |
| 41 | Tag recognition | Orden | Tag recognition on |
| 42 | Object classification | Orden | Object classification on |
| 43 | QR code recognition | Orden | QR code recognition on |
| 44 | Clear screen | Orden | Screen cleared |
| 45 | Start learning | Orden | Learning started |
| 46 | Forget | Orden | Forgotten |
| 47 | Load model | Orden | Loading model |
| 48 | Save model | Orden | Model saved |
| 49 | Take a photo | Orden | Photo saved |
| 50 | Save and return | Orden | Saved |
| 51 | Show number zero | Orden | OK |
| 52 | Show number one | Orden | OK |
| 53 | Show number two | Orden | OK |
| 54 | Show number three | Orden | OK |
| 55 | Show number four | Orden | OK |
| 56 | Show number five | Orden | OK |
| 57 | Show number six | Orden | OK |
| 58 | Show number seven | Orden | OK |
| 59 | Show number eight | Orden | OK |
| 60 | Show number nine | Orden | OK |
| 61 | Show smiley face | Orden | OK |
| 62 | Show sad face | Orden | OK |
| 63 | Show heart | Orden | OK |
| 64 | Read current position | Orden | Reading |
| 65 | Read ambient light | Orden | Reading |
| 66 | Read compass | Orden | Reading |
| 67 | Read temperature | Orden | Reading |
| 68 | Read acceleration | Orden | Reading |
| 69 | Read sound level | Orden | Reading |
| 70 | Read button A | Orden | Reading |
| 71 | Read button B | Orden | Reading |
| 72 | Turn on camera | Orden | Camera on |
| 73 | Turn off camera | Orden | Camera off |
| 74 | Turn on fan | Orden | Fan on |
| 75 | Turn off fan | Orden | Fan off |
| 76 | Fan speed one | Orden | Level one on |
| 77 | Fan speed two | Orden | Level two on |
| 78 | Fan speed three | Orden | Level three on |
| 79 | Start oscillation | Orden | Oscillating |
| 80 | Stop oscillation | Orden | Stopped oscillation |
| 81 | Return to home | Orden | Returning |
| 82 | Open gripper | Orden | Gripper opened |
| 83 | Close gripper | Orden | Gripper closed |
| 84 | Turn on buzzer | Orden | Buzzer on |
| 85 | Turn off buzzer | Orden | Buzzer off |
| 86 | Turn on speaker | Orden | Speaker on |
| 87 | Turn off speaker | Orden | Speaker off |
| 88 | Play music | Orden | Playing music |
| 89 | Stop music | Orden | Music stopped |
| 90 | Previous song | Orden | Previous track |
| 91 | Next song | Orden | Next track |
| 92 | Repeat one | Orden | Repeat one |
| 93 | Repeat all | Orden | Repeat all |
| 94 | Shuffle play | Orden | Shuffle mode |
| 95 | Increase volume | Orden | Volume up |
| 96 | Decrease volume | Orden | Volume down |
| 97 | Maximum volume | Orden | Max volume |
| 98 | Minimum volume | Orden | Min volume |
| 99 | Medium volume | Orden | Medium volume |
| 100 | Turn on voice broadcast | Orden | Broadcast on |
| 101 | Turn off voice broadcast | Orden | Broadcast off |
| 102 | Turn on lights | Orden | Lights on |
| 103 | Turn off lights | Orden | Lights off |
| 104 | Increase brightness | Orden | Brighter |
| 105 | Decrease brightness | Orden | Dimmer |
| 106 | Maximum brightness | Orden | Max brightness |
| 107 | Minimum brightness | Orden | Min brightness |
| 108 | Increase color temperature | Orden | Warmer |
| 109 | Decrease color temperature | Orden | Cooler |
| 110 | Daylight mode | Orden | Daylight mode |
| 111 | Moonlight mode | Orden | Moonlight mode |
| 112 | Set color to red | Orden | Red set |
| 113 | Set color to orange | Orden | Orange set |
| 114 | Set color to yellow | Orden | Yellow set |
| 115 | Set color to green | Orden | Green set |
| 116 | Set color to cyan | Orden | Cyan set |
| 117 | Set color to blue | Orden | Blue set |
| 118 | Set color to purple | Orden | Purple set |
| 119 | Set color to white | Orden | White set |
| 120 | Turn on air conditioner | Orden | AC on |
| 121 | Turn off air conditioner | Orden | AC off |
| 122 | Increase temperature | Orden | Temperature up |
| 123 | Decrease temperature | Orden | Temperature down |
| 124 | Cooling mode | Orden | Cooling mode |
| 125 | Heating mode | Orden | Heating mode |
| 126 | Auto mode | Orden | Auto mode |
| 127 | Dehumidify mode | Orden | Dehumidify mode |
| 128 | Fan mode | Orden | Fan mode |
| 129 | Turn on vertical swing | Orden | Vertical swing on |
| 130 | Turn off vertical swing | Orden | Vertical swing off |
| 131 | Turn on horizontal swing | Orden | Horizontal swing on |
| 132 | Turn off horizontal swing | Orden | Horizontal swing off |
| 133 | Open window | Orden | Window opened |
| 134 | Close window | Orden | Window closed |
| 135 | Open curtains | Orden | Curtains opened |
| 136 | Close curtains | Orden | Curtains closed |
| 137 | Open door | Orden | Door opened |
| 138 | Close door | Orden | Door closed |

</details>

### 5. Funciones avanzadas

#### 5.1 Diseña tus propias órdenes

**Aprender una palabra de activación**

La palabra de activación es la frase que cambia el robot de modo espera a modo escucha.

Pasos:

- Activa el módulo con **Hey CoCube** o **Hey robot**.
- Di **Study wake**.
- Sigue las instrucciones de voz y di la nueva palabra de activación que quieras, por ejemplo **Hello CoCube**.
- Cuando termine el aprendizaje, ya podrás usar la nueva palabra de activación.

[[note]]
Antes de aprender una nueva palabra de activación, borra la palabra aprendida anterior si hace falta. Mantén la habitación en silencio y habla claro.
[[/note]]

**Aprender órdenes**

Una orden le dice al robot qué acción debe realizar.

Pasos:

- Activa el módulo con una palabra de activación.
- Di **Study command**.
- Sigue la indicación y di tu primera orden, por ejemplo **Turn on red light**.
- Continúa con la segunda y la tercera orden, o di **Quit study** para terminar.
- Los ID de las órdenes aprendidas empiezan en **4**. Usa el ID recibido en tu programa.

**Borrar palabras aprendidas**

Si quieres borrar palabras que enseñaste al módulo:

- Activa el módulo con una palabra de activación.
- Di **I want to delete**.
- Sigue la indicación y elige una opción:
  - **Delete command**: borra las órdenes aprendidas.
  - **Delete wake**: borra la palabra de activación aprendida.
  - **Delete all**: borra todas las palabras aprendidas.

**Órdenes para aprender y borrar**

| ID | Di esto en inglés | Para qué sirve | Respuesta del ASR |
|----|--------------------|----------------|-------------------|
| 151 | Study wake | Empieza a aprender una nueva palabra de activación | please follow the prompts to study wake up words in a quiet environment |
| 152 | Study command | Empieza a aprender órdenes | please follow the prompts to study command words in a quiet environment |
| 153 | Study again | Graba otra vez la orden | please follow the prompts to study command words in a quiet environment |
| 154 | Quit study | Sale del modo de aprendizaje | exit learning mode |
| 155 | I want to delete | Empieza a borrar palabras aprendidas | is it the learned wake up word or command word that needs to be deleted |
| 156 | Delete wake | Borra la palabra de activación aprendida | deletion succeeded |
| 157 | Delete command | Borra las órdenes aprendidas | deletion succeeded |
| 158 | Delete all | Borra todas las palabras aprendidas | deletion succeeded |

#### 5.2 Ejemplo de navegación por voz

Usa estos ID como punto de partida:

- ID 19: **Move forward**
- ID 20: **Move backward**
- ID 21: **Stop**

Después añade giros, cambios de velocidad u órdenes personalizadas para crear un coche robot controlado por voz.

Bloques de referencia:

![](scriptImage328081.png)
