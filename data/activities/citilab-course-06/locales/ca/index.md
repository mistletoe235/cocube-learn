[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Juagant amb NeoPíxels

#### Connexió de la tira Neopíxel

- Els NeoPixels són una tira de LEDs RGB (de colors) que disposen de controlador dins de cadascun. Això permet controlar-los de manera individual o col·lectiva aconseguint diferents efectes visuals.

- Treballarem amb una tira de 10 LEDs NeoPíxel amb un connector preparat per l'ED1.

![Tira de NeoPíxels](cm06-01-neopixel.png)

- Com en el cas del LED estàndar que hem fet servir a la pràctiques anteriors, la connectarem un pin digital seguint el mateix codi de color dels cables.

- Es podem connectar vàries tires, fins a un màxim de 40 LEDs totalment il.luminats en color blanc (10mA per LED).

#### Inicialització

- Per fer servir qualsevol tira de NeoPíxels (ja sigui integrada o externa) necessitarem la llibreria **NeoPíxels**.

![Llibreria NeoPíxels](cm06-02-llibreria-neopixel.png)

- Abans de començar a programar amb ella, hem d’indicar el pin on està connectada amb el bloc **inicialitza tira de _ NeoPíxels al pin _**. 

- Per comprovar que funciona, podem fer servir el bloc **posa tots els NeoPíxels de color _**.

![Blocs bàsics llibreria NeoPíxels](cm06-03-blocs-neopixels-basics.png)

#### Programant els LEDs

- A més de l’anterior, tenim diferents blocs disponibles per operar amb els LEDs:

  - **posa NeoPíxel _ de color _**: encèn un LED especificant el color.
  - **rota NeoPíxel en _**: rota les posicions dels colors de tots els LEDs.
  - **color r _ g _ b _ (0-255)**: obtenir un color especificant els valors RGB (Vermell-Verd-Blau).
  - **color a l’atzar**: obtenir un color aleatori.

![Més blocs llibreria NeoPíxels](cm06-04-blocs-neopixels-mes.png)

| ![Exemple semàfor](cm06-05-semafor-blocs.png) | ![Exemple semàfor resultat](cm06-06-semafor-real.png) |
| -------------------------------------------------- | ---------------------------------------------------------- |

#### Efectes d’il·luminació

- Amb l’ajuda dels bucles podem fer diferents efectes d’il·luminació.

- Fent servir el bloc **  **per cada _ en _** de la categoria **control**, podem “recòrrer” la tira de LEDs utilitzant la variable i per apuntar al LED que toca il·luminar en cada moment.

![NeoPíxels exemple 1](cm06-07-neopixels-efecte1.png)

- Per apagar un LED n’hi ha prou amb assignar-li el color negre.

- Cal recordar fer servir el bloc d’**espera _ mi·lisegons** per poder visualitzar-ho bé!

##### Repte 1: prova d’invertir l’ordre en el que s’apaguen els LEDs a l’exemple anterior

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm06-s1.png)


</details>

#### Control del LED a encendre

- Podem provar a manipular el LEDs que volem il·luminar amb un potenciòmetre. Per a això caldra mapejar el valor que obtenim d’aquest per obtenir el número de LED a encendre.

- En el nostre cas haurem de fer servir un factor de 10, ja que és el número de LEDs que té la nostra tira de NeoPíxels.

![Barra de LEDs 1](cm06-08-barra1.png)

- És recomanable crear una variable per guardar el número de LED per entendre millor el programa

#### Apagar els LEDs

- Veurem que els LEDs una vegada encesos no s’apaguen, a menys de que tornem a executar el programa.

- Si volem que els LEDs s’apaguin progressivament de la mateixa manera que s’encenen, caldrà apagar els LEDs que estiguin “per sobre” del que control·lem amb el potenciòmetre.

- És a dir, caldrà recorrer la tira de LEDs amb un **per cada _ en _** i comprovar amb un **si _ si no** si cal encendre’ls o apagar-los.

![Barra de LEDs 2](cm06-09-barra2.png)

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-05-ca) | [Activitat següent ➡️](../citilab-course-07-ca) |
|--|--|

[[/fact]]
