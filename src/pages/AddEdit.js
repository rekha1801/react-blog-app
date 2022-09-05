import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../index.css";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};
const options = ["Fitness", "Sports", "Food"];

export default function AddEdit() {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { title, description, category, image } = formValue;
  const navigate = useNavigate();

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    //&& imageUrl
    if (title && description && category && image) {
      const currentDate = getDate();
      const updatedBlogData = { ...formValue, date: currentDate };
      const response = await axios.post(
        " http://localhost:3000/posts",
        updatedBlogData
      );
      if (response.status === 201) {
        toast.success("Blog created successfully");
      } else {
        toast.error("Something went wrong");
      }
      setFormValue({ title: "", description: "", category: "" });
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const onUploadImage = (file) => {
    console.log("file", file);
    axios
      .post("http://localhost:3000/posts", {
        image: `/images/${file.name}`,
      })
      .then((resp) => {
        console.log(resp.data.image);
        toast.info("Image uploaded successfully");
        setFormValue({ ...formValue, image: resp.data.image });
      });
  };
  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  //   useEffect(() => {
  //     axios.get("http://localhost:3000/posts").then((res) => console.log(res));
  //   }, []);

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="Please provide a title"
          invalid
        ></MDBInput>
        <br />
        <MDBInput
          value={description || ""}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="Description"
          validation="Please provide a description"
          textarea
          rows={4}
          invalid
        ></MDBInput>
        <br />
        <MDBInput
          type="file"
          onChange={(e) => {
            onUploadImage(e.target.files[0]);
          }}
          required
          validation="Please provide a title"
          invalid
        ></MDBInput>
        <br />
        <select
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
        >
          <option>Please select category</option>
          {options.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
        {categoryErrMsg && (
          <div className="categoryErrorMsg">{categoryErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "10px" }}>
          Add
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
}
