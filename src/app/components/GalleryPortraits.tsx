import GalleryPage from "./GalleryPage";
import { portraitGallery } from "../../config/site";

export default function GalleryPortraits() {
  return (
    <GalleryPage
      title={portraitGallery.title}
      intro={portraitGallery.intro}
      images={portraitGallery.placeholderImages}
      showHeader={false}
    />
  );
}
