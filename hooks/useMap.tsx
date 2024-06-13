"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";
import { PolandGeoCoordinates } from "@/constants";

const useMap = (mapRef: React.RefObject<HTMLDivElement>) => {
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
          center: PolandGeoCoordinates,
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
  }, [mapRef]);

  return initialMapRef.current;
};

export default useMap;
