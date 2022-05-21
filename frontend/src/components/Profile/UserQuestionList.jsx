import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Months from "../Common/Months";

import questionService from "../../features/ask-question/questionService";

function UserQuestionList(props) {
  const { questionId } = props;
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const getQuestionDetails = async () => {
      setIsLoading(true);
      const result = await questionService.getQuestion(questionId);
      setQuestion(result);
      console.log(result);
      const createdDate = new Date(result.createdAt);
      setDate(createdDate);

      setIsLoading(false);
    };

    getQuestionDetails();
  }, [questionId]);

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col">
          <div id="post-title" className="mb-1">
            <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
              <Link to={`/question/${question._id}`}>{question.title}</Link>
            </h3>
          </div>

          <div id="post-body" className="mb-2">
            <div className="text-sm text-gray-600 ">
              {question.body && parse(question.body)}
            </div>
          </div>
          <div id="post-tags" className="mb-3">
            <div className="flex flex-row text-xs space-x-2">
              {question.tags &&
                question.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-slate-300 py-1 px-2 rounded-sm flex items-center"
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>

          <div id="post-user" className="mb-3 text-xs">
            <span className="text-blue-600 hover:cursor-pointer hover:text-blue-500 duration-100">
              <Link to={`/user/${question.user}`}>{question.username}</Link>
            </span>{" "}
            <span className="text-slate-500">
              asked {Months[date.getMonth()]} {date.getDate()},{" "}
              {date.getFullYear()} at {date.getHours()}:
              {date.getMinutes() < 0
                ? "0" + date.getMinutes()
                : date.getMinutes()}{" "}
            </span>
          </div>

          <div id="divider" className="py-3 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserQuestionList;
