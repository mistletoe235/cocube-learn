### 1. Objeto del asunto

Programación del robot CoCube para la programación musical.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Programación

El robot CoCube está equipado con un zumbador, que se puede programar para emitir sonidos en diferentes tonos, y ajustar la duración del tono y el tiempo del intervalo para completar la composición y la reproducción:

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos.

2. **Localiza el bloque**: Busca el bloque Frecuencia de reproducción (261) Duración (500) ms) en el bloque Tono y arrástralo al espacio de trabajo.

3. **Para ejecutar el programa**: Haga clic con el botón izquierdo en el bloque. Cuando se enciende un halo verde alrededor de los bloques, significa que el programa se ha ejecutado con éxito y se puede escuchar el timbre del robot CoCube sonando, y se detendrá después de 0,5 segundos.

4. **Ajustar tono**: Cambie el número de tono y la duración para hacer sonidos de diferentes tonos.

5. **Disposición**: Aquí hay un conjunto de notas contralto y correspondencia de frecuencia: Do(523) Re(587) Mi(659) Fa(698) So(784) La(880) Xi (988), también puede verificar la relación entre las notas y frecuencias correspondientes en Internet. Arrastre varios bloques y modifique la frecuencia y la duración de cada bloque para completar el arreglo.

6. **Tono de parada**: Para evitar que suene el timbre, puede utilizar el bloque de tono de parada. Toque el bloque "Tono de parada" directamente en el área del bloque, o arrastre el bloque "Tono de parada" al espacio de trabajo y haga clic en él, y el CoCube dejará de reproducir sonido inmediatamente.

![](1734678667505.png)

### 5. Funciones avanzadas

Es muy tedioso buscar el contraste entre notas y frecuencias por ti mismo. ¿Hay una manera más fácil? En MicroBlocks, se ofrecen dos métodos sencillos.

#### 5.1 Notas

En música, las notas c, d, e, f, g, a y b se pueden usar para representar Do-Re-Mi-Fa-So-La-Ti, y el signo sostenido (♯) indica que la escala básica se eleva media nota, y la escala es 0, 1 y 2...... Puede representar graves, medios, agudos, etc.

![](image-1.png =350x*)

Vamos a intentar escribir una canción "Dos Tigres", y para que sea más fácil modificar el tempo de la música, creamos un ritmo variable global, que se coloca en cada uno de los bloques de notas tocados.

![](scriptImage5407537.png)

#### 5.2 MELODÍA

En un teclado MIDI, el número de nota MIDI corresponde al tono de la música y se utiliza principalmente para la producción de música digital y la comunicación entre instrumentos musicales.

Por ejemplo, 60 representa el Do central del piano, 61 representa C# y 62 representa D......

Pruébalo y escribe un efecto musical:

![](scriptImage5528060.png)

### 6. Reto

Intenta jugar a Little Star con el CoCube.

Consulte el programa de ejemplo:

![](scriptImage5737979.png)

[MicroBlocks——CoCube Case 04 - Music Programming](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27Tone%27%0A%0Ascript%20382%20144%20%7B%0AwhenStarted%0Acomment%20%27Two%20Tigers%27%0Abeat%20%3D%20400%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%20%20%27play%20tone%27%20%27D%27%201%20beat%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27C%27%201%20beat%0A%7D%0Arepeat%202%20%7B%0A%20%20%27play%20tone%27%20%27E%27%201%20beat%0A%20%20%27play%20tone%27%20%27F%27%201%20beat%0A%20%20%27play%20tone%27%20%27G%27%201%20%282%20%2A%20beat%29%0A%7D%0A%7D%0A%0Ascript%20827%20141%20%7B%0AwhenButtonPressed%20%27A%27%0Acomment%20%27Twinkle%2C%20Twinkle%2C%20Little%20Star%27%0Abeat%20%3D%20400%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Ba%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bg%27%200%20beat%0AwaitMillis%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bf%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Be%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bd%27%200%20beat%0A%27play%20tone%27%20%27nt%3Bc%27%200%20beat%0A%7D%0A%0Ascript%201212%20145%20%7B%0AwhenButtonPressed%20%27B%27%0Acomment%20%27MIDI%20Sound%20Effect%27%0Alocal%20%27delay%27%205%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%20delay%0A%7D%0A%7D%0A%0A)