MQTT es un protocolo de comunicación ligero para proyectos de IoT. En este tutorial, conectaremos CoCube y la computadora al mismo servidor MQTT y completaremos dos tareas:

- La computadora envía texto a CoCube y CoCube muestra el texto en la pantalla TFT.
- CoCube envía sus coordenadas `x` e `y` y su dirección a la computadora.

Después de completar este proyecto, incluso si el CoCube y la computadora no están en la misma LAN, siempre que ambos tengan acceso a Internet, se pueden intercambiar mensajes a través de MQTT.

### 1. Preparación

Necesitarás:

- Un robot CoCube
- Una computadora capaz de ejecutar MicroBlocks
- Una red Wi-Fi de 2,4 GHz
- Cliente web MQTTX o cliente de escritorio

Abra el siguiente sitio web para utilizar el cliente web MQTTX directamente:

[Abrir MQTTX Web](https://mqttx.app/web-client)

Este tutorial utiliza el servidor público MQTT proporcionado por EMQX. Los servidores públicos están bien para experimentos en el aula, pero no envíen contraseñas de Wi-Fi, información personal u otro contenido confidencial.

### 2. Cómo entrega mensajes MQTT

Hay tres roles importantes en la comunicación MQTT:

- **Broker**: recibe y reenvía mensajes. Este tutorial utiliza `broker.emqx.io`.
- **Publicador**: envía mensajes a un tema.
- **Suscriptor**: Suscríbete a un tema y recibe mensajes en el tema.

Un tema funciona como un canal de mensajes. El mensaje solo llegará si el publicador y el suscriptor utilizan el mismo tema.

Este caso utiliza los siguientes temas:

| Tema | Dirección del mensaje | Contenido |
| --- | --- | --- |
| `cocube/control` | Computadora → CoCube | Texto a mostrar |
| `cocube/x` | CoCube → Computadora | coordenada x |
| `cocube/y` | CoCube → Computadora | coordenada y |
| `cocube/direction` | CoCube → Computadora | Ángulo de dirección |

> `broker.emqx.io` es un servidor público. Cuando varias personas usan `cocube/control` al mismo tiempo, pueden recibir mensajes de otras personas. Al iniciar una clase formal, se recomienda agregar el nombre de la clase o dispositivo, como `cocube/class1/eow/control`, y utiliza el mismo tema modificado en MicroBlocks y MQTTX.

### 3. Agregar biblioteca de bloques MQTT

Abra MicroBlocks, conecte CoCube y abre la ventana **Añadir biblioteca**:

1. Selecciona **Red**.
2. Encuentre `MQTT`.
3. Haz clic en **Abrir**.

<p align="center"><img src="add_library.png" alt="Añadir la biblioteca MQTT" width="420"></p>

La biblioteca MQTT depende de la biblioteca Wi-Fi. Después de añadirla, encontrarás bloques como conectarse al servidor, suscribirse a temas, publicar mensajes y leer eventos en el área de bloques.

### 4. Conéctese a Wi-Fi y al servidor MQTT

Construya el siguiente programa:

<p align="center"><img src="code_connect.png" alt="Conectar a Wi-Fi y al servidor MQTT" width="680"></p>

Reemplace "Nombre de red" y "Contraseña" con su información de Wi-Fi. El programa se ejecuta así:

1. Presione los botones A y B de CoCube al mismo tiempo.
2. CoCube se conecta a Wi-Fi.
3. El programa intenta conectarse al servidor MQTT `broker.emqx.io`.
4. Después de que la conexión sea exitosa, el bucle saldrá y se mostrará el patrón de cara sonriente.

La cara sonriente confirma que CoCube está conectado al servidor MQTT.

### 5. Envía un mensaje a CoCube desde tu computadora

#### 5.1 Tema de control de suscripción de CoCube

Construya el siguiente programa:

<p align="center"><img src="code_receive.png" alt="Recibir y mostrar mensajes MQTT" width="780"></p>

Después de pulsar el botón A, CoCube se suscribe al tema:

```text
cocube/control
```

Luego, el programa busca eventos MQTT cada 50 milisegundos. Cuando se reciba un nuevo mensaje:

1. Borre la pantalla TFT.
2. Muestra de qué tema proviene el mensaje.
3. Muestre el contenido específico del mensaje.

**tema del evento MQTT** permite leer el tema y **contenido del evento MQTT** permite leer el contenido del mensaje. El contenido es la información que transporta realmente el mensaje.

#### 5.2 Conectar MQTTX

Cree una nueva conexión en MQTTX. Puedes elegir cualquier nombre para la conexión, por ejemplo:

| Configuración | Contenido |
| --- | --- |
| Nombre | `CoCube` |

Deje las demás opciones con sus valores predeterminados y haga clic en **Connect**.

<p align="center"><img src="mqttx_connection.png" alt="Configuración de conexión de MQTTX" width="760"></p>

#### 5.3 Enviar el primer mensaje

Asegúrese de haber pulsado el botón A de CoCube para iniciar la suscripción. En la parte inferior de MQTTX, seleccione **Texto sin formato** y luego introduzca el tema y el contenido del mensaje:

```text
Topic: cocube/control
Message: Hello CoCube!
```

Haz clic en el botón de envío en la esquina inferior derecha. Después de una transmisión exitosa, el sujeto y `Hello CoCube!` se mostrarán en la pantalla TFT del CoCube.

<p align="center"><img src="mqttx_send_message.png" alt="Enviar un mensaje desde MQTTX" width="760"></p>

<p align="center"><img src="cocube_screen.png" alt="Pantalla de CoCube después de recibir el mensaje" width="300"></p>


### 6. Enviar la posición de CoCube al ordenador

Coloque el robot CoCube en el CoMap. El siguiente programa publicará la posición y dirección del CoCube respectivamente cuando se presione la tecla B:

<p align="center"><img src="code_publish_position.png" alt="Publicar la posición de CoCube" width="680"></p>

Se envían tres mensajes a:

```text
cocube/x
cocube/y
cocube/direction
```

#### 6.1 Suscribirse a temas en MQTTX

Haga clic en **New Subscription**, introduzca `cocube/x` y luego haga clic en **Confirm**.

<p align="center"><img src="mqttx_new_subscription.png" alt="Crear una suscripción MQTT" width="520"></p>

Continúe suscribiéndose usando el mismo método:

```text
cocube/y
cocube/direction
```

Al presionar la tecla B de CoCube, MQTTX recibirá tres mensajes.

<p align="center"><img src="mqttx_subscriptions.png" alt="Recibir mensajes de posición de CoCube" width="780"></p>

También puedes suscribirte al siguiente tema comodín para recibir estos tres subtemas a la vez:

```text
cocube/+
```

La notación `+` significa "coincidir con cualquier nombre en esta capa". Por lo tanto, `cocube/+` puede coincidir con `cocube/x`, `cocube/y` y `cocube/direction`.

### 7. Procedimiento completo

Cuando realice la prueba por primera vez, siga la siguiente secuencia:

1. Ejecute todos los programas en MicroBlocks.
2. Presione las teclas A y B simultáneamente para conectarse al servidor Wi-Fi y MQTT.
3. Espere a que CoCube muestre el patrón de cara sonriente.
4. Presione la tecla A para suscribir CoCube a `cocube/control`.
5. Envíe `Hello CoCube!` en MQTTX.
6. Suscríbase a tres temas de ubicación en MQTTX o suscríbase directamente a `cocube/+`.
7. Presione la tecla B para ver los datos de ubicación enviados por CoCube.

### 8. Preguntas frecuentes

#### CoCube no muestra caras sonrientes

- Confirme que el nombre y la contraseña de Wi-Fi sean correctos.
- Confirma que estás utilizando Wi-Fi de 2,4 GHz.
- Confirme que la red actual puede acceder a Internet.
- Algunas redes de campus u hoteles requieren autenticación de página web y CoCube no puede conectarse directamente a dichas redes.

#### MQTTX no puede conectarse

- Compruebe si la dirección del servidor es `broker.emqx.io`.
- Puedes volver a intentarlo más tarde, los servidores públicos ocasionalmente experimentan una breve congestión.

#### CoCube no puede recibir mensajes desde la computadora

- Asegúrate de que CoCube tenga una cara sonriente y luego presiona A para suscribirte.
- Comprueba que los temas en ambos extremos son exactamente iguales.
- Los temas MQTT distinguen entre mayúsculas y minúsculas, `cocube/control` y `CoCube/control` no son lo mismo.
- Si se utiliza un prefijo de tema propio, ambos extremos deberán modificarlo al mismo tiempo.

#### MQTTX no puede recibir datos de ubicación

- Confirma que estás suscrito a `cocube/x`, `cocube/y`, `cocube/direction` o `cocube/+`.
- Confirme que CoCube esté conectado al servidor y presione la tecla B nuevamente.
- Compruebe si el CoCube está en una posición donde pueda leer las coordenadas del mapa.

### 9. Más ideas

Después de completar la comunicación básica, puede intentar:

1. Deje que CoCube publique automáticamente la ubicación cada segundo.
2. Envíe `forward`, `backward`, `left`, `right` y otros mensajes para controlar el movimiento de CoCube.
3. Asigne diferentes prefijos de temas a varios CoCubes para verlos y controlarlos por separado.

MQTT permite hacer mucho más que enviar un fragmento de texto. Una vez acordados el tema y el formato del mensaje, las páginas web, los programas Python, los teléfonos y los robots pueden trabajar juntos mediante el mismo broker MQTT.
