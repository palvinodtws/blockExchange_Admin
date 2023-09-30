import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "react-bootstrap";

export default function PrivacyPolicy() {
  const [heading1, setHeading1] = useState();
  const [heading2, setHeading2] = useState();
  const [heading3, setHeading3] = useState();
  const [heading4, setHeading4] = useState();
  const [heading5, setHeading5] = useState();
  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [description3, setDescription3] = useState();
  const [description4, setDescription4] = useState();
  const [point1, setPoint1] = useState();
  const [point2, setPoint2] = useState();
  const [point3, setPoint3] = useState();
  const [point4, setPoint4] = useState();
  const [point5, setPoint5] = useState();
  const [point6, setPoint6] = useState();
  const [point7, setPoint7] = useState();
  const [point8, setPoint8] = useState();

  const [policyData, setPolicyData] = useState();
  const [isLoading, setLoading] = useState(false);

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState();

  async function policyFn(data) {
    try {
      const res = await axios.post("/api/explore/policy", data);
      const response = res.data;
      console.log(response, "pikdj");
      toast.success("Updated Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update ! Please try again");
      console.log(error);
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: 1,
      heading1,
      heading2,
      heading3,
      heading4,
      heading5,
      description1,
      description2,
      description3,
      description4,
      point1,
      point2,
      point3,
      point4,
      point5,
      point6,
      point7,
      point8,
    };
    console.log(data, "data");
    policyFn(data);
  }

  // async function getPolicyFn() {
  //   try {
  //     const res = await axios.post("/api/explore/getPolicy");
  //     const response = res.data;
  //     console.log(response,"to get policy")
  //     setAboutData(response.data.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getPolicyFn();
  // }, []);

  async function getPolicies() {
    try {
      setOpen(true);
      let res = await axios.post("/api/explore/getPolicy");
      const response = res.data;
      console.log(
        response.data[0],
        "to get the response from api to get policies"
      );
      setOpen(false);
      setPolicyData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPolicies();
  }, []);

  return (
    <div className="new-dashboard">
      <SideBar />
      <ToastContainer />
      <section
        className="privacy-policy forself profile-sects"
        id="couple-profile-div"
      >
        <div className="couple-head-sec mb-4">
          <h4>PRIVACY POLICY</h4>
          <h2>
            <span> ORTHODOX MATRIMONIAL </span>
          </h2>
        </div>
        <form onSubmit={(e) => submitHandlerFn(e)}>
          <div className="container">
            <div className="terms-section">
              <input
                onChange={(e) => setHeading1(e.target.value)}
                // placeholder="Privacy Policy"
                defaultValue={policyData?.heading1}
              ></input>
            </div>

            <textarea
              onChange={(e) => setDescription1(e.target.value)}
              className="terms-textarea"
              maxLength={1200}
              placeholder="Description"
              defaultValue={policyData?.description1}
              rows={6}
            ></textarea>

            <div className="term-section mb-3">
              <input
                placeholder="Lorem ipsum dolor sit amet"
                type="text"
                onChange={(e) => setHeading2(e.target.value)}
                defaultValue={policyData?.heading2}
              ></input>
            </div>

            <ul>
              <li>
                <input
                  className="li-input"
                  type="text"
                  placeholder="Type Description"
                  onChange={(e) => setPoint1(e.target.value)}
                  defaultValue={policyData?.point1}
                ></input>{" "}
              </li>
              <li>
                <input
                  className="li-input"
                  onChange={(e) => setPoint2(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                  defaultValue={policyData?.point2}
                ></input>{" "}
              </li>

              <li>
                <input
                  className="li-input"
                  type="text"
                  onChange={(e) => setPoint3(e.target.value)}
                  placeholder="Type Description"
                  defaultValue={policyData?.point3}
                ></input>{" "}
              </li>

              <li>
                <input
                  className="li-input"
                  onChange={(e) => setPoint4(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                  defaultValue={policyData?.point4}
                ></input>{" "}
              </li>
              <li>
                <input
                  type="text"
                  className="li-input"
                  onChange={(e) => setPoint5(e.target.value)}
                  placeholder="Type Description"
                  defaultValue={policyData?.point5}
                ></input>{" "}
              </li>
              <li>
                <input
                  type="text"
                  className="li-input"
                  onChange={(e) => setPoint6(e.target.value)}
                  placeholder="Type Description"
                  defaultValue={policyData?.point6}
                ></input>{" "}
              </li>

              <li>
                <input
                  className="li-input"
                  onChange={(e) => setPoint7(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                  defaultValue={policyData?.point7}
                ></input>{" "}
              </li>
              <li>
                <input
                  className="li-input"
                  onChange={(e) => setPoint8(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                  defaultValue={policyData?.point8}
                ></input>{" "}
              </li>
            </ul>

            <div className="term-section">
              <input
                className="li-input"
                onChange={(e) => setHeading3(e.target.value)}
                placeholder="Dolor sit amet"
                type="text"
                defaultValue={policyData?.heading3}
              ></input>
            </div>

            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                cols="33"
                placeholder="Description"
                defaultValue={policyData?.description2}
                onChange={(e) => setDescription2(e.target.value)}
              ></textarea>
            </div>

            <div className="term-section">
              <input
                onChange={(e) => setHeading4(e.target.value)}
                placeholder="Suspendisse vitae enim tortor"
                type="text"
                defaultValue={policyData?.heading4}
              ></input>
            </div>
            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                onChange={(e) => setDescription3(e.target.value)}
                cols="33"
                placeholder="Description"
                defaultValue={policyData?.description3}
              ></textarea>
            </div>

            <div className="term-section">
              <input
                placeholder="Accusantium laboriosam nostrum"
                type="text"
                onChange={(e) => setHeading5(e.target.value)}
                defaultValue={policyData?.heading5}
              ></input>
            </div>
            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                onChange={(e) => setDescription4(e.target.value)}
                cols="33"
                placeholder="Description"
                defaultValue={policyData?.description4}
              ></textarea>
            </div>

            <div className="about-updateBtn" id="update-padding">
              <Button
                type="submit"
                className="btn upgrade-btn"
                disabled={isLoading}>
                {isLoading ? "Loading..." : "UPDATE"}
              </Button>
            </div>
          </div>
        </form>
      </section>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
