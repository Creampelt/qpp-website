import * as React from "react";
import "../stylesheets/index.scss";

const Heading: React.FunctionComponent = ({ children }) => (
  <span className={"heading"}>
    <div className={"bullet"}>
      <div />
      <div />
    </div>
    <h1>{children}</h1>
  </span>
);

export default Heading;