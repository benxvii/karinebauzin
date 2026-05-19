import GalleryPage from "./GalleryPage";
import { portraitPresse } from "../../config/site";

export default function PortraitPresse() {
  return (
    <GalleryPage
      title={portraitPresse.title}
      intro={portraitPresse.intro}
      images={portraitPresse.placeholderImages}
    />
  );
}
