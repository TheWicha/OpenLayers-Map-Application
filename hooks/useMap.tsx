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
import { PolandGeoCoordinates } from "@/constants";

const useMap = (
  mapRef: React.RefObject<HTMLDivElement>,
  setWKT: (wkt: string) => void
) => {
  const initialMapRef = useRef<Map | null>(null);

  useGeographic();

  useEffect(() => {
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

      const draw = new Draw({
        source: vectorSource,
        type: "Point",
      });

      const wktFormat = new WKT();

      draw.on("drawend", (event) => {
        const geometry = event.feature.getGeometry();
        if (geometry) {
          const wkt = wktFormat.writeGeometry(geometry);
          setWKT(wkt);
        }
      });

      initialMapRef.current.addInteraction(draw);

      initialMapRef.current.updateSize();
    }
    return () => {
      if (mapRef.current && initialMapRef.current) {
        initialMapRef.current.setTarget(undefined);
      }
    };
  }, [mapRef, setWKT]);

  return initialMapRef.current;
};

export default useMap;
