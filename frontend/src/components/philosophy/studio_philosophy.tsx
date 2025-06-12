// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import studioInsidePath from "../../assets/img/web/the_studio/inside/50.jpg";
import studioClockPath from "../../assets/img/web/the_studio/clock/50.jpg";
import studioShelfPath from "../../assets/img/web/the_studio/shelf/50.jpg";
import studioSignPath from "../../assets/img/web/the_studio/sign/50.jpg";
import studioOneWaySignPath from "../../assets/img/web/the_studio/one_way_sign/50.jpg";

export const StudioPhilosophy = () => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">The Studio of P. Fonseca</h1>
      <a href="https://peternfonseca.com" target="_blank">
        <button className="button-link">↑ about the artist ↑</button>
      </a>
    </div>
    <img className="full-width" src={studioSignPath} alt="Studio 1Way sign" />
    <div className="philosophy-text">
      <p>
        Studio 1Way is all about breaking out of rigid paths and finding new
        ones.
      </p>
      <p>I think art is everywhere and more accessible than people think.</p>
    </div>
    <img className="full-width" src={studioShelfPath} alt="Studio shelves" />
    <div className="philosophy-text">
      <p>The studio itself may be limited to 10 square feet</p>
      <p>but it's ideas are much bigger.</p>
    </div>
    <img
      className="full-width"
      src={studioInsidePath}
      alt="Inside the studio"
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
    <img
      className="full-width"
      src={studioClockPath}
      alt="Clock on small shelf with roll of expired film"
    />
    <div className="philosophy-text">
      <p>There isn't just one way, this is 1 Way.</p>
    </div>
    <img
      className="full-width"
      src={studioOneWaySignPath}
      alt="P. Fonseca holding a literal one-way sign while skateboarding"
    />
  </div>
);

export default StudioPhilosophy;
