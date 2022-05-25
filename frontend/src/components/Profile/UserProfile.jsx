import { useState, useEffect } from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineLink,
  AiOutlineGithub,
  AiFillTwitterCircle,
  AiFillEdit,
} from "react-icons/ai";

import AboutMe from "./About";
import EditProfile from "./EditProfile";
import UserQuestionList from "./UserQuestionList";
import Months from "../Common/Months";
import Days from "../Common/Days";

const UserProfile = () => {
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false);
  const [profileOrQuestion, setProfileOrQuestion] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const date = new Date(user.createdAt);
  const { website, twitter, github, favoriteQuestions } = user;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div
        id="profile-content"
        className="w-full flex-col justify-center items-center mb-8 md:p-16 py-10 px-5 container mx-auto"
      >
        {/* profile pic, name, and edit button */}
        <div className="flex md:flex-row flex-col py-12 px-4 w-full justify-center mx-auto">
          {/* left section  */}
          <div className="mr-10 flex justify-start items-start ">
            <img
              alt="profile"
              src="https://picsum.photos/200"
              className="w-36 h-36 shadow-lg"
            />
          </div>

          {/* middle section */}
          <div className="flex flex-col justify-between items-start w-6/12">
            <div className="mt-3">
              <h1 className="md:text-3xl text-lg">{user.username}</h1>
              <p className="text-gray-500 text-sm mt-1">
                Joined on {date.getDate()} {Months[date.getMonth()]}{" "}
                {date.getFullYear()}, {Days[date.getDay()]}
              </p>
              <div className="flex flex-row py-3">
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <AiOutlineLink size={20} className="text-gray-700 mr-3" />
                  </a>
                )}

                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <AiFillTwitterCircle
                      size={20}
                      className="text-gray-700 mr-3"
                    />
                  </a>
                )}

                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub size={20} className="text-gray-700 mr-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* right section */}
          {/* change this to absolute to the right corner, rather than div justify-between */}
          <div className="whitespace-normal md:w-2/12 w-8/12 flex md:justify-end items-start ">
            {!editProfile ? (
              <button
                className="bg-white border border-gray-400 text-xs py-2 px-3 flex justify-center items-center hover:bg-gray-100 duration-200"
                onClick={() => setEditProfile(true)}
              >
                <AiFillEdit className="mr-1" /> Edit Profile
              </button>
            ) : (
              <button
                className="bg-white border border-gray-400 text-xs py-2 px-3 flex justify-center items-center hover:bg-gray-100 duration-200"
                onClick={() => setEditProfile(false)}
              >
                Return to Profile
              </button>
            )}
          </div>
        </div>

        {/* display all questions asked */}
        <div className="w-full px-4 md:px-20 md:mb-4 mb-0 container mx-auto">
          <div className="flex justify-start">
            <button
              className={`mr-1 rounded-full px-3 py-1 text-sm  ${
                profileOrQuestion
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setProfileOrQuestion(!profileOrQuestion)}
            >
              Profile
            </button>
            <button
              className={`mr-1 rounded-full px-3 py-1 text-sm ${
                !profileOrQuestion
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setProfileOrQuestion(!profileOrQuestion)}
            >
              Saved Questions
            </button>
          </div>
        </div>

        {/* sub-content for profile page, [Profile, Questions, Tags, Edit Profile] */}
        {/* <div className="md:px-20 md:py-3 py-2 px-4 container mx-auto flex justify-center items-center"> */}
        <div className="container mx-auto md:px-20 md:py-3 py-2 px-4">
          {profileOrQuestion ? (
            <>
              {!editProfile ? (
                <AboutMe editProfile={setEditProfile} user={user} />
              ) : (
                <EditProfile editProfile={setEditProfile} />
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-4">
                {favoriteQuestions.map((questionId, index) => (
                  <UserQuestionList key={index} questionId={questionId} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
