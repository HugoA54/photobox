# Photobox

Application web de galerie photo interactive développée en TypeScript.

## Membres du groupe

- **Hugo ANTZORN**
- **Ilias BOUDOUAH**


## Fonctionnalités demandées

- **Chargement de galerie** : récupération des photos depuis l'API et affichage sous forme de grille avec miniatures et titres
- **Navigation entre galeries** : boutons première, précédente, suivante, dernière pour parcourir les pages de la collection
- **Lightbox** : clic sur une photo pour l'afficher en plein écran avec son titre, sa description, sa catégorie et ses commentaires
- **Navigation dans le lightbox** : boutons précédent/suivant pour passer d'une photo à l'autre sans fermer le lightbox
- **Fermeture du lightbox** : bouton de fermeture ou clic sur le fond sombre
- **Templates Handlebars** : rendu dynamique des photos, catégories et commentaires via des templates déclarés en HTML

## Fonctionnalités rajoutée

- **Navigation clavier dans le lightbox** : touches fléchées gauche/droite pour changer de photo, Échap pour fermer
- **Compteur de photos** : affichage de la position actuelle dans la galerie (ex : 3 / 12)


## Structure des fichiers

```
src/
├── main.ts         # Point d'entrée, gestion des événements
├── gallery.ts      # Logique de navigation entre galeries (first/prev/next/last)
├── gallery_ui.ts   # Affichage de la grille de photos
├── photoloader.ts  # Appels à l'API REST (fetch)
├── UI.ts           # Rendu lightbox (photo, catégorie, commentaires)
├── config.ts       # URL de base de l'API
└── style.css       # Styles (galerie flex, lightbox overlay)
index.html          # Structure HTML + templates Handlebars
```

