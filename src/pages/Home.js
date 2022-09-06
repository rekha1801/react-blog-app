import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBTypography, MDBContainer } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

export default function Home() {
  const [data, setData] = useState([]);
  const [latestBlogData, setLatestBlogData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5);

  const options = ["Fitness", "Sports", "Food"];

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase) => {
    const response = await axios.get(
      `http://localhost:3000/posts?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      setCurrentPage(currentPage + increase);
    } else {
      toast.error("Data has not fetched");
    }
  };
  //console.log(data);
  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get(" http://localhost:3000/posts");
    setTotalBlog(totalBlog.data.length);
    const start = totalBlog.data.length - 4;

    const end = totalBlog.data.length;
    const response = await axios.get(
      `http://localhost:3000/posts?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlogData(response.data);
    } else {
      toast.error("Data has not fetched");
    }
  };

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

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };
  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData();
    } else {
      setSearchValue(e.target.value);
    }
  };
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
  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blog Found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, index) => {
                  return (
                    <Blogs
                      key={index}
                      {...item}
                      excerpt={() => excerpt(item.description)}
                      handleDelete={() => handleDelete(item.id)}
                    />
                  );
                })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start">Latest Post</h4>
          {latestBlogData &&
            latestBlogData.map((item, index) => {
              return <LatestBlog key={index} {...item} />;
            })}
          <Category handleCategory={handleCategory} options={options} />
        </MDBCol>
      </MDBRow>
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
}
