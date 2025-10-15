### 1. Propósito

Aprenda a dominar el uso de los módulos ToF y complete interacciones más interesantes.

ToF (tiempo de vuelo) mide el tiempo que tarda la luz en llegar a un objeto y reflejarse mediante la emisión de un láser infrarrojo para obtener datos precisos de distancia. Tiene una excelente adaptabilidad a la luz y no se ve afectado por la reflectividad del objetivo, y puede funcionar de manera estable en diversas condiciones de iluminación y escenarios de uso.

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =200x*)
![ToF External Module](ToF.png =180x*)
![Personal Computer or Tablet](PC.png =250x*)

### 3. Plataformas de software

[MicroBlocks——CoCube y módulo CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-1.png)

### 4. Experiencia rápida

1. **Conectar dispositivos**: Conecte el IDE de MicroBlocks al robot CoCube a través de medios cableados o inalámbricos, y conecte el módulo ToF al robot CoCube.

2. **Agregue una biblioteca de bloques de construcción**: En el directorio "Robot", agregue "Biblioteca de módulos CoCube" - la "Biblioteca de módulos CoCube" cubre todas las funciones del complemento ToF: "ToF conectado" y "Distancia ToF (mm)".

![](image.png)

* **ToF Connected**: Arrastre el bloque ToF Connected, arrástrelo al espacio de trabajo y haga clic en Ejecutar. El bloque de construcción determina si el robot CoCube se ha conectado al módulo de medición de distancia láser ToF.

![](scriptImage6864473.png)

**Nota**: Dado que el módulo tarda una cierta cantidad de tiempo en encenderse, existe una cierta probabilidad de que se informe "falso" al ejecutar el bloque por primera vez, y puede hacer clic en Ejecutar nuevamente.

* **Distancia ToF (mm)**: Arrastre el bloque "Distancia ToF (mm)" y haga clic en Ejecutar para devolver la distancia desde el sensor de distancia láser ToF hasta el obstáculo frente a usted.

Si desea generar los resultados de la medición en tiempo real, puede escribir el siguiente programa.

![](scriptImage6901001.png)

### 5. Funciones avanzadas

¿Es posible escribir un programa que controle a los seguidores del robot CoCube? Cuando el CoCube está lo suficientemente lejos del obstáculo que tiene delante, se mueve hacia adelante; Cuando el CoCube está lo suficientemente cerca del obstáculo, retrocede.

###### Ejemplo de programa: ¡piensa + hazlo y luego míralo!

![](scriptImage8014138.png)

### 6. Reto

¡Usa los materiales a tu disposición para construir un sencillo laberinto tridimensional! E intente escribir código para permitir que el robot CoCube salga del laberinto de forma autónoma con la ayuda del módulo de alcance láser ToF.

### 7. Consulte los ejemplos de código

Todos los ejemplos de código de tutorial anteriores:

[MicroBlocks —— ToF Caja del módulo de rango láser](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27%20%27LED%20Display%27%0A%0Ascript%20663%20105%20%7B%0AwhenButtonPressed%20%27A%27%0Aforever%20%7B%0A%20%20if%20%28%28%27ccmodule_ToF%20distance%27%29%20%3E%20120%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204347332%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28%28%27ccmodule_ToF%20distance%27%29%20%3C%2080%29%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%204674692%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%27%5Bdisplay%3AmbDisplay%5D%27%2015237440%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%7D%0A%0A)