import React, { useEffect, useState } from "react";
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge";
import { toast } from "react-toastify";

//to initialize all the state varaibles.
export default function SingleBlog() {
  const [blog, setBlog] = useState([]);
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();

  //to load the data on the page by passing the ID in the URL
  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  //to get the single Blog using the id from useParams in the URL
  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);

    const relatedPostData = await axios.get(
      `http://localhost:5000/posts/?category=${response.data.category}&_start=0&_end=4`
    );
    console.log(relatedPostData);
    //setting the related post by passing the category in the URL
    setRelatedPost(relatedPostData.data);
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("something went wrong");
    }
  };
  console.log(relatedPost);

  //to set the styleInfo for the badge
  //to give each category style and color
  const styleInfo = {
    display: "inline",
    marginLeft: "15px",
    float: "right",
    marginTop: "17px",
  };

  //to extract a piece of description and the rest added as "..."
  // to read more, click on the read more link
  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.substring(0, 60) + " ... ";
    }
    return str;
  };

  //to display the container with the GoBack link, title, image, description and date
  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: "left", color: "red" }} className="mt-3">
          Go Back
        </strong>
      </Link>

      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block" }}
      >
        {blog && blog.title}
      </MDBTypography>
      <img
        src={blog && blog.image}
        className="img-fluid-rounded"
        alt={blog.title}
        style={{ width: "100%", maxHeight: "600px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "#f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3"
            icon="calendar-alt"
            size="lg"
          />
          <strong
            style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}
          >
            {blog && blog.date}
          </strong>
          <Badge style={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className="text-muted lead md-0">
          {blog && blog.description}
        </MDBTypography>
      </div>

      {/* to show the related post under each singleBlog.
      If there is no related post don't show the related post topic */}
      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && <h1>Related Post</h1>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedPost
              .filter((item) => item._id !== parseInt(id))
              .map((item, index) => {
                return (
                  <MDBCol>
                    <MDBCard>
                      <Link key={index} to={`/blog/${item._id}`}>
                        <MDBCardImage
                          src={item.image}
                          alt={item.title}
                          position="top"
                        />
                      </Link>
                      <MDBCardBody>
                        <MDBCardTitle>{item.title}</MDBCardTitle>
                        <MDBCardText>{excerpt(item.description)}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                );
              })}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
}
