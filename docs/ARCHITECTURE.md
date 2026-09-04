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
| Composants UI | shadcn/ui (`src/app/components/ui/`) |

Maquette de référence : [Figma — Site web photographe moderne](https://www.figma.com/design/f0hPsOsO9DsyMLAUEMOsJ6/Site-web-photographe-moderne).

Diagramme fonctionnel : `Diagramme WebSiteKarine.drawio` (racine du repo).

## Entrée et routage

- Point d’entrée React : `src/main.tsx`
- App root : `src/app/App.tsx` (fournit le router)
- Routage : `src/app/routes.ts` via `createBrowserRouter`

Le routeur déclare un layout racine (`Layout`) commun à toutes les pages :

```
/                       → Home
/about                  → About
/portraits              → GalleryPortraits
/corporate              → GalleryCorporate
/portrait-presse        → PortraitPresse
/reportages             → DocumentaireIndex
/reportages/:slug       → DocumentaireProject
/livres                 → LivresIndex
/livres/:slug           → LivreDetail
/shop                   → redirige vers /livres
/contact                → redirige vers /
/gallery/portraits      → redirige vers /portraits
/gallery/corporate      → redirige vers /corporate
*                       → NotFound
```

## Fichiers de configuration

| Fichier | Rôle |
|---------|------|
| `src/config/site.ts` | Contenu éditorial : identité, galeries, reportages, livres/films |
| `src/config/navigation.ts` | Menu principal (dérivé automatiquement de `site.ts`) |
| `src/lib/cloudinary.ts` | Construction d’URLs Cloudinary pour les **galeries** |
| `.env` | `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_FOLDER` (voir `.env.example`) |

**Médias :** les photos de galeries vivent sur **Cloudinary** (voir `docs/MEDIA.md`). Les couvertures livres restent dans `public/books/` (Git). Les Unsplash encore présents sont des placeholders temporaires.

Le menu se met à jour **automatiquement** à partir de `site.ts` via `navigation.ts`. Pas besoin de toucher à `navigation.ts` pour ajouter un livre ou un projet documentaire.

## Layouts et wrappers partagés

### Layout global (header + footer + `<Outlet />`)

- Composant : `src/app/components/Layout.tsx`
- Données : `navigation.ts` (`mainNavigation`), `site.ts` (`site`)
- Header : texte « Karine Bauzin » + sous-titre « PHOTOGRAPHE », lien vers `/`
- Footer : téléphone, email, Instagram, LinkedIn

### Wrapper « hub » (grille de cartes)

- Composant : `src/app/components/SectionHub.tsx`
- Utilisé par :
  - `DocumentaireIndex.tsx`
  - `LivresIndex.tsx`

### Galerie photo (grille d’images)

- Composant : `src/app/components/GalleryPage.tsx`
- Utilisé par :
  - `GalleryPortraits.tsx` → `/portraits`
  - `GalleryCorporate.tsx` → `/corporate`
  - `PortraitPresse.tsx` → `/portrait-presse`
  - `DocumentaireProject.tsx` → `/reportages/:slug`

## Pages (routes)

### `/` — Accueil

- Composant : `src/app/components/Home.tsx`
- Données : `site`, `portraitGalleries`, `portraitPresse`, `documentary`, `livres`
- Hero plein écran + liens vers les sections principales

### `/about` — À propos

- Composant : `src/app/components/About.tsx`
- Données : bio en paragraphes, stats, sections Expositions / Philosophie (encore partielles)

### `/portraits`, `/corporate`, `/portrait-presse`

- Composants : `GalleryPortraits.tsx`, `GalleryCorporate.tsx`, `PortraitPresse.tsx`
- Données : `portraitGalleries[]`, `portraitPresse` dans `site.ts`
- Images : **Cloudinary** (cible) ; placeholders Unsplash temporaires dans `placeholderImages[]`

### `/reportages` et `/reportages/:slug`

- Index : `DocumentaireIndex.tsx` → hub `SectionHub`
- Détail : `DocumentaireProject.tsx` → `GalleryPage`
- Données : `documentary.projects[]` dans `site.ts`
- Projets actuels : Swiss Cu, 144

### `/livres` et `/livres/:slug`

- Index : `LivresIndex.tsx` → hub `SectionHub`
- Détail : `LivreDetail.tsx`
- Données : `livres.items[]` dans `site.ts`
- Livres : 7 ouvrages + 1 film (`kind: "film"`)
- Métadonnées page détail (livres uniquement) : composant `BookMeta` dans `LivreDetail.tsx`
  - Photographies : Karine Bauzin
  - Statut (`availability`) si défini — ex. « Ouvrage épuisé »
  - ISBN, langue, pages, format
  - Prix, frais de port, commande TWINT
  - Bouton « Commander par email » si `price` défini

## Composants partagés (UI)

- Images avec repli : `src/app/components/figma/ImageWithFallback.tsx`
- Composants shadcn : `src/app/components/ui/*.tsx`
- Styles : `src/styles/theme.css` (couleur accent `--brand: #7a2032`), `fonts.css` (DM Sans)

## Identité du site (`site.ts` → objet `site`)

| Champ | Valeur actuelle |
|-------|-----------------|
| Email | info@karinebauzin.ch |
| Téléphone | +41 78 649 4998 |
| Instagram | instagram.com/karinebauzin |
| LinkedIn | linkedin.com/in/karinebauzin |
| Logo | `/logo.png` (favicon ; header en texte) |

## Déploiement prévu

- **Code** : GitHub (`benxvii/karinebauzin`)
- **Hébergement** : Vercel ou Netlify (recommandé dans le README)
- **Images galeries** : Cloudinary (dès le départ — voir `MEDIA.md`)
- **Couvertures livres** : `public/books/` dans Git
