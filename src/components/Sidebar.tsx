import SidebarLink from './SidebarLink';
import { Colors } from '../theme/colors';
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  background-color: ${Colors.sidebarColor};
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`


const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarLink 
        route='insights'
        name="Insights"
        icon='insights'
      />
      <SidebarLink
        route='/safety'
        name='Safety'
        icon='safety'
      />
      <SidebarLink
        route='/sustainability'
        name='Sustainability'
        icon='leaf'
      />
      <SidebarLink
        route='/productivity'
        name='Productivity'
        icon='productivity'
      />
      <SidebarLink
        route='/'
        name='Local environment'
        icon='building'
      />
    </SidebarWrapper>
  );
}

export default Sidebar;
