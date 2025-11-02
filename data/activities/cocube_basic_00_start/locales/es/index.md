<!-- show-mobile-notice -->
CoCube es un robot educativo de IA de nivel de escritorio, desarrollado conjuntamente por un equipo de maestría y doctorado de la Universidad Jiao Tong de Shanghái y la Universidad de Fudan, con el objetivo de abrir la puerta a la inteligencia artificial para los jóvenes y crear una plataforma creativa llena de interactividad, logros y diversión. CoCube estimula la curiosidad y la creatividad de los estudiantes al involucrarlos en el diseño de robots de IA, desde la programación simple hasta la construcción de sistemas interactivos complejos, ayudándolos a convertir sus ideas e inspiraciones en realidad.

### I. Aspectos destacados de la plataforma CoCube

![](cocube_platform.png)

### II. CoCube especificaciones técnicas

#### 1. CoCube Robot Body

![Front of CoCube Robot](CoCube_front.png =300x*)
![Back of CoCube Robot](robot.png =300x*)

| **especificación** | **parámetro**                                      |
| ------ | --------------------------------------------- |
| Control maestro   | ESP32 Xtensa® 32-bit LX6 Procesadores de núcleo simple/dual |
| Wi-Fi  | 802.11 b/g/n (2.4Ghz)                         |
| Bluetooth | Protocolo estándar BLE                     |
| mover     | Chasis diferencial de doble vía con una velocidad máxima de movimiento de 50 unidades/s |
| posicionamiento  | Alta velocidad de fotogramas, posicionamiento absoluto a nivel milimétrico, resolución angular de 1° |
| Pantalla TFT   | Pantalla a todo color de 1.54 pulgadas @240\*240                          |
| Tecla      | Botón de encendido (abajo, mantenga presionado durante 3 segundos para encender), botón AB (detrás del fuselaje) |
| zumbador       | Zumbador pasivo                                         |
| Interfaz magnética | CoCube 4Pin Interfaz de sujeción magnética (I2C + I/O + UART),5V @ 600mA |
| batería de litio | 400mAh @ 7.4V                                 |
| Voltaje de carga | Interfaz Tipo C,5V @ 1.2A                            |
| Duración de la batería | Modo de programación por cable, modo de programación inalámbrica Bluetooth ilimitado, aproximadamente 2 horas Modo Wi-Fi, aproximadamente 1 hora |
| Dimensiones del producto | 45 × 45 × 38 mm                                |
| Peso del producto | 63g                                           |

#### 2. CoMaps Mapa de ubicación

Los robots CoCube son capaces de obtener ubicaciones y ángulos precisos en los mapas de ubicación de CoMaps.

Para un CoMap estándar, el tamaño total es aproximadamente del tamaño de un papel A3 y está diseñado con una variedad de temas, como desafíos de laberintos, desafíos de conducción, The Martian y más.

![CoMaps Example - Maze Challenge Theme Positioning Map](comap.png)

Las coordenadas de la esquina superior izquierda del mapa son (0,0), las coordenadas de la esquina inferior derecha son (300,200), el eje X es de izquierda a derecha (0 ~ 300) y el eje Y es de arriba a abajo (0 ~ 200).

El robot está 0 grados en la dirección positiva del eje Y y 180 grados cuando el robot está orientado hacia la dirección negativa del eje Y, y el ángulo de rotación en sentido contrario a las agujas del reloj aumenta.

Las líneas punteadas se imprimen en el mapa cada 50 unidades, por lo que puede localizar rápidamente la ubicación de las coordenadas.

Los mapas de ubicación de CoMaps admiten costuras extendidas para un tamaño mayor del rango de posicionamiento.

> Consulte al equipo de CoCube para los temas de mapas de ubicación de CoMaps o los requisitos de personalización de mapas grandes de CoMaps。

#### 3. CoModules Módulo de expansión

El robot CoCube se puede ampliar fácilmente con diferentes módulos de detección, actuación, visualización e IA a través de conectores magnéticos.

Actualmente, se admiten los siguientes módulos de expansión:

| Módulos de expansión | Imagen | Se introducen funciones y escenarios |
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinza servo | ![](gripper.png =200x*) | Servos personalizados de alto rendimiento, alfombrilla antideslizante de silicona de diseño que no se atasca<br>, agarre más suave,<br>adecuado para el manejo logístico y otros cursos y escenarios de eventos. |
| ToF (Tiempo de vuelo) | ![](ToF.png =200x*) | Al emitir un láser infrarrojo, se mide el tiempo que tarda la luz en llegar a un objeto y reflejarse, lo que da como resultado datos de distancia precisos. Tiene una excelente adaptabilidad a la luz y no se ve afectado por la reflectividad del objetivo, y puede funcionar de manera estable en diversas condiciones de iluminación y escenarios de uso. |
| Panel de luz a todo color WS2812 | ![](NeoPixel.png =200x*) | Con una matriz de 6 x 8, proporciona 48 perlas de lámpara RGB independientes y controlables, admite una variedad de colores y efectos dinámicos, y se puede programar y controlar fácilmente mediante un microcontrolador o un controlador dedicado, lo que admite el ajuste píxel por píxel y efectos de rendimiento enriquecidos. |
| Reconocimiento de gestos 3D | ![](3Dgesture.png =200x*) | Integra un sensor de reconocimiento de gestos de alta precisión y baja potencia para admitir el reconocimiento de gestos en el espacio tridimensional y realizar un control interactivo con robots. |
| Módulo de percepción visual de IA | ![](image-1.png =200x*) | Diseñado por el avanzado procesador de red neuronal RISC-V de 64 bits K210, el módulo de percepción visual de IA integra una variedad de algoritmos de visión avanzados, como reconocimiento de color, detección de puntos, detección de segmentos de línea, reconocimiento de tarjetas, reconocimiento facial, reconocimiento de AprilTag, reconocimiento de códigos QR, etc., lo que hace que las aplicaciones de visión de IA estén al alcance de la mano. Es adecuado para cursos y escenarios de competencia como IA + robot sandbox creativo. |
| dlight          | ![](dlight.png =200x*) | Sensor de detección de luz ambiental digital con características de tamaño pequeño y bajo consumo de energía, adecuado para varios escenarios de detección de brillo y ajuste de control. |
| ASR          | ![](ASR.png =200x*) | Módulo de reconocimiento de voz con 150 palabras de comando comunes integradas, compatible con palabras de activación y palabras de comando de auto-aprendizaje. Adecuado para diálogo por voz, control de hogar inteligente y otros escenarios. |

> Si tiene algún requisito para el nuevo CoModule, póngase en contacto con el equipo de desarrollo de CoCube.

### III. Plataforma gráfica de programación MicroBlocks

Para la arquitectura de software, CoCube tiene como objetivo ofrecer una experiencia de programación fácil de usar mientras se mantiene Flexibilidad y escalabilidad para soportar su hardware modular. El sistema utiliza MicroBlocks para el firmware desarrollo y bibliotecas de bloques, con interfaces de comunicación para APIs avanzadas que permitan Tareas.

Basado en la plataforma MicroBlocks, CoCube se puede programar gráficamente directamente en el navegador, sin necesidad de descargarlo ni instalarlo.

MicroBlocks es un lenguaje de programación gráfico inspirado en Scratch para la "computación física".

página: [MicroBlocks-Home](https://microblocks.fun/)

página: [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

No te dejes intimidar, créeme, ¡solo se necesitan 5 minutos para que los niños de 2º año comiencen a programar CoCube! ¡Tú también puedes!

![](microblocks.jpeg)


#### 1. Conecta el robot CoCube

En la página MicroBlocks, hay dos formas de conectar un dispositivo CoCube. Se recomienda la conectividad inalámbrica como prioridad.

**1.1 Conexión inalámbrica**

1. Asegúrese de abrir el navegador Chrome o Edge [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27) Interfaz de programación

2. Asegúrese de que la función Bluetooth de su computadora esté activada

3. Mantenga presionado el interruptor durante 3 segundos (el botón del interruptor se encuentra en la parte inferior del robot) para encender el robot CoCube, y después de encenderlo, se mostrarán tres caracteres en la pantalla del robot, que representan el número de BLE

4. Haga clic en el icono "USB" en la interfaz de MicroBlocks y toque Conexión inalámbrica (BLE)

5. En circunstancias normales, se pueden reconocer las palabras "MicroBlocks XXX" o "CoCube XXX", y XXX es el mismo que el número que muestra el robot cuando se enciende

6. En Linux, debe habilitar el permiso BLE de la página web:
   - Ingrese **chrome://flags/** en la barra de navegación del navegador
   - Busque "Bluetooth", encontrado **Utilice el nuevo backend de permisos para Web Bluetooth** y cambielo de **Por defecto** a **Habilitar**
   - Sólo tienes que reiniciar tu navegador.

![](image-3.png)

**1.2 Conexión por cable**

1. Recomendado **Chrome y Edge** Navegador, abierto [MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27) Interfaz de programación

2. Conecte su computadora a su CoCube con un cable USB

3. Mantenga presionado el interruptor durante 3 segundos (el botón del interruptor se encuentra en la parte inferior del robot) para encender el robot CoCube

4. Haga clic en el icono "USB" en la interfaz de MicroBlocks y toque la conexión por cable

5. En circunstancias normales, se puede identificar el puerto serie (COM*** en Windows, cu.wchusbserial*** en MacOS)

6. Si el puerto serie no se puede identificar normalmente, es posible que la computadora no tenga instalado un controlador de puerto serie y que sea necesario instalar el controlador del puerto serie CH343 al chip USB

   [Controlador de MacOS](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html)       
   [Controlador de Windows](https://www.wch.cn/downloads/CH341SER_ZIP.html)

7. Si sigues sin poder conectarte, comprueba si el cable USB funciona

#### 2. Actualice el firmware del CoCube

Cuando use el dispositivo por primera vez, actualice el firmware más reciente de su CoCube para obtener la mejor experiencia.

1. Conexión por cable al robot CoCube

2. Haga clic en la configuración del IDE de MicroBlocks, haga clic en "Actualizar el firmware de la placa base", seleccione "CoCube" y seleccione el número de puerto correspondiente.

![](image_upgrade.png =360x*)
![](image_upgrade_cocube.png =400x*)

* El proceso de actualización tarda aproximadamente 1 minuto, durante el cual mantenga el IDE de MicroBlocks en la pantalla del navegador. Trate de no hacer nada más durante este período. De lo contrario, la actualización del firmware puede fallar, si la actualización falla, vuelva a actualizar.