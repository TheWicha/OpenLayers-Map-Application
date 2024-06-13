"use client";
import React from "react";
import { ResizableBox } from "react-resizable";

interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  return (
    <div className={className}>
      <ResizableBox
        width={200}
        height={window.innerHeight}
        minConstraints={[200, 1000]}
        maxConstraints={[400, window && window.innerHeight]}
        resizeHandles={["e"]}
      ></ResizableBox>
    </div>
  );
};

export default Menu;
