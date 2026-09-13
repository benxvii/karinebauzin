import { useMemo, useState } from "react";
import type { GalleryDisplayImage } from "../../lib/galleryImages";
import { useIsMobile } from "./ui/use-mobile";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Lightbox } from "./Lightbox";

type GalleryPageProps = {
  title: string;
  intro: string;
  images: readonly GalleryDisplayImage[];
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

type IndexedImage = GalleryDisplayImage & { index: number };

/**
 * Répartit les photos en colonnes de hauteur équilibrée, à partir de leurs
 * dimensions réelles (chaque photo va dans la colonne la plus courte à cet
 * instant). Déterministe, sans mesure DOM : pas de risque qu'une colonne
 * finisse beaucoup plus longue que l'autre (contrairement à un simple
 * `index % nombreDeColonnes`, ou à `column-fill: balance` en CSS, imprécis
 * sur de grandes galeries).
 */
function splitIntoBalancedColumns(
  images: readonly IndexedImage[],
  columnsCount: number,
): IndexedImage[][] {
  const columns: IndexedImage[][] = Array.from({ length: columnsCount }, () => []);
  const columnHeights = Array<number>(columnsCount).fill(0);

  for (const image of images) {
    const aspectRatio = image.width / image.height || 1;
    let shortest = 0;
    for (let i = 1; i < columnsCount; i += 1) {
      if (columnHeights[i] < columnHeights[shortest]) shortest = i;
    }
    columns[shortest].push(image);
    columnHeights[shortest] += 1 / aspectRatio;
  }

  return columns;
}

function GalleryGrid({
  images,
  title,
}: {
  images: readonly GalleryDisplayImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const columnsCount = isMobile ? 1 : 2;

  const columns = useMemo(() => {
    const indexed = images.map((image, index) => ({ ...image, index }));
    return splitIntoBalancedColumns(indexed, columnsCount);
  }, [images, columnsCount]);

  const imageUrls = useMemo(() => images.map((image) => image.src), [images]);

  return (
    <>
      <div className="flex">
        <div className="hidden lg:block w-1/3 shrink-0 sticky top-0 h-screen" />
        <div className="w-full lg:w-2/3 flex gap-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1 min-w-0 flex flex-col gap-2">
              {column.map((image) => (
                <div
                  key={image.src}
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(image.index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={`${title} ${image.index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {activeIndex !== null && (
        <Lightbox
          images={imageUrls}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
