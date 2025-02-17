[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Alarma d'aparcament

#### Sensor distància VL53L0X

- En aquest exemple treballarem amb un sensor de distància, amb un rang de mesura entre 2 i 50 cm.

- Es tracta d’un sensor que mesura el temps que triga un làser a rebotar a la superfície a mesurar (Time of Flight TOF).

- És un sensor digital, i es connecta mitjançat el bus sèrie  I²C . La connexió  I²C necessita 4 cables, dos per l’alimentació i dos per enviament i recepció de senyals.

![Sensor distància VL53L0X](cm08-01-sensor_front.png)

#### Connexió sensor distància (I²C)

- El sensor porta un connector *Groove* i és necessari una adaptador per la ED1.

- El negre correspon amb el GND (Ground).

- El vermell correspon als 5V (és important no creuar el GND i el 5V ja que es pot fer malbé el sensor o la placa.

- Les altres connexions es representen amb colors blanc i groc. En el cas dels adaptadors que s'indiquen el blanc va al connector SDA de l’ED1 i el groc al conector SDL (queden creuats en relació als colors dibuixats al sensor).

| ![Connector Groove](cm08-02-sensor_back.png) | ![Pins I²C ED1](cm08-03-ed1.png)               |
| ------------------------------------------------- | --------------------------------------------------- |
| ![Cables Dupont-Groove](cm08-04-wires.png)   | ![Connexió amb la ED1](cm08-05-connection.png) |

#### Llibreria VL53L0X

- La llibreria per aquest sensor es troba a la categoria Sensing amb el nom VL53L0X.

![Llibreria VL53L0X](cm08-06-library.png)

- Només afegeix 2 blocs un que retorna la distància en mil·límetres i altre que ens diu si el sensor està connectat.

![Blocs VL53L0X](cm08-07-blocks.png)

##### Repte 1: fes un programa que mostri la distància en mm per pantalla

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm08-s1.png)


</details>

#### Llibreria Tons

- MicroBlocks incorpora una llibreria per targetes que suporten la generació de sons. Es tracta de la llibreria **Tone**. En el cas de l’ED1 es carrega automàticament.

![Blocs llibreria tons](cm08-08-tone_blocks.png)

- El bloc bàsic és **toca la freqüència _ durant _ ms** que fa sonar durant el temps especificat, un to a la freqüència indicada.

![Bloc toca freqüència](cm08-s2.png)

- Els valors que pot reproduir el mini altaveu de l’ED1 estan entre **100 i 10.000 Hz**. Els màxims perceptibles per l'oïda humana estan entre **20-20.000 Hz**.

#### Reproduïr notes amb la ED1

- El bloc **toca la nota _ a l’octava _ durant _ ms** permet tocar notes musicals tant en notació anglosaxona com europea.

| ![Notació anglosaxona](cm08-s3a.png) | ![Notació europea](cm08-s3b.png) |
| ----------------------------------------- | ------------------------------------- |

![Notació de notes](cm08-09-notes_notation.png)

- A la carpeta **Music** dels exemples, es poden trobar varis projectes que reprodueixen melodies.

- La llibreria **Ringtone** permet reproduir melodies en format RTTTL de Nokia. Exemples [1](https://www.vex.net/~lawrence/ringtones.html).

#### Sensor d'aparcament

- Els sensor d’aparcament de marxa enrere, mesuren la distància i generen senyals visuals i acústiques per advertir de la proximitat d’un obstacle.

![Semàfor](cm08-10-semaphor.png)

- El nostre sensor no detecta distàncies molt curtes ni molt llargues (2-100 cm) i, per tant, l'haurem de tenir en compte en el nostre codi.

- Podem definir condicions múltiples amb els operadors  **_ i _**  i **_ o _**.

![Bloc distancia](cm08-s4.png)

##### Repte 2: fes un sensor d’aparcament visual i sonor

![Challenge 2](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 2](cm08-s5.png)



</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-07-ca) | [Activitat següent ➡️](../citilab-course-09-ca) |
|--|--|

[[/fact]]
