// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import canvasBackPath from "../../assets/img/web/paint/canvas_back/50.jpg";
import paintSetPath from "../../assets/img/web/paint/paint_set/50.jpg";
import parisInProgressPath from "../../assets/img/web/paint/paris_in_progress/50.jpg";
import qRCodePath from "../../assets/img/web/paint/qr_code/50.jpg";
import { DEPARTMENT } from "../../utils";

export const PaintPhilosophy = () => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">Painting Philosophy</h1>
      <Link to={`/portfolio/?dept=${DEPARTMENT.PAINT}`}>
        <button className="button-link">PORTFOLIO →</button>
      </Link>
    </div>
    <img
      className="full-width"
      src={canvasBackPath}
      alt="Back of canvas with Studio 1 Way written on it"
    />
    <div className="philosophy-text">
      <p>The term painting is used liberally within the studio.</p>
    </div>
    <img
      className="full-width"
      src={parisInProgressPath}
      alt="Painting on workbench mid-process"
    />
    <div className="philosophy-text">
      <p>Of course there are your standard oil or acrylic paintings.</p>
    </div>
    <img
      className="full-width"
      src={paintSetPath}
      alt="handmade ceramic paint set"
    />
    <div className="philosophy-text">
      <p>But we also work in watercolors, pastels, sharpies, and whiteout.</p>
      <p>Whatever gets the job done.</p>
    </div>
    <img
      className="full-width"
      src={qRCodePath}
      alt="Hand-drawn QR Code in progress"
    />
  </div>
);

export default PaintPhilosophy;
