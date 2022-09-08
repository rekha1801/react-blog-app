import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";

const initialState = {
  title: "",
  description: "",
  category: "",
  image: "",
};
const options = ["Fitness", "Sports", "Food", "Gardening"];

export default function AddEdit() {
  const [formValue, setFormValue] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { title, description, category, image } = formValue;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEdit(true);
      getSingleBlog(id);
    } else {
      setEdit(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(` http://localhost:3000/posts/${id}`);
    console.log(singleBlog.data);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };
  //to Submit the form perform the operations:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    //if the edit is true then update the formvalue else post it as a new one.

    if (title && description && category && image) {
      const currentDate = getDate();
      if (!edit) {
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
      } else {
        const response = await axios.put(
          `http://localhost:3000/posts/${id}`,
          formValue
        );
        if (response.status === 200) {
          toast.success("Blog updated successfully");
        } else {
          toast.error("Something went wrong");
        }
      }

      setFormValue({ title: "", description: "", category: "", image: "" });
      navigate("/");
    }
  };
  //When the input fields changes:
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  //When the image is updated generate a message:
  const onUploadImage = (file) => {
    console.log("file", file);
    toast.info("Image uploaded successfully");
    setFormValue({ ...formValue, image: `/images/${file.name}` });
  };
  //When the categroy drop down changes:
  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{edit ? "Update Blog" : "Add Blog"}</p>
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
        {!edit && (
          <>
            <MDBInput
              type="file"
              onChange={(e) => {
                onUploadImage(e.target.files[0]);
              }}
              required
              validation="Please upload an image"
              invalid
            ></MDBInput>

            <br />
          </>
        )}

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
          {edit ? "Update" : "Add"}
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
