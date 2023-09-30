import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { signIn } from "next-auth/react";
import $ from "jquery";

const UserDetailsEdit = (props) => {
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
  const [userData,setUserData]=useState()
  const [roleData,setrollData]=useState()
  const [roleData1,setRoleData1]=useState();
  const router = useRouter();
  console.log(props,"nnnnnnnnnn")
  
  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log(event)
    setIsLoading(true);
    try {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (!email || !name) {
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
      id:props?.props.id,
      name:name,
      emailId:email,
      roleId:roll
    }
    console.log(data)

    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/updateUserDetails",{data,token});
      const response = res.data.data.data;
      console.log(response, "to get the response from api to get users");

      setIsLoading(false);
      toast.success("User Updated Successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
     
      // setUserData(response);
      // setOldData(response);
      // setLenghtOfMatches(response.length);
      // setOpen(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  async function getRoll(){
    const token = localStorage.getItem("token");
    try{
      let response= await axios.post("/api/getRoll/getRoll",{token})
      console.log(response.data.data.data,"hhhhhhhhhhhhhh");
      const data=response.data.data.data;
      
      setRollId(data)
    }catch(err){
      console.log("something went wrong")
    }
    

  }
  async function getUserById() {
    try {
      const data={
        userId:props?.props.id
      }
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsersById",{data,token});
      const response = res.data.data;
      console.log(response, "to get the response from api to get users");
      setUserData(response)
      setName(response?.name)
      setEmail(response?.emailId)
      setRoll(response?.roleId)
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
  getRoll()
  
  getUserById()
 }, [])
 useEffect(() => {
 const data= rollId?.filter((item)=>{
   if(item?.id==userData?.roleId){
    setrollData(item)
   }else {
    return item
   }

  })
  setRoleData1(data)
  console.log(data,"nnnnnnnnn")
 }, [rollId,userData])
 
 
 
 console.log(roleData1,);
 
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
              onSubmit={formSubmitHandler}
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-0">
                <div className="login-top-img1">
                  <h3 className="heading-text1 mt-3">Edit User</h3>
                </div>
                
                <div className="input-item mt-0" id="input-mt">
                  <h6 className="item-text">NAME</h6>
                  <input
                    className="textinput"
                    type="text"
                    name="username"
                    defaultValue={userData?.name}
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
                    id="password-field"
                    defaultValue={userData?.emailId}
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
                
               
                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">ROLL </h6>
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
                  {roleData?
                  <option value={roleData?.id}>{roleData?.roleName}</option>:
                  <option value={0}>Select Role</option>}
                  {roleData1?.map((item) => {

                    return (
                      <option value={item?.id}>{item?.roleName}</option>
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
               

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "15px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "   Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetailsEdit;
