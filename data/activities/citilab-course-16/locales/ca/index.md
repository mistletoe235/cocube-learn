[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Control remot del robot Fantàstic amb infraroig

#### Comunicació per infrarrojos

- En aquesta unitat veurem com control·lar el robot de manera inal·làmbrica fent servir tecnologia infrarroja .

- Aquesta tecnologia es basa en l'enviament d'ones infrarroges entre dos LEDs (un d'emisor i un de receptor).

- Com la placa ED1 té incorporat un receptor d’infrarrojos, podem fer servir qualsevol comandament de televisió o un de genèric per enviar-li ordres.

| ![Mandos de TV](cm16-01-tv_remotes.png) | ![Mando de electrónica](cm16-02-electronics_remote.png) |
| -------------------------------------------- | ------------------------------------------------------------ |

#### Llibreria infrarrojos

- Per tal de poder fer servir el receptor d’infrarrojos de la placa cal importar la llibreria **Infraroigs** que hi ha sota la carpeta **Other**.

![Llibreria Infrarojos](cm16-03-ir_remote_library.png)

- Encara que hi ha un bloc per inicialitzar el receptor en el nostre cas no fa falta, ja que el bloc per rebre codis ho calcula automàticament. Només seria necessari en cas de tenir una altra placa i un receptor extern.

- Per rebre codis només cal fer servir el bloc corresponent i prèmer un botó del comandament per provar si funciona.

![Bloc per rebre codi](cm16-04-receive_ir_code.png)

##### Repte 1: fes un programa que mogui el robot amb el comandament.



![Challenge accepted" alt="" data-align="center](cm-challenge.png)



<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm16-s1.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-15-ca) | [Activitat següent ➡️](../citilab-course-17-ca) |
|--|--|

[[/fact]]
