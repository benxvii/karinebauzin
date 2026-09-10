import { Link } from "react-router";
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
  loading?: boolean;
};

export default function SectionHub({
  title,
  items,
  imageFit = "contain",
  loading = false,
}: SectionHubProps) {
  return (
    <div>
      <h1 className="sr-only">{title}</h1>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center text-gray-600">Chargement des photos…</p>
        ) : (
          <HubGrid items={items} imageFit={imageFit} />
        )}
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
          <div className="relative aspect-[4/3] overflow-hidden mb-1.5 bg-white">
            <ImageWithFallback
              key={item.image || item.path}
              src={item.image || undefined}
              alt={item.title}
              className={`w-full h-full ${fitClass} group-hover:scale-105 transition-transform duration-500`}
            />
          </div>
          <h2
            className={`text-base uppercase group-hover:text-[var(--brand)] transition-colors ${item.description ? "mb-2" : ""}`}
          >
            {item.title}
          </h2>
          {item.description ? (
            <p>{item.description}</p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
