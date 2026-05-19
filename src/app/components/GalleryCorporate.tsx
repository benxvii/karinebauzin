import GalleryPage from "./GalleryPage";
import { portraitGalleries } from "../../config/site";

const gallery = portraitGalleries[1];

export default function GalleryCorporate() {
  return (
    <GalleryPage
      title={gallery.title}
      intro={gallery.intro}
      images={gallery.placeholderImages}
    />
  );
}
