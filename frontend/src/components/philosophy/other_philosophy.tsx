// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import made4SkateboardingPath from "../../assets/img/web/other/made_4_skateboarding/50.jpg";
import nodToVirgilPath from "../../assets/img/web/other/nod_to_virgil/50.jpg";
import whiteShoePath from "../../assets/img/web/other/white_shoe/50.jpg";
import { DEPARTMENT } from "../../utils";

export const OtherPhilosophy = () => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">Experimentation Philosophy</h1>
      <Link to={`/portfolio/?dept=${DEPARTMENT.OTHER}`}>
        <button className="button-link">PORTFOLIO →</button>
      </Link>
    </div>
    <img
      className="full-width"
      src={nodToVirgilPath}
      alt="Hard hat with Artist painted on it"
    />
    <div className="philosophy-text">
      <p>
        This studio is a reaction to the self-limiting, gate-keeping,
        perfectionist tendencies that keep all of us from doing the things we
        want to do.
      </p>
    </div>
    <img
      className="full-width"
      src={whiteShoePath}
      alt="P. Fonseca painting arrows on a shoe"
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
    <img
      className="full-width"
      src={made4SkateboardingPath}
      alt="Hands sewing a made for skateboarding patch on a backpack"
    />
    <div className="philosophy-text">
      <p>
        The space itself has no door, it's an open invitation for trying
        something new, and figuring it out as you go.
      </p>
    </div>
  </div>
);

export default OtherPhilosophy;
