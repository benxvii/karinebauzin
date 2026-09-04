# Médias — karinebauzin.ch

Où sont les images, comment les ajouter, et ce qui est versionné dans Git.

## Règle générale

| Type d’image | Où ça vit | Qui gère |
|--------------|-----------|----------|
| **Galeries** (portraits, reportages, hero, à propos) | **Cloudinary** | Upload Media Library + config dans `site.ts` |
| **Couvertures livres / affiche film** | `public/books/` (Git) | Fichier local + chemin dans `site.ts` |
| **Logo / favicon** | `public/logo.png` (Git) | Rarement modifié |

Les galeries passent **directement par Cloudinary**. Pas d’upload de photos de galerie dans Git, sauf exception temporaire.

Les URLs Unsplash encore présentes dans le code sont des **placeholders** le temps de brancher le compte Cloudinary et d’uploader les vraies photos.

## Cloudinary (source de vérité pour les galeries)

### Config locale

```env
# .env (copier depuis .env.example)
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_FOLDER=   # ex. karine-bauzin
```

Fichier utilitaire : `src/lib/cloudinary.ts`

- `cloudinaryUrl(publicId, options)` → URL transformée
- `resolveImageUrl(publicId, fallbackUrl)` → Cloudinary ou repli

### Convention de dossiers Cloudinary

Préfixe = `VITE_CLOUDINARY_FOLDER` (ex. `karine-bauzin`) :

| Contenu | Dossier / public_id |
|---------|---------------------|
| Portraits | `portraits/...` |
| Reportages | `reportages/<slug>/...` |
| Hero accueil | `home/hero` |
| À propos | `about/portrait` |
| Couvertures livres (optionnel plus tard) | `livres/<slug>` |

Exemple : photo d’un projet « swiss-cu » →  
`karine-bauzin/reportages/swiss-cu/photo-01`

### Workflow — ajouter ou enrichir une galerie

1. Ouvrir [console.cloudinary.com](https://console.cloudinary.com) → **Assets**
2. Créer / ouvrir le dossier correspondant au slug (voir tableau ci-dessus)
3. **Upload** les JPG / PNG
4. Dans Cursor : demander d’ajouter la galerie ou les photos dans `src/config/site.ts` (titre, intro, `public_id` / liste d’images)
5. Vérifier en local avec `npm run dev`
6. Commit + push du **code** uniquement (pas les binaires Cloudinary)

Aucune photo de galerie à committer dans Git.

## Couvertures livres (`public/books/`)

Exception volontaire : les mockups et affiches restent dans le repo pour l’instant.

| Fichier | URL | Usage |
|---------|-----|-------|
| `public/logo.png` | `/logo.png` | Favicon |
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

## Placeholders Unsplash (temporaire)

Encore utilisés tant que Cloudinary n’est pas rempli :

- `portraitGallery`, `documentary.projects[]` dans `site.ts`
- Hero dans `Home.tsx`

À remplacer par des `public_id` Cloudinary + `resolveImageUrl()`.

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
