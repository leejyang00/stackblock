import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineLink,
  AiOutlineGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Editor } from "@tinymce/tinymce-react";

import { updateMe, reset } from "../../features/auth/authSlice";

const EditProfile = ({ editProfile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    username: user.username,
    aboutMe: user.aboutMe ? user.aboutMe : "",
    website: user.website ? user.website : "",
    twitter: user.twitter ? user.twitter : "",
    github: user.github ? user.github : "",
  });

  const { username, aboutMe, website, twitter, github } = profile;

  const onEditorHandler = (content, editor) => {
    setProfile((prevState) => ({
      ...prevState,
      aboutMe: content,
    }));
  };

  const onChangeHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const userProfile = {
      username,
      aboutMe,
      website,
      twitter,
      github,
    };

    const response = await dispatch(updateMe(userProfile));
    
    // trigger successful saved component 
    if (response) {
      setSaved(true)
    }

    dispatch(reset());
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col mb-5 w-full">
          <div>
            <h2 id="edit-profile-subcontent" className="text-3xl">
              Edit Profile
            </h2>
          </div>
          <div className="py-2 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <form
          onSubmit={onSubmitHandler}
          autoComplete="off"
          className="w-full mb-10"
        >
          <div className="mb-5">
            <h3 className="text-lg mb-2">Personal Information</h3>
            <div className="p-3 border border-gray-300 shadow-sm rounded-md">
              <div className="flex flex-col w-full mb-3">
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3">
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  About me
                </label>
                <Editor
                  value={aboutMe}
                  onEditorChange={onEditorHandler}
                  init={{
                    height: 200,
                    menubar: false,
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic | bullist numlist outdent indent | " +
                      "removeformat | help",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-lg mb-2">Links</h3>
            <div className="flex md:flex-row flex-col justify-center items-center p-3 border border-gray-300 shadow-sm rounded-md">
              <div className="flex flex-col w-full mb-3 md:p-2">
                <label htmlFor="website" className="font-semibold text-sm mb-1">
                  <AiOutlineLink className="inline" /> Website Link
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={website}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3 md:p-2">
                <label htmlFor="twitter" className="font-semibold text-sm mb-1">
                  <AiFillTwitterCircle className="inline" /> Twitter link
                </label>
                <input
                  id="twitter"
                  name="twitter"
                  type="url"
                  value={twitter}
                  onChange={onChangeHandler}
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3 md:p-2">
                <label htmlFor="github" className="font-semibold text-sm mb-1">
                  <AiOutlineGithub className="inline" /> GitHub Link
                </label>
                <input
                  id="github"
                  name="github"
                  value={github}
                  onChange={onChangeHandler}
                  type="url"
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-3">
            <button
              type="submit"
              className="m-2 px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 duration-200 rounded-md text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => editProfile(false)}
              className="m-2 hover:bg-gray-200 duration:200 rounded-md text-sm px-3 py-2"
            >
              Cancel
            </button>
          </div>

          {saved && (
            <div className="border border-green-200 bg-green-100 p-10">
              <p className="font-semibold">
                Your changes have been saved successfully.
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default EditProfile;
