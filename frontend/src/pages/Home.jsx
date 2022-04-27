import { useEffect } from "react";

import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions, reset } from "../features/ask-question/questionSlice";

import { Link } from "react-router-dom";
import QuestionList from "../components/Question/questionList";

const Home = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getAllQuestions());

    return () => {
      dispatch(reset())
    }
  }, [dispatch]);

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
          <div className="flex justify-start items-start">
            <Link to="/ask-a-question">
              <button className="text-sm whitespace-nowrap mb-3 py-2 px-3 bg-blue-700 hover:bg-blue-600 border border-blue-300 duration-200 text-white rounded-sm font-semibold">
                Ask Question
              </button>
            </Link>
          </div>
        </div>

        <div>2,300 questions</div>

        <div id="divider" className="py-3 block">
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* loop though each question */}
        {questions.map((question, index) => (
          <QuestionList key={index} question={question} />
        ))}
        {/* end */}
      </div>
    </Layout>
  );
};

export default Home;
