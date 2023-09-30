import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { signIn } from "next-auth/react";
import $ from "jquery";

const AddUser = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [verify, setVerify] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rollId,setRollId]=useState()
  const [roll,setRoll]=useState()
  const router = useRouter();
  
  
  async function formSubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (!email || !password || !name || !confPassword || !roll) {
        toast.error("Please Provide all the credentials");
        setErrorPassword(false);
        setErrorEmail(false);
        setIsLoading(false);
        setVerify(false);
        setPasswordError(false);
        return;
      }
      addUser()
     
      
    } catch (err) {
      console.log(err, "to check error");
    }

    if (!regularExpression.test(password)) {
      setIsLoading(false);
      setErrorPassword(false);
      setErrorEmail(false);
      setVerify(false);
      setPasswordError(true);
      return;
    }
  }

  async function addUser() {
   let data={
      name:name,
      emailId:email,
	    password:password,
      confirmPassword:confPassword,
      roleId:roll
    }
    console.log(data)

    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/addUser",{data,token});
      const response = res.data.data.data;
      console.log(response, "to get the response from api to get users");

      setIsLoading(false);
      toast.success("User Added successfully");
      router.push("/dashboard");
      // setUserData(response);
      // setOldData(response);
      // setLenghtOfMatches(response.length);
      // setOpen(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Failed to add user");
    }
  }

  async function getRoll(){
    const token = localStorage.getItem("token");
    try{
      let response= await axios.post("/api/getRoll/getRoll",{token})
      console.log(response.data.data.data,"hhhhhhhhhhhhhh");
      setRollId(response.data.data.data)
    }catch(err){
      console.log("something went wrong")
    }
    

  }
 useEffect(() => {
 
  getRoll()
   
 }, [])
 
 
 
 async function jQueryFunction() {
  $(document).ready(function() {
    $(".toggle-password").click(function() {
      $(this).toggleClass("bi bi-eye-slash-fill");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  });
}

async function jQueryFunctionConfirm() {
  $(document).ready(function() {
    $(".toggle-passwordConfirm").click(function() {
      $(this).toggleClass("bi bi-eye-slash-fill");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  });
}

useEffect(() => {
  jQueryFunction();
  jQueryFunctionConfirm()
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
              onSubmit={formSubmitHandler}
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-0">
                <div className="login-top-img1">
                  <h3 className="heading-text1 mt-3">Add User</h3>
                </div>
                
                <div className="input-item mt-0" id="input-mt">
                  <h6 className="item-text">Name</h6>
                  <input
                    className="textinput"
                    type="text"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                
                  />
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
                  <h6 className="item-text">EMAIL</h6>
                  <input
                    className="textinput"
                    type="email"
                    name="last-name"
                    onChange={(e) => setEmail(e.target.value)}
              
                  />
                </div>
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">PASSWORD</h6>
                  <input
                    className="textinput"
                    type="password"
                    name="last-name"
                    id="password-field"
                    onChange={(e) => setPassword(e.target.value)}
            
                  />
                 <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>

                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">CONFIRM PASSWORD</h6>
                  <input
                    className="textinput"
                    type="password"
                    name="last-name"
                    id="password-confirmField"
                    onChange={(e) => setConfPassword(e.target.value)}
                
                  />
                </div> 
                <span toggle="#password-confirmField"  className="fa fa-fw fa-eye confirmField-icon toggle-passwordConfirm"></span>
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">ROLE </h6>
                  {/* <select>
                    className="textinput"
                    type="password"
                    name="last-name"
                    id="password-field"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                  </select> */}
                  <div className="mb-3 booking-row">
                <select className="form-select" id="book-select" name="location" 
                // value={formInputs.location} 
                // onChange={handleChange}  
                onChange={(e) => setRoll(e.target.value)}
                >
                  <option >Select Role</option>
                  {rollId?.map((item) => {

                    return (
                      <option value={item.id}>{item?.roleName}</option>
                    )
                  })}

                </select>
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

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "15px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "   Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddUser;
