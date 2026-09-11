# Architecture — karinebauzin.ch

Ce document décrit l’ossature technique du site (routage, pages, layouts, sources de données).

## Stack

| Couche | Technologie |
|--------|-------------|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Styles | Tailwind CSS 4 |
| Routage | React Router 7 |
| Icônes | Lucide React |
| Galeries | `react-responsive-masonry` |
| Composants UI | shadcn/ui (`src/app/components/ui/`) |

Maquette de référence : [Figma — Site web photographe moderne](https://www.figma.com/design/f0hPsOsO9DsyMLAUEMOsJ6/Site-web-photographe-moderne).

Diagramme fonctionnel : `Diagramme WebSiteKarine.drawio` (racine du repo).

## Entrée et routage

- Point d’entrée React : `src/main.tsx`
- App root : `src/app/App.tsx` (fournit le router)
- Routage : `src/app/routes.ts` via `createBrowserRouter`

Le routeur déclare un layout racine (`Layout`) commun à toutes les pages :

```
/                       → redirige vers /reportages
/about                  → About
/portraits              → GalleryPortraits
/corporate              → redirige vers /portraits
/portrait-presse        → redirige vers /portraits
/reportages             → DocumentaireIndex
/reportages/:slug       → DocumentaireProject
/documentaire           → redirige vers /reportages
/documentaire/:slug     → redirige vers /reportages/:slug
/livres                 → LivresIndex
/livres/:slug           → LivreDetail
/shop                   → redirige vers /livres
/contact                → Contact
/gallery/portraits      → redirige vers /portraits
/gallery/corporate      → redirige vers /portraits
*                       → NotFound
```

Redirections courtes : `/reportages/swiss-cu` → Swiss Cup Mulet, `/reportages/144` → 144 – SMUR.

## Fichiers de configuration

| Fichier | Rôle |
|---------|------|
| `src/config/site.ts` | Contenu éditorial : identité, galeries, reportages, livres/films |
| `src/config/navigation.ts` | Menu principal (dérivé automatiquement de `site.ts`) |
| `src/lib/cloudinary.ts` | Construction d’URLs Cloudinary pour les **galeries** |
| `.env` | `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_FOLDER` (`karinebauzin`), `VITE_MANIFEST_URL` (voir `.env.example`) |
| `src/hooks/useGalleries.ts` | Charge le manifeste `_galleries.json` (Cloudinary, puis copie locale) |
| `scripts/sync-galleries.mjs` | Liste les photos Cloudinary et publie le manifeste |

**Médias :** les photos de galeries vivent sur **Cloudinary** et sont listées par le manifeste `_galleries.json` (voir `docs/MEDIA.md`). Le portrait À propos est un public ID fixe. Les couvertures livres restent dans `public/books/` (Git). Pas de `placeholderImages` dans `site.ts`.

Le menu se met à jour **automatiquement** à partir de `site.ts` via `navigation.ts`. Pas besoin de toucher à `navigation.ts` pour ajouter un livre ou un projet reportage.

Champs `intro` (`portraitGallery`, `documentary.intro`, `documentary.projects[].intro`, `livres.intro`) : souvent vides, c’est voulu. Le hub et la page détail n’affichent le texte que s’il n’est pas vide.

## Layouts et wrappers partagés

### Layout global (header + footer + `<Outlet />`)

- Composant : `src/app/components/Layout.tsx`
- Données : `navigation.ts` (`mainNavigation`), `site.ts` (`site`)
- Header : `site.name` + sous-titre « Photographe » (classes `.site-name` / `.site-tagline` dans `src/styles/fonts.css`), lien vers `/reportages`
- Menu desktop Reportages / Livres : dropdown au survol. Liste scrollable (`max-h-[calc(100dvh-6rem)]`, classe `.nav-dropdown-scroll` dans `theme.css`) pour les 24 reportages
- Footer : copyright (plus petit) à gauche, icônes Instagram et LinkedIn **centrées**. Pas de téléphone ni d’email (ils restent sur `/contact`)

### Wrapper « hub » (grille de cartes)

- Composant : `src/app/components/SectionHub.tsx`
- Titre de section en `sr-only` (pas de bandeau visible)
- Cartes : image + titre en majuscules (`text-base`), sans CTA « Voir le… »
- Hub Livres : titres seuls (descriptions non passées)
- Hub Reportages : intro du projet sous le titre si elle n’est pas vide ; image = `coverPublicId` (sinon première photo du manifeste)
- Utilisé par :
  - `DocumentaireIndex.tsx`
  - `LivresIndex.tsx`

### Galerie photo

- Composant : `src/app/components/GalleryPage.tsx`
- Layout : colonne vide sticky 1/3 à gauche (desktop `lg`), masonry (`react-responsive-masonry`, 1 colonne / 2 dès `md`) dans les 2/3 droits
- Clic image → `Lightbox.tsx` (plein écran, Escape, flèches, clic gauche/droite)
- `showHeader` (défaut `true`) : bandeau titre + intro si l’intro n’est pas vide ; `false` = grille seule
- Utilisé par :
  - `GalleryPortraits.tsx` → `/portraits` (`showHeader={false}`)
  - `DocumentaireProject.tsx` → `/reportages/:slug`

## Pages (routes)

### `/` — Entrée

Redirige vers `/reportages`. Pas de composant `Home.tsx`.

### `/about` — À propos

- Composant : `src/app/components/About.tsx`
- Bio : 10 paragraphes **dans** `About.tsx` (pas dans `site.ts`), sans titre « KARINE BAUZIN » au-dessus
- Paragraphes : style global (`p` dans `theme.css`) — 16px, gray-600, interligne 1.375, alignés à gauche
- Stats (caméras, ouvrages, documentaire, images, personnes)
- Portrait : Cloudinary `Karine_Bauzin_cfgzty` via `resolveImageUrl()` (Unsplash seulement si le cloud name `.env` est absent)

### `/portraits`

- Composant : `GalleryPortraits.tsx`
- Données : `portraitGallery` dans `site.ts`
- Grille seule, sans bandeau titre/intro
- Images : manifeste Cloudinary (`useGalleries`), ordre plus récent d’abord (fixé au sync)
- Galerie absente du manifeste → message, pas d’images Unsplash

### `/reportages` et `/reportages/:slug`

- Index : `DocumentaireIndex.tsx` → hub `SectionHub`
- Détail : `DocumentaireProject.tsx` → `GalleryPage` (photos via manifeste)
- Données éditoriales : `documentary.projects[]` dans `site.ts` (slug, titre, intro optionnelle, `coverPublicId`)
- Dossier Cloudinary : `karinebauzin/reportages/<slug>/`
- 24 projets (ordre du tableau `site.ts` = ordre du hub et du menu)

### `/livres` et `/livres/:slug`

- Index : `LivresIndex.tsx` → hub `SectionHub` (image + titre, pas de résumé)
- Détail : `LivreDetail.tsx` (titre en majuscules)
- Données : `livres.items[]` dans `site.ts`
- 7 ouvrages + 1 film (`kind: "film"`)
- Métadonnées page détail (livres uniquement) : `BookMeta` dans `LivreDetail.tsx`
  - Photographies : Karine Bauzin
  - Statut (`availability`) si défini
  - Éditeur, ISBN, langue, pages, format
  - Prix, frais de port, commande TWINT
  - Bouton « Commander par email » si `price` défini

### `/contact`

- Composant : `src/app/components/Contact.tsx`
- Colonne gauche : nom, téléphone, email, badge Trust-J (`site.trustJ`)
- Colonne droite : formulaire (nom, email, sujet, message) → ouvre `mailto:` vers `site.email`

## Composants partagés (UI)

- Images avec repli : `src/app/components/figma/ImageWithFallback.tsx`
- Lightbox : `src/app/components/Lightbox.tsx`
- Composants shadcn : `src/app/components/ui/*.tsx`
- Styles : `src/styles/theme.css` (`--brand: #7a2032`, style des `p`, scrollbar du menu), `fonts.css` (DM Sans pour `.site-name` / `.site-tagline`)
- Polices chargées dans `index.html` : DM Sans (header) + IBM Plex Sans (chargée, pas encore appliquée au corps)

## Identité du site (`site.ts` → objet `site`)

| Champ | Valeur actuelle |
|-------|-----------------|
| Email | info@karinebauzin.ch |
| Téléphone | +41 78 649 49 98 |
| Instagram | instagram.com/karinebauzin |
| LinkedIn | linkedin.com/in/karinebauzin |
| Logo | `/logo.png` (favicon ; header en texte) |
| Trust-J | `site.trustJ` — texte, URL trust-j.org, logo `/trustj-logo.png` |

## Déploiement

- **Code** : GitHub (`benxvii/karinebauzin`) → FTP Infomaniak (`.github/workflows/deploy.yml`)
- **Galeries** : Cloudinary + workflow **Sync galleries from Cloudinary** (cron 5h UTC)
- **Portrait À propos** : Cloudinary `Karine_Bauzin_cfgzty`
- **Couvertures livres** : `public/books/` dans Git
- **Logo Trust-J** : `public/trustj-logo.png` dans Git
