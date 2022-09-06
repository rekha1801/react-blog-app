import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";

export default function Blogs({
  title,
  description,
  category,
  image,
  id,
  excerpt,
  handleDelete,
}) {
  return (
    <MDBCol size="4">
      <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "100px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(description)}
            <Link to={`/blog/${id}`}>Read More</Link>
          </MDBCardText>
          <Badge>{category}</Badge>
          <span>
            <MDBBtn
              className="mt-1"
              tag="a"
              color="none"
              onClick={() => handleDelete(id)}
            >
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "#dd4b39" }}
                size="lg"
              />
            </MDBBtn>
            <Link to={`/editblog/${id}`}>
              <MDBIcon
                fas
                icon="edit"
                style={{ color: "#ddacee", marginLeft: "10px" }}
                size="lg"
              />
            </Link>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
