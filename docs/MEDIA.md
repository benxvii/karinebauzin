# Médias — karinebauzin.ch

Où sont les images, comment les ajouter, et ce qui est versionné dans Git.

## Règle générale

| Type d’image | Où ça vit | Qui gère |
|--------------|-----------|----------|
| **Galeries** (portraits, reportages) | **Cloudinary** | Upload Media Library + workflow **Sync galleries** |
| **Portrait À propos** | **Cloudinary** | `Karine_Bauzin_cfgzty` dans `About.tsx` |
| **Couvertures livres / affiche film** | `public/books/` (Git) | Fichier local + chemin dans `site.ts` |
| **Logo / favicon** | `public/logo.png` (Git) | Rarement modifié |
| **Badge Trust-J** | `public/trustj-logo.png` (Git) | Page Contact (`site.trustJ`) |

Les galeries passent **directement par Cloudinary**. Pas d’upload de photos de galerie dans Git.

Les URLs Unsplash (et quelques anciennes URLs `karinebauzin.ch`) dans `placeholderImages[]` sont des **replis** : elles ne s’affichent que si la galerie n’est pas encore dans le manifeste `_galleries.json`.

## Cloudinary (source de vérité pour les galeries)

Cloud : `VITE_CLOUDINARY_CLOUD_NAME` (ex. `duvuxd5kh`).

`VITE_CLOUDINARY_FOLDER=karinebauzin` : racine Media Library (manifeste `_galleries.json` + script de sync). **Pas** un préfixe d’URL image. Les public ID vont tels quels dans `res.cloudinary.com/.../image/upload/<public_id>` (portraits à la racine du cloud, reportages sous `reportages/<slug>/`).

Même contrat que benoitdepagnier.ch (`VITE_CLOUDINARY_FOLDER=benoitdepagnier`).

### Config locale

```env
# .env (copier depuis .env.example)
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_FOLDER=karinebauzin
VITE_MANIFEST_URL=https://res.cloudinary.com/<cloud>/raw/upload/karinebauzin/_galleries.json
```

Les clés API (`CLOUDINARY_API_KEY` / `SECRET`, ou `CLOUDINARY_URL`) ne vont **pas** dans ce fichier. Elles restent dans GitHub Secrets pour le workflow de sync.

Fichiers :

- `src/lib/cloudinary.ts` — URLs images
- `src/lib/galleryManifest.ts` — URLs du manifeste
- `src/hooks/useGalleries.ts` — chargement runtime
- `scripts/sync-galleries.mjs` — scan Cloudinary + upload `_galleries.json`

### Convention des dossiers

| Contenu | Public ID | Dossier Media Library |
|---------|-----------|------------------------|
| Portraits | `NomFichier_hash` (racine du cloud) | `karinebauzin/portraits/` |
| Reportages | `reportages/<slug>/nom-fichier` | `karinebauzin/reportages/<slug>/` |
| À propos | `Karine_Bauzin_cfgzty` | racine du cloud (hors sync galeries) |
| Manifeste | `karinebauzin/_galleries.json` | raw upload |

Exemple reportage : `reportages/swiss-cup-mulet/DSC3225`

### Workflow — ajouter des photos (galerie existante)

1. Ouvrir [console.cloudinary.com](https://console.cloudinary.com) → **Assets**
2. Uploader dans le dossier du slug
3. GitHub → **Actions** → **Sync galleries from Cloudinary** → Run (ou `npm run sync:galleries` en local)
4. Recharger la page. **Pas de commit de photos**, pas besoin d’éditer `site.ts`

Le cron GitHub relance le sync tous les jours à 5h UTC.

### Workflow — nouveau reportage

1. Upload Cloudinary dans `karinebauzin/reportages/<slug>/`
2. Ajouter slug / titre / intro dans `documentary.projects` (`site.ts`)
3. Optionnel : titre dans `scripts/galleries-meta.json`
4. Lancer le sync

Aucune photo de galerie à committer dans Git. `public/_galleries.json` est une copie de secours du manifeste.

## Couvertures livres (`public/books/`)

Exception volontaire : les mockups et affiches restent dans le repo pour l’instant.

| Fichier | URL | Usage |
|---------|-----|-------|
| `public/logo.png` | `/logo.png` | Favicon |
| `public/trustj-logo.png` | `/trustj-logo.png` | Badge Trust-J (page Contact) |
| `public/books/geneve-au-coeur-du-jeu.png` | `/books/geneve-au-coeur-du-jeu.png` | Mockup fond blanc, incliné |
| `public/books/cabines-de-plage.jpg` | `/books/cabines-de-plage.jpg` | Couverture |
| `public/books/what-time-is-it.png` | `/books/what-time-is-it.png` | Couverture |
| `public/books/post-tenebras-lux.jpg` | `/books/post-tenebras-lux.jpg` | Couverture |
| `public/books/c-est-la-lutte-finale.png` | `/books/c-est-la-lutte-finale.png` | Couverture 3D |
| `public/books/portraits-ge-ch.png` | `/books/portraits-ge-ch.png` | Mockup |
| `public/books/un-jour-tout-bascule.png` | `/books/un-jour-tout-bascule.png` | Mockup |
| `public/books/memoires-d-une-pandemie.jpg` | `/books/memoires-d-une-pandemie.jpg` | Affiche film |

Chemins référencés dans `livres.items[].image` (`site.ts`).

### Conventions d’affichage

- Mockups fond blanc + légère rotation : Genève, Portraits-ge.ch, Un jour tout bascule...
- Affichage hub / détail : `object-contain` sur fond blanc
- Films (`kind: "film"`) : affiche en hauteur naturelle, sans rognage

### Ajouter / remplacer une couverture

1. Placer le fichier dans `public/books/` (kebab-case)
2. Mettre à jour `image: "/books/..."` dans `site.ts`
3. Commit du fichier + du code

## Replis Unsplash / ancien site

Toujours dans le code, **non affichés** tant que la galerie figure dans `_galleries.json` :

- `portraitGallery.placeholderImages` et `documentary.projects[].placeholderImages` dans `site.ts`
- Portrait À propos : Unsplash en repli dans `About.tsx`

Les galeries Portraits et Reportages, et le portrait À propos, sont **branchés Cloudinary**.

## Secrets GitHub Actions

Le workflow **Sync galleries from Cloudinary** a besoin de (Settings → Secrets → Actions) :

- `CLOUDINARY_CLOUD_NAME` (déjà là pour le deploy)
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER=karinebauzin` (optionnel : le workflow a ce défaut)

## Développement local

```bash
npm install
npm run dev
```

- Images Cloudinary : besoin de `.env` correctement rempli + réseau
- Couvertures `public/books/` : servies tout de suite, sans Cloudinary

## Taille des couvertures locales

Quelques PNG sont lourds (>600 Ko). À optimiser avant mise en prod si besoin :
- `what-time-is-it.png`, `un-jour-tout-bascule.png`, `portraits-ge-ch.png`, `c-est-la-lutte-finale.png`

## Sources des couvertures actuelles

| Livre / média | Source |
|---------------|--------|
| Couvertures diverses | karinebauzin.ch |
| C'est la lutte finale | karinebauzin.ch (URL sans `www`) |
| Mémoires d'une pandémie | genevelesportes.ch |

Note : `www.karinebauzin.ch` renvoie parfois une 503 ; préférer `karinebauzin.ch` sans `www`.
