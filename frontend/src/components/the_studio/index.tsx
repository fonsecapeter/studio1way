// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import studioInsidePath from "../../assets/img/the_studio/inside/50.jpg";
import studioSawPath from "../../assets/img/the_studio/saw/50.jpg";
import studioShelfPath from "../../assets/img/the_studio/shelf/50.jpg";
import studioSignPath from "../../assets/img/the_studio/sign/50.jpg";

export const TheStudio = () => (
  <div>
    <h1 className="page-title">The Studio of P. Fonseca</h1>
    <img className="full-width" src={studioSignPath} alt="Studio 1Way sign" />
    <p>
      Studio 1Way is all about breaking out of rigid paths and finding new ones.
      I think art is everywhere and more accessible than people think.
    </p>
    <img className="full-width" src={studioShelfPath} alt="Studio shelves" />
    <p>
      The studio itself may be limited to 10 square feet, but it's ideas are
      much bigger.
    </p>
    <img
      className="full-width"
      src={studioInsidePath}
      alt="Inside the studio"
    />
    <p>
      We have several departments, including Ceramics, Painting, Woodworking,
      and more to come.
    </p>
    <img className="full-width" src={studioSawPath} alt="Plywood mid-sawing" />
    <p>So have a look around and do reach out for any inquiries.</p>
  </div>
);

export default TheStudio;
