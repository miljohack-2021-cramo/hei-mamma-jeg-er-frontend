import React, { CSSProperties } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const mapStyle: CSSProperties = {
    height: "500px",
    width: "100%"
  }

function Map() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={mapStyle} >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
    )
}

export default Map
