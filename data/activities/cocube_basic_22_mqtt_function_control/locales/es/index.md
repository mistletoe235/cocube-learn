En la sección anterior, ya hicimos que CoCube y MQTTX se enviaran mensajes entre sí. Esta vez, en lugar de simplemente mostrar el mensaje en pantalla, hacemos que CoCube realice acciones basadas en el mensaje que recibe.

Este tutorial contiene dos experimentos:

1. Envíe `forward`, `backward`, `left`, `right` para controlar el movimiento de CoCube.
2. Envíe el nombre de la función y los parámetros para llamar a los bloques existentes en CoCube.

Si todavía no ha completado el experimento de conexión MQTT, lea primero [Introducción a CoCube MQTT](../cocube_basic_21_mqtt_communication-es/). Para conocer en detalle cómo funcionan las llamadas a funciones, consulte [Llamadas avanzadas a programas](../cocube_basic_17_advanced_program_calls-es/).

### 1. Conecte MQTT

En este caso se sigue utilizando el programa de conexión del apartado anterior. Complete el nombre y la contraseña de Wi-Fi y presione los botones A y B de CoCube al mismo tiempo.

<p align="center"><img src="code_connect.png" alt="Conectar a Wi-Fi y al servidor MQTT" width="680"></p>

Cuando CoCube muestra una cara sonriente, significa que está conectado al servidor MQTT.

El programa también utiliza estas bibliotecas de bloques:

- `MQTT`
- `CoCube`
- `Llamadas a Funciones`

La biblioteca de bloques **Llamadas a Funciones** se encuentra en **Añadir biblioteca** → **Otros** → **Llamadas a Funciones**.

### 2. Controla CoCube con mensajes simples

Empecemos por el método más sencillo: hacer que cada mensaje corresponda a una acción.

<p align="center"><img src="code_simple_control.png" alt="Controlar CoCube con mensajes MQTT" width="780"></p>

Después de presionar la tecla A, CoCube se suscribirá a:

```text
cocube/control
```

Al recibir un mensaje, el programa lee el **contenido del evento MQTT** y luego usa **si / si no, si** para determinar la acción que debe realizar:

| Mensajes recibidos | Acciones de CoCube |
| --- | --- |
| `forward` | Avanzar |
| `backward` | Retroceder |
| `left` | Girar a la izquierda |
| `right` | Girar a la derecha |

En MQTTX, establezca el tema en `cocube/control`, envíe estos cuatro mensajes en secuencia y observe las acciones de CoCube.

Este método de escritura es simple e intuitivo, pero cada comando nuevo requiere otra condición. Si desea llamar a más bloques de forma remota, el programa será cada vez más largo.

### 3. Describir una llamada a función en un mensaje

Podemos poner las funciones y parámetros a ejecutar en el mensaje MQTT en el formato:

```text
call,nombre_de_función,parámetro1,parámetro2...
```

Por ejemplo, el siguiente mensaje significa: Mueva el CoCube hacia adelante a una velocidad de `40` durante `1000` milisegundos.

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

Separe cada parte del mensaje con comas:

| Contenido | Significado |
| --- | --- |
| `call` | Indica que este es un mensaje de llamada a función |
| `CoCube move for msecs` | Nombre de la función |
| `cocube;forward` | Parámetros de dirección |
| `40` | Parámetro de velocidad |
| `1000` | Parámetro de tiempo en milisegundos |

### 4. Analizar y llamar a una función

Sustituye el programa de comandos fijos en la sección anterior con el siguiente programa general:

<p align="center"><img src="code_function_call.png" alt="Analizar un mensaje MQTT y llamar a una función" width="780"></p>

Una vez que el programa reciba el mensaje MQTT, se procesará en el siguiente orden:

1. Lea la carga útil del mensaje y guárdela en `msg`.
2. Compruebe si los primeros cuatro caracteres del mensaje son `call`.
3. Separe el mensaje con comas.
4. Tome el segundo elemento como nombre de función `cmd_name`.
5. Usa el tercer elemento y los siguientes como lista de parámetros `cmd_args`.
6. Usa el bloque **llama** para ejecutar la función.

De esta forma, no es necesario crear condiciones separadas para cada acción. Siempre que el mensaje contenga el nombre de la función y los parámetros correctos, el mismo programa puede realizar diferentes tareas.

> `Code_2.png` y `Code_3.png` son dos etapas diferentes de procedimientos de recepción. Después de completar la Sección 2, reemplácelo con el programa de la Sección 4. No ejecute ambas versiones al mismo tiempo.

### 5. Prueba en MQTTX

Mantenga el tema en MQTTX como:

```text
cocube/control
```

Desactiva **Retain**, luego envíe:

```text
call,CoCube move for msecs,cocube;forward,40,1000
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
```

<p align="center"><img src="mqttx_function_messages.png" alt="Enviar llamadas a funciones mediante MQTTX" width="680"></p>

Estos cuatro mensajes harán que CoCube se mueva hacia adelante, hacia atrás, gire hacia la izquierda y hacia la derecha, respectivamente.

### 6. Cómo encontrar el nombre de función de un bloque

El nombre de la función en el mensaje debe ser exactamente el mismo que el nombre de la función real del bloque.

Haga clic con el botón derecho en el bloque en MicroBlocks, seleccione **Copiar al portapapeles** y luego pegue el contenido en un comentario para ver el GP Script correspondiente.

<p align="center"><img src="code_show_function.png" alt="Consultar el nombre y los parámetros de una función" width="680"></p>

Los bloques de la imagen obtendrán:

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

por lo tanto:

- El nombre de la función es `CoCube move for msecs`.
- Los parámetros son `cocube;forward`, `40` y `1000`.

Al combinarlos con el formato `call,nombre_de_función,lista_de_parámetros`, se obtiene un comando completo que puede enviarse mediante MQTT.

### 7. Probar más funciones

Seleccione un bloque CoCube que desee ejecutar de forma remota, vea el nombre de su función y sus parámetros, y redacte un nuevo mensaje `call` en MQTTX.

También puedes asignar temas diferentes a cada robot, por ejemplo:

```text
cocube/eow/control
cocube/eop/control
```

De esta manera, se pueden controlar varios CoCubes por separado desde la misma interfaz MQTTX.

Este tutorial utiliza un broker MQTT público. Elige temas que no entren en conflicto con otros usuarios, no envíes información personal y no dejes robots conectados a temas públicos funcionando sin supervisión.
