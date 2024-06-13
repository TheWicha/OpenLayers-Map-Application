"use client";
import React, { useEffect, useRef } from "react";
import useMap from "@/src/hooks/useMap";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { startDrawings } from "@/src/redux/slices/cleanDrawingsSlice";
import { useDispatch } from "react-redux";

const MapComponent = () => {
  const mapRef = useRef(null);
  const currentGeometry = useSelector((state: RootState) => state.geometry);
  const draw = useSelector((state: RootState) => state.draw);
  const shouldClean = useSelector(
    (state: RootState) => state.clean.shouldCleanDrawing
  );
  const dispatch = useDispatch();

  const { clearDrawings } = useMap({
    mapRef,
    shouldStartDrawing: draw.shouldStartDrawing,
    geometry: currentGeometry.type,
  });

  useEffect(() => {
    if (shouldClean) {
      clearDrawings();
      dispatch(startDrawings());
    }
  }, [shouldClean]);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapComponent;
