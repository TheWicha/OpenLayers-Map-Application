"use client";
import React, { useEffect, useRef } from "react";
import useMap from "@/src/hooks/useMap";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { initiateDrawings } from "@/src/redux/slices/cleanDrawingsSlice";
import { useDispatch } from "react-redux";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const selectedGeometry = useSelector((state: RootState) => state.geometry);
  const drawingState = useSelector((state: RootState) => state.draw);
  const shouldClearMapDrawings = useSelector(
    (state: RootState) => state.clean.shouldCleanDrawing
  );
  const dispatch = useDispatch();

  const { clearDrawings } = useMap({
    mapContainerRef,
    shouldInitiateDrawing: drawingState.shouldStartDrawing,
    geometryType: selectedGeometry.type,
  });

  useEffect(() => {
    if (shouldClearMapDrawings) {
      clearDrawings();
      dispatch(initiateDrawings());
    }
  }, [shouldClearMapDrawings]);

  return <div ref={mapContainerRef} className="w-full h-screen" />;
};

export default MapComponent;
