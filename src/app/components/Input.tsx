import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  classname?: string;
}

export const Input = ({ id, classname, ...props }: InputProps) => {
  return (
    <div className="flex gap-3 items-center">
      {id && (
        <label className="ml-auto w-[25%]" htmlFor={id}>
          {id}
        </label>
      )}
      <input
        className={`border-1 border-highlight2 rounded-lg p-1
          focus:border-highlight2Light bg-gray-200 
          placeholder-gray-400 w-[75%] ${classname}`}
        {...props}
      ></input>
    </div>
  );
};
