[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Visualitza el volum del so

#### Gradient de colors

- En aquesta unitat farem una barra de colors, per representar el volum del so. La tira de Neopíxels s'anirà il·luminant del verd al vermell, tot passant pel groc.

- Una manera de fer això seria comprovar el número de LED i assignar-li un color específic, però és un mètode poc eficient i gens escalable.

- És possible obtenir un color (o més aviat, els valors RGB d’aquest) a partir d’un sol valor fent servir un bloc disponible a la llibreria **Graphics > HSV Colors**.

![Llibreria HSV](cm07-01-llibreria-hsv.png)

![Bloc HSV](cm07-02-bloc-hsv.png)

#### HSV a RGB

- Aquest bloc ens permet obtenir un color especificant el **matís o to** (hue), **saturació** (saturation) i **brillantor o valor** (value).

- Si fixem els valors de saturació i brillantor al màxim (100) només cal que variem el matís (H) de 0 a 360 per obtenir qualsevol color.

  | ![Model HSV 1](cm07-03-hsv-model1.png) | ![Model HSV 2](cm07-04-hsv-model2.png) |
  | ---------------------------------------------- | ---------------------------------------------- |

- El resultat que obtenim és una llista amb els valors RGB del color. Els valors de saturació i brillantor definiran respectivament el valor mínim i màxim que poden obtenir aquests.

![HSV Exemple 1](cm07-05-hsv-e1.png)
![HSV Exemple 2](cm07-06-hsv-e2.png)
![HSV Exemple 3](cm07-07-hsv-e3.png)

##### Repte 1: troba el rang de valors per passar de vermell a verd

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm07-s1a.png)

<br>
    <b>Verd</b><br>
    

![Solució repte 1](cm07-s1b.png)

<br>
    <b>Groc</b><br>
    

![Solució repte 1 ](cm07-s1c.png)

<br>
    <b>Vermell</b>
</details>

#### Obtenir color desde valors RGB

Una vegada tenim la llista de valors RGB d’un color haurem d’extreure’ls un a un fent servir el bloc **element _ de _** que tenim a **Dades**.



![Element 1 (R)](cm07-08-element1.png)




![Element 2 (G)](cm07-09-element2.png)




![Element 3 (B)](cm07-10-element3.png)



Després utilitzarem el bloc que ens permet obtenir el valor numèric d’un color fent servir els seus valors RGB.

![Color del valors RGB](cm07-11-color-elements.png)

#### Creació de blocs

- Tot i que el bloc que hem format abans es pot col·locar a dins del que encèn el NeoPíxel, visualment és una mica aparatós.

- Per a sol·lucionar això podem mirar de crear un bloc on aquest procés d’obtenció del color quedi amagat anant a **Els meus blocs** i fent clic a Crea un bloc reportador.

![Creació de bloc, pas 1](cm07-12-bloc-nou1.png)
![Creació de bloc, pas 2](cm07-13-bloc-nou2.png)

- Després de posar-li nom (per exemple “**color amb matís _**”) veurem que apareix el bloc sota el botó anterior a més de la definició d’aquest. El guió baix es a servir per indicar que cal un paràmetre.

![Creació de bloc, pas 3](cm07-14-bloc-nou3.png)
![Creació de bloc, pas 4](cm07-15-bloc-nou4.png)

- Clicarem al nom de la variable args per canviar-li el nom i a la fletxa del costat per configurar el tipus de dada que rebrà (nombre/text, booleà o color)

![Creació de bloc, pas 5](cm07-16-bloc-nou5.png)

- Ara ficarem a sota de la definició el bloc que hem format abans per obtenir el color. Necessitarem el bloc **retorna _** que tenim a la categoria **Control**.

- Després arrossegarem la variable a la primera ranura dels blocs **RGB amb to _** per passar-li el valor que introduïrem.

![Creació del bloc RGB amb to _](cm07-17-bloc-nou-final.png)

#### Aplicació del bloc nou

- Només queda fer servir aquest bloc en el programa de la unitat anterior, per tal d’obtenir el gradient de colors.

- Com que rang que volem és des de 0 fins a 120 i tenim 10 LEDs, haurem de fer servir un factor de 12.

![Gradient de colors](cm07-18-gradient.png)

- Però, l’ordre dels colors és el correcte?

##### Repte 2: inverteix l’ordre del gradient per a que comenci en verd i acabi en vermell

![Challenge 2](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 2](cm07-s2.png)


</details>

#### Micròfon

- Ara canviarem el potenciòmetre per un micròfon, de manera que el volum del so que rebrà el veurem reflectit en el número de NeoPíxels il·luminats.

- Per fer servir el micròfon haurem d’obrir la llibreria Sensing > Microphone.ubl

![Llibreria micròfon](cm07-19-llibreria-microfon.png)

![Connexió micrófon](cm07-20-microfon-connexio.jpg)

#### Últims passos

- Finalment, només cal fer servir el bloc **volum** per captar el nivell del so que rep el micròfon.

- Podem “controlar” el nivell de sensibilitat d’aquest reduïnt el factor de divisió de 1023 a un valor més petit, per exemple a la meitat.

![Volum del so](cm07-21-volum-so.png)

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-06-ca) | [Activitat següent ➡️](../citilab-course-08-ca) |
|--|--|

[[/fact]]
