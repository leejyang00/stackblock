import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Months from "../Common/Months";

const QuestionList = (props) => {
  const { id, question, onSelect } = props;
  const { _id, user, username, title, body, createdAt, tags } =
    question;
  const date = new Date(createdAt);

  return (
    <>
      <div id={id} className="flex flex-col">
        {/* <div
          id="post-summary"
          className="mb-1 flex flex-row justify-start items-center space-x-2 text-sm "
        >
          <div className="p-0.5">
            <span className="font-semibold">{ratings}</span> votes
          </div>

          <div className="border border-green-700 py-0.5 px-1 rounded-sm text-green-700">
            <span className="font-semibold">2</span> answers
          </div>
        </div> */}
        <div id="post-title" className="mb-1">
          <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
            <Link to={`/question/${_id}`} onClick={() => onSelect(id)}>
              {title}
            </Link>
          </h3>
        </div>
        <div id="post-body" className="mb-2">
          <div className="text-sm text-gray-600 ">{body && parse(body)}</div>
        </div>
        <div id="post-tags" className="mb-3">
          <div className="flex flex-row text-xs space-x-2">
            {tags &&
              tags.map((tag, index) => (
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
            <Link to={`/user/${user}`}>{username}</Link>
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
    </>
  );
};

export default QuestionList;
