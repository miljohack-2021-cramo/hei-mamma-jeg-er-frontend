import { HeatmapLayer } from 'maplibre-gl';
import React, { useEffect, useState } from 'react'
import { LayerProps } from 'react-map-gl';
import MapComponent from './MapComponent';

import {default as geojsonimport} from '../../data/ensjo_geo.json'

type MyFeatureCollection = {
    type: "FeatureCollection";
    features: {
        type: "Feature",
        properties: {
            Time: string,
            PWL: number
        },
        geometry: GeoJSON.Geometry
    }[]
}

const datestringToNumber = (date: string) => {
    return new Date(date).getTime()
}

const numberToDateString = (date: number) => {
    return new Date(date).toISOString()
}

const geojson = geojsonimport as MyFeatureCollection

const getRandomPoint = (existingpoints: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[], value?: number | null | undefined): GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] => {
    var myVal = value || Math.random() * 100
    var loc = [10.655311295948188 + Math.random() * 0.02 - 0.01, 59.96453634871345 + Math.random() * 0.02 - 0.01]
    var newPoints = JSON.parse(JSON.stringify(existingpoints))
    newPoints.push({ type: 'Feature', properties: { dbh: myVal }, geometry: { type: 'Point', coordinates: loc } })
    console.log("getting random point")
    return newPoints
}

export default function HeatMap() {

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
            ['get', 'PWL'],
            0,
            0,
            50,
            0,
            60,
            60,
            90,
            90
          ],
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [17, 1],
              [18, 0]
            ]
          }
        }
    }

    const [data, setData] = useState<GeoJSON.FeatureCollection>(heatmapgeojson)
    const [sliderValue, setSliderValue] = useState<number>(0)
    const [play, setPlay] = useState<boolean>(false)

    const getPointsFromSlider = () => {
        var point = geojson.features[sliderValue]
        var points = geojson.features.slice(Math.max(sliderValue-10, 0), Math.min(sliderValue+10, geojson.features.length-1))
        setData({
            type: "FeatureCollection",
            features: points
        })
    }

    useEffect(() => {
        getPointsFromSlider()
    }, [sliderValue])

    useEffect(() => {
        const interval = setInterval(() => {
            setSliderValue(sliderValue+1)
            }, 1000);
        
        return () => clearInterval(interval);
      }, [play, sliderValue]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         var pointCopy: GeoJSON.FeatureCollection = JSON.parse(JSON.stringify(data))
    //         pointCopy.features = pointCopy.features.map((it) => { return { type: 'Feature', properties: { dbh: Math.random() * 120 }, geometry: it.geometry } }
    //         )
    //         setData(pointCopy)
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);

    return (    
        <div>
            <MapComponent data={data} layer={heatmapLayer} position={{latitude: 59.91482322866911, longitude: 10.786977764774699}}/>
            {geojson.features[0].properties.Time}
            <input type="range" min="0" max={geojson.features.length-1 }  onChange={(e) => setSliderValue(parseInt(e.target.value))}></input>
            {geojson.features[geojson.features.length-1].properties.Time}
            Current date: 
            {geojson.features[sliderValue].properties.Time}
        </div>
    )
}
