import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useRouter } from "next/router";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';





const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [oldData, setOldData] = useState([]);
  const [profile, setProfile] = useState();
  const [fromDate, setFromDate] = useState();
  const [oldDate, setOldDate] = useState();
  const [added, setAdded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemValue, setItemValue] = useState();
  const [show, setShow] = useState(false);
  const [nothing, setNothing] = useState("Status");
  const [deleteIdValue, setDeleteIdValue] = useState();
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
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response.data, "to get the response from api to get users");
      setUsers(response.data);
      setOldDate(response.data);
      setLenghtOfMatches(response.data.length)
      setOpen(false)

      if (
        response.data.adminApproved1 == 1 &&
        response.data.adminApproved2 == 0
      ) {
        setNothing("Approved by Sub Admin.. Pending by Admin End");
      } else if (
        response.data.adminApproved1 == 0 &&
        response.data.adminApproved2 == 1
      ) {
        // setAdminOneDisable(true)
        setNothing("Approved by Admin.. Pending by Sub-Admin End");
      } else if (
        response.data.adminApproved1 == 1 &&
        response.data.adminApproved2 == 1
      ) {
        setNothing(" Approved");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, [added]);

  async function serachFn(e) {
    console.log(e.target.value);
    const search = e.target.value;
    console.log(oldData, "old data here");
    const filteredData = oldDate?.filter((item) => {
      const name = item?.name;
      return name?.toLowerCase().includes(search.toLowerCase());
    });

    setLenghtOfMatches(filteredData.length)


    console.log(filteredData, "to get the value of the filtered Data");
    const selected = 0;
    Pagination({ selected });
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const searchPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);
    console.log(searchPosts, "search post");

    setSearchData(searchPosts);

    if (search == "") {
      setUsers(users);
    } else {
      setSearchData(searchPosts);
    }
    // setUsers(searchData)
  }

  async function setDateFunction(e) {
    try {
      const zeroData = e[0]?.$d;
      const firstData = e[1]?.$d;
      const filteredDate = oldDate?.filter((item) => {
        const dateData = new Date(item?.createdAt).toLocaleDateString();

        return (
          dateData >= new Date(zeroData).toLocaleDateString() &&
          dateData <= new Date(firstData).toLocaleDateString()
        );
      });
      setUsers(filteredDate);
      setLenghtOfMatches(filteredDate.length)


      if (filteredDate == []) {
        setUsers(users);
        setLenghtOfMatches(users.length)
      } else {
        setUsers(filteredDate);
      }

 
    } catch (err) {
      console.log(err);
      setUsers(oldDate);
      setLenghtOfMatches(users)

    }
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);

  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setUsers(users);
  };

  async function deleteUser(data) {
    try {
      const res = await axios.post("/api/users/deleteUsers", data);
      const response = res.data;
      console.log(response, "delete user response");
      setAdded(added + 1);
      toast.success("Deleted Successfully");
      setIsLoading(true);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  async function deleteUserSubmitHandler(e) {
    console.log(e, "item value");
    const data = {
      id: e,
    };
    deleteUser(data);
    setAdded(added + 1);
  }

  return (
    <>
      <div className="new-dashboard">
        <SideBar />
        <ToastContainer />
        <section
          className="profile-sec  profile-sects pt-0 mt-0"
          id="totalUserProfileSec"
        >
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="Cards-head mt-0"> */}

              <div className="left-dashboard mt-0 " id="lr-id">
                <div
                  className="rapper-between mb-4 mt-3"
                  id="token-form-padding"
                >
                  <h5 className="heading-text pink-text ">ALL PROFILES</h5>
                  <h5 className="hide-text">1</h5>
                </div>

                <div className="search-bar-sec pt-0" id="pt-resp-totalusers">
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

                  <div className="rangePicker-Div">
                    <RangePicker onChange={(e) => setDateFunction(e)} />
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
                        Gender
                      </th>
                      <th id="fuds" scope="col">
                        Age
                      </th>
                      <th id="fuds" scope="col">
                        Country
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
                              <tr className="tbody-tr">
                                <Link href={"/userDetails/" + item.id}>
                                  <td
                                    className="total-account"
                                    id="td-paddingResp"
                                  >
                                    {id + 1}
                                  </td>
                                </Link>
                                <Link href={"/userDetails/" + item.id}>
                                  <td className="total-account">{item.name}</td>
                                </Link>
                                <Link href={"/userDetails/" + item.id}>
                                  <td className="total-account">
                                    {item.gender}
                                  </td>
                                </Link>
                                <Link href={"/userDetails/" + item.id}>
                                  <td className="total-account">{item.age}</td>
                                </Link>
                                <Link href={"/userDetails/" + item.id}>
                                  <td className="total-account">
                                    {item.country}
                                  </td>
                                </Link>

                                <td
                                  className="total-account "
                                  id="right-textset"
                                >
                                 {item?.adminApproved1 == 1 &&
                    item?.adminApproved2 == 1 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approve-btn"
                      >
                        Approved
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 1 &&
                    item?.adminApproved2 == 0 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending At Manager
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 0 &&
                    item?.adminApproved2 == 1 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending At Adminstrator
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 0 &&
                    item?.adminApproved2 == 0 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending by adminstrator
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 2 ||
                    item?.adminApproved2 == 2 ||
                    (item?.adminApproved1 == 2 &&
                      item?.adminApproved2 == 0) ||
                    (item?.adminApproved1 == 0 &&
                      item?.adminApproved2 == 2) ||
                    (item?.adminApproved1 == 1 &&
                      item?.adminApproved2 == 2) ||
                    (item?.adminApproved1 == 2 &&
                      item?.adminApproved2 == 1) ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="disapprove-btn"
                      >
                        Disapproved
                      </button>
                    ) : null}

                                  {/* <button type="button" className="btn view-btn" id="approvePending-btn">
                                    View
                                  </button>
                                  <button type="button" className="btn view-btn" id="disapprove-btn">
                                    View
                                  </button> */}
                                </td>

                                {/* <td
                                  className="total-account td-width"
                                  id="right-textset"
                                >
                                  <Link href={"/editDetails/" + item.id}>
                                    <i
                                      className="bi bi-pencil-square td-icons"
                                      id="edit-btn"
                                    ></i>
                                  </Link>
                                </td> */}
                                       {/* <td
                                  className="total-account td-width"
                                  id="right-textset"
                                ></td> */}

                                <td
                                  className="total-account  td-width"
                         
                                >
                                           <Link href={"/editDetails/" + item.id}>
                                    <i
                                      className="bi bi-pencil-square td-icons"
                                      id="edit-btn"
                                    ></i>
                                  </Link>
                                  <i
                                           onClick={() => setDeleteIdValue(item?.id)}
                                           data-bs-toggle="import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';"
                                           data-bs-target="#deleteimport Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';"
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
                              <tr>
                              <Link href={"/userDetails/" + item.id}>

                                <td className="total-account">{id + 1}</td></Link>
                                <Link href={"/userDetails/" + item.id}>

                                <td className="total-account">{item.name}</td></Link>
                                <Link href={"/userDetails/" + item.id}>
                                <td className="total-account">{item.gender}</td></Link>
                                <Link href={"/userDetails/" + item.id}>

                                <td className="total-account">{item.age}</td></Link>
                                <Link href={"/userDetails/" + item.id}>
                                <td className="total-account">
                                  {item.country}
                                </td></Link>

                                <Link href={"/userDetails/" + item.id}>

                                <td
                                  className="total-account "
                                  id="right-textset"
                                >
                                 {item?.adminApproved1 == 1 &&
                    item?.adminApproved2 == 1 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approve-btn"
                      >
                        Approved
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 1 &&
                    item?.adminApproved2 == 0 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending At Manager
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 0 &&
                    item?.adminApproved2 == 1 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending At Adminstrator
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 0 &&
                    item?.adminApproved2 == 0 ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="approvePending-btn"
                      >
                        Pending by adminstrator
                      </button>
                    ) : null}

                    {item?.adminApproved1 == 2 ||
                    item?.adminApproved2 == 2 ||
                    (item?.adminApproved1 == 2 &&
                      item?.adminApproved2 == 0) ||
                    (item?.adminApproved1 == 0 &&
                      item?.adminApproved2 == 2) ||
                    (item?.adminApproved1 == 1 &&
                      item?.adminApproved2 == 2) ||
                    (item?.adminApproved1 == 2 &&
                      item?.adminApproved2 == 1) ? (
                      <button
                        type="button"
                        className="btn view-btn"
                        id="disapprove-btn"
                      >
                        Disapproved
                      </button>
                    ) : null}

                                  {/* <button type="button" className="btn view-btn" id="approvePending-btn">
                                    View
                                  </button>
                                  <button type="button" className="btn view-btn" id="disapprove-btn">
                                    View
                                  </button> */}
                                </td>
                                </Link>

                                {/* <td
                                  className="total-account td-width"
                                  id="right-textset"
                                >
                                  <Link href={"/editDetails/" + item.id}>
                                    <i
                                      className="bi bi-pencil-square td-icons"
                                      id="edit-btn"
                                    ></i>
                                  </Link>
                                </td> */}

                                <td
                                  className="total-account  td-width"
                               
                                >
                                           <Link href={"/editDetails/" + item.id}>
                                    <i
                                
                                      className="bi bi-pencil-square td-icons"
                                      id="edit-btn"
                                    ></i>
                                  </Link>

                                  <i
                                         onClick={() => setDeleteIdValue(item?.id)}
                                         data-bs-toggle="modal"
                                         data-bs-target="#deleteModal"
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

              {/* </div> */}



        

{lenghtOfMatches <= 10 || lenghtOfMatches == null ? null : (
              <div className="paginate-sec">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={Pagination}
                  pageCount={Math.ceil(users?.length / postsPerPage)}
                  containerClassName="pagination"
                  previousLinkClassName="pagination__link"
                  nextLinkClassName="pagination__link"
                  disabledClassName="pagination__link--disabled"
                  activeClassName="pagination_link--active"
                  className="page-link"
                />
              </div>
              )}

            </div>
          </div>
        </section>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="deleteModl-content">
              <div class="modal-body">Are You Sure You Want to Delete</div>
              <div class="modal-footer">
                <button
                  type="button"
                  id="deleteBtn-Modal"
                  value={deleteIdValue}
                  data-bs-dismiss="modal"
                  onClick={(e) => deleteUserSubmitHandler(e.target.value)}
                  class="btn btn-primary"
                >
                  Delete
                </button>
                <button
                  type="button"
                  id="cancelBtn-Modal"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TotalUsers;
