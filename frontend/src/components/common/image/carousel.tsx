import React, { useEffect, useState } from "react";
import preloadImages from "./preload";
import FullSizableImage from "./full_sizeable_image";
import ResponsiveImage from "./responsive_image";
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
  const mainImageTiers = mainImage.animation
    ? undefined
    : {
        quarter: mainImage.quarter,
        half: mainImage.half,
        full: mainImage.full,
      };
  if (images.length == 1) {
    useEffect(() => {
      preloadImages({
        images: [mainImageSrc],
        setIsPreloaded,
      });
    }, []);

    return (
      <FullSizableImage
        smallSrc={mainImageSrc}
        fullSrc={mainImage.full}
        alt={`${mainImageAlt} (large)`}
        dataTestId="carousel-main-image"
        className="carousel-image-solo"
        withTopGap={mainImage.neverOverlap}
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderClassName="carousel-image-solo"
        tiers={mainImageTiers}
        width={mainImage.width}
        height={mainImage.height}
      />
    );
  }
  useEffect(() => {
    preloadImages({
      images: [mainImageSrc],
      setIsPreloaded,
      delay: 5000,
    });
    preloadImages({
      images: laneImages.map((img) => img.image.half),
      setIsPreloaded: () => {}, // in background
    });
    preloadImages({
      images: laneImages.map((img) => img.image.full),
      setIsPreloaded: () => {}, // in background
    });
  }, []);
  return (
    <>
      <div className={mainImageContainerClass}>
        <FullSizableImage
          smallSrc={mainImageSrc}
          fullSrc={mainImage.full}
          alt={`${mainImageAlt} (large)`}
          dataTestId="carousel-main-image"
          className="carousel-image-main"
          withTopGap={mainImage.neverOverlap}
          isPreloaded={isPreloaded}
          placeHolderHeight={220}
          placeHolderClassName="carousel-image-main-placeholder"
          tiers={mainImageTiers}
          width={mainImage.width}
          height={mainImage.height}
        />
      </div>
      <div className="carousel-lane">
        {laneImages.map((laneImage, idx) => (
          <ResponsiveImage
            className={
              laneImage.selected
                ? `${laneImageClass}-selected`
                : isPreloaded
                  ? laneImageClass
                  : `${laneImageClass}-disabled`
            }
            src={laneImage.image.quarter}
            alt={`${laneImage.image.alt} (small)`}
            onClick={isPreloaded ? () => selectImage(idx) : () => {}}
            width={laneImage.image.width}
            height={laneImage.image.height}
            key={idx}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
