En las actividades anteriores de MQTT, el ordenador y CoCube intercambiaban mensajes a través de un broker MQTT. Esta vez utilizaremos UDP para que un ordenador y CoCube conectados a la misma red local puedan comunicarse directamente.

En este tutorial realizaremos tres tareas:

1. Enviar texto desde el ordenador a CoCube.
2. Hacer que CoCube responda al ordenador.
3. Llamar de forma remota a funciones de CoCube mediante mensajes UDP.

[Abrir el programa completo en MicroBlocks][programa-completo]

### 1. Preparación

Necesitará:

- Un CoCube
- Un ordenador con Windows, macOS o Linux
- Una red Wi-Fi de 2,4 GHz
- [Packet Sender](https://packetsender.com/)

Packet Sender es una herramienta de prueba de redes gratuita y de código abierto que permite enviar y recibir paquetes UDP.

El ordenador y CoCube deben estar conectados a **la misma red Wi-Fi**. La comunicación UDP no necesita una cuenta ni un servidor público.

Añada estas bibliotecas de bloques en MicroBlocks:

- **Añadir biblioteca** → **Red** → **UDP**
- **CoCube**
- **Añadir biblioteca** → **Otro** → **Llamadas a Funciones**

### 2. Iniciar el servicio UDP de CoCube

Construya el siguiente programa e introduzca el nombre y la contraseña de la red Wi-Fi:

<p align="center"><img src="scriptImage01_connect.png" alt="Conectar a Wi-Fi e iniciar el servicio UDP" width="680"></p>

Al pulsar los botones A y B al mismo tiempo, CoCube:

1. Se conecta a la red Wi-Fi.
2. Muestra su dirección IP en MicroBlocks.
3. Inicia el servicio UDP y escucha en el puerto `5000`.

<p align="center"><img src="ip_address.png" alt="Ver la dirección IP de CoCube" width="420"></p>

La dirección `172.20.10.2` de la imagen es solo un ejemplo. Su CoCube recibirá una dirección IP diferente. Anote la dirección que muestre MicroBlocks.

Puede imaginar la dirección IP y el puerto como una dirección de entrega:

- La dirección IP identifica a CoCube en la red local.
- El puerto `5000` entrega el mensaje al programa UDP de CoCube.

> El nombre y la contraseña de la red Wi-Fi quedan guardados en el programa. Elimine la contraseña antes de compartir el programa o sus capturas de pantalla.

### 3. Enviar un mensaje del ordenador a CoCube

#### 3.1 Crear el programa receptor

Construya el siguiente programa:

<p align="center"><img src="scriptImage02_receive.png" alt="Recibir paquetes UDP en CoCube" width="680"></p>

Después de pulsar el botón A, el programa comprueba continuamente si ha llegado un paquete UDP:

- Si no hay ningún mensaje nuevo, el contenido recibido tiene una longitud de `0`.
- Cuando llega un mensaje, el programa lo muestra en MicroBlocks y en la pantalla TFT.

La espera de `50` milisegundos al final del bucle evita que el programa realice comprobaciones con demasiada frecuencia.

#### 3.2 Enviar con Packet Sender

Abra Packet Sender e introduzca estos valores en el área de envío:

| Ajuste | Valor |
| --- | --- |
| ASCII | `Hello CoCube!` |
| Address | La dirección IP real de CoCube |
| Port | `5000` |
| Protocol | `UDP` |

Asegúrese de haber pulsado el botón A de CoCube para iniciar la recepción y haga clic en **Send**.

<p align="center"><img src="packet_sender.png" alt="Enviar y recibir mensajes UDP con Packet Sender" width="760"></p>

Si la comunicación funciona, la pantalla TFT de CoCube muestra:

```text
Hello CoCube!
```

### 4. Enviar un mensaje de CoCube al ordenador

Packet Sender muestra la dirección IP del ordenador en la parte superior de la ventana y el puerto UDP de escucha en la parte inferior. Anote ambos valores.

La imagen de ejemplo utiliza:

| Elemento | Valor de ejemplo |
| --- | --- |
| IP del ordenador | `172.20.10.4` |
| Puerto UDP del ordenador | `50843` |

Sustituya la dirección IP y el puerto del programa por los valores reales que aparecen en Packet Sender:

<p align="center"><img src="scriptImage03_send.png" alt="Enviar un paquete UDP de CoCube al ordenador" width="680"></p>

Después de pulsar el botón B, CoCube envía `Hello!` al ordenador. El paquete recibido aparece en el registro de la parte inferior de Packet Sender.

> `172.20.10.4` y `50843` son ejemplos. Estos valores pueden cambiar cuando el ordenador vuelve a conectarse a la red o se abre de nuevo Packet Sender. Compruébelos y actualice el programa.

Ya hemos completado la comunicación bidireccional:

- Packet Sender envía `Hello CoCube!` a `CoCube:5000`.
- CoCube responde a Packet Sender con `Hello!`.

### 5. Controlar CoCube con mensajes UDP

Los datos recibidos no tienen que mostrarse únicamente como texto. También se pueden interpretar como órdenes de control.

Sustituya el programa receptor de la Sección 3 por este programa:

<p align="center"><img src="scriptImage04_control.png" alt="Controlar CoCube con mensajes UDP" width="680"></p>

En Packet Sender, mantenga la dirección IP de CoCube, el puerto `5000` y el protocolo UDP. Envíe estos mensajes uno por uno:

| Mensaje | Acción de CoCube |
| --- | --- |
| `forward` | Avanzar |
| `backward` | Retroceder |
| `left` | Girar a la izquierda |
| `right` | Girar a la derecha |

Este método es fácil de entender: cada palabra recibida activa una acción. Sin embargo, cada orden nueva necesita otra condición.

### 6. Llamar a funciones mediante UDP

Para llamar a más bloques, incluya el nombre de la función y sus parámetros en el mensaje UDP:

```text
call,nombre_de_función,parámetro1,parámetro2...
```

Sustituya el programa de órdenes fijas de la Sección 5 por este programa receptor general:

<p align="center"><img src="scriptImage05_function_call.png" alt="Analizar un mensaje UDP de llamada a función" width="680"></p>

El programa:

1. Recibe un paquete UDP.
2. Comprueba si el mensaje empieza por `call`.
3. Divide el mensaje por las comas.
4. Utiliza el segundo elemento como nombre de la función.
5. Utiliza el tercer elemento y los siguientes como lista de parámetros.
6. Utiliza el bloque **llama** para ejecutar la función.

Envíe este mensaje desde Packet Sender:

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

Este mensaje hace que CoCube avance a velocidad `40` durante `1000` milisegundos.

También puede probar:

```text
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
```

`scriptImage04_control.png` y `scriptImage05_function_call.png` son dos versiones del programa receptor. Después de completar el experimento con órdenes fijas, sustitúyalo por el programa general de llamadas a funciones. No ejecute las dos versiones al mismo tiempo.

### 7. Consultar el nombre de función de un bloque

El nombre de la función y los parámetros del mensaje UDP deben coincidir exactamente con los que utiliza el bloque.

Haga clic con el botón derecho en el bloque en MicroBlocks, seleccione **copia al portapapeles** y pegue el contenido en un comentario para ver su GP Script.

<p align="center"><img src="scriptImage06_show_function.png" alt="Ver el nombre de función y los parámetros de un bloque" width="680"></p>

El bloque de la imagen produce:

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

Por lo tanto:

- El nombre de la función es `CoCube move for msecs`.
- Los parámetros son `cocube;forward`, `40` y `1000`.

Una los elementos con comas y añada `call` al principio para crear un mensaje de control UDP completo.

Para obtener una explicación detallada de las llamadas a funciones, consulte [Llamadas avanzadas a programas](../cocube_basic_17_advanced_program_calls-es/).

### 8. Características de la comunicación UDP

En comparación con MQTT, la comunicación UDP es más directa:

- No necesita un broker MQTT.
- No necesita cuentas ni temas.
- Resulta útil para intercambiar datos rápidamente dentro de una misma red local.
- El emisor debe conocer la dirección IP y el puerto del receptor.

UDP no confirma que un mensaje haya llegado ni garantiza que los mensajes lleguen en orden. Es adecuado para información en tiempo real, como órdenes de control remoto y datos de posición, donde se puede aceptar la pérdida ocasional de un mensaje. No es adecuado para transferir directamente archivos importantes que deban llegar completos.

### 9. Solución de problemas

#### Packet Sender envía un mensaje, pero CoCube no lo recibe

- Confirme que el ordenador y CoCube están conectados a la misma red Wi-Fi.
- Confirme que la dirección es la IP actual que muestra CoCube.
- Confirme que el puerto de destino es `5000` y el protocolo es UDP.
- Confirme que ha pulsado el botón A para ejecutar el programa receptor.
- Compruebe si el ordenador o el router tienen activado el aislamiento de dispositivos.

#### CoCube envía un mensaje, pero Packet Sender no lo recibe

- Compruebe la dirección IP del ordenador y el puerto UDP que aparece en la parte inferior de Packet Sender.
- Si cambia el puerto de Packet Sender, actualice el programa de MicroBlocks.
- La primera vez que ejecute Packet Sender, permita su acceso a través del cortafuegos del sistema.

#### Una llamada a función no funciona

- Confirme que ha añadido la biblioteca **Llamadas a Funciones**.
- Utilice comas normales en el mensaje.
- Asegúrese de que el mensaje empieza por `call` en minúsculas.
- Compruebe el nombre de la función, el número de parámetros y su orden.

[programa-completo]: https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27TFT%27%20%27UDP%27%20%27WiFi%27%0A%0Ascript%20358%20233%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20358%20302%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28size%20var%29%20%21%3D%200%29%20%7B%0A%20%20%20%20sayIt%20var%0A%20%20%20%20%27%5Btft%3Aclear%5D%27%0A%20%20%20%20%27%5Btft%3Atext%5D%27%20var%205%205%20%28colorSwatch%20255%2017%2081%20255%29%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20358%20600%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20362%2065%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0AwifiConnect%20%27Nombre_de_red%27%20%27%27%0AsayIt%20%28getIPAddress%29%0A%27%5Bnet%3AudpStart%5D%27%205000%0A%7D%0A%0Ascript%20714%2081%20%7B%0AwhenButtonPressed%20%27B%27%0A%27%5Bnet%3AudpSendPacket%5D%27%20%27Hello%21%27%20%27172.20.10.4%27%2050843%0A%7D%0A%0Ascript%20358%20667%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28size%20var%29%20%21%3D%200%29%20%7B%0A%20%20%20%20if%20%28var%20%3D%3D%20%27forward%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bforward%27%2040%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27backward%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20move%20for%20msecs%27%20%27cocube%3Bbackward%27%2040%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27left%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bleft%27%2030%201000%0A%20%20%20%20%7D%20%28var%20%3D%3D%20%27right%27%29%20%7B%0A%20%20%20%20%20%20%27CoCube%20rotate%20for%20msecs%27%20%27cocube%3Bright%27%2030%201000%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0Ascript%20357%201235%20%7B%0AwhenButtonPressed%20%27A%27%0A%7D%0A%0Ascript%20358%201302%20%7B%0Aforever%20%7B%0A%20%20local%20%27var%27%20%28%27%5Bnet%3AudpReceivePacket%5D%27%29%0A%20%20if%20%28%28%27%5Bdata%3AcopyFromTo%5D%27%20var%201%204%29%20%3D%3D%20%27call%27%29%20%7B%0A%20%20%20%20local%20%27msg%27%20%28%27%5Bdata%3Asplit%5D%27%20var%20%27%2C%27%29%0A%20%20%20%20local%20%27cmd_name%27%20%28at%202%20msg%29%0A%20%20%20%20local%20%27cmd_args%27%20%28%27%5Bdata%3AcopyFromTo%5D%27%20msg%203%29%0A%20%20%20%20callCustomCommand%20cmd_name%20cmd_args%0A%20%20%7D%0A%20%20waitMillis%2050%0A%7D%0A%7D%0A%0A
