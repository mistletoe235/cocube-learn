### Introducció

La civilització maia va utilitzar dues representacions diferents per a números. Una d'elles utilitzava representacions molt elaborades i ornamentades de caps de deïtats per representar dígits. S'han trobat en inscripcions en pedra, pintures murals i manuscrits.

![Números maies ornamentals gravats](engraved-numerals.jpg "Números maies ornamentals gravats a Copán, Hondures - CC-BY-2.0 Adalberto Hernandez Vega")

La segona representació numèrica era la que es feia servir habitualment en les activitats diàries i consistia només en punts i línies, a més d'una representació especial pel dígit *zero*. Aquest és el sistema que explorarem en aquesta activitat.

![Nombres escrits maies](written-numbers.jpg)

El sistema de numeració maia utilitzava vint dígits. És a dir, en lloc dels deu dígits que utilitzem (0 a 9), tenien vint símbols que representaven les quantitats de zero a vint.

Donem un cop d'ull a aquests dígits:

![Els dígits maies](maya-digits.png)

El primer dígit a la part superior esquerra de la quadrícula representa el *zero*. A la seva dreta, trobem dígits creixents d'*un* a *quatre*. Després del *quatre*, utilitzem una línia horitzontal per a representar un grup de *cinc*, i després continuem afegint punts per a representar *sis*, *set*, *vuit* i *nou*.

Dues línies horitzontals indiquen dos grups de *cinc*, és a dir, *deu*.
De manera similar, tres línies horitzontals en representen quinze.
Després d'això, continuem afegint punts fins que tenim tres línies i quatre punts, que sumen *dinou*, el dígit més gran.

### Materials necessaris

Per a aquesta activitat només necessiteu una micro:bit, encara que si en tinguéssiu dues podríeu representar quantitats més grans de 20.

### Procediment

Escriurem un programa amb MicroBlocks que utilitzi la matriu de 5x5 leds que té la micro:bit per representar els dígits maies. La fila superior de la matriu representarà els punts, mentre que les tres files inferiors representaran les línies.

![Nombre 17 representat a la matriu de 5x5 leds de la placa micro:bit](microbit-17.png)

#### Dibuixant el zero

El més natural seria crear un nou bloc anomenat *representa dígit maia* al qual se li indica un nombre decimal inferior a 20 i aquest genera la seva representació numèrica maia a la matriu de 5x5 leds.

Per a fer-ho, seleccioneu la categoria *Els meus blocs* i feu clic al botó *Crea un bloc comanda*. Anomeneu el vostre bloc *representa dígit maia* i feu clic a *D'acord*. Això afegirà un bloc de definició a l'àrea de programes:

![Definint el bloc «representa dígit maia»](define-header.png)

Donat que aquest bloc ha de tenir una entrada, farem clic a la petita fletxa de la dreta, al costat dret del nom, per afegir el que anomenem un *paràmetre*. Per defecte, el nou *paràmetre* s'anomenarà *foo*, però podem fer clic sobre el seu nom per canviar-lo i escriure-hi el que vulguem. En aquest cas, podríem anomenar-lo, per exemple, *dígit*:

![Definint el bloc «representa dígit maia», amb un paràmetre](define-header-param.png)

Observant la graella dels dígits maies, observem que *zero* (![Dígit zero maia](0.png)) sembla molt diferent de qualsevol altre dígit. Mentre que els altres segueixen un patró d'addicions progressives de línies i punts, *zero* és un cas especial, de manera que el primer que farà el nostre nou bloc és comprovar si el dígit proporcionat és igual a *zero* i, si és així, dibuixar-lo.

Podríem representar el *dígit zero* a la matriu de leds de la micro:bit aproximadament com es mostra a la imatge:

![Dígit zero maia al bloc pantalla](display-0.png)

Així doncs, la primera aproximació d'aquest bloc es veurà així:

![El bloc nou pot dibuixar el dígit zero](zero-case.png)

Ara podem provar el nou bloc amb el dígit *0*:

![Representant el dígit 0 en numeració maia](draw-0.png)

Feu clic al nou bloc per provar-lo i veure el resultat a la micro:bit.

#### Entre un i cinc

En el sistema de numeració maia, els valors entre *un* i *quatre* es representen amb punts. Farem servir la fila superior de la pantalla de la micro:bit per representar-los.

Per a automatitzar aquest procés, podem utilitzar el bloc `encén` que pren dues entrades diferents: *x* i *y*:

![Encenent el led x:3, y:3](plot-3-3.png)

La quantitat de punts que haurem de dibuixar serà el valor exacte del dígit, quan aquest sigui inferior a cinc. Un truc que podem utilitzar és iterar sobre el valor del dígit, i dibuixar un punt a cada posició *x* fins a arribar al valor del dígit, tot això mentre mantenim fixa la posició *y* a la fila superior.

Per exemple, si el valor del dígit és *4*, haurem d'executar les operacions següents:

![Encenent el led x:1 , y:1](plot-1-1.png)
![Encenent el led x:2 , y:1](plot-2-1.png)
![Encenent el led x:3 , y:1](plot-3-1.png)
![Encenent el led x:4 , y:1](plot-4-1.png)

Podem automatitzar el procés utilitzant un bucle `per cada` (for), de la manera següent:

![Bucle per al dígit quatre](plot-loop.png)

El dígit *4* era només un exemple. La quantitat d'iteracions ha de dependre del valor del dígit passat al bloc `representa dígit maia` com a paràmetre. Per tant, necessitem un nou cas en el bloc que comprovi si el dígit és inferior a cinc i dibuixi els punts corresponents. Feu clic dues vegades a la fletxa dreta a la part inferior del bloc `si` per a afegir dues condicions addicionals. Amplieu la definició del bloc de la manera següent:

![El bloc nou pot dibuixar dígits entre zero i cinc](under-five-case.png)

Ara proveu el bloc acabat d'actualitzar per a dibuixar els dígits entre zero i cinc, però afegiu un bloc `neteja pantalla` abans de `representa dígit maia`, per evitar que els punts nous es barregin amb el símbol `zero`:

![Representa el dígit 3](clear-and-draw.png)

#### Entre Cinc i Deu

Per als dígits entre cinc i deu, pretenem reutilitzar el codi que acabem de construir, però afegint-hi la línia corresponent. Donem un cop d'ull a la quadrícula de dígits maies:

![Els dígits maies](maya-digits.png)

Observeu com la segona fila de dígits és molt similar a la primera, llevat de la línia que hi ha sota el nombre de punts. Primer afegirem els blocs per dibuixar una línia completa a la tercera fila de la pantalla de la micro:bit.

De la mateixa manera que hem utilitzat un bucle `per cada` (for) per a dibuixar punts, podem iterar cinc vegades sobre una fila determinada per omplir-la completament, així:

![Dibuixar una línia a la fila 3](plot-line-loop.png)

Feu clic al programa per veure com dibuixa una línia a la fila 3 de la pantalla de 5x5 leds.

Ampliem el bloc `representa dígit maia` una vegada més:

![Intentant representar dígits menors a deu](under-ten-case-partial.png)

Si ara intenteu dibuixar el dígit 6, veureu aparèixer una línia a la pantalla, però sense el punt addicional. Recordeu que 6 es representa com ![6](6.png). Fixeu-vos que, per a qualsevol nombre entre 5 i 10, només cal dibuixar una línia i després el nombre de punts corresponents al dígit menys cinc.

Per al dígit vuit, per exemple, dibuixaríem una línia i tres punts. És a dir, una línia i el dígit corresponent a `8 - 5`.

Com que el codi ja pot representar dígits menors a 5, podríem cridar-lo directament des d'allà!

![Dígits inferiors a deu](under-ten-case.png)

Pot semblar estrany definir alguna cosa en termes de si mateix, però en realitat és una pràctica molt habitual en programació!

Ja podeu provar el bloc modificat per a representar tots els dígits entre 0 i 9, però assegureu-vos de netejar la pantalla abans de tot:

![Representació del dígit 7](draw-7.png)

Si continuem ampliant el programa per dibuixar dígits entre 10 i 15, aquest podria ser el codi:

![Dígits menors a quinze](under-fifteen-case.png)

Fixeu-vos com el cas dels dígits entre cinc i deu i els dígits entre deu i quinze és bastant semblant, excepte pel que fa a la coordenada *y* del bloc `encén`.

Vegem els números. Hem d'afegir una línia cada cinc dígits després del dígit *quatre*:

| Valor del dígit | Nombre de línies |
|--|--|
| de 0 a 4 | 0 |
| de 5 a 9 | 1 |
| de 10 a 14 | 2 |
| de 15 a 19 | 3 |

Observeu com el nombre de línies és igual a la part entera del valor del dígit dividida per cinc, i com que hauríem de començar a dibuixar línies a partir de la tercera fila de la pantalla, només ens cal sumar 2 al càlcul per a obtenir la coordenada *y* de cada línia:

![Representant línies en funció del valor del dígit](draw-lines.png)

Per tant, el codi genèric es veuria així:

![Dibuixant cada cas, excepte múltiples de cinc](every-case-but-multiples.png)

Però aquest codi, altre cop, falla per a múltiples de cinc. El problema és que el zero es dibuixa a sobre de qualsevol altra part del dígit representat, així que hem d'evitar dibuixar el zero en aquests casos.

Una manera fàcil d'arreglar-ho és dibuixar només les parts més petites del dígit per a valors superiors a cinc:

![Dibuixant cada cas](every-case.png)

Ara podeu provar els dígits entre 0 i 19. Tot hauria de funcionar correctament!

#### Un comptador digital maia

Ara que ja tenim un bloc per dibuixar nombres maies, podríem utilitzar els dos botons de la micro:bit per incrementar i disminuir el dígit que mostri la pantalla.

Per començar, definim una variable per guardar el valor mostrat a la pantalla. Feu clic a la categoria *Variables* i després al botó *Crea una variable*. Poseu-li de nom *valor*, per exemple.

Quan posem en marxa el projecte, a la pantalla es mostrarà el valor 0:

![Inicialització del valor a zero](init-0.png)

Per a cada pulsació del botó *B* s'augmentarà el valor i es mostrarà a la pantalla, mentre que prement el botó *A* el valor es reduirà. Caldrà assegurar-se de mantenir els valors generats entre els límits!

![Script de MicroBlocks pel botó B](button-b.png)
![Script de MicroBlocks pel botó A](button-a.png)

#### Per aprendre'n més: superar el 19

És clar que amb una sola micro:bit només es pot mostrar un dígit, però si podeu disposar d'una segona micro:bit la podríeu utilitzar per representar un segon dígit.

Utilitzarem les capacitats de ràdio de la micro:bit per comunicar les dues plaques de manera que una mostri les unitats i l'altra els grups de vint.

Per començar, importeu la biblioteca *Ràdio* des del navegador de llibreries. El podeu obrir fent clic al botó *+* al costat de l'etiqueta *Llibreries*, just al final de la llista de categories de blocs.

La idea és enviar els *grups de vint* dígits a l'altra placa quan es superi el valor d'un sol dígit (>19). Això és:

![Enviant grups de vint a l'altra placa](radio-button-b.png)

L'altra placa rebrà un valor que haurà de representar a la pantalla. Es pot fer de la següent manera:

![Dibuixar un dígit en rebre'l per ràdio](radio-receive.png)

Tingueu en compte que aquest bloc haurà d'estar "activat" per funcionar. És a dir, hem de fer clic sobre ell o prémer el botó "Inicia", el triangle verd de la part superior dreta de la finestra de MicroBlocks.

Això funciona, però ara la placa emissora també haurà de dibuixar la resta del valor dividit per vint. En altres paraules, el receptor de ràdio necessita dibuixar els grups de vint, i l'emissor de ràdio necessita dibuixar les unitats.

Per això, podem utilitzar la funció aritmètica `mòdul`, que ens dóna el residu de dividir dos nombres entre si. En aquest cas, volem la resta del valor dividit per vint:

![Script emissor](radio-send-incrementer.png)

Aquest programa es podria simplificar molt enviant sempre els grups de cinc a l'altra placa i traient-ne la resta, sense tenir en compte si estem per sobre de 19 o no. Independentment del valor, aquesta placa sempre mostrarà el dígit més baix:

![Emissor incrementador simplificat](simplified-sender.png)

Finalment, també cal enviar els grups de vint des del programa que decrementa el valor:

![Emissor decrementador finalitzat](radio-send-decrementer.png)

Amb aquesta configuració, ja podeu representar quantitats fins a 399 en numeració maia!

Com a exercici d'ampliació: podeu pensar una manera d'enllaçar un nombre arbitrari de micro:bits per poder dibuixar números encara més grans?

