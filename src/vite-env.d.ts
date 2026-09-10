/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  readonly VITE_CLOUDINARY_FOLDER?: string;
  readonly VITE_MANIFEST_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "react-responsive-masonry" {
  import type { ReactNode } from "react";

  export const ResponsiveMasonry: (props: {
    columnsCountBreakPoints?: Record<number, number>;
    gutterBreakpoints?: Record<number, string>;
    children?: ReactNode;
  }) => ReactNode;

  const Masonry: (props: {
    columnsCount?: number;
    gutter?: string;
    children?: ReactNode;
  }) => ReactNode;

  export default Masonry;
}
