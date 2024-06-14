import React, { useEffect, useRef, useCallback } from "react";
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
import { useDispatch } from "react-redux";
import { updateWtk } from "@/src/redux/slices/wtkSlice";
import Feature from "ol/Feature";
interface useMapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  shouldInitiateDrawing: boolean;
  geometryType: GeometryType;
}
const useMap = ({
  mapContainerRef,
  shouldInitiateDrawing,
  geometryType,
}: useMapProps) => {
  const initialMapRef = useRef<Map | null>(null);
  const drawRef = useRef<Draw | null>(null);

  useGeographic();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentMapRef = mapContainerRef.current;
    if (mapContainerRef.current) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      initialMapRef.current = new Map({
        target: mapContainerRef.current,
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
        type: geometryType,
      });
      const wktFormat = new WKT();

      drawRef.current.on("drawend", (event) => {
        const geometry = event.feature.getGeometry();
        if (geometry) {
          const wkt = wktFormat.writeGeometry(geometry);
          dispatch(updateWtk({ coordinates: wkt }));
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
  }, [mapContainerRef, geometryType]);

  useEffect(() => {
    if (initialMapRef.current && drawRef.current) {
      if (shouldInitiateDrawing) {
        initialMapRef.current.addInteraction(drawRef.current);
      } else {
        initialMapRef.current.removeInteraction(drawRef.current);
      }
    }
  }, [shouldInitiateDrawing, initialMapRef, drawRef]);

  const clearDrawings = useCallback(() => {
    if (initialMapRef.current) {
      const layers = initialMapRef.current.getLayers().getArray();
      const vectorLayer = layers.find(
        (layer) => layer instanceof VectorLayer
      ) as VectorLayer<Feature>;
      if (vectorLayer) {
        const vectorSource = vectorLayer.getSource() as VectorSource<Feature>;
        vectorSource.clear();
      }
    }
  }, [initialMapRef]);

  return { map: initialMapRef.current, clearDrawings };
};

export default useMap;
