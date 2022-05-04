import { useState } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { passiveSupport } from "passive-events-support/src/utils";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { FileUploader } from "react-drag-drop-files";

import Layout from "../components/Layout";
import { submitQuestion } from "../features/ask-question/questionSlice";

const fileTypes = ["JPG", "PNG"];

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  passiveSupport({
    debug: false,
    events: ["touchstart", "touchmove", "touchend", "mousewheel"],
    listeners: [
      //document
      {
        element: "document",
        event: "touchstart",
      },
      {
        element: "document",
        event: "touchmove",
      },
      {
        element: "document",
        event: "mousewheel",
      },
      {
        element: "document",
        event: "touchend",
      },
      // div.tox.tox-tinymce
      {
        element: "div.tox.tox-tinymce",
        event: "touchstart",
      },
      {
        element: "div.tox.tox-tinymce",
        event: "touchmove",
      },
      {
        element: "div.tox.tox-tinymce",
        event: "touchend",
      },
      {
        element: "div.tox.tox-silver-sink.tox-tinymce-aux",
        event: "touchstart",
      },
      {
        element: "div.tox.tox-silver-sink.tox-tinymce-aux",
        event: "touchmove",
      },
      {
        element: "div.tox.tox-silver-sink.tox-tinymce-aux",
        event: "touchend",
      },
      {
        element: "div.root",
        event: "touchstart",
      },
      {
        element: "div.root",
        event: "touchmove",
      },
      {
        element: "div.root",
        event: "touchend",
      },
    ],
  });

  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [question, setQuestion] = useState({
    title: "",
    body: "",
  });
  const { title, body } = question;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // must have title, body and tags
    if (title === "" || body === "" || tags.length === 0) {
      toast.error("Please complete the question form");
    } else {
      const questionData = {
        title,
        body,
        tags,
      };

      // submit question, navigate to question profile page
      const response = await dispatch(submitQuestion(questionData));
      console.log(response.payload._id, "response AQ");
      navigate(`/question/${response.payload._id}`);
    }
  };

  const handleUpload = (files) => {
    // console.log(Object.values(files), "file");

    Object.values(files).map((file) => (
      setImages((prevState) => [...prevState, file])
    ))
  };

  const onChangeHandler = (e) => {
    setQuestion((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onEditorHandler = (content, editor) => {
    setQuestion((prevState) => ({
      ...prevState,
      body: content,
    }));
  };

  return (
    <Layout>
      <div className="w-full flex flex-col justify-items-center container mx-auto px-10 py-5">
        <div className="py-5">
          <h1 className="text-2xl">Ask a question</h1>
        </div>

        <div className="flex my-5">
          <div
            id="question-form"
            className="border border-gray-300 flex flex-col p-3 w-9/12 shadow-md rounded-md"
          >
            <form onSubmit={onSubmitHandler}>
              {/* title */}
              <div className="mb-2">
                <label htmlFor="title" className="font-semibold mb-2 ">
                  Title
                  <p className="text-sm text-gray-600 font-normal">
                    Be specific and imagine you’re asking a question to another
                    person
                  </p>
                </label>
              </div>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                required
                className="border py-2 px-3 text-sm rounded-sm mb-2 w-full"
                placeholder="Enter your title"
                onChange={onChangeHandler}
              />

              {/* body */}
              <div id="body" className="py-2">
                <div id="body-label" className="mb-2">
                  <label className="font-semibold">
                    Body
                    <p className="text-sm text-gray-600 font-normal">
                      Include all the information someone would need to answer
                      your question
                    </p>
                  </label>
                </div>
                <div id="body-editor">
                  <Editor
                    value={body}
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

              {/* tag */}
              <div className="mb-3 py-2">
                <div className="mb-2">
                  <label htmlFor="tag" className="font-semibold">
                    Tags
                    <p className="text-sm text-gray-600 font-normal">
                      Add up to 3 tags to describe what your question is about
                    </p>
                  </label>
                </div>
                <ReactTagInput
                  tags={tags}
                  placeholder="Type and press enter"
                  maxTags={3}
                  editable={true}
                  readOnly={false}
                  removeOnBackspace={true}
                  onChange={(newTags) => setTags(newTags)}
                />
              </div>

              <div>
                <div className="mb-2">
                  <label htmlFor="tag" className="font-semibold">
                    Images
                    <p className="text-sm text-gray-600 font-normal">
                      Include any images for your question (only PNG, JPG accepted)
                    </p>
                  </label>
                </div>
                <FileUploader
                  handleChange={handleUpload}
                  name="files"
                  types={fileTypes}
                  multiple
                >
                  <div className="border-dotted border-2 border-sky-500 py-2 px-3 bg-gray-100 hover:cursor-pointer flex flex-row items-center">
                    <BiImageAdd size={20} className="text-gray-500 mr-2" />{" "}
                    <span className="text-sm">Upload image files here ...</span>
                  </div>
                </FileUploader>
                <div className="flex flex-col space-y-2 my-2">
                  {images &&
                    images.map((image, index) => (
                      <p key={index} className="text-sm">{image.name}</p>
                    ))}
                </div>
              </div>

              <div className="py-5">
                <button
                  type="submit"
                  className="py-2 px-3 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600 duration-200"
                >
                  Submit question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskQuestion;
