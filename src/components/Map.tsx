"use client";
import React, { useRef, useState } from "react";
import useMap from "@/src/hooks/useMap";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const MapComponent = () => {
  const [wtk, setWtk] = useState("");
  const mapRef = useRef(null);
  const currentGeometry = useSelector((state: RootState) => state.geometry);

  useMap({
    mapRef,
    setWtk,
    shouldStartDrawing: false,
    geometry: currentGeometry.type,
  });

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapComponent;
