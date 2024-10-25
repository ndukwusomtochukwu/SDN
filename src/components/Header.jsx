import { mdiMenu, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuForSm from "./MenuForSm";

const LinkButton = ({ text, path = "#", handleClick, extraStyles }) => {
  return (
    <li
      className={
        `relative hover:scale-105 transition-all cursor-pointer z-10 no-copy px-1 ` +
        extraStyles
      }
      onClick={(e) => {
        if (handleClick) {
          handleClick(e);
        }
      }}
    >
      <Link to={path}>{text}</Link>
    </li>
  );
};

const Header = ({ backgroundColor = "bg-slate-800" }) => {
  const [learningTools, setLearningTools] = useState(false);
  const [learningGuide, setlearningGuide] = useState(false);
  const learningToolsRef = useRef(null);
  const learningGuideRef = useRef(null);
  const menuToggleRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const icon = menu ? mdiClose : mdiMenu;

  const handleClick = (e) => {
    e.preventDefault();
    setShowContactPage((prev) => !prev);
  };

  const handleOpenLearningTools = () => {
    setLearningTools((prev) => !prev);
    setlearningGuide(false);
  };

  const handlelearningGuide = () => {
    setlearningGuide((prev) => !prev);
    setLearningTools(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        learningToolsRef.current &&
        !learningToolsRef.current.contains(event.target)
      ) {
        setLearningTools(false);
      }
      if (
        learningGuideRef.current &&
        !learningGuideRef.current.contains(event.target)
      ) {
        setlearningGuide(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={
        "text-white p-6 pb-4 flex items-baseline gap-8 relative z-30 w-full no-copy lg:px-24 " +
        backgroundColor
      }
    >
      <div className="relative text-2xl font-bold flex items-center bg-slate-800 px-4 py-1 rounded-full group transition-all cursor-pointer">
        SDN.
        <a
          href="mailto:igwefran6@gmail.com"
          className="absolute text-[11px] font-normal bg-black text-white top-12 text-center rounded-lg w-36 bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          Contact developer
        </a>
      </div>

      <div className="absolute right-6 md:hidden z-50">
        <Icon
          onClick={() => {
            setMenu((prev) => !prev);
          }}
          path={icon}
          size="32px"
          color="white"
          ref={menuToggleRef}
        />
      </div>
      <MenuForSm menu={menu} setMenu={setMenu} menuToggleRef={menuToggleRef} />
      <nav className="max-sm:hidden">
        <ul className="flex space-x-4 font-semibold">
          <LinkButton text="Home" path="/" />
          <div ref={learningGuideRef}>
            <LinkButton
              text="Digital security guide"
              extraStyles="dropdown"
              handleClick={handlelearningGuide}
            />
            <span
              className={
                `absolute w-48 bg-white rounded-lg p-4 flex-col gap-1 shadow-lg ` +
                (learningGuide ? "flex" : "hidden")
              }
            >
              {" "}
              <Link
                to="/get-started"
                className="w-full text-white  bg-gray-900 block rounded-lg px-2 py-1 hover:scale-105 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/learning-path"
                className="w-full text-white  bg-gray-900 block rounded-lg px-2 py-1 hover:scale-105 transition-all"
              >
                Learning path
              </Link>
            </span>
          </div>

          <div ref={learningToolsRef}>
            <LinkButton
              text="SDN tools"
              extraStyles="dropdown"
              handleClick={handleOpenLearningTools}
            />
            <span
              className={
                `absolute w-48 bg-white rounded-lg p-4 flex-col gap-1 shadow-lg ` +
                (learningTools ? "flex" : "hidden")
              }
            >
              <Link
                to="/quiz"
                className="w-full text-white  bg-gray-900 block rounded-lg px-2 py-1 hover:scale-105 transition-all"
              >
                Security Test
              </Link>
              <Link
                to="/passgen"
                className="w-full text-white  bg-gray-900 block rounded-lg px-2 py-1 hover:scale-105 transition-all"
              >
                Password Gen
              </Link>
              <Link
                to="/passcheck"
                className="w-full text-white  bg-gray-900 block rounded-lg px-2 py-1 hover:scale-105 transition-all"
              >
                Password Checker
              </Link>
            </span>
          </div>

          <LinkButton text="Feedback" path="/feedback" />
          <LinkButton text="About" path="/about" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
