// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface NotFoundProps {
  readonly msg?: string;
}

const NotFound = ({ msg = "This page doesn't exist" }: NotFoundProps) => (
  <div>
    <h1>Not Found</h1>
    <p>{msg}</p>
  </div>
);

export default NotFound;
