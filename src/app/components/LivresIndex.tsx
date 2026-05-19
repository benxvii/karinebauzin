import SectionHub from "./SectionHub";
import { livres } from "../../config/site";

export default function LivresIndex() {
  return (
    <SectionHub
      title={livres.title}
      intro={livres.intro}
      items={livres.items.map((b) => ({
        path: b.path,
        title: b.title,
        description: b.description,
        image: b.image,
      }))}
    />
  );
}
