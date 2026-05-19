# Karine Bauzin — site photographe

Site vitrine : accueil, à propos, portraits, corporate, portrait presse, documentaire (projets extensibles), livres (pages extensibles), contact.

Structure détaillée : voir `Diagramme WebSiteKarine.drawio`.

- **Code** : GitHub
- **Images** (à venir) : [Cloudinary](https://cloudinary.com)
- **Maquette Figma** : [Site web photographe moderne](https://www.figma.com/design/f0hPsOsO9DsyMLAUEMOsJ6/Site-web-photographe-moderne)

## Démarrage local

```bash
npm install
npm run dev
```

## Configuration Cloudinary

1. Créez un compte sur [cloudinary.com](https://cloudinary.com).
2. Copiez `.env.example` vers `.env` et renseignez `VITE_CLOUDINARY_CLOUD_NAME`.
3. Uploadez vos photos dans le Media Library (dossier optionnel via `VITE_CLOUDINARY_FOLDER`).
4. Utilisez le `public_id` Cloudinary dans le code via `resolveImageUrl()` (`src/lib/cloudinary.ts`).

En attendant, le site affiche des images placeholder (Unsplash).

## GitHub

```bash
git init
git add .
git commit -m "Initial commit — site Karine Bauzin"
git remote add origin https://github.com/VOTRE_COMPTE/karine-bauzin.git
git push -u origin main
```

Déploiement conseillé : [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) connectés au dépôt GitHub. Ajoutez les variables d’environnement Cloudinary dans le tableau de bord de l’hébergeur.

## Personnalisation

- Textes : `src/config/site.ts` et composants dans `src/app/components/`
- **Documentaire** : ajoutez un objet dans `documentary.projects` (`site.ts`)
- **Livres** : ajoutez un objet dans `livres.items` (`site.ts`)
- Logo : `public/logo.png`
- Couvertures livres : `public/books/` (à migrer vers Cloudinary : `livres/nom-du-livre`)
