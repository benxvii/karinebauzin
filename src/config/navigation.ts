import { documentary, livres, portraitGalleries, portraitPresse } from "./site";

export type NavItem =
  | { path: string; label: string }
  | {
      label: string;
      path?: string;
      subLinks: { path: string; label: string }[];
    };

export const mainNavigation: NavItem[] = [
  { path: "/", label: "Accueil" },
  { path: "/about", label: "À propos" },
  ...portraitGalleries.map((g) => ({ path: g.path, label: g.title })),
  { path: portraitPresse.path, label: portraitPresse.title },
  {
    label: documentary.title,
    path: documentary.indexPath,
    subLinks: [
      { path: documentary.indexPath, label: "Tous les projets" },
      ...documentary.projects.map((p) => ({
        path: p.path,
        label: p.title,
      })),
    ],
  },
  {
    label: livres.title,
    path: livres.indexPath,
    subLinks: [
      { path: livres.indexPath, label: "Tous les livres" },
      ...livres.items.map((b) => ({
        path: b.path,
        label: b.title,
      })),
    ],
  },
  { path: "/contact", label: "Contact" },
];

export function isNavActive(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
