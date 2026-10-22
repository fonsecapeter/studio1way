import React, { useState } from "react";
import ImageModal from "./modal";
import ImagePlaceholder from "./placeholder";
import ResponsiveImage, { ImageTiers } from "./responsive_image";

interface ImageProps {
  smallSrc: string;
  fullSrc: string;
  alt: string;
  dataTestId?: string;
  className?: string;
  withTopGap?: boolean;
  isPreloaded?: boolean;
  placeHolderHeight?: number;
  placeHolderClassName?: string;
  tiers?: ImageTiers;
  width?: number | null;
  height?: number | null;
}

export const FullSizableImage = ({
  smallSrc,
  fullSrc,
  alt,
  dataTestId = "",
  className = "",
  withTopGap = false,
  isPreloaded = true,
  placeHolderHeight = 0,
  placeHolderClassName = "",
  tiers,
  width,
  height,
}: ImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!placeHolderClassName) {
    placeHolderClassName = className;
  }
  if (isPreloaded) {
    return (
      <>
        {tiers ? (
          <ResponsiveImage
            dataTestId={dataTestId}
            className={className}
            src={smallSrc}
            tiers={tiers}
            width={width}
            height={height}
            alt={alt}
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <img
            data-testid={dataTestId}
            className={className}
            src={smallSrc}
            alt={alt}
            onClick={() => setIsModalOpen(true)}
          />
        )}
        <ImageModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          withTopGap={withTopGap}
        >
          {tiers ? (
            <ResponsiveImage
              className="image-modal-full-size-image"
              src={fullSrc}
              alt={alt}
            />
          ) : (
            <img
              className="image-modal-full-size-image"
              src={fullSrc}
              alt={alt}
            />
          )}
        </ImageModal>
      </>
    );
  }
  return (
    <ImagePlaceholder
      additionalClassName={placeHolderClassName}
      height={placeHolderHeight}
    />
  );
};

export default FullSizableImage;
