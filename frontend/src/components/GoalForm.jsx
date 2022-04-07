import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from '../features/goals/goalsSlice'

const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({text}))
    setText('')
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text">Goal: </label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-2 border-red-300"
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
