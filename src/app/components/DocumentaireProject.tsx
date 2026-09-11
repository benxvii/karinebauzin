import { Navigate, useParams } from "react-router";
import GalleryPage from "./GalleryPage";
import { documentary } from "../../config/site";
import { useGalleries } from "../../hooks/useGalleries";
import {
  findManifestGallery,
  resolveGalleryDisplay,
} from "../../lib/galleryImages";

const emptyGalleryMessage =
  "Aucune photo pour cette galerie. Upload sur Cloudinary puis lance le workflow « Sync galleries from Cloudinary ».";

export default function DocumentaireProject() {
  const { slug } = useParams<{ slug: string }>();
  const project = documentary.projects.find((p) => p.slug === slug);
  const { galleries, loading, error } = useGalleries();

  if (!project) {
    return <Navigate to={documentary.indexPath} replace />;
  }

  const entry = findManifestGallery(
    galleries,
    project.slug,
    documentary.cloudinaryFolder,
  );
  const images = resolveGalleryDisplay(entry, [], loading);

  return (
    <GalleryPage
      title={project.title}
      intro={project.intro}
      images={images}
      loading={loading}
      error={error}
      emptyMessage={
        !loading && images.length === 0 ? emptyGalleryMessage : undefined
      }
    />
  );
}
