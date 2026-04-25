import React from "react";
import { useTheme } from "../../context/ThemeContext";
import avatarImg from "../../assets/profile.png";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 w-full h-[72px] lg:w-[103px] lg:h-screen bg-[#373B53] dark:bg-dark-100 lg:rounded-r-[20px] flex lg:flex-col justify-between items-center z-[200] transition-colors duration-300">
      {/* Logo Section */}
      <div className="relative w-[72px] h-[72px] lg:w-[103px] lg:h-[103px] bg-[#7C5DFA] rounded-r-[20px] overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-[50%] bg-[#9277FF] rounded-br-[20px]"></div>
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 26"
          className="z-10 relative scale-75 lg:scale-100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 11.581 20.513 0z"
            fill="white"
          />
        </svg>
      </div>

      <div className="flex lg:flex-col items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-6 lg:p-8 group"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 15.625a5.625 5.625 0 110-11.25 5.625 5.625 0 010 11.25zM10 0a.625.625 0 01.625.625v1.25a.625.625 0 01-1.25 0V.625A.625.625 0 0110 0zm6.625 2.75a.625.625 0 010 .884l-.884.884a.625.625 0 01-.884-.884l.884-.884a.625.625 0 01.884 0zM20 10a.625.625 0 01-.625.625h-1.25a.625.625 0 010-1.25h1.25A.625.625 0 0120 10zm-3.375 6.625a.625.625 0 01-.884 0l-.884-.884a.625.625 0 01.884-.884l.884.884a.625.625 0 010 .884zM10 20a.625.625 0 01-.625-.625v-1.25a.625.625 0 011.25 0v1.25A.625.625 0 0110 20zm-6.625-2.75a.625.625 0 010-.884l.884-.884a.625.625 0 01.884.884l-.884.884a.625.625 0 01-.884 0zM0 10a.625.625 0 01.625-.625h1.25a.625.625 0 010 1.25H.625A.625.625 0 010 10zm3.375-6.625a.625.625 0 01.884 0l.884.884a.625.625 0 01-.884.884l-.884-.884a.625.625 0 010-.884z"
                fill="#858BB2"
                className="group-hover:fill-gray-200 transition-colors"
              />
            </svg>
          ) : (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.373 3.038c-.5.124-.997.286-1.481.482a9.375 9.375 0 004.62 17.584c2.733 0 5.232-1.168 7-3.034a9.371 9.371 0 01-10.139-15.032z"
                fill="#7E88C3"
                className="group-hover:fill-gray-400 transition-colors"
              />
            </svg>
          )}
        </button>

        <div className="w-[1px] h-[72px] lg:w-full lg:h-[1px] bg-[#494E6E]"></div>

        <div className="px-6 lg:px-0 lg:py-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all">
            <img
              src={avatarImg}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
