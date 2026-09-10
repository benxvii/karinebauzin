# Mode d'emploi — modifications du site karinebauzin.ch

Guide pour travailler sur le site via **Cursor**, repo `benxvii/karinebauzin`.

Public cible : Benoît et Karine (éditeur / éditrice via Cursor).

---

## Avant de commencer

### Comment le site fonctionne

| Élément | Rôle |
|---------|------|
| **Code** (`src/`) | Textes, structure des pages, menu, URLs |
| **`src/config/site.ts`** | Fichier éditorial principal (copie **locale** sur le Mac) |
| **Cloudinary** | **Photos de galeries** (portraits, reportages) + portrait À propos |
| **`public/books/`** | Couvertures livres + affiche film (dans Git) |
| **`public/trustj-logo.png`** | Badge Trust-J (page Contact, dans Git) |
| **GitHub** | Code source + workflow **Sync galleries from Cloudinary** |
| **Infomaniak** | Hébergement (deploy FTP via GitHub Actions) |

**Important :** `site.ts` se modifie en local (projet ouvert dans Cursor), pas directement sur GitHub. Après commit + push, GitHub se met à jour.

Les photos de galerie viennent du manifeste Cloudinary (`_galleries.json`). Les URLs Unsplash dans `placeholderImages[]` ne s’affichent que si une galerie n’est pas encore dans le manifeste.

### Fichiers utiles

| Fichier | Contenu |
|---------|---------|
| `src/config/site.ts` | Contenu éditorial |
| `src/config/navigation.ts` | Menu (généré depuis `site.ts`) |
| `src/app/components/About.tsx` | Bio, stats, portrait Cloudinary |
| `src/app/components/Contact.tsx` | Formulaire + affichage Trust-J |
| `public/books/` | Couvertures livres/films |
| `public/trustj-logo.png` | Logo Trust-J |
| `docs/ARCHITECTURE.md` | Structure technique |
| `docs/MEDIA.md` | Emplacement des images + Cloudinary |
| `.env` | `VITE_CLOUDINARY_CLOUD_NAME` ; `VITE_CLOUDINARY_FOLDER=karinebauzin` ; `VITE_MANIFEST_URL` |
| `scripts/sync-galleries.mjs` | Scan Cloudinary → `_galleries.json` |
| `public/_galleries.json` | Copie locale du manifeste (secours) |

### Sections dans `site.ts`

| Objet | Contenu |
|-------|---------|
| `site` | Nom, email, téléphone, réseaux, logo, Trust-J (`trustJ`) |
| `portraitGallery` | `/portraits` |
| `documentary` | Hub + projets `/reportages/:slug` |
| `livres` | Hub + fiches `/livres/:slug` |

Le menu se met à jour **automatiquement** quand on ajoute un livre ou un projet documentaire dans `site.ts`.

### Prévisualiser en local

```bash
npm install   # si besoin
npm run dev
```

Ouvrir l’URL affichée (souvent http://localhost:5173).

### Déployer du code

```bash
git add .
git commit -m "description courte"
git push origin main
```

---

## Les 2 gestes les plus simples

### A. Modifier du texte

1. Ouvrir le projet dans Cursor
2. Demander : *« Change l’intro de Cabines de plage avec ce texte : … »*
3. L’assistant modifie **`src/config/site.ts`** (parfois `About.tsx` pour la bio, `Contact.tsx` pour le formulaire)
4. Vérifier en local → commit / push

Pas besoin de Cloudinary pour du texte.

### B. Ajouter des photos à une galerie existante

**Aucune modification de code.** Uniquement Cloudinary + sync.

1. **Cloudinary** → uploader dans le dossier du slug (ex. `karinebauzin/reportages/swiss-cup-mulet/`)
2. GitHub → **Actions** → **Sync galleries from Cloudinary** → Run
3. Recharger la page. Pas de `git push`.

Pour un **nouveau** reportage : upload Cloudinary + une entrée slug/titre dans `site.ts` (sans liste de photos) + sync. Voir section 2.

---

## 1. Modifier des textes (détail)

Ouvrir `src/config/site.ts` (ou laisser Cursor le faire).

| Élément | Où |
|---------|-----|
| Email, téléphone, réseaux | objet `site` |
| Badge Trust-J (texte, URL, logo) | `site.trustJ` |
| Titre / intro galerie | `portraitGallery` |
| Projet documentaire | `documentary.projects[]` |
| Fiche livre | `livres.items[]` |
| Bio À propos | `src/app/components/About.tsx` (pas `site.ts`) |
| Formulaire / mise en page Contact | `src/app/components/Contact.tsx` |

Champs d’une fiche livre :

| Champ | Usage |
|-------|-------|
| `slug`, `path`, `title` | URL et titre |
| `description` | Résumé (page détail livre ; **pas** affiché sur le hub `/livres`) |
| `body` | Texte principal |
| `image` | Couverture `/books/...` |
| `price`, `shippingFee` | CHF |
| `publisher` | Éditeur (affiché dans `BookMeta`) |
| `isbn`, `language`, `pages`, `format` | Specs sous « Photographies » |
| `availability` | « Ouvrage épuisé », « Ouvrage privé - Ville de Genève », etc. |
| `kind: "film"` | Pas de prix ni bouton commander |

Les métadonnées (photographies, éditeur, ISBN, prix, TWINT) passent par `BookMeta` dans `LivreDetail.tsx` — **ne pas** les coller dans `body`.

---

## 2. Galeries et photos (Cloudinary)

### Ajouter des photos à une galerie existante

**Aucune modification de code.**

#### Étape A — Uploader sur Cloudinary

1. [console.cloudinary.com](https://console.cloudinary.com) → **Assets**
2. Dossier de la galerie, par exemple :

```
karinebauzin/portraits/
karinebauzin/reportages/swiss-cup-mulet/
```

3. **Upload** → glisser les JPG

| Galerie dans `site.ts` | Dossier Cloudinary |
|------------------------|--------------------|
| `portraitGallery` (`slug: "portraits"`) | `karinebauzin/portraits/` |
| `slug: "swiss-cup-mulet"` | `karinebauzin/reportages/swiss-cup-mulet/` |
| `slug: "144-smur"` | `karinebauzin/reportages/144-smur/` |

#### Étape B — Synchroniser le manifeste

1. GitHub → repo → **Actions**
2. **Sync galleries from Cloudinary** → **Run workflow**
3. Attendre le ✅ vert (~30 s)

En local : `npm run sync:galleries` si les clés API sont dans l’environnement. Sinon GitHub → **Actions** → **Sync galleries from Cloudinary**.

Sur GitHub, le workflow a besoin des secrets `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` (en plus de `CLOUDINARY_CLOUD_NAME` déjà présent).

Le workflow tourne aussi tout seul chaque jour à 5h UTC.

#### Étape C — Vérifier

Recharger `/portraits` ou `/reportages/<slug>`.

**Pas de `git push` nécessaire.**

### Créer un nouveau projet reportage (galerie)

1. Cloudinary : `karinebauzin/reportages/<slug>/` + upload
2. Cursor ajoute dans `documentary.projects` :

```ts
{
  slug: "mon-projet",
  path: "/reportages/mon-projet",
  title: "Mon projet",
  intro: "Texte d'introduction.",
  placeholderImages: [],
},
```

3. Optionnel : titre dans `scripts/galleries-meta.json` sous `"reportages/mon-projet"`
4. Lancer **Sync galleries from Cloudinary**

Pas de modification de `routes.ts` / `navigation.ts` : le menu se met à jour tout seul.

### Autres galeries (portraits)

Même geste : upload dans `karinebauzin/portraits/` + sync. Pas de liste de photos dans `site.ts`.

---

## 3. Couvertures livres (`public/books/`)

Exception : pas Cloudinary pour l’instant.

1. Fichier dans `public/books/`
2. `image: "/books/..."` dans `site.ts`
3. Commit du fichier + du code

Pour un livre / film entier : ajouter un objet dans `livres.items` (voir exemples dans `site.ts`).

---

## 4. Statuts de disponibilité (livres)

```ts
availability: "Ouvrage épuisé",
// ou
availability: "Ouvrage privé - Ville de Genève",
```

Sans `price` : pas de ligne prix/TWINT, pas de bouton commander.

---

## Récap rapide

| Tâche | Cloudinary | Fichiers | Git push |
|-------|------------|----------|----------|
| Modifier un texte | — | `site.ts` (ou `About.tsx` / `Contact.tsx`) | ✅ |
| Badge Trust-J | — | `site.trustJ` + `public/trustj-logo.png` | ✅ |
| Ajouter photos (galerie existante) | ✅ upload + sync | — | non |
| Nouveau projet reportage | ✅ upload + sync | `site.ts` (slug/titre) | ✅ code |
| Couverture de livre | — | `public/books/` + `site.ts` | ✅ |
| Livre / film | — | `site.ts` | ✅ |

---

## Erreurs fréquentes

| Problème | Cause | Solution |
|----------|-------|----------|
| Galerie vide / Unsplash | Manifeste pas à jour, ou `.env` sans cloud name | Lancer **Sync galleries** |
| Mauvais dossier Cloudinary | Slug ≠ chemin | Aligné sur `docs/MEDIA.md` |
| Page 404 | `path` / `slug` incohérent | `path` = `/reportages/` ou `/livres/` + slug |
| Métadonnées en double dans un livre | Texte dans `body` + champs | Garder les champs structurés |
| `npm run dev` plante (Rollup) | `node_modules` cassé | `rm -rf node_modules && npm install` |

---

## Prompts Cursor (exemples)

> Change l’intro de « Cabines de plage » dans site.ts avec ce texte : …

> J’ai uploadé des photos dans Cloudinary sous karinebauzin/reportages/swiss-cup-mulet. Comment je lance le sync ?

> Ajoute un projet reportage « mon-projet » : titre …, intro …. Photos déjà sur Cloudinary dans karinebauzin/reportages/mon-projet/.

> Remplace la couverture de Portraits-ge.ch : fichier dans public/books/, mockup fond blanc légèrement incliné.

> Change le texte Trust-J sur la page Contact.

> Commit les changements avec un message en français.

---

## Ce que l'assistant ne doit pas faire sans demande explicite

- Créer des commits ou pousser sur GitHub
- Modifier les secrets / `.env` de production
- Committer des photos de **galeries** dans Git (→ Cloudinary)
- Supprimer des fichiers dans `public/books/` sans remplacement
- Toucher à `navigation.ts` pour un simple ajout livre/projet (automatique)

Voir aussi : `docs/ARCHITECTURE.md`, `docs/MEDIA.md`, `README.md`.
