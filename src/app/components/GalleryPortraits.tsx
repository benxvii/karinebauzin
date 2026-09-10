import GalleryPage from "./GalleryPage";
import { portraitGallery } from "../../config/site";
import { useGalleries } from "../../hooks/useGalleries";
import {
  findManifestGallery,
  resolveGalleryDisplay,
} from "../../lib/galleryImages";

const emptyGalleryMessage =
  "Aucune photo pour cette galerie. Upload sur Cloudinary puis lance le workflow « Sync galleries from Cloudinary ».";

export default function GalleryPortraits() {
  const { galleries, loading, error } = useGalleries();
  const entry = findManifestGallery(galleries, portraitGallery.slug);
  const images = resolveGalleryDisplay(
    entry,
    portraitGallery.placeholderImages,
    loading,
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
