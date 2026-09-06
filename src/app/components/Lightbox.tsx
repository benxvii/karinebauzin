import React, { useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: readonly string[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length, onClose, onNavigate]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    if (clickX < width / 2) {
      onNavigate((activeIndex - 1 + images.length) % images.length);
    } else {
      onNavigate((activeIndex + 1) % images.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleImageClick(e);
        }}
      >
        <ImageWithFallback
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
        />
      </div>
    </div>
  );
}
