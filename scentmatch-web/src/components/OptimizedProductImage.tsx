import Image from "next/image";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMjEnIHZpZXdCb3g9JzAgMCAxNiAyMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nMjEnIGZpbGw9JyMxMTExMTEnLz48cmVjdCB4PScxJyB5PScxJyB3aWR0aD0nMTQnIGhlaWdodD0nMTknIGZpbGw9JyMxYTE5MTYnLz48L3N2Zz4=";

interface OptimizedProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}

export function OptimizedProductImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload = false,
}: OptimizedProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={className}
    />
  );
}
