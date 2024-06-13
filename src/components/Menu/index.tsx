"use client";
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import MenuItem from "./menu-item";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedItem(e.currentTarget.name);
  };

  return (
    <div className="h-full">
      <ResizableBox
        width={200}
        height={window.innerHeight}
        minConstraints={[200, 1000]}
        maxConstraints={[400, window && window.innerHeight]}
        resizeHandles={["e"]}
      >
        <div className="w-full p-8 flex gap-4 flex-col">
          {selectedItem === "Point" ? (
            <div>form for Point</div>
          ) : (
            <MenuItem title="Point" onClick={handleItemClick} />
          )}
          {selectedItem === "LineString" ? (
            <div>form for LineString</div>
          ) : (
            <MenuItem title="LineString" onClick={handleItemClick} />
          )}
          {selectedItem === "Polygon" ? (
            <div>form for Polygon</div>
          ) : (
            <MenuItem title="Polygon" onClick={handleItemClick} />
          )}
        </div>
      </ResizableBox>
    </div>
  );
};

export default Menu;
