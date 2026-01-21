// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bowlStampPath50 from "../../assets/img/web/ceramics/bowl_stamp/50.jpg";
import coffeeCupPath50 from "../../assets/img/web/ceramics/coffee_cup/50.jpg";
import dentPath50 from "../../assets/img/web/ceramics/dent/50.jpg";
import inHandPath50 from "../../assets/img/web/ceramics/in_hand/50.jpg";
import onShelfPath50 from "../../assets/img/web/ceramics/on_shelf/50.jpg";
import bowlStampPath100 from "../../assets/img/web/ceramics/bowl_stamp/100.jpg";
import coffeeCupPath100 from "../../assets/img/web/ceramics/coffee_cup/100.jpg";
import dentPath100 from "../../assets/img/web/ceramics/dent/100.jpg";
import inHandPath100 from "../../assets/img/web/ceramics/in_hand/100.jpg";
import onShelfPath100 from "../../assets/img/web/ceramics/on_shelf/100.jpg";
import { DEPARTMENT } from "../../utils";
import preloadImages from "../common/image/preload";
import FullSizableImage from "../common/image/full_sizeable_image";

export const CeramicsPhilosophy = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  useEffect(() => {
    preloadImages({
      images: [
        bowlStampPath50,
        coffeeCupPath50,
        dentPath50,
        inHandPath50,
        onShelfPath50,
      ],
      setIsPreloaded,
    });
    preloadImages({
      images: [
        bowlStampPath100,
        coffeeCupPath100,
        dentPath100,
        inHandPath100,
        onShelfPath100,
      ],
      setIsPreloaded: () => {}, // in background
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">Ceramics Philosophy</h1>
        <Link to={`/portfolio/?dept=${DEPARTMENT.CERAMICS}`}>
          <button className="button-link">PORTFOLIO →</button>
        </Link>
      </div>
      <FullSizableImage
        smallSrc={onShelfPath50}
        fullSrc={onShelfPath100}
        alt="3 Clay cups on a shelf"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          All studio ceramic wares are made by hand in carefully chosen
          materials:
        </p>
        <ul>
          <li>
            A gray stoneware clay-body that looks like the beautiful, skateable
            cement paving San Francisco.
          </li>
          <li>A clear glaze that protects + presents it fully.</li>
        </ul>
      </div>
      <FullSizableImage
        smallSrc={coffeeCupPath50}
        fullSrc={coffeeCupPath100}
        alt="Ceramic cup full of coffee"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          The studio approach to ceramics strives for exacting attention to
          detail and form.
        </p>
      </div>
      <FullSizableImage
        smallSrc={bowlStampPath50}
        fullSrc={bowlStampPath100}
        alt="Studio 1Way makers mark stamped into bottom of bowl"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>But imperfections are cherished.</p>
        <p>
          They tell story of how these objects came to be and the hands that
          made them.
        </p>
      </div>
      <FullSizableImage
        smallSrc={inHandPath50}
        fullSrc={inHandPath100}
        alt="Bottom of clay cup in hand"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
      <div className="philosophy-text">
        <p>
          Durability is a must as the artist has a habit of dropping things.
        </p>
        <p>There will be no delicate, thin walls here.</p>
      </div>
      <FullSizableImage
        smallSrc={dentPath50}
        fullSrc={dentPath100}
        alt="Dent in clay cup that fell"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
      />
    </div>
  );
};

export default CeramicsPhilosophy;
