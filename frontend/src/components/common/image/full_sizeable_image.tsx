import React, { useState } from "react";
import ImageModal from "./modal";
import ImagePlaceholder from "./placeholder";

interface ImageProps {
  smallSrc: string;
  fullSrc: string;
  alt: string;
  dataTestId?: string;
  className?: string;
  withTopGap?: boolean;
  isPreloaded?: boolean;
  placeHolderHeight?: number;
  placeHolderWidth?: number;
  placeHolderClassName?: string;
}

export const FullSizableImage = ({
  smallSrc,
  fullSrc,
  alt,
  dataTestId = null,
  className = "",
  withTopGap = false,
  isPreloaded = true,
  placeHolderHeight = 0,
  placeHolderWidth = 0,
  placeHolderClassName = "",
}: ImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (isPreloaded) {
    return (
      <>
        <img
          data-testid={dataTestId}
          className={className}
          src={smallSrc}
          alt={alt}
          onClick={() => setIsModalOpen(true)}
        />
        <ImageModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          withTopGap={withTopGap}
        >
          <img
            className="image-modal-full-size-image"
            src={fullSrc}
            alt={alt}
          />
        </ImageModal>
      </>
    );
  }
  return (
    <ImagePlaceholder
      additionalClassName={placeHolderClassName}
      height={placeHolderHeight}
      width={placeHolderWidth}
    />
  );
};

export default FullSizableImage;
