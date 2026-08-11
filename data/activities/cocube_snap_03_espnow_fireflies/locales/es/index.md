### Sincronización de luciérnagas con ESP-NOW

<video controls style="width: 720px; max-width: 100%; height: auto;">
  <source src="fireflies.mp4" type="video/mp4">
</video>

En un bosque por la noche, muchas luciérnagas empiezan parpadeando cada una a su propio ritmo. Después de un tiempo, pueden formar poco a poco un ritmo común: primero un pequeño grupo parpadea junto, y luego una gran parte parpadea casi al mismo tiempo.

Este proyecto usa ESP-NOW para crear un experimento de "luciérnagas electrónicas". Cada placa actúa como una luciérnaga: parpadea según su propio ritmo y, cuando escucha que una compañera cercana parpadea, adelanta un poco su propio ritmo. Después de funcionar durante un tiempo, varias placas sincronizan gradualmente sus parpadeos.

Referencia:

- [Nicky Case: Fireflies](https://ncase.me/fireflies/)

#### 1. Demostración

Prepara 3 o más placas MicroBlocks compatibles con ESP-NOW y descarga el mismo programa [`firefly.ubp`](firefly.ubp) en cada una.

Al ejecutar el programa, cada placa inicia su propio reloj interno, parpadea a intervalos regulares y recibe mensajes de parpadeo enviados por otras placas. Al principio, sus tiempos de parpadeo pueden ser diferentes. Después de observar durante un rato, verás que los parpadeos se acercan poco a poco hasta formar una sincronización cada vez más ordenada.

![Programa completo](allScripts_es.png)

[Abrir el programa completo en MicroBlocks](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27ESP%20Now%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20400%2078%20%7B%0AwhenStarted%0A%27%5Bnet%3AESPNowSetChannel%5D%27%2013%0Atick%20%3D%20100%0Aclock%20%3D%200%0Acircle%20%3D%2012%0AsendBroadcast%20%27heartbeat%27%0AsendBroadcast%20%27listen%27%0A%7D%0A%0Ascript%201028%2078%20%7B%0AwhenBroadcastReceived%20%27flash%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2033554431%0A%27play%20tone%27%20%27nt%3Bc%27%201%20tick%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20400%20308%20%7B%0AwhenBroadcastReceived%20%27heartbeat%27%0Aforever%20%7B%0A%20%20waitMillis%20tick%0A%20%20clock%20%2B%3D%201%0A%20%20if%20%28clock%20%3E%3D%20circle%29%20%7B%0A%20%20%20%20espNow_send_pair%20%27light%27%2010%0A%20%20%20%20sendBroadcast%20%27flash%27%0A%20%20%20%20clock%20%3D%200%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20693%20308%20%7B%0AwhenBroadcastReceived%20%27listen%27%0Aforever%20%7B%0A%20%20if%20%28espNow_receive_pair%29%20%7Bif%20%28clock%20%3C%20circle%29%20%7B%0A%20%20%20%20clock%20%2B%3D%201%0A%20%20%7D%7D%0A%7D%0A%7D%0A%0Ascript%20676%2077%20%7B%0AwhenButtonPressed%20%27A%27%0Aclock%20%3D%20%28random%200%20circle%29%0A%7D%0A%0A)

La demostración en clase puede seguir este orden:

1. Enciende primero solo 1 placa y observa cómo parpadea con un ritmo fijo.
2. Enciende la 2.ª y la 3.ª placa y observa que al principio no están sincronizadas.
3. Coloca las placas más cerca unas de otras y espera a que se sincronicen poco a poco.
4. Pulsa el botón A de una placa para alterar aleatoriamente su reloj interno y observa cómo vuelve a unirse al ritmo del grupo.

#### 2. Principio de la sincronización de luciérnagas

Este programa usa tres variables para simular el ritmo interno de una luciérnaga:

- `tick`: el tiempo de un paso del reloj. En este programa, el valor predeterminado es `100` milisegundos.
- `clock`: el valor actual del reloj. Puede entenderse como "en qué paso va la luciérnaga".
- `circle`: un ciclo completo. En este programa, el valor predeterminado es `12`.

Podemos imaginar `clock` como un pequeño reloj circular:

Los identificadores son `0, 1, 2, 3, ... 11, 12` en orden.

Cuando `clock` llega a `circle`, la placa parpadea una vez y vuelve a poner `clock` en 0.

![Programa del reloj](clock.png)

La lógica principal puede entenderse así:

1. Cada `1` `tick`, aumente `clock` en `1`.
2. Cuando `clock >= circle`, envíe el mensaje ESP-NOW `light`.
3. Parpadee y vuelva a establecer `clock` en `0`.

La clave de la sincronización está en "empujar suavemente el reloj propio cuando se escucha el parpadeo de otra placa".

1. Cuando llegue un mensaje ESP-NOW, compruebe si `clock < circle`.
2. Si se cumple, aumente `clock` en `1`.

![Adelantar el reloj después de recibir](nudge.png)

Esta acción puede llamarse "empuje" o "ajuste suave". No hace que todas las placas se sincronicen de inmediato; solo permite que las placas retrasadas alcancen un poco a las que van por delante. Muchos pequeños empujes acumulados hacen que todo el grupo forme gradualmente el mismo ritmo.

#### 3. Ventajas de ESP-NOW

ESP-NOW es muy adecuado para este proyecto porque no funciona como "conectarse a un servidor y luego comunicarse", sino que permite que los dispositivos se envíen mensajes cortos directamente.

En este proyecto, ESP-NOW tiene varias ventajas claras:

1. No necesita router. En el aula no hace falta configurar el nombre ni la contraseña de una red WiFi.

2. Es adecuado para difusión de uno a muchos. Cuando una "luciérnaga" envía el mensaje `light`, los dispositivos cercanos pueden recibirlo.

3. Tiene baja latencia y una respuesta visual directa. Los estudiantes pueden ver claramente el efecto de "yo parpadeo una vez y otros se ven afectados".

4. Es adecuado para experimentos de comportamiento colectivo. Con 2 placas se puede observar la influencia mutua; con 3 o más placas, el proceso de sincronización se ve con mayor claridad.

Además, ESP-NOW tiene un alcance de comunicación relativamente largo. Si las condiciones lo permiten, el experimento de sincronización de luciérnagas puede realizarse en todo el aula.

#### 4. Preguntas para seguir explorando

1. Cambiar `tick`  
   Cuanto menor sea `tick`, más rápido será el ritmo de parpadeo; cuanto mayor sea `tick`, más lento será el ritmo.

2. Cambiar `circle`  
   Cuanto menor sea `circle`, más frecuentes serán los parpadeos; cuanto mayor sea `circle`, más largo será el intervalo entre parpadeos.

3. Cambiar la intensidad del empuje  
   Ahora, después de recibir un mensaje, el programa solo hace `clock += 1`. Si se cambia a `clock += 2` o `clock += 3`, ¿la sincronización será más rápida? ¿Será más fácil que se vuelva inestable?

4. Añadir filtrado de mensajes  
   Responder solo al mensaje `light` puede hacer que el programa sea más estable en un aula con muchas personas y muchos dispositivos.

5. Configurar diferentes canales  
   Asigna diferentes grupos a diferentes canales ESP-NOW para que cada grupo de luciérnagas solo se sincronice dentro de su propio grupo.
