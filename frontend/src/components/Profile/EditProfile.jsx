import { useState, useEffect } from "react";
import { AiOutlineLink, AiOutlineGithub, AiFillTwitterCircle } from "react-icons/ai";

import { Editor } from "@tinymce/tinymce-react";

const EditProfile = () => {
  const [about, setAbout] = useState("");

  const [profile, setProfile] = useState({
    username: "",

  })

  // useEffect(() => {
  //   console.log(about)
  // }, [about])

  const onChangeHandler = (content, editor) => {
    // console.log(content, "content");
    // console.log(editor, "editor");
    setAbout(content);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(about);
    console.log(typeof about);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start">
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
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3">
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  About me
                </label>
                <Editor
                  value={about}
                  onEditorChange={onChangeHandler}
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
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  <AiOutlineLink className="inline" /> Website Link
                </label>
                <input
                  id="name"
                  type="url"
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3 md:p-2">
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  <AiFillTwitterCircle className="inline" /> Twitter link
                </label>
                <input
                  id="name"
                  type="url"
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col w-full mb-3 md:p-2">
                <label htmlFor="name" className="font-semibold text-sm mb-1">
                  <AiOutlineGithub className="inline" /> GitHub Link
                </label>
                <input
                  id="name"
                  type="url"
                  className="appearance-none rounded-md sm:text-sm px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <button
              type="submit"
              className="m-2 px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 duration-200 rounded-md text-sm"
            >
              Save Changes
            </button>
            <button type="button" className="m-2 hover:bg-gray-200 duration:200 rounded-md text-sm px-3 py-2">
              Cancel
            </button>
          </div>
        </form>

        {/* <div className="w-full">
          
        </div> */}
      </div>
    </>
  );
};

export default EditProfile;
