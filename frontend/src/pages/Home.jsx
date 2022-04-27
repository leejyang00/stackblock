import { useEffect } from "react";

import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions, reset } from "../features/ask-question/questionSlice";

import { Link } from "react-router-dom";

const Tags = ["wallets", "truffle", "contract-deployment", "test-rpc"];

const Home = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    console.log("i fire once")
    dispatch(getAllQuestions());

    return () => {
      dispatch(reset())
    }
  }, []);

  console.log(questions, 'questions')

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
            <Link to="/askp-a-question">
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
        <div className="flex flex-col">
          <div
            id="post-summary"
            className="mb-1 flex flex-row justify-start items-center space-x-2 text-sm "
          >
            <div className="p-0.5">
              <span className="font-semibold">0</span> votes
            </div>

            <div className="border border-green-700 py-0.5 px-1 rounded-sm text-green-700">
              <span className="font-semibold">2</span> answers
            </div>
          </div>
          <div id="post-title" className="mb-1">
            <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
              Getting transaction address Getting transaction address
            </h3>
          </div>
          <div id="post-body" className="mb-2">
            <p className="text-sm text-gray-600">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div id="post-tags" className="mb-3">
            <div className="flex flex-row text-xs space-x-2">
              {Tags.map((tag) => (
                <div className="bg-slate-300 py-1 px-2 rounded-sm flex items-center">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div id="post-user" className="mb-3 text-xs">
            <span className="text-blue-600 hover:cursor-pointer hover:text-blue-500 duration-100">
              username
            </span>{" "}
            <span className="text-slate-500">asked 2 hours ago</span>
          </div>

          <div id="divider" className="py-3 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            id="post-summary"
            className="mb-1 flex flex-row justify-start items-center space-x-2 text-sm "
          >
            <div className="p-0.5">
              <span className="font-semibold">0</span> votes
            </div>

            <div className="border border-green-700 py-0.5 px-1 rounded-sm text-green-700">
              <span className="font-semibold">2</span> answers
            </div>
          </div>
          <div id="post-title" className="mb-1">
            <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
              Getting transaction address Getting transaction address
            </h3>
          </div>
          <div id="post-body" className="mb-2">
            <p className="text-sm text-gray-600">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div id="post-tags" className="mb-3">
            <div className="flex flex-row text-xs space-x-2">
              {Tags.map((tag) => (
                <div className="bg-slate-300 py-1 px-2 rounded-sm flex items-center">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div id="post-user" className="mb-3 text-xs">
            <span className="text-blue-600 hover:cursor-pointer hover:text-blue-500 duration-100">
              username
            </span>{" "}
            <span className="text-slate-500">asked 2 hours ago</span>
          </div>

          <div id="divider" className="py-3 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            id="post-summary"
            className="mb-1 flex flex-row justify-start items-center space-x-2 text-sm "
          >
            <div className="p-0.5">
              <span className="font-semibold">0</span> votes
            </div>

            <div className="border border-green-700 py-0.5 px-1 rounded-sm text-green-700">
              <span className="font-semibold">2</span> answers
            </div>
          </div>
          <div id="post-title" className="mb-1">
            <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
              Getting transaction address Getting transaction address
            </h3>
          </div>
          <div id="post-body" className="mb-2">
            <p className="text-sm text-gray-600">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div id="post-tags" className="mb-3">
            <div className="flex flex-row text-xs space-x-2">
              {Tags.map((tag) => (
                <div className="bg-slate-300 py-1 px-2 rounded-sm flex items-center">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div id="post-user" className="mb-3 text-xs">
            <span className="text-blue-600 hover:cursor-pointer hover:text-blue-500 duration-100">
              username
            </span>{" "}
            <span className="text-slate-500">asked 2 hours ago</span>
          </div>

          <div id="divider" className="py-3 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
        {/* end */}
      </div>
    </Layout>
  );
};

export default Home;
