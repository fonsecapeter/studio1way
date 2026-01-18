// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lumberPath50 from "../../assets/img/web/wood/lumber/50.jpg";
import reclaimedPlywoodPath50 from "../../assets/img/web/wood/reclaimed_plywood/50.jpg";
import sawPath50 from "../../assets/img/web/wood/saw/50.jpg";
import roundedEdgesPath50 from "../../assets/img/web/wood/rounded_edges/50.jpg";
import lumberPath100 from "../../assets/img/web/wood/lumber/100.jpg";
import reclaimedPlywoodPath100 from "../../assets/img/web/wood/reclaimed_plywood/100.jpg";
import sawPath100 from "../../assets/img/web/wood/saw/100.jpg";
import roundedEdgesPath100 from "../../assets/img/web/wood/rounded_edges/100.jpg";
import { DEPARTMENT } from "../../utils";
import preloadImages from "../common/image/preload";
import FullSizableImage from "../common/image/full_sizeable_image";

export const WoodPhilosophy = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  useEffect(() => {
    preloadImages({
      images: [
        sawPath50,
        reclaimedPlywoodPath50,
        lumberPath50,
        roundedEdgesPath50,
      ],
      setIsPreloaded,
    });
    preloadImages({
      images: [
        sawPath100,
        reclaimedPlywoodPath100,
        lumberPath100,
        roundedEdgesPath100,
      ],
      setIsPreloaded: () => {},
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">Wood Philosophy</h1>
        <Link to={`/portfolio/?dept=${DEPARTMENT.WOOD}`}>
          <button className="button-link">PORTFOLIO →</button>
        </Link>
      </div>
      <FullSizableImage
        smallSrc={sawPath50}
        fullSrc={sawPath100}
        alt="Hand saw mid-cut"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>In the studio, we work mostly with humble hand-tools.</p>
      </div>
      <FullSizableImage
        smallSrc={reclaimedPlywoodPath50}
        fullSrc={reclaimedPlywoodPath100}
        alt="Gnarly looking plywood mid-block-planing"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>And equally humble materials, often reclaimed or salvaged.</p>
      </div>
      <FullSizableImage
        smallSrc={lumberPath50}
        fullSrc={lumberPath100}
        alt="Stacked lumber of various types"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>Work is left thoughtfully unpolished, but properly finished.</p>
      </div>
      <FullSizableImage
        smallSrc={roundedEdgesPath50}
        fullSrc={roundedEdgesPath100}
        alt="Close up of hand-rounded edges"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>It should be clear that this is a hand-made item.</p>
      </div>
    </div>
  );
};

export default WoodPhilosophy;
