### 1. Haz que CoCube toque sobre el mapa

En un mapa de laberinto o de campo de fútbol, CoCube se mueve con precisión: puede detectar su posición y su dirección. En un mapa musical, CoCube se convierte en un pequeño músico. Al leer el **ID de la tarjeta** de las distintas zonas del mapa, CoCube puede saber sobre qué "tecla" está y activar la nota MIDI correspondiente.

![MIDI Map](music-map.png)

### 2. Prepárate

#### Paso 1: Añade la biblioteca MIDI Synthesizer

En el IDE de MicroBlocks, abre **Añadir biblioteca**. En la carpeta de bibliotecas **Sonido**, busca y añade **MIDI Synthesizer**.

Estos son los bloques que usaremos en esta actividad.

![Code1](allScripts166612.png)

#### Paso 2: Despierta el módulo MIDI

Conecta firmemente el módulo MIDI a CoCube. Después usa el programa para activar la alimentación del módulo.

- Asegúrate de que CoCube está conectado por USB o BLE.

- En la biblioteca **Módulo CoCube**, busca y ejecuta el bloque **activa la alimentación del módulo**.

- Mira la luz: cuando el LED verde del módulo MIDI permanece encendido, está listo.

### 3. Explora el mapa

Antes de empezar a tocar música, veamos cómo funciona el mapa musical.

#### Experimento: lee el ID de la tarjeta

Escribe un bucle sencillo que haga que CoCube **diga** el ID de la tarjeta actual.

![Code2](scriptImage867838.png)

Deberías ver dos reglas importantes:

- Sobre una zona de tecla, el ID de la tarjeta muestra el número de nota MIDI de esa tecla, por ejemplo 60 o 61.

- Cuando CoCube sale del mapa, el ID de la tarjeta vuelve a 0.

### 4. Construye el programa paso a paso

#### Paso 1: Haz el primer sonido

Empieza con la idea más directa: si CoCube está sobre una zona de teclas, de 60 a 84, toca una nota durante 500 ms. Si sale de la zona de teclas, detén el sonido.

Usa una variable global llamada `key` para guardar el ID de la tarjeta leído en cada vuelta del bucle.

![Code3](scriptImage797397.png)

Ejecuta el programa y pruébalo.

#### Paso 2: Cambia el bloque de nota

En el primer programa, cada nota queda forzada a bloques de 500 ms. ¿Podemos hacer que responda más rápido, de modo que el sonido empiece en cuanto CoCube llegue a una tecla y se detenga cuando CoCube salga?

Primero, elimina la duración de 500 ms y prueba a cambiar el bloque "toca nota MIDI" por el bloque "pon nota MIDI".

Aquí está el código:

![Code4](scriptImage4116525.png)

Pero puede sonar raro. Por ejemplo, si CoCube se queda sobre la tecla 60, el bucle activa "pon nota MIDI" una y otra vez, así que la nota no puede sonar de forma suave.

#### Paso 3: Observa los cambios de estado

Para solucionarlo, compara el estado actual con el anterior. Añade una variable global llamada `last_key` y actualiza `last_key` con el valor de `key` al final de cada vuelta del bucle.

Activa una nueva nota solo cuando la tecla actual, `key`, sea diferente de la tecla anterior, `last_key`.

![Code5](scriptImage4764998.png)

Ahora el programa debería sentirse mucho más fluido.

#### Paso 4: Detén bien la nota anterior

Cuando te mueves rápidamente por las teclas, varias notas pueden solaparse y sonar confusas. Esto se nota especialmente con sonidos largos, como sección de cuerdas, conjunto, metales, cañas, viento o sintetizadores.

Aquí tienes una forma de limpiarlo:

![Code6](scriptImage5149988.png)

Antes de empezar una nueva nota, fuerza que la nota anterior se apague.

Ahora prueba a deslizar CoCube por el mapa otra vez. El sonido debería cambiar limpiamente, incluso con sonidos largos como la sección de cuerdas.

### 5. Reto y creación

La música puede sonar bien y también verse bien. Añade una respuesta visual a tu programa: haz que diferentes alturas muestren diferentes colores en la pantalla.

![Code6](allScripts5315050.png)

Puedes seguir construyendo desde aquí. Por ejemplo, cuando CoCube caiga en distintas zonas de instrumentos de la primera fila del mapa musical, cambia el módulo MIDI a diferentes sonidos de instrumento y encuentra tu combinación favorita.
