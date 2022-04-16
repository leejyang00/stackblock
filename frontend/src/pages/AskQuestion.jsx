import { Editor } from "@tinymce/tinymce-react";
import Layout from "../components/Layout";

const AskQuestion = () => {
  const onEditorHandler = () => {};

  return (
    <Layout>
      <div className="w-full flex flex-col justify-items-center container mx-auto px-10 py-5 ">
        <div className="py-5">
          <h1 className="text-2xl">Ask a question</h1>
        </div>

        <div className="flex justify-center my-5">
          <div
            id="question-form"
            className="border border-gray-300 flex flex-col p-3 w-9/12 shadow-md rounded-md"
          >
            {/* title */}
            <label htmlFor="title" className="font-semibold mb-2 ">
              Title
              <p className="text-sm text-gray-600 font-normal">
                Be specific and imagine you’re asking a question to another
                person
              </p>
            </label>
            <input
              title="title"
              className="border py-2 px-3 text-sm rounded-sm mb-2"
              placeholder="Enter your title"
            />

            {/* body */}
            <div id="body" className="py-2">
              <form>
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
                    value=""
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
              </form>
            </div>

            {/* tag */}
            <div className="mb-3 py-2">
              <div className="mb-2">
                <label htmlFor="tag" className="font-semibold">
                  Tags
                  <p className="text-sm text-gray-600 font-normal">
                    Add up to 5 tags to describe what your question is about
                  </p>
                </label>
              </div>
              <input
                id="tag"
                placeholder="add your tags related to your question"
                className="py-2 px-3 border rounded-sm text-sm w-full"
              />
            </div>

            <div className="py-5">
              <button
                type="submit"
                className="py-2 px-3 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600 duration-200"
              >
                Submit question
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskQuestion;
