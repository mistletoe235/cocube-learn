### 1. Objetivo de la práctica

Conozca la función de reconocimiento AprilTag del módulo de percepción visual de IA.

### 2. Materiales utilizados

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Visual Perception Module](Sentry2.png =300x*)

Imprima sus propias etiquetas AprilTag del tamaño y tamaño adecuados.

- [Apriltags-16h5 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/69489d7ebc0ff9d43cc92893281b6731/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-16h5.pdf)  
- [Apriltags tag code-25h9 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/2d2a4bff63b80e05f846a60d48b27afd/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-25h9.pdf)  
- [Apriltags tag code-36h11 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/d9438412c56f6105a50ac4057d980c49/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-36h11.pdf)  

También es posible generar e imprimir etiquetas AprilTag con las especificaciones y dimensiones adecuadas en línea a través de la página web: [¡Generador de marcadores ArUco!](https://chev.me/arucogen/)

### 3. Plataformas de software

- [MicroBloques-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)  
- O abrir el entorno de programación directamente con los módulos de conciencia visual AI añadido: [MicroBlocks-AI Camera](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Conocimiento de algoritmos

#### Introducción a los algoritmos

![](image-2.png)

Juzgue si hay un patrón de etiqueta Apriltag en la imagen, actualmente admite la forma de codificación 16H5, 25H9, 36H11, el algoritmo debe especificar qué método de decodificación usar cuando se ejecuta, no se pueden detectar diferentes formas de codificación al mismo tiempo, pero la misma codificación puede detectar 25 etiquetas al mismo tiempo.

**Nota**: Este algoritmo no se puede ejecutar al mismo tiempo que otros algoritmos marcados con un asterisco (*)

**Etiquetas de categoría**

![](image-3.png)

Un apriltag es un conjunto definido de cuadrados blancos y negros, y el número de cuadrados utilizados varía en función de la forma de codificación. Cada patrón tiene un valor de etiqueta de clasificación predefinido que se devuelve cuando se reconoce.

Imprima sus propias etiquetas AprilTag del tamaño y tamaño adecuados.

- [Apriltags-16h5 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/69489d7ebc0ff9d43cc92893281b6731/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-16h5.pdf)  
- [Apriltags tag code-25h9 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/2d2a4bff63b80e05f846a60d48b27afd/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-25h9.pdf)  
- [Apriltags tag code-36h11 descarga local](https://tosee.readthedocs.io/zh/latest/_downloads/d9438412c56f6105a50ac4057d980c49/apriltags%E6%A0%87%E7%AD%BE%E7%BC%96%E7%A0%81-36h11.pdf)  

También es posible generar e imprimir etiquetas AprilTag con las especificaciones y dimensiones adecuadas en línea a través de la página web: [¡Generador de marcadores ArUco!](https://chev.me/arucogen/)

#### Configurar parámetros

![](image-1.png)

Puede establecer el rendimiento del algoritmo y el formulario de codificación en la interfaz de usuario.

> **Rendimiento del algoritmo:**
>
> De acuerdo con los diferentes requisitos de la aplicación, hay 3 opciones para elegir el rendimiento adecuado del algoritmo, que son "Sensible", "Equilibrado" y "Preciso".
>
> - Rápida velocidad de reconocimiento y alta velocidad de fotogramas en modo sensible. 
> - El modo preciso puede detectar etiquetas a distancia, pero a una velocidad reducida. 
> - El valor predeterminado es rendimiento equilibrado.
>
> **Forma de codificación:**
>
> Al hacer clic en el botón, se recorrerá los tres modos de codificación de "16H5", "25H9" y "36H11", y el algoritmo debe reiniciarse después del cambio, lo que surtirá efecto cuando se inicie la próxima vez.

#### Devuelve resultados

![](image.png)

Cuando se reconoce una etiqueta, se devuelven sus coordenadas, tamaño y número de etiqueta.

Cuando se leen los registros a través del maestro, se devuelven los siguientes datos:

| **resultado** | **significado**          |
|------------|----------------------|
| 1          | Centro de etiquetas x coordenadas |
| 2          | Coordenadas Y del centro de la etiqueta |
| 3          | Ancho de la etiqueta w       |
| 4          | Altura de la etiqueta h      |
| 5          | Número de etiqueta             |

#### Consejos y trucos

1. El ancho y la altura de la etiqueta identificada tienen una salida relativamente estable, que se puede usar para determinar la distancia, y la etiqueta no cambia de tamaño cuando se gira, pero puede tener un efecto cuando se inclina.
2. Cuando necesite identificar varias etiquetas, puede desactivar la visualización de las líneas de coordenadas, que parecen más concisas.
3. Cuanto más grande sea la etiqueta, más lejos se reconocerá.

#### Instrucciones para los bloques a utilizar

1. **Sentry2 Inicializar los bloques de construcción**

   - Un parámetro opcional es la dirección I2C. El valor predeterminado es 96. (0x60)
   - Antes de poder usar Sentry2, debe inicializar los bloques. Por lo general, se coloca debajo del bloque de sombrero "Cuando comienza".

   ![](init.png)

2. **Sentry2 establece los bloques de patrón**

   - Debe establecer el modo en apriltag, es decir, el modo de detección AprilTag.

   ![](apriltag.png)

3. **Resultados de las pruebas de Sentry2**

   - Antes de usar este bloque, debe asegurarse de que el modo de algoritmo APIELTAG esté habilitado.
   - Este bloque es también el bloque utilizado para desencadenar la detección, y el resultado de la prueba solo se puede obtener si el bloque se utiliza primero.
   - El resultado devuelto es el número de resultados reconocidos por el algoritmo AprilTag actual.
   - El número de resultados se ve afectado por la configuración de parámetros del algoritmo correspondiente.

   ![](resultblock.png)

4. **Sentry2 detecta los atributos del objeto**

   - Devuelve los atributos del ID de objeto detectado, incluida la coordenada x central del bloque de color, la coordenada y del centro del bloque de color, la anchura del bloque de color w, la altura del bloque de color h y el número de etiqueta.

   ![](property.png)

### 5. Programación

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos, y extienda el módulo de percepción visual de IA frente al robot CoCube.

2. **Cargue la biblioteca de bloques de creación**: Si no ha agregado la biblioteca de cámaras Sentry2 AI y la biblioteca complementaria CoCube, puede cargar primero la biblioteca complementaria CoCube y la biblioteca de cámaras Sentry2 AI.

3. **Inicializar el módulo de la cámara**: Habilite la fuente de alimentación del módulo externo al iniciar, luego inicialice la interfaz I2C después de 4 segundos después de que el módulo de la cámara se haya iniciado con éxito y, a continuación, configure el modo de algoritmo de la cámara en el modo AprilTag.

   ![](apriltaginit.png)

* **Reconocimiento de bloques de color**: Recorra si se han detectado bloques de color AprilTag y genere cinco atributos de la etiqueta cuando el número de etiquetas detectadas sea 1. Puede observar la posición, el tamaño y la etiqueta de la etiqueta en tiempo real.

   ![](result.png)

* **Escribe tu propio programa**: Con el código de depuración anterior en la mano, ¡también podrías intentar explorar más funciones por ti mismo!