import { documentary, livres, portraitGalleries, portraitPresse } from "./site";

export type NavItem =
  | { path: string; label: string }
  | {
      label: string;
      path?: string;
      subLinks: { path: string; label: string }[];
    };

const corporateGallery = portraitGalleries[1];

export const mainNavigation: NavItem[] = [
  { path: "/about", label: "À propos" },
  {
    label: "Portraits",
    path: corporateGallery.path,
    subLinks: [
      { path: corporateGallery.path, label: "Corporate" },
      { path: portraitPresse.path, label: "Presse" },
    ],
  },
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
      { path: livres.indexPath, label: "Tout voir" },
      ...livres.items.map((b) => ({
        path: b.path,
        label: b.title,
      })),
    ],
  },
];

export function isNavActive(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function isNavSectionActive(
  pathname: string,
  item: Extract<NavItem, { subLinks: unknown }>,
): boolean {
  if (item.path && isNavActive(pathname, item.path)) return true;
  return item.subLinks.some((s) => isNavActive(pathname, s.path));
}
