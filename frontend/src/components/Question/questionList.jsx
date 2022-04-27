


const QuestionList = ({  }) => {
  return (
    <>
      <div className="flex flex-col">
        <div
          id="post-summary"
          className="mb-1 flex flex-row justify-start items-center space-x-2 text-sm "
        >
          <div className="p-0.5">
            <span className="font-semibold">0</span> votes
          </div>

          <div className="border border-green-700 py-0.5 px-1 rounded-sm text-green-700">
            <span className="font-semibold">2</span> answers
          </div>
        </div>
        <div id="post-title" className="mb-1">
          <h3 className="text-xl text-blue-700 hover:text-blue-500 hover:cursor-pointer duration-100 ">
            Getting transaction address Getting transaction address
          </h3>
        </div>
        <div id="post-body" className="mb-2">
          <p className="text-sm text-gray-600">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div id="post-tags" className="mb-3">
          <div className="flex flex-row text-xs space-x-2">
            {Tags.map((tag) => (
              <div className="bg-slate-300 py-1 px-2 rounded-sm flex items-center">
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div id="post-user" className="mb-3 text-xs">
          <span className="text-blue-600 hover:cursor-pointer hover:text-blue-500 duration-100">
            username
          </span>{" "}
          <span className="text-slate-500">asked 2 hours ago</span>
        </div>

        <div id="divider" className="py-3 block">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    </>
  );
};

export default QuestionList;
