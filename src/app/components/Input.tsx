import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const Input = ({ id, ...props }: InputProps) => {
  return (
    <div className="flex gap-3 items-center">
      <label className="ml-auto" htmlFor={id}>
        {id}
      </label>
      <input
        className="border-1 border-highlight1 rounded-lg p-1
          focus:border-highlight1Light bg-gray-200 w-50"
        {...props}
      ></input>
    </div>
  );
};
