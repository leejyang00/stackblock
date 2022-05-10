import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
// import { passiveSupport } from "passive-events-support/src/utils";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

import ReactTagInput from "@pathofdev/react-tag-input";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "../Layout";
import Spinner from "../Spinner";
import TimeFormat from "../Common/TimeFormat";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import questionService from "../../features/ask-question/questionService.js";
import answerService from "../../features/ask-question/answerService";
import authService from "../../features/auth/authService";
import AnswerBody from "../Answer/answerBody";
import Months from "../Common/Months";

const QuestionProfile = () => {
  // passiveSupport({
  //   debug: false,
  //   events: ["touchstart", "touchmove", "touchend", "mousewheel"],
  //   listeners: [
  //     //document
  //     {
  //       element: "document",
  //       event: "touchstart",
  //     },
  //     {
  //       element: "document",
  //       event: "touchmove",
  //     },
  //     {
  //       element: "document",
  //       event: "mousewheel",
  //     },
  //     {
  //       element: "document",
  //       event: "touchend",
  //     },
  //     // div.tox.tox-tinymce
  //     {
  //       element: "div.tox.tox-tinymce",
  //       event: "touchstart",
  //     },
  //     {
  //       element: "div.tox.tox-tinymce",
  //       event: "touchmove",
  //     },
  //     {
  //       element: "div.tox.tox-tinymce",
  //       event: "touchend",
  //     },
  //     {
  //       element: "div.tox.tox-silver-sink.tox-tinymce-aux",
  //       event: "touchstart",
  //     },
  //     {
  //       element: "div.tox.tox-silver-sink.tox-tinymce-aux",
  //       event: "touchmove",
  //     },
  //     {
  //       element: "div.tox.tox-silver-sink.tox-tinymce-aux",
  //       event: "touchend",
  //     },
  //     {
  //       element: "div.root",
  //       event: "touchstart",
  //     },
  //     {
  //       element: "div.root",
  //       event: "touchmove",
  //     },
  //     {
  //       element: "div.root",
  //       event: "touchend",
  //     },
  //   ],
  // });

  const { questionID } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState(""); // answer to submit to MongoDB
  const [answers, setAnswers] = useState([]); // list of answers for this question
  const [questionUsername, setQuestionUsername] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    // fetch question data on first render or reload
    const fetchQuestionAndAnswer = async () => {
      const questionData = await questionService.getQuestion(questionID);
      const answersData = await answerService.getAllAnswers(questionID);
      const questionUsernameData = await authService.getUser(questionData.user);
      setData(questionData);
      setQuestionUsername(questionUsernameData.username);
      setAnswers(answersData);
      setDate(new Date(questionData.createdAt));
      setIsLoading(false);
    };

    try {
      fetchQuestionAndAnswer();
    } catch (e) {
      throw new Error(e);
    }
  }, [questionID]);

  const onEditorHandler = (content, _) => {
    setAnswer(content);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please sign in to post an answer");
    } else {
      const submitAnswerData = {
        user: user.username,
        userId: user._id,
        questionId: questionID,
        answerBody: answer,
      };

      const token = localStorage.getItem("token");
      const response = await answerService.submitAnswer(
        token,
        submitAnswerData
      );

      if (response) {
        window.location.reload(true);
        // console.log("SUCCESS");
      } else {
        throw new Error("Unable to submit answer from QuestionProfile");
      }
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="lg:w-8/12 md:w-9/12 sm:w-10/12 w-full box-border container mx-auto p-10">
          <div
            id="question-header"
            className="flex md:flex-row flex-col-reverse justify-between "
          >
            <h2 className="md:text-3xl text-xl mr-5">{data.title}</h2>
            <div className="flex justify-start items-start">
              <Link to="/ask-a-question">
                <button className="text-sm whitespace-nowrap mb-3 py-2 px-3 bg-blue-700 hover:bg-blue-600 border border-blue-300 duration-200 text-white rounded-sm font-semibold">
                  Ask Question
                </button>
              </Link>
            </div>
          </div>

          <div
            id="question-details"
            className="py-2 text-sm flex flex-row justify-start space-x-5"
          >
            <div
              id="question-details-created"
              className="flex flex-row flex-nowrap"
            >
              <span className="text-gray-500 mr-2">Asked</span>
              <TimeFormat
                dateCreated={data.createdAt}
                classProps="font-normal"
              />
            </div>
            <div>
              <span className="text-gray-500 mr-2">Modified</span>
              <TimeFormat
                dateCreated={data.updatedAt}
                classProps="font-normal"
              />
            </div>
          </div>

          <div id="divider" className="py-3 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* content body */}
          <div id="question-body" className="flex flex-row my-3">
            <div
              id="question-body-rating"
              className="flex flex-col mr-5 justify-start items-center space-y-1"
            >
              <button>
                {<BsCaretUpFill size={30} className="text-gray-400" />}
              </button>
              <div className="text-2xl text-gray-500 leading-4">
                {data.ratings}
              </div>
              <button>
                {<BsCaretDownFill size={30} className="text-gray-400" />}
              </button>
            </div>

            <div
              id="question-body-content"
              className="md:text-normal flex flex-col w-full"
            >
              <div>{parse(data.body)}</div>
              <div className="py-10">
                <ReactTagInput
                  tags={data.tags}
                  placeholder="Type and press enter"
                  maxTags={3}
                  editable={false}
                  readOnly={true}
                />
              </div>

              <div className="flex my-5">
                <div className="px-3 py-2 bg-blue-50 border text-xs flex flex-col rounded-sm">
                  <p className="text-gray-600 mb-1">
                    asked {Months[date.getMonth()]} {date.getDate()},{" "}
                    {date.getFullYear()} at {date.getHours()}:
                    {date.getMinutes() < 0
                      ? "0" + date.getMinutes()
                      : date.getMinutes()}{" "}
                  </p>
                  <span className="text-sm text-blue-600 font-normal">
                    <Link to={`/user/${data.user}`}>
                      {questionUsername}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {data.imageLinks.length > 0 && (
            <div className="flex flex-wrap space-y-10 my-5">
              {data.imageLinks.map((image, index) => (
                <img
                  className="h-72"
                  key={index}
                  src={image}
                  alt={`questionImage-${index}`}
                />
              ))}
            </div>
          )}

          {/* end */}

          {answers.length > 0 && (
            <div id="answer-header" className="mb-5">
              <div className="text-xl">
                {answers.length > 1 ? answers.length + " Answers" : "1 Answer"}
              </div>
            </div>
          )}

          {/* insert list of answers here */}
          {answers.map((answer, index) => (
            <AnswerBody key={index} answer={answer} />
          ))}
          {/* end */}

          {/* answer form */}
          <div id="your-answer">
            <div className="text-xl my-3">Your answer</div>
            <div className="my-3">
              <form onSubmit={onSubmitHandler}>
                <Editor
                  value={answer}
                  onEditorChange={onEditorHandler}
                  init={{
                    height: 200,
                    menubar: false,
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic | bullist numlist outdent indent | " +
                      "removeformat | help",
                  }}
                />

                <div className="py-3">
                  <button
                    type="submit"
                    className="m-2 px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 duration-200 rounded-sm text-sm font-semibold"
                  >
                    Post your question
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end */}
        </div>
      )}
    </Layout>
  );
};

export default QuestionProfile;
