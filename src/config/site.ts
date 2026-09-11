export const site = {
  name: "KARINE BAUZIN",
  shortName: "Karine Bauzin",
  email: "info@karinebauzin.ch",
  phone: "+41 78 649 49 98",
  phoneHref: "tel:+41786494998",
  instagram: "https://www.instagram.com/karinebauzin/",
  linkedin: "https://www.linkedin.com/in/karinebauzin/",
  logoSrc: "/logo.png",
  copyrightYear: new Date().getFullYear(),
  trustJ: {
    text: "L’auteur est un journaliste RP vérifié.\nRetrouvez la confirmation sur",
    href: "https://www.trust-j.org/presseausweis/karinebauzin-10010",
    logoSrc: "/trustj-logo.png",
  },
} as const;

export type GallerySection = {
  slug: string;
  path: string;
  title: string;
  intro: string;
};

/** Portraits — page galerie fixe */
export const portraitGallery: GallerySection = {
  slug: "portraits",
  path: "/portraits",
  title: "Portraits",
  intro:
    "",
};

export type DocumentaryProject = GallerySection & {
  /** Photo du hub `/reportages`. Public ID Cloudinary. Sinon : première image de la galerie. */
  coverPublicId?: string;
};

/** Reportages — ajoutez des projets ici (nombre de pages libre) */
export const documentary = {
  indexPath: "/reportages",
  title: "Reportages",
  cloudinaryFolder: "reportages",
  intro:
    "",
  projects: [
    {
      slug: "coupe-weuro",
      path: "/reportages/coupe-weuro",
      title: "Coupe Weuro",
      intro: "",
      coverPublicId: "kb_26-09-11_107_ncmhyq",
    },
    {
      slug: "lesson-one",
      path: "/reportages/lesson-one",
      title: "Lesson One",
      intro: "",
      coverPublicId: "kb_26-09-11_041_suadlf",
    },
    {
      slug: "las-vegas-wedding",
      path: "/reportages/las-vegas-wedding",
      title: "Las Vegas Wedding",
      intro: "",
      coverPublicId: "kb_26-09-11_008_jmxgki",
    },
    {
      slug: "serial-colleuses",
      path: "/reportages/serial-colleuses",
      title: "Serial colleuses",
      intro: "",
      coverPublicId: "kb_26-09-11_009_q1f6ht",
    },
    {
      slug: "yes-i-cannes",
      path: "/reportages/yes-i-cannes",
      title: "Yes, I Cannes",
      intro: "",
      coverPublicId: "kb_26-09-11_029_fxu77r",
    },
    {
      slug: "swiss-cup-mulet",
      path: "/reportages/swiss-cup-mulet",
      title: "Swiss Cup Mulet",
      intro: "",
      coverPublicId: "reportages/swiss-cup-mulet/DSC3003",
    },
    {
      slug: "144-smur",
      path: "/reportages/144-smur",
      title: "144 – SMUR",
      intro: "",
      coverPublicId: "reportages/144-smur/L1030061",
    },
    {
      slug: "dernier-voyage-exit",
      path: "/reportages/dernier-voyage-exit",
      title: "Dernier voyage – EXIT",
      intro: "",
      coverPublicId: "reportages/dernier-voyage-exit/L1060698",
    },
    {
      slug: "agriculteurs-en-colere",
      path: "/reportages/agriculteurs-en-colere",
      title: "Agriculteurs en colère",
      intro: "",
      coverPublicId: "reportages/agriculteurs-en-colere/L1000903",
    },
    {
      slug: "prune-nourry",
      path: "/reportages/prune-nourry",
      title: "Prune Nourry",
      intro: "",
      coverPublicId: "reportages/prune-nourry/L1010090-1",
    },
    {
      slug: "maison-clarte-le-corbusier",
      path: "/reportages/maison-clarte-le-corbusier",
      title: "Maison Clarté – Le Corbusier",
      intro: "",
      coverPublicId: "reportages/maison-clarte-le-corbusier/L1130784-1",
    },
    {
      slug: "grece-sans-bleu",
      path: "/reportages/grece-sans-bleu",
      title: "Grèce sans bleu",
      intro: "",
      coverPublicId: "reportages/grece-sans-bleu/020621_kb_13-1",
    },
    {
      slug: "paris-septembre-2020",
      path: "/reportages/paris-septembre-2020",
      title: "Paris septembre 2020 – une rentrée sous virus",
      intro: "",
      coverPublicId: "reportages/paris-septembre-2020/L1007533-2-1",
    },
    {
      slug: "ete-2020-covid",
      path: "/reportages/ete-2020-covid",
      title: "été 2020 – Covid",
      intro: "",
      coverPublicId: "reportages/ete-2020-covid/040820_kb_04-2",
    },
    {
      slug: "johnny-ceremonie-anniversaire",
      path: "/reportages/johnny-ceremonie-anniversaire",
      title: "Johnny – cérémonie anniversaire",
      intro: "",
      coverPublicId: "reportages/johnny-ceremonie-anniversaire/L1010111-1",
    },
    {
      slug: "paris-8-decembre-2018",
      path: "/reportages/paris-8-decembre-2018",
      title: "Paris 8 décembre 2018",
      intro: "",
      coverPublicId: "reportages/paris-8-decembre-2018/L1000736-1",
    },
    {
      slug: "transsiberien-moscou-oulanbator",
      path: "/reportages/transsiberien-moscou-oulanbator",
      title: "Transsibérien de Moscou à Oulan-Bator",
      intro: "",
      coverPublicId: "reportages/transsiberien-moscou-oulanbator/L1004131-1",
    },
    {
      slug: "mongolie",
      path: "/reportages/mongolie",
      title: "Mongolie",
      intro: "",
      coverPublicId: "reportages/mongolie/L1070109-2-1",
    },
  ] as readonly DocumentaryProject[],
};

export type Book = {
  slug: string;
  path: string;
  title: string;
  description: string;
  image: string;
  /** Contenu page détail */
  body: string;
  /** Livre (défaut) ou film */
  kind?: "book" | "film";
  /** Prix en CHF — absent pour les films */
  price?: number;
  /** Crédit photographies (défaut : Karine Bauzin) */
  photographer?: string;
  publisher?: string;
  isbn?: string;
  language?: string;
  pages?: number;
  format?: string;
  /** Frais de port en CHF */
  shippingFee?: number;
  /** Mention sous le crédit photos (ex. ouvrage épuisé) */
  availability?: string;
};

export const bookOrderTwint = `Commande possible par TWINT au ${site.phone}` as const;

/** Livres & films — ajoutez ou retirez des entrées (nombre de pages libre) */
export const livres = {
  indexPath: "/livres",
  title: "Livres / Films",
  intro:
    "",
  items: [
    {
      slug: "geneve-au-coeur-du-jeu",
      path: "/livres/geneve-au-coeur-du-jeu",
      title: "Genève, au coeur du jeu",
      description: "Livre photo — Genève et le football.",
      availability: "Ouvrage privé - Ville de Genève",
      image: "/books/geneve-au-coeur-du-jeu.png",
      body: "Ouvrage privé - Commande pour le Conseil d'Etat de la République et Canton de Genève",
    },
    {
      slug: "cabines-de-plage",
      path: "/livres/cabines-de-plage",
      title: "Cabines de plage",
      description:
        "Reportage réalisé en deux saisons à Genève Plage — un autre monde à portée de mains.",
      price: 39,
      isbn: "9782839941860",
      language: "Français-anglais",
      pages: 152,
      format: "20 × 28 cm",
      shippingFee: 10,
      image: "/books/cabines-de-plage.jpg",
      body: `Indissociables des bords de plage sur lesquels elles s'établissent partout dans le monde, les cabines ont naturellement pour vocation première d'offrir aux estivaliers un endroit où déposer leurs affaires et se changer en toute intimité. Pourtant, elles représentent souvent bien davantage et offrent à leurs utilisateurs l'accès à un véritable mode de vie.

Deuxième maison pour certains, lieux de dépaysement original pour d'autres, les cabines sont souvent l'occasion de créer des liens sociaux précieux entre leurs utilisateurs. C'est le constat auquel s'est livrée Karine Bauzin à travers ce reportage réalisé le temps de deux saisons passées à Genève Plage. Ses photos aux couleurs vives témoignent d'un autre monde à portée de mains qui pourrait tout aussi bien être situé à Palm Spring, Deauville, Rimini ou sur la Costa Brava.`,
    },
    {
      slug: "what-time-is-it",
      path: "/livres/what-time-is-it",
      title: "What time is it ?",
      description:
        "Une quête du temps à travers des centaines de rencontres — montres et humanité.",
      price: 30,
      shippingFee: 10,
      image: "/books/what-time-is-it.png",
      body: `What time is it? C'est sans doute la phrase que la photographe suisse Karine Bauzin a le plus souvent prononcée ces dix dernières années. Au point d'avoir inventé un verbe : « whatimiser ». Quelle heure est-il ? Cette question d'apparence banale, elle l'a posée des centaines de fois à des inconnus.

Karine Bauzin travaille pour la presse depuis plus de 30 ans. Cette photographe humaniste a effectué de multiples reportages à l'étranger et s'est également spécialisée dans le domaine horloger. Il y a dix ans, elle a eu l'idée de réunir deux de ses passions — les montres et les rencontres — dans un projet qui relève du documentaire plus que de l'œuvre d'art. Elle a décidé de demander l'heure à des personnes croisées par hasard sur cette planète qu'elle adore arpenter, montrant ce même geste répété comme une chorégraphie dans des lieux toujours différents.

Le projet de Karine Bauzin dure depuis dix ans et n'aura pas de fin. Il raconte le temps, tous les temps : celui de la religion, de la cérémonie, du décalage horaire, le temps du voyage, le temps d'un oui, le temps qui s'arrête aussi.

Une décennie et plusieurs centaines de photos plus tard, un livre et une exposition intitulée « What Time Is It? », qui s'est tenue durant le Salon Watches & Wonders du 27 mars au 2 avril 2023, racontent cette quête du temps qui passe.`,
    },
    {
      slug: "post-tenebras-lux",
      path: "/livres/post-tenebras-lux",
      title: "Post Tenebras Lux",
      description:
        "Témoignages photographiques du confinement et du déconfinement à Genève.",
      price: 25,
      shippingFee: 5,
      publisher: "Éditions GOOD HEIDI Productions",
      isbn: "9782970140443",
      image: "/books/post-tenebras-lux.jpg",
      body: `Pandémie, coronavirus, covid-19, Wuhan, pangolin, confinement : honnêtement, qui connaissait ces noms dans la vie de tous les jours ? À part les fans de mots croisés… Qui pouvait imaginer ce qui allait arriver au monde, à l'Europe, à la Suisse jusqu'à Genève. Du 15 mars au 11 mai 2020, Genève a vécu au ralenti. Ou plutôt à l'arrêt.

Pratiquement tous les soirs, lors du téléjournal, nous étions pendus aux lèvres du conseiller fédéral et ministre de la santé, Alain Berset. Sa citation « Il faut agir aussi vite que possible, mais aussi lentement que nécessaire » est depuis devenue culte. Masque, tousser dans son coude, gestes barrières, gel hydroalcoolique pour les mains et distance sociale sont depuis devenus des réflexes…

L'idée de ce livre de témoignages photographiques nous est venue dès les premiers jours du confinement. Il nous a paru important, voire urgent, de capter, figer ces moments de silence et de vide assez angoissants. Se remémorer ce que nous avons toutes et tous vécu avec solidarité et calme.

Photographier en noir et blanc, une ville et un canton dans leur immobilité, tout le monde pouvait le faire. Mais revenir sur les 100 lieux déjà shootés, deux mois plus tard, attendre que la vie reprenne et travailler cette fois en couleur, c'était une autre histoire… La photographe genevoise Karine Bauzin s'est imposée pour cet exercice de « styles » : le cadrage serré en noir et blanc pour la partie confinement. Le même cadrage mais en couleur pour la partie déconfinement.`,
    },
    {
      slug: "c-est-la-lutte-finale",
      path: "/livres/c-est-la-lutte-finale",
      title: "C'est la lutte finale",
      description:
        "Reportage sur la 19e Fête cantonale genevoise de lutte suisse à Anières.",
      price: 19,
       format: "23 × 21 cm", 
      shippingFee: 5,
      publisher: "Éditions GOOD HEIDI Productions",
      isbn: "9782970112471",
      image: "/books/c-est-la-lutte-finale.png",
      body: `Du 12 au 13 mai 2018, la commune d'Anières dans le canton de Genève en partenariat avec l'Association cantonale genevoise de lutte suisse et le team Gymkhana d'Anières ont organisé la 19ème Fête cantonale genevoise de lutte suisse.

Durant ces deux jours de rencontres sportives et festives, la photographe genevoise Karine Bauzin a posé son regard décalé et original sur cet évènement.

Ce livre retrace son travail de reportage où les protagonistes sont pris de loin mais nous semblent si proches. Sa manière de travailler nous parle tous : « Attendre longtemps, voler l'instant, partager l'émotion. » En toute discrétion. Une vraie Suisse !`,
    },
    {
      slug: "portraits-ge-ch",
      path: "/livres/portraits-ge-ch",
      title: "Portraits-ge.ch",
      description:
        "Trente portraits de personnalités genevoises, entre juin 2001 et octobre 2002.",
      availability: "Ouvrage épuisé",
      publisher: "Éditions Slatkine",
      isbn: "9782832100882",
      image: "/books/portraits-ge-ch.png",
      body: `Aux éditions Slatkine, avec M-C Lescaze.

Ce livre, c'est d'abord l'histoire d'une rencontre, celle de Karine Bauzin et de Marie-Claire Lescaze, journaliste. Fascinées par la diversité des gens côtoyés chaque jour à Genève, elles ont rencontré trente personnalités (à conjuguer au masculin comme au féminin), originales par leur itinéraire de vie, leur passion ou leur vision des choses et du monde.

Des portraits, réalisés entre juin 2001 et octobre 2002, dont quelques-uns font parfois la une des journaux. La plupart, cependant, reste des « anonymes », qui ne le seront d'ailleurs plus au moment où vous les découvrirez dans ces pages !`,
    },
    {
      slug: "un-jour-tout-bascule",
      path: "/livres/un-jour-tout-bascule",
      title: "Un jour, tout bascule...",
      description:
        "Vingt photographies et le récit d'une renaissance, avec Thierry Ott.",
      availability: "Ouvrage épuisé",
      publisher: "Éditions du Tricorne",
      isbn: "2829301994",
      image: "/books/un-jour-tout-bascule.png",
      body: `Aux éditions du Tricorne, avec Thierry Ott.

Karine Bauzin est une jeune femme au beau regard et au sourire tendre. En février, elle avait fêté ses 20 ans. Le 15 mars, elle est victime d'une rupture d'anévrisme. Bilan : la parole, le bras et la jambe droits sont durement touchés. De plus elle est aphasique. Elle doit réapprendre à parler et à se mouvoir. Elle guérit peu à peu, avec le soutien de sa famille et de ses amis. Elle apprendra la photographie avec Raymond Depardon. Ce livre contient une vingtaine de photographies prises au Vietnam, à New York ou à Genève.

Thierry Ott est journaliste et créateur de jeux et il a passé par la même épreuve. À 42 ans, il est opéré d'une tumeur cérébrale. Au réveil, le bras et la jambe droits sont totalement paralysés. Il a perdu la parole. Comme Karine, il doit reprendre ce qui lui a été volé : les mots. Il réapprendra tout. À parler. À saisir. À marcher.

Avec moins de mille mots, qui mieux que lui pouvait raconter l'histoire de Karine ? Phrase après phrase. Ligne après ligne. L'éditeur s'est refusé à retoucher ce texte afin de lui garder toute son authenticité.`,
    },
    {
      slug: "memoires-d-une-pandemie",
      path: "/livres/memoires-d-une-pandemie",
      title: "Mémoires d'une pandémie",
      kind: "film",
      description:
        "Documentaire — témoignages à chaud d'une crise sanitaire, économique et sociale.",
      image: "/books/memoires-d-une-pandemie.jpg",
      body: `Karine Bauzin et Audrey Leclerc, deux professionnelles de l'image basées à Genève, en Suisse, partent en quête de témoignages « à chaud » pour garder la trace d'une crise sanitaire, économique et sociale sans précédent.

Elles se sont données pour mission de donner la parole à des institutions, des indépendants, des particuliers, de tous âges et de toutes conditions, touchés ou non directement par la crise.

Ces archives mêlant une vingtaine d'interviews filmées en couleur et des photographies en noir & blanc, constituent les mémoires des générations d'aujourd'hui et de celles à venir.

Karine Bauzin et Audrey Leclerc ouvrent ici un chapitre et espèrent poursuivre dans ce sens pour créer des archives plus encore représentatives du monde tel qu'il évolue en Suisse depuis l'annonce de la pandémie de la Covid–19, le 16 mars 2020.

Production Luna Films

Genre : Documentaire
Durée : 45mn
Pays et année de production : CH – 2022
Version : FR

1ère diffusion TV : 6 mars 2022 – RTS2 – émission Sur les Docs`,
    },
  ] as readonly Book[],
};

export const lorem = {
  short:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  medium:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  long:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
} as const;
