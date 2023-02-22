* Recomanació per a obrir el projecte: utilitzar VSCode amb l'extensió Live Server *

PRÀCTICA CREADA PER: Arnau Metaute i Wesley Lucas

Per a la resolució de la primera pràctica de Simulació Física hem dut a terme la creació d'un billar americà, el qual estava composat per les següents característiques:
    - El jugador que fica primer una bola, determina quines boles posarà cadascú
    - Si un jugador no toca cap bola, toca la bola negre o toca una pilota del rival amb la blanca, el seu rival tindrà dos tirades
    - Quan un jugador ha posat totes les seves boles, no s'apliquen les penalitzacions anteriors
    - Si un jugador fica la bola negre abans de posar totes les altres boles, perd
    - La bola negra ha de posar-se la última, al forat contrari al que s'ha posat l'última bola
    - Si la pilota blanca és colada en algun forat, l'altre jugador obtindrà una tirada extra
    - Els punts i els colors de les pilotes són visibles en tot moment, excepte al començament del joc
    - El torn dura fins a tres segons després de la tirada, moment en el qual no està permès interactuar amb el billar

A més a més, s'han completat els següents criteris i extres:
    - Inicialització de partida a partir de la lectura d'un JSON: és duta a terme a l'inici del joc i serveix per a col·locar les pilotes a lloc
    - Control de torns dels jugadors: El torn actual del jugador serà visible en el propi nom dels jugadors, que seran remarcats consequentment
    - Control de puntuació: Hi ha control de les pilotes ficades a més a més de control del forat on s'han ficat per a garantir el funcionament correcte de la bola negra
    - Col·lisions realistes: S'han creat col·lisions més fidedignes que tenen en compte no només la força amb la que xoquen, sinó també l'angle, permetent llavors el xoc amb múltiples pilotes a la vegada