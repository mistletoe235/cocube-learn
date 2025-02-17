[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Eixugaparabrises

#### Motors pas a pas

- Els motors pas pas són un tipus de servomotors que giren un nombre determinat de passos en un sentit o el contrari.

- Tenen molta precisió i versatilitat, ja que poden fer tan angles com donar voltes. Són els motors que fan servir per exemple a les impressores 3D per posicionar el capçal de la impressora.

- Un model típic és el 28BYJ-48. Funciona a 5 Volts i permet fer 512 passos per una volta.

![Motors pas a pas](cm13-01-stepper_motors.png)

![Informació steppers](cm13-02-stepper_motors_info.png)

#### Funcionament dels motors pas a pas

- Aquests motors tenen varis bobinats que es van  activant per aconseguir el moviment rotatori.

![Motors pas a pas](cm13-03-coils.png)

- Per cada bobinat hi ha un cable específic per activar-ho.

- Per fer-los servir es necessita un circuit específic “driver” que apliqui les tensions adequades.

- La placa Citilab ED1, incorpora 2 sortides preparades per aquest tipus de motors.

| ![Connexió steppers ED1](cm13-05-stepper_connection.png) | ![Informació steppers](cm13-04-circuit_scheme.png) |
| ------------------------------------------------------------- | ------------------------------------------------------- |

#### Llibreria "ED1 Stepper Motor"

- Per treballar amb els motors pas a pas 28BYJ-48 cal fer servir la llibreria ED1 Stepper Motor que es troba a la categoria Others.

![Llibreria motors pas a pas](cm13-06-stepper_library.png)

- Hi ha blocs per treballar amb els 2 motors independentment i un específic per moure els dos motors a la vegada.

![Blocs motors pas a pas](cm13-07-stepper_blocks.png)

##### Repte 1: fes un eixugaparabrises amb la velocitat controlada per un potenciòmetre.

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm13-s1.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-12-ca) | [Activitat següent ➡️](../citilab-course-14-ca) |
|--|--|

[[/fact]]
