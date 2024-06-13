"use client";
import React, { useRef } from "react";
import useMap from "@/hooks/useMap";

const MapComponent = () => {
  const mapRef = useRef(null);
  useMap(mapRef);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapComponent;
