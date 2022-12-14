import React from "react";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function LatestBlog({ image, title, _id }) {
  return (
    <div>
      <Link to={`/blog/${_id}`}>
        <MDBCard style={{ maxWidth: "320px", height: "80px" }} className="mt-3">
          <MDBRow className="g-0">
            <MDBCol md="3">
              <MDBCardImage
                src={image}
                alt={title}
                fluid
                className="rounded-circle"
                style={{ height: "80px" }}
              />
            </MDBCol>
            <MDBCol md="9">
              <MDBCardBody>
                <p className="text-start latest-title">{title}</p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </Link>
    </div>
  );
}
