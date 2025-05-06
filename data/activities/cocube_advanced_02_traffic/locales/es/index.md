### Objetivo de la práctica

Programación del robot CoCube para completar la función de reconocimiento de tarjetas de señales de tráfico y acción automática, realizando la mesa de arena creativa del transporte inteligente.

Aprenda sobre la tecnología de inteligencia artificial en la visión de imágenes en el proceso.

<video width="320" height="240" controls>
  <source src="traffic.mp4" type="video/mp4">
</video>

### 1. Materiales utilizados

![CoCube Robot × 1](robot.png =300x*)
![Personal Computer or Tablet](PC.png =300x*)
![AI Vision Perception Module × 1](Sentry2.png =300x*)
![Traffic Sign Cards × 10](image-1.png =300x*)

### 2. Plataformas de software

[MicroBloques-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

O abrir el entorno de programación directamente con los módulos de conciencia visual AI añadido: [MicroBlocks-AI Camera](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27)

### 3. Conocimiento de algoritmos

#### Introducción a los algoritmos

![](image-2.png)

Identifica si hay un patrón de tarjeta especificado en la imagen y devuelve información como las coordenadas de la tarjeta, el tamaño y las etiquetas de clasificación. Incluidas las señales de tráfico, los símbolos gráficos y los números, las etiquetas de clasificación se muestran en la tabla siguiente.

**Señal de tráfico**

| **Etiquetas de categoría** | **Logotipo en inglés** | **Significado chino** | **Etiquetas de categoría** | **Logotipo en inglés**    | **Significado chino** |
| -------- | -------- | -------- | -------- | ----------- | -------- |
| 1        | Adelante  | Avanzar      | 2        | Izquierda        | Izquierda     |
| 3        | Derecha    | Gire a la derecha     | 4        | Cambia | Giro       |
| 5        | Parque     | Detén el coche       | 6        | Verde       | luz verde   |
| 7        | Rojo      | Luz roja    | 8        | Velocidad 40    | Límite de velocidad 40 |
| 9        | Velocidad 60 | El límite de velocidad es de 60 | 10       | Velocidad 80    | El límite de velocidad es de 80 |

#### Parámetros: Ninguno

#### Devuelve resultados

![](image-3.png)

El algoritmo admite el reconocimiento de varias tarjetas al mismo tiempo, y la rotación de la tarjeta dentro de los 30 grados aún se puede reconocer, y la rotación del ángulo es demasiado grande para reconocer.

Cuando se leen los registros a través del maestro, se devuelven los siguientes datos:

| **resultado** | **significado**  |
| ------ | ------- |
| 1      | x en el centro de la tarjeta |
| 2      | Coordenadas Y del centro de la tarjeta |
| 3      | Ancho de la tarjeta w   |
| 4      | Altura de la tarjeta h   |
| 5      | Etiquetas de clasificación de tarjetas  |

#### Consejos y trucos

1. El algoritmo puede detectar tarjetas distantes, pero en este momento no es la posición de detección deseada por el usuario, en este momento, se puede juzgar por el "ancho de la tarjeta" para excluir esas tarjetas distantes, por ejemplo, solo cuando el ancho de la tarjeta > 50%, se activará la siguiente acción.

2. Cuando hay varias tarjetas en una imagen, como tarjetas en una fila, la secuencia de salida de detección se basa en el punto central de la tarjeta, y el orden de detección y salida se escanea línea por línea desde el punto superior izquierdo (0,0), y la salida se emite de arriba a abajo y de izquierda a derecha.

#### **Instrucciones para los bloques a utilizar**

1. **Sentry2 Inicializar los bloques de construcción**

Un parámetro opcional es la dirección I2C. El valor predeterminado es 96. (0x60)

Antes de poder usar Sentry2, debe inicializar los bloques. Por lo general, se coloca debajo del bloque de sombrero "Cuando comienza".

![](init.png)

2. **Sentry2 establece los bloques de patrón**

![](<setmodecard.png>)

Debe establecer el modo en tarjeta, es decir, el modo de reconocimiento de tarjeta de señal de tráfico.

3. **Resultados de las pruebas de Sentry2**

![](result.png)

Antes de usar este bloque, debe asegurarse de que el modo de algoritmo de tarjeta esté habilitado.

Este bloque es también el bloque utilizado para desencadenar la detección, y el resultado de la prueba solo se puede obtener si el bloque se utiliza primero.

El resultado devuelto es el número de resultados reconocidos por el algoritmo de tarjeta actual.

4. **Sentry2 detecta la tarjeta**

![](image.png)

Devuelve el atributo tag del ID de objeto detectado. El bloque determina si el objeto identificado con ID 1 es una carta de avance: si es verdadero, si no lo es, devuelve falso.

5. **Sentry2 detecta los atributos del objeto**

![](property.png)

Devuelve los atributos del identificador de objeto detectado, incluida la coordenada x central del parche de color, la coordenada y del centro del parche de color, la anchura del parche de color w, la altura h del parche de color y la etiqueta.

Cada una de estas etiquetas corresponde a una categoría de tarjeta diferente (por ejemplo, luz roja, luz verde, números, etc.)



### 4. Programación

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos. Los contactos metálicos del módulo de agarre están conectados magnéticamente a los contactos del CoCube.

2. **Carga de la biblioteca de bloques de construcción**: Cargue la biblioteca de módulos externos del CoCube y la biblioteca de la cámara Sentry2 AI, consulte el [kit todo en uno](https://sjtu-colab.feishu.cn/wiki/J6o5woK8AizzAVkLUkzcG1m1nob#share-PZOqdKGuUod4HYxEQKacjmIpnLf).

3. **Inicializar el módulo de la cámara**: habilite la fuente de alimentación del módulo externo al iniciar, luego inicialice la interfaz I2C después de 4 segundos cuando el módulo de la cámara se haya iniciado con éxito y, a continuación, configure el modo de algoritmo de la cámara en modo de tarjeta para detectar la información de la tarjeta.

![](scriptImage7286394.png)

4. **Identifique la tarjeta y realice el procesamiento lógico**: en primer lugar, debemos usar el bloque "Sentry2 detecta la tarjeta **object id ##", y la función del bloque es determinar si el resultado de la detección de la etiqueta de la tarjeta con el número de serie de la identificación es "##".

![](scriptImage7734694.png)

Para que sea más fácil comenzar, podemos establecer la lógica de presionar la tecla A antes de comenzar el juicio. Ahora solo necesita usar una combinación de ejecución repetida y juicio condicional para procesar diferentes etiquetas de tarjetas con diferente lógica, como se muestra en la siguiente figura, incluido el manejo de la parada de luz roja, la línea de luz verde y la parada:

![](scriptImage7817072.png)

### 5. Reto

El modo de tarjeta de la cámara también admite varios otros reconocimiento de etiquetas, incluido el límite de velocidad, la dirección, etc., ¡intente agregarlos!

![](scriptImage8322899.png)

Código de referencia: [Case 02 Smart Transportation](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27Sentry2%20AI%20camera%27%0A%0Ascript%20583%2081%20%7B%0AwhenStarted%0A%27Power%20on%20module%27%0AwaitMillis%204000%0A%27Sentry2%20init%27%2096%0A%27Sentry%20turn%27%20%27card%27%20true%0A%7D%0A%0Ascript%20851%2080%20%7B%0AwhenButtonPressed%20%27A%27%0Alocal%20%27var%27%2030%0Aforever%20%7B%0A%20%20if%20%28%27Sentry2%20detect%20card%27%20%27RedLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27GreenLight%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Park%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Left%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Right%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27right%27%2030%20820%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27TurnAround%27%201%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%20for%20millisecs%27%20%27left%27%2030%201640%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed40%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2017%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed60%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2033%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%20%28%27Sentry2%20detect%20card%27%20%27Speed80%27%201%29%20%7B%0A%20%20%20%20var%20%3D%2050%0A%20%20%20%20%27CoCube%20move%27%20%27forward%27%20var%0A%20%20%7D%0A%20%20waitMillis%2030%0A%7D%0A%7D%0A%0A)