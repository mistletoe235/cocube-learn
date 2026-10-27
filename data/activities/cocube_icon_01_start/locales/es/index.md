<h2 class="tutorial-title">Primeros pasos con CoCube ICON</h2>

CoCube ICON representa las acciones con bloques de imágenes. Los niños pueden unirlos en orden para que el robot avance, gire, toque notas y muestre dibujos.

<p class="tutorial-actions"><a class="c_button button tutorial-launch" href="https://icon.cocube.fun/" target="_blank" rel="noopener"><span>Abrir programación con ICON</span></a></p>

### 1. Conectar CoCube

#### En un ordenador

Usa Chrome o Edge en un ordenador compatible con Bluetooth.

1. Enciende CoCube y activa el Bluetooth del ordenador.
2. Abre ICON, pulsa el botón azul de conexión de arriba a la derecha y elige Bluetooth.
3. Selecciona tu CoCube en la lista del navegador y pulsa emparejar o conectar.
4. Espera a que la página indique que está conectado antes de probar los bloques.

También puedes conectar un cable USB de datos y elegir USB en el menú de conexión. Si no aparece el robot, comprueba la alimentación, el Bluetooth o el cable y vuelve a buscar.

#### En un móvil o una tableta

Instala la app CoCube. Al abrirla, aparece MicroBlocks. Usa el botón de modo de programación de la barra de herramientas para cambiar a ICON y conecta el robot con el botón superior derecho. iOS usa Bluetooth; Android permite Bluetooth o USB.

<div class="tutorial-apps"><div><h4>App Android</h4><a href="https://wiki.cocube.fun/app/apk"><img src="cocube-android.png" alt="Código QR de descarga de CoCube para Android" width="180"></a><p><a href="https://wiki.cocube.fun/app/apk">Descargar la app Android</a></p></div><div><h4>App iOS</h4><a href="https://apps.apple.com/app/id6752908157"><img src="cocube-ios.png" alt="Código QR de descarga de CoCube para iOS" width="180"></a><p><a href="https://apps.apple.com/app/id6752908157">Abrir el App Store</a></p></div></div>

### 2. Conocer la interfaz

<img class="tutorial-image" src="icon-interface.png" alt="Interfaz de ICON: menú del proyecto, conexión, lienzo, botón verde de ejecución y paleta de bloques">

- **Home, arriba a la izquierda**: abre el menú para crear, abrir, guardar, deshacer o cambiar el idioma.
- **Botón de conexión, arriba a la derecha**: conecta CoCube y muestra el estado de conexión.
- **Lienzo central**: une los bloques de izquierda a derecha.
- **Botón verde de ejecución**: ejecuta los programas que empiezan con un bloque Inicio.
- **Paleta inferior**: desliza hacia los lados para ver más bloques y arrástralos al lienzo.
- **Botones de zoom, abajo a la izquierda**: ajustan el tamaño de los bloques del lienzo y de la paleta a la vez.

### 3. Primer programa: avanzar una casilla

Antes de usar bloques de movimiento, coloca CoCube en el centro de una casilla del tapete de posicionamiento, con una casilla libre delante.

1. Busca el bloque amarillo Inicio en el lienzo.
2. Arrastra desde la paleta el bloque Avanzar, con la flecha hacia arriba, y únelo a la derecha de Inicio.
3. Pulsa el campo numérico debajo de Avanzar y elige **1**.
4. Pulsa el botón verde de ejecución y observa cómo avanza una casilla.

La imagen anterior muestra este programa: «Inicio → Avanzar 1». Avanzar y Retroceder usan un selector de números, sin necesidad de teclado.

### 4. Añadir acciones y probar

Añade giros, esperas, repeticiones, sonidos o dibujos. Pulsa el campo de un bloque para cambiar su número, color, nota u otro parámetro.

Cuando el robot esté conectado y listo, pulsa un bloque de acción de la paleta para probarlo, o una secuencia del lienzo para ejecutarla. Para una tarea completa, usa el botón verde de ejecución.

Los bloques de evento pueden iniciar varios programas a la vez. Por ejemplo, uno puede controlar el movimiento y otro tocar un sonido cuando el ToF detecta un objeto. Los eventos ToF y DLight necesitan el módulo correspondiente.

### 5. Referencia de bloques

#### Eventos y control del programa

<table class="icon-block-table"><thead><tr><th scope="col">Icono</th><th scope="col">Bloque</th><th scope="col">Función</th></tr></thead><tbody><tr><td><img src="01-start.png" alt="Inicio" width="76" height="64"></td><td><strong>Inicio</strong></td><td>Ejecuta el programa conectado a este bloque.</td></tr><tr><td><img src="02-button-a.png" alt="Evento de botón" width="76" height="64"></td><td><strong>Evento de botón</strong></td><td>Ejecuta el programa al pulsar el botón seleccionado de CoCube.</td></tr><tr><td><img src="03-receive-message.png" alt="Recibir mensaje" width="76" height="64"></td><td><strong>Recibir mensaje</strong></td><td>Ejecuta el programa al recibir un mensaje del color seleccionado.</td></tr><tr><td><img src="04-send-message.png" alt="Enviar mensaje" width="76" height="64"></td><td><strong>Enviar mensaje</strong></td><td>Envía un mensaje de color para activar otros programas.</td></tr><tr><td><img src="05-wait.png" alt="Esperar" width="76" height="64"></td><td><strong>Esperar</strong></td><td>Espera el tiempo seleccionado y continúa.</td></tr><tr><td><img src="06-forever.png" alt="Por siempre" width="76" height="64"></td><td><strong>Por siempre</strong></td><td>Repite los bloques interiores hasta detener el programa.</td></tr><tr><td><img src="07-repeat.png" alt="Repetir" width="76" height="64"></td><td><strong>Repetir</strong></td><td>Repite los bloques interiores el número de veces seleccionado.</td></tr><tr><td><img src="08-stop.png" alt="Detener" width="76" height="64"></td><td><strong>Detener</strong></td><td>Detiene los programas en ejecución.</td></tr></tbody></table>

#### Sonido y pantalla

<table class="icon-block-table"><thead><tr><th scope="col">Icono</th><th scope="col">Bloque</th><th scope="col">Función</th></tr></thead><tbody><tr><td><img src="09-play-note.png" alt="Tocar nota" width="76" height="64"></td><td><strong>Tocar nota</strong></td><td>Elige una nota y una octava para reproducirla.</td></tr><tr><td><img src="10-draw-screen.png" alt="Dibujar patrón" width="76" height="64"></td><td><strong>Dibujar patrón</strong></td><td>Edita y muestra un dibujo de píxeles de un solo color.</td></tr><tr><td><img src="11-screen-color.png" alt="Color de pantalla" width="76" height="64"></td><td><strong>Color de pantalla</strong></td><td>Elige el color de los dibujos de un solo color.</td></tr><tr><td><img src="12-screen-image.png" alt="Imagen integrada" width="76" height="64"></td><td><strong>Imagen integrada</strong></td><td>Elige y muestra una imagen guardada en el robot.</td></tr><tr><td><img src="13-color-matrix.png" alt="Matriz de colores" width="76" height="64"></td><td><strong>Matriz de colores</strong></td><td>Elige el color de cada celda para crear un dibujo multicolor.</td></tr></tbody></table>

#### Movimiento y posicionamiento

<table class="icon-block-table"><thead><tr><th scope="col">Icono</th><th scope="col">Bloque</th><th scope="col">Función</th></tr></thead><tbody><tr><td><img src="14-forward.png" alt="Avanzar" width="76" height="64"></td><td><strong>Avanzar</strong></td><td>Avanza el número de casillas seleccionado.</td></tr><tr><td><img src="15-backward.png" alt="Retroceder" width="76" height="64"></td><td><strong>Retroceder</strong></td><td>Retrocede el número de casillas seleccionado.</td></tr><tr><td><img src="16-turn-left.png" alt="Girar a la izquierda" width="76" height="64"></td><td><strong>Girar a la izquierda</strong></td><td>Gira a la izquierda en pasos de 90°.</td></tr><tr><td><img src="17-turn-right.png" alt="Girar a la derecha" width="76" height="64"></td><td><strong>Girar a la derecha</strong></td><td>Gira a la derecha en pasos de 90°.</td></tr><tr><td><img src="18-go-to-position.png" alt="Ir a una posición" width="76" height="64"></td><td><strong>Ir a una posición</strong></td><td>Usa el tapete de posicionamiento para ir a las coordenadas X e Y seleccionadas.</td></tr><tr><td><img src="19-face-direction.png" alt="Orientación" width="76" height="64"></td><td><strong>Orientación</strong></td><td>En ICON: arriba es 0°, derecha 90°, abajo 180° e izquierda 270°.</td></tr></tbody></table>

#### Pinza y sensores

<table class="icon-block-table"><thead><tr><th scope="col">Icono</th><th scope="col">Bloque</th><th scope="col">Función</th></tr></thead><tbody><tr><td><img src="20-gripper-open.png" alt="Abrir pinza" width="76" height="64"></td><td><strong>Abrir pinza</strong></td><td>Abre el módulo de pinza con servomotor.</td></tr><tr><td><img src="21-gripper-close.png" alt="Cerrar pinza" width="76" height="64"></td><td><strong>Cerrar pinza</strong></td><td>Cierra el módulo de pinza con servomotor.</td></tr><tr><td><img src="22-tof-trigger.png" alt="Evento de distancia" width="76" height="64"></td><td><strong>Evento de distancia</strong></td><td>Conecta un módulo ToF; ejecuta el programa cuando la distancia cumple la condición elegida.</td></tr><tr><td><img src="23-light-trigger.png" alt="Evento de luz" width="76" height="64"></td><td><strong>Evento de luz</strong></td><td>Conecta un módulo DLight; ejecuta el programa cuando la intensidad de luz cumple la condición elegida.</td></tr></tbody></table>


### 6. Ejecutar y depurar

Comprueba que los bloques estén unidos, los parámetros sean correctos y la página indique que hay conexión. Las tareas de movimiento necesitan un tapete de posicionamiento y deben empezar en el centro de una casilla. Añade solo una o dos acciones cada vez para comprobarlas con facilidad.

Avanzar y Retroceder se desplazan entre centros de casillas. Ajusta la ruta cerca del borde para mantener el robot dentro de la zona de posicionamiento. En las actividades de fútbol, coloca tanto el robot como la pelota en el centro de sus casillas.

<img class="tutorial-image" src="comaps-football-map.png" alt="Mapa de fútbol CoCube; las intersecciones de las líneas discontinuas marcan los centros">

### 7. Gestionar proyectos

Abre Home, arriba a la izquierda:

- **Nuevo, Abrir y Guardar**: gestiona los proyectos de tu dispositivo.
- **Deshacer**: retrocede varios pasos, incluso después de borrar bloques o vaciar el lienzo.
- **Vaciar lienzo**: elimina el programa del lienzo.
- **Idioma**: cambia el idioma de la interfaz.
- **Programación con bloques**: vuelve a MicroBlocks.

La versión Web también permite volver a la página de entrada de CoCube. Al cambiar de modo, vuelve a conectar el robot en el editor elegido.

### 8. Retos con mapas

Usa los mapas de laberinto y carreras para planificar rutas, o diseña un mapa temático con Map Builder.

<img class="tutorial-image" src="comaps-maze-map.png" alt="Mapa estándar de laberinto CoCube">
<img class="tutorial-image" src="comaps-racing-map.png" alt="Mapa estándar de carreras CoCube">

[Lee la guía del diseñador de mapas](../cocube_icon_02_map_builder-es/) para elegir un tema, dibujar rutas, exportar e imprimir.

<img class="tutorial-image" src="polar-map-A3.svg" alt="Mapa A3 de expedición polar exportado con Map Builder">

<a href="polar-map-A3.svg" download>Descargar este mapa polar A3 en SVG</a>

Empieza con una ruta desde el inicio hasta la meta. Después añade recompensas, obstáculos o el reto de usar menos bloques. Cuando los niños tengan más experiencia, incorpora bucles, luces y sonidos.
