import React from "react";

interface MenuItemProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <button
      name={title}
      onClick={onClick}
      className="text-center  cursor-pointer hover:bg-blue-100 bg-blue-200 p-4 rounded-md max-w-60"
    >
      {title}
    </button>
  );
};

export default MenuItem;
