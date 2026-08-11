Normalmente, las páginas web se guardan en servidores remotos. En esta actividad, el propio CoCube se convierte en un pequeño servidor HTTP.

Cuando un ordenador o teléfono está conectado a la misma red Wi-Fi que CoCube, puede enviar peticiones desde la barra de direcciones del navegador para mostrar texto, encender un píxel o hacer que CoCube avance, retroceda y gire.

Este tutorial se basa en la actividad de MicroBlocks Learn [Controlling the Robot with WiFi](https://learn.microblocks.fun/en/activities/citilab-course-17-en/) y se ha adaptado para CoCube.

### 1. Preparación

Necesitará:

- Un CoCube
- Un ordenador o teléfono
- Una red Wi-Fi de 2,4 GHz
- MicroBlocks
- El navegador Chrome o Edge

El ordenador o teléfono debe estar conectado a **la misma red Wi-Fi** que CoCube.

En MicroBlocks, haga clic en **Añadir biblioteca**, abra **Red** y seleccione **Servidor HTTP**.

<p align="center"><img src="add_library.png" alt="Añadir la biblioteca de bloques Servidor HTTP" width="460"></p>

La biblioteca **Servidor HTTP** depende de la biblioteca WiFi. Después de añadirla, puede utilizar bloques para conectarse a Wi-Fi, leer la dirección IP, recibir peticiones HTTP y enviar respuestas.

### 2. Conectar CoCube a la red Wi-Fi

Construya el siguiente programa. Sustituya **Nombre de red** y **Contraseña** por los datos de su red Wi-Fi.

<p align="center"><img src="scriptImage01_connect.png" alt="Conectar a Wi-Fi y mostrar la dirección IP" width="680"></p>

Cuando se inicia el programa, CoCube se conecta a Wi-Fi y muestra su dirección IP en la pantalla TFT, por ejemplo:

```text
172.20.10.2
```

La dirección IP es como la dirección de CoCube dentro de la red local. El navegador utilizará esta dirección para encontrarlo.

Su CoCube puede recibir una dirección diferente. Utilice siempre la dirección que aparece en su pantalla TFT.

> El nombre y la contraseña de la red Wi-Fi quedan guardados en el programa. Elimine la contraseña antes de compartir el programa o sus capturas de pantalla.

### 3. Enviar una petición del navegador a CoCube

En una comunicación HTTP, el navegador es el **cliente** y CoCube es el **servidor**:

- El navegador envía una petición HTTP a CoCube.
- CoCube devuelve una respuesta HTTP al navegador.

Construya el siguiente programa:

<p align="center"><img src="scriptImage02_request.png" alt="Recibir y responder a una petición HTTP" width="720"></p>

El programa lee repetidamente la **petición HTTP al servidor**:

- Si nadie accede a CoCube, devuelve un valor vacío.
- Cuando un navegador accede a CoCube, devuelve una petición.
- Después de recibir una petición, el programa responde con el estado `200 OK` y el texto `Hello, This is CoCube.`.

Introduzca lo siguiente en la barra de direcciones del navegador del ordenador o teléfono:

```text
Dirección_IP_de_CoCube/test
```

Por ejemplo:

```text
172.20.10.2/test
```

El navegador muestra el texto que devuelve CoCube:

<p align="center"><img src="response.png" alt="El navegador recibe una respuesta de CoCube" width="360"></p>

El navegador puede marcar la página local `http://` como "No segura". Este experimento no solicita una cuenta, contraseña ni información personal, por lo que puede continuar.

### 4. Comprender las rutas de petición

La dirección anterior tiene dos partes:

| Parte | Ejemplo |
| --- | --- |
| Dirección de CoCube | `http://172.20.10.2` |
| Ruta de petición | `/test` |

La ruta es la parte que aparece después de la dirección IP y comienza por `/`. Utilice el bloque **ruta de la petición** para leerla.

<p align="center"><img src="scriptImage03_path.png" alt="Leer la ruta de una petición HTTP" width="680"></p>

Cada dirección produce una ruta diferente:

| Dirección del navegador | Ruta de petición |
| --- | --- |
| `172.20.10.2/test` | `/test` |
| `172.20.10.2/on` | `/on` |
| `172.20.10.2/forward` | `/forward` |

El contenido del bloque **petición HTTP al servidor** se elimina después de leerlo. Por eso, el programa lo guarda primero en la variable `request` y después lee la ruta desde esa variable.

### 5. Encender y apagar un píxel con una URL

Ahora haremos que distintas rutas ejecuten tareas diferentes:

<p align="center"><img src="scriptImage04_pixel_control.png" alt="Controlar un píxel mediante rutas HTTP" width="720"></p>

Cuando el programa recibe una petición:

- Ruta `/on`: enciende el píxel de la posición `(3,3)` y responde con `ON`.
- Ruta `/off`: apaga el píxel de la posición `(3,3)` y responde con `OFF`.

Abra estas direcciones en el navegador:

```text
Dirección_IP_de_CoCube/on
Dirección_IP_de_CoCube/off
```

Al abrir `/on`, el navegador muestra `ON` y se enciende el píxel de CoCube.

<p align="center"><img src="pixel_on.png" alt="Abrir la ruta on" width="360"></p>

Lo importante no es el texto `ON` de la página. El navegador ha enviado una orden a CoCube mediante la ruta de la petición.

### 6. Controlar CoCube desde el navegador

Sustituya las órdenes del píxel por acciones del robot para convertir la barra de direcciones del navegador en un mando sencillo.

<p align="center"><img src="scriptImage05_robot_control.png" alt="Controlar CoCube mediante rutas HTTP" width="720"></p>

El programa utiliza cuatro rutas:

| Ruta de petición | Acción de CoCube |
| --- | --- |
| `/forward` | Avanzar |
| `/backward` | Retroceder |
| `/left` | Girar a la izquierda |
| `/right` | Girar a la derecha |

Abra estas direcciones una por una:

```text
Dirección_IP_de_CoCube/forward
Dirección_IP_de_CoCube/backward
Dirección_IP_de_CoCube/left
Dirección_IP_de_CoCube/right
```

Por ejemplo, al abrir:

```text
172.20.10.2/forward
```

CoCube avanza.

Después de comprobar la ruta, el programa devuelve al navegador la ruta recibida:

| Ruta de petición | Acción de CoCube | Texto del navegador |
| --- | --- | --- |
| `/forward` | Avanzar | `/forward` |
| `/backward` | Retroceder | `/backward` |
| `/left` | Girar a la izquierda | `/left` |
| `/right` | Girar a la derecha | `/right` |

El bloque de respuesta se encuentra después de las comprobaciones de ruta. Cada vez que llega una petición, el navegador recibe rápidamente una respuesta, aunque la ruta no corresponda a ninguna acción.

### 7. Solución de problemas

#### El navegador no puede abrir la dirección de CoCube

- Confirme que CoCube se ha conectado a Wi-Fi y muestra una dirección IP.
- Confirme que el ordenador o teléfono está conectado a la misma red Wi-Fi que CoCube.
- Escriba `http://` de forma explícita, no `https://`.
- Compruebe que la dirección IP coincide con la que aparece en la pantalla TFT.
- Algunas redes escolares, de hoteles y públicas aíslan los dispositivos. Pruebe con un punto de acceso del teléfono.

#### El navegador continúa cargando

- Compruebe si el programa ha recibido una petición HTTP.
- Asegúrese de que el bloque **responde a petición HTTP** aparece después de las comprobaciones de ruta.
- Asegúrese de que el bloque de respuesta sigue dentro de la condición que comprueba que `request` no está vacío.

#### El robot no se mueve

- La ruta debe comenzar por `/`.
- Las rutas distinguen entre mayúsculas y minúsculas: `/forward` y `/Forward` son diferentes.
- Compruebe que los bloques de movimiento de CoCube funcionan por separado.

### 8. Ampliación: un mando a distancia web

Cambiar la dirección del navegador para cada orden no es cómodo. CoCube también puede proporcionar una página de control con botones.

[Abrir el programa completo del mando web en MicroBlocks][programa-mando-web]

Introduzca el nombre y la contraseña de la red Wi-Fi en el programa completo y ejecútelo. Abra en un teléfono u ordenador la dirección IP que aparece en la pantalla de CoCube. Mantenga pulsado un botón de dirección para mover el robot y suéltelo para detenerlo. La página también actualiza automáticamente la posición y la dirección de CoCube.

Este programa incluye HTML, CSS y JavaScript y es más complejo que los ejemplos anteriores. No es necesario entenderlo por completo todavía. Su funcionamiento principal sigue utilizando las peticiones HTTP de esta lección:

| Ruta de petición | Acción |
| --- | --- |
| `/forward` | Avanzar |
| `/backward` | Retroceder |
| `/left` | Girar a la izquierda |
| `/right` | Girar a la derecha |
| `/stop` | Detener las ruedas |
| `/position` | Leer la posición y la dirección |

La página web sustituye las direcciones escritas a mano por botones. Al pulsar un botón, envía una petición de movimiento; al soltarlo, envía `/stop`. Esta es la idea básica para controlar un robot desde una página web.

[programa-mando-web]: https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27HTTP%20server%27%20%27TFT%27%20%27WiFi%27%0A%0Aspec%20%27r%27%20%27control%20page%27%20%27control%20page%27%0Ato%20%27control%20page%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27page%20style%27%29%20%27%3Ch2%3ECoCube%20Control%3C%2Fh2%3E%0A%3Cp%3E%0A%20%20X%3A%20%3Cspan%20id%3D%22x%22%3E%27%20%28%27CoCube%20position_X%27%29%20%27%3C%2Fspan%3E%0A%20%20Y%3A%20%3Cspan%20id%3D%22y%22%3E%27%20%28%27CoCube%20position_Y%27%29%20%27%3C%2Fspan%3E%0A%20%20Angle%3A%20%3Cspan%20id%3D%22angle%22%3E%27%20%28%27CoCube%20direction%27%29%20%27%3C%2Fspan%3E%0A%3C%2Fp%3E%27%20%28%27page%20buttons%27%29%20%28%27page%20script%27%29%20%28%27position%20script%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27page%20buttons%27%20%27page%20buttons%27%0Ato%20%27page%20buttons%27%20%7B%0A%20%20return%20%27%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22forward%22%3EForward%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22left%22%3ELeft%3C%2Fbutton%3E%0A%20%20%3Cbutton%20data-command%3D%22right%22%3ERight%3C%2Fbutton%3E%0A%3C%2Fp%3E%0A%3Cp%3E%0A%20%20%3Cbutton%20data-command%3D%22backward%22%3EBackward%3C%2Fbutton%3E%0A%3C%2Fp%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20script%27%20%27page%20script%27%0Ato%20%27page%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20send%28command%29%20%7B%0A%20%20%20%20fetch%28%22%2F%22%20%2B%20command%2C%20%7Bcache%3A%20%22no-store%22%7D%29%3B%0A%20%20%7D%0A%0A%20%20function%20stop%28%29%20%7B%0A%20%20%20%20send%28%22stop%22%29%3B%0A%20%20%7D%0A%0A%20%20for%20%28const%20button%20of%20document.querySelectorAll%28%22button%22%29%29%20%7B%0A%20%20%20%20button.onpointerdown%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%20%20%20%20button.setPointerCapture%28event.pointerId%29%3B%0A%20%20%20%20%20%20send%28button.dataset.command%29%3B%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20button.onpointerup%20%3D%20stop%3B%0A%20%20%20%20button.onpointercancel%20%3D%20stop%3B%0A%20%20%7D%0A%0A%20%20window.onblur%20%3D%20stop%3B%0A%20%20document.oncontextmenu%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%20%20document.onselectstart%20%3D%20function%20%28event%29%20%7B%0A%20%20%20%20event.preventDefault%28%29%3B%0A%20%20%7D%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27page%20style%27%20%27page%20style%27%0Ato%20%27page%20style%27%20%7B%0A%20%20return%20%27%3C%21doctype%20html%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%22%3E%0A%3Cstyle%3E%0A%20%20body%20%7B%0A%20%20%20%20text-align%3A%20center%3B%0A%20%20%20%20font%3A%2022px%20Arial%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%0A%20%20button%20%7B%0A%20%20%20%20width%3A%2090px%3B%0A%20%20%20%20height%3A%2060px%3B%0A%20%20%20%20margin%3A%206px%3B%0A%20%20%20%20font-size%3A%2018px%3B%0A%20%20%20%20touch-action%3A%20none%3B%0A%20%20%20%20user-select%3A%20none%3B%0A%20%20%20%20-webkit-user-select%3A%20none%3B%0A%20%20%20%20-webkit-touch-callout%3A%20none%3B%0A%20%20%7D%0A%3C%2Fstyle%3E%27%0A%7D%0A%0Aspec%20%27r%27%20%27position%20data%27%20%27position%20data%27%0Ato%20%27position%20data%27%20%7B%0A%20%20return%20%28%27%5Bdata%3Ajoin%5D%27%20%28%27CoCube%20position_X%27%29%20%27%2C%27%20%28%27CoCube%20position_Y%27%29%20%27%2C%27%20%28%27CoCube%20direction%27%29%29%0A%7D%0A%0Aspec%20%27r%27%20%27position%20script%27%20%27position%20script%27%0Ato%20%27position%20script%27%20%7B%0A%20%20return%20%27%3Cscript%3E%0A%20%20function%20updatePosition%28%29%20%7B%0A%20%20%20%20fetch%28%22%2Fposition%22%2C%20%7Bcache%3A%20%22no-store%22%7D%29%0A%20%20%20%20%20%20.then%28function%20%28response%29%20%7B%0A%20%20%20%20%20%20%20%20return%20response.text%28%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.then%28function%20%28text%29%20%7B%0A%20%20%20%20%20%20%20%20const%20position%20%3D%20text.split%28%22%2C%22%29%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22x%22%29.textContent%20%3D%20position%5B0%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22y%22%29.textContent%20%3D%20position%5B1%5D%3B%0A%20%20%20%20%20%20%20%20document.getElementById%28%22angle%22%29.textContent%20%3D%20position%5B2%5D%3B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20300%29%3B%0A%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20.catch%28function%20%28%29%20%7B%0A%20%20%20%20%20%20%20%20setTimeout%28updatePosition%2C%20500%29%3B%0A%20%20%20%20%20%20%7D%29%3B%0A%20%20%7D%0A%0A%20%20updatePosition%28%29%3B%0A%3C%2Fscript%3E%27%0A%7D%0A%0Aspec%20%27%20%27%20%27run%20path%27%20%27run%20path%20_%27%20%27auto%27%20%27%2Fforward%27%0Ato%20%27run%20path%27%20path%20%7B%0A%20%20if%20%28path%20%3D%3D%20%27%2Fforward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bforward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fbackward%27%29%20%7B%0A%20%20%20%20%27CoCube%20move%27%20%27cocube%3Bbackward%27%2040%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fleft%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bleft%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fright%27%29%20%7B%0A%20%20%20%20%27CoCube%20rotate%27%20%27cocube%3Bright%27%2030%0A%20%20%7D%20%28path%20%3D%3D%20%27%2Fstop%27%29%20%7B%0A%20%20%20%20%27CoCube%20wheels%20stop%27%0A%20%20%7D%0A%7D%0A%0Ascript%20341%20-24%20%7B%0AwhenStarted%0AwifiConnect%20%27Nombre_de_red%27%20%27%27%0A%27%5Btft%3Aclear%5D%27%0A%27%5Btft%3Atext%5D%27%20%27Open%20this%20address%3A%27%205%205%20%28colorSwatch%20255%20255%20255%20255%29%202%20false%0A%27%5Btft%3Atext%5D%27%20%28getIPAddress%29%205%2035%20%28colorSwatch%2080%20210%20230%20255%29%202%20false%0Aforever%20%7B%0A%20%20local%20%27request%27%20%28%27%5Bnet%3AhttpServerGetRequest%5D%27%29%0A%20%20if%20%28request%20%21%3D%20%27%27%29%20%7B%0A%20%20%20%20local%20%27path%27%20%28%27path%20of%20request%27%20request%29%0A%20%20%20%20if%20%28path%20%3D%3D%20%27%2Ffavicon.ico%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2Fposition%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27position%20data%27%29%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20%28path%20%3D%3D%20%27%2F%27%29%20%7B%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%28%27control%20page%27%29%20%27Content-Type%3A%20text%2Fhtml%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%27run%20path%27%20path%0A%20%20%20%20%20%20%27%5Bnet%3ArespondToHttpRequest%5D%27%20%27200%20OK%27%20%27OK%27%20%27Content-Type%3A%20text%2Fplain%3B%20charset%3Dutf-8%27%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20waitMillis%2020%0A%7D%0A%7D%0A%0A
