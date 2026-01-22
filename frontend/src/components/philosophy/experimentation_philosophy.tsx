// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import made4SkateboardingPath50 from "../../assets/img/web/experiments/made_4_skateboarding/50.jpg";
import nodToVirgilPath50 from "../../assets/img/web/experiments/nod_to_virgil/50.jpg";
import whiteShoePath50 from "../../assets/img/web/experiments/white_shoe/50.jpg";
import made4SkateboardingPath100 from "../../assets/img/web/experiments/made_4_skateboarding/100.jpg";
import nodToVirgilPath100 from "../../assets/img/web/experiments/nod_to_virgil/100.jpg";
import whiteShoePath100 from "../../assets/img/web/experiments/white_shoe/100.jpg";
import { DEPARTMENT } from "../../utils";
import preloadImages from "../common/image/preload";
import FullSizableImage from "../common/image/full_sizeable_image";

export const ExperimentationPhilosophy = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  useEffect(() => {
    preloadImages({
      images: [made4SkateboardingPath50, nodToVirgilPath50, whiteShoePath50],
      setIsPreloaded,
    });
    preloadImages({
      images: [made4SkateboardingPath100, nodToVirgilPath100, whiteShoePath100],
      setIsPreloaded: () => {}, // in background
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">Experimentation Philosophy</h1>
        <Link to={`/portfolio/?dept=${DEPARTMENT.EXPERIMENT}`}>
          <button className="button-link">PORTFOLIO →</button>
        </Link>
      </div>
      <FullSizableImage
        smallSrc={nodToVirgilPath50}
        fullSrc={nodToVirgilPath100}
        alt="Hard hat with Artist painted on it"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          This studio is a reaction to the self-limiting, gate-keeping,
          perfectionist tendencies that keep all of us from doing the things we
          want to do.
        </p>
      </div>
      <FullSizableImage
        smallSrc={whiteShoePath50}
        fullSrc={whiteShoePath100}
        alt="P. Fonseca painting arrows on a shoe"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          There is no overarching style or school or even type of art going on
          here, because the artist has not been trained in any of them.
        </p>
        <p>
          Each department started here as a "how hard could it be" experiment.
        </p>
      </div>
      <FullSizableImage
        smallSrc={made4SkateboardingPath50}
        fullSrc={made4SkateboardingPath100}
        alt="Hands sewing a made for skateboarding patch on a backpack"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          The space itself has no door, it's an open invitation for trying
          something new, and figuring it out as you go.
        </p>
      </div>
    </div>
  );
};

export default ExperimentationPhilosophy;
