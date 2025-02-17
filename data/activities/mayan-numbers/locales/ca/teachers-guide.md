### El perquè dels sistemes numèrics

#### Comptar amb línies

El sistema de comptatge més simple possible en el qual podem pensar és simplement dibuixar línies per representar quantitats. És a dir, per representar el nombre *tres*, dibuixaríem *|||*.

És bastant clar que, fins i tot per representar nombres relativament petits, aquest *sistema unari* no funciona massa bé, com s'il·lustra en aquesta representació del nombre *vint-i-dos*:

||||||||||||||||||||||

Tingueu en compte que, si ja es triga força temps a llegir aquesta petita quantitat, imagineu-vos haver de comptar nombres més grans que cent amb aquest sistema!

#### Marques de recompte

Agrupar quantitats és una solució òbvia al problema, com fem quan comptem punts en un joc. L'estàndard no escrit diu que agrupem línies per grups de cinc, ja que són fàcils d'identificar a simple vista. Així, el nombre *vint-i-dos* s'escriuria de la següent manera:

~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ||

Però aquest sistema falla ràpidament quan el nombre a representar es fa només una mica més gran. Així és com s'escriu *cent setanta-tres*:

~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ ~~||||~~ |||

Pots comprovar d'un sol cop d'ull si la quantitat és correcte?

#### Nombres romans

Els romans també es van enfrontar a aquest problema, i van decidir abordar-lo (de forma bastant ineficient) utilitzant molts símbols per a grups de diferents mides. També van establir un conjunt de regles segons les quals un dígit afegiria o restaria el seu valor del total depenent d'on estigués situat. Van arribar molt lluny amb aquest sistema, i es poden representar fàcilment quantitats raonablement grans utilitzant nombres romans. Per exemple, aquest és el número *cent setanta-tres*, tal com l'hauria escrit Espàrtac:

CLXXIII

No obstant això, el sistema romà també tenia les seves limitacions. Entre altres problemes, un d'especialment molest era que els nombres superiors a *tres mil nou-cents noranta-nou* simplement no es podien escriure. Hi havia moltes extensions al sistema per evitar aquest problema, però cap d'elles es va estandarditzar.

Això, en sí mateix, era un problema, però encara que una d'aquestes extensions hagués estat adoptada per tot l'imperi no hauria resolt altres problemes com la dificultat de realitzar operacions matemàtiques relativament senzilles com ara sumar, restar, multiplicar o dividir dos números.

#### El sistema numèric hindú-àrab

Els hindús van tenir dues idees brillants. La primera va ser assignar valors diferents al mateix símbol depenent de la seva posició, de manera que mai es quedessin sense símbols i, al mateix temps, es poguessin reconèixer d'un cop d'ull quantitats considerables. La segona idea brillant va ser que un d'aquests símbols representés la quantitat *zero*, obrint així la porta a càlculs complexos.

El sistema de numeració hindú-àrab que utilitzem habitualment consisteix en deu dígits que van de 0 a 9. Investiguem com combinem els dígits en el sistema de numeració àrab per formar nombres arbitràriament grans amb només deu símbols.

Comptar fins a nou és trivial, ja que només cal escriure el dígit que correspon al nombre (*0* per a zero, *1* per a un, *2* per a dos...). Quan arribem a *9* i volem comptar un més, utilitzem un dígit *1* per representar quants grups de *deu unitats* tenim, i un dígit *0* per representar quants grups d'*una unitat* tenim.

En altres paraules, *10* significa *1 grup de deu, més 0 grups d'un*.

Això continua per sempre. La representació de *tres-cents quaranta-dos*, es fa combinant els dígits *3*, *2* i *4*, i significa:

*3 grups de cent, més 2 grups de deu, més 4 grups d'un*.

Aquest sistema es diu que és un *sistema de base 10 posicional*, ja que té deu símbols i el seu valor real depèn de la seva posició. És a dir, el dígit *5* pot significar *cinc* si està en la posició de les unitats, però també pot significar *cinquanta* si està en la posició de les desenes, o fins i tot *5 milions* si està en la setena posició de la dreta.

#### Numeració maia

Els maies també van tenir les mateixes dues idees brillants un munt de segles abans, però amb una petita diferència. Mentre que els hindús utilitzaven deu dígits, presumiblement perquè els basaven en el nombre de dits de les mans, els maies utilitzaven vint dígits.

Fem una ullada a aquests dígits:

![Els dígits maies](../maya-digits.png)

El primer dígit a la part superior esquerra de la quadrícula representa el *zero*. Probablement, es tracta d'alguna mena de closca buida. A la seva dreta, trobem dígits creixents d'*un* a *quatre*. Després de *quatre*, s'utilitza una línia horitzontal per a representar un grup de *cinc*, i després es continua afegint punts per a representar el *sis*, el *set*, el *vuit* i el *nou*.

Dues línies horitzontals fan dos grups de *cinc*, és a dir, *deu*, després dels quals es segueixen afegint punts.

Això continua fins al dígit *dinou*.

Si volguéssim representar *vint*, hauríem d'utilitzar el dígit *un* per a representar un sol grup de *vint*, i un dígit *zero* per a representar *zero* grups d'*uns*, com aquest: ![](../1.png) ![](./0.png).

Igual que en el sistema hindú-àrab les posicions representaven grups de deu exponencialment més grans (1, 10, 100, 1000...), en els números maies representen grups de vint exponencialment més grans (1, 20, 400, 8000...).

Per a representar, per exemple, cent, faríem *cinc grups de vint*, i *zero grups d'un*, és a dir: ![](../5.png) ![](../0.png).

A continuació teniu una taula amb la representació d'uns quants nombres en notació maia:

| Quantitat | Maia | Hindú-àrab |
|--|--|--|
|*tretze*             | ![](../13.png) | 13 |
|*vint*               | ![](../1.png) ![](../0.png) | 20 |
|*trenta-sis*         | ![](../1.png) ![](../16.png) | 36 |
|*cent*               | ![](../5.png) ![](../0.png) | 100 |
|*dos mil vint-i-dos* | ![](../5.png) ![](../1.png) ![](../2.png) | 2022 |

[[fact]]
Es diu que aquest sistema és un *sistema posicional de base 20*, ja que té vint símbols el valor dels quals depèn de la seva posició. A més, és especialment interessant perquè els dígits, individualment, segueixen un sistema de base-5 basat en punts i línies.
[[/fact]]

Els estudiants ara poden intentar disseccionar aquestes quantitats en els seus respectius grups d'*unitats*, grups de *vint* i grups de *quatre-cents*, i també intentar escriure quantitats arbitràries en el sistema maia, com el seu dia, mes i any de naixement.

Com serien les sumes i les restes utilitzant aquest sistema?

#### Altres sistemes

Els alumnes podrien intentar crear el seu propi sistema de numeració basat en diferents quantitats de símbols. Per exemple, configureu un sistema de nombres que només tingui quatre dígits (per exemple *+*,*-*,*x*,*o*), o potser fins i tot un sistema de nombres amb només dos dígits (per exemple *o* i *x*).

Podeu animar-los a ser creatius amb els seus símbols de dígits i utilitzar caràcters inventats. L'ús de símbols diferents als del sistema hindú-àrab ajudarà a abstraure la noció de sistema numèric.

Feu que els vostres alumnes intentin endevinar els valors de nombres escrits aleatòriament en aquests sistemes que han creat, i que intentin trobar una manera de representar *qualsevol quantitat* en aquests sistemes.

És necessari tenir un dígit que representi *zero*? Què passa si no es disposa d'aquest dígit?
