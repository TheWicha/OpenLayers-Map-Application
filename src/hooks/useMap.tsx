import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import WKT from "ol/format/WKT";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";
import { PolandGeoCoordinates } from "@/src/constants";
import { GeometryType } from "@/src/types";

interface useMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  setWtk: (wkt: string) => void;
  shouldStartDrawing: boolean;
  geometry: GeometryType;
}
const useMap = ({
  mapRef,
  setWtk,
  shouldStartDrawing,
  geometry,
}: useMapProps) => {
  const initialMapRef = useRef<Map | null>(null);
  const drawRef = useRef<Draw | null>(null);

  useGeographic();

  useEffect(() => {
    const currentMapRef = mapRef.current;
    if (mapRef.current) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      initialMapRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: PolandGeoCoordinates,
          zoom: 7,
        }),
      });

      if (drawRef.current) {
        initialMapRef.current.removeInteraction(drawRef.current);
      }

      drawRef.current = new Draw({
        source: vectorSource,
        type: geometry,
      });
      const wktFormat = new WKT();

      drawRef.current.on("drawend", (event) => {
        const geometry = event.feature.getGeometry();
        if (geometry) {
          const wkt = wktFormat.writeGeometry(geometry);
          setWtk(wkt);
        }
      });

      initialMapRef.current.addInteraction(drawRef.current);

      initialMapRef.current.updateSize();
    }
    return () => {
      if (currentMapRef && initialMapRef.current) {
        initialMapRef.current.setTarget(undefined);
      }
    };
  }, [mapRef, setWtk, geometry]);

  useEffect(() => {
    if (initialMapRef.current && drawRef.current) {
      if (shouldStartDrawing) {
        initialMapRef.current.addInteraction(drawRef.current);
      } else {
        initialMapRef.current.removeInteraction(drawRef.current);
      }
    }
  }, [shouldStartDrawing, initialMapRef, drawRef]);

  return initialMapRef.current;
};

export default useMap;
