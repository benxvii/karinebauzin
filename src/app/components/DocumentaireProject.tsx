import { Navigate, useParams } from "react-router";
import GalleryPage from "./GalleryPage";
import { documentary } from "../../config/site";
import { resolveGalleryImages } from "../../lib/cloudinary";

export default function DocumentaireProject() {
  const { slug } = useParams<{ slug: string }>();
  const project = documentary.projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to={documentary.indexPath} replace />;
  }

  return (
    <GalleryPage
      title={project.title}
      intro={project.intro}
      images={resolveGalleryImages(project.cloudinaryIds, project.placeholderImages)}
    />
  );
}
