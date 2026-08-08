En este tutorial, usarás **CoCube + MicroBlocks + MQTTX + el broker público EMQX MQTT** para construir un proyecto de IoT pequeño pero completo:

- CoCube publica su porcentaje de batería una vez por segundo;
- MQTTX se suscribe al tema y recibe los datos de la batería;
- MQTTX publica texto sobre el mismo tema;
- CoCube recibe el texto y lo muestra en su pantalla TFT.

### 1. Introducción a MQTT y MQTTX

#### 1.1 ¿Qué es MQTT?

MQTT (Message Queuing Telemetry Transport) es un protocolo de comunicación ligero basado en el modelo de publicación/suscripción. Está diseñado para redes con poco ancho de banda, conexiones poco confiables o alta latencia. Desarrollado originalmente por IBM en 1999, ahora se utiliza ampliamente para la comunicación entre dispositivos de Internet de las cosas (IoT).

MQTT organiza los mensajes por **temas**. Un dispositivo puede publicar un mensaje en un tema o suscribirse a un tema para recibir sus mensajes. Debido a que MQTT tiene poca sobrecarga de protocolo y transfiere datos de manera eficiente, es muy adecuado para dispositivos con recursos limitados, como sensores, sistemas integrados y dispositivos móviles.

#### 1.2 Los tres roles principales de MQTT

La comunicación MQTT implica tres roles principales:

- **Publicador**: publica un mensaje en un tema. En este proyecto, CoCube publica su nivel de batería, mientras que MQTTX publica texto para que CoCube lo muestre.
- **Suscriptor**: se suscribe a temas de interés y recibe sus mensajes. En este proyecto, tanto CoCube como MQTTX actúan como suscriptores.
- **Broker**: recibe mensajes de los publicadores y los reenvía a los suscriptores correspondientes. Este tutorial utiliza el broker público EMQX en `broker.emqx.io`.

Un **tema** no es una función separada. Es el nombre del canal utilizado para organizar y enrutar mensajes. Este tutorial utiliza el tema `cocube_mqtt`.

El proyecto utiliza el siguiente flujo de mensajes:

```text
CoCube  --datos de batería-->  broker.emqx.io  --reenvío-->  MQTTX
CoCube  <--mensaje de texto--  broker.emqx.io  <--publicación--  MQTTX
                                  Tema: cocube_mqtt
```

#### 1.3 ¿Qué es MQTTX?

[MQTTX](https://mqttx.app/) es un cliente MQTT 5.0 multiplataforma de código abierto desarrollado por [EMQ](https://www.emqx.com/). Es compatible con Windows, macOS y Linux.

MQTTX utiliza una interfaz estilo chat que hace que la comunicación MQTT sea fácil de seguir. Puede crear y guardar múltiples conexiones, probar conexiones MQTT/MQTTS, suscribirse a temas y publicar mensajes. En este tutorial, MQTTX se comunica con CoCube y muestra los mensajes intercambiados entre ellos.

Si no desea instalar el cliente de escritorio, puede utilizar el [cliente web MQTTX](https://mqttx.app/web-client) directamente en un navegador.

Mantenga estos dos nombres separados: **EMQX** es un software de broker MQTT o un servicio de broker que reenvía mensajes, mientras que **MQTTX** es un cliente utilizado para conectarse a un broker, suscribirse a temas y publicar mensajes de prueba.

### 2. Material necesario

Prepara lo siguiente:

- Un CoCube;
- Una computadora que pueda ejecutar MicroBlocks;
- Una red Wi-Fi a la que CoCube pueda acceder;
- El [cliente de escritorio MQTTX](https://mqttx.app/) o acceso al [cliente web MQTTX](https://mqttx.app/web-client).

Crea un proyecto en blanco en MicroBlocks y conecte CoCube. Primero añadirás la biblioteca de bloques MQTT y luego creará el programa paso a paso.

### 3. Añadir la biblioteca de bloques MQTT en MicroBlocks

Los bloques para la conexión, suscripción, publicación y eventos de MQTT los proporciona la biblioteca MQTT. Agréguelo antes de construir el programa:

1. Abre el menú **Archivo** en MicroBlocks y seleccione **Abrir**;
2. Selecciona **Bibliotecas** en el lado izquierdo de la ventana Abrir;
3. Selecciona la categoría **Red** en la columna del medio.

4. Selecciona **MQTT** de la lista de la derecha;
5. Haz clic en **Abrir** en la esquina inferior derecha.

Los bloques MQTT ahora aparecerán en la paleta de bloques. La biblioteca MQTT depende de la biblioteca WiFi, por lo que los bloques de conexión Wi-Fi normalmente se cargan al mismo tiempo. Si falta el bloque **conectar WiFi**, utilice el mismo proceso para agregar la biblioteca **WiFi** de la categoría Red.

### 4. Crear una conexión con el broker EMQX en MQTTX

Aquí, "crear un servidor" significa crear un perfil de conexión en MQTTX. `broker.emqx.io` ya es un broker público en funcionamiento, por lo que no necesita implementar su propio servidor.

#### 4.1 Crear una nueva conexión

Abre MQTTX y haga clic en el ícono `+` a la izquierda o en el botón **Nueva conexión**.

<p align="center"><img src="mqttx_new_connection.png" alt="Crear una conexión nueva en MQTTX" width="760"></p>

Usa la siguiente configuración:

| Configuración | Valor recomendado | Descripción |
| --- | --- | --- |
| Nombre | `mqtt_test` | Identifica esta conexión en MQTTX |
| ID de cliente | Un valor único generado automáticamente | No reutilice el ID de otro cliente |
| Anfitrión | `broker.emqx.io` | No añadas `http://` o `https://` en el bloque MicroBlocks |
| Protocolo | `mqtt://` | La aplicación de escritorio MQTTX puede utilizar MQTT nativo |
| Puerto | `1883` | Puerto estándar para MQTT no cifrado |
| Nombre de usuario | Déjalo en blanco | El broker público EMQX no lo requiere |
| Contraseña | Déjalo en blanco | El broker público EMQX no lo requiere |
| SSL/TLS | Apagado | Coincide con el puerto `1883` |

Si utiliza un cliente WebSocket MQTTX basado en navegador, utilice `ws://broker.emqx.io:8083/mqtt` en su lugar. MQTTX y CoCube pueden utilizar diferentes puertos de transporte y seguir comunicándose, siempre que se conecten al mismo broker y utilicen el mismo tema.

Guarde el perfil y haga clic en **Conectar**. Un indicador de estado verde junto al nombre de la conexión significa que MQTTX está conectado.

> `broker.emqx.io` es un broker de pruebas público. Cualquiera puede publicar o suscribirse a temas públicos. No envíes contraseñas, información personal u otros datos sensibles, y no los utilice para proyectos de producción.

### 5. Crea y suscríbase a un tema

No es necesario crear un tema MQTT en el panel del servidor. Se vuelve utilizable cuando un cliente se suscribe por primera vez o publica un mensaje en él.

Después de conectarse, haga clic en **Nueva suscripción** e ingrese:

| Configuración | Valor utilizado en este tutorial |
| --- | --- |
| Tema | `cocube_mqtt` |
| Calidad de servicio | `0` |
| Alias ​​| Déjelo en blanco o ingrese `CoCube` |

Haz clic en **Confirmar**.

<p align="center"><img src="mqttx_subscription.png" alt="Crear una suscripción a un tema en MQTTX" width="700"></p>

> El `testtopic/#` que se muestra en la captura de pantalla es solo un ejemplo de suscripción comodín MQTTX. Introduce `cocube_mqtt` para este tutorial para que la suscripción coincida con el programa CoCube creado más adelante.

Los nombres de los temas distinguen entre mayúsculas y minúsculas. Los espacios, barras y guiones bajos también deben coincidir exactamente. En un broker público, es más seguro incluir un número único de estudiante o de dispositivo, como `cocube_mqtt_023`. Si cambia el tema, cámbielo en todas partes tanto en MQTTX como en MicroBlocks.

### 6. Bloques MQTT utilizados en este proyecto

#### 6.1 Conectarse a Wi-Fi

<p align="center"><img src="wifi_connect_block.png" alt="Bloque para conectar WiFi" width="560"></p>

Las dos entradas en el bloque **conectar WiFi** son el nombre de Wi-Fi (SSID) y la contraseña. Este bloque debe ejecutarse antes de la conexión MQTT porque MQTT requiere acceso a la red. En el programa completo, también usarás **borrar pantalla TFT** primero para eliminar el contenido dejado por una ejecución anterior.

#### 6.2 Conéctese al broker MQTT

El bloque **conéctate al broker MQTT** especifica la dirección del broker:

<p align="center"><img src="mqtt_connect_block.png" alt="Bloque de conexión con el broker MQTT" width="560"></p>

Introduce el broker público EMQX utilizado en este tutorial:

<p align="center"><img src="connect_broker.png" alt="Introducir broker.emqx.io en el bloque de conexión MQTT" width="720"></p>

Sólo se ingresa el nombre de host del broker. Luego, la biblioteca MQTT usará su tamaño de búfer predeterminado, usará la dirección MAC del dispositivo como ID del cliente y dejará el nombre de usuario y la contraseña vacíos.

#### 6.3 Verificar la conexión

<p align="center"><img src="mqtt_connected_block.png" alt="Bloque booleano MQTT conectado" width="400"></p>

**MQTT conectado** es un bloque booleano. Úselo como condición de un bloque **si** para que las tareas de suscripción y mensajes comiencen solo después de que la conexión se realice correctamente.

#### 6.4 Suscribirse a un tema

<p align="center"><img src="mqtt_subscribe_block.png" alt="Bloque de suscripción a un tema MQTT" width="460"></p>

El bloque de suscripción le dice al broker qué tema desea recibir el dispositivo. `testTopic` en la imagen es el ejemplo predeterminado del bloque. Reemplácelo con `cocube_mqtt` y use el valor de QoS predeterminado de `0`.

#### 6.5 Publicar un mensaje

<p align="center"><img src="mqtt_publish_block.png" alt="Bloque para publicar un tema y su contenido" width="680"></p>

El bloque de publicación tiene dos entradas esenciales:

- **Tema**: el canal al que se envía el mensaje;
- **Contenido**: el texto, número o datos reales que se envían.

`testTopic` y `Hello!` en la imagen son ejemplos predeterminados. Para publicar el nivel de batería de CoCube, cambie el tema a `cocube_mqtt` y coloque el indicador **porcentaje de batería** en la entrada de contenido.

#### 6.6 Leer un evento MQTT y su contenido

<p align="center"><img src="mqtt_event_block.png" alt="Bloque de evento MQTT" width="320"></p>

El bloque **evento MQTT** devuelve el último evento MQTT entrante.

<p align="center"><img src="mqtt_event_payload_block.png" alt="Extraer el contenido de un evento MQTT" width="430"></p>

El bloque **contenido del evento MQTT** extrae el cuerpo del mensaje del evento. El programa almacena este resultado en una variable llamada `MESSAGE` y lo muestra en la pantalla TFT.

### 7. Cree el programa completo de envío y recepción

El programa completo consta de tres scripts principales. Antes de construirlos, crea una variable llamada `MESSAGE` para almacenar los contenidos recibidos. Las imágenes de bloques de esta sección muestran partes individuales del programa. Los bloques de inicio o de control externos que no aparecen en una imagen se describen por separado.

#### 7.1 Script 1: conéctate, suscríbete e inicia las tareas

##### Paso 1: borre el TFT y conéctese a Wi-Fi

Coloque **borrar pantalla TFT**, luego conecte **conectar WiFi** debajo de ella. Reemplaza las dos entradas en blanco que se muestran en la imagen con su nombre y contraseña de Wi-Fi.

<p align="center"><img src="main_connect_wifi.png" alt="Borrar la TFT y conectarse a Wi-Fi en el script principal" width="620"></p>

##### Paso 2: Conéctese al broker MQTT

Conecte **conéctate al broker MQTT** debajo del bloque de Wi-Fi e ingrese `broker.emqx.io`.

<p align="center"><img src="connect_broker.png" alt="Conectarse al broker MQTT en el script principal" width="720"></p>

##### Paso 3: Verifica la conexión y suscríbete

Coloque un bloque **si** debajo del bloque de conexión del broker y utilice **MQTT conectado** como condición. La rama que se muestra en la imagen contiene estos bloques en orden:

1. Escriba `Servidor MQTT conectado.` en la TFT en `(5, 5)`;
2. Suscríbase a `cocube_mqtt`.

<p align="center"><img src="connect_and_subscribe.png" alt="Mostrar el mensaje de conexión y suscribirse después de conectar MQTT" width="780"></p>

La imagen muestra solo la rama **si**. No incluye los bloques de conexión Wi-Fi y MQTT que se encuentran encima. Conecte las tres secciones del programa verticalmente en el orden descrito aquí.

##### Paso 4: Inicie el envío y recepción de scripts

Agregue estos bloques a continuación **suscríbase a `cocube_mqtt`**:

1. Transmitir `start_sending_message`;
2. Transmitir `start_receiving_message`.

<p align="center"><img src="start_broadcasts.png" alt="Emitir start_sending_message y start_receiving_message" width="650"></p>

Conecte los dos bloques de transmisión debajo del bloque de suscripción. Comienzan los dos scripts independientes que se describen a continuación. Si la conexión MQTT falla, no se ejecutará ninguno de los bloques de visualización, suscripción o transmisión dentro de la rama **si**.

#### 7.2 Script 2: publicar el nivel de batería del CoCube una vez por segundo

Coloque un bloque de inicio **cuando reciba `start_sending_message`** y luego adjunte el siguiente bucle debajo de él:

1. Ejecute continuamente;
2. Publica la contenido del **porcentaje de batería** en `cocube_mqtt`;
3. Espere en microsegundos `1000000`.

<p align="center"><img src="publish_battery.png" alt="Bucle continuo del script que publica la batería" width="720"></p>

La imagen comienza con el bloque **para siempre** y no incluye el bloque de inicio **cuando reciba `start_sending_message`** encima. Los microsegundos `1000000` equivalen a 1 segundo. El retraso es importante: sin él, CoCube publicaría a un ritmo muy alto, desperdiciando recursos de la red y de los brokers y dificultando la observación de los resultados.

#### 7.3 Script 3: recibir un mensaje y mostrarlo en el TFT

Coloque un bloque de inicio **cuando reciba `start_receiving_message`**. Agregue un bloque **repetir indefinidamente** debajo y coloque los bloques que se muestran en la siguiente imagen dentro de ese bucle.

Los bloques de la imagen se ejecutan en este orden:

1. Establezca `MESSAGE` en **contenido del evento MQTT**, utilizando **evento MQTT** como entrada;
2. Si la longitud de `MESSAGE` es mayor que `0`, ejecute la rama condicional;
3. Borre la pantalla TFT;
4. Escriba `Servidor MQTT conectado. Mensaje recibido:` en `(5, 5)`;
5. Escriba `MESSAGE` en `(5, 50)`.

<p align="center"><img src="receive_and_display.png" alt="Leer el contenido MQTT y mostrarlo dentro del bucle de recepción" width="780"></p>

La imagen no incluye el bloque exterior bloque de inicio **al recibir** o el bloque **para siempre**. Verificar la longitud del mensaje evita que el programa borre la pantalla cuando no ha llegado ninguna contenido válida.

#### 7.4 Cómo funcionan juntos los tres scripts

```text
Script principal
  ├─ Conectarse a Wi-Fi y MQTT
  ├─ Suscribirse a cocube_mqtt
  ├─ Emitir start_sending_message
  │    └─ Script de envío: publicar la batería cada segundo
  └─ Emitir start_receiving_message
       └─ Script de recepción: leer el contenido y mostrarlo en la TFT
```

### 8. Pruebe el flujo de mensajes completo

Para evitar perder mensajes enviados inmediatamente después del inicio, pruebe en el siguiente orden.

#### 8.1 Preparar MQTTX para recibir mensajes

1. Conecte MQTTX a `broker.emqx.io`;
2. Confirma que MQTTX esté suscrito a `cocube_mqtt`;
3. Mantenga abierta la página de conexión MQTTX.

#### 8.2 Iniciar el programa CoCube

1. Conecta CoCube en MicroBlocks;
2. Reemplaza el nombre y la contraseña de Wi-Fi con los detalles de su propia red;
3. Haz clic en el bloque **borrar pantalla TFT** en la parte superior del script principal para ejecutar todo el script;
4. Espere a que aparezca `Servidor MQTT conectado.` en la TFT.

Cuando la conexión se realiza correctamente, CoCube muestra el siguiente resultado. El texto en inglés se ajusta debido al ancho limitado de la pantalla.

<p align="center"><img src="cocube_connected.jpg" alt="CoCube conectado al broker MQTT" width="380"></p>

Después de que CoCube se haya conectado y suscrito, MQTTX debería recibir un valor de batería como `40` o `41` aproximadamente una vez por segundo.

<p align="center"><img src="mqttx_battery_messages.png" alt="MQTTX recibe los valores de batería publicados por CoCube" width="780"></p>

Los datos ahora han completado esta ruta:

```text
CoCube → broker.emqx.io → MQTTX
```

#### 8.3 Enviar texto desde MQTTX a CoCube

En el área de publicación en la parte inferior de MQTTX, use esta configuración:

| Configuración | Valor |
| --- | --- |
| Formato del contenido | `Texto sin formato` |
| Calidad de servicio | `0` |
| Tema | `cocube_mqtt` |
| Contenido | `hello`, `word` u otro mensaje corto |

Haz clic en el botón verde **Enviar** en la esquina inferior derecha.

<p align="center"><img src="mqttx_publish_message.png" alt="Publicar texto en cocube_mqtt desde MQTTX" width="780"></p>

Después de recibir el mensaje, CoCube borra su TFT y muestra la contenido. En la siguiente imagen, MQTTX publicó `word` y CoCube muestra `word`.

<p align="center"><img src="message_on_cocube.jpg" alt="CoCube muestra el mensaje word recibido desde MQTTX" width="360"></p>

El mensaje ahora ha completado el camino inverso:

```text
MQTTX → broker.emqx.io → CoCube
```

Cuando MQTTX muestra mensajes publicados y recibidos, el tema transporta datos correctamente en ambas direcciones:

<p align="center"><img src="mqttx_message_result.png" alt="Intercambio bidireccional completo en un tema" width="780"></p>

### 9. Por qué CoCube puede recibir su propio valor de batería

Para simplificar el primer proyecto, este tutorial utiliza solo un tema: `cocube_mqtt`. CoCube se suscribe a este tema y publica en él el valor de la batería. Por lo tanto, el broker puede reenviar el propio mensaje de batería de CoCube a CoCube.

Esto provoca dos efectos visibles:

- La TFT puede mostrar el valor de la batería del propio CoCube;
- El texto enviado por MQTTX puede ser visible durante menos de un segundo antes de que el siguiente mensaje de batería lo reemplace.

En la siguiente imagen, `40` es la contenido de la batería que CoCube publicó en `cocube_mqtt` y luego recibió nuevamente del mismo tema:

<p align="center"><img src="battery_on_cocube.jpg" alt="CoCube recibe y muestra su propio valor de batería 40" width="360"></p>

Para el primer experimento, puede detener temporalmente el script de publicación de la batería para que el texto entrante permanezca visible. Después de completar el experimento básico, utilice temas separados para las dos direcciones:

| Dirección | Tema recomendado |
| --- | --- |
| CoCube → MQTTX | `cocube_mqtt/device_id/up` |
| MQTTX → CoCube | `cocube_mqtt/device_id/down` |

Por ejemplo, para el dispositivo `023`:

```text
cocube_mqtt/023/up
cocube_mqtt/023/down
```

Realice estos cambios:

1. Cambia el tema de suscripción de CoCube a `cocube_mqtt/023/down`;
2. Cambia el tema de publicación de CoCube a `cocube_mqtt/023/up`;
3. Suscríbase MQTTX a `cocube_mqtt/023/up`;
4. Publica mensajes de texto MQTTX en `cocube_mqtt/023/down`.

### 10. Lista de verificación

- [ ] CoCube está conectado correctamente en MicroBlocks;
- [ ] Se han reemplazado el nombre y la contraseña de Wi-Fi;
- [ ] MQTTX y CoCube están conectados a `broker.emqx.io`;
- [ ] MQTTX muestra un estado de conexión verde;
- [ ] MQTTX y CoCube utilizan exactamente el mismo tema;
- [ ] Ambos clientes utilizan QoS `0` para la prueba básica;
- [ ] La TFT muestra `Servidor MQTT conectado.`;
- [ ] MQTTX recibe un mensaje de batería por segundo;
- [ ] CoCube muestra el texto publicado por MQTTX.

### 11. Solución de problemas

#### MQTTX no puede conectarse

Comprueba la red, la dirección del broker y el puerto. MQTT nativo en el cliente de escritorio normalmente usa `broker.emqx.io:1883`; WebSocket normalmente usa `ws://broker.emqx.io:8083/mqtt`. Asegúrate de que el ID del cliente sea único.

#### CoCube no muestra el mensaje de conexión

Primero verifique el nombre y la contraseña de Wi-Fi. Luego asegúrese de que el bloque de broker contenga solo `broker.emqx.io`. Cuando falla la conexión, el programa no transmite los mensajes de inicio, así que corrija la configuración y ejecute el script principal nuevamente.

#### MQTTX no recibe datos de la batería

Confirma que MQTTX esté suscrito a `cocube_mqtt`, no al tema de ejemplo `testtopic/#` que se muestra en la captura de pantalla. También verifique que el script de la batería haya recibido la transmisión `start_sending_message`.

#### CoCube no recibe texto de MQTTX

Asegúrate de que el tema de publicación MQTTX también sea `cocube_mqtt`, que el formato de contenido sea `Texto sin formato` y que la contenido no esté vacía. Los nombres de los temas distinguen entre mayúsculas y minúsculas.

#### El texto se reemplaza inmediatamente por un número

Este es un resultado esperado al usar un tema en ambas direcciones: el siguiente mensaje de batería reemplaza el texto. Detén temporalmente el script de publicación de la batería o siga la Sección 9 para utilizar temas separados sobre `/up` y `/down`.

#### Los mensajes de diferentes grupos de estudiantes interfieren entre sí

`cocube_mqtt` no es un tema privado en el broker público. Asigna a cada dispositivo un número único, como `cocube_mqtt_023`, y cambie el tema tanto en MQTTX como en MicroBlocks.

### 12. Resumen

Ahora ha completado un ciclo de comunicación de IoT completo:

1. CoCube se conecta a Wi-Fi;
2. CoCube y MQTTX se conectan al mismo broker EMQX;
3. Los clientes establecen un canal de mensajes utilizando el mismo tema;
4. CoCube publica su nivel de batería y MQTTX se suscribe y lo recibe;
5. MQTTX publica texto y CoCube se suscribe, extrae la contenido y la muestra.

Ahora puede reemplazar el valor de la batería con datos del sensor o interpretar el texto recibido como `forward`, `left`, `right` y `stop` como comandos para construir un robot controlado de forma remota.

### 13. Proyecto de referencia

Después de completar el tutorial, descargue y abra el proyecto de referencia para comparar los tres scripts, parámetros de bloque y nombres de transmisión:

<a href="CoCube_MQTT_01.ubp" download="CoCube_MQTT_01.ubp">Descargue el proyecto de referencia <code>CoCube_MQTT_01.ubp</code></a>

Usa el proyecto sólo para comparar y solucionar problemas después de completar el tutorial. No reemplaza la construcción del programa paso a paso.

> Antes de ejecutar el proyecto de referencia, reemplace el nombre y la contraseña de Wi-Fi guardados con los detalles de su propia red. Elimina las contraseñas de Wi-Fi reales antes de compartir el archivo `.ubp`.
