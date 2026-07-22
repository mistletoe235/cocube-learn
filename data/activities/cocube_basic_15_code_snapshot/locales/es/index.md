### Instantáneas de código

Si quieres guardar un programa durante mucho tiempo en el robot CoCube y abrirlo rápidamente la próxima vez, puedes usar la función **Instantánea de código** de MicroBlocks.

Una instantánea de código guarda el programa actual en el sistema de archivos de CoCube. Después de guardarlo, incluso si CoCube se desconecta del IDE de MicroBlocks, puedes ejecutar el programa directamente desde el sistema de menú del robot.

#### 1. Preparación: actualizar el firmware de CoCube

Antes de usar instantáneas de código, confirma primero si tu CoCube ya es compatible con esta función.

Cuando CoCube no esté conectado al IDE de MicroBlocks, mantén presionado el botón B y pulsa el botón A 4 veces seguidas. Si la pantalla de CoCube cambia y puedes usar los botones A/B para moverte por un menú, el firmware actual ya admite instantáneas de código y no necesita actualizarse.

Si no aparece el menú, conecta CoCube al ordenador con un cable USB. En el IDE de MicroBlocks, haz clic en **Configuración** -> **Actualizar firmware de la placa**, elige **CoCube** y después selecciona el puerto correspondiente.

![upgrade1](upgrade_1_es.png)
![upgrade2](upgrade_2_es.png)

La actualización del firmware tarda aproximadamente 1 minuto. Durante la actualización, mantén la página del IDE de MicroBlocks en primer plano en el navegador y no realices otras operaciones. De lo contrario, la actualización podría fallar. Si falla, vuelve a actualizar el firmware.

#### 2. Abrir el sistema de menú

Después de la actualización, el firmware de CoCube incluye casi 10 instantáneas de código integradas. Puedes probar primero estos programas integrados desde el sistema de menú.

Cuando CoCube no esté conectado al IDE de MicroBlocks, mantén presionado el botón B y pulsa el botón A 4 veces seguidas. Cuando aparezca la pantalla de inicio, pulsa A o B para entrar en el menú de instantáneas de código. Dentro del menú, pulsa A o B para mover el cursor. Pulsa A y B al mismo tiempo para ejecutar la instantánea seleccionada.

- guide: Muestra el ID BLE del robot CoCube actual e introduce las partes principales del sistema CoCube.

- bird: Una versión Hoppy Bunny del juego Flappy Bird. Usa los botones para controlar el conejo y pasar entre los tubos. Intenta conseguir la mayor puntuación posible.

- buzzer: Un programa que reproduce música con el zumbador. Coloca CoCube sobre distintas teclas del mapa musical y el robot reproducirá las notas correspondientes con el zumbador.

- camera: Un programa de prueba para usar con la cámara Sengo2. CoCube puede reconocer tarjetas de tráfico y ejecutar acciones correspondientes.

- face: Un programa que simula expresiones en la pantalla. Al pulsar A/B, puedes cambiar el color de la expresión.

- football: Un programa de fútbol robótico. Saca el mapa del campo de fútbol y coloca varios balones de fútbol impresos en 3D. Después de instalar el módulo de pinza en CoCube, coloca CoCube junto a un balón y mirando hacia el centro de la portería derecha, y pulsa A para registrar la posición actual. Repite la operación con cada balón. Cuando todas las posiciones estén registradas, pulsa B y el robot encontrará automáticamente los balones y realizará los tiros.

- maze: Un programa para que el robot recorra un laberinto. El funcionamiento es similar al programa football. Saca el mapa de laberinto o de carreras, coloca el robot sobre el mapa y pulsa A en cada punto de giro para registrarlo. Luego coloca el robot al inicio del camino y pulsa B. El robot se moverá de forma autónoma siguiendo la ruta registrada.

- midi: Un programa para reproducir música MIDI. Necesita el módulo de música MIDI de CoCube. Al igual que el programa buzzer, coloca CoCube sobre distintas teclas del mapa musical y el módulo MIDI reproducirá las notas correspondientes. Si colocas CoCube en la zona de instrumentos de la primera fila, puedes cambiar el timbre. Si lo colocas en la zona de percusión de la segunda fila, puedes activar sonidos de percusión con los botones A/B.

Para salir del programa actual, mantén presionado B y pulsa A 4 veces de nuevo para volver a abrir el sistema de menú.

#### 3. Añadir tu propia instantánea de código

El siguiente programa sencillo muestra cómo guardar tu propia instantánea de código.

Primero, activa el **Modo avanzado** en la configuración del IDE de MicroBlocks. Después de activarlo, MicroBlocks mostrará funciones relacionadas con las instantáneas de código, y algunas bibliotecas ofrecerán bloques adicionales.

![modo avanzado](advanced_1_es.png)

Después, usa el bloque **mostrar imagen** de la biblioteca LED Display y el bloque **establecer color de pantalla** disponible en el Modo avanzado para crear una animación de un corazón que late.

![programa del corazón](codepng_es.png)

A continuación, haz clic en **snapshot code on board** en el menú **Archivo**. Nombra la instantánea `heart` y haz clic en **Aceptar**. El programa actual se guardará en el sistema de archivos del chip de CoCube.

![nombre de instantánea](snapshot1_es.png)
![instantánea guardada](snapshot2_es.png)

Por último, asegúrate de desconectar CoCube del IDE de MicroBlocks antes de abrir el sistema de menú. Ahora verás el programa `heart` en el menú y podrás ejecutarlo desde el robot cuando quieras.

#### 4. Eliminar tu instantánea de código

Normalmente no hace falta eliminar las instantáneas de código guardadas. Si realmente necesitas eliminar una, sigue estos pasos:

1. Añade la biblioteca: **Otros** -> **Archivos**.

2. Usa el bloque **nombre de archivo** para ver el contenido guardado en el sistema de archivos. Deberías poder ver el archivo `heart.ucode`.

![ucode](ucode_es.png)

3. Usa el bloque **eliminar archivo** para borrar `heart.ucode`.

![eliminar ucode](delate_ucode_es.png)

4. Usa de nuevo el bloque **nombre de archivo** para revisar la lista de archivos y confirmar que `heart.ucode` ha sido eliminado. Después de desconectar CoCube del IDE de MicroBlocks y abrir otra vez el sistema de menú, el programa `heart` ya no aparecerá.

#### 5. Notas

1. Cuando actualizas el firmware en el IDE de MicroBlocks, el sistema de archivos se restaura con las instantáneas de código integradas de fábrica. Las instantáneas que hayas guardado tú se perderán, así que haz una copia de seguridad si la necesitas.

2. Abre el sistema de menú solo después de desconectar CoCube del IDE de MicroBlocks. Activar el sistema de menú mientras está conectado puede causar comportamientos inesperados.
