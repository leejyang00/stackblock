import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// import { HiMenuAlt4 } from "react-icons/hi";
// import { AiOutlineClose } from "react-icons/ai";
import { BsStack } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { reset, resetUser } from "../features/auth/authSlice";

const navPages = [
  {
    title: "Home",
    path: "/",
  },
  // {
  //   title: "About Us",
  //   path: "/about-us",
  // },
  {
    title: "Ask a question",
    path: "/ask-a-question",
  },
];

const dropdownPages = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Ask a question",
    path: "/ask-a-question",
  },
  // {
  //   title: "Settings",
  //   path: "/settings",
  // },
  // {
  //   title: "Earnings",
  //   path: "/earnings",
  // },
];

const Header = () => {
  // const [toggleMenu, setToggleMenu] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  // eslint-disable-next-line
  const [cookie, setCookie, deleteCookie] = useCookies();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const signOutHandler = () => {
    setDropDown(false);

    // logout functionality
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem('login')

    deleteCookie("userCookie");
    deleteCookie("rememberMe");

    dispatch(reset());
    dispatch(resetUser())
    navigate("/login");
  };

  const NavbarItem = ({ title, path, classProps }) => {
    return (
      <button>
        <li
          className={`text-white mx-6 cursor-pointer font-semibold hover:text-gray-300 duration-200 ${classProps}`}
        >
          <Link to={path}>{title}</Link>
        </li>
      </button>
    );
  };

  const DropdownItem = ({ title, path, classProps }) => {
    return (
      <Link to={path}>
        <li
          className={`block py-2 px-4 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 ${classProps}`}
        >
          <button>{title}</button>
        </li>
      </Link>
    );
  };

  // Login && Register button
  const LogInRegisterComponent = () => {
    return (
      <>
        <div className="hidden md:flex">
          <Link to="/login">
            <button className="border border-1 border-white text-white text-sm font-medium font-sm px-3 py-1.5 mx-2 rounded-md cursor-pointer hover:border-gray-300 hover:text-gray-300 duration-200">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="underline border border-1 text-white text-sm font-medium font-sm px-3 py-1.5 mx-2 rounded-md cursor-pointer hover:border-gray-300 hover:text-gray-300 duration-200">
              Register
            </button>
          </Link>
        </div>
      </>
    );
  };

  // Dropdown with profile picture
  const DropdownProfileComponent = () => {
    return (
      <>
        <div className="flex justify-center items-center text-white hover:text-gray-300">
          <button onClick={() => setDropDown(!dropDown)}>
            <div className="flex flex-row items-center">
              <img
                className="h-6 w-6 rounded-full"
                alt="profile"
                src="https://picsum.photos/200"
              />
              <IoMdArrowDropdown fontSize={18} />
            </div>
          </button>
        </div>

        {dropDown && (
          <div className="z-50 absolute top-10 right-10 my-4 text-base list-none bg-white rounded divide-y divide-gray-300 shadow border border-gray-300">
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900">
                {user.username}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate">
                {user.email}
              </span>
            </div>
            <ul className="py-1">
              {dropdownPages.map((page, index) => (
                <DropdownItem key={index} title={page.title} path={page.path} />
              ))}
            </ul>

            <ul className="py-1">
              <Link to="/">
                <button
                  onClick={signOutHandler}
                  className="w-full hover:bg-gray-100"
                >
                  <li className="flex justify-start text-sm py-2 px-4 text-gray-700 ">
                    Sign Out
                  </li>
                </button>
              </Link>
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <header className="box-border bg-slate-800 min-h-5">
      <div className="w-10/12 py-3 flex mx-auto justify-between items-center ">
        {/* Branch Logo */}
        <div className="md:flex justify-center items-center py-1.5">
          <button>
            <a href="/">
              <div className="flex flex-row justfify-center items-center text-white">
                <BsStack />
                <h3 className="text-xl font-bold ml-2">Stackblock</h3>
              </div>
            </a>
          </button>
        </div>

        {/* Navigation pages */}
        <div>
          <ul className="md:flex hidden list-none flex-row justify-between items-center">
            {navPages.map((page, index) => (
              <NavbarItem
                key={index}
                title={page.title}
                path={page.path}
                classProps={"text-sm"}
              />
            ))}
          </ul>
        </div>

        {user ? <DropdownProfileComponent /> : <LogInRegisterComponent />}

        {/* Mobile mode - Hamburger Menu  */}
        {/* {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 md:hidden h-screen list-none rounded-md w-[70vw] shadow-2xl 
          flex flex-col justify-start items-end blue-glassmorphism animate-slide-in"
          >
            <li className="w-full text-xl font-bold text-white my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navPages.map((page, index) => (
              <NavbarItem
                key={index}
                title={page.title}
                path={page.path}
                classProps={"my-2 text-xl font-semibold"}
              />
            ))}
          </ul>
        )} */}
      </div>
    </header>
  );
};

export default Header;
