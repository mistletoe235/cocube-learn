[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!
[[/fact]]

### Theremin

#### Theremin

* El [Theremin](https://ca.wikipedia.org/wiki/Theremin) és un instrument musical electrònic que es toca amb les mans però sense contacte.
* El to de l’instrument varia en funció de la distància a la mà. Amb l’altra mà es regula el volum.

[![Sheldon's Theremin](https://img.youtube.com/vi/_YYABE0R3uA/0.jpg)](https://www.youtube.com/watch?v=_YYABE0R3uA)

#### Theremin sense control de volum

* A partir de la versió 2.2 de la placa ED1 es pot connectar directament al connector Groove I2C.

![Connexió I2C amb connector Groove](cm09-01-i2c-groove.jpg)

* Farem servir el bloc del toca la **freqüència \_ durant \_**, adaptant els valor de distància (0-500) als de freqüència (100-5000).

![Theremin simple amb control de volum](cm09-02-theremin1.png)

* Notarem que el so no és continu, ja que el sensor triga temps a fer la lectura. Per solucionar-lo cal fer dos programes separats, un que faci la lectura i un altre que reprodueixi el so.

##### Repte 1: fes un Theremin, sense control de volum, amb el sensor de distància.

![Challege 1](cm-challenge.png)

<details> <summary>Solució al repte 1</summary> 

![Solució repte 1](cm09-s1.png)

 </details>

#### Theremin amb control de volum

* Per ajustar el volum del to generat podem fer servir la llibreria **System -> soundsPrims**.
* Amb el bloc **DAC write \_** podem generar una ona de la freqüència desitjada i amb segons els valors el volum canvia.
* Podem connectar un potenciòmetre al pin analògic 1 per controlar el volum.

![Theremin amb control de volum](cm09-03-theremin2.png)

[[fact]]
Aquesta activitat forma part del [Curs del Citilab](../citilab-course-ca). Fes-li una ullada!

| [⬅️ Activitat anterior](../citilab-course-08-ca) | [Activitat següent ➡️](../citilab-course-10-ca) |
|--|--|

[[/fact]]
