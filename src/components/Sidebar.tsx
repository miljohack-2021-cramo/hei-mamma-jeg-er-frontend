import SidebarLink from './SidebarLink';
import { Colors } from '../theme/colors';
import styled from 'styled-components'
import { useTranslation } from "react-i18next";
import i18n from '../translations/i18n';


const SidebarWrapper = styled.div`
  grid-area: sidebar;
  background-color: ${Colors.sidebarColor};
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  height: 100%;
`

const LanguagePicker = styled.div`
  display: flex;
  button {
    background-color: #727272
  }
`

const setNorwegian = () => {
  i18n.changeLanguage("no");
}
const setEnglish= () => {
  i18n.changeLanguage("en");
}
const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <SidebarWrapper>
      <LanguagePicker>
        <button onClick={setNorwegian}>NO</button>
        <button onClick={setEnglish}>EN</button>
      </LanguagePicker>
      <SidebarLink 
        route='insights'
        name={t("insights")}
        icon='insights'
      />
      <SidebarLink
        route='/safety'
        name={t('safety')}
        icon='safety'
      />
      <SidebarLink
        route='/sustainability'
        name={t('sustainability')}
        icon='leaf'
      />
      <SidebarLink
        route='/productivity'
        name={t('productivity')}
        icon='productivity'
      />
      <SidebarLink
        route='/'
        name={t('localEnvironment')}
        icon='building'
      />
    </SidebarWrapper>
  );
}

export default Sidebar;
