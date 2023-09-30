import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const FaqQuesAns = (props) => {
  console.log(props, "to check whether props are working or not");
  const [ques, setQues] = useState();

  const useStyles = makeStyles((theme)=>({
    backdrop:{
      zIndex: theme.zIndex.drawer +1,
      color:"#fff"
    }
  }))
  const classes = useStyles()
  const  [open, setOpen]= useState()


  async function getQuesAns() {
    try {
      setOpen(true)
      let res = await axios.post("/api/faq/getFaqQuesAns", {
        id: props.props.id,
      });
      const response = res.data;
      console.log(
        response.data.data,
        "to get response from api to get ques ans"
      );
      setOpen(false)
      setQues(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getQuesAns();
  }, []);
  return (
    <div className="new-dashboard">
      <section className="question profile-sec profile-sects pt-4">
        <SideBar />
        <div className="container">
          <div className="question-head">
          <h5 class="heading-text pink-text ">   ALL QUESTIONS</h5>
            <h5 class="hide-text">1</h5>
  
          </div>
          <div className="question-main">
            <div className="questionaccordian">
              <div className="accordion" id="accordionExample">
                {ques?.map((item, idx) => {
                  return (
                    <>
                      <div key={idx} className="accordion-item">
                        <h2 className="accordion-header" id={`heading${idx}`}>
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${idx}`}
                            aria-expanded="true"
                            aria-controls={`collapse${idx}`}
                          >
                            {item.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${idx}`}
                          className="accordion-collapse collapse "
                          aria-labelledby={`heading${idx}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <span>
                              <p>{item.answer}</p>
                            </span>
                          </div>
                          <div
                            style={{
                              float: "right",
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Link href={"/updateQuesAns/" + item?.id}>
                            <button
                              className="button sub-admin-btn"
                              type="button"
                            >
                              Update{" "}
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit"/>
      </Backdrop>
     </div>
  );
};

export default FaqQuesAns;
