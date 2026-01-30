# Moov Famille Bénin — Intermédiaire Acheteurs & Vendeurs

Site web React servant d’**intermédiaire** entre les **acheteurs** de connexion Moov Famille au Bénin et les **vendeurs** qui proposent ces forfaits.

## Règles de la plateforme

- **Numéros masqués** : le vendeur et l’acheteur ne voient jamais leurs numéros respectifs ; tous les numéros sont visibles uniquement en base de données.
- **Aucun chat, aucun contact direct** entre acheteurs et vendeurs.
- **Prix fixe** : 6 500 FCFA.
- **Maximum 3 acheteurs par groupe** (par offre).

## Fonctionnalités

- **Acheteurs** : consulter les offres (groupes), rejoindre un groupe (max 3 par offre). Le contact acheteur est enregistré en base de données uniquement.
- **Vendeurs** : déposer une offre (groupe) : type, durée ; prix fixe 6 500 FCFA. Le contact vendeur est enregistré en base de données uniquement.
- **Aucune mise en contact directe** : pas d’affichage de numéros, pas de chat.

## Technologies

- **React 18** + **Vite**
- **React Router** pour la navigation
- **Firebase** (Firestore) pour les données : offres et demandes (inscriptions) sont stockées en base. La configuration est dans `src/firebase.js`.

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

Ouvrir l’URL affichée (souvent `http://localhost:5173`).

## Build

```bash
npm run build
```

Les fichiers de production sont générés dans `dist/`.

## Structure des routes

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/acheteur` | Espace acheteur |
| `/vendeur` | Espace vendeur |
| `/offres` | Liste des offres |
| `/demande` | Formulaire de demande (acheteur) |
| `/deposer-offre` | Formulaire de dépôt d’offre (vendeur) |
| `/contact` | Contact |

## Firebase / Firestore

- La config Firebase est dans `src/firebase.js` (projectId, apiKey, etc.).
- **Firestore** : collections `offres` et `demandes`. Activer Firestore dans la [console Firebase](https://console.firebase.google.com) (Créer une base de données → mode test ou production).
- Pour un autre projet : modifier `src/firebase.js` et éventuellement utiliser des variables d’environnement pour les clés.

## Personnalisation

- **Contact** : modifier les coordonnées dans `src/pages/Contact.jsx`.
