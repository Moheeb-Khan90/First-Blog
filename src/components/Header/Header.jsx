import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Logout, Logo } from "../index";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { CgFeed } from "react-icons/cg";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      url: "/home",
      active: authStatus,
      icon: <FaHome className="text-2xl" />,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
      icon: <FaHome className="text-2xl" />,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
      icon: <CgFeed className="text-2xl" />,
    },
    {
      name: "Add Post",
      url: "/add-posts",
      active: authStatus,
      icon: <GiNotebook className="text-2xl" />,
    },
  ];

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-500 w-full p-6">
      <nav className="flex items-center justify-between flex-wrap">
        {/* Logo Section */}
        <div className="flex justify-between w-full md:w-auto">
          {authStatus ? (
            <Link to="/home">
              <Logo />
            </Link>
          ) : (
            <Link to="/">
              <Logo />
            </Link>
          )}
          <button
            className="md:hidden text-white text-2xl"
            onClick={handleToggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:w-auto md:flex md:items-center md:gap-4`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 text-white font-semibold text-lg">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.url);
                        setMenuOpen(false); // Close menu after navigation
                      }}
                      className="flex items-center gap-2 capitalize"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>
          
        </div>
        {authStatus && (
            <div className="mt-4 md:mt-0 md:ml-4 text-center text-white text-lg font-semibold">
              {`Welcome ${user.name},`} <br/>
              <Logout />
            </div>
          )}
      </nav>
    </header>
  );
};

export default Header;
