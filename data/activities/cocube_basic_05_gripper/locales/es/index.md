### 1. Propósito

El robot CoCube se puede utilizar junto con módulos externos para implementar funciones más complejas, y en esta sección se explica cómo programar el uso del módulo de agarre.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =200x*) ![Gripper Module](image.png =200x*) ![Personal Computer or Tablet](PC.png =250x*)

### 3. Plataformas de software

[MicroBlocks——CoCube y módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. Programación

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos. Y extienda la servopinza al robot CoCube.

2. **Cargar bloques de complementos**: haga clic en el orden que se muestra para cargar la biblioteca de complementos de CoCube.

![](image-2.png =200x*)

![](image-3.png =200x*)

![](image-4.png =200x*)

* **Encuentre el bloque de agarre**: Haga clic en la tarjeta "Módulo CoCube" en la biblioteca de bloques de la izquierda y arrastre los tres bloques de "Mordaza abierta", "Mordaza cerrada" y "Ángulo de mordaza" al espacio de trabajo derecho.

* **Ejecute el bloque de agarre**: Haga clic con el botón izquierdo en el bloque "Mandíbula abierta" o "Mandíbula cerrada", cuando se ilumine un halo verde alrededor del bloque, significa que el programa se ha ejecutado con éxito y puede ver la mandíbula abriéndose y cerrándose. Rellene el número de ángulo (0 a 70) en el módulo "Ángulo de la mordaza" y la mordaza se girará al ángulo correspondiente.

![](scriptImage257997.png)

### 5. Reto

Intente usar el módulo de agarre para recoger algunos objetos pequeños a su alrededor y lleve el pequeño cilindro de espuma en la caja de accesorios del punto C al punto E del mapa del laberinto.

![](scriptImage225548.png)

![](c7635be25d2040f3c514dd4f9c9cef5d_00_00_00-00_00_30.gif)

Programa de muestra de referencia: [MicroBlocks-CoCube Case 05 Robots manipuladores](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%0A%0Ascript%20408%20121%20%7B%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20to%27%20100%20120%2050%0A%27CoCube%20rotate%20to%20angle%27%2090%2030%0A%27ccmodule_gripper%20degree%27%2010%0A%27CoCube%20move%20to%27%20200%20150%2050%0AwaitMillis%201000%0A%27ccmodule_gripper%20open%27%0A%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%7D%0A%0A)