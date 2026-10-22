import React from "react";

// bin/encode-img writes a WebP and an AVIF next to every project
// image: same path, different extension.
export const withFormat = (src: string, format: "webp" | "avif"): string =>
  src.replace(/\.(jpe?g|png)$/i, `.${format}`);

export interface ImageTiers {
  quarter: string;
  half: string;
  full: string;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
  width?: number | null;
  height?: number | null;
  tiers?: ImageTiers;
  sizes?: string;
}

const ResponsiveImage = ({
  src,
  alt,
  className,
  dataTestId,
  onClick,
  width,
  height,
  tiers,
  sizes,
}: ResponsiveImageProps) => {
  const tierSrcSet = (format: "webp" | "avif" | null): string | undefined => {
    if (!tiers || !width) {
      return undefined;
    }
    const url = (tierSrc: string) =>
      format ? withFormat(tierSrc, format) : tierSrc;
    return [
      `${url(tiers.quarter)} ${Math.round(width / 4)}w`,
      `${url(tiers.half)} ${Math.round(width / 2)}w`,
      `${url(tiers.full)} ${width}w`,
    ].join(", ");
  };
  const avifSrcSet = tierSrcSet("avif");
  const webpSrcSet = tierSrcSet("webp");
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={avifSrcSet ?? withFormat(src, "avif")}
        sizes={avifSrcSet ? sizes : undefined}
      />
      <source
        type="image/webp"
        srcSet={webpSrcSet ?? withFormat(src, "webp")}
        sizes={webpSrcSet ? sizes : undefined}
      />
      <img
        src={src}
        srcSet={tierSrcSet(null)}
        sizes={tiers && width ? sizes : undefined}
        alt={alt}
        className={className}
        data-testid={dataTestId}
        onClick={onClick}
        width={width ?? undefined}
        height={height ?? undefined}
      />
    </picture>
  );
};

export default ResponsiveImage;
