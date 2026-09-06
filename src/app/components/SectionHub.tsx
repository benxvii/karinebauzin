import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type HubItem = {
  path: string;
  title: string;
  description: string;
  image: string;
};

type SectionHubProps = {
  title: string;
  items: readonly HubItem[];
  imageFit?: "contain" | "cover";
};

export default function SectionHub({
  title,
  items,
  imageFit = "contain",
}: SectionHubProps) {
  return (
    <div>
      <h1 className="sr-only">{title}</h1>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <HubGrid items={items} imageFit={imageFit} />
      </section>
    </div>
  );
}

function HubGrid({
  items,
  imageFit,
}: {
  items: readonly HubItem[];
  imageFit: "contain" | "cover";
}) {
  const fitClass =
    imageFit === "cover" ? "object-cover" : "object-contain";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {items.map((item) => (
        <Link key={item.path} to={item.path} className="group block">
          <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-white">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className={`w-full h-full ${fitClass} group-hover:scale-105 transition-transform duration-500`}
            />
          </div>
          <h2
            className={`text-2xl group-hover:text-[var(--brand)] transition-colors ${item.description ? "mb-2" : "mb-4"}`}
          >
            {item.title}
          </h2>
          {item.description ? (
            <p className="text-gray-600 mb-4">{item.description}</p>
          ) : null}
          <span className="inline-flex items-center gap-2 text-sm text-[var(--brand)]">
            Voir le projet
            <ArrowRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}
