import SectionHub from "./SectionHub";
import { documentary } from "../../config/site";
import { useGalleries } from "../../hooks/useGalleries";
import {
  findManifestGallery,
  resolveHubImage,
} from "../../lib/galleryImages";

export default function DocumentaireIndex() {
  const { galleries, loading } = useGalleries();

  return (
    <SectionHub
      title={documentary.title}
      imageFit="cover"
      loading={loading}
      items={documentary.projects.map((p) => {
        const entry = findManifestGallery(
          galleries,
          p.slug,
          documentary.cloudinaryFolder,
        );
        return {
          path: p.path,
          title: p.title,
          description: p.intro,
          image: resolveHubImage(entry, p.coverPublicId, loading),
        };
      })}
    />
  );
}
