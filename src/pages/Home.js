import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBTypography, MDBContainer } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [latestBlogData, setLatestBlogData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalBlog, setTotalBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(5);

  const options = ["Fitness", "Sports", "Food", "Gardening"];
  const location = useLocation();

  //During the first load of the page, load all the data and fetch the latest blog
  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase, operation) => {
    const AllBlogs = await axios.get("http://localhost:5000/posts");
    //console.log(AllBlogs.data);
    setTotalBlog(AllBlogs.data.length);
    const response = await axios.get(
      `http://localhost:5000/posts`
      //`http://localhost:5000/posts?_start=${start}&_end=${end}`
    );

    if (response.status === 200) {
      setData(response.data);
      if (operation) {
        setCurrentPage(0);
      } else {
        console.log(currentPage);
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Data has not fetched");
    }
  };
  console.log(data);

  //To fetch the latest blog data, get the total length of the blogs
  // and set the start and end in the url to get the last 4 blogs.
  const fetchLatestBlog = async () => {
    const AllBlogs = await axios.get("http://localhost:5000/posts");
    //setTotalBlog(AllBlogs.data.length);
    const start = AllBlogs.data.length - 4;
    const end = AllBlogs.data.length;

    console.log("start and end" + start, end);
    console.log(location);

    // again getting the blogs using the start and end query in the URL
    const response = await axios.get(
      `http://localhost:5000/posts?_start=${start}&_end=${end}`
    );
    console.log(response);

    if (response.status === 200) {
      setLatestBlogData(response.data);
    } else {
      toast.error("Data has not fetched");
    }
  };
  //console.log(latestBlogData);
  // when the trash icon is clicked, delete by axios passing the _id in the URL
  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure to delete???")) {
      const response = await axios.delete(`http://localhost:5000/posts/${_id}`);
      if (response.status === 200) {
        toast.success("Deleted successfully");
        loadBlogsData(0, 5, 0, "delete");
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
      loadBlogsData(0, 5, 0); //no search value given, load all data
      setSearchValue("");
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
      `http://localhost:5000/posts?q=${searchValue}`
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
      `http://localhost:5000/posts/?category=${category}`
    );
    console.log(response.data);
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
                      handleDelete={() => handleDelete(item._id)} // delete by passing the _id in the URL
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
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          pageLimit={pageLimit}
          loadBlogsData={loadBlogsData}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
}
