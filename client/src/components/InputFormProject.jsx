import React from "react";

export const InputFormProject = ({
  id,
  type,
  label,
  placeholder,
  cb,
  name,
  value,
  reference
}) => {
    
  return (
    <div className="my-2 m-auto flex flex-wrap justify-center items-center">
      <label
        htmlFor={id}
        className="font-serif font-medium text-purple-700 text-md w-full text-start ml-4"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={cb}
        ref={reference}
        className="placeholder:italic placeholder:text-violet-300 block bg-pink-100 w-full border border-b-violet-700 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none  focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm font-serif text-xs text-pink-900 m-2 max-w-lg"
      />
    </div>
  );
};
