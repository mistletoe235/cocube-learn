### 1. Qué es una imagen BMP

BMP (Bitmap) es un formato de imagen sin pérdida y sin compresión desarrollado por Microsoft. Funciona como una cuadrícula precisa que guarda directamente la información de color de cada píxel, sin usar una compresión compleja.

Como BMP conserva los datos de la imagen y es muy compatible, resulta útil como formato de imagen original. La desventaja es que los archivos BMP suelen ser grandes.

MicroBlocks puede mostrar imágenes BMP en la pantalla TFT. En esta actividad harás un pequeño ejemplo de piedra, papel o tijeras.

### 2. Preparación

#### Paso 1: añade la biblioteca BMP

En el IDE de MicroBlocks, abre **Añadir biblioteca** y busca **BMP** dentro de la carpeta **Gráficos y pantallas**.

En Ajustes, activa **modo avanzado**. Verás la biblioteca **Archivos** en el lado izquierdo.

![Código1](Add%20BMP%20library.png)

![Código2](advanced%20mode.png)

#### Paso 2: crea imágenes BMP

Los archivos BMP son grandes porque no omiten datos de imagen y no admiten capas transparentes. Por eso no se usan mucho para transferir imágenes por internet.

No pasa nada en esta actividad. Podemos crear archivos BMP a partir de imágenes PNG.

Abre la **[herramienta PNG a BMP](PNG2BMP.html)**. Ajusta la imagen a 240 x 240 o menos, conviértela y descárgala.

#### Paso 3: sube las imágenes BMP a CoCube

En el menú **Archivo** de MicroBlocks, elige **subir archivo a la placa** y sube el BMP convertido.

![Código2](upload_bmp.png)

Si no encuentras **subir archivo a la placa**, comprueba que **modo avanzado** esté activado.

Espera con paciencia durante la subida. No cambies de pestaña, no minimices el navegador y no cambies a otra aplicación, porque eso puede interrumpir la subida.

Después de subir los archivos, usa el bloque **nombres de archivos** para confirmar que existen. Asegúrate de que <a href="paper.bmp" download="paper.bmp">paper.bmp</a>, <a href="rock.bmp" download="rock.bmp">rock.bmp</a> y <a href="scissors.bmp" download="scissors.bmp">scissors.bmp</a> estén listos.

Para usar directamente los materiales del ejemplo, descarga primero estos tres archivos BMP y luego súbelos a CoCube.

![Código3](scriptImage1024689.png)

### 3. Escribe el programa

- Botón A: muestra piedra. Botón B: muestra tijeras. A+B a la vez: muestra papel.
- Usa unos pocos bloques para comprobar los botones y mostrar el BMP correspondiente. También puedes reproducir un sonido corto como respuesta.

![Código4](allScripts1110912.png)

Listo. Pide a un amigo o familiar que juegue una ronda contigo.

<a href="BMP_Image.ubp" download="BMP_Image.ubp">Descargar el proyecto de ejemplo</a>

### 4. Ampliar y crear

Prueba a subir una imagen que te guste, por ejemplo la conejita Rosa, y crea una pantalla o un tema personalizado.

![Código6](Bunny512.png)
