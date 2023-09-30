import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { signIn } from "next-auth/react";
import $ from "jquery";

const UserDetails = (props) => {
  
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [verify, setVerify] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rollId,setRollId]=useState()
  const [roll,setRoll]=useState()
  const [userData,setUserData]=useState()
  const router = useRouter();0
  
  console.log(props?.props.id,"hhhhhhhhhhhh")
  
  async function getUserById() {
    try {
      const data={
        userId:props?.props.id
      }
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsersById",{data,token});
      const response = res.data.data;
      console.log(response, "to get the response from api to get users");
      setUserData(response[0])
      setIsLoading(false);
     
      // setUserData(response);
      // setOldData(response);
      // setLenghtOfMatches(response.length);
      // setOpen(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  
 useEffect(() => {
 
  
  getUserById()
 }, [])
 
 
  async function jQueryFunction() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-splash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  useEffect(() => {
    jQueryFunction();
  }, []);

  return (
    <div style={{ fontFamily: "Bookman old Style !important" }}>
      <section className="profile-sec " id="login-profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <ToastContainer />
            <form
              className="input-sec input-top p-0"
              id="bar-top"
        
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-0">
              <h3 className="heading-text mt-3">User Details</h3>
             
             
                
                <div className="detail-cls433">
                <div className="input-item mt-0" id="input-mt">
                  <h4 className="item-text">NAME: {userData?.name}</h4>
                  <h4 className="item-text"></h4>

                  
                </div>

                {/* <div className="form-group">
                  <label className="col-md-4 control-label">Password</label>
                  <div className="col-md-6">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      name="password"
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                </div> */}
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">EMAIL: {userData?.emailId}</h6>
                  <h4 className="item-text"></h4>
                </div>
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">ROLE : {userData?.roleName}</h6>
                  <h4 className="item-text"></h4>
                  
                </div> 
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">ROLE ID: {userData?.roleId}</h6>
                  <h4 className="item-text"></h4>
                  
                </div> 
                </div>
               

                <div
                  style={{
                    color: "black",
                    marginBottom: "35px",
                    textAlign: "left",
                    fontSize: "14px",
                  }}
                >
                  
                </div>

                {/* <div className="forget-div">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      required
                    />
                    <label className="logged-lable" htmlFor="flexCheckDefault">
                      Default Checkbox
                    </label>
                  </div>

                  {/* <p className="forget-text">Forget password?</p>
                </div> */}

                {errorEmail && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User doesn't Exist. Please try again!
                  </p>
                )}
                {errorPassword && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    Invalid Password
                  </p>
                )}
                {verify && (
                  <p style={{ color: "green", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User Added Successfully.{" "}
                  </p>
                )}
                {passwordError && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    Your password must be at least 8 characters long, should
                    contain at least one number and special character have a
                    mixture of uppercase and lowercase letters.{" "}
                  </p>
                )}

               
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetails;
