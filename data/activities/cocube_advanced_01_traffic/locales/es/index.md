### 1. Objetivo

Programar el robot CoCube para comprender la tecnología de IA en visión artificial. Completar el reconocimiento de colores y de tarjetas de señales de tráfico para realizar las acciones correspondientes, logrando finalmente un sandbox creativo de tráfico inteligente.

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 2. Materiales

![PC o Tablet](PC.png =300x*)
![Robot CoCube + Módulo de Visión IA](robot.png =300x*)
![Tarjetas de Señales de Tráfico × 5](image-3.png =300x*)
![Ensamblaje de Poste de Señal](assembly.png =300x*)

Utilice el módulo de visión IA: "Sengo1 AI Camera" o "Sengo2 AI Camera". Como se muestra, la lente circular identifica imágenes. El modo de algoritmo se puede cambiar manualmente mediante el botón negro o controlarse a través de MicroBlocks.

### 3. Plataforma de Software

[MicroBlocks-CoCube](https://cocube.fun/#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

### 4. Conocimientos Básicos

#### **Descripción de los Bloques**

1. **Bloque de Inicialización de Sengo1**

El bloque de inicialización debe ejecutarse antes de usar la cámara. Generalmente se coloca bajo el bloque de sombrero "al empezar".

![](init.png)

2. **Bloque de Configuración de Modo de Sengo1**

![](mode_select.png)

Los algoritmos integrados incluyen "Reconocimiento de Color", "Detección de Manchas", "Detección de Pelotas", "Seguimiento de Líneas", "Reconocimiento de Tarjetas", "Reconocimiento Facial" y "Reconocimiento de Códigos QR".

Este caso utiliza "Reconocimiento de Tarjetas" y "Reconocimiento de Color" para explicar los principios de la cámara IA.

3. **Lectura de Color de Sengo1**

![](read_color.png)

![](get_color_rgb.png)

La lectura del color proporciona un tipo básico (por ejemplo, "rojo", "negro"). La obtención de los valores RGB permite un registro y reproducción del color más precisos.

4. **Ajuste del Área de Detección de Color de Sengo1**

![](adjust_area.png)

El área de detección es rectangular. Use este bloque para ajustar su tamaño: x e y controlan la esquina superior izquierda, mientras que el ancho (width) y el alto (height) controlan las dimensiones. Normalmente, el área está centrada; reducir el tamaño permite un reconocimiento más detallado.

![](image-2.png =200x*)
![](image.png =200x*)
![](image-1.png =200x*)

El color del borde del área de detección cambia según el color identificado. La imagen de la derecha muestra un área de detección ampliada.

5. **Lectura de Resultados de Tarjetas de Sengo1**

![](read_card.png)

Devuelve el resultado del reconocimiento de la tarjeta de tráfico.

![](card_property.png)

Devuelve los atributos del ID del objeto detectado, incluyendo la coordenada x del centro, la coordenada y del centro, el ancho (w) y el alto (h).

Sengo1 reconoce actualmente 5 tarjetas de tráfico: "Adelante", "Dar la vuelta", "Izquierda", "Derecha" y "Aparcar", que corresponden a los resultados "forward", "back", "left", "right" y "park".

Ensamble los bloques y pegue las tarjetas en ladrillos LEGO para crear señales de tráfico como se muestra:

![](traffic_cards.png =200x*)
![](assembly_detail.png =200x*)
![](traffic_card_forward.jpg =200x*)

### 5. Programación

1. **Conectar Dispositivo:** Conecte el IDE de MicroBlocks al robot CoCube mediante una conexión por cable o inalámbrica. Acople el módulo de visión IA a la parte frontal del robot.

2. **Cargar Librerías:** Añada "CoCube Sengo1" o "CoCube Sengo2" desde la librería. Sengo2 ofrece más funciones, pero su uso básico es similar. Este tutorial utiliza Sengo1.

![](image-4.png =300x*)
![](image-5.png =300x*)

3. **Reconocimiento de Color:** Combine el algoritmo de reconocimiento de color con la pantalla TFT. Cuando la cámara captura un color, extrae los componentes RGB y los envía a la pantalla TFT para cambiar dinámicamente el color del carácter "王".

![](color_change.png)

4. **Inicialización del Módulo de Cámara:** Coloque "Sengo1 init" bajo "al empezar" y configure el algoritmo en "Card Recog". Use mensajes (broadcasts) para configurar programas paralelos y defina un bloque de comando personalizado "camera".

![](camera_init.png)

![](parallel_part.png)

5. **Reconocimiento de Tarjetas de Tráfico:** Use lógica condicional para mapear la información de la tarjeta reconocida a movimientos específicos. Cuando se identifica una tarjeta específica, CoCube realiza la acción correspondiente.

![](recognition.png)

#### Consejo Profesional

> El reconocimiento de tarjetas puede detectar tarjetas lejanas, lo que podría activar acciones demasiado pronto. Use el "ancho de la tarjeta" (card width) para filtrarlas; por ejemplo, solo active acciones cuando el ancho de la tarjeta > umbral.

6. **Ajuste de Distancia:** Añada una comprobación de ancho al principio del bloque "camera" para controlar la distancia de activación.

![](scriptImage3274595.png)

![](scriptImage3141615.png)

Comparación antes y después del ajuste:

<video width="320" height="240" controls>
  <source src="video2.mp4" type="video/mp4">
</video>

<video width="320" height="240" controls>
  <source src="video1.mp4" type="video/mp4">
</video>

### 6. Desafío

Intente implementar un sandbox de tráfico inteligente a pequeña escala utilizando tarjetas y ladrillos para simular la conducción autónoma.

Código de Referencia: [Versión Sengo1 de Tráfico Inteligente](https://microblocks.fun/run-pilot/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Sengo1%27%0A%0Aspec%20%27%20%27%20%27camera%27%20%27camera%27%0Ato%20camera%20%7B%0A%20%20waitUntil%20%28judge%29%0A%20%20local%20%27var%27%20%28%27Sengo1%20read%20card%27%29%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%2090%0A%20%20%7D%20%28var%20%3D%3D%20%27back%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bleft%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20break%27%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27judge%27%20%27judge%27%0Ato%20judge%20%7B%0A%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20forever%20%7B%0A%20%20%20%20waitUntil%20%28isType%20%28%27Sengo1%20read%20card%27%29%20%27string%27%29%0A%20%20%20%20if%20%2830%20%3C%20%28%27Sengo1%20get%20card%27%20%27w%27%29%29%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20true%29%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20return%20%28booleanConstant%20false%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Ascript%20563%2078%20%7B%0AwhenButtonPressed%20%27A%27%0A%27Sengo1%20change%20algorithm%27%20%27Card%20Recog%27%0A%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0Aforever%20%7B%0A%20%20camera%0A%7D%0A%7D%0A%0Ascript%20400%20126%20%7B%0AwhenStarted%0A%27Sengo1%20init%27%0A%7D%0A%0Ascript%20971%20231%20%7B%0AwhenButtonPressed%20%27B%27%0A%27CoCube%20wheels%20break%27%0AstopAll%0A%7D%0A%0Ascript%20451%20236%20%7B%0Ato%20camera%20%7B%7D%0A%7D%0A%0Ascript%20467%201290%20%28booleanConstant%20false%29%0A%0Ascript%20799%20292%20%7B%0Ato%20judge%20%7B%7D%0A%7D%0A%0A)

Código de Referencia: [Versión Sengo2 de Tráfico Inteligente](https://microblocks.fun/run-pilot/microblocks.html/#scripts=GP%20Scripts%0Adepends%20%27BMP%27%20%27CoCube%27%20%27CoCube%20Sengo2%27%0A%0Aspec%20%27r%27%20%27Sengo2%20read%20card%27%20%27Sengo2%20read%20card%27%0Ato%20%27Sengo2%20read%20card%27%20%7B%0A%20%20if%20%28%28i2cGet%20_sg2_i2c_address%20%28hexToInt%20%2734%27%29%29%20%21%3D%200%29%20%7B%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2720%27%29%206%0A%20%20%20%20i2cSet%20_sg2_i2c_address%20%28hexToInt%20%2735%27%29%201%0A%20%20%20%20local%20%27var%27%20%28%27_sg2_read_reg_byte%27%20%28hexToInt%20%2788%27%29%29%0A%20%20%20%20if%20%28and%20%28var%20%3C%3D%2010%29%20%28var%20%3E%3D%201%29%29%20%7B%0A%20%20%20%20%20%20return%20%28at%20var%20_sg2_card_classes%29%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aspec%20%27%20%27%20%27main%27%20%27main%27%0Ato%20main%20%7B%0A%20%20local%20%27var%27%20%28%27Sengo2%20read%20card%27%29%0A%20%20sayIt%20var%0A%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_left%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_right%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%201000%0A%20%20%7D%20%28var%20%3D%3D%20%27turn_around%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20by%20degree%27%20%27cocube%3Bright%27%2030%20180%0A%20%20%7D%20%28var%20%3D%3D%20%27park%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20364%2044%20%7B%0Ato%20main%20%7B%7D%0A%7D%0A%0Ascript%20728%2044%20%7B%0AwhenStarted%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20364%20582%20%7B%0AwhenButtonPressed%20%27A%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0A%27Sengo2%20reset%27%0AdrawBMPfile%20%27image.bmp%27%200%200%0A%27Sengo2%20init%27%0A%27Sengo2%20change%20algorithm%27%20%27Card%20Recog%27%0AsendBroadcast%20%27go%21%27%0A%7D%0A%0Ascript%20697%20582%20%7B%0AwhenBroadcastReceived%20%27go%21%27%0Aforever%20%7B%0A%20%20main%0A%7D%0A%7D%0A%0A)