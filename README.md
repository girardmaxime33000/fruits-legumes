# FraisPrix 🥕

**Suivi des prix des fruits et légumes en France**

FraisPrix est un tableau de bord statique qui permet aux consommateurs et professionnels de suivre l'évolution hebdomadaire des prix des fruits et légumes sur les marchés français.

---

## Objectif

Face à la volatilité des prix alimentaires, FraisPrix offre une lecture claire et immédiate des tendances de marché : quels produits sont en hausse cette semaine ? Quelles régions sont les moins chères ? Quoi acheter de saison pour optimiser son budget ?

---

## Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Tableau de prix** | 24 produits (fruits & légumes) avec prix courant en €/kg et variation hebdomadaire |
| **Tendances** | Indicateurs visuels hausse / baisse / stable avec pourcentage vs semaine précédente |
| **Historique des prix** | Graphique sur 12 semaines (Chart.js) accessible au clic sur chaque produit |
| **Filtres & recherche** | Filtrage par catégorie (fruits / légumes), recherche par nom, tri par prix ou tendance |
| **Comparaison régionale** | Prix moyen par région (8 régions françaises) indexé à la moyenne nationale |
| **Produits de saison** | Mise en avant automatique des produits de saison du mois en cours |

---

## Produits suivis

**13 fruits** — Pomme, Poire, Fraise, Cerise, Abricot, Pêche, Melon, Pastèque, Raisin, Kiwi, Banane, Orange, Citron

**11 légumes** — Tomate, Courgette, Poivron, Aubergine, Salade, Carotte, Pomme de terre, Oignon, Ail, Champignon, Brocoli

---

## Régions couvertes

Île-de-France · PACA · Bretagne · Occitanie · Auvergne-Rhône-Alpes · Normandie · Grand Est · Nouvelle-Aquitaine

---

## Stack technique

- **HTML / CSS / JavaScript** — aucun framework, aucun build
- **[Chart.js 4.4.1](https://www.chartjs.org/)** — graphiques historiques (chargé via CDN jsDelivr)
- **CSS custom properties** — palette cohérente vert/orange, responsive mobile-first
- **Intl.NumberFormat** — formatage des prix en euros (locale `fr-FR`)

---

## Lancer le site

```bash
# Cloner le dépôt
git clone https://github.com/girardmaxime33000/fruits-legumes.git
cd fruits-legumes

# Ouvrir directement dans le navigateur
open index.html
# ou servir localement
npx serve .
```

Le site est 100% statique : aucune dépendance à installer, aucun serveur requis.

---

## Déploiement GitHub Pages

1. Aller dans **Settings → Pages** du dépôt
2. Source : `Deploy from a branch`
3. Branch : `main` / `root`
4. Le site est disponible à `https://girardmaxime33000.github.io/fruits-legumes/`

---

## Structure des fichiers

```
fruits-legumes/
├── index.html   # Page principale (structure HTML, nav, sections)
├── styles.css   # Design complet (variables, cartes, modal, responsive)
├── data.js      # Données mockées (produits, historiques, régions)
└── app.js       # Logique applicative (filtres, rendu, graphiques)
```

---

## Sources de données

> Les prix affichés sont actuellement des données simulées représentatives des marchés français.

Sources de référence pour une intégration réelle :
- [FranceAgriMer](https://www.franceagrimer.fr/) — cotations officielles fruits & légumes
- [Réseau des Nouvelles des Marchés (RNM)](https://rnm.franceagrimer.fr/) — API publique de cotations

---

## Licence

MIT — libre d'utilisation et de modification.
