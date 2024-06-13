"use client";
import React, { useRef, useState } from "react";
import useMap from "@/hooks/useMap";

const MapComponent = () => {
  const [wtk, setWtk] = useState("");

  const mapRef = useRef(null);
  useMap({ mapRef, setWtk, shouldStartDrawing: false });

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapComponent;
