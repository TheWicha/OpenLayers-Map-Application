import React, { useCallback } from "react";

interface InputProps {
  setVal: (name: string, val: string) => void;
  value: string | string[];
  type: "text" | "date" | "textarea";
  disabled?: boolean;
  name: string;
  title: string;
}

const Input = ({ setVal, value, type, name, disabled, title }: InputProps) => {
  const today = new Date().toISOString().split("T")[0];

  const handleChange = useCallback(
    (e: { target: { name: string; value: string } }) =>
      setVal(e.target.name, e.target.value),
    [setVal]
  );

  if (type === "textarea") {
    return (
      <label className="flex flex-col items-center">
        {title}:
        <textarea
          name={name}
          value={value}
          className="border p-4 rounded-md w-full resize max-w-full max-h-full  min-h-24"
          required
          disabled={disabled}
          rows={5}
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
          value={value}
          onChange={handleChange}
          className="border p-4 rounded-md w-full "
          required
          disabled={disabled}
          min={type === "date" ? today : undefined}
        />
      </label>
    );
  }
};

export default Input;
