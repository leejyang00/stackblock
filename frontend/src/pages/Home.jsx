import { useEffect } from "react";

import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions, reset } from "../features/ask-question/questionSlice";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";
import QuestionList from "../components/Question/questionList";

const SESS_POS_QUES = "scroll-position-question";

const Home = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions); // isSuccess

  const [cookies, setCookie, removeCookie] = useCookies(["userCookie"]);

  

  useEffect(() => {
    dispatch(getAllQuestions());

    if (localStorage.getItem("user")) {
      console.log("hi");
      setCookie("userCookie", localStorage.getItem("user"));
    }

    // maintain scroll position
    setTimeout(() => {
      if (sessionStorage.getItem(SESS_POS_QUES)) {
        const questionId = sessionStorage.getItem(SESS_POS_QUES);
        const element = document?.getElementById(questionId);
        element.scrollIntoView({ behavior: "auto", block: "nearest" });
        sessionStorage.removeItem(SESS_POS_QUES);
      }
    }, 300);

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // store prev scroll position
  const maintainScrollPosition = (id) => {
    sessionStorage.setItem(SESS_POS_QUES, id);
  };

  return (
    <Layout>
      <header className="w-full bg-blue-100">
        <div className="min-w-11/12 lg:mx-auto mx-2 container h-16 flex justify-start items-center">
          <span className="font-bold text-2xl text-blue-800">Ethereum</span>
        </div>
      </header>
      <div className=" lg:max-w-5xl md:max-w-3xl flex-col justify-center items-center mb-8 md:p-16 py-10 px-5 container mx-auto">
        <div
          id="question-header"
          className="flex flex-row justify-between mb-6"
        >
          <h2 className="md:text-3xl text-xl mr-5">All Questions</h2>

          {localStorage.getItem("user") !== null && (
            <div className="flex justify-start items-start">
              <Link to="/ask-a-question">
                <button className="text-sm whitespace-nowrap mb-3 py-2 px-3 bg-blue-700 hover:bg-blue-600 border border-blue-300 duration-200 text-white rounded-sm font-semibold">
                  Ask Question
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* get actual number of questions */}
        <div>{questions.length} questions</div>

        <div id="divider" className="py-3 block">
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* loop though each question */}
        {questions.map((question, i) => (
          <QuestionList
            key={i}
            id={`question-${i}`}
            question={question}
            onSelect={maintainScrollPosition}
          />
        ))}
        {/* end */}
      </div>
    </Layout>
  );
};

export default Home;
