import SectionHub from "./SectionHub";
import { documentary } from "../../config/site";
import { resolveGalleryImages } from "../../lib/cloudinary";

export default function DocumentaireIndex() {
  return (
    <SectionHub
      title={documentary.title}
      imageFit="cover"
      items={documentary.projects.map((p) => ({
        path: p.path,
        title: p.title,
        description: p.intro,
        image: resolveGalleryImages(p.cloudinaryIds, p.placeholderImages)[0],
      }))}
    />
  );
}
