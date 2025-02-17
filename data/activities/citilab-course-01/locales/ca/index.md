[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Introducció

#### Què és MicroBlocks

* MicroBlocks és un entorn de programació lliure que permet treballar amb diferents plaques (Citilab ED1, micro:bit, M5Stack, ESP32 STEAMaker, etc.).
* El codi es visualitza a l’ordinador però s’executa directament a la placa. Això fa que aquesta es pugui desconnectar i seguir funcionant igual sense cap operació addicional.
* Està disponible tant per instal·lar a [diferents sistemes](https://microblocks.fun/releases) (Windows, MacOS, Linux) com per fer-ho servir de manera [online](https://microblocks.fun/run/microblocks.html).

![El mateix bloc a diferents plaques](cm01-01-bloc-pantalla.png)

#### Característiques ED1 (Part frontal)

![ED1 frontal](cm01-02-ED1-frontal.png)

#### Característiques ED1 (Part darrere)

![ED1 darrere](cm01-03-ED1-darrere.png)

#### Instal·lació i connexió amb placa

* Descarregar el programa directament des d’[aquí](https://microblocks.fun/download) o bé anar a la versió web (es requereix una versió recent de Chrome o compatible).
* Amb algunes plaques cal instal·lar un control·lador en cas que el sistema no detecti la placa automàticament. En el cas de la ED1 es necessita [aquest driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
* Una vegada el detecta l’ordinador el programa s’hauria de connectar automàticament amb la placa. A la versió web cal fer la connexió manualment clicant a la icona corresponent.

| ![Connexió USB navegador](cm01-04-connectar1.png) | ![Indicador connexió USB](cm01-04-connectar2.png) |
|--|--|

#### Blocs i llibreries

Com a molts entorns de programació per blocs, disposem d’una paleta de blocs dividits en **categories**.

![Categories](cm01-05-categories.png)

També tenim disponibles una sèrie de **llibreries,** que són conjunts de blocs amb un únic propòsit. Alguns d’aquests estan formats per altres blocs.

![Llibreries](cm01-06-llibreries.png)

El programa per defecte carregarà unes llibreries o unes altres depenent de la placa connectada.

![Llibreries per defecte](cm01-07-defecte.png)

### 1. Primers passos

#### 1.1 - Comencem a programar

* Començarem fent servir el bloc pantalla de **Pantalla LED** agafant-lo i arrossegant-lo a l’àrea de programació.
* També agafarem el bloc en començar de la categoria control i el connectarem amb l’anterior.
* Clicarem al botó de començar per veure com funciona.
* Desendollarem la placa, apagant-la i encenent-la per comprovar que el programa efectivament s’ha guardat en ella.

![Comencem a programar](cm01-08-comencem.png)

##### Repte 1: prova de fer altres dibuixos amb el bloc pantalla

![Challenge](cm-challenge.png)

<details> <summary>Solució al repte 1</summary> 

![Solució repte 1](cm01-s1.png)

 </details>

#### 1.2 Iteracions (I)

* Si volem repetir una acció varies vegades, per exemple fent un canvi de dibuix per efectuar una animació, podem utilitzar els blocs d’iteració com el “**per sempre**” o el “**repeteix \_ vegades**” (entre altres) que tenim a Control.

![Blocs per sempre i repetir](cm01-09-iteracions.png)

* També caldrà posar una petita espera entre els blocs per a que doni temps de visualitzar els canvis de la pantalla, ja que si no ho farà massa ràpid i no es podrà apreciar.

![Bloc espera](cm01-10-espera.png)

##### Repte 2: prova de fer una animació que es repeteixi continuament amb els blocs anteriors

![Challenge](cm-challenge.png)

<details> <summary>Solució al repte 2</summary> 

![Solució repte 3](cm01-s2.png)

 </details>

#### 1.3 Iteracions (II)

* Hi ha altres blocs per fer repeticions que també són molt útils, com ara el “**repeteix fins que \_**” i el “**per cada i en \_**”.
* En el primer, la repetició es repeteix fins que es doni una condició, per exemple si premem un botó de la placa.

![Bloc repeteix fins](cm01-11-repeteix-fins.png)

* En el cas del segon, el valor de **i** començarà en **1** i anirà creixent a cada iteració fins arribar al valor establert (per defecte 10). També serveix per recòrrer llistes, com veurem més endavant.

![Bloc per cada](cm01-12-per-cada.png)

##### Repte 3: prova de fer un compte entere de 5 a 0 amb un bloc de repetició.

![Challenge accepted](cm-challenge.png)

<details> <summary>Solució al repte 3</summary> 

![Solució repte 3](cm01-s3.png)

 </details>

#### 1.4 - Botons i condicionals

* Per aquesta placa tenim disponible una llibreria per fer servir els botons. En cas que no es carregui automàticament podem afegir-la clicant al símbol + (Add Library) i anant a **Other > ED1 Buttons.ubl**.

  ![Llibreria botons ED1](cm01-13-llibreria-botons.png)
* Els botons retornen un valor **digital (cert o fals)** representat com un interruptor **verd** o vermell. Aquest tipus de bloc es pot ficar en qualsevol altre que tingui representada la ranura de la mateixa manera.

![True](cm01-14-boto-ok0.png) ![False](cm01-15-boto-ok1.png)


![](cm01-16-blocs-codicionals.png)

##### Repte 4: mostra un dibuix a la pantalla i neteja’l fent servir dos botons.

![Challenge](cm-challenge.png)

<details> <summary>Solució al repte 4 (quans)</summary>

![Solució repte 4](cm01-s4a.png)

</details>

<details> <summary>Solució al repte 4 (per sempre) </summary> 

![Solució repte 4](cm01-s4b.png)

 </details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [Activitat següent ➡️](../citilab-course-02-ca) |
|--|

[[/fact]]
