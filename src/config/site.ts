export const site = {
  name: "Karine Bauzin",
  shortName: "Karine Bauzin",
  email: "info@karinebauzin.ch",
  phone: "+41 78 649 4998",
  phoneHref: "tel:+41786494998",
  instagram: "https://www.instagram.com/karinebauzin/",
  linkedin: "https://www.linkedin.com/in/karinebauzin/",
  logoSrc: "/logo.png",
  copyrightYear: new Date().getFullYear(),
} as const;

export type GallerySection = {
  slug: string;
  path: string;
  title: string;
  intro: string;
  placeholderImages: readonly string[];
};

/** Portraits & Corporate — pages galerie fixes */
export const portraitGalleries: readonly GallerySection[] = [
  {
    slug: "portraits",
    path: "/portraits",
    title: "Portraits",
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    placeholderImages: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1000&fit=crop",
    ],
  },
  {
    slug: "corporate",
    path: "/corporate",
    title: "Corporate",
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
    placeholderImages: [
      "https://images.unsplash.com/photo-1521737711862-ece3fcc11557?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    ],
  },
];

/** Portrait Presse — page galerie fixe */
export const portraitPresse: GallerySection = {
  slug: "portrait-presse",
  path: "/portrait-presse",
  title: "Portrait Presse",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
  placeholderImages: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
  ],
};

export type DocumentaryProject = GallerySection;

/** Documentaire — ajoutez des projets ici (nombre de pages libre) */
export const documentary = {
  indexPath: "/documentaire",
  title: "Documentaire",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Projets documentaires et reportages.",
  projects: [
    {
      slug: "swiss-cu",
      path: "/documentaire/swiss-cu",
      title: "Swiss Cu",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Projet documentaire Swiss Cu.",
      placeholderImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7ad8d697b5e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
      ],
    },
    {
      slug: "144",
      path: "/documentaire/144",
      title: "144",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Projet documentaire 144.",
      placeholderImages: [
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516035069371-29a1db244a32?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502920914360-1e900d165bd4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493863641943-9b68992a110a?w=800&h=600&fit=crop",
      ],
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
};

/** Livres & films — ajoutez ou retirez des entrées (nombre de pages libre) */
export const livres = {
  indexPath: "/livres",
  title: "Livres / Films",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Livres photographiques et films.",
  items: [
    {
      slug: "geneve-au-coeur-du-jeu",
      path: "/livres/geneve-au-coeur-du-jeu",
      title: "Genève, au coeur du jeu",
      description: "Livre photo — Genève et le football.",
      image: "/books/geneve-au-coeur-du-jeu.png",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      slug: "cabines-de-plage",
      path: "/livres/cabines-de-plage",
      title: "Cabines de plage",
      description:
        "Reportage réalisé en deux saisons à Genève Plage — un autre monde à portée de mains.",
      price: 39,
      image: "/books/cabines-de-plage.jpg",
      body: `Indissociables des bords de plage sur lesquels elles s'établissent partout dans le monde, les cabines ont naturellement pour vocation première d'offrir aux estivaliers un endroit où déposer leurs affaires et se changer en toute intimité. Pourtant, elles représentent souvent bien davantage et offrent à leurs utilisateurs l'accès à un véritable mode de vie.

Deuxième maison pour certains, lieux de dépaysement original pour d'autres, les cabines sont souvent l'occasion de créer des liens sociaux précieux entre leurs utilisateurs. C'est le constat auquel s'est livrée Karine Bauzin à travers ce reportage réalisé le temps de deux saisons passées à Genève Plage. Ses photos aux couleurs vives témoignent d'un autre monde à portée de mains qui pourrait tout aussi bien être situé à Palm Spring, Deauville, Rimini ou sur la Costa Brava.

Photographies : Karine Bauzin
ISBN : 9782839941860
Français-anglais — 152 pages, 20 × 28 cm
CHF 39.- (+ CHF 10.- frais de port, livraison en Suisse)
Commande possible par TWINT au +41 78 649 49 98`,
    },
    {
      slug: "what-time-is-it",
      path: "/livres/what-time-is-it",
      title: "What time is it ?",
      description:
        "Une quête du temps à travers des centaines de rencontres — montres et humanité.",
      price: 30,
      image: "/books/what-time-is-it.png",
      body: `What time is it? C'est sans doute la phrase que la photographe suisse Karine Bauzin a le plus souvent prononcée ces dix dernières années. Au point d'avoir inventé un verbe : « whatimiser ». Quelle heure est-il ? Cette question d'apparence banale, elle l'a posée des centaines de fois à des inconnus.

Karine Bauzin travaille pour la presse depuis plus de 30 ans. Cette photographe humaniste a effectué de multiples reportages à l'étranger et s'est également spécialisée dans le domaine horloger. Il y a dix ans, elle a eu l'idée de réunir deux de ses passions — les montres et les rencontres — dans un projet qui relève du documentaire plus que de l'œuvre d'art. Elle a décidé de demander l'heure à des personnes croisées par hasard sur cette planète qu'elle adore arpenter, montrant ce même geste répété comme une chorégraphie dans des lieux toujours différents.

Le projet de Karine Bauzin dure depuis dix ans et n'aura pas de fin. Il raconte le temps, tous les temps : celui de la religion, de la cérémonie, du décalage horaire, le temps du voyage, le temps d'un oui, le temps qui s'arrête aussi.

Une décennie et plusieurs centaines de photos plus tard, un livre et une exposition intitulée « What Time Is It? », qui s'est tenue durant le Salon Watches & Wonders du 27 mars au 2 avril 2023, racontent cette quête du temps qui passe.

CHF 30.- (+ CHF 10.- frais de port, livraison en Suisse)
Commande possible par TWINT au +41 78 649 49 98`,
    },
    {
      slug: "post-tenebras-lux",
      path: "/livres/post-tenebras-lux",
      title: "Post Tenebras Lux",
      description:
        "Témoignages photographiques du confinement et du déconfinement à Genève.",
      price: 25,
      image: "/books/post-tenebras-lux.jpg",
      body: `Pandémie, coronavirus, covid-19, Wuhan, pangolin, confinement : honnêtement, qui connaissait ces noms dans la vie de tous les jours ? À part les fans de mots croisés… Qui pouvait imaginer ce qui allait arriver au monde, à l'Europe, à la Suisse jusqu'à Genève. Du 15 mars au 11 mai 2020, Genève a vécu au ralenti. Ou plutôt à l'arrêt.

Pratiquement tous les soirs, lors du téléjournal, nous étions pendus aux lèvres du conseiller fédéral et ministre de la santé, Alain Berset. Sa citation « Il faut agir aussi vite que possible, mais aussi lentement que nécessaire » est depuis devenue culte. Masque, tousser dans son coude, gestes barrières, gel hydroalcoolique pour les mains et distance sociale sont depuis devenus des réflexes…

L'idée de ce livre de témoignages photographiques nous est venue dès les premiers jours du confinement. Il nous a paru important, voire urgent, de capter, figer ces moments de silence et de vide assez angoissants. Se remémorer ce que nous avons toutes et tous vécu avec solidarité et calme.

Photographier en noir et blanc, une ville et un canton dans leur immobilité, tout le monde pouvait le faire. Mais revenir sur les 100 lieux déjà shootés, deux mois plus tard, attendre que la vie reprenne et travailler cette fois en couleur, c'était une autre histoire… La photographe genevoise Karine Bauzin s'est imposée pour cet exercice de « styles » : le cadrage serré en noir et blanc pour la partie confinement. Le même cadrage mais en couleur pour la partie déconfinement.

CHF 25.- (+ CHF 5.- frais de port, livraison en Suisse)
Commande possible par TWINT au +41 78 649 49 98`,
    },
    {
      slug: "c-est-la-lutte-finale",
      path: "/livres/c-est-la-lutte-finale",
      title: "C'est la lutte finale",
      description:
        "Reportage sur la 19e Fête cantonale genevoise de lutte suisse à Anières.",
      price: 19,
      image: "/books/c-est-la-lutte-finale.jpg",
      body: `Du 12 au 13 mai 2018, la commune d'Anières dans le canton de Genève en partenariat avec l'Association cantonale genevoise de lutte suisse et le team Gymkhana d'Anières ont organisé la 19ème Fête cantonale genevoise de lutte suisse.

Durant ces deux jours de rencontres sportives et festives, la photographe genevoise Karine Bauzin a posé son regard décalé et original sur cet évènement.

Ce livre retrace son travail de reportage où les protagonistes sont pris de loin mais nous semblent si proches. Sa manière de travailler nous parle tous : « Attendre longtemps, voler l'instant, partager l'émotion. » En toute discrétion. Une vraie Suisse !

CHF 19.- (+ CHF 5.- frais de port, livraison en Suisse)
Commande possible par TWINT au +41 78 649 49 98`,
    },
    {
      slug: "portraits-ge-ch",
      path: "/livres/portraits-ge-ch",
      title: "Portraits-ge.ch",
      description:
        "Trente portraits de personnalités genevoises, entre juin 2001 et octobre 2002.",
      image: "/books/portraits-ge-ch.jpg",
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
      description: "Documentaire — co-réalisation, production Lunafilms, 2022.",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=1000&fit=crop",
      body: "Co-réalisatrice du documentaire « Mémoires d'une pandémie », production Lunafilms – 2022.",
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
