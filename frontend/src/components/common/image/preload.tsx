const holdUp = (ms: number) => new Promise((res) => setTimeout(res, ms));

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = img.onabort = () => {
      reject(src);
    };
    img.src = src;
  });
};

interface PreloadImagesArgs {
  readonly images: string[];
  readonly setIsPreloaded: CallableFunction;
  readonly delay?: number;
}

const preloadImages = async ({
  images,
  setIsPreloaded,
  delay = 500,
}: PreloadImagesArgs) => {
  if (delay > 0) {
    await holdUp(delay);
  }
  const promises: Promise<any>[] = [];
  images.forEach((image) => {
    promises.push(preloadImage(image));
  });
  await Promise.all(promises);
  setIsPreloaded(true);
};

export default preloadImages;
