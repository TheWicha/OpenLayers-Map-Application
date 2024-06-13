"use client";
import React from "react";
import { ResizableBox } from "react-resizable";
import MenuItem from "./menu-item";

const Menu = () => {
  return (
    <div className="h-full">
      <ResizableBox
        width={200}
        height={window.innerHeight}
        minConstraints={[200, 1000]}
        maxConstraints={[400, window && window.innerHeight]}
        resizeHandles={["e"]}
      >
        <div className="w-full p-8 flex gap-4 flex-col cursor-pointer">
          <MenuItem title="Point" />
          <MenuItem title="LineString" />
          <MenuItem title="Polygon" />
        </div>
      </ResizableBox>
    </div>
  );
};

export default Menu;
