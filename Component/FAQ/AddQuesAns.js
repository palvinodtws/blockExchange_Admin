import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { ajaxPrefilter } from "jquery";
import { Button } from "react-bootstrap";
import { Router, useRouter } from "next/router";

const AddQuesAns = (props) => {
  console.log(
    props,
    "to check whether props are working or not to add quesion and answer"
  );
  const [addQuestion, setAddQuestion] = useState();
  const [addAnswer, setAddAnswer] = useState();
   const [isLoading, setIsLoading] = useState(false);

const router = useRouter()
  
async function addQuestionFn(Quesdata) {
  try {
    let res = await axios.post("/api/faq/addQues", Quesdata);
    const response = res.data;
    console.log(response, "to get response from api to add Question");
    setTimeout(()=>{
      router.push("/faqQuesAns/" + props.props.id)
      setIsLoading(true)
 },[1000])
   
    // let res1 = await axios.post("/api/faq/addAns", ansData)
    // const response1 = res1.data;
    // console.log(response1,"to get response from api to add answer")
  } catch (err) {
    console.log(err);
        setIsLoading(false)

  }
}

async function formSubmitHandler() {
  const Quesdata = {
    id: props.props.id,
    question: addQuestion,
    answer: addAnswer,
  };
  console.log(Quesdata, "questin added by the user");
  addQuestionFn(Quesdata);
}
  return (
    <div className="new-dashboard">
      <section className="question profile-sec profile-sects pt-4">
        <SideBar />
        <div className="container">
          <div className="question-head">
            <h5 class="heading-text pink-text ">   ADD QUESTIONS</h5>
            <h5 class="hide-text">1</h5>
          </div>

          <div className="question-main">
            <div className="questionaccordian">
              <div>
                <>
                  <div>
                    <input
                      type="text"
                      className="ques-inputset form-control"
                      placeholder="Enter Question"
                      onChange={(e) => setAddQuestion(e.target.value)}
                    />

                    <div className="accordion-collapse ">
                      <textarea
                        className="w-100 ques-textarea form-control"
                        rows={8}
                        cols={8}
                        type="text"
                        maxLength="500"
                        placeholder="Enter Answer"
                        onChange={(e) => setAddAnswer(e.target.value)}
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
                  
     <Button
                            className="button sub-admin-btn"
                            type="submit"
                              disabled={isLoading}
                                  onClick={() => {
                          formSubmitHandler();
                        }}

                >
                  {isLoading ? "Loading…" : " Add"}
                </Button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddQuesAns;
