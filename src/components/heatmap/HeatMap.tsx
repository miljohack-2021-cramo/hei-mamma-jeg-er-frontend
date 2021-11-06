import { HeatmapLayer } from 'maplibre-gl';
import React, { useEffect, useState } from 'react'
import { LayerProps } from 'react-map-gl';
import MapComponent from './MapComponent';
import { useTranslation } from "react-i18next";
import { default as geojsonimport } from '../../data/ensjo_geo.json'
import SocketComponent from './SocketComponent';
import { Colors } from '../../theme/colors';

type MyFeatureCollection = {
    type: "FeatureCollection";
    features: {
        type: "Feature",
        properties: {
            Time: string,
            PWL: number,
            Max_Sum_po: number,
            Max_Sum_em: number,
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

    const { t } = useTranslation();

    const heatmapgeojson: MyFeatureCollection = {
        type: 'FeatureCollection',
        features: []
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
                100,
                90,
                250
            ],
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
                default: 0.8,
                stops: [
                    [19, 0.8],
                    [20, 0]
                ]
            }
        }
    }

    const [data, setData] = useState<MyFeatureCollection>(heatmapgeojson)
    const [sliderValue, setSliderValue] = useState<number>(0)
    const [play, setPlay] = useState<boolean>(true)
    const [speed, setSpeed] = useState<number>(100)

    const getPointsFromSlider = () => {
        var point = geojson.features[sliderValue]
        var points = geojson.features.slice(Math.max(sliderValue - 10, 0), Math.min(sliderValue + 10, geojson.features.length - 1))
        setData({
            type: "FeatureCollection",
            features: points
        })
    }

    useEffect(() => {
        getPointsFromSlider()
    }, [sliderValue])

    const moveSlider = () => {
        setSliderValue(Math.min(sliderValue + 1, geojson.features.length - 1))
    }

    useEffect(() => {
        const interval = setInterval((play) ? moveSlider : () => { }, speed);

        return () => clearInterval(interval);
    }, [play, sliderValue, speed]);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative"}} id="hellomamma">
            <div style={{ display: 'flex', height: "100%" }}>
                <MapComponent data={data} layer={heatmapLayer} position={{ latitude: 59.91482322866911, longitude: 10.786977764774699 }} zoom={14} />
                <div style={{ display: 'flex', paddingLeft: '10px', flexDirection: 'row', gap: '50px',position: 'absolute', top: "450px"}}>
                    <div style={{background: "white", padding:"20px", width: "200px"}}>
                        <span style={{marginRight: "5px"}}>
                            People affected: 
                        </span>
                        <span>
                            {Math.ceil(data.features.map((it) => it.properties.Max_Sum_po).reduce((prev, cur) => Math.max(prev, cur), 0))}
                        </span>
                    </div>
                    <div style={{background: "white", padding:"20px", width: "200px"}}>
                        <span style={{marginRight: "5px"}}>
                            Employees affected: 
                        </span>
                        <span>
                            {Math.ceil(data.features.map((it) => it.properties.Max_Sum_em).reduce((prev, cur) => Math.max(prev, cur), 0))}
                        </span>
                    </div>
                    {/*
                    <div style={{ width: "10em", height: "10em", backgroundColor: Colors.sidebarColor, color: "whitesmoke", display: 'flex' }}>
                        <span style={{ marginBottom: 0 }}>{t('peopleAtHome')}: </span>
                        <span style={{ width: "100%", height: "fitContent", alignSelf: "center", textAlign: "center" }}>
                            {Math.ceil(data.features.map((it) => it.properties.Max_Sum_po).reduce((prev, cur) => Math.max(prev, cur), 0))}
                        </span>
                    </div>
                    <div style={{ width: "10em", height: "10em", backgroundColor: Colors.sidebarColor, color: "whitesmoke", display: 'flex' }}>
                        <h2 style={{ marginBottom: 0 }}>{t('peopleAtWork')}</h2>
                        <div style={{ width: "100%", height: "fitContent", alignSelf: "center", textAlign: "center" }}>
                            {Math.ceil(data.features.map((it) => it.properties.Max_Sum_em).reduce((prev, cur) => Math.max(prev, cur), 0))}
                        </div>
                    </div>
                    */}
                </div>
            </div>
            <div>
                <div style={{ display: "flex" }}>
                    <button style={{ width: "5%" }} onClick={() => setPlay(!play)}>{(play) ? "Pause" : "Start"}</button>
                    <button disabled={speed >= 1000} style={{ width: "5%" }} onClick={() => setSpeed(Math.min(speed * 10, 1000))}>{t('slower')}</button>
                    <button disabled={speed <= 0.001} style={{ width: "5%" }} onClick={() => setSpeed(Math.max(speed / 10, 0.001))}>{t('faster')}</button>
                    <input type="range" value={sliderValue} min="0" max={geojson.features.length - 1} style={{ width: "84%" }} onChange={(e) => setSliderValue(parseInt(e.target.value))}></input>
                </div>
                <div style={{ width: "100%" }}>
                    <span style={{ marginLeft: Math.max(10, Math.min((sliderValue / (geojson.features.length)) * 100, 80)) + "%" }}>{geojson.features[sliderValue].properties.Time}</span>
                </div>
                {/* <span style={{ float: "left" }}>{geojson.features[0].properties.Time}</span>
                <span style={{ float: "right" }}>{geojson.features[geojson.features.length - 1].properties.Time}  </span> */}
            </div>
            {/* <SocketComponent/> */}
        </div>
    )
}
