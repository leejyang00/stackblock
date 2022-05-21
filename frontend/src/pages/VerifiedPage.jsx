import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { AiFillCheckCircle } from "react-icons/ai";

const API_URL = '/api/users/verify/'

const VerifiedPage = () => {
  const { userId, token } = useParams();
  const [validUrl, setValidUrl] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(API_URL + `${userId}/${token}`)
        // console.log(data, "<- data VerifiedPage");
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
        throw new Error(error);
      }
    };
    verifyEmail();
  }, [userId, token]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {validUrl ? (
        <div className="flex flex-col text-center space-y-10">
          <div className="space-y-3">
            <div>
              <AiFillCheckCircle
                size={45}
                className="w-full text-center text-green-600"
              />
            </div>
            <h1 className="text-3xl">Email verified successfully</h1>
          </div>
          <Link to="/login">
            <button className="rounded-md bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 duration-200">
              Sign In
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {" "}
          <h1>404 not found</h1>
        </div>
      )}
    </div>
  );
};

export default VerifiedPage;
