[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Control remot del robot Fantàstic amb Wifi

#### Connexió WiFi

- Per connectar la placa a una xarxa WiFi o crear-ne una de pròpia, cal importar la llibreria **WiFi** que està a dintre de la carpeta **Network**.

![Llibreria WiFi](cm17-01-llibreria-wifi.png)

- Una vegada oberta la llibreria, farem servir el bloc corresponent per connectar a una xarxa wifi introduïnt tant el nom d’aquesta com la contrasenya.

![Bloc connectar a la WiFi](cm17-02-bloc-connectar.png)

- Si volem veure l’adreça IP que assigna la xarxa a la placa, podem fer servir el bloc d’adreça IP.

![Bloc adreça IP](cm17-03-bloc-ip.png)

##### Repte 1:  fes un programa que mostri l’adreça IP a la pantalla



![Challenge accepted" alt="" data-align="center](cm-challenge.png)



<details>
  <summary>Solució al repte 1</summary>
    

![Solució repte 1](cm17-s1.png)


</details>

#### Servidor web

-Per posar en marxa un servidor web, cal importar la llibreria **Servidor HTTP** que està també a la carpeta **Network**.

![Llibreria Servidor HTTP](cm17-04-llibreria-server.png)

- Els blocs bàsics per poder gestionar les peticions al servidor com per enviar respostes són els de “sol·licitud HTTP al servidor”, “camí de la sol·licitud []” i “respon [] a la sol·licitud HTTP”.

![Blocs servidor HTTP](cm17-05-blocs-server.png)

#### Rebre peticions

- Quan un client es connecta al servidor HTTP, la seva sol·licitud queda registrada en el bloc “**sol·licitud HTTP ...**”.

- Com en realitat són cadenes de text, una manera de veure si hi ha una sol·licitud o no o és comprovar que aquest bloc dóna un resultat buit.

![Rebre peticions 1](cm17-06-peticions1.png)

En cas de voler respondre també amb un text cal clicar a la fletxa que hi ha al bloc de “**respon …**” i a continuació canviar el text del contingut.

![Rebre peticions 2](cm17-07-peticions2.png)

![Rebre peticions 3](cm17-08-peticions3.png)

##### Repte 2: posa en marxa un servidor web a la placa que respongui un text a qualsevol sol·licitud



![Challenge accepted" alt="" data-align="center](cm-challenge.png)



<details>
  <summary>Solució al repte 2</summary>
    

![Solució repte 2](cm17-s2.png)


</details>

#### Camí de sol·licitud

- Per a que un servidor web faci accions diferents segons la sol·licitud rebuda s’utilitzen les rutes o **camins**.

![Camins 1](cm17-09-camins1.png)

- El camí d’una petició web és el text que posem darrera del nom d’una adreça IP o domini web a la barra del navegador, inclosa la barra (/).

![Camins 2](cm17-10-camins2.png)

- És important saber que el bloc de “sol·licitud …” es buida cada vegada que es fa servir, de manera que cal guardar el seu resultat per poder treballar amb aquesta (per exemple amb una variable).

![Camins 3](cm17-11-camins3.png)
![Camins 4](cm17-12-camins4.png)

##### Repte 3: fes un servidor web que actui com un “eco”, tot contestant el mateix text del camí



![Challenge accepted" alt="" data-align="center](cm-challenge.png)



<details>
  <summary>Solució al repte 3</summary>
    

![Solució repte 3](cm17-s3.png)


</details>

#### Gestionar sol·licituds

- Ara que sabem com identificar el camí utilitzat a la sol·licitud podem fer que la placa faci coses a més de respondre via web.

- Per exemple podem encendre o apagar el LED integrat de la placa enviant especificant les ordres “on” i “off” mitjançant el camí a la sol·licitud.

- És important afegir un bloc que **respongui alguna cosa per defecte** en cas de no fer servir cap dels camins establerts, ja que si no el navegador es quedarà penjat esperant una resposta.

![LED controlad amb HTTP](cm17-13-led-server.png)

##### Repte 4:  fes que el robot es mogui enviant-li les ordres a través del navegador



![Challenge accepted" alt="" data-align="center](cm-challenge.png)



<details>
  <summary>Solució al repte 4</summary>
    

![Solució repte 4](cm17-s4.png)


</details>

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-16-ca) | [Activitat següent ➡️](../citilab-course-18-ca) |
|--|--|

[[/fact]]
