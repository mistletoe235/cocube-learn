En la lección anterior, [Comunicación MQTT](../cocube_basic_21_mqtt_communication-es/), completaste el intercambio básico de mensajes MQTT entre CoCube y MQTTX. En esta lección crearás un sistema de control remoto más general:

- CoCube informa su posición y dirección a MQTTX;
- MQTTX envía un nombre de función y parámetros a CoCube;
- CoCube divide el mensaje y llama a la función de bloque correspondiente.

Esta lección utiliza mensajes de control como:

```text
CoCube move for msecs,cocube;forward,40,1000
```

Este mensaje significa: llamar a `CoCube move for msecs`, avanzar a velocidad `40` y mantener el movimiento durante `1000` milisegundos.

### 1. ¿Por qué utilizar MQTT en lugar de una conexión Bluetooth directa?

El Bluetooth directo es adecuado cuando un controlador cercano se conecta directamente a un robot. MQTT utiliza un broker para separar el controlador del robot. No necesitan una conexión directa: ambas partes sólo necesitan conectarse con el mismo broker y utilizar los temas acordados.

| Comparación | MQTT | Bluetooth/BLE directo |
| --- | --- | --- |
| Rango de comunicación | Puede trabajar en varias salas, en un campus o en Internet cuando ambas partes pueden comunicarse con el broker | Normalmente requiere que el controlador permanezca cerca del robot.
| Modelo de conexión | Admite comunicación uno a muchos, muchos a uno y muchos a muchos | Comúnmente utilizado como conexión directa uno a uno |
| Múltiples observadores | MQTTX, aplicaciones web y servidores pueden suscribirse al mismo tiempo | Normalmente, sólo el cliente Bluetooth actualmente conectado recibe los datos directamente |
| Múltiples robots | Asigna un tema diferente a cada robot | Los dispositivos deben descubrirse, conectarse y administrarse por separado |
| Integración en la nube | Fácil de conectar a bases de datos, paneles y servicios de automatización | Generalmente requiere una puerta de enlace Bluetooth adicional |
| Requisito de red | Requiere Wi-Fi y un broker disponible | No requiere Internet para operación cercana |
| Consumo de energía | Wi-Fi normalmente consume más energía que BLE | BLE está diseñado para comunicaciones de corto alcance y bajo consumo |
| Latencia | Depende del estado de la red y del broker | Una conexión directa cercana suele ser más estable |

La principal ventaja de MQTT no es que siempre sea más rápido que Bluetooth. Sus ventajas son:

- El controlador y el robot están desacoplados y no necesitan emparejamiento directo;
- Posibilidad de control y seguimiento remotos;
- Pueden participar varios clientes al mismo tiempo;
- El proyecto puede convertirse en un sistema IoT de múltiples robots o más amplio.

Bluetooth puede seguir siendo la mejor opción para el control cercano de un solo robot cuando las prioridades son el bajo consumo, la baja latencia y el funcionamiento fuera de línea. Esta lección utiliza MQTT porque se adapta mejor a arquitecturas remotas, multicliente y multidispositivo.

### 2. Paso 1: Crear la conexión MQTT y dos temas

#### 2.1 Crear una conexión de broker EMQX

Como en la lección anterior, cree una nueva conexión en MQTTX. Aquí, "crear un servidor" significa crear un perfil de conexión de broker en MQTTX; no significa implementar su propio servidor.

Usa estas configuraciones:

| Configuración | Valor |
| --- | --- |
| Nombre | `mqtt_test` |
| Anfitrión | `broker.emqx.io` |
| Protocolo | `mqtt://` |
| Puerto | `1883` |
| ID de cliente | Usa el valor único generado automáticamente por MQTTX |
| Nombre de usuario | Déjalo en blanco |
| Contraseña | Déjalo en blanco |
| SSL/TLS | Desactivado |

Guarda el perfil y haz clic en **Conectar**. Un indicador verde al lado del nombre de la conexión significa que MQTTX está conectado al broker público EMQX.

> `broker.emqx.io` es un broker de pruebas público. No envíes contraseñas, información personal u otros datos confidenciales, y no uses el broker público para proyectos de producción.

#### 2.2 Crear dos temas

En lugar de utilizar un tema para ambas direcciones, esta lección utiliza dos temas con direcciones claramente definidas:

| Tema | Dirección | Propósito |
| --- | --- | --- |
| `cocube_mqtt_send` | CoCube → MQTTX | CoCube publica su posición X, posición Y y dirección |
| `cocube_mqtt_receive` | MQTTX → CoCube | MQTTX publica mensajes de control para CoCube |

En MQTTX, haz clic en **Nueva suscripción** y añade `cocube_mqtt_send` y `cocube_mqtt_receive`. Usa QoS `0` para ambos.

<p align="center"><img src="create_new_topic.png" alt="Añadir los temas de envío y recepción en MQTTX" width="300"></p>

La captura de pantalla también contiene **cocube\_mqtt**, que se utilizó en la lección anterior. Esta lección utiliza los dos temas nuevos **cocube\_mqtt\_send** y **cocube\_mqtt\_receive**.

No es necesario crear temas MQTT en el panel de un broker. Un tema se vuelve utilizable cuando un cliente se suscribe o publica en él por primera vez. En esta lección, "crear dos temas" significa agregar las suscripciones en MQTTX y luego usar exactamente los mismos nombres de temas en el programa.

#### 2.3 Conectar CoCube al broker

En MicroBlocks, conéctate primero a Wi-Fi y luego conéctate a `broker.emqx.io`.

<p align="center"><img src="connect.png" alt="Conectar CoCube a Wi-Fi y al broker MQTT" width="760"></p>

Una vez que la conexión sea exitosa, CoCube debe:

1. Suscríbete a `cocube_mqtt_receive`;
2. Inicia el script de recepción de mensajes;
3. Inicia el script de informe de posición.

Las dos direcciones deben configurarse correctamente: CoCube publica en `cocube_mqtt_send`, pero se suscribe a `cocube_mqtt_receive`.

### 3. Paso 2: Importar llamadas a funciones e inspeccionar definiciones de funciones

#### 3.1 Importar la biblioteca de llamadas a funciones

Las llamadas a funciones dinámicas requieren la biblioteca **Llamadas a funciones**:

1. Abre la ventana de la biblioteca MicroBlocks;
2. Selecciona la categoría **Otro**.

<p align="center"><img src="add1.png" alt="Seleccionar Otros en la ventana de bibliotecas de MicroBlocks" width="330"></p>

3. Selecciona **Llamadas a funciones**;
4. Haz clic en **Abrir** para importarlo.

<p align="center"><img src="add2.png" alt="Importar la biblioteca Llamadas a funciones" width="340"></p>

Después de importar la biblioteca, puedes usar el bloque **llamar**:

<p align="center"><img src="call_function.png" alt="El bloque llamar de la biblioteca Llamadas a funciones" width="360"></p>

Este bloque acepta dos entradas:

- El nombre de la función a llamar;
- La lista de parámetros para pasar a esa función.

Más tarde, el primer campo del mensaje MQTT se convertirá en el nombre de la función, mientras que los campos restantes se convertirán en la lista de parámetros.

#### 3.2 ¿Para qué se utiliza el bloque **comentario**?

El bloque **comentario** no controla el robot y no afecta la ejecución del programa. Es útil para:

- registrar el propósito de una sección del programa;
- Explicar formatos o parámetros de mensajes;
- Almacenamiento temporal de texto;
- Inspeccionar la representación GP Script de un bloque copiado en el portapapeles.

<p align="center"><img src="comment.png" alt="El bloque comentario de MicroBlocks" width="600"></p>

En esta lección, el bloque **comentario** se utiliza para inspeccionar la definición de función interna de un bloque CoCube. Esto es más confiable que adivinar el nombre de una función a partir del texto que se muestra en la interfaz.

#### 3.3 Inspeccionar la definición de función de un bloque

Usa el bloque "avanzar a velocidad 40 durante 1000 milisegundos" como ejemplo:

1. Haz clic derecho en el bloque de destino;
2. Selecciona **Copiar al portapapeles**.

<p align="center"><img src="first.png" alt="Copiar un bloque de movimiento de CoCube al portapapeles" width="550"></p>

3. Crea un bloque de **comentario**;
4. Pega el contenido del portapapeles en el bloque **comentario**.

<p align="center"><img src="record1.png" alt="Examinar la definición GP Script del bloque en un comentario" width="760"></p>

Se muestra la siguiente definición:

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

Contiene un nombre de función y tres parámetros:

| Posición | Contenido | Significado |
| --- | --- | --- |
| Nombre de la función | `CoCube move for msecs` | Mover por un tiempo específico |
| Parámetro 1 | `cocube;forward` | Dirección |
| Parámetro 2 | `40` | Velocidad |
| Parámetro 3 | `1000` | Duración del movimiento en milisegundos |

Las llamadas remotas deben utilizar estos valores internos, no etiquetas de interfaz traducidas. Por ejemplo, la dirección de avance debe ser `cocube;forward`, no `forward` u otra etiqueta traducida.

### 4. Paso 3: ¿Por qué llamar a funciones en lugar de utilizar alias de comandos?

#### 4.1 Representar acciones con letras individuales

Un enfoque sencillo consiste en definir alias como:

```text
w = avanzar
a = girar a la izquierda
s = retroceder
d = girar a la derecha
```

Después de recibir un mensaje MQTT, el programa puede transmitir el texto del mensaje:

<p align="center"><img src="one_to_one.png" alt="Emitir el contenido de un mensaje MQTT recibido" width="760"></p>

Cada alias necesita entonces un script correspondiente. Por ejemplo, recibir `w` hace que CoCube avance:

<p align="center"><img src="receive_w.png" alt="Mover CoCube hacia delante al recibir el mensaje w" width="700"></p>

Esto es fácil de entender, pero crea una estructura de un comando a un script. Cada nueva acción requiere un nuevo alias y otro script de recepción.

#### 4.2 Problemas con los alias de comandos

Si la velocidad y la duración también deben ser ajustables, se requieren muchos más alias:

```text
w1 = avanzar a velocidad 20 durante 500 ms
w2 = avanzar a velocidad 40 durante 1000 ms
w3 = avanzar a velocidad 50 durante 2000 ms
```

A medida que crece el número de direcciones, velocidades, duraciones y tipos de acciones, los alias se vuelven difíciles de recordar. El programa de recepción MQTT también se llena con lógica condicional o scripts de recepción separados.

#### 4.3 Ventajas de los nombres y parámetros de funciones

Con las llamadas a funciones, cada mensaje indica directamente qué función llamar y qué parámetros pasar:

```text
CoCube move for msecs,cocube;forward,40,1000
CoCube move for msecs,cocube;backward,30,800
CoCube rotate for msecs,cocube;left,30,1000
```

Este enfoque tiene varias ventajas:

- Una función puede realizar muchas acciones utilizando diferentes parámetros;
- No es necesario un nuevo alias para cada combinación de velocidad y duración;
- Las funciones de movimiento y rotación existentes en la biblioteca CoCube se pueden reutilizar;
- El programa MQTT maneja el análisis de mensajes mientras que la función CoCube maneja la acción;
- Las nuevas funciones invocables pueden utilizar la misma estructura de mensaje.

En resumen, `w` representa una acción fija, mientras que el nombre de una función y los parámetros describen una categoría ajustable de acciones.

### 5. Paso 4: Recibir comandos, llamar funciones y enviar datos de estado

Este proyecto utiliza el siguiente formato de mensaje:

```text
nombre_de_función,parámetro1,parámetro2,parámetro3...
```

La coma `,` es sólo el delimitador elegido para este proyecto. MQTT no requiere comas. Podrá utilizar otro delimitador como `|` o `#`, siempre que:

- MQTTX y CoCube utilizan el mismo delimitador;
- El delimitador no aparece dentro del nombre de una función o parámetro;
- Al mismo tiempo se cambia el delimitador en el bloque dividido de MicroBlocks.

Un punto y coma `;` no es adecuado aquí porque valores como `cocube;forward` y `cocube;left` ya contienen punto y coma.

#### 5.1 Recibir un mensaje MQTT y llamar a la función

CoCube se suscribe a `cocube_mqtt_receive`. El script receptor lee continuamente el último evento MQTT y almacena su contenido en `MESSAGE`. Muestra y procesa el mensaje solo cuando `MESSAGE` no está vacío.

<p align="center"><img src="storage.png" alt="Recibir contenido MQTT y guardarlo en MESSAGE" width="780"></p>

Para este mensaje entrante:

```text
CoCube move for msecs,cocube;forward,40,1000
```

Trate las asignaciones de variables y la llamada a funciones como un proceso continuo:

1. Divida `MESSAGE` por coma y almacene el resultado completo en `STORAGE`;
2. Guarde el artículo 1 de `STORAGE` en `NAME`; este es el nombre de la función;
3. Copie `STORAGE` del elemento 2 en adelante a `LIST`; esta es la lista de parámetros;
4. Usa `call NAME with LIST` para llamar a la función.

<p align="center"><img src="get_message.png" alt="Dividir el mensaje MQTT y guardarlo en STORAGE" width="780"></p>

<p align="center"><img src="get_function.png" alt="Asignar el primer elemento de STORAGE a NAME" width="720"></p>

<p align="center"><img src="get_param.png" alt="Asignar los elementos restantes de STORAGE a LIST" width="720"></p>

<p align="center"><img src="call_function_by_mqtt.png" alt="Llamar a la función usando NAME y LIST" width="650"></p>

Las variables contienen los siguientes valores durante este proceso:

```text
MESSAGE = CoCube move for msecs,cocube;forward,40,1000

STORAGE = [CoCube move for msecs, cocube;forward, 40, 1000]

NAME = CoCube move for msecs

LIST = [cocube;forward, 40, 1000]

Ejecución: call NAME with LIST
```

El resultado final equivale a llamar:

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

#### 5.2 Enviar un comando de control desde MQTTX

Usa la siguiente configuración en el área de publicación en la parte inferior de MQTTX:

| Configuración | Valor |
| --- | --- |
| Formato del contenido | `Texto sin formato` |
| Calidad de servicio | `0` |
| Retain | Desactivado |
| Tema | `cocube_mqtt_receive` |
| Contenido | Un mensaje de control que contiene el nombre de la función y los parámetros |

**Antes de enviar, cambia el destino de publicación a `cocube_mqtt_receive`.** El área de publicación aún puede contener el tema utilizado en la lección anterior o en una prueba anterior. CoCube no recibirá el comando si no se cambia el tema.

<p align="center"><img src="ps.png" alt="Cambiar el tema del mensaje de control en el área de publicación de MQTTX" width="760"></p>

> La imagen resalta la ubicación del campo Tema. Los nombres de los temas MQTT distinguen entre mayúsculas y minúsculas. La referencia UBP se suscribe al tema en minúsculas `cocube_mqtt_receive`. Incluso si la captura de pantalla muestra `CoCube_mqtt_receive`, introduce todo en minúsculas para que coincida con el programa.

Envía el comando para avanzar:

```text
CoCube move for msecs,cocube;forward,40,1000
```

CoCube avanza a la velocidad `40` durante `1000` milisegundos.

Envía el comando de giro a la izquierda:

```text
CoCube rotate for msecs,cocube;left,30,1000
```

CoCube gira hacia la izquierda a la velocidad `30` durante `1000` milisegundos. El registro de mensajes MQTTX y el movimiento real de CoCube se muestran a continuación:

<p align="center"><img src="receive_result.png" alt="Comandos de movimiento y giro en MQTTX" width="600"></p>

<video style="width: 240px; max-width: 100%; height: auto;" controls preload="metadata">
  <source src="result.mp4" type="video/mp4">
Este visor de Markdown no admite vídeos incrustados. <a href="result.mp4">Abre el vídeo de demostración aquí</a>.
</video>

#### 5.3 Enviar posición y dirección de CoCube a MQTTX

El script de envío utiliza `cocube_mqtt_send`:

- Cuando CoCube está en un CoMap, publica `posición_X,posición_Y,dirección`;
- Cuando CoCube no está en un CoMap, publica `0,0,0`.

<p align="center"><img src="send_message.png" alt="CoCube publica su posición X, posición Y y dirección" width="650"></p>

Por ejemplo:

```text
103,56,163
```

Esto significa que X es `103`, Y es `56` y la dirección es `163`. Después de suscribirse a `cocube_mqtt_send`, MQTTX recibe continuamente estos datos:

<p align="center"><img src="send_result.png" alt="MQTTX recibe la posición y la dirección de CoCube" width="780"></p>

Esto nuevamente muestra la dirección de los dos temas:

```text
CoCube publica el estado → cocube_mqtt_send    → MQTTX recibe
MQTTX publica el comando → cocube_mqtt_receive → CoCube recibe
```

### 6. Paso 5: Más ideas y precauciones importantes

#### 6.1 El delimitador es flexible, pero debe ser consistente

La coma es sólo el delimitador seleccionado para esta lección. Se puede utilizar otro carácter, pero no debe entrar en conflicto con el contenido del campo. Recordar:

- La coma de ancho completo `，` es diferente de la coma ASCII `,`;
- No añade espacios alrededor de los delimitadores a menos que el analizador los elimine;
- Una simple operación de división no puede analizar de forma segura el texto que contiene el delimitador;
- Si los parámetros pueden contener comas, usa un delimitador como `|` o pase a JSON.

Por ejemplo, con un delimitador de barra vertical, tanto el remitente como el receptor deben utilizar:

```text
CoCube move for msecs|cocube;forward|40|1000
```

#### 6.2 El nombre de la función, el recuento de parámetros y el orden deben ser correctos

`CoCube move for msecs` requiere tres parámetros en este orden:

```text
dirección,velocidad,duración
```

Los parámetros faltantes, adicionales o reordenados pueden provocar que la llamada falle o produzca una acción incorrecta. El nombre de la función y los valores del menú también deben coincidir exactamente con la definición de GP Script.

#### 6.3 Validar tipos y rangos de parámetros

Una contenido MQTT es texto. Antes de ejecutar un comando, un programa de producción debe comprobar:

- Si la velocidad y la duración son numéricas;
- Si la velocidad está dentro de `0–50`;
- Si la duración está dentro de un rango seguro;
- Si la dirección es un valor permitido;
- Si la lista de parámetros tiene la longitud correcta.

Por ejemplo, limita cada movimiento a `50–3000` milisegundos para que un mensaje no válido no pueda hacer que el robot se mueva durante un período de tiempo inseguro.

#### 6.4 Las llamadas dinámicas requieren una lista de funciones permitidas

El proyecto de referencia ejecuta directamente `call NAME with LIST`. Esto es adecuado para un experimento de aula controlado, pero no debe exponerse directamente a una red pública. Un programa más seguro permite sólo funciones seleccionadas:

```text
Permitida: CoCube move for msecs
Permitida: CoCube rotate for msecs
Permitida: CoCube wheels stop
Cualquier otra función: rechazar
```

La lista de funciones permitidas también debe definir el recuento, el tipo y el rango de parámetros permitidos para cada función.

#### 6.5 No activar Retain para comandos de movimiento

Si Retain está habilitado para un comando de movimiento, el broker puede entregar el comando anterior nuevamente cuando CoCube se vuelva a conectar o se suscriba nuevamente. Esto podría provocar un movimiento inesperado. Mantenga Retain desactivado para comandos de control.

#### 6.6 Usar temas únicos para cada CoCube

No dejes que todos los grupos de estudiantes compartan el mismo tema de control en un broker público. Un comando podría controlar varios robots. Añade un identificador de dispositivo:

```text
cocube/023/send
cocube/023/receive
```

Después de cambiar los nombres de los temas, actualiza MQTTX y CoCube.

#### 6.7 Añadir una espera al bucle de publicación de estado

El bucle que publica la posición en el proyecto UBP de referencia no incluye una espera y puede enviar mensajes a una frecuencia muy alta. Añade una espera de `100–500` milisegundos después de cada mensaje:

- Reducir la carga de Wi-Fi y de brokers;
- Evitar que la interfaz MQTTX se llene demasiado rápido;
- Evitar que la tarea de envío ocupe demasiado tiempo de ejecución.

#### 6.8 QoS y ejecución duplicada

- QoS `0` es adecuado para esta lección y para datos de estado de alta velocidad, pero es posible que se pierdan mensajes;
- QoS `1` garantiza la entrega al menos una vez, por lo que el mismo comando de control puede llegar más de una vez;
- Si un proyecto de control utiliza QoS `1`, añade un ID de comando único y descarta los duplicados.

Independientemente del nivel de QoS, el control de movimiento del robot debe proporcionar un comando de parada y protección de tiempo de espera.

#### 6.9 Agregar confirmación del resultado de la ejecución

Ver el estado "publicado" en MQTTX no prueba que el robot haya ejecutado correctamente el comando. CoCube puede publicar una respuesta después del procesamiento:

```text
OK,command_id
ERROR,command_id,error_reason
```

Luego, el controlador puede determinar si el comando pasó la validación y realmente se ejecutó.

### 7. Proyecto de referencia

Después de completar los pasos anteriores, descargue el proyecto de referencia para comparar su estructura de conexión, mensajería, división y llamada de función:

<a href="CoCube_MQTT_02.ubp" download="CoCube_MQTT_02.ubp">Descarga el proyecto de referencia <code>CoCube_MQTT_02.ubp</code></a>

El flujo central del proyecto de referencia es:

```text
CoCube recibe cocube_mqtt_receive
  → Leer MESSAGE
  → Dividir por comas y guardar en STORAGE
  → Asignar el elemento 1 a NAME
  → Asignar desde el elemento 2 a LIST
  → call NAME with LIST

CoCube publica cocube_mqtt_send
  → En una CoMap: X,Y,dirección
  → Fuera de la CoMap: 0,0,0
```

> Usa el proyecto de referencia solo para comparar y solucionar problemas después de completar el tutorial. Introduce tu propia información de Wi-Fi antes de ejecutarla y elimine las contraseñas de Wi-Fi reales antes de compartirla. Antes de usar el proyecto con varios usuarios o en una red remota, añade un retraso de publicación, una lista de funciones permitidas, una validación de parámetros y una protección de parada de emergencia.
