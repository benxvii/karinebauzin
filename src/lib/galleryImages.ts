import type { ManifestGallery } from "../types/galleries";
import { cloudinaryUrl } from "./cloudinary";

/** Photo affichée : URL + dimensions d'origine (pour un classement en colonnes équilibré). */
export type GalleryDisplayImage = {
  src: string;
  width: number;
  height: number;
};

export function findManifestGallery(
  manifestGalleries: readonly ManifestGallery[],
  slug: string,
  parentSlug?: string,
): ManifestGallery | undefined {
  const key = parentSlug ? `${parentSlug}/${slug}` : slug;
  return manifestGalleries.find((gallery) => gallery.slug === key);
}

export function galleryImageUrls(
  images: readonly { publicId: string; width: number; height: number }[],
): GalleryDisplayImage[] {
  return images
    .map((image) => {
      const src = cloudinaryUrl(image.publicId);
      if (!src) return null;
      return {
        src,
        width: image.width > 0 ? image.width : 1,
        height: image.height > 0 ? image.height : 1,
      };
    })
    .filter((image): image is GalleryDisplayImage => image !== null);
}

/** Vignette du hub reportages : couverture choisie, sinon première image. */
export function resolveHubImage(
  entry: ManifestGallery | undefined,
  coverPublicId: string | undefined,
  loading: boolean,
): string {
  if (coverPublicId) {
    return cloudinaryUrl(coverPublicId) ?? "";
  }
  return resolveGalleryDisplay(entry, [], loading)[0]?.src ?? "";
}

/** Images du manifeste, ou replis si la galerie n’y figure pas encore. */
export function resolveGalleryDisplay(
  entry: ManifestGallery | undefined,
  fallbacks: readonly string[],
  loading: boolean,
): GalleryDisplayImage[] {
  if (loading) return [];
  if (entry?.images.length) {
    return galleryImageUrls(entry.images);
  }
  if (!entry && fallbacks.length) {
    // Aspect ratio arbitraire (3:2) : ces replis ne portent pas de dimensions réelles.
    return fallbacks.map((src) => ({ src, width: 3, height: 2 }));
  }
  return [];
}
