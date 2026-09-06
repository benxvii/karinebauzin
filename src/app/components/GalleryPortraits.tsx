import GalleryPage from "./GalleryPage";
import { portraitGallery } from "../../config/site";
import { resolveGalleryImages } from "../../lib/cloudinary";

export default function GalleryPortraits() {
  return (
    <GalleryPage
      title={portraitGallery.title}
      intro={portraitGallery.intro}
      images={resolveGalleryImages(
        portraitGallery.cloudinaryIds,
        portraitGallery.placeholderImages,
      )}
      showHeader={false}
    />
  );
}
