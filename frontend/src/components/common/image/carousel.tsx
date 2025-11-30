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
  if (laneImages.length == 1) {
    laneImages = [];
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
      <div className="carousel-image-main-container" data-testid="carousel">
        {isPreloaded ? (
          <img
            className="carousel-image-main"
            data-testid="carousel-main-image"
            src={mainImage.half}
            alt={`${mainImage.alt} (large)`}
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
