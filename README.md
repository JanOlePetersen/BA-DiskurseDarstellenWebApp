# Bachelor Arbeit Webanwendung Petersen

Für die Installation wird npm Version 8.5.1 und node Version >=16.20.0 benötigt.

Für Befehle auf Linux wird sudo benötigt.

# Projekt Setup

## Installiere vue
```
$ npm init vue@3.3.4
```
Wähle Projektnamen

### Vue Einstellungen
```
add TypeScript NO
add JSX Support NO
add VueRouter YES
add Pina NO
add Vitest NO
add End to End testing NO
add ESLint YES
add prettier NO
```

```
$ cd Project name
```

### install bootstrap
```
$ npm install bootstrap
```
### install font awesome
```
$ npm i --save @fortawesome/fontawesome-svg-core@1.x
$ npm i --save @fortawesome/free-solid-svg-icons@5.x
$ npm i --save @fortawesome/free-regular-svg-icons@5.x
$ npm i --save @fortawesome/free-brands-svg-icons@5.x
$ npm i --save @fortawesome/vue-fontawesome@latest-3
```

```
$ npm fund
$ npm install
```

lösche public und src Ordner

ersetze index.html

kopiere src, data und files Ordner in das Projektverzeichnis

## Starte Projekt lokal
```
$ npm run dev
```
## Erstelle Dateien für die Serververwendung
```
$ npm run build
```