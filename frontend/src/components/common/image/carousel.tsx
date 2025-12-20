import React, { useEffect, useState } from "react";
import preloadImages from "./preload";
import ImagePlaceholder from "./placeholder";
import ImageModal from "./modal";
import { invariant } from "../../../utils";
import { ProjectImage } from "../../../__generated__/types";
interface CarouselProps {
  readonly images: ProjectImage[];
}

interface LaneImage {
  image: ProjectImage;
  selected: boolean;
}

const Carousel = ({ images }: CarouselProps) => {
  const [selectedImage, selectImage] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let mainImage: ProjectImage | null = null;
  let laneImages: LaneImage[] = [];
  let mainImageContainerClass = "carousel-image-main-container";
  let laneImageClass = "carousel-lane-image";
  if (images.length > 4) {
    laneImageClass = "carousel-lane-image-mini";
  }
  images.forEach((image, idx) => {
    if (idx == selectedImage) {
      mainImage = image;
      laneImages.push({ image: image, selected: true });
    } else {
      laneImages.push({ image: image, selected: false });
    }
  });
  invariant(mainImage !== null, "Carousel must have at least one image");
  const mainImageSrc = mainImage.animation?.full ?? mainImage.half;
  const mainImageAlt = mainImage.animation?.alt ?? mainImage.alt;
  if (laneImages.length == 1) {
    return (
      <>
        <img
          data-testid="carousel-main-image"
          className="carousel-image-solo"
          src={mainImageSrc}
          alt={`${mainImageAlt} (large)`}
          onClick={() => setIsModalOpen(true)}
        />
        <ImageModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          withTopGap={mainImage.neverOverlap}
        >
          <img
            className="image-modal-full-size-image"
            src={mainImage.full}
            alt={`${mainImage.alt}`}
          />
        </ImageModal>
      </>
    );
  }
  // preload main version of lane images on first load so they're ready
  // for carousel clicking
  useEffect(() => {
    preloadImages({
      images: laneImages.map((img) => img.image.half),
      setIsPreloaded,
    });
  }, []);
  return (
    <>
      <div className={mainImageContainerClass}>
        {isPreloaded ? (
          <img
            className="carousel-image-main"
            data-testid="carousel-main-image"
            src={mainImageSrc}
            alt={`${mainImageAlt} (large)`}
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <ImagePlaceholder width={300} height={220} />
        )}
      </div>
      <div className="carousel-lane">
        {laneImages.map((laneImage, idx) => (
          <img
            className={
              laneImage.selected ? `${laneImageClass}-selected` : laneImageClass
            }
            src={laneImage.image.quarter}
            alt={`${laneImage.image.alt} (small)`}
            onClick={() => selectImage(idx)}
            key={idx}
          />
        ))}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        withTopGap={mainImage.neverOverlap}
      >
        <img
          className="image-modal-full-size-image"
          src={mainImage.full}
          alt={`${mainImage.alt}`}
        />
      </ImageModal>
    </>
  );
};

export default Carousel;
