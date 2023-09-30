import React, { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Navbar = (props) => {
  console.log(props?.session?.user?.email,'prosp nav')
  
  const { data: session } = useSession();
  const [tokenData, setTokenData] = useState();
  const [added, setAdded] = useState()

  const router = useRouter();

 function getUserStatus() {
    try {
      let res = axios.post("/api/dashboard/adminDetails");
      const response = res.data;
      console.log(response.data.firstName,"navbar responcw")
      setTokenData(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
        if (session) {
      getUserStatus();
        }
  });

  // useEffect(() => {
  //   if (session) {
  //     getUserData();
  //   }
  // }, []);

  // function logoutHandler() {
  //   signOut("/login");
  //   router.push("/login");
  //   window.localStorage.clear();
  // }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg top-nav pt-0">
          <div className="container-fluid" id="fluid-set">
              {props?.session?.user?.email?(
              <div
                className="left-dashboard  first-set  mb-4"
                id="leftt-section"
              >
                {" "}
                <h5>Welcome - {props?.session?.user?.email == 1 ? "Adminstrator" : "Manager"}  </h5>
              </div>
            ) : null}
            {/* {session ? (
            <a className="navbar-brand" href="/" id="href-setts" >
              Welcome {tokenData?.firstName}
            </a>):null} */}
            <img style={{ marginLeft: "-10px" }} />
            {/* <button
              // onClick={() => setOpen(!open)}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <Collapse> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
