import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const NavbarItem = ({ title, path, classProps }) => {
    return (

        <li className={`text-gray-100 mx-6 cursor-pointer ${classProps}`}>
          <button>
            <Link to={path}>{title}</Link>
          </button>
        </li>
    )
  };

  const navPages = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "About Us",
      path: "/about-us"
    },
    {
      title: "Ask a question",
      path: "/ask-a-question"
    },
    {
      title: "Profile",
      path: "/profile"
    },
  ]

  return (
    <nav className="w-full flex md:justify-between justify-between items-center py-4 px-7 bg-slate-800">

      {/* Branch Logo */}
      <div className=" justify-center items-center">
        <h3 className="text-2xl font-medium text-white">
          <button>
            <a href="/">Stackblock</a>
          </button>
        </h3>
      </div>

      {/* Navigation pages */}
      <div>
        <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {navPages.map(
            (page, index) => (
              <NavbarItem key={index} title={page.title} path={page.path}/>
            )
          )}
        </ul>
      </div>

      {/* Login && Logout button */}
      <div className="hidden md:flex">
        {!user ? (
          <Link to="/login">
            <button className="bg-[#2952e3] text-white text-sm font-bold font-sm px-7 py-2 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]">
              Login
            </button>
          </Link>
        ) : (
          <button
            className="bg-[#2952e3] text-white text-sm font-bold font-sm px-7 py-2 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]"
            onClick={onLogOut}
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile mode - Hamburger Menu  */}
      {toggleMenu ? (
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
          {navPages.map(
            (page, index) => (
              <NavbarItem
                key={index}
                title={page.title}
                path={page.path}
                classProps={"my-2 text-xl font-semibold"}
              />
            )
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
