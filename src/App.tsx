import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { Outlet } from "react-router-dom";

import styled from 'styled-components'

const AppWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "sidebar main sidebar_right";
  grid-template-columns: 150px 1fr 50px;
`

function App() {
  return (
    <AppWrapper
      className="App"
    >
      <Sidebar />
      <Outlet />
    </AppWrapper>
  );
}

export default App;
