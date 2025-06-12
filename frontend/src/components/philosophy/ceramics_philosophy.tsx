// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import bowlStampPath from "../../assets/img/web/ceramics/bowl_stamp/50.jpg";
import coffeeCupPath from "../../assets/img/web/ceramics/coffee_cup/50.jpg";
import dentPath from "../../assets/img/web/ceramics/dent/50.jpg";
import inHandPath from "../../assets/img/web/ceramics/in_hand/50.jpg";
import onShelfPath from "../../assets/img/web/ceramics/on_shelf/50.jpg";

export const CeramicsPhilosophy = () => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">Ceramics Philosophy</h1>
      <Link to="projects">
        <button className="button-link">PORTFOLIO →</button>
      </Link>
    </div>
    <img
      className="full-width"
      src={onShelfPath}
      alt="3 Clay cups on a shelf"
    />
    <div className="philosophy-text">
      <p>
        All studio ceramic wares are made by hand in carefully chosen materials:
      </p>
      <ul>
        <li>
          A gray stoneware clay-body that looks like the beautiful, skateable
          cement paving San Francisco.
        </li>
        <li>A clear glaze that protects + presents it fully.</li>
      </ul>
    </div>
    <img
      className="full-width"
      src={coffeeCupPath}
      alt="Ceramic cup full of coffee"
    />
    <div className="philosophy-text">
      <p>
        The studio approach to ceramics strives for exacting attention to detail
        and form.
      </p>
    </div>
    <img
      className="full-width"
      src={bowlStampPath}
      alt="Studio 1Way makers mark stamped into bottom of bowl"
    />
    <div className="philosophy-text">
      <p>But imperfections are cherished.</p>
      <p>
        They tell story of how these objects came to be and the hands that made
        them.
      </p>
    </div>
    <img
      className="full-width"
      src={inHandPath}
      alt="Bottom of clay cup in hand"
    />
    <div className="philosophy-text">
      <p>Durability is a must as the artist has a habit of dropping things.</p>
      <p>There will be no delicate, thin walls here.</p>
    </div>
    <img
      className="full-width"
      src={dentPath}
      alt="Dent in clay cup that fell"
    />
  </div>
);

export default CeramicsPhilosophy;
