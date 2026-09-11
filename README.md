# Karine Bauzin — site photographe

Site vitrine : l’entrée `/` redirige vers **Reportages**. Pages : à propos, portraits, reportages (projets extensibles), livres (pages extensibles), contact.

Structure détaillée : voir `Diagramme WebSiteKarine.drawio`.

- **Code** : GitHub
- **Photos de galeries** : [Cloudinary](https://cloudinary.com)
- **Couvertures livres** : `public/books/` (Git)
- **Maquette Figma** : [Site web photographe moderne](https://www.figma.com/design/f0hPsOsO9DsyMLAUEMOsJ6/Site-web-photographe-moderne)

Documentation : `docs/ARCHITECTURE.md`, `docs/MEDIA.md`, `docs/MODE-EMPLOI.md`.

## Démarrage local

```bash
npm install
npm run dev
```

## Configuration Cloudinary

Les **galeries** (portraits, reportages) passent par Cloudinary + un manifeste `_galleries.json`.
Le **portrait À propos** est un public ID fixe.

1. Compte sur [cloudinary.com](https://cloudinary.com)
2. Copier `.env.example` → `.env` : `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_FOLDER=karinebauzin`
3. Uploader les photos dans la Media Library (`karinebauzin/portraits/`, `karinebauzin/reportages/<slug>/`)
4. Lancer **Sync galleries from Cloudinary** (GitHub Actions) ou `npm run sync:galleries`

Si une galerie n’est pas dans le manifeste, la page reste vide (message), sans images Unsplash.
Les couvertures livres restent dans `public/books/` (voir `docs/MEDIA.md`).

## GitHub

Dépôt : `benxvii/karinebauzin`. Push sur `main` après commit.

Déploiement : GitHub Actions → FTP Infomaniak (`.github/workflows/deploy.yml`).

## Personnalisation (résumé)

- **Textes** : `src/config/site.ts` (copie locale dans Cursor)
- **Nouvelle galerie / photos** : upload Cloudinary + workflow Sync galleries (`site.ts` seulement pour un nouveau slug)
- **Livres** : `livres.items` + couvertures dans `public/books/`
- **Logo** : `public/logo.png`

Mode d’emploi (Karine / Cursor) : `docs/MODE-EMPLOI.md`.
