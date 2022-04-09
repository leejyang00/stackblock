import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalsSlice";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    // console.log(isError)
    if (isError) {
      console.log('ERROR HOME')
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="w-full flex justify-center item-center flex-col ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </div>

      <div>
        <GoalForm />
      </div>

      <div>
        {goals.length > 0 ? (
          <div>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ) : (<h3>You have not set any goals</h3>)}
      </div>
    </div>
  );
};

export default Home;
