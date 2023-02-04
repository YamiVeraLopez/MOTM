import React from "react";

export const Button = ({ info }) => {
  return (
    <button
      type="submit"
      className="w-full py-3 my-3 text-violet-800 uppercase font-mono font-bold bg-transparent border-2 border-violet-800 rounded-2xl content-center justify-center hover:bg-violet-600 hover:border-transparent hover:text-pink-100 transition-colors mb-4 shadow-violet-400 shadow-md"
    >
      {info}
    </button>
  );
};
