import React, { useContext } from "react";
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
import { Context } from "../context/Context.js";

export default function Blogs({
  email,
  title,
  description,
  category,
  image,
  _id,
  excerpt,
  handleDelete,
}) {
  const { user } = useContext(Context);
  //const { _id } = useParams();
  console.log("email of blog is : ", email);
  //console.log("User details", user?.data.email);

  //const response = axios.get(`${process.env.REACT_APP_BE_URL}/posts/${_id}`);
  //JSX To create the cards and
  //display title,description, badge, delete and update icons.
  return (
    <MDBCol size="4">
      <MDBCard className="h-180 mt-3" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "120px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(description)}
            {user && <Link to={`/blog/${_id}`}>Read More</Link>}
          </MDBCardText>
          <Badge>{category}</Badge>
          <span>
            <MDBBtn
              className="mt-1"
              tag="a"
              color="none"
              onClick={() => handleDelete(_id)}
              style={{ pointerEvents: user?.data.email !== email && "none" }}
            >
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "#dd4b39" }}
                size="lg"
              />
            </MDBBtn>

            <Link
              to={`/editblog/${_id}`}
              style={{ pointerEvents: user?.data.email !== email && "none" }}
            >
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
