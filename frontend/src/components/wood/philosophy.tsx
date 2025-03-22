// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import lumberPath from "../../assets/img/web/wood/lumber/50.jpg";
import reclaimedPlywoodPath from "../../assets/img/web/wood/reclaimed_plywood/50.jpg";
import sawPath from "../../assets/img/web/wood/saw/50.jpg";
import roundedEdgesPath from "../../assets/img/web/wood/rounded_edges/50.jpg";

export const WoodPhilosophy = () => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">Wood Philosophy</h1>
      <Link to="projects">
        <button className="button-link">PORTFOLIO →</button>
      </Link>
    </div>
    <img className="full-width" src={sawPath} alt="Hand saw mid-cut" />
    <p>In the studio, we work mostly with humble hand-tools.</p>
    <img
      className="full-width"
      src={reclaimedPlywoodPath}
      alt="Gnarly looking plywood mid-block-planing"
    />
    <p>And equally humble materials, often reclaimed or salvaged.</p>
    <img className="full-width" src={lumberPath} alt="Hand saw mid-cut" />
    <p>Work is left thoughtfully unpolished, but properly finished.</p>
    <img
      className="full-width"
      src={roundedEdgesPath}
      alt="Close up of hand-rounded edges"
    />
    <p>It should be clear that this is a hand-made item.</p>
  </div>
);

export default WoodPhilosophy;
