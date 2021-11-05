import './App.css';
import Sidebar from './components/Sidebar';
import { Outlet } from "react-router-dom";

import styled from 'styled-components'

const AppWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas: "sidebar main sidebar_right";
  grid-template-columns: 200px 1fr 50px;
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
