import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const UpdateQuesAns = (props) => {
  // console.log(props, "to check whether props are working or not");
  const [answerDetail, setAnswerDetail] = useState();
  const [questionDetail, setQuestionDetail] = useState();
  const [data, setData] = useState();
  const [added, setAdded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const useStyles = makeStyles((theme)=>({
    backdrop:{
      zIndex: theme.zIndex.drawer+1,
      color:"#fff"
    }
    }))
    
    const classes = useStyles()
    const [open, setOpen] = useState()


  const router = useRouter();
  async function getUpdateQuesAns() {
    try {
      setOpen(true)
      let res = await axios.post("/api/faq/getQuesById", {
        id: props.props.id,
      });
      const response = res.data;
      console.log(
        response.data.data,
        "to get response from api to get ques ans"
      );
      setOpen(false)
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(questionDetail, "question detail data here for you");

  useEffect(() => {
    getUpdateQuesAns();
  }, [added]);

  async function updateQuesAns(data) {
    try {
      let res = await axios.post("/api/faq/updateQuesAns", data);
      const response = res.data;
      console.log(response, "to get response from api");
      toast.success("Details updated Successfully");
      setIsLoading(true)
      setTimeout(() => {
        router.push("/faqQuesAns/" + props.props.id);
      }, 1000);
      setAdded(added + 1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update details");
      setIsLoading(false)

    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log(props.props.id, "to get the id of the question");

    const data = {
      id: props.props.id,
      question: questionDetail,
      answer: answerDetail,
    };
    console.log(data, "data entered to update question and answer");
    updateQuesAns(data);
  }

  return (
    <div className="new-dashboard">
      <ToastContainer />
      <section className="question profile-sec profile-sects pt-4">
        <SideBar />
        <div className="container">
          <div className="question-head">
          <h5 class="heading-text pink-text ">   UPDATE QUESTIONS</h5>
            <h5 class="hide-text">1</h5>
          </div>
          {data?.map((item, id) => {
            return (
              <div className="question-main">
                <div className="questionaccordian">
                  <div>
                    <>
                      <div>
                        <input
                          type="text"
                          className="ques-inputset"
                          defaultValue={item?.question}
                          onChange={(e) => setQuestionDetail(e.target.value)}
                        />

                        <div className="accordion-collapse ">
                          <textarea
                            className="w-100 ques-textarea"
                            rows={8}
                            cols={8}
                            type="text"
                            maxLength="500"
                            defaultValue={item?.answer}
                            onChange={(e) => setAnswerDetail(e.target.value)}
                          ></textarea>
                        </div>
                        <div
                          style={{
                            float: "right",
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* <button
                            className="button sub-admin-btn"
                            type="button"
                            onClick={formSubmitHandler}
                          >
                            Update{" "}
                          </button> */}
                          <Button
                            className="button sub-admin-btn"
                            type="submit"
                              disabled={isLoading}
                             onClick={formSubmitHandler}

                >
                  {isLoading ? "Loading…" : " Update"}
                </Button>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  );
};

export default UpdateQuesAns;
