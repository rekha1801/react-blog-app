import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBTypography, MDBContainer } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";

export default function Home() {
  const [data, setData] = useState([]);
  const [latestBlogData, setLatestBlogData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalBlog, setTotalBlog] = useState(null);

  const options = ["Fitness", "Sports", "Food", "Gardening"];

  //During the first load of the page, load all the data and fetch the latest blog
  useEffect(() => {
    loadBlogsData();
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async () => {
    const response = await axios.get(
      `http://localhost:3000/posts`
      //`http://localhost:3000/posts?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Data has not fetched");
    }
  };
  //console.log(data);

  //To fetch the latest blog data, get the total length of the blogs
  // and set the start and end in the url to get the last 4 blogs.
  const fetchLatestBlog = async () => {
    const AllBlogs = await axios.get(" http://localhost:3000/posts");
    setTotalBlog(AllBlogs.data.length);
    const start = AllBlogs.data.length - 4;
    const end = AllBlogs.data.length;

    // again getting the blogs using the start and end query in the URL
    const response = await axios.get(
      `http://localhost:3000/posts?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlogData(response.data);
    } else {
      toast.error("Data has not fetched");
    }
  };

  // when the trash icon is clicked, delete by axios passing the id in the URL
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete???")) {
      const response = await axios.delete(`http://localhost:3000/posts/${id}`);
      if (response.status === 200) {
        toast.success("Deleted successfully");
        loadBlogsData();
      } else {
        toast.error("Something went wrong, blog not deleted");
      }
    }
  };

  //to extract the description in short sentence and added "..."
  //and to read more, click on read more link
  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };

  //When the search is of any category,
  //the input field changes and loads data accordingly.
  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData(); //no search value given, load all data
    } else {
      setSearchValue(e.target.value); // set the search value and load only that data
    }
  };

  //once the search button is submitted, then
  //prevent the default value and
  //get the posts according to the search value in the query parameters
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:3000/posts?q=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
      console.log(data);
    } else {
      toast.error("something went wrong");
    }
  };

  // get the data using axios according to the category in the URL
  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:3000/posts?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
      console.log(response.data);
    } else {
      toast.error("something went wrong");
    }
  };
  //returns a search field with a search button
  // returns blogs by calling the BLOGS component
  // return the latest blogs in the column by calling the LATESTBLOG component.

  return (
    <>
      {/* to call the search function, to get the input field and handleSearch */}
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h1">
            No Blog Found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, index) => {
                  return (
                    //here we define the cards, how should it look like
                    // card image, card title, card body, delete and
                    //edit icons
                    <Blogs
                      key={index}
                      {...item}
                      excerpt={() => excerpt(item.description)} // to show only a piece of details and rest by clicking on read more
                      handleDelete={() => handleDelete(item.id)} // delete by passing the id in the URL
                    />
                  );
                })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start">Latest Post</h4>

          {/* to call the latest post function and return the latest blogs
           and passing the query parameter as start and end  */}
          {latestBlogData &&
            latestBlogData.map((item, index) => {
              return <LatestBlog key={index} {...item} />;
            })}

          {/* to handle the category by passing the option to it.
          To display the card list in a column on the Home page*/}
          <Category handleCategory={handleCategory} options={options} />
        </MDBCol>
      </MDBRow>
    </>
  );
}
