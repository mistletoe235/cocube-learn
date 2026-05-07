### 1. Objetivo

¿Quieres que tu robot aprenda a recordar una ruta y recorrerla otra vez por sí mismo? Tal vez hayas jugado a seguir huellas para volver al punto de partida. Parece sencillo, pero pone a prueba la memoria del robot. En esta actividad, programarás el robot CoCube para recordar cada posición visitada y repetir después toda la ruta.

### 2. Materiales

![cocube](cocube.png =240x*)
![computer](computer.png =240x*)
![comap](comap.png =420x*)
### 3. Software

[MicroBlocks-CoCube](https://microblocks.fun/run/microblocks.html#scripts=GP%20Scripts%0Adepends%20%27CoCube%27)

![microblocks cocube](microblocks_cocube.png =520x*)
### 4. Conceptos básicos

#### Bloques Que Vas a Usar
1. **Bloque de lista**: En la categoría **Datos**, hay un bloque llamado **lista**. Cuando lo arrastras por primera vez, puede contener el elemento predeterminado **cat**. Haz clic en el pequeño triángulo gris de la izquierda para convertirlo en una lista vacía, como una tabla limpia lista para recibir datos.

![list](list.png)

![empty list](empty_list.png)
2. **Guardar datos en una lista:** Cuando tenemos una **lista** que funciona como almacén, podemos guardar datos ordenadamente y leerlos después.

Pero un almacén no basta. También necesitamos un bloque que coloque cosas dentro. Este bloque añade el nuevo elemento al final de la lista, como una persona que se pone al final de una fila.

Tiene dos entradas:

* La primera entrada: el elemento que quieres guardar, por ejemplo un número o una letra.

* La segunda entrada: la lista en la que quieres guardarlo.

![append to list](append_to_list.png)

PS: Prueba a colocar un bloque **lista** dentro de este bloque. ¿Aparece el resultado que esperabas?

* **Leer una lista:** Después de guardar datos en el almacén, la siguiente pregunta importante es cómo recuperar un elemento desde una posición concreta.

Es como poner un libro en una estantería y luego encontrarlo por el número de su lugar.

Para eso usamos el bloque **elemento de lista**. Puede usar un número de posición, o índice, para leer exactamente el dato que necesitas.

![read list](read_list.png)
* **Inicializar variables:** ¿Quieres que el robot recuerde un número o un nombre para usarlo más tarde? Dale una cajita. En programación, esa cajita se llama **variable**.

¿Cómo encuentras esa cajita?

* Busca la categoría naranja **Variables**.

* En la esquina superior izquierda de esa categoría, haz clic en **Crea una variable**.

* Crea la variable.

![variable category](variable_category.png)

![create variable](create_variable.png)

Antes de usar una variable, normalmente le damos un valor inicial claro. Más adelante, cuando el valor cambia, lo actualizamos.

![local variable init](local_variable_init.png)

Inicialización de una variable local

![set variable](set_variable.png)

Asignar un valor a una variable

PS: Una variable local solo funciona dentro del bloque o script donde se crea.

* **Nombrar un almacén:** Si usamos listas normales como almacenes, aparece un problema: no tienen etiqueta. Si hay dos almacenes de lista iguales, ¿cómo sabemos qué datos contiene cada uno? Podemos usar variables para nombrar los almacenes. En la imagen de abajo, el almacén de destino se llama **list_x**.

![named list](named_list.png)
### 5. Dar Memoria al Robot

1. **Crear variables y almacenes:** ¿Cómo podemos darle memoria al robot?

Primero necesitamos un lugar donde guardar esa memoria. Creamos almacenes con nombre, es decir, listas, para guardar los datos de coordenadas del robot. También añadimos una variable de índice como contador, para saber siempre cuántas posiciones se han guardado.

![create lists](create_lists.png)
* **Guardar posiciones:** Ahora guardamos las huellas del robot, es decir, las coordenadas X e Y del mapa, en dos listas correspondientes. Hay una regla muy importante:

La 1.ª coordenada X debe guardarse con la 1.ª coordenada Y, la 2.ª con la 2.ª, y así sucesivamente. Los datos de la misma posición en las dos listas deben mantenerse emparejados. Si no, los valores X e Y pueden mezclarse al leerlos después.

![save position](save_position.png)

Las dos coordenadas de un mismo punto aparecen juntas, así que las agrupamos en la memoria. Esto hace que la memoria del robot sea más fácil de manejar.

![paired coordinates](paired_coordinates.png)

También podemos ir un paso más allá: unir las coordenadas X e Y como un solo punto y guardar ese punto completo en una única lista. Así, una sola lista puede guardar todos los puntos, de forma más sencilla.

### 6. Moverse por la Ruta Recordada

1. **Repetición de ruta:** Recuerda lo que aprendiste antes: si le das a CoCube una coordenada de destino, puede moverse hasta allí con rapidez y precisión.

Para repetir una ruta, leemos las coordenadas guardadas en el almacén una por una y usamos el bloque **CoCube move to** para guiar al robot por ellas en orden.

![read route](read_route.png)

Aquí leemos la 1.ª coordenada de cada almacén. Esto coincide con la idea de pares de coordenadas: el 1.er valor X y el 1.er valor Y van juntos.

¿Por qué el 1.er elemento?

Porque guardamos las coordenadas en orden. El primer lugar que el robot recordó está al principio de la lista.

* ¿Cómo podríamos repetir más coordenadas?

Si ya conoces el bloque **for** con una variable de índice, puede que pienses en obtener la longitud del almacén y leer cada par de coordenadas en orden. Eso funciona.

![for index](for_index.png)

Hoy usaremos un método nuevo llamado "leer y borrar". Después de leer la 1.ª coordenada, ese elemento ya se usó y no hace falta conservarlo, así que lo borramos.

Después de borrarlo, el antiguo 2.º elemento avanza y se convierte en el nuevo 1.º. Así solo necesitamos leer el elemento 1 cada vez. Con este método, nuestra **lista** se comporta como una cola: lo que se guardó primero se usa y se elimina primero.

![delete first item](delete_first_item.png)

Si dejamos "leer y borrar" ejecutándose sin parar, el bucle exterior **por siempre** nunca terminará. Necesitamos salir en el momento correcto. Usa el bloque **sal del bucle**. Para encontrarlo, activa primero **modo avanzado** y luego busca al final de la categoría **Control**.

![exit loop](exit_loop.png)

También podemos usar el bloque **repite hasta que** para sustituir la combinación de **si** más **por siempre**:

![repeat until empty](repeat_until_empty.png)
### 7. Instrucciones

1. **Crear un menú:** Para que los controles sean claros, podemos usar la pantalla **TFT** de CoCube para mostrar un menú sencillo. El bloque personalizado **start** dibuja este menú. Después usamos los botones físicos A y B del robot CoCube:

   * Pulsa A: empieza **Record**, para que el robot registre sus posiciones.

   * Pulsa B: empieza **Start**, para que el robot repita la ruta guardada.

   * Pulsa A + B al mismo tiempo: **Restart**, que borra todas las coordenadas guardadas y empieza de nuevo.

![start menu](start_menu.png)
* **Restart:** Si usaste el método "leer y borrar", **Restart** puede ser muy sencillo: detener todas las tareas y volver al menú.

![ab restart](ab_restart.png)

Si usas el bloque **for** con una variable de índice, puedes colocar aquí el borrado de memoria:

![ab restart delete memory](ab_restart_delete_memory.png)

Usa los bloques explicados para guardar y repetir las posiciones del robot. Añade visualización en **TFT** y música para que la actividad sea más interesante.

<video controls style="width: 320px; max-width: 100%; height: auto;">
  <source src="path_replay_demo.mp4" type="video/mp4">
</video>

[Código de referencia: MicroBlocks CoCube Repetición de ruta](https://microblocks.cocube.fun#scripts=GP%20Scripts%0Adepends%20%27CoCube%27%20%27LED%20Display%27%20%27TFT%27%20%27Tone%27%0A%0Aspec%20%27%20%27%20%27start%27%20%27start%27%0Ato%20start%20%7B%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%3A%20Record%27%2010%2060%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27B%3A%20Start%27%2010%20100%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%20%20%27%5Btft%3Atext%5D%27%20%27A%2BB%3A%20Restart%27%2010%20140%20%28colorSwatch%20255%20150%200%20255%29%203%20true%0A%7D%0A%0Ascript%20416%2065%20%7B%0AwhenButtonPressed%20%27A%2BB%27%0A%27%5Btft%3Aclear%5D%27%0A%27CoCube%20wheels%20stop%27%0AstopAll%0Astart%0A%7D%0A%0Ascript%20602%2065%20%7B%0AwhenButtonPressed%20%27A%27%0A%27%5Btft%3Aclear%5D%27%0Aif%20%28%28size%20list_x%29%20%3D%3D%200%29%20%7B%0A%20%20list_x%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20list_y%20%3D%20%28%27%5Bdata%3AmakeList%5D%27%29%0A%20%20num%20%3D%200%0A%7D%0Aif%20%28%27CoCube%20on%20the%20mat%27%29%20%7B%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_X%27%29%20list_x%0A%20%20%27%5Bdata%3AaddLast%5D%27%20%28%27CoCube%20position_Y%27%29%20list_y%0A%20%20num%20%2B%3D%201%0A%20%20sendBroadcast%20%27show%20number%27%0A%7D%0A%7D%0A%0Ascript%20416%20508%20%7B%0AwhenStarted%0Acomment%20%27%E5%B0%86CoCube%E6%94%BE%E7%BD%AE%E5%9C%A8CoMaps%E5%9C%B0%E5%9B%BE%E4%B8%8A%E7%9A%84%E4%B8%8D%E5%90%8C%E4%BD%8D%E7%BD%AE%EF%BC%8C%0A%E6%8C%89%E4%B8%8BA%E9%94%AE%E8%AE%B0%E5%BD%95%E6%AF%8F%E4%B8%80%E4%B8%AA%E5%9D%90%E6%A0%87%EF%BC%8C%0A%E6%8C%89%E4%B8%8BB%E9%94%AE%EF%BC%8CCoCube%E5%B0%86%E6%8C%89%E9%A1%BA%E5%BA%8F%E7%A7%BB%E5%8A%A8%E5%88%B0%E8%BF%99%E4%BA%9B%E5%9D%90%E6%A0%87%E4%BD%8D%E7%BD%AE%E3%80%82%27%0Acomment%20%27Place%20the%20CoCube%20at%20different%20locations%20on%20the%20CoMap.%0APress%20the%20A%20button%20to%20record%20each%20coordinate.%0AAnd%20then%20press%20the%20B%20button%2C%20the%20CoCube%20will%20move%20to%20these%20recorded%20locations%20in%20sequence.%27%0Astart%0A%7D%0A%0Ascript%20416%20741%20%7B%0AwhenBroadcastReceived%20%27show%20number%27%0A%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%27play%20tone%27%20%27nt%3Bg%27%200%20150%0AwaitMillis%20200%0A%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%7D%0A%0Ascript%20416%20971%20%7B%0AwhenButtonPressed%20%27B%27%0Anum%20%3D%200%0A%27%5Btft%3Atext%5D%27%20%270%27%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0Aforever%20%7B%0A%20%20if%20%28%28size%20list_x%29%20%21%3D%200%29%20%7B%0A%20%20%20%20%27CoCube%20move%20to%27%20%28at%201%20list_x%29%20%28at%201%20list_y%29%2040%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_x%0A%20%20%20%20%27%5Bdata%3Adelete%5D%27%201%20list_y%0A%20%20%20%20num%20%2B%3D%201%0A%20%20%20%20%27%5Btft%3Atext%5D%27%20num%2080%2080%20%28colorSwatch%20255%20150%200%20255%29%2012%20false%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bc%27%200%2075%0A%20%20%20%20%27play%20tone%27%20%27nt%3Bg%27%200%20150%0A%20%20%7D%20else%20%7B%0A%20%20%20%20waitMillis%20300%0A%20%20%20%20%27%5Bdisplay%3AmbDisplayOff%5D%27%0A%20%20%20%20exitLoop%0A%20%20%7D%0A%7D%0A%7D%0A%0Ascript%20976%201240%20%7B%0Ato%20start%20%7B%7D%0A%7D%0A%0A)
