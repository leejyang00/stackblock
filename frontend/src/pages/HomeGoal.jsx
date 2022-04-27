import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { reset } from "../features/goals/goalsSlice";
import { toast } from "react-toastify";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Layout from "../components/Layout";

const HomeGoal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    // if (!user) {
    //   navigate("/login");
    // }
    
    // {user && dispatch(getGoals())};

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="w-full flex justify-center item-center flex-col ">
        <div className="flex flex-col justify-center items-center">
          {user ? (
            <div>
              <h1 className="text-3xl">Welcome {user && user.username}</h1>
              <p>Goals Dashboard</p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl">Welcome</h1>
              <p>Create an account to ask a question</p>
            </div>
          )}
        </div>

        <div>
          <GoalForm />
        </div>

        <div>
          {goals.length > 0 ? (
            <div>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomeGoal;
