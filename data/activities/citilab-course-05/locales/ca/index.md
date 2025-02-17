[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Jugant amb LEDs

#### LED

- Un LED (Light Emitting Diode) és un dispositiu que emet llum en ser travessat per un corrent elèctric.

- ![LED](cm05-01-led.png)

- Hi ha diversos tipus de LEDs, amb diferents mides i colors. Inclús també n’hi ha que poden il·luminar-se amb qualsevol color (RGB).

- També existeixen tires de LEDs RGB que es fan servir molt per domòtica i per il·luminació de llocs públics.

  | ![Diversos LEDs](cm05-02-led-colors.png) | ![LED RGB](cm05-03-led-rgb.png) |
  | --------------------------------------------- | ------------------------------------ |

#### Connexió del LED

- Per connectar el LED a la placa es fa de manera similar al potenciòmetre, però en aquest cas farem servir els pins digitals en comptes dels analògics.

![Connexió del LED](cm05-05-led-connexio.png)

- Cal respectar els colors dels cables i els pins, si no el LED no s’encendrà.

- Per provar com s’encen i s’apaga, farem servir el bloc **posa el pin digital _ a _**, tot canviant l’estat de l’interruptor lògic.

![Bloc posa el pin digital](cm05-06-bloc-digital.png)

##### Repte 1: prova de fer apart un programa que faci l’efecte de parpelleig (blink) amb el LED

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm05-s1.png)


</details>

##### Repte 2: fes que l’efecte de parpelleig sigui més ràpid o més lent depenent del valor llegit del potenciòmetre

![Challenge 2](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 2](cm05-s2.png)


</details>

#### Control de brillantor

- MicroBlocks permet fer servir valors analògics en pins digitals, per lo que podrem manipular el nivell de llum que emet el LED.

- Per a això farem servir el bloc **posa el pin _ a _** que trobarem a la categoria Pins.

![Bloc posa el pin analògic](cm05-07-bloc-analogic.png)

- Com el rang de valors és el mateix a les entrades com a les sortides analògiques, podem ficar directament el bloc de lectura analògica a dins de l’anterior.

![Exemple pin analogic](cm05-08-exemple-analogic.png)

##### Repte 3: fes que el LED s'encengui progressivament, com un far o una alarma visual.

> Pista: fes servir una variable per controlar la **brillantor**.

![Challenge 3](cm-challenge.png)

<details>
  <summary>Solució al repte 3</summary>
    

![Solució repte 3](cm05-s3.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-04-ca) | [Activitat següent ➡️](../citilab-course-06-ca) |
|--|--|

[[/fact]]
