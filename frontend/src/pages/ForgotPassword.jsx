import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../features/auth/authService";
import ResetPassword from "../components/Buttons/ResetPassword";
import Processing from "../components/Buttons/Processing";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sentLink, setSentLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (email === "") toast.error("Please input an email");

    try {
      const result = await authService.changePassword({ email: email });

      if (result.accepted[0]) {
        setSentLink(true);
      }
    } catch (error) {
      toast.error("Email failed to be sent");
    }
  };

  return (
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
            Forgot your password?
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form className="mt-8" onSubmit={onSubmitHandler}>
            <div>
              <div className="mb-2 space-y-2">
                <label htmlFor="email" className="text-sm">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="e.g. email@domain.com"
                />
              </div>

              {!sentLink ? (
                <div className="mt-5">
                  {isLoading ? <Processing /> : <ResetPassword />}{" "}
                  <div className="flex justify-between items-center text-sm my-10">
                    <div>
                      <span>Don't have an account?</span>
                    </div>

                    <div className="border border-gray-300 px-3 py-1 rounded-md shadow-sm">
                      <Link to="/register">Create an Account</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-green-200 bg-green-100 p-10 mt-5 text-center text-sm">
                  <p className="font-semibold">
                    A link has been sent to your email to change your password.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
