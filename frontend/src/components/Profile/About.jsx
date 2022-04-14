const AboutMe = () => {
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-xl mb-3">About</h3>
        <div className="h-32 border border-gray-300 bg-gray-100 rounded-md flex justify-center items-center text-center p-10">
          <p className="text-sm mx-auto max-w-xs text-gray-600">
            Your about me section is currently blank. Would you like to add one?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 duration-200"
            >
              Edit profile
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
