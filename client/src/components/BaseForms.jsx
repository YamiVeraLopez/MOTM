import React from "react";
import imgLogo from "../../public/motm.png";

export const BaseForms = ({ children }) => {
  return (
    <div className="container flex justify-center items-center mx-auto mt-20 md:mt-10 p-5 md:flex md:justify-center ">
      <div className="w-full md:w-2/3 lg:w-1/2 ">
        <div className="w-full p-10 max-w-auto h-min mx-auto  backdrop-blur-sm bg-white/30 shadow-violet-400 rounded-3xl shadow-lg items-center">
          <div className="w-40 h-40 rounded-full shadow-violet-400 shadow-lg">
            <img
              src={imgLogo}
              alt="Logo"
              className="object-contain w-40 h-40 rounded-full"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
