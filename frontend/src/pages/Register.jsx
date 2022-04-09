import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// useSelector: select something from the state
// useDispatch: dispatch function, like register (asyncThunk), or reset in reducer
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_2: "",
  });

  const { email, name, password, password_2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password_2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      // in authSlice Redux, then post data to URI
      dispatch(register(userData));
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div>
        <div>
          <h1>REGISTER</h1>
          <p>Place registration here</p>
        </div>
      </div>

      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="name"
              name="name"
              id="name"
              value={name}
              placeholder="Enter your full name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password_2"
              id="password_2"
              value={password_2}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
