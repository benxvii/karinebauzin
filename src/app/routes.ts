import { createBrowserRouter, redirect } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import GalleryPortraits from "./components/GalleryPortraits";
import GalleryCorporate from "./components/GalleryCorporate";
import PortraitPresse from "./components/PortraitPresse";
import DocumentaireIndex from "./components/DocumentaireIndex";
import DocumentaireProject from "./components/DocumentaireProject";
import LivresIndex from "./components/LivresIndex";
import LivreDetail from "./components/LivreDetail";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "portraits", Component: GalleryPortraits },
      { path: "corporate", Component: GalleryCorporate },
      { path: "portrait-presse", Component: PortraitPresse },
      { path: "reportages", Component: DocumentaireIndex },
      { path: "reportages/:slug", Component: DocumentaireProject },
      { path: "documentaire", loader: () => redirect("/reportages") },
      {
        path: "documentaire/:slug",
        loader: ({ params }) => redirect(`/reportages/${params.slug}`),
      },
      { path: "livres", Component: LivresIndex },
      { path: "livres/:slug", Component: LivreDetail },
      { path: "shop", loader: () => redirect("/livres") },
      { path: "contact", Component: Contact },
      { path: "gallery/portraits", loader: () => redirect("/portraits") },
      { path: "gallery/corporate", loader: () => redirect("/corporate") },
      { path: "*", Component: NotFound },
    ],
  },
]);
