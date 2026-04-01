<!-- show-mobile-notice -->

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

### IV. Aplicación Móvil CoCube

CoCube ofrece una aplicación móvil que admite conexión inalámbrica Bluetooth. Puede utilizar su teléfono o tableta para controlar el robot de forma remota y participar en una programación interactiva.

Escanee el código QR a continuación para descargar e instalar:

![CoCube Android App](cocube-android.png =200x*) 
![CoCube ios App](cocube-ios.png =200x*)

> Nota: Los usuarios de iOS también pueden buscar "CoCube" en la App Store para descargarla.
