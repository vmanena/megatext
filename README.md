# MegaText

Jednoduchý nástroj pro zobrazení krátkého textu přes celou obrazovku. Hodí se například pro Wi-Fi heslo, URL adresu, krátkou zprávu nebo instrukci čitelnou z větší vzdálenosti.

## Funkce

- automatické přizpůsobení velikosti textu obrazovce;
- zachování ručně vložených řádků;
- světlý a tmavý režim;
- režim celé obrazovky;
- ovládání na počítači i mobilu;
- offline provoz po prvním načtení;
- bez účtu, analytiky a externích knihoven.

Text se ukládá pouze do `sessionStorage`, takže přežije obnovení stránky, ale po zavření karty se neuchovává. Motiv a zvolená maximální velikost písma se ukládají do `localStorage`.

## Vývoj

Jde o statickou aplikaci bez sestavení a závislostí. Pro správnou funkci service workeru ji spouštějte přes lokální HTTP server, například `python3 -m http.server 8080`.

## Autor

Vytvořil a provozuje [Václav Maněna](https://manena.info).
