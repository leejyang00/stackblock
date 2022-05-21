import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { Processing } from "../components/Buttons";
import PasswordStrength from "../components/Common/PasswordStrength/PasswordStrength";

const API_URL = "/api/users/";

function ChangePassword() {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { currentPassword, newPassword, confirmNewPassword } = passwords;

  const onChangeHandler = (e) => {
    setPasswords((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      toast.error("New password don't match");
    }

    // check password strength
    if (zxcvbn(newPassword).score <= 2) {
      toast.error("Password is too weak");
      return;
    }

    const changePasswordData = {
      userId,
      token,
      currentPassword,
      newPassword,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.post(
      API_URL + "change-password",
      changePasswordData,
      config
    );
    const data = response.data;

    if (data.message === "Success") {
      navigate("/change-password-succeed");
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
            Change your password
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Strong password required. Combine uppercase letters, lowercase
            letters, numbers, and symbols.
          </p>

          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="rounded-md shadow-sm">
              <div className="mb-2 space-y-1">
                <label htmlFor="currentPassword" className="text-sm">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="mb-2 space-y-1">
                <label htmlFor="newPassword" className="text-sm">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your new password"
                />
              </div>

              {/* password strength meter */}
              <PasswordStrength password={newPassword} />

              <div className="mb-2 space-y-1">
                <label htmlFor="confirmNewPassword" className="text-sm">
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your confirm password"
                />
              </div>

              {isLoading ? (
                <Processing />
              ) : (
                <div className="mt-8">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Set Password
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
