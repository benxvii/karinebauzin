import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Lightbox } from "./Lightbox";

type GalleryPageProps = {
  title: string;
  intro: string;
  images: readonly string[];
  showHeader?: boolean;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
};

export default function GalleryPage({
  title,
  intro,
  images,
  showHeader = true,
  loading = false,
  error = null,
  emptyMessage,
}: GalleryPageProps) {
  return (
    <div>
      {showHeader ? (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className={intro ? "text-4xl mb-6 uppercase" : "text-4xl uppercase"}>{title}</h1>
            {intro ? <p>{intro}</p> : null}
          </div>
        </section>
      ) : (
        <h1 className="sr-only">{title}</h1>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center text-gray-600">Chargement des photos…</p>
        ) : error ? (
          <p className="text-center text-red-700">
            Impossible de charger la galerie ({error}). Vérifie{" "}
            <code className="text-sm">VITE_MANIFEST_URL</code> et le workflow
            Cloudinary.
          </p>
        ) : images.length === 0 && emptyMessage ? (
          <p className="text-center text-gray-600 max-w-xl mx-auto">{emptyMessage}</p>
        ) : (
          <GalleryGrid images={images} title={title} />
        )}
      </section>
    </div>
  );
}

function GalleryGrid({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex">
        <div className="hidden lg:block w-1/3 shrink-0 sticky top-0 h-screen" />
        <div className="w-full lg:w-2/3 columns-1 md:columns-2 gap-2">
          {images.map((src, index) => (
            <div
              key={`${title}-${index}`}
              className="break-inside-avoid mb-2 cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <ImageWithFallback
                src={src}
                alt={`${title} ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      {activeIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
