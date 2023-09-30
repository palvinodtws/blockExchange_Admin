import Link from "next/link";
import React, { useEffect, useState, useRouter } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";
import ReactPaginate from "react-paginate";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';




const DisaproveProfile = () => {
  const [userData, setUserData] = useState();
  const [oldData, setOldData] = useState();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
    const [lenghtOfMatches,setLenghtOfMatches] = useState()


    const useStyles = makeStyles((theme) => ({
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    }));
    const classes = useStyles();
  
    const [open, setOpen] = useState(false);
  
  

  async function getUsers() {
    try {
      setOpen(true)
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/approve/getDisapprovedProfile", {
        token: token,
      });
      const response = res.data;
      console.log(response, "to get the response from api to get disapproved Profiles");
      setOpen(false)
      setUserData(response.data.data);
      setOldData(response.data.data);
      setLenghtOfMatches(response.data.data.data.length)

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);


  async function serachFn(e) {
    console.log(e.target.value);
    const search = e.target.value;
    console.log(oldData, "old data here");
    const filteredData = oldData?.filter((item) => {
      const name = item?.name;
      return name?.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filteredData, "to get the value of the filtered Data");
    const selected = 0;
    Pagination({ selected });
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const searchPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);
    console.log(searchPosts, "search post");

    setSearchData(searchPosts);
    setLenghtOfMatches(filteredData.length)
    if (search == "") {
      setUserData(userData);
    } else {
      setSearchData(searchPosts);
    }
    // setUsers(searchData)
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = userData?.slice(indexOfFirstPost, indexOfLastPost);
  



  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setUserData(userData);
  };




 
  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects pt-0">
        <div className="container">
          <div className="row">
            {/* <Navbar /> */}

            <form className="funds-sec">
              <h3 className="dummy-txts"> </h3>

              <ToastContainer />

              <div className="left-dashboard mt-0 " id="lr-id">
                <div
                  className="rapper-between mb-4 mt-3"
                  id="token-form-padding"
                >
                  <h5 className="heading-text pink-text ">
                    DISAPPROVED PROFILES
                  </h5>
                  <h5 className="hide-text">1</h5>
                </div>


                <div className="search-bar-sec" id="pt-resp-totalusers">
                  <div className="input-group mb-1" id="search-bar-set">
                    <input
                      type="text"
                      style={{ paddingLeft: "0px" }}
                      className="input-group-text "
                      placeholder="Search"
                      onChange={(e) => serachFn(e)}
                      id="search-bg-set"
                    />
                    <span className="form-control ">
                      <i className="bi bi-search" id="search-iColor"></i>
                    </span>
                  </div>
                </div>

<div className="table-secSet">
                <table className="table funds-table mt-3" id="funds-color">
                  <thead>
                    <tr >
                      <th id="fuds" scope="col">
                        Sr. No.
                      </th>
                      <th id="fuds" scope="col">
                        Name
                      </th>
                      <th id="fuds" scope="col">
                        Gender
                      </th>
                      <th id="fuds" scope="col">
                        Age
                      </th>
                      <th id="fuds" scope="col">
                        Country
                      </th>
                      {/* <th id="fuds" scope="col">
                        Status
                      </th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {searchData == null?
                    currentPosts?.map((item, id) => {
                      return (
                        <tr>
                          <td className="total-account">{id + 1}</td>
                          <td className="total-account">{item.name}</td>
                          <td className="total-account">{item.gender}</td>
                          <td className="total-account">{item.age}</td>
                          <td className="total-account ">{item.country}</td> 
                        </tr>
                      );
                    }):searchData?.map((item, id)=>{
                      return(
                      <tr>
                      <td className="total-account">{id + 1}</td>
                      <td className="total-account">{item.name}</td>
                      <td className="total-account">{item.gender}</td>
                      <td className="total-account">{item.age}</td>
                      <td className="total-account right-textset">{item.country}</td> 
                    </tr>
                    );
                    })
                  }
                  </tbody>
                </table></div>
              </div>
            </form>

{lenghtOfMatches <= 10 || lenghtOfMatches == null ? null : (

            <div className="paginate-sec">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={Pagination}
                  pageCount={Math.ceil(userData?.length / postsPerPage)}
                  containerClassName="pagination"
                  previousLinkClassName="pagination__link"
                  nextLinkClassName="pagination__link"
                  disabledClassName="pagination__link--disabled"
                  activeClassName="pagination__link--active"
                  className="page-link"
                />
              </div>
                 )}
          </div>
        </div>
      </section>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default DisaproveProfile;
