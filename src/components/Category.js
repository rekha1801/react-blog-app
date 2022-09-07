import React from "react";

import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

export default function Category({ handleCategory, options }) {
  return (
    <div>
      <MDBCard style={{ width: "18rem", marginTop: "20px" }}>
        <h4>Categories</h4>
        <MDBListGroup>
          {options.map((item, index) => {
            return (
              <MDBListGroupItem
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleCategory(item)}
              >
                {item}
              </MDBListGroupItem>
            );
          })}
        </MDBListGroup>
      </MDBCard>
    </div>
  );
}
