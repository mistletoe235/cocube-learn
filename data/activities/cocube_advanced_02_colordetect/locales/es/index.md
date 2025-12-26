### 1. Objetivo

Aprende la función de detección de bloques de color del módulo de percepción de visión IA y usa CoCube para reaccionar a diferentes bloques de color.

<video width="320" height="240" controls>
  <source src="colordetect.mp4" type="video/mp4">
</video>

### 2. Materiales

![PC o Tablet](PC.png =300x*)
![Robot CoCube + Módulo de Visión IA](Sentry2.png =300x*)

### 3. Plataforma de Software

[MicroBlocks-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conocimiento del Algoritmo

#### Tutorial de Referencia

Documentación: [Introducción al Algoritmo — Detección de Bloques de Color (Blob)](https://tosee.readthedocs.io/zh/latest/Sentry2/Vision/index.html#chapter-vision-blob-index)

El estado de funcionamiento de la pantalla de Sengo1 se muestra a continuación. La pantalla se divide en 100 partes iguales horizontalmente (X) y verticalmente (Y). La esquina superior izquierda de la imagen de la cámara es el origen (0,0), la esquina inferior derecha es (100,100) y el centro es (50,50). Cuando se detecta un bloque de color correspondiente, devuelve su X, Y, W y H.

![](image.png =400x*)
![](image-1.png =300x*)

#### Descripción de los Bloques

1. **Bloque de Inicialización Sengo1**

El bloque de inicialización debe ejecutarse antes de usar la cámara. Generalmente se coloca bajo el bloque de sombrero "al empezar".

![](init.png)

2. **Bloque de Configuración de Modo Sengo1**

![](setmode.png)

3. **Configuración de Parámetros del Algoritmo de Detección de Color**

Selecciona el color a detectar y el tamaño del área de reconocimiento.

![](setparam.png)

4. **Lectura de Resultados de Bloques de Color Sengo1**

![](result.png)

![](property.png)

Devuelve los resultados de detección del bloque de color, incluyendo la coordenada x del centro, la coordenada y del centro, el ancho (w) y el alto (h).

### 5. Programación

1. **Conectar Dispositivo:** Conecta el IDE de MicroBlocks al robot CoCube mediante una conexión por cable o inalámbrica, y acopla el módulo de visión IA en la parte frontal del robot CoCube.

2. **Cargar Librerías de Bloques:** Añade "CoCube Sengo1" o "CoCube Sengo2" desde la librería del robot. La elección depende del modelo de hardware de la cámara; no hay una diferencia significativa en el uso. Sengo2 tiene más funciones. Este tutorial utiliza la librería Sengo1.

![](image-2.png =300x*)
![](image-3.png =300x*)

3. **Inicialización del Módulo de Cámara:** Inicializa Sengo1 al arrancar. Establece el modo de algoritmo de la cámara en "Blob Detect" para el reconocimiento de colores. Inicializa las variables "dx" y "dy" a 0, que se usarán para juzgar la posición del bloque de color objetivo.

![](camera_init.png)

4. **Obtener Repetidamente la Posición del Bloque de Color:** Usa el atributo "Sengo1 get blob" para observar las etiquetas de posición y tamaño cuando el bloque de color objetivo está en pantalla. Determina los parámetros del centro. Usa "dx" y "dy" para calcular la desviación del centro de la pantalla y decidir cómo debe ajustar CoCube su dirección y posición.

![](adjust_process.png)

![](get_position.png)


5. **Escribe tu Propio Programa:** ¡Con el código de depuración anterior, intenta combinar más funciones!

### 6. Desafío

Basándote en la función de reconocimiento de colores, implementa una función para seguir un cilindro azul en movimiento.

Nota: Debes configurar manualmente los parámetros de reconocimiento de color para la cámara Sengo1, cambiando el color detectado del rojo predeterminado de fábrica a azul.

![](final_code.png)


Código de Referencia: [Caso: Sengo1 Detección de Color](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Ascript%20494%2078%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0AwaitMillis%201000%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo1%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20906%2078%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo1%20get%20blob%27%20%27x%27%29%20%28%27Sengo1%20get%20blob%27%20%27y%27%29%20%28%27Sengo1%20get%20blob%27%20%27w%27%29%20%28%27Sengo1%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20494%20334%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo1%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo1%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20920%20334%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Blob%20Detect%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20502%20638%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)

Código de Referencia: [Caso: Sengo2 Detección de Color](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Ascript%20841%20335%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28dx%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2015%0A%20%20%7D%20%28dx%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2015%0A%20%20%7D%20%28dy%20%3E%3D%2010%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2030%0A%20%20%7D%20%28dy%20%3C%3D%20-10%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2030%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20415%2078%20%7B%0AwhenStarted%0A%27Sengo2%20init%27%0AwaitMillis%203000%0A%27Sengo2%20change%20algorithm%27%20%27Blob%20Detect%27%0A%27Sengo2%20set%20blob%20detect%20property%27%20%27yellow%27%203%204%0Adx%20%3D%200%0Ady%20%3D%200%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20415%20335%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20if%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20%20%20dx%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27x%27%29%20-%2050%29%0A%20%20%20%20dy%20%3D%20%28%28%27Sengo2%20get%20blob%27%20%27y%27%29%20-%2040%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20828%2079%20%7B%0AwhenCondition%20false%0Aif%20%28isType%20%28%27Sengo2%20read%20blob%27%29%20%27string%27%29%20%7B%0A%20%20sayIt%20%28%27Sengo2%20get%20blob%27%20%27x%27%29%20%28%27Sengo2%20get%20blob%27%20%27y%27%29%20%28%27Sengo2%20get%20blob%27%20%27w%27%29%20%28%27Sengo2%20get%20blob%27%20%27h%27%29%0A%7D%0A%7D%0A%0Ascript%20424%20639%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%7D%0A%0A)
