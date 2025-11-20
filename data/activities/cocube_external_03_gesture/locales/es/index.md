### 1. Propósito

Aprenda a dominar el uso de los módulos de gestos 3D y complete interacciones más divertidas.

Integra un sensor de reconocimiento de gestos de alta precisión y baja potencia para admitir el reconocimiento de gestos en el espacio tridimensional y realizar un control interactivo con robots.

**Nota: Cuando utilice el módulo de gestos 3D, no coloque el robot CoCube en el mapa de ubicación de CoMaps.**

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =200x*)
![3D Gesture Module](3Dgesture.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Plataformas de software

[MicroBlocks——CoCube y módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

### 4. Experiencia rápida

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos, y conecte el módulo de sensor de gestos 3D al robot CoCube.

2. **Agregar biblioteca de bloques de construcción**: En el directorio "Robot", agregue "Biblioteca de módulos CoCube" - la "Biblioteca de módulos CoCube" cubre todas las funciones del complemento ToF: "Sensor de gestos 3D conectado" y "Datos de lectura de sensores de gestos 3D".


![](image.png)

* **Sensor de gestos 3D conectado**: Arrastre el bloque Sensor de gestos 3D conectado, arrástrelo al espacio de trabajo y haga clic en Ejecutar. El bloque determina si el robot CoCube está conectado a un módulo de sensor de gestos 3D.

![](scriptImage9339087.png)

**Nota: Dado que el módulo tarda un cierto tiempo en encenderse, existe una cierta probabilidad de que se informe "falso" al ejecutar el bloque por primera vez, espere un momento antes de probar.**

* **Datos de lectura del sensor de gestos 3D**: Arrastre el bloque "Datos de lectura del sensor de gestos 3D", agite la mano frente a usted y haga clic para ejecutar, y descubra que es muy probable que lea un "? (O tal vez tengas la suerte de leer a la izquierda, a la derecha o algún otro gesto). Imitación del sensor de distancia láser ToF, la lectura del ciclo, solo puede leer un "?". Obviamente, esto no es lo correcto.

![](scriptImage9438390.png)

![](scriptImage9501061.png)

El sensor de gestos 3D admite **9 tipos de reconocimiento de gestos de forma predeterminada** y la frecuencia máxima de actualización puede alcanzar los **240 Hz**. Por lo tanto, si desea generar los resultados de la medición en tiempo real, debe escribir el siguiente programa.

![](scriptImage9927037.png)

### 5. Funciones avanzadas

¿Es posible programar un robot controlado por gestos? Por ejemplo, agitando hacia un lado, el robot gira como una medida.

###### Ejemplo de programa: ¡piensa + hazlo y luego míralo!

![](scriptImage11809588.png)

### 6. Reto

¡Intenta usar otros gestos para controlar el robot CoCube para reproducir música y hacer deporte!

### 7. Consulte los ejemplos de código

Todos los ejemplos de código de tutorial anteriores:

[MicroBlocks —— 3D Caso del módulo de gestos](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20711%2082%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27ccmodule_gesture%20read%27%29%0A%20%20if%20%28var%20%21%3D%20%27%3F%27%29%20%7B%0A%20%20%20%20if%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27left%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204488452%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%20500%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%20%20sayIt%20%27right%27%0A%20%20%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204291652%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%20500%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%7D%0A%0A)