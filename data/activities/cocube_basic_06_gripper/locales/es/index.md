### 1. Propósito

El robot CoCube se puede utilizar junto con módulos externos para implementar funciones más complejas, y en esta sección se explica cómo programar el uso del módulo de agarre.

### 2. Materiales utilizados

![Robot CoCube × 1](robot.png =200x*) ![Módulo de pinza](image.png =200x*) ![PC o tablet](PC.png =250x*)

### 3. Plataformas de software

[MicroBlocks——CoCube y módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. Programación

1. **Conectar dispositivos**: Conecta el IDE de MicroBlocks al robot CoCube por cable o de forma inalámbrica, y monta la pinza en el robot CoCube.

2. **Cargar la biblioteca del módulo externo**: Haz clic en el orden que se muestra para cargar la biblioteca "Módulo CoCube".

![](image-2.png =200x*)

![](image-3.png =200x*)

![](image-4.png =200x*)

* **Encuentra los bloques de la pinza**: Haz clic en la tarjeta "Módulo CoCube" de la biblioteca de bloques de la izquierda y arrastra los bloques "abre la pinza", "cierra la pinza" y "pon la pinza a _ (0 a 70) grados" al espacio de trabajo.

* **Ejecuta los bloques de la pinza**: Haz clic en "abre la pinza" o "cierra la pinza". Cuando aparezca un halo verde alrededor del bloque, el programa se habrá ejecutado y podrás ver cómo la pinza se abre o se cierra. Escribe un ángulo de 0 a 70 en "pon la pinza a _ (0 a 70) grados" para moverla a ese ángulo.

![](scriptImage257997.png)

### 5. Reto

Intente usar el módulo de agarre para recoger algunos objetos pequeños a su alrededor y lleve el pequeño cilindro de espuma en la caja de accesorios del punto C al punto E del mapa del laberinto.

![](scriptImage225548.png)

![](c7635be25d2040f3c514dd4f9c9cef5d_00_00_00-00_00_30.gif)

Programa de muestra de referencia: [MicroBlocks-CoCube Case 05 Robots manipuladores](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%0A%0Ascript%20408%20121%20%7B%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20to%27%20100%20120%2050%0A%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%27ccmodule_gripper%20degree%27%2010%0A%27CoCube%20move%20to%27%20200%20150%2050%0AwaitMillis%201000%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%7D%0A%0A)
