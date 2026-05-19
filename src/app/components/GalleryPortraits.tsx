import GalleryPage from "./GalleryPage";
import { portraitGalleries } from "../../config/site";

const gallery = portraitGalleries[0];

export default function GalleryPortraits() {
  return (
    <GalleryPage
      title={gallery.title}
      intro={gallery.intro}
      images={gallery.placeholderImages}
    />
  );
}
