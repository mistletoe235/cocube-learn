[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Connexió entre MicroBlocks i Snap!

#### Introducció a Snap!

- En aquesta sessió veurem com podem crear un videojoc amb Snap!, un entorn de programació semblant a Scratch que ens permet desenvolupar projectes més complexos.

- La idea serà control·lar-lo mitjançant la placa ED1, a la que li carregarem un programa  anoment **Signada**, per així poder interactuar amb el videojoc creat amb Snap!

- Després a l’Snap! carregarem una llibreria amb el mateix nom que ens permetrà connectar amb la placa i interactuar amb aquesta.

![Joc creat amb Snap!](cm20-01-joc-snap.png)

#### Moviment de la nau

- Tenim disponible una plantilla amb els objectes ja creats en [aquest enllaç](http://extensions.snap.berkeley.edu/snap/snap.html#present:Username=edutec&ProjectName=Asteroids%20-%20Plantilla).

- Començarem programant el moviment de la nau. Com només volem moure-la d’esquerra a dreta, només cal modificar el component x de la seva posició mitjançant el bloc **assigna el valor _ a x** de la categoria Moviment.

![Bloc assigna el valor _ a x](cm20-02-bloc-assigna.png)

- Per provar-ho de moment podem fer servir el ratolí per moure’l, necessitem el bloc **ratolí x** que hi ha a la categoria **Sensors**.

![Bloc ratolí x](cm20-03-bloc-ratolix.png)

##### Repte 1: fes que al començar el joc, la nau segueixi sempre la x del ratolí

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm20-s1.png)


</details>

#### Disparar làser (I)

- Per disparar el làser crearem còpies o “clons” de l’objecte Laser. Per fer això hem de buscar el bloc **crea un clon de _** que tenim a **Control**.

- En comptes de “mi mateix” hem de seleccionar l’objecte **Laser**.

  | ![Bloc crea un clon de _](cm20-04-bloc-clon.png) | ![Crea un clon de làser](cm20-05-bloc-clon-laser.png) |
  | ----------------------------------------------------- | ---------------------------------------------------------- |

- L’acció de disparar la podem fer quan cliquem el ratolí, per lo que haurem de buscar el bloc corresponent a Sensors i fer servir un condicional per executar l’acció.

![Crear clons del làser](cm20-06-laser1.png)

#### Disparar làser (II)

- Per crear còpies del Laser primer el seleccionarem i cercarem el bloc quan una còpia meva comenci. Cal selecionar l'objecte laser per aplicar aquest codi.

![Bloc quan una copia meva comenci](cm20-07-bloc-copia-comenci.png)

-Una vegada es crei la còpia, farem que aquesta vagi a la nau i que a més apunti a la mateixa direcció que aquesta.

![Anar a l'objecte Starship](cm20-08-laser2.png)

- Finalment, farem que es vagi movent fins tocar la vora, on també farem que s’esborri.

![Pujar a fins tocar a la vora](cm20-09-laser3.png)

##### Repte 2: fes que al començar el joc, la nau segueixi sempre la x del ratolí

![Challenge 2](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 2](cm20-s2.png)


</details>

#### Moviment asteroids (I)

- Amb els asteroids farem el mateix, crearem còpies que anirant caient de dalt a baix.

- Per fer això, executarem el bloc de crear clon cada 2 segons (per exemple) des de l’inici.

![Crear clons d'asteroid cada 2 segons](cm20-10-asteroid1.png)

- Un cop creada la còpia, farem que vagi a un punt sobre la vora superior amb una x aleatòria. Per a això necessitarem el bloc nombre a l’atzar entre _ i _ que tenim a Operadors.

![Posicionar l'asteroid a l'atzar](cm20-11-asteroid2.png)

#### Moviment asteroids (II)

- Un cop situada la còpia de l’asteroid, farem que vagi baixant restant-li 1 (o més aviat, sumant -1) a la seva y fent servir el **bloc suma _ a y**.

- A més de caure, podem fer que també vagi girant mitjançant el bloc **gira _ graus**.

- Per fer que la còpia s’esborri en cas de tocar el Laser **o** bé quan la seva **posició y** sigui més baixa de -200, cal fer servir un condicional amb el bloc d’operador **_ o_**.

![Moviment de l'asteroid](cm20-12-asteroid3.png)

##### Repte 3: fes que l’objecte Asteroid s’amagui a l’inici i només es mostri al crear-se la còpia

![Challenge 3](cm-challenge.png)

<details>
  <summary>Solució al repte 3</summary>
    

![Solució repte 3](cm20-s3.png)


</details>

#### Fi de joc (I)

- La idea és que el joc s’acabi un cop la nau col·lisioni amb un asteroid.

- Tot i que aquesta comprovació es pot fer tant en un objecte com l’altre, en aquest exemple ho farem a la nau.

![Fi de joc, envian't missatge i amagant](cm20-13-final1.png)

- L’únic que caldrà fer és que, en cas de tocar l’Asteroid, enviar un missatge de “game over” i que a més amagui la nau (com si l’haguès destruït).

- No oblidem fer que es mostri a l’inici, ja que si no **quedarà amagada**!

#### Fi de joc (II)

- Un cop enviat el missatge, farem que quan el rebi l’objecte Game Over es mostri i aturi el programa mitjançant el bloc **atura tots**.

- A més caldrà amagar-lo a l’inici, ja que si no quedarà visible tota l’estona mentre juguem!

![Game Over](cm20-14-final2.png)

#### Signada MicroBlocks

- Per poder control·lar la nau remotament amb la placa ED1, caldrà carregar un programa en aquesta mitjançant MicroBlocks.

- Aquest programa es troba a la cartpeta **Network** i es diu **Signada (network remote control).**

![Signada MicroBlocks 1](cm20-15-signada1.png)

![Signada MicroBlocks 2](cm20-16-signada2.png)

![Signada MicroBlocks 3](cm20-17-signada3.png)

- Un cop obert, cal ficar les credencials de la xarxa WiFi al bloc indicat.

![Configurar wifi](cm20-18-configurar-wifi.png)

#### Signada (Snap!)

- A Snap! caldrà obrir la llibreria **Signada (control remot per xarxa)**.  

![Signada Snap! 1](cm20-19-snap-signada1.png)

![Signada Snap! 2](cm20-20-snap-signada2.png)

- Un cop oberrta, veurem que s’afegeixen uns quants blocs en algunes categories, per exemple a **Moviment, So, Llapis, Sensors i Variables**.

![Signada Snap! 3](cm20-21-snap-signada3.png)

- En el nostre cas ens interessa sobretot els blocs de les dues últimes categories.

![Signada Snap! 4](cm20-22-snap-signada4.png)

#### Connexió amb placa

Per connectar l’Snap! amb la ED1 caldrà fer servir el bloc connecta’t a _ fent servir la IP que mostra aquesta a la pantalla.

![Connexió amb la placa 1](cm20-23-connexio1.png)

![Connexió amb la placa 2](cm20-24-connexio2.png)

Si la connexió a estat correcta, la pantalla cambiarà mostrant el text “Connected.”.

![Connexió amb la placa 3](cm20-25-connexio3.png)

També podem comprovar l’estat de la connexió a Snap! mitjançant el bloc connectat.

![Connexió amb la placa 4](cm20-26-connexio4.png)

- Un cop connectat ja podem fer els canvis adients per fer servir la placa per control·lar la nau.

- Per exemple, en comptes la posició x del ratolí, farem servir la inclinació en l’eix x de la placa per moure la nau d’un costat a l’altre.

- I per disparar el laser podem fer servir qualsevol el botó OK o l’X.

##### Repte final: completa el joc!

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-19-ca) |
|--|

[[/fact]]
