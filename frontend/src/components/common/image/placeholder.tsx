// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface ImagePlaceholderProps {
  height: number;
  width?: number;
  round?: boolean;
  sharpBottom?: boolean;
  additionalClassName?: string;
}

interface PlaceHolderStyle {
  width?: string;
}

const COLORS = {
  0: "#c15055", // LavaPink
  1: "#f2641d", // LavaRed
  2: "#ea9038", // LavaOrange
  3: "#e9c76c", // LavaYellow
  4: "#688e85", // TrelLineGreen
  5: "#5596b0", // KatiasJacketBlue
  6: "#9a5371", // LavaPurple
};

const ImagePlaceholder = ({
  height,
  width,
  round = false,
  sharpBottom = false,
  additionalClassName = "",
}: ImagePlaceholderProps) => {
  // each row is 20px high, with 10px top + bottom padding each
  const numRows = Math.ceil((height - 1) / 20) - 1;
  const style: PlaceHolderStyle = {};
  if (width) {
    style.width = `${width}px`;
  }
  return (
    <div
      className={
        `image-placeholder${round ? "-round" : sharpBottom ? "-sharp-bottom" : ""}` +
        ` ${additionalClassName}`
      }
      style={style}
    >
      {[...Array(numRows)].map((_, idx) => (
        <div
          className="image-placeholder-scrolling-arrow"
          style={{
            paddingLeft: `${(idx % 3) * 20}px`,
            color: COLORS[idx % 7],
          }}
          key={idx}
        >
          ===&gt; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ===&gt;
        </div>
      ))}
    </div>
  );
};

export default ImagePlaceholder;
