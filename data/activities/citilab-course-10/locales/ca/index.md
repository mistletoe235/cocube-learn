[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Persiana controlada amb botons

#### Motors de corrent continu

- Els motors de corrent continu fan servir corrent elèctric continu. Aquests motors també són coneguts per motors **CC**, de **c**orrent **c**ontinu, que en anglès és **d**irect **c**urrent, d’on ve l’anglès motors **DC**.

- Els motors que fan servir corrent altern, en català, es diuen també motors **CA** i en anglès motors **AC**, de l'anglès **a**lternating **c**urrent).

![Motors DC](cm10-01-dc_motors.png)

![Motors AC](cm10-02-ac_motors.png)

#### Servomotors

- Un servomotor és un motor de corrent continu (DC) al que, gràcies a una petita placa electrònica i un conjunt d’engranatges, es pot controlar el seu comportament.

- Encara que hi ha diferents tipus de servomotors la manera de controlar-los es la mateixa: mitjançant un pols elèctric amb una durada determinada.

- Depenent de la duració d’aquest pols el servomotors girarà cap un angle determinat (estàndar) o girarà continuament cap a un costat o cap un altre (rotació contínua).

![Servomotor](cm10-03-servomotor.png)

![Parts servomotor](cm10-04-servomotor_parts.png)

#### Servomotors d'angle

- Aquest servomotors consumeixen uns 100-200 mA i poden arribar als 500mA en el moment de posada en marxa o canvi de sentit. S’ha d’evitar donar ordres als motors mentres estan girant.

- El servomotors es poden connectar a qualsevol de les sortides digitals, tot i que D1 i D2 donen 3,3V i per tant el servomotor funciona amb menys força, mentres que D3 i D4 funcionen a 5V. La sortida D4 està connectada internament a l’altaveu i es poden produir petits sorolls.

- **Important! En cas de fer servir les sortides 3 i 4 en una ED1 anterior a la versió 2.3 es recomana fer-ho amb bateria i amb l'interruptor en "ON"**.

![Connexió amb l'ED1](cm10-05-connection_ed1.png)

![Consum](cm10-06-consumption.png)

#### Servomotors d'angle

- Els servomotors estàndar o d’angle es mouen un angle concret entre 2 valors. El més típic es es SG90 que es mou entre 0 i 180º, trigant uns 150ms en fer aquest angle. Aquest motor no dóna voltes!

- Ve acompanyat amb una serie de complements que permeten connectar amb engranatges o estirar d’altres elements.

- Els servomotors d’angle que farem servir són els SG90, un model petit i molt asequible econòmicament.

![Servomotor d'angle](cm10-07-servomotor_angle.png)

![Ull animatrònic](cm10-08-animatronic_eye.png)

#### Control de l'angle per ample de pols

- Per establir l’angle s’envia un pols cada 20 ms. Segons la durada del pols el servo canvia l’angle. Es tracta d’una modulació per amplada de pols (**PWM** en anglès).

- Si la durada és aproximadament  1 ms el servo es coloca en un angle 0º i si es 2ms a 180º.

- Una vegada establert l’angle, el servomotor no es mou encara que enviem més polsos.

![Amples de pols](cm10-09-pulse_widths.png)

##### Repte 1: fes un programa que faci que el servo es mogui d’un angle a un altre, alternativament

![Challege 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm10-s1.png)


</details>

#### Llibreria servos

- Per treballar amb servomotors és més pràctic fer servir la llibreria **Servo**.

![Llibreria servos](cm10-10-servo_library.png)

- El bloc **posa el servo _ a _ graus (-90 a 90)** es fa servir amb els motors d’angle, en canvi el de **fes girar el servo _ a velocitat _ (-100 a 100)** s'utilitza amb els motors de rotació contínua.

![Blocs servos](cm10-11-servo_blocks.png)

##### Repte 2: controla un motor de rotació continua amb el botó amunt i avall

![Challege 2](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 2](cm10-s3.png)


</details>

#### Domòtica

- Aplicació de diferents tecnologies a la millora de la vivienda, especialment per la millora de l'eficiència energètica.

- També es pot aplicar a la millora de escoles, edificis públics o fins i tot a les ciutats.

- Com exemple farem una persiana que es controli amb el nivel de llum i un sistema d’iluminació que es posi en marxa picant de mans.

![Domòtica](cm10-13-domotics.png)

#### Simulació persiana

- Farem servir un senzill dibuix a la pantalla per simular una persiana, l'alçada de la qual variarà segons el valor de la variable **y**.

- En un cas real hauriem de fer servir interruptors de final de cursa que ens indiquen que la persiana ha arribat als límits superior i inferior. Aquí aquest control el farem per programa mitjançant el valor de la variable (0 = superior, 128 = inferior).

![Programa persiana](cm10-s4.png)

##### Repte 3: simula una persiana (amb la pantalla i el servomotor) controlada per els botons amunt i avall.

![Challege 3](cm-challenge.png)

<details>
  <summary>Solució al repte 3</summary>
    

![Solució repte 3](cm10-s5.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-09-ca) | [Activitat següent ➡️](../citilab-course-11-ca) |
|--|--|

[[/fact]]
