import SectionHub from "./SectionHub";
import { livres } from "../../config/site";

export default function LivresIndex() {
  return (
    <SectionHub
      title={livres.title}
      items={livres.items.map((b) => ({
        path: b.path,
        title: b.title,
        description: b.description,
        image: b.image,
        ctaLabel:
          b.kind === "film" ? "Voir le documentaire" : "Voir le livre",
      }))}
    />
  );
}
