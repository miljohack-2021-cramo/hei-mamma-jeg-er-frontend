import { HeatmapLayer, Point } from 'maplibre-gl';
import React, { CSSProperties, useEffect, useState } from 'react'
import ReactMapGL, { InteractiveMapProps, Layer, LayerProps, Source } from 'react-map-gl';

type MapProps = {
  data: GeoJSON.FeatureCollection,
  layer: LayerProps,
  position: {
    latitude: number,
    longitude: number
  }
}

const MapComponent: React.FC<MapProps> = ({data, layer, position}) => {

  const [viewport, setViewport] = useState<InteractiveMapProps>({
    width: "100%",
    height: "100%",
    latitude: position.latitude,
    longitude: position.longitude,
    zoom: 8
  });


  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport: React.SetStateAction<InteractiveMapProps>) => setViewport(nextViewport)}
      >
        <Source id="heatmap" type="geojson" data={data}>
          <Layer {...layer} />
        </Source>
      </ReactMapGL>

    </div>
  );

}

export default MapComponent
