import React from "react";

interface InputProps {
  setVal: (name: string, val: string) => void;
  value: string;
  type: "text" | "date";
  disabled?: boolean;
  name: string;
  title: string;
}

const Input = ({ setVal, value, type, name, disabled, title }: InputProps) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <label className="flex flex-col items-center">
      {title}:
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => setVal(e.target.name, e.target.value)}
        className="border p-4 rounded-md w-72 "
        required
        disabled={disabled}
        min={type === "date" ? today : undefined}
      />
    </label>
  );
};

export default Input;
