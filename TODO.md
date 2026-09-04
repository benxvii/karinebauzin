# TODO

## Cloudinary — renommer le dossier Documentaire

La page **Documentaire** s’appelle maintenant **Reportages** (`/reportages`).

Le code et la doc sont à jour. Le dossier dans Cloudinary, lui, reste à corriger à la main (pas d’accès au compte depuis ici).

CLOUDINARY
- [ ] Ouvrir [console.cloudinary.com](https://console.cloudinary.com) → **Assets**
- [ ] Renommer `documentaire` en `reportages` (ou recréer le dossier sous ce nom)
- [ ] Vérifier les sous-dossiers de projets (`swiss-cu`, `144`, etc.) : ils doivent vivre sous `reportages/<slug>/`
- [ ] Les nouveaux uploads vont dans `reportages/<slug>/`, plus dans `documentaire/`

LOOK DU SITE
- [ ] Revoir si les fonts sont uniformes (polices et tailles)

Convention cible (préfixe `VITE_CLOUDINARY_FOLDER`, ex. `karine-bauzin`) :

`karine-bauzin/reportages/swiss-cu/photo-01`

Détail : `docs/MEDIA.md`.
