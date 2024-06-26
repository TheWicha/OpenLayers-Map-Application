"use client";
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import MenuItem from "./menu-item";
import { useDispatch } from "react-redux";
import { updateGeometry } from "@/src/redux/slices/geometrySlice";
import { startDrawing } from "@/src/redux/slices/drawSlice";
import { GeometryType } from "@/src/types";
import GeometryCreationForm from "@/src/components/GeometryCreationForm";
import { updateWtk } from "@/src/redux/slices/wtkSlice";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const dispatch = useDispatch();

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const geometry = e.currentTarget.name as GeometryType;
    setSelectedItem(geometry);
    dispatch(updateGeometry(geometry));
    dispatch(startDrawing());
    dispatch(updateWtk({ coordinates: "" }));
  };

  return (
    <div className="h-full">
      <ResizableBox
        width={400}
        height={700}
        minConstraints={[400, 700]}
        maxConstraints={[800, 700]}
        resizeHandles={["e"]}
      >
        <div className="w-full py-8 px-4 flex gap-4 flex-col items-center">
          {selectedItem === "Point" ? (
            <GeometryCreationForm />
          ) : (
            <MenuItem title="Point" onClick={handleItemClick} />
          )}
          {selectedItem === "LineString" ? (
            <GeometryCreationForm />
          ) : (
            <MenuItem title="LineString" onClick={handleItemClick} />
          )}
          {selectedItem === "Polygon" ? (
            <GeometryCreationForm />
          ) : (
            <MenuItem title="Polygon" onClick={handleItemClick} />
          )}
        </div>
      </ResizableBox>
    </div>
  );
};

export default Menu;
