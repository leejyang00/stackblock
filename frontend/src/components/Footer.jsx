import { Link } from "react-router-dom";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white ">
      <div className="w-full min-h-min px-6 py-8 sm:py-12 sm:px-16 flex flex-wrap flex-row md:justify-around gap-4">
        <div className="max-w-md mb-8 sm:mb-0">
          <h3 className="font-semibold text-xl mb-5">Stackblock</h3>
          <p className="text-sm">
            Our mission is to educate blockchain developers or enthusiasts
            through this discussion forum. Any related topics to blockchain
            development are welcomed here.
          </p>
        </div>
        <div className="min-w-md">
          <div className="font-semibold text-xl mb-5">Pages</div>
          <div className="flex flex-col text-sm space-y-3">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <Link to="/ask-a-question">
              <button>Ask a Question</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-sm p-5">
        <BiCopyright className="mr-1" /> Stackblock 2022
      </div>
    </div>
  );
};

export default Footer;
