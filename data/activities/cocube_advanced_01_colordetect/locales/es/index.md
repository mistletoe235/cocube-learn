### 1. Propósito

Aprenda la función de reconocimiento de bloques de color del módulo de percepción visual de IA y use el CoCube para seguir el movimiento del cilindro azul.

<video width="320" height="240" controls>
  <source src="colordetect.mp4" type="video/mp4">
</video>

### 2. Materiales utilizados

![Personal Computer or Tablet](PC.png =300x*)
![CoCube Robot + AI Vision Perception Module](Sentry2.png =300x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

O abrir el entorno de programación directamente con los módulos de conciencia visual AI añadido: [MicroBlocks-AI Camera](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 4. Conocimiento de algoritmos

#### Introducción a los algoritmos

![](image-1.png)

El usuario especifica que se detecten uno o más colores, determina si hay un bloque de color del color en la imagen, devuelve sus coordenadas y tamaño, admite la detección de bloques multicolor y multicolor, y la etiqueta de clasificación de color es la misma que la definición en el reconocimiento de color.

#### Tutoriales en vídeo

Video Tutorial: [Sensor de visión Sentry2 - Introducción a la detección de bloques de color Algorithm](https://www.bilibili.com/video/BV1KM411C73u/)

#### Configurar parámetros

Los usuarios deben especificar la etiqueta de color que se va a detectar, y se pueden detectar hasta 6 colores al mismo tiempo, pero la velocidad se reducirá. Los usuarios también pueden filtrar los parches que son más pequeños que este valor estableciendo el ancho mínimo w y el alto h del parche para reducir los falsos positivos.

Al configurar registros a través del maestro, se deben establecer los siguientes parámetros:

| **parámetro** | **significado**                                                                              |
| ------------- | ---------------------------------------------------------------------------------------- |
| 1             | no                                                                     |
| 2             | no                                                                     |
| 3             | El ancho mínimo del bloque de color efectivo es w                                                           |
| 4             | La altura mínima del bloque de color efectivo h                                                          |
| 5             | La etiqueta de clasificación de color que se detectará es 1 ~ 6. Uso especial: Los colores específicos se pueden identificar escribiendo valores de color RGB565 superiores a 6 en el parámetro 5, por ejemplo, naranja para 0xFB00 y morado para 0xA11E |

**En la interfaz de usuario, hay varios parámetros preestablecidos que se pueden usar:**

**Rendimiento del algoritmo:**

De acuerdo con los diferentes requisitos de la aplicación, hay 3 opciones para elegir el rendimiento adecuado del algoritmo, que son "Sensible", "Equilibrado" y "Preciso".

Rápida velocidad de reconocimiento y alta velocidad de fotogramas en modo sensible. En el modo Preciso, se pueden detectar parches de color distantes, pero a una velocidad más lenta. El valor predeterminado es rendimiento equilibrado.

Especial: Tiene un buen efecto de reconocimiento y seguimiento en parches de color en modo preciso, pero solo se puede reconocer un parche de color.

**Número máximo de pruebas simultáneas:**

El número máximo de detecciones para un solo color admite 1 ~ 5 salidas.

Cuando se establece en 1, solo se devuelve un resultado óptimo, se devuelve el más grande si hay varios parches en la imagen y se prefiere el de la esquina superior izquierda si el tamaño es similar.

Cuando el valor es mayor que 1, el número de parches devueltos no superará este valor.

**El tamaño del área del bloque de color más pequeño:**

Si hay pequeños parches del mismo color en el fondo, puede filtrarlos estableciendo un valor mínimo razonable.

Los valores predeterminados en el sistema de coordenadas absolutas son: 2x2, 4x4, 8x8, 16x16, 32x32, 64x64, 128x128 píxeles.

Los valores predeterminados en el sistema de coordenadas porcentuales son: 1x1, 2x3, 3x4, 6x8, 9x12, 21x28, 42x56 %.

**Colores a inspeccionar:**

Proporcione la selección del usuario en forma de botón, se mostrará un pequeño icono de ojo cuando se active un color, y se mostrará un icono de ojo con una barra diagonal cuando el color no esté activado, y uno o más colores se pueden activar al mismo tiempo.

#### Devuelve resultados

![](image.png)

Una vez que se reconoce el bloque de color especificado, se marcará en la interfaz de usuario y mostrará su ubicación, tamaño, etiqueta de clasificación, nombre y otra información.

Cuando se leen los registros a través del maestro, se devuelven los siguientes datos:

| **resultado** | **significado**     |
| ---------- | --------------- |
| 1          | La coordenada x del centro del bloque de color |
| 2          | Coordenadas Y del centro del bloque de color |
| 3          | Anchura del bloque w    |
| 4          | Altura del bloque h   |
| 5          | Etiquetas de clasificación de colores |

#### **Consejos y trucos**

1. Cuando se determina que es necesario realizar un seguimiento de un objeto, como la detección de una carretera blanca o el seguimiento de una pequeña bola, puede establecer el número de bloques de color en 1 para aumentar la velocidad y reducir las falsas alarmas.
2. Con un área de reconocimiento más pequeña y utilizando el modo Rendimiento de precisión, puede ver objetos más lejanos.
3. Al reconocer grandes áreas de color, la velocidad de fotogramas en ejecución disminuirá significativamente y puede usar el modo de sensibilidad.
4. Cuando hay un tinte de color en la imagen, debe bloquear la función de balance de blancos.

#### **Instrucciones para los bloques a utilizar**

1. **Sentry2 Inicializar los bloques de construcción**

Un parámetro opcional es la dirección I2C. El valor predeterminado es 96. (0x60)

Antes de poder usar Sentry2, debe inicializar los bloques. Por lo general, se coloca debajo del bloque de sombrero "Cuando comienza".

![](init.png)

2. **Sentry2 establece los bloques de patrón**

![](setmode.png)

Debe establecer el modo en blob, es decir, el modo de detección de bloques de color.

3. **Resultados de las pruebas de Sentry2**

![](result.png)

Este bloque es también el bloque utilizado para desencadenar la detección, y el resultado de la prueba solo se puede obtener si el bloque se utiliza primero.

El resultado devuelto es el número de resultados reconocidos por el algoritmo de blob actual.

El número de resultados se ve afectado por la configuración de parámetros del algoritmo correspondiente.

4. **Sentry2 detecta los atributos del objeto**

![](property.png)

Devuelve los atributos del Id. de objeto detectado, incluida la coordenada x central del bloque de color, la coordenada y del centro del bloque de color, el ancho del bloque de color w, la altura del bloque de color h y la etiqueta de clasificación de color.

Entre ellos, la etiqueta de clasificación de color es 1 ~ 5, que representa negro, blanco, rojo, verde y azul.



### 5. Programación

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos, y extienda el módulo de percepción visual de IA frente al robot CoCube.

2. **Cargue la biblioteca de bloques de creación**: Si no ha agregado la biblioteca de cámaras Sentry2 AI y la biblioteca complementaria CoCube, puede cargar primero la biblioteca complementaria CoCube y la biblioteca de cámaras Sentry2 AI.

3. **Inicializar el módulo de la cámara**: habilite la fuente de alimentación del módulo externo al iniciarse, luego inicialice la interfaz I2C después de 4 segundos cuando el módulo de la cámara se haya iniciado correctamente y, a continuación, establezca el modo de algoritmo de la cámara en modo blob para el reconocimiento de bloques de color.

![](scriptImage4423397.png)

* **Reconocimiento de bloques de color**: recorra para determinar si se detecta un bloque de color de blob y, cuando el número de bloques de color detectados es 1, se generan cinco atributos del bloque de color. Puede observar la ubicación, el tamaño y la etiqueta de color del bloque de color en tiempo real.

![](result2.png)

* **Escribe tu propio programa**: Con el código de depuración anterior en la mano, ¡intenta combinar más funciones tú mismo!

### 6. Reto

Basado en la función de reconocimiento de bloques de color, se realiza la función de seguir el cilindro azul.

Tenga en cuenta que debe configurar manualmente los parámetros del reconocimiento de bloques de color de la cámara Sentry2 y cambiar el color del bloque de color del rojo predeterminado de fábrica a azul.