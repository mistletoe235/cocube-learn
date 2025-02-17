### Música en directe, de debò?

Sí, de debò! Fa temps que la gent programa música en directe davant de públic.
Aquesta pràctica es coneix com a «live coding» (programació en directe) i té una
comunitat molt activa i apassionada arreu del món.

Normalment, els programadors de «live coding» utilitzen llenguatges que poden
produir so per si mateixos, i tot i que els microcontroladors poden produir so
per si mateixos, no et serà fàcil fer ballar ningú amb aquests sons.

Els microcontroladors poden interactuar amb dispositius de producció musical
mitjançant un protocol anomenat MIDI. És precisament el que farem servir en
aquesta activitat.

[[note]]
#### Generació de so amb microcontrolador

Si estàs interessat en els tipus de sons que pots fer només amb un
microcontrolador, probablement ja deus haver provat les llibreries *Tons* i
*Politons* que es troben a la carpeta arrel del navegador de Llibreries, però hi
ha algunes llibreries més que hauries de conèixer. Especialment *Chiptune*,
*Square Wave Chords*, *Guitarra* (Pluck en anglès) i *MultiTone*, que es troben
a la carpeta de *So* al navegador de Llibreries. [[/note]]

### Quin dispositiu necessito?

El millor dispositiu MIDI és el que ja tens. Si tens un orgue digital antic, un
sintetitzador o un mòdul MIDI -hi havia qui utilitzava mòduls MIDI als primers
anys dels jocs d'ordinador per obtenir una experiència musical considerablement
millor-, això és el que hauries de fer servir.

El segon millor dispositiu MIDI és el que algú altre té i no vol. Busca "mòduls
MIDI" en llocs web i aplicacions d'articles de segona mà. Pots assegurar-te que
fan el que necessites buscant el seu manual d'instruccions per internet, o
buscant vídeos que expliquin el mòdul concret que has trobat. Es recomana
començar com a mínim a fer una ullada a aquesta activitat per tenir una mica més
clar què has de buscar exactament, però en termes generals et cal un mòdul de so
amb un port MIDI IN i una connexió de sortida d'àudio. Jo he tingut sort amb
alguns mòduls que m'han costat menys de 100 €, però també he tingut mala sort
amb mòduls més cars que semblaven molt prometedors i han acabat sonant bastant
malament.

Segurament, la tercera millor opció és comprar un dispositiu MIDI actual. No cal
que et gastis molts diners en el teu primer sintetitzador. Hi ha botigues
independents que venen mòduls molt ben construïts i assequibles. Busca "mòdul
MIDI de taules d'ona" -si vols trobar-ne algun, busca-ho en anglès com a "MIDI
wavetable module"- per internet i tria el que et faci més ràbia.

Si ets una mica «manetes», pots trobar kits de soldadura per internet que venen
amb les PCB i tots els components per soldar-te'ls tu mateix.

Si no estàs segur de què comprar exactament, sempre pots contactar amb nosaltres
per demanar orientacions més concretes.

#### I si no tinc cap sintetitzador?

Cap problema. La quarta millor opció és la virtual. Si la teva placa suporta
[USB MIDI](#usbmidi), pots utilitzar un sintetitzador per programari. Els més
habituals són FluidSynth i el seu company gràfic QSynth, però també en podries
utilitzar un de basat en web i WebMIDI. Si tries aquesta opció, et recomanem
que provis [SpessaSynth](https://spessasus.github.io/SpessaSynth/).

El primer cop que provis SpessaSynth, et caldrà atorgar-li permisos per accedir
a WebMIDI. Això només caldrà que ho facis una vegada.

### Quin microcontrolador necessito?

Qualsevol t'hauria d'anar bé! Tingues en compte, però, que alguns
microcontroladors tenen una memòria persistent lleugerament més lenta i això
podria provocar retards en el temps de reproducció. Fins i tot una petita
caiguda de 10 mil·lisegons en el tempo és perfectament perceptible a l'oïda
humana!

#### I si no tinc cap microcontrolador?

Bé, MicroBlocks és un llenguatge de programació per a microcontroladors, però
sempre pots fer anar [Boardie](https://microblocks.fun/blog/2022-12-07-boardie-intro/),
el nostre microcontrolador virtual, per provar com funciona tot plegat.

Si tires per aquest camí, només podràs utilitzar dispositius USB MIDI o WebMIDI.
Si decideixes fer-ho tot basat en web i utilitzes Boardie i un [sintetitzador
WebMIDI](#isinotinccapsintetitzador), clica primer sobre qualsevol bloc de MIDI
a MicroBlocks per tal que el navegador et demani que li atorguis permís per
accedir a WebMIDI.

[[note]]
Tot i que Boardie amb SpessaSynth són suficients per a fer proves i, fins i tot,
per a finalitats educatives, pot ser que experimentis petits problemes de
latència amb aquesta combinació. Pot ser que algunes notes es perdin per
problemes de temps, i pot ser que d'altres sonin lleugerament desfasades. Això
sí, no t'hauràs de barallar amb cables ni aparells de so, i podràs fer proves
abans de decidir-te a comprar un dispositiu físic.
[[/note]]

### Connexió física

Per començar, hauràs de connectar el teu microcontrolador al port **MIDI IN**
del teu dispositiu. En la majoria de casos només necessitaràs dos cables:

* **El pin 5** del connector MIDI DIN hauria d'anar al pin sèrie del teu
  microcontrolador. Si la teva placa opera amb lògica de 5 V, hauràs d'afegir
  una resistència de 220 Ω en sèrie en aquest cable. Si és de 3,3 V, la
resistència haurà de ser de 10 Ω.

[[note]]
Algunes plaques tenen un connector sèrie incorporat. Busca quin és en el
diagrama de pins de la teva placa. Si no en té, pots utilitzar qualsevol pin
digital com a pin sèrie, tot i que el pin sèrie per maquinari acostuma a
funcionar millor.[[/note]]

* **El pin 4** del connector MIDI DIN hauria d'anar a un pin de **3,3 V** o **5
  V** del teu microcontrolador. Novament, connecta una resistència de 220 Ω en
sèrie per a pins de 5 V, o una de 10 Ω per a 3,3 V.

![diagrama de dos fils per a connectar el dispositiu MIDI i el microcontrolador](2-wire-pin-diagram.png)

Si això no funciona potser et caldrà una connexió a "terra" (GND). En aquest cas
s'ha d'afegir un fil més:

* **El pin 2** del connector MIDI DIN s'hauria de connectar al **pin GND** del
  teu microcontrolador.

![diagrama de connexions MIDI i microcontrolador amb connexió a terra (GND)](pin-diagram.png)


### Quatre paraules sobre MIDI

MIDI *-Musical Instrument Digital Interface-* (Interfície Digital d'Instruments
Musicals) és un sistema estàndard de comunicació per a dispositius musicals.
Aquests dispositius inclouen aquells que *produeixen* música, com ara
sintetitzadors, samplejadors, taules d'ona, romplers i altres aparells musicals,
i aquells dispositius que *controlen* aquests aparells, com ara teclats
controladors, arpegiadors, seqüenciadors, pads o, en el nostre cas, llenguatges
de programació.

Al protocol MIDI, cada nota musical té assignat un determinat número. Això
s'entendrà millor sobre un teclat de piano:

⋯ ![números de notes MIDI representats en el teclat d'un piano](MIDI-notes.png =500x100) ⋯

A més, els dispositius MIDI poden reproduir música per diferents *canals*
simultàniament. Cada canal també pot configurar-se per reproduir un instrument
diferent.

La llibreria MIDI de MicroBlocks segueix l'especificació estandarditzada
«General MIDI» (o GM) per a instruments musicals. El GM és una classificació
d'instruments musicals que segueixen molts dispositius MIDI. Cada instrument
s'identifica per un número. Això vol dir, per exemple, que és d'esperar que
molts dispositius MIDI reprodueixin un so similar al d'un saxòfon soprano quan
se'ls indiqui que facin servir l'instrument número 65. També vol dir que molts
reproduiran tambors o altres instruments de percussió quan se'ls indiqui que
toquin una nota al canal 10.

Dit això, no tots els dispositius MIDI segueixen la convenció GM, així que els
resultats poden variar.

#### Primers passos

Per poder interactuar amb el teu dispositiu MIDI, cal començar important la
llibreria MIDI. Fes clic al signe més al costat de *Llibreries*, just a sota de
la llista de categories de blocs, i navega fins a la carpeta *So*. Després,
selecciona la llibreria *MIDI* i fes clic a *Obre*.

Aquesta llibreria conté molts blocs, però no t'atabalis. En aquesta activitat
només en farem servir alguns. Concretament:

![play MIDI note block](play-MIDI-note-block.png) ![select MIDI instrument block](select-bass-block.png) ![play MIDI drum block](play-MIDI-drum-block.png) ![MIDI reset block](MIDI-reset-block.png) ![set MIDI pin block](set-MIDI-pin-block.png)

Més endavant explicarem què fan els quatre primers blocs, així que, de moment,
no els comentarem.

El bloc ![bloc reinicialitza MIDI](MIDI-reset-block.png =*x30) demanarà al teu
sintetitzador que aturi tots els sons i torni al seu estat original. Això és
especialment útil en els casos on una nota ha quedat sonant i no saps quina és o
en quin canal es troba.

Si has connectat el teu dispositiu al pin sèrie per maquinari, no et cal saber
res més d'aquesta secció. En cas contrari, continua llegint per aprendre què fa
el bloc ![bloc configura MIDI al pin](set-MIDI-pin-block.png =*x30).

#### Port sèrie per programari

Per configurar la teva placa per enviar ordres MIDI a través d'un port sèrie
específic, simplement introdueix al bloc el número de pin on has connectat el
pin 5 del connector MIDI
![bloc configura MIDI al pin](set-MIDI-pin-block.png =*x30) i fes clic al bloc.

#### USB MIDI

Si la teva placa ho suporta, pots utilitzar-la per controlar un dispositiu MIDI
per USB. Simplement, selecciona *USB* en el bloc ![bloc configura MIDI al pin
USB](set-USB-MIDI-block.png =*x30) i fes-hi clic.

Tot i això, tingues en compte que no podràs programar la placa a través del seu
connector USB si l'has connectada a un dispositiu MIDI per USB! Tens l'opció de
fer servir un programa sintetitzador -com ara FluidSynth-, que rep comandes MIDI
a través del mateix cable USB que MicroBlocks fa servir per comunicar-se amb la
placa. L'altra opció és programar la teva placa a través de BLE (Bluetooth). En
aquest cas, et caldrà fer servir aquesta [versió web de
MicroBlocks](https://microblocks.fun/run-pilot). També pots utilitzar el teu
ordinador com a intermediari entre el teu microcontrolador i el dispositiu MIDI
USB. En Linux, per exemple, això es fa mitjançant la comanda `aconnect`.

#### Tocar la primera nota

Per comprovar que tot està correctament configurat -i suposant que el teu
sintetitzador estigui preparat per rebre comandes MIDI a través del canal 0 i
reproduir música-, fes clic al bloc ![bloc toca nota
MIDI](play-MIDI-note-block.png =*x30). En una configuració estàndard, el teu
dispositiu MIDI hauria de reproduir un Do 4 -o Do central-, molt probablement
amb timbre de piano.

Si aquest no és el cas, assegura't de revisar totes les instruccions anteriors,
començant per la [connexió física](#connexiofisica). És aconsellable que
llegeixis la documentació específica del teu dispositiu MIDI per assegurar-te
que està preparat per rebre comandes MIDI al canal 0. Si tens un controlador
MIDI, pots provar de connectar-lo al teu dispositiu MIDI per descartar qualsevol
problema de configuració relatiu a MicroBlocks.

#### Una primera composició

Comencem per seleccionar un instrument diferent per al canal 1, el que
prefereixis:

![selecció del vibràfon pel canal 1](select-vibraphone-script.png)

Ara pots compondre una cançó senzilla utilitzant un bucle sobre una llista de
notes, com per exemple:

![script that plays Old McDonald had a farm](old-mcdonald-script.png) <audio
controls><source src="old-mcdonald.ogg" type="audio/ogg"></audio>

Tot això és fabulós per escriure melodies, però hauràs de programadar molt ràpid
per fer música en directe d'aquesta manera i que el públic no se'n vagi!

A continuació veurem alguns trucs que ens faran més fàcil la producció de música
en directe. Potser perdrem una mica de control sobre les *melodies* que voldríem
fer sonar, però a canvi guanyarem varietat i velocitat de composició.

### Patrons rítmics

Per començar, crearem diverses combinacions de ritmes de bateria sobre els quals
anirem afegint altres instruments. Així podem fer que el públic comenci a
moure's mentre nosaltres aprofitem el temps per construir estructures musicals
més complexes.

Per fer-ho, farem servir la llibreria de *Ritme*, que conté abstraccions per a
durades de notes, tempos, compassos i temps. També s'encarrega de mantenir-ho
tot sincronitzat.

Potser penses que no et cal una llibreria de ritmes per construir patrons de
bateria, i tens tota la raó si això és *tot* el que vols fer. Aquí tens un patró
rítmic senzill elaborat només amb la llibreria *MIDI* i blocs de la paleta
estàndard:

![a simple rock drum pattern using a forever loop and wait
blocks](simple-rock-pattern.png) <audio controls loop><source src="simple-rock-pattern.ogg" type="audio/ogg"></audio>

Però si el que vols, per exemple, és afegir-hi un patró de xarles en paral·lel,
a més d'una línia de baix, una progressió d'acords de guitarra i una
improvisació de piano, aviat t'adonaràs que sincronitzar aquests blocs
d'*espera* pot ser molt difícil.  A més, pensar en el ritme en termes de
mil·lisegons es pot tornar molt complicat.

Vegem com la llibreria de *Ritme* ens pot ajudar. La trobaràs a la carpeta *So*
del *navegador de llibreries*, allà on abans hi has trobat la llibreria *MIDI*.

#### Quatre paraules sobre ritme

La llibreria de *Ritme* proporciona abstraccions per a fraccions de compassos,
també conegudes com a *durades de notes*. Aquest és l'aspecte dels blocs per a
les durades:

![](1-1-block.png) ![](1-2-block.png) ![](1-4-block.png) ![](1-8-block.png)
![](1-16-block.png) 

El bloc ![](1-1-block.png =*x30) representa una *rodona*. Els altres blocs
representen fraccions d'aquesta durada. Per exemple, ![](1-2-block.png =*x30)
representa una *blanca* (o la meitat d'una rodona), mentre que
![](1-4-block.png =*x30) representa una *negra*.

Aquestes durades no són absolutes, sinó que són valors relatius que depenen d'un
determinat tempo. Pots establir el tempo i el tipus de compàs de la teva
composició mitjançant aquest bloc:

![set tempo and time signature block](set-tempo-block.png)

El *tempo*, expressat en PPM (pulsacions per minut o, en anglès, BPM: beats per
minute), determina la velocitat de reproducció o d'interpretació de la música. A
més pulsacions per minut, més ràpida és la música (perquè caben *més* notes en
un minut).

[[fact]]
#### Tipus de compàs

Per simplificar les coses i facilitar-ne l'explicació, en aquesta activitat
ignorarem completament els tipus de compàs. Si vols fer música més complexa,
t'interessarà saber que la llibreria de *Ritme* té un metrònom intern que pots
inicialitzar amb ![](start-counting-block.png =*x30). Amb el metrònom en marxa
podràs consultar el compàs i el temps de la música amb els blocs
![](current-beat-block.png =*x30) i ![](current-bar-block.png =*x30), i
utilitzar els blocs d'espera corresponents per sincronitzar la teva música al
temps o compàs necessari. [[/fact]]

#### Sincronitzar ritmes

Com hem vist abans, sincronitzar programes que produeixen música pot ser
complicat. L'objectiu del bloc ![](wait-until-next-block.png =*x30) és
facilitar-nos la vida en aquest sentit. Intenta executar aquests dos programes
en paral·lel:

![](kick-pattern.png) ![](hihat-pattern.png) <audio controls loop><source src="hihat-kick-pattern.ogg" type="audio/ogg"></audio>

Has notat com no es desfasen? El truc rau en el fet que el bloc
![](wait-until-next-block.png =*x30) fa servir una mena de metrònom i s'espera
fins que comenci la següent durada per donar pas al següent bloc.

Ni tan sols cal que iniciem ambdós programes al mateix temps. El bloc
![](wait-until-next-block.png =*x30) sempre s'assegurarà de mantenir-los
sincronitzats.

#### Patró de percussió

Ara podem tornar a fer el mateix patró de la secció anterior, però aquesta
vegada utilitzant durades de notes relatives i amb un patró de xarles tocant en
paral·lel:

![](rock-pattern.png) ![](hihat-elaborate-pattern.png) <audio controls
loop><source src="rock-pattern.ogg" type="audio/ogg"></audio>

### Harmonies i melodies

Ara afegirem alguns instruments a la mescla per a crear patrons melòdics i
harmònics. Farem servir la llibreria d'*Escales i acords*, que es troba també a
la carpeta *So* del *navegador de llibreries*. 

Aquesta llibreria pot semblar, d'entrada, una mica intimidant, ja que ofereix
abstraccions per a molts conceptes musicals, però en el context d'aquesta
activitat en farem servir només uns quants blocs.

#### Acords

Els acords són grups de notes que es toquen totes a la vegada. La llibreria
d'*Escales i acords* ofereix diverses maneres de crear acords i progressions
d'acords (és a dir, acords que es toquen successivament), però en aquesta
activitat només farem servir el bloc més explícit ![bloc acord major amb arrel
60](chord-block.png =*x30).

El bloc ![bloc toca nota MIDI 60 durant 500 ms al canal 1 volum
127](play-MIDI-note-block.png =*x30) de la llibreria MIDI accepta acords com a
entrades, a més de notes individuals, de manera que si es deixa caure el bloc
![bloc acord major amb arrel 60](chord-block.png =*x30) a l'entrada per a la
nota MIDI, sonarà l'acord. En aquest exemple, hem seleccionat el piano per
defecte (número 1) per al canal 1:

![bloc toca nota MIDI amb un acord de Do major com a paràmetre](play-chord-block.png) <audio controls><source src="major-c-chord.ogg" type="audio/ogg"></audio>

Aquí tens un patró senzill de dos acords per a piano, que podem tocar juntament
amb el patró de bateria construït a la secció anterior:

![una simple progressió de dos acords majors](two-chord-progression.png) <audio
controls loop><source src="two-chord-progression.ogg" type="audio/ogg"></audio>

Afegint-hi una mica d'aleatorietat podem fer aquest patró molt més interessant.

![progressió de dos acords majors on cada acord es toca un nombre aleatori
de vegades seguides](randomized-two-chord-progression.png) <audio controls
loop><source src="randomized-two-chord-progression.ogg" type="audio/ogg"></audio>

#### Arpegis

Quan les notes que formen un acord es toquen individualment de forma successiva,
en comptes de totes alhora, això s'anomena *arpegi*. Com que no les toquem totes
de cop, en els arpegis també podem decidir l'ordre en què toquem cadascuna de
les notes individuals que el formen. Diferents disposicions de notes poden
generar sensacions molt diferents amb un mateix arpegi.

De la mateixa manera, podem decidir diferents durades per a cadascuna de les
notes de l'acord i així canviar radicalment la manera com sona l'arpegi.

La llibreria d'*Escales i acords* proporciona un bloc *arpegia* que s'encarrega
de tocar arpegis:

![bloc arpegia](arpeggiate-block.png)

El bloc *arpegia* accepta una llista de notes que pot ser un acord, una escala o
una llista arbitrària de notes MIDI. El bloc tocarà les notes de la llista en
l'ordre i les durades que se li indiquin.

Fixa't que l'ordre pot saltar posicions a la llista, i que podem especificar-lo
amb una llista de números, o amb una cadena de text separada per comes, per anar
més de pressa.

Les durades de les notes també es poden especificar com una llista de durades
explícites (és a dir, una llista de blocs com ![1/2](1-2-block.png =*x30),
![1/4](1-4-block.png =*x30), etc.) o com una cadena de text separada per comes.
En aquest últim cas, només cal especificar el denominador de la fracció. És a
dir, `4` significa `1/4`, `8` significa `1/8`, etc.

Escoltem com sona un acord arpegiat:

![arpegiant Do major](arpeggiate-c-major-block.png) <audio controls><source
src="arpeggiate-c-major.ogg" type="audio/ogg"></audio>

En aquest exemple, el bloc ![](low-c-major.png =*x30) conté els valors 36, 40,
43, 48. Aquestes són les quatre notes corresponents a l'acord de *Do2 major*, un
acord bastant greu.

L'ordre especificat `1,3,4,2` significa que es tocarà la seqüència de notes `36,
43, 48, 40`.

Si hi ha més notes que durades, les durades fan la volta. Això vol dir que les
quatre notes que es tocaran tindran les següents durades respectivament: `1/4`,
`1/8`, `1/4` i `1/8`.

Tenint això present, seleccionem un so de baix per al canal 2, i escrivim una
línia de baix senzilla per tocar a sobre de tot plegat:

![bloc per a seleccionar el so de baix](select-bass-block.png) ![una línia de baix simple](bassline.png) <audio loop controls><source src="bassline.ogg"
type="audio/ogg"></audio>

Escriure els ordres i les durades dels arpegis com a cadenes separades per comes
permet compondre la música més ràpidament, però pot ser una mica menys versàtil.
Si es fa servir una llista real, la podrem barrejar, invertir i aplicar-li
altres operacions de manipulació de llistes mentre sona la música, oferint una
mica més de llibertat musical.

#### Improvisació senzilla

El que hem fet fins ara ja és suficient per fer música en directe, però pots
afegir una mica més de variació amb una mica d'improvisació.

El bloc *improvisa* de la llibreria d'*Escales i acords* segueix un mètode molt
senzill i ingenu que imita el que podria fer un estudiant de música principiant
quan aprèn una nova escala i hi comença a improvisar. Si l'utilitzes per a fer
improvisacions llargues se li veurà el llautó de seguida, però si el fas servir
per a frases curtes i de tant en tant, pot fer que la teva música sigui més
animada i sonarà força creïble.

Aquest és l'aspecte del bloc *improvisa*:

![el bloc "improvisa"](improvise-block.png)

El bloc *improvisa* també accepta una llista de notes. Pots fer que improvisi
sobre un acord, però sonarà una mica avorrit perquè els acords estan formats per
molt poques notes. Normalment improvisaràs sobre una escala, cosa que
generalment requereix una mica de teoria musical per saber quines escales
combinen bé amb quins acords i progressions d'acords.

Com sempre a MicroBlocks, pots experimentar amb diferents escales i acords per
veure què et sona bé. L'orella humana és el millor test de teoria musical que hi
ha!

Aquí tens un consell per a aquesta activitat: l'escala *jònica* amb la nota 60
(Do4) com a arrel encaixa bé amb la progressió de dos acords que hem estat
utilitzant.

Al segon paràmetre del bloc *improvisa* s'indica la quantitat de *compassos* que
volem que duri la improvisació. Com que ens hem centrat en un compàs de `4/4`
(per no allargar l'activitat no parlarem de cap altre tipus de compàs), podem
equiparar un compàs a una durada d'![](1-1-block.png =*x30). És a dir, 2
compassos equivaldran a la durada de dues rodones.

El següent paràmetre especifica les possibles durades de les notes improvisades.
Aquestes durades no es tocaran en ordre, sinó de manera aleatòria.Això vol dir
que, en cas del valor per defecte `4, 4, 8`, una negra es reproduirà amb el
doble de probabilitat que una corxera.

Tenint en compte tot el que hem explicat fins ara, seleccionem un vibràfon pel
canal 3 i improvisem sobre la base que hem establert abans durant dos compassos
de cada quatre:

![seleccionar el vibràfon pel canal 3](select-vibraphone-script.png)
![improvisa sobre l'escala jònica, arrel 60, al llarg de 2 compassos](improvise-script.png) <audio loop controls><source src="improv.ogg" type="audio/ogg"></audio>

Observa com, en aquest cas, esperem fins a ![](1-1x4-block.png =*x30). Això
garanteix que la improvisació començarà només cada quatre rodones.

### Observacions finals i alguns trucs

Al llarg d'aquesta activitat pot ser que hagis ensopegat amb un parell de
problemes que ara, en acabat, et seran més fàcils d'entendre.

Vegem per què passen i com solucionar-los.

#### A vegades s'ometen iteracions del bucle

Tot i que aquestes llibreries fan tot el possible per mantenir el tempo ajustat
i consistent, hi ha diferents factors que poden fer que les notes durin una mica
més del que voldríem. Les comandes MIDI viatgen a través d'una connexió sèrie i
aquesta transmissió triga alguns mil·lisegons. En tocar un acord, per exemple,
s'envien diverses d'aquestes comandes en un curt període de temps, i això pot
fer que l'acord acabi una mica més tard del previst.

Quan això passa, el següent ![](wait-until-next-block.png =*x30) potser ha
d'esperar-se un període extra complet fins a poder donar pas a la següent
iteració.

Per exemple, intentem tocar vuit notes d'`1/8` a la progressió d'acords:

![el salt es dóna quan es toquen vuit notes d'1/8 seguides](8-8ths.png) <audio loop controls><source src="skip.ogg" type="audio/ogg"></audio>

Es pot observar com, de tant en tant, un dels bucles *repeteix* acaba una mica
tard i fa que l'espera següent no coincideixi exactament amb l'inici de la
següent rodona.

Una solució fàcil és, tenint en compte aquest temps extra que necessiten els
acords, reduir una mica la seva durada:

![tocant vuit notes d'1/8 dues vegades seguides](fixed-8-8ths.png) <audio loop
controls><source src="no-skip.ogg" type="audio/ogg"></audio>

#### Acords dessincronitzats

La situació anterior, de vegades, pot provocar que els acords es
dessincronitzin. Per exemple, pot ser que un dels arpegis duri una mica més del
que li tocava i que, per tant, ![](wait-until-next-block.png =*x30) s'hagi
d'esperar fins al *següent* període de temps, saltant-se una iteració.

Això pot fer que, en el nostre cas, la línia de baix i les progressions d'acords
no coincideixin, fent que la música soni bastant desagradable i dissonant:

<audio loop controls><source src="dissonant.ogg" type="audio/ogg"></audio>

<small></small> <!-- sorry, Marc :D -->

Això és fàcil d'arreglar. Com que cadascun d'aquests bucles hauria de durar dues
notes completes, li podem demanar a ![](wait-until-next-block.png =*x30) que
s'esperi fins al següent període de temps de durada ![](1-1x2-block.png =*x30).

![la línia de baix corregida](fixed-bassline.png) ![la progressió d'acords corregida](fixed-chords.png) <audio loop controls><source src="fixed-sync.ogg"
type="audio/ogg"></audio>

#### Fes la teva música!

Això només és un petit tast de la música que pots arribar a produir amb
MicroBlocks i dispositius MIDI. Les tres llibreries que hem introduït en aquesta
activitat poden anar molt més enllà del que s'ha vist aquí.

Et convidem a explorar tots els blocs que proporcionen i a compartir la teva
música amb el món!
