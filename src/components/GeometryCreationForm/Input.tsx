import React, { useState } from "react";

interface InputProps {
  type: "text" | "date" | "textarea";
  disabled?: boolean;
  name: string;
  title: string;
  wtkValue?: string[];
}

const Input = ({ type, name, disabled, title, wtkValue }: InputProps) => {
  if (type === "textarea") {
    return (
      <label className="flex flex-col items-center">
        {title}:
        <textarea
          name={name}
          className="border p-4 rounded-md w-full resize max-w-full max-h-full  min-h-24"
          required
          disabled={disabled}
          rows={5}
          value={wtkValue}
        />
      </label>
    );
  } else {
    return (
      <label className="flex flex-col items-center">
        {title}:
        <input
          name={name}
          type={type}
          className="border p-4 rounded-md w-full "
          required
          disabled={disabled}
        />
      </label>
    );
  }
};

export default Input;
