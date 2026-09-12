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

MegaText není potřeba instalovat ani sestavovat. Pokud si ho stáhnete do počítače a chcete využívat všechny funkce včetně provozu offline, spusťte ho přes jednoduchý lokální webový server. Ve složce s aplikací můžete použít například příkaz `python3 -m http.server 8080`. Pouhé otevření souboru `index.html` nemusí offline režim správně aktivovat.

## ❤️ Podpora

MegaText je zdarma a bez reklam. Pokud vám dává smysl, můžete [podpořit jeho provoz a další vývoj](https://manena.info/podporit/).

## Autoři

Vytvořil, provozuje a vyvíjí [Václav Maněna](https://manena.info). S vývojem a designem pomáhá hlavně [Tomáš Musiol](https://www.musiol.cz).
