# Karine Bauzin — site photographe

Site vitrine : l’entrée `/` redirige vers **Reportages**. Pages : à propos, portraits, reportages (projets extensibles), livres (pages extensibles), contact.

Structure détaillée : voir `Diagramme WebSiteKarine.drawio`.

- **Code** : GitHub
- **Photos de galeries** : [Cloudinary](https://cloudinary.com)
- **Couvertures livres** : `public/books/` (Git)
- **Maquette Figma** : [Site web photographe moderne](https://www.figma.com/design/f0hPsOsO9DsyMLAUEMOsJ6/Site-web-photographe-moderne)

Documentation : `docs/ARCHITECTURE.md`, `docs/MEDIA.md`, `docs/MODE-EMPLOI-ASSISTANT.md`.

## Démarrage local

```bash
npm install
npm run dev
```

## Configuration Cloudinary

Les **galeries** (portraits, reportages) et le **portrait À propos** passent par Cloudinary.

1. Compte sur [cloudinary.com](https://cloudinary.com)
2. Copier `.env.example` → `.env` et renseigner `VITE_CLOUDINARY_CLOUD_NAME` (`VITE_CLOUDINARY_FOLDER` reste **vide**)
3. Uploader les photos dans la Media Library (`portraits/`, `reportages/<slug>/`, etc.)
4. Brancher les `public_id` via `resolveImageUrl()` / `resolveGalleryImages()` (`src/lib/cloudinary.ts`) et `site.ts`

Les Unsplash encore dans le code sont des **replis**.  
Les couvertures livres restent dans `public/books/` (voir `docs/MEDIA.md`).

## GitHub

Dépôt : `benxvii/karinebauzin`. Push sur `main` après commit.

Déploiement conseillé : [Vercel](https://vercel.com) ou [Netlify](https://netlify.com). Ajouter les variables Cloudinary dans le tableau de bord de l’hébergeur.

## Personnalisation (résumé)

- **Textes** : `src/config/site.ts` (copie locale dans Cursor)
- **Nouvelle galerie / photos** : upload Cloudinary + entrée dans `site.ts`
- **Livres** : `livres.items` + couvertures dans `public/books/`
- **Logo** : `public/logo.png`

Détail pour Karine / Cursor : `docs/MODE-EMPLOI-ASSISTANT.md`.
