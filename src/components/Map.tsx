import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import styled from 'styled-components'

const StyledMapContainer = styled(MapContainer)`
  height: 500px;
  width: 100%;
`

function Map() {
    return (
        <StyledMapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </StyledMapContainer>
    )
}

export default Map
