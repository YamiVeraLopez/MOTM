import React from "react";

export const Input = ({id, type, placeholder, value, name, cb, icon, autoComplete}) => {
  return (
    <div className="flex justify my-2">
      <label htmlFor={id}>
        <img
          src={icon}
          alt={name}
          className="w-10 h-9 py-1.5 bg-gradient-to-br from-violet-700 to-pink-400 hover:from-pink-400 hover:to-violet-700 rounded-l-md text-pink-50"
        />
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        autoComplete={autoComplete}
        onChange={cb}
        className="placeholder:italic placeholder:text-violet-300 block bg-white w-full border border-b-violet-700 rounded-r-md py-1 pl-5 pr-3 shadow-sm shadow-purple-500 focus:outline-none  focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm font-serif text-xs text-pink-900"
      />
    </div>
  );
};
