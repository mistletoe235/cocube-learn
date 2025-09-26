### 1. Propósito del Caso
Dominar la tecnología de control de enjambre de múltiples robots, programando para lograr que cuatro robots CoCube realicen formación coordinada y movimiento cíclico en mapas de diferentes especificaciones, ¡experimentando el control preciso de múltiples robots!

### 2. Materiales Necesarios

![CoCube Robot × 4](robot.png =200x*)
![Computadora o Tableta](PC.png =250x*)
![Estación Base](cudy.png =250x*)

![Mapa 300x200](map_300200.png =400x*)

### 3. Plataforma de Software

1. [MicroBlocks——CoCube & CoCube Module](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

2. [Snap](http://snap.codelab.club/snap.html)

![](img3.png)

### 4. Preparación del Entorno

1. **Colocar el mapa:** Seleccione un área plana adecuada y coloque un mapa de localización de 300x200 o 600x600.
2. **Iniciar la estación base:** Siga el tutorial básico para iniciar la estación base y conecte la computadora a la red de la estación base.
   - 💡 **Consejo:** Puede elegir conexión por cable o WiFi, asegurándose de que la red sea estable.

![](map_setup.png)

### 5. Configuración de los Cuatro Robots

Para facilitar la gestión, asignamos un ID a cada uno de los cuatro robots: 1, 2, 3, 4.

1. **Conectar los robots uno por uno:** Conecte cada robot CoCube al entorno de programación MicroBlocks mediante un cable de datos o Bluetooth.
2. **Configurar los parámetros del robot:** Configure cada robot con:
   - Un ID único (Robot 1, Robot 2, Robot 3, Robot 4).
   - La misma información de conexión WiFi.
   - La misma dirección del router (por defecto 192.168.10.1).
3. **Verificar la conexión:** Asegúrese de que los cuatro robots hayan obtenido una dirección IP y se muestren en los bloques de construcción.

⚠️ **Recordatorio Importante:** Cada robot debe tener un ID diferente, pero la información WiFi debe ser idéntica.

### 6. Control de Formación en Línea Recta en el Mapa 300x200

#### 6.1 Importar el Programa de Control

1. **Descargar el programa de ejemplo:** <a href="cocube_snap_example1.xml" download="cocube_snap_example1.xml">Haga clic aquí para descargar el programa de ejemplo 1</a>
2. **Importar a Snap:** Abra el sitio web de Snap y arrastre el archivo `cocube_snap_example1.xml` a la ventana.
3. **Ver los roles de los robots:** Verá que el archivo ya ha creado cuatro roles de robots numerados.

![](snap1.png)

#### 6.2 Comenzar el Control de Formación

1. **Conocer las teclas de control:** Haga clic en el escenario a la derecha para ver los comandos de control preestablecidos:
   - Haga clic en la bandera verde: Conectar los cuatro robots.
   - Presione la tecla "1": Moverse al punto de inicio.
   - Presione la tecla "2": Comenzar a alinearse en línea recta.
   - Presione la tecla "3": Formar un círculo.
   - Presione la tecla "4": Movimiento circular alrededor.

![](snap2.png =600x*)

2. **Comenzar el control:**
   - Primero haga clic en el botón de la bandera verde en la esquina superior derecha para conectar los robots.
   - Una vez conectados, Snap mostrará la posición en tiempo real de los robots en la esquina superior derecha. ¡Mover los robots físicos mostrará cambios sincronizados en la posición!

![](snap3.png =300x*)

   - Luego presione las teclas numéricas "1-4" para ejecutar diferentes acciones de formación y lograr los efectos del video a continuación.

<video width="320" height="240" controls>
  <source src="video_720p.mp4" type="video/mp4">
</video>

3. **Programación personalizada:** ¿Quiere modificar las acciones? Haga clic en cualquier rol de robot y arrastre los bloques de construcción de la izquierda para crear su propio programa de formación.

### 7. Cuarto Paso: Desafío del Mapa 600x600

Con el ejemplo anterior, ¡ya ha dominado los métodos básicos de control de enjambre de múltiples robots! Ahora, ¡desafíese con un mapa más grande!

**Descargar el programa del mapa grande:** <a href="cocube_snap_example2.xml" download="cocube_snap_example2.xml">Haga clic aquí para descargar el programa de ejemplo 2</a>

Este programa incluye:
- Mapeo de coordenadas para el mapa 600x600.
- Marco básico de control para ocho robots.
- Combinaciones de bloques de construcción programables y extensibles.

### 8. Hora del Desafío 🚀

¡Ahora ya es un experto en control de múltiples robots! Intente estos desafíos avanzados:
- Programe para que cuatro robots formen un cuadrado y realicen movimientos de figuras complejas.
- Cree una formación de "serpiente" con los robots, haciéndolos moverse como el juego de la serpiente.
- Diseñe una carrera de relevos de robots, haciendo que completen diferentes puntos de tarea uno tras otro.
- ¿Puede pensar en formas más geniales de control de enjambre? ¡Sea creativo!