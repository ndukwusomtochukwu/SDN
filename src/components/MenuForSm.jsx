import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function MenuForSm({ menu, setMenu, menuToggleRef }) {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleCloseSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenu((prev) => !prev);
      }
      if (sidebarRef.current && menuToggleRef.current.contains(event.target)) {
        setMenu((prev) => !prev);
      }
    };
    document.addEventListener("mousedown", handleCloseSidebar);
    return () => document.removeEventListener("mousedown", handleCloseSidebar);
  }, []);
  return (
    menu && (
      <div
        ref={sidebarRef}
        className="fixed right-0 top-0 w-2/3 h-[600px] bg-slate-700 px-4 py-20 md:hidden flex flex-col gap-2 justify-center items-start rounded-bl-3xl text-[20px] font-semibold"
      >
        <Link to="/">Home</Link>
        <button className="" onClick={() => setX((prev) => !prev)}>
          Digital Security Guide
        </button>
        <div
          className={"overflow-hidden transition-all " + (!x ? "h-0" : "h-24")}
        >
          <span className="p-4 mr-2  bg-blue-400 dark:bg-slate-600 text-sm flex flex-col gap-1">
            <Link to="/get-started">Get started</Link>
            <Link to="/learning-path">Learning path</Link>
          </span>
        </div>
        <button className="" onClick={() => setY((prev) => !prev)}>
          SDN Tools
        </button>
        <div
          className={"overflow-hidden transition-all " + (!y ? "h-0" : "h-18")}
        >
          <span className="p-4 mr-2  bg-blue-400 dark:bg-slate-600 text-sm flex flex-col gap-1">
            <Link to="/quiz">Quiz</Link>
            <Link to="/passgen">Password Generator</Link>
            <Link to="/passcheck">Password Checker</Link>
          </span>
        </div>
        <Link to="/feedback">Feedback</Link>
        <Link to="/about">About</Link>
      </div>
    )
  );
}

export default MenuForSm;
