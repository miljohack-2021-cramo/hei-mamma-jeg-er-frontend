import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import Icon from './Icon';

type SidebarLinkProps = {
  route: string,
  name: string,
  icon: string
}

const SidebarLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  row-gap: 10px;
`

const NavIcon = styled.div`
  display: flex;
  padding: 10px;
  filter: drop-shadow(0 0 0.75rem black);
  background-color: hsl(0, 0%, 16%);
  place-self: center;
  height: 50px;
  width: 50px;
  color: white;
  &:hover {
    background-color: hsl(0, 0%, 20%);
  }
  .active &{
    background-color: hsl(180, 2.7%, 93%);
    color: rgb(185, 44, 10)
  }
`

const NavName = styled.div`
  color: #A7A8A9;
  font-size: 0.8rem;
`

const SidebarLink = ({route, name, icon}: SidebarLinkProps) => {
  return (
    <SidebarLinkWrapper>
      <StyledNavLink to={route}>
        <NavIcon>
          <Icon icon={icon} size={50} color="currentColor" /> 
        </NavIcon>
        <NavName>
          {name}
        </NavName>
      </StyledNavLink>
    </SidebarLinkWrapper>
  );
}

export default SidebarLink;