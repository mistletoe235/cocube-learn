[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Dial virtual

#### Potenciòmetre

- En aquest exemple farem servir el potenciòmetre, un component que permet regular el nivell de tensió que es pot llegir en un pin d’entrada analògica.

![Potenciòmetre](cm04-01-potenciometre1.png)

- Té tres terminals: un per l’entrada d’alimentació (5V), un altre per terra (GND) i l’últim per on surt la tensió de sortida.

![Potenciòmetre intern](cm04-02-potenciometre2.png)

- Funciona com un divisor de tensió: la sortida donarà un valor de voltatge depenent de la posició del dial (quant més a prop del pin d’alimentació, més gran serà el valor).

#### Connexió i lectura

- Per connectar-ho a la placa caldrà fer servir un dels pins analògics.

- Cal connectar-ho seguint el mateix esquema de colors, és a dir, vermell amb vermell, negre amb negre, etc.

  ![Connexió analògica ED1](cm04-03-ed1-a1.png)

- Una vegada connectat podem esbrinar el seu valor fent servir el **bloc lectura analògica _** , tot especificant el número de pin on l’hem connectat.

![Bloc lectura analògica](cm04-04-lectura-analogica.png)

##### Repte 1: fes un petit programa que mostri per pantalla el valor que es llegeix des del potenciòmetre

![Challenge](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Importat llibreria TFT](cm04-05-llibreria-tft.png)


      

![Solució repte 1](cm04-s1.png)


</details>

#### Llibreria Tortuga

- A més del valor numèric, mirarem de representar el moviment del potenciòmetre a la pantalla amb un “dial virtual”.

- Per a això farem servir la llibreria **Tortuga**, la qual permet dibuixar a la pantalla d’una manera semblant al llenguatge [LOGO](https://ca.wikipedia.org/wiki/Llenguatge_de_programaci%C3%B3_Logo) i per descomptat, com a Scratch).

![Llibreria tortuga](cm04-06-llibreria-tortuga.png)

#### Dibuixar una línia

- Per poder dibuixar una línia caldria utilitzar els següents blocs:
  - **torna a casa/ves a x 0 y 0**: per començar des del centre de la pantalla.
  - **fixar el color del llapis**: seleccionar un color (per defecte és negre).
  - **abaixa el llapis**.
  - **apunta en direcció _**: apunta en la direcció desitjada abans de traçar la línia. (torna a casa inclou apunta en direcció 0).
  - **moute _ passes**: número de passes o píxels de la pantalla a recòrrer.

![Dibuixar una línia](cm04-07-linia.png) ![Línía en pantalla"](cm04-08-linia-real.png)

##### Repte 2: troba la fòrmula per passar del rang de valors d’entrada analògica (0-1023) al de direcció (0-360º)

![Challenge](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
      

![Solució repte 1](cm04-s2.png)


</details>

- Una vegada tenim la fòrmula la podem fer servir per variar la direcció de la línia segons la posició de la lectura del potenciòmetre.

- Els blocs de fixar el color del llapis i abaixar-lo no cal que estiguin a dintre del bucle, només cal que s’executin una vegada abans de començar a dibuixar.

- Aprofitarem el codi que teníem anteriorment per mostrar el valor per pantalla i moure el dial al mateix temps.

![Dial virtual](cm04-09-dial-virtual.png)

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-03-ca) | [Activitat següent ➡️](../citilab-course-05-ca) |
|--|--|

[[/fact]]
