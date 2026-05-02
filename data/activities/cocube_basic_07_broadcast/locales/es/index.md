### 1. Propósito

Programa el robot CoCube para sincronizar varias tareas con mensajes.

### 2. Materiales utilizados

![Robot CoCube × 1](robot.png =300x*) ![PC o tablet](PC.png =300x*)

### 3. Plataformas de software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Programación

En nuestros estudios anteriores, nos referimos principalmente a las estructuras secuenciales, donde el programa ejecuta cada instrucción paso a paso en un orden predeterminado. Sin embargo, en la práctica, a menudo nos encontramos con situaciones en las que necesitamos ejecutar varias tareas al mismo tiempo. Aquí es donde entra en juego la función de transmisión. En este caso, explicaremos cómo la función de difusión dispara una señal y cómo utilizar este mecanismo para lograr la ejecución paralela de dos partes de un programa.

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos.

2. **Encuentra los bloques**: Abre la categoría "Control", busca los bloques "al recibir _" y "envía _", y arrástralos al espacio de trabajo como se muestra en la imagen. La función de mensajes se construye con estos dos bloques.

![](image-1.png)

* **Programa de ejecución**: A través de la función de transmisión, es posible controlar el movimiento del robot CoCube y ejecutarlo en paralelo con la pantalla LED. Realice los dos programas siguientes para ver la diferencia entre la función de transmisión.

![](allScripts7227041.png)

![](allScripts7476361.png)

### 5. Reto

Debe haberse encontrado con un camión rociador en la vida, cuando el rociador está funcionando, tendrá un sonido cuando rocíe agua al mismo tiempo para recordar a los peatones circundantes que lo eviten, intentemos simular el funcionamiento del camión rociador.

![](allScripts475744.png)

![](<broadcast_car.gif>)

Programa de ejemplo de referencia: [MicroBlocks——CoCube Caso 06 Camión rociador](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27Tone%27%0A%0Ascript%20354%20110%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%2050%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20200%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%20%20%27CoCube%20move%20to%27%20100%20150%2015%0A%20%20sendBroadcast%20%27go%21%27%0A%7D%0A%7D%0A%0Ascript%20733%20107%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Ascroll_text%20%27careful%27%2020%0A%7D%0A%0Ascript%20733%20253%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Afor%20i%2050%20%7B%0A%20%20playMIDIKey%20%28i%20%2B%2050%29%2020%0A%7D%0A%7D%0A%0A)
