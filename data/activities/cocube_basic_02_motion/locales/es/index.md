### 1. Propósito

Programe el robot CoCube para implementar las funciones básicas de movimiento del robot.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =300x*) ![Personal Computer or Tablet](PC.png =300x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image.png)

### 4. Programación

#### Control de movimiento CoCube

1. **Conexión de dispositivos**: Conecte el IDE de Microblocks al robot CoCube a través de Bluetooth.

2. **Controle el robot para que se mueva hacia adelante, hacia atrás, hacia la izquierda, hacia la derecha y hacia atrás**: En la biblioteca de bloques "CoCube", arrastre los dos primeros bloques relacionados con el control del motor. Estos bloques controlan la dirección, la velocidad y la duración del movimiento del robot CoCube.

![](allScripts112573.png)

* **"Freno de motor" y "Freno de motor"**: ¡Escriba el siguiente código para experimentar la diferencia entre "Freno de motor" y "Freno de motor"! El "freno del motor" detendrá el robot a tiempo, mientras que la "parada del motor" simplemente elimina la potencia del motor, y el robot CoCube continuará deslizándose hacia adelante durante una corta distancia debido a la inercia. Puede haber ciertas tareas en las que necesite usar diferentes bloques de parada.

![](allScripts313641.png)

* **Control del robot para el "movimiento circular"**: El chasis del robot CoCube está diseñado en forma de pista. Al controlar la velocidad de las ruedas izquierda y derecha de manera diferente, puede simular más trayectorias de movimiento, como dejar que el robot CoCube gire en círculos.

![](scriptImage671505.png)

![](circle.gif)

Ejemplo de código de referencia: [MicroBlocks——CoCube Caso 02 Control de movimiento básico](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%0A%0Ascript%20649%20268%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20stop%27%0A%7D%0A%0Ascript%20929%20263%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0AwaitMillis%201000%0A%27CoCube%20wheels%20break%27%0A%7D%0A%0Ascript%20648%20456%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27CoCube%20set%20wheel%27%2040%2020%0A%7D%0A%0A)

### 5. Reto

Utilice los bloques de construcción de control del motor para controlar el CoCube y completar el movimiento de la trayectoria cuadrada.

Puedes probar, ¿cuánto tiempo gira el robot hacia la izquierda a una velocidad de 30 y puede girar 90 grados con mayor precisión?

![](scriptImage251172.png)

![](GIF.gif)

Ejemplo de código de referencia:

[MicroBlocks——CoCube Caso 02 Movimiento de trayectoria cuadrada](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%0A%0Ascript%20559%20174%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0Aforever%20%7B%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bforward%27%2040%201000%0A%20%20waitMillis%20250%0A%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20900%0A%20%20waitMillis%20250%0A%7D%0A%7D%0A%0A)

Si eres observador, es posible que con el tiempo, el error acumulado por el CoCube girando a la izquierda se haga cada vez más grande, y la trayectoria del cuadrado se distorsionará gradualmente. ¿Cómo podemos conseguir movimientos más precisos?

En la siguiente sección, ¡aprendamos a usar la alfombrilla de posicionamiento juntos!