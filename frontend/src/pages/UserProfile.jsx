import React from "react";
import Layout from "../components/Layout";

import { AiFillEdit } from 'react-icons/ai'
import AboutMe from "../components/Profile/About";
import EditProfile from "../components/Profile/EditProfile";

const UserProfile = () => {
  return (
    <Layout>
    <div
      id="profile-content"
      className="w-full flex-col justify-center items-center mb-8"
    >
      {/* profile pic, name, and edit button */}
      <div className="flex md:flex-row flex-col md:p-20 py-12 px-4 w-full justify-between">


        {/* left section  */}
        <div className="mr-10 flex justify-start items-start ">
          <img src="https://picsum.photos/200" className="w-36 h-36 shadow-lg"/>
        </div>

        {/* middle section */}
        <div className="flex flex-col justify-between items-start w-6/12">
          <div className="mt-3">
            <h1 className="md:text-3xl text-lg">usernameusername</h1>
            <p className="text-gray-500 text-sm mt-1">Joined on 11 April 2022, Monday</p>
          </div>
        </div>

        {/* right section */}
        {/* change this to absolute to the right corner, rather than div justify-between */}
        <div className="whitespace-normal w-2/12 flex justify-end items-start ">
          <button className="bg-white border border-gray-400 text-xs py-2 px-3 flex justify-center items-center hover:bg-gray-100 duration-200">
            <AiFillEdit className="mr-1" /> Edit Profile
          </button>
        </div>
      </div>

      {/* display all questions asked */}
      <div className="w-full md:px-20 px-4 md:mb-4 mb-0">
        <div>
          <button className="mr-1 rounded-full px-3 py-1 text-sm text-white bg-blue-600">Profile</button>
          <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">Questions</button>
          <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">Answers</button>
          <button className="mr-1 rounded-full px-3 py-1 text-sm hover:bg-gray-200">Tags</button>
        </div>
        
      </div>

      {/* sub-content for profile page, [Profile, Questions, Tags, Edit Profile] */}
      <div className="md:px-20 md:py-3 py-2 px-4">

        {/* <AboutMe /> */}


        <EditProfile />


      </div>

    </div>
    </Layout>
  );
};

export default UserProfile;
