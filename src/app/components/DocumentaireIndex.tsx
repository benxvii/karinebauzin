import SectionHub from "./SectionHub";
import { documentary } from "../../config/site";

export default function DocumentaireIndex() {
  return (
    <SectionHub
      title={documentary.title}
      items={documentary.projects.map((p) => ({
        path: p.path,
        title: p.title,
        description: p.intro,
        image: p.placeholderImages[0],
      }))}
    />
  );
}
