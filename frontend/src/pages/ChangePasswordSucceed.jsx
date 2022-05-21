import React from "react";
import { Link } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

function ChangePasswordSucceed() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="flex flex-col justify-center items-center space-y-3">
          <AiFillCheckCircle size={40} className="text-green-500 " />
          <h1 className="text-xl">Password successfully changed</h1>
        </div>
        <div>
          <Link
            to="/login"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <button>Back to Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordSucceed;
