// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import canvasBackPath50 from "../../assets/img/web/paint/canvas_back/50.jpg";
import paintSetPath50 from "../../assets/img/web/paint/paint_set/50.jpg";
import parisInProgressPath50 from "../../assets/img/web/paint/paris_in_progress/50.jpg";
import qRCodePath50 from "../../assets/img/web/paint/qr_code/50.jpg";
import canvasBackPath100 from "../../assets/img/web/paint/canvas_back/100.jpg";
import paintSetPath100 from "../../assets/img/web/paint/paint_set/100.jpg";
import parisInProgressPath100 from "../../assets/img/web/paint/paris_in_progress/100.jpg";
import qRCodePath100 from "../../assets/img/web/paint/qr_code/100.jpg";
import { DEPARTMENT } from "../../utils";
import preloadImages from "../common/image/preload";
import FullSizableImage from "../common/image/full_sizeable_image";

export const PaintPhilosophy = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  useEffect(() => {
    preloadImages({
      images: [
        canvasBackPath50,
        paintSetPath50,
        parisInProgressPath50,
        qRCodePath50,
      ],
      setIsPreloaded,
    });
    preloadImages({
      images: [
        canvasBackPath100,
        paintSetPath100,
        parisInProgressPath100,
        qRCodePath100,
      ],
      setIsPreloaded: () => {},
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">Painting Philosophy</h1>
        <Link to={`/portfolio/?dept=${DEPARTMENT.PAINT}`}>
          <button className="button-link">PORTFOLIO →</button>
        </Link>
      </div>
      <FullSizableImage
        smallSrc={canvasBackPath50}
        fullSrc={canvasBackPath100}
        alt="Back of canvas with Studio 1 Way written on it"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>The term painting is used liberally within the studio.</p>
      </div>
      <FullSizableImage
        smallSrc={parisInProgressPath50}
        fullSrc={parisInProgressPath100}
        alt="Painting on workbench mid-process"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>Of course there are your standard oil or acrylic paintings.</p>
      </div>
      <FullSizableImage
        smallSrc={paintSetPath50}
        fullSrc={paintSetPath100}
        alt="handmade ceramic paint set"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>But we also work in watercolors, pastels, sharpies, and whiteout.</p>
        <p>Whatever gets the job done.</p>
      </div>
      <FullSizableImage
        smallSrc={qRCodePath50}
        fullSrc={qRCodePath100}
        alt="Hand-drawn QR Code in progress"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
    </div>
  );
};

export default PaintPhilosophy;
