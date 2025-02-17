[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Control remot del robot Fantàstic amb AppInventor

#### AppInventor

- L’AppInventor és un entorn de programació per blocs creat per Google Labs a finals del 2008 per desenvolupar aplicacions per Android.

![Niñas programando en AppInventor](cm19-01-kids_programming.png)

- Permet crear aplicacions d’una forma més fàcil i amb menys temps que amb altres entorns més complexos.

- Es poden provar les aplicacions en temps real abans de compilar-les i instal·lar-les al dispositiu.

- Disposa de molts tutorials per aprendre de forma autònoma a més d’una comunitat molt gran que comparteix els seus projectes.

![Tutoriales de AppInventor](cm19-02-appinventor_tutorials.png)

#### Primers passos amb AppInventor

- Vés a la pàgina web d'[AppInventor](https://code.appinventor.mit.edu).

- Clica al botó que posa **Create Apps!**.

- Introdueix les credencials del teu compte de Google (correu i contrasenya).

- Accepta els termes del servei (Terms of Service).

- Clica a **Continue** en la finestra de benvinguda que apareix a continuació.

<img title="Pantalla de benvinguda d'AppInventor" src="cm19-03-appinventor_welcome.png" alt="" data-align="center" width="480">

#### Crea un nou projecte

- **Opcional:** Canvia d’idioma fent clic a **English** (a dalt i a la dreta) i selecciona l'idioma **Català**.

- Crea un nou projecte fent clic a "**Projectes > Crea un projecte nou…**".

![Crear nou projecte](cm19-04-new_project.png)

- Posa-li nom (per exemple **RobotED1**) i accepta.

![Posar nom al projecte](cm19-05-set_project_name.png)

#### Sincronitza amb el Companion

- Descarrega l’**AppInventor 2 Companion** al teu smartphone o tablet Android i obre’l.

![Descarrega el Companion](cm19-06-download_companion.png)

- Clica a **Connecta > AI Companion**.

![Connecta el Companion](cm19-07-connect_companion.png)

- Escaneja el codi QR amb la opció **Scan QR Code** o escriu el codi directament.

![Escaneja el codi QR](cm19-08-qr_code.png)

- **NOTA: És necessari que l’ordinador i dispositiu estiguin a la mateixa xarxa**.

#### Afegir botons

- Començarem afegint botons per poder enviar les ordres al robot. Per afegir-ne un cal arrossegar l’element **Botó** des de la **Paleta** cap al **Visor**.

![Afegir botó](cm19-09-add_button.png)

- Després podem canviar el noms d’aquests botó seleccionant-lo i clicant a sota on posa **Canviar el nom** (posant per exemple **BotóEndavant**).

![Canvia el nom](cm19-10-rename.png)

- També podem canviar el text que mostra anant a l’apartat **Propietats** i modificant la propietat **Text**, introduïnt un de nou (posant per exemple **Endavant**).

![Edita el text](cm19-11-set_text.png)

##### Repte 1: afegeix 3 botons més i canvia’ls el nom i el text que mostren.

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm19-s1.png)


</details>

#### Organitzar els botons

- Per defecte l'AppInventor col·loca els components de la pantalla un sota l’altre. Per organitzar els components necessitem els elements que trobem a la categoria **Disposició**.

- Si volem col·locar els botons de manera distribuida a la pantalla podem fer servir el component **Contenidor tabular**.

![Contenidor tabular](cm19-12-table_arrangement.png)

##### Repte 2: col·loca els botons com els d’un comandament a distància.

![Challenge 2](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Taula de botons](cm19-s2a.png" title="Propietats contenidor tabular"> <img src="cm19-s2b.png)


</details>

#### Canviar mida dels botons

- Quan afegim un component visual a la nostra aplicació tenen les propietats **Alçària** i **Amplada** en **Automàtic**. Això significa que s’ajusten el seu contingut, sent en el cas dels botons el text.

- Si volem fer que els botons tinguin unes dimensions regulars (forma quadrada) podem assignar un valor concret de píxels en ambdues propietats, per exemple **100**.

![Canvia el nom](cm19-13-buttons_size.png)

![Botó quadrat](cm19-14-square_button.png)

#### Detectar botó premut

- Per començar a programar l'aplicació cal anar a la secció **Blocs**, al costat de **Dissenyador**.

![Secció Blocs](cm19-15-blocks_section.png)

- Un cop dins, per detectar quan premem un botó cal seleccionar-lo a l'apartat **Blocs** i agafar el bloc **quan Botó.Clic**.

![Blocs de botó](cm19-16-button_blocks.png)

![quan Botó clic](cm19-17-when_button_click.png)

#### Enviar peticions web

- Per tal d’enviar peticions web necessitem el component **Web** que hi ha a la categoria **Connectivitat**.

![Component Web](cm19-18-web_component.png)

- Per realitzar una petició web cal fer servir primer el bloc **assigna a Web1. Url** especificant l’adreça i després utilitzar el bloc **crida Web1.Pren** per executar la petició.

![Bloc assigna URL Web](cm19-19-web_url_block.png)

![Bloc pren Web](cm19-20-web_get_block.png)

- Per posar l’adreça hem de fer servir el primer bloc disponible a la categoria **Text**.

![Bloc text](cm19-21-text_block.png)

![Bloc text URL](cm19-22-text_block_url.png)

##### Repte 3: fes que cada botó executi la petició web corresponent quan es premi.

![Challenge 3](cm-challenge.png)

<details>
  <summary>Solució al repte 3</summary>
    

![Sol·lució repte 3](cm19-s3.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-18-ca) | [Activitat següent ➡️](../citilab-course-20-ca) |
|--|--|

[[/fact]]
