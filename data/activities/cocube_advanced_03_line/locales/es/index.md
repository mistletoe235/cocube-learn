### 1. Propósito

Aprenda la función de detección de líneas del módulo de percepción visual de IA y use CoCube para implementar la función de inspección automática de líneas.

<video width="320" height="240" controls>
  <source src="line.mp4" type="video/mp4">
</video>

### 2. Materiales utilizados

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Perception Module](Sentry2.png =300x*)

[Mapa de patrulla .pdf](map.pdf)

Mapa de patrulla, descargable e impreso en papel A3.

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

O abrir el entorno de programación directamente para añadir módulos de concienciación visual de la IA: [MicroBlocks-AI Camera](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Conocimiento de algoritmos

#### Introducción a los algoritmos

![](image-2.png)

Detecta si hay líneas en la imagen, si hay dos puntos finales y se devuelve el ángulo de la línea, se pueden detectar hasta 5 segmentos de línea al mismo tiempo, y si es una curva, se devuelve un segmento de línea recta aproximado.

Haga clic para ver el vídeo: [Sentry2 Visual Sensor - Introducción al algoritmo de detección de líneas _ Pitido Miles _bilibili](https://www.bilibili.com/video/BV1de4y137QU/)

#### Parámetros de configuración

![](image-1.png)

Número de segmentos de línea en la interfaz de usuario que se pueden configurar para el rendimiento del algoritmo y la detección simultánea.

**Rendimiento del algoritmo:**

Elija el rendimiento correcto del algoritmo de energía para diferentes requisitos de la aplicación, con 3 opciones para "sensible," "equilibrado," "preciso".

El modo sensible es más sensible a las líneas pequeñas, mientras que el modo preciso ignora las líneas más pequeñas y se establece en el modo de equilibrio.

**Número de segmentos de línea:**

1 ~ 5 segmentos de línea se pueden establecer.

#### Volver a los resultados

![](image-3.png)

Cuando se detecta una línea, se devuelven sus dos extremos y su ángulo de inclinación.

**Nota:** 0 grados horizontalmente a la derecha, aumento en sentido contrario a las agujas del reloj, 90 grados verticalmente hacia arriba, 180 grados horizontalmente a la izquierda, generalmente el ángulo de salida no se detectará hacia abajo.

![](image.png)

Se pueden detectar hasta 5 segmentos de línea al mismo tiempo y, para que sea más fácil distinguirlos en la interfaz de usuario, se marcan con cinco colores en orden de resultados: rojo, amarillo, verde, azul y morado.

Cuando se leen los registros a través del maestro, se devuelven los siguientes datos:

| **resultado** | **significado**      |
| ------ | ----------- |
| 1      | Fin de la coordenada x del segmento de línea (alto) |
| 2      | Coordenada Y al final del segmento de línea (alta) |
| 3      | Coordenada X de inicio de segmento (baja) |
| 4      | Coordenada Y del punto de inicio del segmento de línea (baja) |
| 5      | El ángulo en el que se inclina el segmento     |

#### **Consejos y trucos**

1. El fondo y las líneas deben distinguirse claramente, como líneas negras sobre un fondo blanco, y si el fondo está desordenado, se pueden detectar líneas en el fondo.

2. El grosor de las líneas debe ser moderado, ni demasiado fino ni demasiado ancho.

3. En términos generales, cuando se patrulla una línea, el primer segmento es siempre el segmento que se encuentra en la parte inferior de la pantalla, seguido del segmento de rama.

#### **Instrucciones para los bloques a utilizar**

1. **Sentry2 Inicializar los bloques de construcción**

Un parámetro opcional es la dirección I2C. El valor predeterminado es 96. (0x60)

Antes de poder usar Sentry2, debe inicializar los bloques. Por lo general, se coloca debajo del bloque de sombrero "Cuando comienza".

![](init.png)

2. **Sentry2 establece los bloques de patrón**

![](<setmodeline.png>)

Debe establecer el modo en línea, es decir, el modo de detección de línea.

3. **Resultados de las pruebas de Sentry2**

![](result.png)

Antes de usar este bloque, debe asegurarse de que el modo de algoritmo de línea esté habilitado.

Este bloque es también el bloque utilizado para desencadenar la detección, y el resultado de la prueba solo se puede obtener si el bloque se utiliza primero.

El resultado devuelto es el número de resultados reconocidos por el algoritmo LINE actual.

El número de resultados se ve afectado por la configuración de parámetros del algoritmo correspondiente.

4. **La línea Sentry2 detecta los atributos del objeto**

![](linedetect.png)

Devuelve los atributos del Id. del objeto de detección de línea, incluido el punto final de la línea (alto), el punto final de la línea (alto), el inicio de la línea (bajo), el inicio de la línea (bajo), el inicio de la línea (bajo) y el ángulo de inclinación de la línea.

### 5. Programación

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos, y extienda el módulo de percepción visual de IA frente al robot CoCube.

2. **Cargue la biblioteca de bloques de creación**: Si no ha agregado la biblioteca de cámaras Sentry2 AI y la biblioteca de complementos CoCube, puede cargar primero la biblioteca de complementos CoCube y la biblioteca de cámaras Sentry2 AI.

3. **Inicializar el módulo de la cámara**: Habilite la fuente de alimentación del módulo externo al iniciar, luego inicialice la interfaz I2C después de 4 segundos cuando el módulo de la cámara se haya iniciado correctamente y, a continuación, configure el modo de algoritmo de la cámara en modo de línea para el reconocimiento de bloques de color.

![](linedetectinit.png)

4. **Detección de líneas**: recorre para determinar si se detecta una revisión de blob y, cuando el número de revisiones detectadas es 1, se generan cinco atributos de la revisión. Puede observar la ubicación, el tamaño y la etiqueta de color del bloque de color en tiempo real.

![](detectresult.png)

Ahora considere cómo mantener el CoCube en la línea de patrulla de acuerdo con la posición y el ángulo de la línea, porque el CoCube es una rueda diferencial con orugas, y cuando se desvía de la línea de patrulla, debe corregirse ajustando la velocidad de rotación de ambas ruedas. Por lo tanto, necesitamos determinar cuándo es necesario ajustar la dirección, como se muestra en la siguiente figura:

* 1\. En primer lugar, cuando la posición de la propia línea es hacia la izquierda, significa que el CoCube se ha sesgado hacia el lado derecho de la línea de patrulla, y lo que más esperamos es que el CoCube pueda volver al centro de la línea de entrenamiento más cercana lo antes posible, por lo que la elección bottom_X es la diferencia entre el centro de la pantalla (50), y luego dividir por un coeficiente de escala para obtener el valor de la diferencia, que se define como error_1.

* 2\. En segundo lugar, cuando el ángulo de la línea recta no es de 90 grados (es decir, hay un giro en la línea de patrulla frontal), significa que debemos girar para seguir la línea de patrulla. Por lo tanto, se selecciona el ángulo recto (90) para que sea la diferencia entre el ángulo y luego se divide por otro factor de escala para obtener el valor de la diferencia, que se define como error_2.

![](Screenshot.png)

Al final, la velocidad de la rueda izquierda es igual a la velocidad lineal (predeterminada 25) + error_1 + error_2, y la velocidad de la rueda derecha es igual a la velocidad lineal (predeterminada 25)-error_1-error_2.

(Nota: Aquí error_1 y error_2 adoptan la idea de la retroalimentación negativa, ajustan la velocidad de la rueda de acuerdo con el error real y luego reducen el error)

El código es el siguiente ([patrulla automática de línea](https://microblocks.fun/run/microblocks.html#scripts=GP%20Script%0Adepends%20%27CoCube%27%20%27Sentry2%20AI%20camera%27%0A%0Ascript%20681%2084%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28%28Sentry2_detect_result%200%29%20%3D%3D%201%29%20%7B%0A%20%20%20%20bottom_x%20%3D%20%28%27Sentry2%20detect%20lineobj%27%201%20%27bottomX%27%29%0A%20%20%20%20angle%20%3D%20%28%27Sentry2%20detect%20lineobj%27%201%20%27angle%27%29%0A%20%20%20%20wheel_error%20%3D%20%28%28%28bottom_x%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20angle%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2825%20%2B%20wheel_error%29%20%2825%20-%20wheel_error%29%0A%20%20%20%20waitMillis%2030%0A%20%20%7D%0A%7D%0A%7D%0A%0A)):

![](scriptImage560372.png)

* **Escriba su propio programa**: Con el código de depuración anterior, es posible que desee intentar usar otros parámetros como elementos de retroalimentación negativa para un seguimiento de mayor precisión, ¡o puede intentar combinar más funciones usted mismo!

### 6. Reto

Basado en la función de reconocimiento de bloques de color, se realiza la función de seguir el cilindro azul.

Tenga en cuenta que debe configurar manualmente los parámetros del reconocimiento de bloques de color de la cámara Sentry2 y cambiar el color del bloque de color del rojo predeterminado de fábrica a azul.