import { useMemo } from "react";
import GalleryPage from "./GalleryPage";
import { portraitGallery } from "../../config/site";
import { useGalleries } from "../../hooks/useGalleries";
import {
  findManifestGallery,
  resolveGalleryDisplay,
} from "../../lib/galleryImages";
import { shuffle } from "../../lib/shuffle";

const emptyGalleryMessage =
  "Aucune photo pour cette galerie. Upload sur Cloudinary puis lance le workflow « Sync galleries from Cloudinary ».";

export default function GalleryPortraits() {
  const { galleries, loading, error } = useGalleries();
  const entry = findManifestGallery(galleries, portraitGallery.slug);
  // Mélangé une fois par visite (pas de tri éditorial pour les portraits).
  const images = useMemo(
    () => shuffle(resolveGalleryDisplay(entry, [], loading)),
    [entry, loading],
  );

  return (
    <GalleryPage
      title={portraitGallery.title}
      intro={portraitGallery.intro}
      images={images}
      showHeader={false}
      loading={loading}
      error={error}
      emptyMessage={
        !loading && images.length === 0 ? emptyGalleryMessage : undefined
      }
    />
  );
}
