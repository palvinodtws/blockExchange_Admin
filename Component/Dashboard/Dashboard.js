import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";
import ReactPaginate from "react-paginate";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { getRouteRegex } from "next/dist/shared/lib/router/utils";
import { Router } from "next/router";

import { useRouter } from "next/router";


const NewDashboard = () => {
  const [collectiveData, setCollectiveData] = useState();
  const [adminDetail, setAdminDetail] = useState();
  const [userData, setUserData] = useState();
  const [added, setAdded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [oldData, setOldData] = useState([]);
  const [deleteIdValue, setDeleteIdValue] = useState();
  const [lenghtOfMatches, setLenghtOfMatches] = useState();
  const [deleteUser1,setDeleteUser]=useState();
  const router = useRouter();
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  async function getCollectiveData() {
    try {
      // setOpen(true)
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from localStorage");
      let res = await axios.post("/api/dashboard/dashboard", { token: token });
      const response = res.data;
      console.log(
        response,
        "to get the response from api on dashboard for collective data"
      );
      setCollectiveData(response.data);
      // setOpen(false)
    } catch (err) {
      console.log(err);
    }
  }

  async function getAdminDetails() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from localStorage");
      let res = await axios.post("/api/dashboard/adminDetails", {
        token: token,
      });
      const response = res.data;
      console.log(
        response,
        "to get the response from api on dashboard for admin details"
      );
      setAdminDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUsers() {
    try {
      // setOpen(true)
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response, "to get the response from api to get users");
      setOldData(response.data);
      setUserData(response.data);
      setLenghtOfMatches(response.data.length);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAdminDetails();
    getCollectiveData();
  }, [added]);
  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(data) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/users/deleteUsers", {data,token});
      const response = res.data;
      console.log(response, "delete user response");
      setDeleteUser(response);

      setAdded(added + 1);
      toast.success("Deleted Successfully");
      setIsLoading(true);
      document.getElementById("modal").classList.remove("show");

      // document.getElementsByClassName("modal-backdrop")[0].style.display="none"

      // document.getElementsByClassName("modal")[0].style.display="none"
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }
  useEffect(()=>{
    getUsers() 
  },[deleteUser1])
  async function deleteUserSubmitHandler(e) {
    console.log(e, "item value");
    const data = {
      userId: e,
    };
    deleteUser(data);
    setAdded(added + 1);
  }
  async function addUser() {
    console.log("llllllllllllll");
    router.push("/addUser/addUser");
  }
  async function serachFn(e) {
    console.log(e.target.value);
    const search = e.target.value;
    console.log(oldData, "old data here");
    const filteredData = oldData?.filter((item) => {
      const name = item?.name;
      return name?.toLowerCase().includes(search.toLowerCase());
    });
    setLenghtOfMatches(filteredData.length);

    console.log(filteredData, "to get the value of the filtered Data");
    const selected = 0;
    Pagination({ selected });
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const searchPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);
    console.log(searchPosts, "search post");

    setSearchData(searchPosts);

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
        {/* <div  className="left-dashboard  first-set  mb-4" id="leftt-section">
                {" "}
                <h5>Welcome -  {" "} {adminDetail?.firstName} </h5>
              </div> */}
        <div className="container">
          <div className="row">
            {/* <Navbar /> */}
            <form className="funds-sec">
              <h3 className="dummy-txts"> </h3>
              <ToastContainer />
              <div className="col-head mt-1 " id="col-head">
                <h6
                  className="dummy-txts mt-2 mb-4"
                  style={{ fontSize: "14px" }}
                >
                  {" "}
                </h6>
                {/* {collectiveData?.map((item, id) => {
                  return ( */}
                <div className="col-md-12 left-headSec">
                  <div
                    className="link-head  "
                    id="first-sec"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Link href="#">
                      <div
                        className="link-dashboard  first-set"
                        id="lr-section"
                      >
                        {" "}
                        <i
                          className="fa-sharp fa-solid fa-users "
                          id="dashboard-icons"
                        ></i>
                        <p className="dashboard-txts">
                          {userData?.length}
                        </p>
                        <h6 className="dashboard-txt"> TOTAL USERS</h6>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* )
                })} */}
              </div>

              <div className="left-dashboard  " id="lr-id">
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
                  <div className="Add-Button">
                    <Link href="/addUser/addUser" onClick={addUser}>
                      Add User
                    </Link>
                  </div>
                </div>

                <div className="table-secSet">
                  <table className="table funds-table mt-3" id="funds-color">
                    <thead>
                      <tr className="">
                        <th id="fuds" scope="col">
                          Sr. No.
                        </th>
                        <th id="fuds" scope="col">
                          Name
                        </th>
                        <th id="fuds" scope="col">
                          Email
                        </th>
                        <th id="fuds" scope="col"></th>
                        <th id="fuds" scope="col">
                          Role 
                        </th>
                        
                        <th id="fuds" scope="col"></th>
                        <th id="fuds" scope="col"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {searchData == null
                        ? currentPosts?.map((item, id) => {
                            return (
                              <>
                                <tr key={id}>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">{id + 1}</td>
                                  </Link>

                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.name}
                                    </td>
                                  </Link>

                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.emailId}
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account ">
                                    
                                    </td>
                                  </Link>

                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.roleName}
                                    </td>
                                  </Link>
                                  
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account ">
                                      
                                    </td>
                                  </Link>
                                  <td className="total-account  td-width">
                                    <Link href={"/editUsers/" + item.id}>
                                      <i
                                        className="bi bi-pencil-square td-icons"
                                        id="edit-btn"
                                      ></i>
                                    </Link>
                                    <i
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteModal"
                                      onClick={() => setDeleteIdValue(item?.id)}
                                      style={{ cursor: "pointer" }}
                                      className="bi bi-trash3 td-icons"
                                      id="pin-dark-icon"
                                    ></i>{" "}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        : searchData?.map((item, id) => {
                            return (
                              <>
                                <tr key={id}>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">{id + 1}</td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.name}
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.emailId}
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account ">
                                    
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account">
                                      {item.roleName}
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td className="total-account ">
                                      {item.country}
                                    </td>
                                  </Link>
                                  <Link href={"/userDetails/" + item.id}>
                                    <td
                                      className="total-account "
                                      id="right-textset"
                                    >

                                      {/* <button type="button" className="btn view-btn" id="approvePending-btn">
                                    View
                                  </button>
                                  <button type="button" className="btn view-btn" id="disapprove-btn">
                                    View
                                  </button> */}
                                    </td>
                                  </Link>

                                  <td className="total-account  td-width">
                                    <Link href={"/userDetails/" + item.id}>
                                      <i
                                        className="bi bi-pencil-square td-icons"
                                        id="edit-btn"
                                      ></i>
                                    </Link>
                                    <i
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteModal"
                                      onClick={() => setDeleteIdValue(item?.id)}
                                      style={{ cursor: "pointer" }}
                                      className="bi bi-trash3 td-icons"
                                      id="pin-dark-icon"
                                    ></i>{" "}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>

            {lenghtOfMatches <= 10 || lenghtOfMatches == null ? null : (
              <div className="paginate-sec">
                <ReactPaginate
                  previousLabel=" Previous"
                  nextLabel="Next "
                  onPageChange={Pagination}
                  pageCount={Math.ceil(userData?.length / postsPerPage)}
                  containerClassName="pagination"
                  previousLinkClassName="pagination__link"
                  nextLinkClassName="pagination__link"
                  disabledClassName="pagination__link--disabled"
                  activeClassName="pagination__link--active"
                  className="page-link"
                />
                {/* →
                ← */}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="deleteModl-content">
            <div className="modal-body">Are You Sure You Want to Delete</div>
            <div className="modal-footer">
              <button
                type="button"
                id="deleteBtn-Modal"
                value={deleteIdValue}
                data-bs-dismiss="modal"
                onClick={(e) => deleteUserSubmitHandler(e.target.value)}
                className="btn btn-primary"
              >
                Delete
              </button>
              <button
                type="button"
                id="cancelBtn-Modal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default NewDashboard;
