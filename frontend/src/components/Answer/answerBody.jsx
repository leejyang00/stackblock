import parse from "html-react-parser";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import Months from "../Common/Months";

const AnswerBody = ({ answer }) => {
  const date = new Date(answer.createdAt);

  var min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  return (
    <>
      <div id="answer-body" className="flex flex-row my-3">
        {/* for loop the answers here */}
        <div
          id="question-body-rating"
          className="flex flex-col mr-5 justify-start items-center space-y-1"
        >
          <button>
            {<BsCaretUpFill size={30} className="text-gray-400" />}
          </button>
          <div className="text-2xl text-gray-500 leading-4">
            {answer.ratings}
          </div>
          <button>
            {<BsCaretDownFill size={30} className="text-gray-400" />}
          </button>
        </div>

        <div
          id="question-body-content"
          className="md:text-normal flex flex-col w-full"
        >
          <div>{parse(answer.answerBody)}</div>
          <div className="flex justify-end my-5">
            <div className="px-3 py-2 bg-blue-50 border flex flex-col rounded-sm">
              <p className="text-gray-600 mb-1 text-xs">
                asked {Months[date.getMonth()]} {date.getDate()},{" "}
                {date.getFullYear()} at {date.getHours()}:{min}{" "}
              </p>
              <span className="text-sm text-blue-600 font-normal">
                {answer.user}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="divider" className="py-3 block">
        <div className="w-full border-t border-gray-300"></div>
      </div>
    </>
  );
};

export default AnswerBody;
