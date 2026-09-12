# Mode d'emploi — karinebauzin.ch

Tu n’as pas besoin d’apprendre à coder.

Tu parles à un assistant, en français, dans Cursor. Il fait les changements.

Public : Karine (quotidien) et Benoît / l’assistant (détail technique). Repo `benxvii/karinebauzin`.

---

## Trois endroits, trois rôles

**Les textes** (intros, fiches livres, email, téléphone, menu) vivent dans le projet, sur ton ordinateur. Tu les changes dans Cursor.

**Les photos des galeries** (portraits, reportages) vivent dans une bibliothèque en ligne : Cloudinary. Tu y déposes tes images, et tu y supprimes celles que tu ne veux plus.

**Le site en ligne** (karinebauzin.ch) se met à jour tout seul une fois tes changements envoyés. Tu n’as pas à te connecter chez l’hébergeur.

| Élément | Rôle |
|---------|------|
| **Code** (`src/`) | Textes, structure des pages, menu, URLs |
| **`src/config/site.ts`** | Fichier éditorial principal (copie **locale** sur le Mac) |
| **Cloudinary** | **Photos de galeries** (portraits, reportages) + portrait À propos |
| **`public/books/`** | Couvertures livres + affiche film (dans Git) |
| **`public/trustj-logo.png`** | Badge Trust-J (page Contact, dans Git) |
| **GitHub** | Code source + workflow **Sync galleries from Cloudinary** |
| **Infomaniak** | Hébergement (deploy FTP via GitHub Actions). Benoît s’en occupe. |

`site.ts` se modifie en local (projet ouvert dans Cursor), pas directement sur GitHub. Après commit + push, le site se met à jour.

Les photos de galerie viennent du manifeste Cloudinary (`_galleries.json`). Pas de liste de photos dans `site.ts`.

---

## Quoi installer sur ton Mac

**1. Cursor**  
L’application où tu ouvres le projet et tu parles à l’assistant.

[cursor.com](https://cursor.com)

**2. Node.js**  
Un petit programme (prendre la version **LTS**). Sans lui, tu ne peux pas voir le site sur ton ordi avant de publier.

[nodejs.org](https://nodejs.org)

Git est souvent déjà là. Cursor le propose aussi à l’installation.

### Première mise en route

1. Ouvrir le projet dans Cursor
2. Dans le terminal, une seule fois : `npm install`
3. Pour voir le site chez toi : `npm run dev`
4. Ouvrir l’adresse qui s’affiche (souvent http://localhost:5173)

---

## Où te connecter

Benoît t’invite sur le projet GitHub et te donne l’accès Cloudinary. Dans Cursor, tu te connectes une fois avec GitHub.

| Où | Adresse | À quoi ça sert |
| --- | --- | --- |
| **Cursor** | l’appli sur ton Mac | Modifier les textes, ajouter un livre ou un reportage. Tu parles à l’assistant. |
| **GitHub** | [github.com](https://github.com) | Envoyer tes changements. Après un dépôt, une suppression ou un renommage de photos : Actions → *Sync galleries from Cloudinary* → Run. |
| **Cloudinary** | [console.cloudinary.com](https://console.cloudinary.com) | Déposer, supprimer ou renommer tes photos dans le bon dossier. |

Tu n’as pas besoin du compte Infomaniak au quotidien.

---

## Les 2 gestes du quotidien

### Changer un texte

1. Ouvrir Cursor
2. Dire par exemple : *Change l’intro de Cabines de plage avec ce texte : …*
3. Regarder le résultat en local
4. Demander à l’assistant d’envoyer les changements

Pas besoin de Cloudinary pour du texte. Où vit chaque champ : **§ 1**.

### Ajouter, retirer ou classer des photos

Portraits et reportages : Cloudinary, puis sync. Pas de code, pas de `git push`.

Procédure (dossiers, couverture, ordre) : **§ 2**.

Un **nouveau reportage**, c’est les deux : une ligne de texte via Cursor, plus les photos via Cloudinary.

---

## Phrases à dire à l’assistant

> Change l’intro de Cabines de plage avec ce texte : …

> Ajoute un projet reportage « mon-projet » : titre …, intro …. Photos déjà sur Cloudinary dans karinebauzin/reportages/mon-projet/.

> Remplace la couverture de Portraits-ge.ch : fichier dans public/books/, mockup fond blanc légèrement incliné.

> J’ai uploadé des photos dans Cloudinary sous karinebauzin/reportages/swiss-cup-mulet. Comment je lance le sync ?

> J’ai supprimé une photo dans karinebauzin/portraits. Comment je relance le sync ?

> J’ai retiré la couverture de Coupe Weuro. Utilise cette photo à la place : https://res.cloudinary.com/…/….jpg

> Sur `/reportages`, utilise cette photo en couverture de Coupe Weuro : https://res.cloudinary.com/…/kb_….jpg

> Dans swiss-cup-mulet, je ne veux pas DSC3003 et DSC3004 côte à côte.

> Envoie les changements avec un message en français.

---

## Fichiers utiles

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

### Déployer du code

```bash
git add .
git commit -m "description courte"
git push origin main
```

Ou demander à l’assistant : *Envoie les changements avec un message en français.*

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

Portraits et reportages se gèrent de la même façon. Tu bouges les fichiers dans Cloudinary, puis tu lances le sync. **Aucune modification de code** pour une photo normale. Pas de liste de photos dans `site.ts`.

| Page | Dossier Cloudinary |
|------|--------------------|
| `/portraits` | `karinebauzin/portraits/` |
| `/reportages/<slug>` | `karinebauzin/reportages/<slug>/` |

Exemples : `karinebauzin/portraits/`, `karinebauzin/reportages/swiss-cup-mulet/`, `karinebauzin/reportages/144-smur/`.

Le slug du reportage = le nom du dossier. Il doit coller à `path` dans `site.ts` (`/reportages/swiss-cup-mulet` → dossier `swiss-cup-mulet`).

### Ajouter ou retirer une photo

1. [console.cloudinary.com](https://console.cloudinary.com) → **Assets**
2. Ouvrir le dossier de la galerie (tableau ci-dessus)
3. **Ajouter** : **Upload** → glisser les JPG. **Retirer** : cliquer la photo → **Delete** (poubelle) → confirmer
4. Lancer le sync (ci-dessous)
5. Recharger `/portraits` ou `/reportages/<slug>`

Pas de `git push`. Pas besoin de Cursor. Tant que le sync n’a pas tourné, l’ancienne galerie reste affichée. On ne « cache » pas une photo dans le code : on la retire de Cloudinary.

### Si tu supprimes (ou renommes) la photo de couverture d’un reportage

La couverture, c’est la **vignette sur `/reportages`** (la grille des projets). Ce n’est pas forcément la première photo de la galerie. Les portraits n’ont pas de couverture.

Si tu supprimes ou renommes cette photo dans Cloudinary **sans** mettre à jour `coverPublicId` :

- la galerie du projet se met à jour après le sync
- le hub `/reportages` pointe encore vers l’ancien fichier : vignette cassée

Donc, dans l’ordre :

1. Vérifie sur `/reportages` que c’est bien cette photo
2. Choisis la remplaçante (une autre photo du même reportage, ou son URL Cloudinary)
3. Supprime ou renomme l’ancienne dans Cloudinary
4. Dis à l’assistant : *J’ai retiré la couverture de [projet]. Utilise celle-ci à la place : …*
5. L’assistant change `coverPublicId` dans `site.ts` et envoie le code (commit + push)
6. Lance le sync

Sans remplaçante choisie : demande d’enlever `coverPublicId`. Le hub prendra alors la première photo de la galerie (pour un reportage : la première en A→Z).

Changer de couverture **sans** supprimer la photo : juste la phrase à l’assistant. Pas de delete Cloudinary.

### Classer les images (éviter deux photos côte à côte)

Sur téléphone : une seule colonne, les photos s’empilent.

Sur tablette et ordi : **2 colonnes**. Les photos 1 et 2 s’affichent côte à côte, puis 3 et 4, etc. Deux photos qui se suivent dans l’ordre se retrouvent donc l’une à côté de l’autre.

Pour les séparer : glisse une autre photo entre les deux dans le classement. Puis sync.

| Galerie | Comment l’ordre est décidé |
|---------|----------------------------|
| Portraits | Plus récent d’abord (date d’upload Cloudinary) |
| Reportages | Nom de fichier A→Z (**Public ID**, pas le nom affiché) |

**Reportages.** Avant l’upload, préfixe les fichiers : `01-…`, `02-…`, `03-…`. Déjà en ligne : Cloudinary → cliquer la photo → **Rename** / modifier le **Public ID** (le « display name » ne compte pas). `01` et `02` seront côte à côte ; pour les séparer : `01`, `02` (une autre photo), `03`. Si tu renommes la couverture, vois le paragraphe précédent.

**Portraits.** La dernière photo ajoutée passe en haut à gauche. Les deux derniers uploads se retrouvent côte à côte en tête de page. Pour faire remonter une photo : la ré-uploader. Pour séparer deux portraits côte à côte : ré-uploader l’un des deux, ou en ajouter un troisième entre eux (en date).

### Synchroniser le manifeste

Après chaque ajout, suppression **ou** renommage :

1. GitHub → repo → **Actions**
2. **Sync galleries from Cloudinary** → **Run workflow**
3. Attendre le ✅ vert (~30 s)

Le cron tourne aussi tout seul chaque jour à 5h UTC (7h en Suisse). En local : `npm run sync:galleries` si les clés API sont dans l’environnement.

Sur GitHub, le workflow a besoin des secrets `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` (en plus de `CLOUDINARY_CLOUD_NAME` déjà présent).

### Créer un nouveau projet reportage

1. Cloudinary : `karinebauzin/reportages/<slug>/` + upload
2. Cursor ajoute dans `documentary.projects` :

```ts
{
  slug: "mon-projet",
  path: "/reportages/mon-projet",
  title: "Mon projet",
  intro: "",
  coverPublicId: "reportages/mon-projet/nom-fichier",
},
```

`intro` peut rester vide. Sans `coverPublicId`, le hub `/reportages` prend la première photo de la galerie.

3. Optionnel : titre dans `scripts/galleries-meta.json` sous `"reportages/mon-projet"`
4. Lancer **Sync galleries from Cloudinary**

Pas de modification de `routes.ts` / `navigation.ts` : le menu se met à jour tout seul.

Ensuite, les photos de ce projet se gèrent comme n’importe quelle galerie (ajouter / retirer / classer, plus haut).

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
| Ajouter / retirer / classer des photos | ✅ + sync | — | non |
| Retirer ou renommer la **couverture** d’un reportage | ✅ + sync | `site.ts` (`coverPublicId`) | ✅ code |
| Nouveau projet reportage | ✅ upload + sync | `site.ts` (slug/titre) | ✅ code |
| Couverture de livre | — | `public/books/` + `site.ts` | ✅ |
| Livre / film | — | `site.ts` | ✅ |

---

## Erreurs fréquentes

| Problème | Cause | Solution |
|----------|-------|----------|
| Galerie vide | Manifeste pas à jour, ou `.env` sans cloud name | Lancer **Sync galleries** |
| Photo encore visible après suppression | Sync pas lancé | Relancer **Sync galleries**, puis recharger |
| Vignette cassée sur `/reportages` | Couverture supprimée ou renommée, `coverPublicId` pas à jour | Dire à l’assistant quelle nouvelle photo utiliser |
| Deux photos côte à côte alors que tu ne veux pas | Elles se suivent dans l’ordre (2 colonnes) | Glisser une autre photo entre les deux, puis sync |
| Mauvais dossier Cloudinary | Slug ≠ chemin | Aligné sur `docs/MEDIA.md` |
| Page 404 | `path` / `slug` incohérent | `path` = `/reportages/` ou `/livres/` + slug |
| Métadonnées en double dans un livre | Texte dans `body` + champs | Garder les champs structurés |
| `npm run dev` plante (Rollup) | `node_modules` cassé | `rm -rf node_modules && npm install` |

---

## Ce que l'assistant ne doit pas faire sans demande explicite

- Créer des commits ou pousser sur GitHub
- Modifier les secrets / `.env` de production
- Committer des photos de **galeries** dans Git (→ Cloudinary)
- Filtrer une photo dans le code au lieu de la retirer de Cloudinary + sync
- Supprimer des fichiers dans `public/books/` sans remplacement
- Toucher à `navigation.ts` pour un simple ajout livre/projet (automatique)

Voir aussi : `docs/ARCHITECTURE.md`, `docs/MEDIA.md`, `README.md`.
