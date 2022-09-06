import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

export default function Badge({ children, styleInfo }) {
  const colorKey = {
    Food: "warning",
    Fitness: "primary",
    Sports: "success",
  };
  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
}
