import React from "react";

interface MenuItemProps {
  title: string;
}

const MenuItem = ({ title }: MenuItemProps) => {
  return (
    <div className="text-center hover:bg-blue-100 bg-blue-200 p-4 rounded-md max-w-60">
      {title}
    </div>
  );
};

export default MenuItem;
