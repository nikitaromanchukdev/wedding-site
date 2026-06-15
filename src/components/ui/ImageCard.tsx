"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useState } from "react";

type ImageCardProps = {
  src: StaticImageData | string | null;
  alt: string;
  /** Palette CSS var (e.g. "--hazelnut") used for the fallback / skeleton tint. */
  tint?: string;
  className?: string;
  style?: CSSProperties;
  /** Eager-load above-the-fold images. Defaults to lazy. */
  priority?: boolean;
  /** Skip the load fade — image shows immediately (use when src is already cached). */
  instant?: boolean;
  sizes?: string;
};

/**
 * Decorated, lazy-loading image tile. Renders next/image (blur-up when given a
 * static import) over a palette-tinted skeleton that fades out once loaded.
 * When no src is provided, shows the tinted gradient as a graceful placeholder.
 */
export function ImageCard({
  src,
  alt,
  tint = "--hazelnut",
  className = "",
  style,
  priority = false,
  instant = false,
  sizes = "(max-width: 767px) 50vw, 240px",
}: ImageCardProps) {
  const [loaded, setLoaded] = useState(instant);

  return (
    <div
      className={`image-card ${className}`}
      style={{ ...style, ["--card-tint" as string]: `var(${tint})` }}
    >
      <span className="image-card__skeleton" aria-hidden="true" data-loaded={loaded} />
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          placeholder={typeof src === "object" ? "blur" : "empty"}
          className="image-card__img"
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
