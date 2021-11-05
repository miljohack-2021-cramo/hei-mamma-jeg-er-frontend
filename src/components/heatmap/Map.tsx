import { HeatmapLayer, Point } from 'maplibre-gl';
import React, { CSSProperties, useEffect, useState } from 'react'
import ReactMapGL, { InteractiveMapProps, Layer, LayerProps, Source } from 'react-map-gl';

const mapStyle = {
  height: "500px",
  width: "100%"
}

const getRandomPoint = (existingpoints: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] , value?: number | null | undefined): GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] => {
  var myVal = value || Math.random() * 100
  var loc = [10.655311295948188 + Math.random() * 0.02 - 0.01, 59.96453634871345 + Math.random() * 0.02 - 0.01]
  var newPoints = JSON.parse(JSON.stringify(existingpoints))
  newPoints.push({ type: 'Feature', properties: { dbh: myVal }, geometry: { type: 'Point', coordinates: loc } })
  console.log("getting random point")
  return newPoints
}

function Map() {

  const [pointData, setPointData] = useState<GeoJSON.Point | null>(null);

  const [viewport, setViewport] = useState<InteractiveMapProps>({
    width: 400,
    height: 400,
    latitude: 59.96453634871345,
    longitude: 10.655311295948188,
    zoom: 8
  });

  const heatmapgeojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: { dbh: 54 }, geometry: { type: 'Point', coordinates: [10.655311295948188, 59.96453634871345] } },
      { type: 'Feature', properties: { dbh: 100 }, geometry: { type: 'Point', coordinates: [10.645311295948188, 59.95453634871345] } },
      { type: 'Feature', properties: { dbh: 2 }, geometry: { type: 'Point', coordinates: [10.645311295948188, 59.96453634871345] } },
      { type: 'Feature', properties: { dbh: 35 }, geometry: { type: 'Point', coordinates: [10.655311295948188, 59.95453634871345] } },
      { type: 'Feature', properties: { dbh: 87 }, geometry: { type: 'Point', coordinates: [10.655311295948188, 59.97453634871345] } }
    ]
  };

  const heatmapLayer: HeatmapLayer & LayerProps = {
    id: 'test-heatmap',
    type: 'heatmap',
    paint: {
      // increase weight as diameter breast height increases
      'heatmap-weight': 1,
      // increase intensity as zoom level increases
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3]
        ]
      },
      // assign color values be applied to points depending on their density
      'heatmap-color': [
        'step',
        ['heatmap-density'],
        'rgba(236,222,239,0)',
        0.2,
        '#F1CAC1',
        0.4,
        '#DC9584',
        0.6,
        '#CA6147',
        0.8,
        '#B92C0A'
      ],
      // increase radius as zoom increases
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['get', 'dbh'],
        0,
        0,
        30,
        30,
        60,
        60,
        90,
        90
      ],
      // decrease opacity to transition into the circle layer
      'heatmap-opacity': {
        default: 1,
        stops: [
          [14, 1],
          [15, 0]
        ]
      }
    }

  }

  const [points, setPoints] = useState<GeoJSON.FeatureCollection>(heatmapgeojson)

  useEffect(() => {
    const interval = setInterval(() => {
      var pointCopy: GeoJSON.FeatureCollection = JSON.parse(JSON.stringify(points))
      pointCopy.features = pointCopy.features.map((it, index) =>       
        {return {type: 'Feature', properties: { dbh: Math.random()*120 }, geometry: it.geometry }}
      )
      setPoints(pointCopy)
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport: React.SetStateAction<InteractiveMapProps>) => setViewport(nextViewport)}
      >
        <Source id="heatmap" type="geojson" data={points}>
          <Layer {...heatmapLayer} />
        </Source>
      </ReactMapGL>
      <button onClick={() => setPoints({
        type: 'FeatureCollection',
        features: getRandomPoint(points.features)
      })}>Click me</button>
    </div>
  );

}

export default Map
