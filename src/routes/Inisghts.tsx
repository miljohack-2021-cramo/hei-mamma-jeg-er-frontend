import styled from 'styled-components'
import Icon from '../components/Icon';
import ThresholdStatus from '../components/ThresholdStatus';
import { Box } from '../style'

const InsightsWrapper = styled.div`
  padding: 10px;
  display: grid;
  row-gap: 50px;
  grid-template-areas: 
    "welcome welcome"
    "sensor sensor"
    ;
  grid-template-rows: 100px 50px;
`

const WelcomeBox = styled(Box)`
  grid-area: welcome;
`

const Insights = () => {
  return (
    <InsightsWrapper>
      <WelcomeBox>
        <p>Forretningsutvikler</p>
        <p><strong>Hei, velkommen til en gjennomgang av Cramo Insights</strong></p>
      </WelcomeBox>
      <Box>
        <ThresholdStatus />
      </Box>
    </InsightsWrapper>
  );
}

export default Insights;