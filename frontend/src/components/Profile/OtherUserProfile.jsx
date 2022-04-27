import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import {
  AiOutlineLink,
  AiOutlineGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
import Months from "../Common/Months";
import Days from "../Common/Days";

import authService from "../../features/auth/authService";
import Spinner from "../Spinner";
import AboutMe from "./About";

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [joinedDate, setJoinedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authService.getUser(userId);
      setUser(userData);
      setJoinedDate(new Date(userData.createdAt));
      setIsLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (user) {
  }
  // const date = new Date(user.createdAt);
  // const { website, twitter, github } = user;
  // console.log(user, "user");

  return (
    <Layout>
      {!isLoading && user ? (
        <div
          id="profile-content"
          className="w-full flex-col justify-center items-center mb-8 md:p-16 py-10 px-5 container mx-auto"
        >
          <div className="flex md:flex-row flex-col py-12 px-4 w-full justify-center mx-auto">
            <div className="mr-10 flex justify-start items-start ">
              <img
                alt="profile"
                src="https://picsum.photos/200"
                className="w-36 h-36 shadow-lg"
              />
            </div>

            <div className="flex flex-col justify-between items-start w-6/12">
              <div className="mt-3">
                <h1 className="md:text-3xl text-lg">{user.username}</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Joined on {joinedDate.getDate()}{" "}
                  {Months[joinedDate.getMonth()]} {joinedDate.getFullYear()},{" "}
                  {Days[joinedDate.getDay()]}
                </p>
                <div className="flex flex-row py-3">
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineLink size={20} className="text-gray-700 mr-3" />
                    </a>
                  )}

                  {user.twitter && (
                    <a
                      href={user.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiFillTwitterCircle
                        size={20}
                        className="text-gray-700 mr-3"
                      />
                    </a>
                  )}

                  {user.github && (
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineGithub
                        size={20}
                        className="text-gray-700 mr-3"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* display all questions asked */}
          <div className="w-full px-4 md:px-20 md:mb-4 mb-0 container mx-auto">
            <div className="flex justify-start">
              <button className="mr-1 rounded-full px-3 py-1 text-sm text-white bg-blue-600">
                Profile
              </button>
              <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">
                Questions
              </button>
              {/* <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">
              Answers
            </button>
            <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">
              Tags
            </button> */}
            </div>
          </div>

          <div className="md:px-20 md:py-3 py-2 px-4 container mx-auto flex justify-center items-center">

            <AboutMe user={user}/>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default OtherUserProfile;
