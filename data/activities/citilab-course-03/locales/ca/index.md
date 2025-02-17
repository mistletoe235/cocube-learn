[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Nivell de bombolla

#### Acceleròmetre

* Un altre sensor que disposa la placa és l’acceleròmetre. Amb aquest sensor podem conèixer la inclinació que té la placa en qualsevol dels tres eixos (**X**,\*\* Y\*\* i **Z**).
* El rang de valors en aquests és de -100 a 100, donant 0 en els eixos X i Y si la placa està totalment plana respecte al terra.

| X | Y |
|---|---|
| ![Inclinació X](cm03-01-inclinaciox.png) | ![Inclinació Y](cm03-02-inclinacioy.png) |

![Bombolla simple](cm03-03-bombolla-simple.png)

##### Repte 1: prova de fer el mateix però amb l’eix Y, és a dir, dibuixant un punt cap al costat on estigui inclinada la placa

![Challenge accepted](cm-challenge.png)

<details> <summary>Solució al repte 1</summary> 

![Solució repte 1](cm03-s1.png)

 </details>

#### Mapeig de valors

* Si ara volguèssim fer que s’encenguès qualsevol punt de la pantalla depenent de la inclinació X i Y, necessitaríem 25 blocs semblants als que acabem de fer!
* Podem pensar una solució més eficient mirant de mapejar (convertir des d’un rang a un altre) el valor de la inclinació en X i Y amb el número de fila i columna del LED a encendre.

| X | Y |
|---|---|
| \-100 | 1 |
| 0 | 3 |
| 100 | 5 |

D’aquesta manera només ens caldrien els blocs d’**encèn x \_ y \_** i **apaga x \_ y \_** per control·lar els LEDs.

![Blocs encèn i apaga](cm03-04-pantallaxy.png)

##### Repte 2: troba la fòrmula per transformar el valor d’inclinació X o Y (-100 a 100) a un valor de fila o columna de la pantalla (1 a 5)

![Challenge](cm-challenge.png)

<details> <summary>Solució al repte 2</summary> 

![Solució repte 2](cm03-s2.png)

 </details>

#### Encendre i apagar LEDs

* Ara que ja tenim la fòrmula, podem fer-la servir per encendre un LED i també apagar-lo inmediatament (ja que si no es quedarien tots encesos!).

![Bombolla 1](cm03-05-bombolla1.png)

* Si ho provem, veurem que de totes maneres tenim aquest problema, ja que és possible que no s’encengui i s’apagui el mateix LED (el valor d’inclinació entre un bloc i l’altre pot variar!).
* Per aquesta raó haurien de guardar en algun lloc el valor resultant de la fòrmula, i per això estàn les variables.

#### Variables

* Serveixen per guardar temporalment un valor durant l’execució d’un programa.
* Primer crearem una variable per guardar el valor **x**, tot anant a la categoria **Variables** i prement el botó **Crea una variable**. Repetirem el mateix procés per crear la variable per guardar la **y**.

| ![Categoria Variables](cm03-07-variable1.png) | ![Crea una variable](cm03-08-variable2.png) |
|--|--|

* Finalment només caldrà fer servir el bloc assigna \_ a \_ per guardar les fòrmules corresponents a les variables.

![Bombolla 2](cm03-09-bombolla2.png)

#### Llibreria TFT

* Podem anar més enllà millorant la visualització de la bombolla, fent servir la llibreria TFT disponible a la carpeta Graphics.

![Llibreria TFT](cm03-10-tft.png)

* Aquesta llibreria ofereix diferents blocs per representar formes geomètriques, a més de text.

![Blocks llibreria TFT](cm03-11-tft-blocs.png)

* En el nostre cas podem fer servir el rectangle o el cercle per representar la bombolla, amb els que podem configurar la seva mida i color.

#### Mapeig de valors (II)

* Ara ja no ens serveix la fòrmula que hem fet servir abans, ja que ara podem fer servir qualsevol píxel de la pantalla.
* Tot i que la pantalla de la ED1 fa 128x128 píxels, podem fer servir els blocs **amplada de la pantalla TFT** i **alçada de la pantalla TFT** en cas de que no sàpiguessim quina mida té o també si fem servir una altra placa diferent.

![Blocs amplada i alçada TFT](cm03-12-tft-amplada.png)

##### Repte 3: troba la fòrmula per transformar el valor d’inclinació X o Y (-100 a 100) a un valor de fila o columna de la pantalla (1 a 5)

![Challenge](cm-challenge.png)

<details> <summary>Solució al repte 3</summary> 

![Solució repte 3](cm03-s3.png)

 </details>

#### Dibuixar bombolla

* Com en el cas anterior, haurem de guardar cada fòrmula a la variable corresponent.
* Si fem servir el bloc de cercle, només cal especificar-li el radi i el color. Una vegada dibuixat, podem “esborrar-lo” dibuixant-lo de nou però de color negre.

![Bombolla TFT](cm03-13-bombolla-tft.png)

* És recomanable **netejar** la pantalla abans de tot, ja que així ens assegurem de que no hi haurà res que s’hagi pogut dibuixar abans.

#### Reescalar

* Aquesta operació és habitual quan es vol passar d’un rang de valors a un altre.

  ![Reescalar](cm03-14-rescale.png)
* Arrossegant la imatge d'aquesta definició tindrem un nou bloc per fer-lo servir al nostre programa.

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-02-ca) | [Activitat següent ➡️](../citilab-course-04-ca) |
|--|--|

[[/fact]]
