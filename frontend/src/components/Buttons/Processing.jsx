const Processing = () => {
  return (
    <button className="w-full flex flex-row bg-indigo-500 text-white py-2 px-4 justify-center border border-transparent text-sm font-medium rounded-md ">
      <svg
        className="animate-spin h-5 w-5 border-b-2 rounded-full mr-3"
        viewBox="0 0 24 24"
      ></svg>
      Processing...
    </button>
  );
};

export default Processing