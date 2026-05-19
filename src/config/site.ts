export const site = {
  name: "Karine Bauzin",
  shortName: "Karine Bauzin",
  email: "karine@karinebauzin.ch",
  instagram: "https://www.instagram.com/karinebauzin/",
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
  price: number;
  image: string;
  /** Contenu page détail — lorem par défaut */
  body: string;
};

/** Livres — ajoutez ou retirez des entrées (nombre de pages libre) */
export const livres = {
  indexPath: "/livres",
  title: "Livres",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collection de livres photographiques.",
  items: [
    {
      slug: "livre-1",
      path: "/livres/livre-1",
      title: "Livre 1",
      description: "Lorem ipsum dolor sit amet — livre photo, édition à préciser.",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      slug: "livre-2",
      path: "/livres/livre-2",
      title: "Livre 2",
      description: "Consectetur adipiscing elit — livre photo, édition à préciser.",
      price: 42,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop",
      body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      slug: "livre-3",
      path: "/livres/livre-3",
      title: "Livre 3",
      description: "Sed do eiusmod tempor — livre photo, édition à préciser.",
      price: 48,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop",
      body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      slug: "livre-4",
      path: "/livres/livre-4",
      title: "Livre 4",
      description: "Ut labore et dolore magna — livre photo, édition à préciser.",
      price: 52,
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=1000&fit=crop",
      body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      slug: "livre-5",
      path: "/livres/livre-5",
      title: "Livre 5",
      description: "Duis aute irure dolor — livre photo, édition limitée.",
      price: 58,
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=1000&fit=crop",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
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
