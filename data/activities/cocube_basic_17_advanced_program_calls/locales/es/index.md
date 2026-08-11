### Llamadas avanzadas de programa en MicroBlocks: controlar CoCube con mensajes de difusión

En MicroBlocks, una difusión no es solo "enviar un mensaje". Puede despertar scripts, transmitir comandos, llamar bloques personalizados e incluso funcionar como una llamada remota a una función, permitiendo que una página web o un programa anfitrión en Python controle tareas de CoCube.

Este tutorial empieza con el mecanismo básico de difusión y avanza poco a poco hacia:

- Enviar mensajes de difusión a CoCube por BLE desde una página web.
- Leer el contenido de una difusión con **último mensaje**.
- Llamar bloques personalizados sin parámetros mediante difusiones.
- Llamar bloques personalizados con parámetros usando el formato `call,nombre de función,lista de parámetros`.
- Encontrar el nombre de función y la lista de parámetros de bloques existentes, y llamarlos mediante difusiones.
- Extender el mismo mecanismo de mensajes a programas anfitriones en Python, y más adelante a MQTT, UDP y otros métodos de comunicación.

#### 1. Mecanismo de difusión: controlar CoCube desde una página web

Primero abre el control remoto web:

[https://microblocks.fun/rfp/remote.html](https://microblocks.fun/rfp/remote.html)

Esta página web puede conectarse por BLE a un CoCube que ejecuta MicroBlocks y enviar mensajes de difusión. Después de conectarse, escribe un mensaje en una caja de texto y haz clic en **Send**. El script correspondiente de **cuando recibo** en CoCube se activará.

![Control remoto web](2_website_page.png)

La forma más simple es hacer que diferentes mensajes de difusión correspondan a diferentes tareas.

![Control básico por difusión](1_boardcast_es.png)

Por ejemplo:

| Mensaje recibido | Tarea |
| --- | --- |
| `forward` | Avanzar |
| `backward` | Retroceder |
| `left` | Girar a la izquierda |
| `right` | Girar a la derecha |
| `smile` | Mostrar una sonrisa y reproducir tonos |

Esta forma es adecuada para empezar a entender las difusiones. La página web no envía datos complejos; envía nombres de tareas. El programa de CoCube prepara de antemano los scripts de esas tareas. Cuando llega una difusión, se ejecuta la tarea correspondiente.

Prueba a enviar estos mensajes desde la página web:

- `forward`
- `backward`
- `left`
- `right`
- `smile`

Observa si CoCube realiza las acciones correspondientes.

Hay que prestar atención a un detalle: el texto del mensaje de difusión debe coincidir con el texto del bloque **cuando recibo**. Si la página web envía `forward`, el programa debe tener un script **cuando recibo forward**.

#### 2. Último mensaje: leer el contenido de la difusión

En la sección anterior, cada mensaje tenía su propio script de **cuando recibo**. Si hay muchos mensajes, el programa puede quedar demasiado disperso.

MicroBlocks tiene un bloque muy importante llamado **último mensaje**. Este bloque lee el contenido de la difusión recibida más recientemente.

Podemos escribir un solo script receptor: primero leer **último mensaje**, y luego poner el mensaje dentro de condiciones `if / else if` para decidir qué tarea debe ejecutar el robot.

![Último mensaje controla tareas](2_last_message_new_es.png)

El programa significa:

1. Al recibir cualquier difusión, guarde **último mensaje** en la variable `msg`.
2. Limpie la pantalla TFT y muestre `msg`.
3. Si `msg = forward`, avance.
4. Si no, si `msg = backward`, retroceda.
5. Si no, si `msg = left`, gire a la izquierda.
6. Si no, si `msg = right`, gire a la derecha.
7. Si no, si `msg = smile`, muestre una sonrisa y reproduzca tonos.

Ahora envía desde la página web:

- `forward`
- `backward`
- `left`
- `right`
- `smile`

CoCube primero mostrará el mensaje recibido en la pantalla y luego ejecutará la acción correspondiente según el contenido de `msg`.

La idea principal de esta sección es:

El propio mensaje de difusión puede ser leído y utilizado por el programa.

Con **último mensaje**, el programa no necesita un script separado de **cuando recibo xxx** para cada mensaje. Todos los mensajes pueden entrar por el mismo receptor, y luego una estructura `if` los distribuye a diferentes tareas:

| Condición | Tarea |
| --- | --- |
| `msg = forward` | Avanzar |
| `msg = backward` | Retroceder |
| `msg = left` | Girar a la izquierda |
| `msg = right` | Girar a la derecha |

Así la estructura del programa queda más clara.

#### 3. Llamar una función personalizada sin parámetros mediante una difusión

En MicroBlocks podemos definir nuestros propios bloques. Por ejemplo, definimos `myBlock`:

El proceso de `myBlock` es:

1. Mostrar un corazón.
2. Esperar `500` milisegundos.
3. Mostrar un corazón pequeño.

![Bloque personalizado sin parámetros](3_myBlock_es.png =680x*)

Normalmente, para llamar este bloque personalizado, basta con arrastrar el bloque `myBlock` y ejecutarlo.

Otra posibilidad es añadir la biblioteca de llamada de funciones (Añadir biblioteca - Otros - Llamar función) y llamar la función por su nombre.

Lo que quizá no sea tan evidente es que un mensaje de difusión directo también puede funcionar como una llamada a una función con el mismo nombre.

![Difusión llama una función sin parámetros](4_call_function_es.png =680x*)

En este momento, el botón `myBlock` del control remoto web funciona como un botón remoto. La página web envía `myBlock`, CoCube lo recibe y ejecuta la tarea con el mismo nombre.

Este método es adecuado para tareas sin parámetros, por ejemplo:

- `smile`
- `blink`
- `beep`
- `dance`
- `reset`

Usar mensajes de difusión para "llamar funciones" es muy directo y ligero.

#### 4. Llamar una función personalizada con parámetros mediante una difusión

Si una función necesita parámetros, no basta con difundir `myBlock`.

Por ejemplo, supongamos que definimos un bloque personalizado con un parámetro:

```text
myBlock2 time
```

Este bloque puede usar el parámetro `time` para decidir cuánto tiempo esperar.

Para llamarlo mediante una difusión, podemos acordar un formato de mensaje:

```text
call,nombre de función,parámetro
```

Por ejemplo:

```text
call,myBlock2,100
```

Este mensaje significa:

Esto significa: llamar a `myBlock2` con el parámetro `100`.

Después de recibir la difusión, el programa debe analizar primero `último mensaje`:

![Analizar mensaje call](5_call_function_with_args_es.png =680x*)

La idea de análisis es:

1. Recibir cualquier difusión y guardar **último mensaje** en `msg`.
2. Comprobar si los primeros cuatro caracteres de `msg` son `call`.
3. Dividir `msg` por las comas.
4. Usar el elemento 2 como nombre de la función.
5. Usar el elemento 3 y los siguientes como lista de parámetros.
6. Llamar a la función con esa lista de parámetros.

Para `call,myBlock2,100`:

- Elemento 1: `call`
- Elemento 2: `myBlock2`
- Elemento 3: `100`

Entonces el programa ejecutará:

El programa llama entonces a `myBlock2` con el parámetro `100`.

La ventaja de este formato es que la página web solo necesita enviar diferentes cadenas de texto para llamar diferentes funciones y pasar diferentes parámetros.

Prueba:

```text
call,myBlock2,100
call,myBlock2,500
call,myBlock2,1000
```

Observa si cambia el tiempo de espera.

Si una función tiene varios parámetros, se pueden seguir colocando después del nombre de la función:

```text
call,nombre de función,parámetro1,parámetro2,parámetro3
```

Por ejemplo:

```text
call,setColor,255,0,0
call,moveTo,100,80,40
call,playTone,c,1,200
```

Esto ya se parece mucho a un pequeño sistema de comandos.

#### 5. Llamar funciones existentes

No solo los bloques personalizados se pueden llamar de esta forma. Muchos bloques existentes de MicroBlocks también pueden llamarse por nombre de función.

La pregunta clave es: ¿cómo sabemos el nombre real de la función y la lista de parámetros de un bloque?

En MicroBlocks, haz clic derecho sobre un bloque y elige **copiar al portapapeles**.

Luego pégalo en un bloque de comentario o en otro lugar para ver el GP Script correspondiente.

![Encontrar el nombre de función](6_function_name_es.png)

Por ejemplo, al copiar el bloque de CoCube "avanzar durante 1000 milisegundos", se puede ver algo parecido a:

```text
'CoCube move for msecs' 'cocube;forward' 40 1000
```

Esto indica que el nombre real de la función es:

```text
CoCube move for msecs
```

Los parámetros son:

```text
cocube;forward
40
1000
```

Por eso podemos enviar esta difusión:

```text
call,CoCube move for msecs,cocube;forward,40,1000
```

Otro ejemplo: el bloque que muestra una imagen de sonrisa puede revelar un nombre de función como:

```text
led_displayImage
```

Si el parámetro es `happy`, podemos enviar:

```text
call,led_displayImage,happy
```

También puedes preparar estos comandos en el control remoto web y probar a enviarlos:

```text
call,myBlock2,100
call,led_displayImage,happy
```

##### Sugerencias para revisar nombres de funciones

1. Primero construye la acción que quieres usando bloques normales.
2. Haz clic derecho sobre el bloque y copia o inspecciona el script.
3. Encuentra el nombre real de la función.
4. Registra el orden de los parámetros.
5. Prueba la llamada con el formato `call,nombre de función,lista de parámetros`.

Para CoCube, esto es especialmente útil para control remoto, por ejemplo:

```text
call,CoCube move for msecs,cocube;forward,40,1000
call,CoCube move for msecs,cocube;backward,40,1000
call,CoCube rotate for msecs,cocube;left,30,1000
call,CoCube rotate for msecs,cocube;right,30,1000
call,CoCube wheels stop
```

Si una llamada falla, revisa primero tres cosas:

- ¿El nombre de la función es exactamente correcto?
- ¿La cantidad de parámetros es correcta?
- ¿El orden de los parámetros es correcto?

#### 6. No solo páginas web: un programa anfitrión en Python también puede enviar mensajes

Los ejemplos anteriores usan una página web para enviar mensajes de difusión porque es directa y fácil de demostrar.

Pero este mecanismo no está limitado a la página web. Siempre que algo pueda enviar las mismas cadenas de difusión a MicroBlocks, puede controlar CoCube.

Por ejemplo, podemos usar un programa anfitrión en Python:

[Página del proyecto MicroBlocks Messaging Library](https://github.com/wwj718/microblocks_messaging_library)

Esta biblioteca permite que programas en Python se comuniquen mediante mensajes con dispositivos que ejecutan MicroBlocks. En otras palabras, todo lo que se envía al hacer clic en **Send** en la página web también puede enviarse desde Python.

Los comandos de la página web pueden trasladarse a Python:

- `forward`
- `backward`
- `left`
- `right`
- `smile`
- `myBlock`
- `call,myBlock2,100`
- `call,CoCube move for msecs,cocube;forward,40,1000`
- `call,CoCube wheels stop`

Así se pueden crear sistemas de control más avanzados, por ejemplo:

- Controlar CoCube con las flechas del teclado.
- Hacer que Python envíe automáticamente una secuencia de comandos de acción.
- Usar una cámara para reconocer resultados y luego enviar comandos de control.
- Coordinar varios robots CoCube.
- Enviar comandos `call,nombre de función,lista de parámetros` desde una interfaz de computadora.

La página web es adecuada para demostraciones en clase, mientras que Python es mejor para proyectos completos. La idea central en ambos casos es la misma:

1. Escribir las tareas como mensajes de difusión.
2. Hacer que el programa de MicroBlocks analice los mensajes.
3. Llamar a las funciones correspondientes.

#### 7. No solo BLE: la misma idea también sirve para otros sistemas de mensajes

En este tutorial usamos principalmente mensajes de difusión por BLE para llamar tareas. El control remoto web y el programa anfitrión en Python envían cadenas como estas:

- `forward`
- `smile`
- `call,myBlock2,100`
- `call,CoCube move for msecs,cocube;forward,40,1000`

Pero lo más importante no es BLE en sí. Lo importante es la idea de diseño de "mensajes que activan tareas":

1. Un sistema externo envía un mensaje.
2. El programa de MicroBlocks recibe el mensaje.
3. Lee el contenido del mensaje.
4. Analiza la orden y los parámetros.
5. Llama a la tarea o función correspondiente.

Por eso, aunque en el futuro el mensaje no venga de BLE, podemos usar una estructura parecida. Por ejemplo:

- Mensajes MQTT: una computadora, página web o servidor publica un mensaje de control, y CoCube ejecuta la tarea después de recibirlo.
- Mensajes UDP: dispositivos de la red local envían mensajes cortos directamente, y el robot los analiza y ejecuta.
- Control web por WiFi: los botones de una página web envían comandos, y el programa de MicroBlocks llama funciones según esos comandos.
- Mensajes ESP-NOW: varios robots se envían comandos entre sí para control cooperativo.

En otras palabras, BLE es solo la entrada de comunicación usada en esta lección. Lo que realmente se puede reutilizar es:

- Describir tareas con cadenas de texto.
- Leer tareas con **último mensaje**.
- Distribuir tareas con el mecanismo `call`.
- Ampliar tareas con nombres de función y listas de parámetros.

Las implementaciones concretas de MQTT, UDP y otros métodos se presentarán en tutoriales posteriores.
