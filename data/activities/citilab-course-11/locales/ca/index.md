[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Persiana controlada amb llum

#### Blocs propis

- Una vegada fet el control amb els botons es pot canviar per qualsevol altre tipus de sensor, com pot ser un sensor de llum, un comandament, un control per Internet o per aplicació mòbil.

- Afegir un control extra i que sigui compatible amb el control per botons requereix complicar l'estructura del programa. Per això recomanen definir blocs propis que ajudin a simplificar el codi abans de començar aquest procés.

![Blocs propis](cm11-01-blocs-propis1.png)

![Persiana amb botons](cm11-02-base.png)

#### Control ambLaa lectura del sensor s'ha de fer a intervals

- En aquest cas farem servir el bloc **nivell de llum** que trobarem a la categoria **Sensors**.

- La lectura del sensor s'ha de fer amb intervals de temps grans, per donar temps a pujar i abaixar completament la persiana i evitar també canvis mínims en la il·luminació.

- Pot ser interessant definir un bloc per espera minuts en comptes de mil·lisegons.

![Bloc minuts](cm11-03-bloc-minuts.png)

##### Repte 1: completa el projecte de la persiana amb control per teclat i sensor de llum. La persiana s'atura si es prem qualsevol dels dos botons.

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm11-s1.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-10-ca) | [Activitat següent ➡️](../citilab-course-12-ca) |
|--|--|

[[/fact]]
