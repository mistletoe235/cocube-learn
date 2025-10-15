### 1. Propósito

Realice el robot de control remoto CoCube del applet de WeChat.

![](miniapp-control.gif)

### 2. Materiales utilizados

![CoCube Robot × 1](robot.png =300x*)
![Driving Challenge Positioning Map](map.png =300x*)
![Personal Computer or Tablet](PC.png =300x*)
![Mobile Phone with WeChat Installed](107854029ea28e4dc9a4e6d5a1ca6bb-1.jpg =120x*)

### 3. Plataformas de software

[MicroBloques-CoCube](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![](image-1.png)

### 4. Programación

El applet de WeChat se comunica con el robot CoCube a través de Bluetooth Low Energy (BLE). Primero debe cargar el programa de interfaz para el robot CoCube a través del IDE de MicroBlocks y personalizar la programación según sea necesario; A continuación, desconecte el IDE de MicroBlocks del robot CoCube; Finalmente, conecte el robot CoCube con el applet de WeChat y podrá lograr un control remoto en tiempo real.

1. **Cargue el programa de interfaz para el robot CoCube**

[MicroBlocks - Case 08 WeChat Interfaz de programa](https://microblocksfun.cn/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%20Module%27%20%27LED%20Display%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27handle_message%27%20%27handle_message%27%0Ato%20handle_message%20%7B%0A%20%20local%20%27msg%27%20%28getLastBroadcast%29%0A%20%20if%20%28%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%201%204%29%20%3D%3D%20%27call%27%29%20%7B%0A%20%20%20%20local%20%27msg%27%20%28%27%5Bdata%3Asplit%5D%27%20msg%20%27%2C%27%29%0A%20%20%20%20local%20%27msg_id%27%20%28at%202%20msg%29%0A%20%20%20%20local%20%27cmd_name%27%20%28at%203%20msg%29%0A%20%20%20%20local%20%27cmd_args%27%20%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%204%29%0A%20%20%20%20local%20%27result%27%20%28callCustomReporter%20cmd_name%20%28to_mb_args%20cmd_args%29%29%0A%20%20%20%20sendBroadcast%20%28%27%5Bdata%3AjoinStrings%5D%27%20%28%27%5Bdata%3AmakeList%5D%27%20%27%5Bresponse%5D%27%20msg_id%20result%29%20%27%2C%27%29%0A%20%20%7D%0A%7D%0A%0Aspec%20%27r%27%20%27to_mb_args%27%20%27to_mb_args%20_%27%20%27auto%27%20%27%27%0Ato%20to_mb_args%20args%20%7B%0A%20%20local%20%27json%27%20%28%27%5Bdata%3Ajoin%5D%27%20%27%5B%27%20%28%27%5Bdata%3AjoinStrings%5D%27%20args%20%27%2C%27%29%20%27%5D%27%29%0A%20%20local%20%27json_count%27%20%28%27%5Bmisc%3AjsonCount%5D%27%20json%20%27%27%29%0A%20%20local%20%27result%27%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20for%20i%20json_count%20%7B%0A%20%20%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27%5Bmisc%3AjsonGet%5D%27%20json%20%28%27%5Bdata%3AconvertType%5D%27%20i%20%27string%27%29%29%20result%0A%20%20%7D%0A%20%20return%20result%0A%7D%0A%0Ascript%20275%2054%20%7B%0Acomment%20%27Please%20manually%20add%20the%20CoCube%20library%2C%20%0ACoCube%20Module%20library%2C%20%0Aand%20other%20required%20libraries.%27%0Acomment%20%27%E8%AF%B7%E6%89%8B%E5%8A%A8%E6%B7%BB%E5%8A%A0CoCube%E5%BA%93%E3%80%81CoCube%E5%A4%96%E6%8E%A5%E6%A8%A1%E5%9D%97%E5%BA%93%E5%92%8C%E5%85%B6%E4%BB%96%E9%9C%80%E8%A6%81%E7%9A%84%E5%BA%93%27%0A%7D%0A%0Ascript%20729%20172%20%7B%0AwhenBroadcastReceived%20%27b%27%0A%27ccmodule_gripper%20close%27%0A%27set%20display%20color%27%20%28colorSwatch%20255%200%200%20255%29%0Aled_displayImage%20%27sad%27%0A%7D%0A%0Ascript%20540%20178%20%7B%0AwhenBroadcastReceived%20%27a%27%0A%27ccmodule_gripper%20open%27%0A%27set%20display%20color%27%20%28colorSwatch%2035%20190%2030%20255%29%0Aled_displayImage%20%27happy%27%0A%7D%0A%0Ascript%20539%20324%20%7B%0AwhenBroadcastReceived%20%27y%27%0A%27play%20tone%27%20%27nt%3Bg%23%27%200%20500%0A%7D%0A%0Ascript%20273%20324%20%7B%0AwhenBroadcastReceived%20%27x%27%0A%27play%20frequency%27%20261%20500%0A%7D%0A%0Ascript%20275%20174%20%7B%0AwhenBroadcastReceived%20%27%27%0Ahandle_message%0A%7D%0A%0A)

* **Conectar los robots CoCube con MicroBlocks IDE**

* **Personaliza los botones de función**

El código de ejemplo que se abre se muestra en la siguiente ilustración:

![](allScripts2111301.png)

A partir de ahí:
- El bloque de sombrero "Cuando se recibe" se utiliza para procesar los mensajes del joystick y controlar el movimiento del robot CoCube sin modificación
- Los cuatro bloques de sombrero de "Al recibir a", "al recibir b", "al recibir x" y "al recibir y" corresponden a los botones A, B, X e Y del Programa WeChat Mini, que se pueden personalizar según sus necesidades.

* **Desconectar el robot CoCube del IDE MicroBlocks**

Después de la depuración, asegúrese de desconectar el robot CoCube del IDE de MicroBlocks, de lo contrario, el CoCube no se conectará por teléfono al mismo tiempo.

### 5. Mini programa WeChat

1. **Abre el mini programa WeChat**

   Abra el software de WeChat en su teléfono móvil, escanee el código del applet de WeChat y abra el applet de WeChat "CoCube Robot".

![](QRcode.jpg)

2. **Conéctese al robot CoCube**

   Haga clic en el botón "Buscar dispositivos CoCube". Cuando lo use por primera vez, es posible que se le pida que active el permiso de Bluetooth, haga clic en Confirmar.

   Entre los dispositivos que aparecen, busque el número de Bluetooth de su robot CoCube y toque para conectarse

![](107854029ea28e4dc9a4e6d5a1ca6bb.jpg =200x*)
![](a8d4232dc718a44baad3e4e273db437.jpg =200x*)

3. **Robot de control remoto CoCube**

   El joystick virtual izquierdo controla el movimiento del chasis del robot CoCube, y la velocidad del movimiento se puede ajustar según el tamaño de la palanca, y tiene una función de control híbrida (por ejemplo, deslizándose hacia la parte delantera izquierda, el robot también girará hacia la parte delantera izquierda del automóvil)

   Las teclas A B X Y de la derecha corresponden a las características que acabamos de personalizar en el MicroBlocks IDE.

![](phonescreen3.jpg)

![](image.png)

### 6. Reto: Conducción simulada

Según el mapa del simulador de conducción, ¡practica tus habilidades de conducción!

¿Es posible diseñar un cronómetro directamente en CoCube y ver cómo has puntuado?

![](<success.gif>)