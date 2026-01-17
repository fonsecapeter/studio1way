// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studioInsidePath50 from "../../assets/img/web/the_studio/inside/50.jpg";
import studioInsidePath100 from "../../assets/img/web/the_studio/inside/100.jpg";
import studioClockPath50 from "../../assets/img/web/the_studio/clock/50.jpg";
import studioClockPath100 from "../../assets/img/web/the_studio/clock/100.jpg";
import studioShelfPath50 from "../../assets/img/web/the_studio/shelf/50.jpg";
import studioShelfPath100 from "../../assets/img/web/the_studio/shelf/100.jpg";
import studioSignPath50 from "../../assets/img/web/the_studio/sign/50.jpg";
import studioSignPath100 from "../../assets/img/web/the_studio/sign/100.jpg";
import studioOneWaySignPath50 from "../../assets/img/web/the_studio/one_way_sign/50.jpg";
import studioOneWaySignPath100 from "../../assets/img/web/the_studio/one_way_sign/100.jpg";
import preloadImages from "../common/image/preload";
import FullSizableImage from "../common/image/full_sizeable_image";

export const StudioPhilosophy = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  useEffect(() => {
    preloadImages({
      images: [
        studioSignPath50,
        studioShelfPath50,
        studioInsidePath50,
        studioClockPath50,
        studioOneWaySignPath50,
      ],
      setIsPreloaded,
    });
    preloadImages({
      images: [
        studioSignPath100,
        studioShelfPath100,
        studioInsidePath100,
        studioClockPath100,
        studioOneWaySignPath100,
      ],
      setIsPreloaded: () => {},
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">The Studio of P. Fonseca</h1>
        <a href="https://peternfonseca.com" target="_blank">
          <button className="button-link">↑ about the artist ↑</button>
        </a>
      </div>
      <FullSizableImage
        smallSrc={studioSignPath50}
        fullSrc={studioSignPath100}
        alt="Studio 1Way sign"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderWidth={400}
      />
      <div className="philosophy-text">
        <p>
          Studio 1Way is all about breaking out of rigid paths and finding new
          ones.
        </p>
        <p>I think art is everywhere and more accessible than people think.</p>
      </div>
      <FullSizableImage
        smallSrc={studioShelfPath50}
        fullSrc={studioShelfPath100}
        alt="Studio shelves"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderWidth={400}
      />
      <div className="philosophy-text">
        <p>The studio itself may be limited to 10 square feet</p>
        <p>but it's ideas are much bigger.</p>
      </div>
      <FullSizableImage
        smallSrc={studioInsidePath50}
        fullSrc={studioInsidePath100}
        alt="Inside the studio"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderWidth={400}
      />
      <div className="philosophy-text">
        <p>We have several departments:</p>
        <ul>
          <li>
            <Link to="/ceramics">Ceramics</Link>
          </li>
          <li>
            <Link to="/paint">Painting</Link>
          </li>
          <li>
            <Link to="/wood">Woodworking</Link>
          </li>
        </ul>
        <p>
          As well as a selection of{" "}
          <Link to="/other">experimental, uncategoried pieces.</Link>
        </p>
      </div>
      <FullSizableImage
        smallSrc={studioClockPath50}
        fullSrc={studioClockPath100}
        alt="Clock on small shelf with roll of expired film"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderWidth={400}
      />
      <div className="philosophy-text">
        <p>There isn't just one way, this is 1 Way.</p>
      </div>
      <FullSizableImage
        smallSrc={studioOneWaySignPath50}
        fullSrc={studioOneWaySignPath100}
        alt="P. Fonseca holding a literal one-way sign while skateboarding"
        className="full-width"
        isPreloaded={isPreloaded}
        placeHolderHeight={220}
        placeHolderWidth={400}
      />
    </div>
  );
};

export default StudioPhilosophy;
