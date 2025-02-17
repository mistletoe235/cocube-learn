[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Robot Fantàstic amb memòria

#### Llistes

- Per fer que el robot pugui reproduir unes quantes ordres seguides és necessari guardar-les prèviament.

- Ja hem fet servir variables per guardar nombres o textos. En aquest cas farem servir una per guardar una **llista** d'ordres.

- Les llistes permeten guardar un conjunt de dades a les quals podem accedir de forma individual.

- Per manipular les llistes es fan servir els blocs de la categoria **Dades**.

![Bloc de llista](cm15-01-lists.png)

![Entrades de llista](cm15-02-list_inputs.png)

![Element d'una llista](cm15-03-item_from_list.png)

#### Guardar i eliminar ordres

- El bloc **afegeix _ a la llista _** permet afegir elements a una llista, en canvi amb el bloc **elimina l’element _ de la llista _** es pot eliminar un o bé tots els elements de la llista.

- El nostre robot haurà de buidar la llista d'ordres en començar o quan premem el botó **X**. Això es pot fer guardant una llista buida a la variable o bé fer servir el bloc d'eliminar elements amb l'**opció** tots seleccionada.

- Cada botó de moviment guardarà un identificador de l’ordre corresponent. L’**espera de 500 mil·lisegons** evita que s’afegeixin moltes ordres quan es prem un botó.

![Inicialitzar llista d'ordres](cm15-s1.png)

![Eliminar ordres](cm15-s2.png)

![Afegir ordre](cm15-s3.png)

#### Seleccionar i executar ordres

- A la llista ordres tenim la seqüencia de moviments que volem que el robot executi.

![Variable amb llista d'ordres](cm15-04-orders.png)

- Per accedir a una ordre es fa servir el bloc **element _ de la llista _**.

![Accedir a un element](cm15-05-get_order.png)

- El bloc de control **per cada *i* en _** permet recòrrer la llista. El valor de ***i*** correspon a cadascun dels elements o ordres guardades.

![Afegir ordre](cm15-s4.png)

- Només queda moure els motors en funció de les ordres de la llista amb el **botó OK**.

##### Repte 1: programeu el robot amb memòria.

![Challenge 1](cm-challenge.png)

<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 1](cm15-s5.png)


</details>

#### Robot ED1 infantil

- El programa que es fa servir a les escoles amb el robot Fantàstic afegeix sons i imatges a la pantalla per millorar la interactivitat.

- El podeu descarregar des d'[aquí](https://cloud.citilab.eu/s/CK6ErCf6BdZEbtC).

![Programa ED1 Robot infantil](cm15-s6.png)

[![ED1 Robot infantil](https://img.youtube.com/vi/ZGvE_8RV73w/0.jpg)](https://www.youtube.com/watch?v=ZGvE_8RV73w)

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-14-ca) | [Activitat següent ➡️](../citilab-course-16-ca) |
|--|--|

[[/fact]]
