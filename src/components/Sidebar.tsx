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
  padding-top: 30px;
`


const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarLink 
        route='/'
        name="Insights"
        icon='leaf'
      />
      <SidebarLink
        route='local'
        name='Local environment'
        icon='building'
      />
    </SidebarWrapper>
  );
}

export default Sidebar;