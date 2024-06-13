"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";

const MapComponent = () => {
  const mapRef = useRef(null);
  const initialMapRef = useRef<Map | null>(null);

  useGeographic();

  useEffect(() => {
    if (mapRef.current) {
      initialMapRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [19.1451, 51.9194],
          zoom: 7,
        }),
      });
      initialMapRef.current.updateSize();
    }
    return () => {
      if (mapRef.current && initialMapRef.current) {
        initialMapRef.current.setTarget(undefined);
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapComponent;
