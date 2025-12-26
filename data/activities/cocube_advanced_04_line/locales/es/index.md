### 1. Objetivo

Aprender la función de detección de líneas del sensor de visión IA e implementar el seguimiento de líneas automático con CoCube.

<video width="320" height="240" controls>
  <source src="line.mp4" type="video/mp4">
</video>

### 2. Materiales

![PC o Tablet](PC.png =300x*)
![Robot CoCube + Sensor de Visión IA](Sentry2.png =300x*)

[Mapa de Seguimiento de Líneas.pdf](map.pdf)

Mapa de seguimiento de líneas, descargable e imprimible en papel A3.

### 3. Plataforma de Software

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conocimiento del Algoritmo

#### Tutorial de Referencia

Documentación: [Introducción al Algoritmo — Detección de Líneas](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-line-index)

#### **Descripción de los Bloques**

1. **Bloque de Inicialización Sengo 1**

El bloque de inicialización debe ejecutarse antes de usar la cámara. Generalmente se coloca debajo del bloque de sombrero "al empezar".

![](init.png)

2. **Bloque de Configuración de Modo Sengo 1**

![](line_detect_mode.png)

3. **Atributos de Detección de Líneas Sengo 1**

![](get_angle.png)

Devuelve los atributos de la línea detectada, incluyendo el punto final x1 (superior), punto final y1 (superior), punto de inicio x2 (inferior), punto de inicio y2 (inferior) y el ángulo de inclinación del segmento de línea.

![](image.png)

#### **Consejos**

> 1. El fondo y las líneas deben ser claramente distintos (por ejemplo, líneas negras sobre un fondo blanco). Si el fondo está desordenado, podrían detectarse líneas en el fondo.
>
> 2. El grosor de la línea debe ser moderado, ni demasiado fina ni demasiado ancha.
>
> 3. Generalmente, durante el seguimiento de líneas, el primer segmento de línea detectado es el que se encuentra en la parte inferior de la pantalla, seguido de los segmentos de las ramificaciones.

### 5. Programación

1. **Conectar Dispositivo:** Conecta el IDE de MicroBlocks al robot CoCube mediante una conexión por cable o inalámbrica, y acopla el sensor de visión IA en la parte frontal del robot CoCube.

2. **Cargar Librerías:** Añade "CoCube Sengo1" o "CoCube Sengo2" desde la librería del robot. La elección depende del modelo de hardware de tu cámara; no hay una diferencia significativa en el uso, aunque Sengo2 ofrece un mejor rendimiento. Este tutorial utiliza la librería Sengo1.

![](image-1.png =300x*)
![](image-2.png =300x*)

3. **Inicialización de la Cámara:** Inicializa Sengo1 al arrancar y configura el modo de algoritmo de la cámara en "Line Detect" (Detección de Líneas).

![](init_code.png)

4. **Detección de Líneas:** Determina si se detecta una línea. Si es así, muestra sus 5 atributos. Puedes observar la posición y el ángulo de la línea en tiempo real.

![](get_line.png)

Ahora considera cómo mantener a CoCube sobre la línea basándote en su posición y ángulo. Dado que CoCube utiliza una tracción diferencial por orugas, necesita ajustar la velocidad de las dos ruedas para corregir su dirección cuando se desvía. Esta es una forma de control de retroalimentación negativa. Necesitamos determinar cuándo ajustar la dirección como se muestra a continuación:

* 1. Cuando la posición de la línea está a la izquierda, significa que CoCube se ha desviado a la derecha. Para volver al centro, calculamos la diferencia entre bottom_X y el centro de la pantalla (50), luego dividimos por un coeficiente proporcional para obtener un valor de diferencia de velocidad, definido como error_1.

* 2. Cuando el ángulo de la línea no es de 90 grados (lo que indica un giro próximo), necesitamos girar para seguir la línea. Calculamos la diferencia entre 90 grados y el ángulo, luego dividimos por otro coeficiente proporcional para obtener un valor de diferencia de velocidad, definido como error_2.

![](Screenshot.png)

La velocidad final de la rueda izquierda es igual a la velocidad base (por defecto 25) + error_1 + error_2, y la velocidad de la rueda derecha es igual a la velocidad base (por defecto 25) - error_1 - error_2.

(Nota: error_1 y error_2 utilizan retroalimentación negativa para ajustar la velocidad de las ruedas basándose en el error real, reduciendo así dicho error).

Código de la siguiente manera ([Seguimiento Automático de Líneas](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20430%2049%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%202000%0A%27Sengo1%20change%20algorithm%27%20%27Line%20Detect%27%0A%7D%0A%0Ascript%20428%20211%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%20%27number%27%29%20%7B%0A%20%20%20%20local%20%27bottom_x%27%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%0A%20%20%20%20local%20%27angle%27%20%28%27Sengo1%20get%20line%27%20%27degree%27%29%0A%20%20%20%20local%20%27speed_diff%27%20%28%28%28bottom_x%20-%2050%29%20%2F%206%29%20%2B%20%28%2890%20-%20angle%29%20%2F%206%29%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2825%20%2B%20speed_diff%29%20%2825%20-%20speed_diff%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20819%20107%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0A%7D%0A%0Ascript%20913%20179%20%7B%0AwhenCondition%20true%0Aif%20%28%28%27Sengo1%20get%20line%27%20%27x1%27%29%20%21%3D%200%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20line%27%20%27x1%27%29%20%28%27Sengo1%20get%20line%27%20%27y1%27%29%20%28%27Sengo1%20get%20line%27%20%27x2%27%29%20%28%27Sengo1%20get%20line%27%20%27y2%27%29%20%28%27Sengo1%20get%20line%27%20%27degree%27%29%0A%7D%0A%7D%0A%0A)):

![](main_code.png)

5. **Escribe Tu Propio Programa:** Con el código de depuración anterior, ¡intenta usar otros parámetros como términos de retroalimentación negativa para una mayor precisión, o combina más funciones!