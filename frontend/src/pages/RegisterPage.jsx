import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// useSelector: select something from the state
// useDispatch: dispatch function, like register (asyncThunk), or reset in reducer p
import { toast } from "react-toastify";
import { register, reset, resetUser } from "../features/auth/authSlice";
import PasswordStrength from "../components/Common/PasswordStrength/PasswordStrength";
import zxcvbn from "zxcvbn";
import { Register, Processing } from "../components/Buttons/index";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [linkSent, setLinkSent] = useState(false);

  const { email, username, password, confirmPassword } = formData;
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      setLinkSent(true);
    }

    dispatch(reset());
    dispatch(resetUser());
  }, [isError, message, isSuccess, dispatch]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // check password strength
    if (zxcvbn(password).score <= 2) {
      toast.error("Password is too weak");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    // in authSlice Redux, then post data to URI
    await dispatch(register(userData));
    // console.log(response, "response");
    // navigate("/");
    // sessionStorage.setItem("login", true);
    // setCookie("rememberMe", false);
  };

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h1 className="font-bold text-center my-3">Stackblock</h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="rounded-md shadow-sm">
              <div className="mb-2">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  required
                  value={username}
                  onChange={onChangeHandler}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email-address" className="text-sm">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>

              {/* password strength meter */}
              <PasswordStrength password={password} />

              <div className="mb-2">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your confirm password"
                />
              </div>
            </div>

            {!linkSent ? (
              <div>{isLoading ? <Processing /> : <Register />}</div>
            ) : (
              <div className="border border-green-200 bg-green-100 p-10">
                <p className="font-semibold">
                  A verification link has been sent to your email.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
