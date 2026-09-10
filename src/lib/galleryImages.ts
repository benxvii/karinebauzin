import type { ManifestGallery } from "../types/galleries";
import { cloudinaryUrl } from "./cloudinary";

export function findManifestGallery(
  manifestGalleries: readonly ManifestGallery[],
  slug: string,
  parentSlug?: string,
): ManifestGallery | undefined {
  const key = parentSlug ? `${parentSlug}/${slug}` : slug;
  return manifestGalleries.find((gallery) => gallery.slug === key);
}

export function galleryImageUrls(
  images: readonly { publicId: string }[],
): string[] {
  return images
    .map((image) => cloudinaryUrl(image.publicId))
    .filter((url): url is string => Boolean(url));
}

/** Images du manifeste, ou replis si la galerie n’y figure pas encore. */
export function resolveGalleryDisplay(
  entry: ManifestGallery | undefined,
  fallbacks: readonly string[],
  loading: boolean,
): string[] {
  if (loading) return [];
  if (entry?.images.length) {
    return galleryImageUrls(entry.images);
  }
  if (!entry && fallbacks.length) {
    return [...fallbacks];
  }
  return [];
}
