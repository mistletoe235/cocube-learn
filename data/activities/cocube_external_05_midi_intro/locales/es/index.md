### 1. Conoce MIDI: el lenguaje digital de la música

MIDI, abreviatura de Musical Instrument Digital Interface, es una forma estándar para que los instrumentos electrónicos, los ordenadores y otros dispositivos se comuniquen. Un archivo MIDI no es sonido grabado. Se parece más a una lista de instrucciones: cuándo tocar, con qué fuerza tocar, qué nota tocar y cuánto tiempo mantenerla.

En MIDI, cada nota de la música occidental tiene un número del 0 al 127:

- Punto de referencia: el do central es la nota MIDI 60.

- Octavas: cada vez que el número sube 12, la altura sube una octava.

- Ejemplo rápido: la nota C5 al comienzo de "Twinkle, Twinkle, Little Star" es la nota MIDI 72.

Consejo: ten cerca tu mapa musical de CoCube. Es una guía muy útil para encontrar notas rápidamente.

![MIDI Map](music-map.png)

### 2. Prepárate

#### Paso 1: Añade la biblioteca MIDI Synthesizer

En el IDE de MicroBlocks, elige **Añadir biblioteca**. En la carpeta de bibliotecas **Sonido**, busca y añade la biblioteca **MIDI Synthesizer**.

Observa primero los dos bloques que vamos a usar.

![Code1](scriptImage9464221.png)

![Code2](scriptImage9510294.png)

#### Paso 2: Despierta el módulo MIDI

Después de conectar el hardware, necesitamos activar la alimentación del módulo desde el programa.

- Asegúrate de que CoCube está conectado por USB o BLE.

- En la biblioteca **Módulo CoCube**, busca y ejecuta el bloque **activa la alimentación del módulo**.

![Code3](scriptImage9483840.png)

- Mira la luz: cuando el LED verde del módulo MIDI permanece encendido, el módulo está listo para tocar.

### 3. Toca tus primeras notas

#### Paso 1: Toca una nota

Prueba a juntar estos tres bloques:

![Code4](scriptImage4096714.png)

MIDI define 128 instrumentos estándar. Encontrarás grupos conocidos como piano, percusión cromática, órgano, guitarra, bajo y sección de cuerdas. Cada grupo también tiene varios sonidos diferentes. Prueba el menú desplegable y explora cómo suena cada instrumento.

#### Paso 2: Guarda una melodía en una lista

Para tocar una canción completa, podemos guardar las notas en una lista. Luego CoCube puede recorrer la lista y tocar "Twinkle, Twinkle, Little Star" como una pequeña caja de música.

Primero, elige un sonido de instrumento para el canal 1. En este ejemplo usamos percusión cromática, instrumento número 3.

![Code5](scriptImage5116086.png)

Después, recorre la lista de notas para crear una canción sencilla:

![Code6](scriptImage9239031.png)

<audio controls src="little-star.ogg"></audio>

### 4. Haz que el sonido sea más grande

Si un solo canal suena un poco fino, prueba una técnica de capas que se usa a menudo al arreglar música.

#### Caso A: Unísono

Unísono significa que dos o más partes tocan la **misma altura** con el **mismo ritmo**.

En MicroBlocks, pon el canal 1 en piano y el canal 2 en percusión cromática. Usa mensajes de difusión para que las dos partes empiecen al mismo tiempo.

![Code7](allScripts6337470.png)
<audio controls src="unison.ogg"></audio>

Escucha otra vez. ¿La melodía suena más llena y con más color?

#### Caso B: Unísono de octava

Unísono de octava significa que dos partes tocan la **misma música**, pero una parte está **una octava más alta o más baja** que la otra.

Vamos a probarlo. En el programa que recibe el mensaje de difusión, suma 12 a cada valor de nota del canal 2.

![Code8](allScripts6709948.png)
<audio controls src="octave-unison.ogg"></audio>

Esta es una forma habitual de hacer que una melodía destaque en la música orquestal. Puede hacer que el sonido parezca más amplio y potente.

### 5. Reto y creación

Aquí tienes otra melodía corta que puedes usar como punto de partida.

![Code9](scriptImage9402947.png)

Ahora experimenta con tus propias ideas. Prueba diferentes parejas de instrumentos para el unísono, como flauta y sección de cuerdas, o ajusta el volumen de cada canal hasta encontrar un sonido que te guste.
