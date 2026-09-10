# Ton site, comment ça marche

Tu n’as pas besoin d’apprendre à coder.

Tu parles à un assistant, en français. Il fait les changements.

---

## Trois endroits, trois rôles

**Les textes** (intros, fiches livres, email, téléphone, menu) vivent dans le projet, sur ton ordinateur. Tu les changes dans Cursor.

**Les photos des galeries** (portraits, reportages) vivent dans une bibliothèque en ligne : Cloudinary. Tu y déposes tes images.

**Le site en ligne** (karinebauzin.ch) se met à jour tout seul une fois tes changements envoyés. Tu n’as pas à te connecter chez l’hébergeur.

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
| **GitHub** | [github.com](https://github.com) | Envoyer tes changements. Après un dépôt de photos : Actions → *Sync galleries from Cloudinary* → Run. |
| **Cloudinary** | [console.cloudinary.com](https://console.cloudinary.com) | Déposer tes photos dans le bon dossier. |

Tu n’as pas besoin du compte Infomaniak au quotidien. C’est l’hébergeur. Benoît s’en occupe.

---

## Les 2 gestes du quotidien

### Changer un texte

1. Ouvrir Cursor
2. Dire par exemple : *Change l’intro de Cabines de plage avec ce texte : …*
3. Regarder le résultat en local
4. Demander à l’assistant d’envoyer les changements

### Ajouter des photos à une galerie qui existe déjà

1. Aller sur Cloudinary
2. Glisser tes JPG dans le dossier du reportage (ou Portraits)
3. GitHub → Actions → *Sync galleries from Cloudinary* → Run
4. Recharger la page

Pas besoin de Cursor pour ça.

Un **nouveau reportage**, c’est les deux : une ligne de texte via Cursor, plus les photos via Cloudinary.

---

## Phrases à dire à l’assistant

> Change l’intro de Cabines de plage avec ce texte : …

> Ajoute un projet reportage « mon-projet », titre …, intro …

> Remplace la couverture de Portraits-ge.ch. Le fichier est dans public/books/.

> Envoie les changements avec un message en français.
