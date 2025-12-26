### 1. Objetivo

Aprender la función de reconocimiento de bloques de color del módulo de visión AI e implementar la clasificación de bloques de color utilizando la pinza de CoCube.

<video width="320" height="240" controls>
  <source src="ball_sorting.mp4" type="video/mp4">
</video>

### 2. Materiales

![PC o Tablet](PC.png =300x*)
![Robot CoCube + Módulo de Visión AI](Sentry2.png =200x*)
![Módulo de Pinza](gripper.png =200x*)

### 3. Plataforma de Software

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conocimiento del Algoritmo

#### Tutorial de Referencia

Documentación: [Introducción al Algoritmo — Detección de Bloques (Blob Detection)](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

El estado de funcionamiento en la pantalla del Sengo1 se muestra a continuación. La pantalla divide la imagen en 100 partes iguales horizontalmente (X) y verticalmente (Y). La esquina superior izquierda es el origen (0,0), la inferior derecha es (100,100) y el centro es (50,50). Cuando se detecta un bloque de color, devuelve sus valores X, Y, W y H.

![](image.png =400x*)
![](image-1.png =300x*)

#### **Descripción de los Bloques**

1. **Bloque de Inicialización Sengo 1**

El bloque de inicialización debe ejecutarse antes de usar la cámara. Generalmente se coloca bajo el bloque de sombrero "al empezar".

![](init.png)

2. **Bloque Sengo1 Establecer Modo**

![](setmode.png)

3. **Configuración de Parámetros de Detección de Bloques**

Selecciona el color a detectar y el tamaño de área mínimo/máximo.

![](setparam.png)

4. **Sengo1 Leer Resultados de Bloques**

![](read_blob.png)

![](property.png)

Devuelve los resultados de detección del bloque de color, incluyendo la coordenada X central, la coordenada Y central, el ancho W y el alto H.

### 5. Programación

1. **Conectar Dispositivo:** Conecta el IDE de MicroBlocks al robot CoCube mediante una conexión por cable o inalámbrica, y acopla el módulo de visión AI en la parte frontal del CoCube.

2. **Cargar Librerías:** Añade "CoCube Sengo1" o "CoCube Sengo2" desde la librería del robot. La elección depende del modelo de hardware de tu cámara; no hay una diferencia significativa en el uso básico. Sengo2 tiene más funciones. Este tutorial utiliza la librería Sengo1.

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **Inicialización del Módulo de Cámara:** Inicializa Sengo1 al arrancar. Configura la cámara en modo "Blob Detect" (Detección de Bloques) y define el color objetivo y el tamaño del área. Al usar la pinza, se debe usar el bloque de inicialización de la cámara para asegurar el suministro de energía al módulo de la pinza.

![](init_wait.png)

4. **Detección de Objetivo y Determinación de Parámetros:** Ajustando el umbral de la coordenada Y del bloque (el número en el círculo azul), puedes controlar la distancia entre CoCube y la bola. Este valor depende de la pose de la cámara y del entorno actual. La lógica es similar a las tareas anteriores de reconocimiento de tarjetas.

![](detect_target.png)

**Pregunta:** Los bloques anteriores carecen de juicio para la dirección X y ajustes de movimiento específicos. ¿Cómo podemos implementarlos?

5. **Ajuste de Movimiento:** Dado que CoCube utiliza una tracción diferencial por orugas, necesita ajustar la velocidad de las dos ruedas para corregir su rumbo cuando la bola objetivo se desvía. Podemos ajustar la posición controlando las velocidades de las ruedas izquierda y derecha simultáneamente. Cuando el objetivo está a la izquierda, la velocidad de la rueda izquierda debe ser menor que la de la derecha, y viceversa. Esta es una forma simple de control de retroalimentación negativa.

![](adjust_horizontal.png)

**Suplemento de Conocimiento — Control de Retroalimentación Negativa:** La retroalimentación negativa es como el instinto de mantener el equilibrio en una cuerda floja: si tu cuerpo se inclina hacia la izquierda (ocurre un error), tu cerebro ordena inmediatamente a tu cuerpo que se incline hacia la derecha (ajuste inverso). Este mecanismo de "restar donde hay demasiado, sumar donde hay poco" cancela las perturbaciones actuando contra la desviación, manteniéndote estable en la trayectoria objetivo.

6. **Escribe tu Propio Programa:** ¡Con el código de depuración anterior, intenta combinar más funciones tú mismo!

### 6. Desafío

Implementa una función de clasificación automática de bolas usando CoCube. Puedes añadir los botones A y B para un control de inicio y parada más flexible.

![](final_code.png)


Código de Referencia: [Sengo1 Caso de Clasificación de Bolas](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20440%2069%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20592%2069%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20763%2069%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo1%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)

Código de Referencia: [Sengo2 Caso de Clasificación de Bolas](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20400%2088%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%201000%0A%7D%0A%0Ascript%20552%2088%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20723%2088%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%205%205%0A%27ccmodule_gripper%20open%27%0AwaitMillis%2050%0A%27ccmodule_gripper%20stop%27%0A%27CoCube%20move%20to%27%2050%20150%2040%0A%27CoCube%20point%20towards%27%20150%20100%2030%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%2054%20124%2040%0A%20%20%27CoCube%20point%20towards%27%2025%20100%2030%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20waitMillis%2050%0A%20%20%27ccmodule_gripper%20stop%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%20%20%27Sengo2%20set%20blob%20detect%20property%27%20%27red%27%205%205%0A%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%0A%20%20%20%20if%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%3E%3D%2072%29%20%7B%0A%20%20%20%20%20%20exitLoop%0A%20%20%20%20%7D%0A%20%20%20%20local%20%27%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%27%20%28%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%20%2F%202%29%0A%20%20%20%20%27CoCube%20set%20wheel%27%20%2820%20%2B%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%20%2820%20-%20%E9%80%9F%E5%BA%A6%E5%B7%AE%E5%80%BC%29%0A%20%20%20%20waitMillis%2050%0A%20%20%7D%0A%20%20%27CoCube%20wheels%20break%27%0A%20%20%27ccmodule_gripper%20close%27%0A%20%20%27CoCube%20move%20to%27%20220%20100%2040%0A%20%20%27ccmodule_gripper%20open%27%0A%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%27CoCube%20point%20towards%27%20150%20100%2030%0A%7D%0A%7D%0A%0A)