### Organisation

```
├── src
│ ├── components
│ │ │ base : _UI components_
│ │ │ filter : _4 filtres_
│ │ │ product : _liste et item_
│ ├── constants : _permet de normaliser les données_
│ │ ├ color.js
│ │ ├ gender.js
│ │ ├ range.js
│ │ ├ sport.js
│ │ ├ index.js
│ ├── services
│ │ ├ products.js : _simule l'appel au seveur pour récupérer les produit et formate les produits_
│ ├── App.vue
│ ├── main.js
└── ...
```

### Améliorations possibles:

- ajouter des test unitaires avec Vue Test Utils
- utiliser une librairie comme currency.js pour gérer l'affichage des prix selon la langue
- utiliser Vue I18n pour gérer les label
- variabiliser les couleurs, espaces SASS
