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
| **Cloudinary** | **Toutes les photos de galeries** (portraits, corporate, presse, reportages, hero…) |
| **`public/books/`** | Couvertures livres + affiche film (dans Git) |
| **GitHub** | Code source |
| **Vercel / Netlify** | Hébergement prévu |

**Important :** `site.ts` se modifie en local (projet ouvert dans Cursor), pas directement sur GitHub. Après commit + push, GitHub se met à jour.

Les URLs Unsplash encore visibles sont des **placeholders temporaires**. Les vraies photos de galerie vont sur **Cloudinary**.

### Fichiers utiles

| Fichier | Contenu |
|---------|---------|
| `src/config/site.ts` | Contenu éditorial |
| `src/config/navigation.ts` | Menu (généré depuis `site.ts`) |
| `public/books/` | Couvertures livres/films |
| `docs/ARCHITECTURE.md` | Structure technique |
| `docs/MEDIA.md` | Emplacement des images + Cloudinary |
| `.env` | `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_FOLDER` |

### Sections dans `site.ts`

| Objet | Contenu |
|-------|---------|
| `site` | Nom, email, téléphone, réseaux, logo |
| `portraitGalleries` | `/portraits`, `/corporate` |
| `portraitPresse` | `/portrait-presse` |
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
3. L’assistant modifie **`src/config/site.ts`** (parfois `About.tsx` pour la bio)
4. Vérifier en local → commit / push

Pas besoin de Cloudinary pour du texte.

### B. Ajouter une galerie + des images

1. **Cloudinary** → créer le dossier (ex. `karine-bauzin/reportages/mon-projet/`)
2. **Upload** les photos dans ce dossier
3. Dans Cursor : *« Ajoute le projet reportage mon-projet avec ces photos Cloudinary »*
4. L’assistant met à jour `site.ts` (slug, titre, intro, images)
5. Vérifier en local → commit / push du **code** seulement

Voir `docs/MEDIA.md` pour la convention de dossiers Cloudinary.

---

## 1. Modifier des textes (détail)

Ouvrir `src/config/site.ts` (ou laisser Cursor le faire).

| Élément | Où |
|---------|-----|
| Email, téléphone, réseaux | objet `site` |
| Titre / intro galerie | `portraitGalleries[]`, `portraitPresse` |
| Projet documentaire | `documentary.projects[]` |
| Fiche livre | `livres.items[]` |
| Bio À propos | `src/app/components/About.tsx` |

Champs d’une fiche livre :

| Champ | Usage |
|-------|-------|
| `slug`, `path`, `title` | URL et titre |
| `description` | Résumé (hub + haut de page) |
| `body` | Texte principal |
| `image` | Couverture `/books/...` |
| `price`, `shippingFee` | CHF |
| `isbn`, `language`, `pages`, `format` | Specs sous « Photographies » |
| `availability` | « Ouvrage épuisé », « Ouvrage privé - Ville de Genève », etc. |
| `kind: "film"` | Pas de prix ni bouton commander |

Les métadonnées (photographies, ISBN, prix, TWINT) passent par `BookMeta` dans `LivreDetail.tsx` — **ne pas** les coller dans `body`.

---

## 2. Galeries et photos (Cloudinary)

### Ajouter des photos à une galerie existante

1. Upload Cloudinary dans le **bon dossier** (même slug que dans `site.ts`)
2. Demander à Cursor de brancher les nouveaux `public_id` / URLs dans `site.ts`
3. Pas de commit d’images binaires de galerie

### Créer un nouveau projet reportage (galerie)

1. Cloudinary : `…/reportages/<slug>/` + upload
2. Cursor ajoute dans `documentary.projects` :

```ts
{
  slug: "mon-projet",
  path: "/reportages/mon-projet",
  title: "Mon projet",
  intro: "Texte d'introduction.",
  // images : public_id Cloudinary (pas Unsplash en prod)
},
```

Pas de modification de `routes.ts` / `navigation.ts` : le menu se met à jour tout seul.

### Autres galeries (portraits, corporate, presse)

Même principe Cloudinary + mise à jour des listes d’images dans `site.ts`.  
Une **nouvelle section** hors Reportages / Livres peut aussi demander une route dans `routes.ts` (plus rare).

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
| Modifier un texte | — | `site.ts` (ou `About.tsx`) | ✅ |
| Ajouter photos / nouvelle galerie | ✅ upload | `site.ts` | ✅ code |
| Couverture de livre | — | `public/books/` + `site.ts` | ✅ |
| Livre / film | — | `site.ts` | ✅ |

---

## Erreurs fréquentes

| Problème | Cause | Solution |
|----------|-------|----------|
| Galerie vide / placeholders Unsplash | Photos pas encore sur Cloudinary | Upload + brancher les `public_id` |
| Mauvais dossier Cloudinary | Slug ≠ chemin | Aligné sur `docs/MEDIA.md` |
| Page 404 | `path` / `slug` incohérent | `path` = `/reportages/` ou `/livres/` + slug |
| Métadonnées en double dans un livre | Texte dans `body` + champs | Garder les champs structurés |
| `npm run dev` plante (Rollup) | `node_modules` cassé | `rm -rf node_modules && npm install` |

---

## Prompts Cursor (exemples)

> Change l’intro de « Cabines de plage » dans site.ts avec ce texte : …

> J’ai uploadé des photos dans Cloudinary sous reportages/swiss-cu. Branche-les sur le projet Swiss Cu.

> Ajoute un projet reportage « mon-projet » : titre …, intro …, photos déjà sur Cloudinary dans reportages/mon-projet/.

> Remplace la couverture de Portraits-ge.ch : fichier dans public/books/, mockup fond blanc légèrement incliné.

> Commit les changements avec un message en français.

---

## Ce que l'assistant ne doit pas faire sans demande explicite

- Créer des commits ou pousser sur GitHub
- Modifier les secrets / `.env` de production
- Committer des photos de **galeries** dans Git (→ Cloudinary)
- Supprimer des fichiers dans `public/books/` sans remplacement
- Toucher à `navigation.ts` pour un simple ajout livre/projet (automatique)

Voir aussi : `docs/ARCHITECTURE.md`, `docs/MEDIA.md`, `README.md`.
