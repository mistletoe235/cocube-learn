### 1. Objetivos del Proyecto
¡Aprende a usar las plataformas de programación MicroBlocks y Snap para controlar simultáneamente múltiples robots CoCube a través de redes WiFi, y experimenta la diversión del trabajo colaborativo multi-robot!

### 2. Materiales Requeridos

![Robot CoCube × 1](robot.png =200x*)
![Computadora Personal o Tableta](PC.png =250x*)
![Estación Base](cudy.png =250x*)

### 3. Plataformas de Software

1. [MicroBlocks——CoCube & CoCube Module](https://cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27CoCube%20Module%27)

![](image-2.png)

2. [Snap](http://snap.codelab.club/snap.html)

![](img3.png)

### 4. Paso 1: Iniciar la Estación Base

1. Encuentra el cable Type-C e insértalo en el puerto de alimentación Type-C de la estación base
2. Espera pacientemente alrededor de 1 minuto para que la estación base se inicie completamente
3. Conéctate a la red WiFi de la estación base en tu computadora (generalmente COCUBEXXXX), o conéctate con un cable ethernet
   - 💡 **Consejo**: Si usas un cable ethernet, asegúrate de conectarlo al puerto LAN de la estación base (generalmente etiquetado como "LAN")

![](tr1200-1-0-4.png)


### 5. Paso 2: Conectar CoCube a la Red WiFi

1. **Conectar Robot CoCube:** Si tu robot no se ha conectado a WiFi antes, necesitas configurarlo en MicroBlocks primero. Si ya ha sido conectado, puedes omitir este paso. Conecta tu robot CoCube al entorno de programación MicroBlocks usando un cable de datos o de forma inalámbrica.

2. **Configurar Conexión WiFi:** Arrastra el siguiente programa al espacio de trabajo de MicroBlocks, luego modifícalo según tu situación actual:
   - ID del Robot (asigna a cada robot un número, como Robot 1, Robot 2)
   - Nombre WiFi (la red a la que quieres conectarte)
   - Dirección del router (por defecto es 192.168.10.1)
   
   Después de configurar, haz clic en este bloque, luego haz clic en el botón de inicio ▶️ en la esquina superior derecha.

![](allScripts11770207.png)

Si ves que el bloque muestra la dirección IP de tu robot (como en la imagen de abajo), ¡felicidades, te has conectado exitosamente! Para conectar más robots CoCube, simplemente repite el proceso anterior.

![](img4.png)

### 6. Paso 3: Controla tu Robot con Snap

1. **Importar Programa de Control:** Abre el sitio web de Snap y arrastra el archivo `cocube_websokets.xml` hacia él. ¡Verás aparecer la biblioteca de bloques "CoCube WebSockets" en la esquina superior izquierda!  <a href="cocube_websokets.xml" download="cocube_websokets.xml">Haz clic para descargar cocube_websokets.xml</a>

![](img6.png)

2. **Conectar Robot:** 
   - Ingresa el ID del robot que configuraste anteriormente para conectar tu primer robot
   - ¿Quieres controlar más robots? Haz clic en el botón "Add a turtle sprite" a la derecha
   - ⚠️ Recordatorio importante: Nunca uses las funciones "copy" o "clone" - cada robot necesita su propio sprite independiente

![](img5.png)

3. **Configurar Escenario:** ¡Puedes hacer clic en el escenario en la esquina inferior derecha, luego hacer clic en el botón de fondo para arrastrar tu imagen de escenario favorita! Después de configurar, recuerda hacer clic en el sprite que quieres controlar nuevamente para programar.

![](img7.png =250x*) ![](img8.png =250x*)

4. **Comenzar Control de Programación:** Una vez que el robot esté conectado exitosamente, ¡puedes combinar libremente programas usando los bloques de la izquierda! ¡Haz que el robot se mueva hacia adelante, hacia atrás, gire, o incluso baile!

### 7. Tiempo de Desafío 🚀

Ahora que has dominado los secretos del control multi-robot, prueba estos divertidos desafíos:
- Haz que múltiples robots marchen en formación
- Programa los robots para realizar un baile sincronizado
- Combina la funcionalidad de mapa de posicionamiento de CoCube para crear un partido de fútbol de robots
- ¿Qué otras aplicaciones geniales se te ocurren? ¡Pruébalas!