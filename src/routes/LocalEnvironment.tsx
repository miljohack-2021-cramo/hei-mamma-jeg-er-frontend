import { Box } from '../style';
import HeatMap from '../components/heatmap/HeatMap';
import styled from 'styled-components'
import ThresholdStatus from '../components/ThresholdStatus';
import { useTranslation } from "react-i18next";
import "../translations/i18n";

const LocalEnvironmentWrapper = styled.div`
  display: grid;
  padding: 20px;
  grid-template-areas:
    "header header"
    "noise dust"
    "map map";
  gap: 40px;
  grid-template-rows: 100px min-content auto;
  grid-template-columns: 1fr 1fr;
`
const Header = styled.div`
  grid-area: header;
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin: 0px;
  }
`

const NoiseBox = styled(Box)`
  grid-area: noise;
`

const DustBox = styled(Box)`
  grid-area: dust;
`

const MapBox = styled(Box)`
  grid-area: map;
`
const Measurement = styled.div`
  display: flex;
  gap: 10px;
  align-content: flex-end;
  align-items: flex-end;
`
const Value = styled.span`
  font-size: 2rem;
  font-weight: 500;
 `
const Unit = styled.span`
  font-size: 1.5rem;
`
const MeasurementType = styled.div`
  font-weight: 100;
  font-size: 0.8rem;
`
const MeasurementName = styled.div`
  font-size: 1.2rem;
`

const data : any = [];

for (let i = 0; i < 20; i++) {
  const series = [];
  for (let j = 0; j < 100; j++) {
    series.push({x: j, y: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)});
  }
  data.push({color: i, key: i, data: series, opacity: 0.8});
}


const LocalEnvironment = () => {
  const { t } = useTranslation();
  return (
    <LocalEnvironmentWrapper>
      <Header>
        <h1>{t('localEnvironment')}</h1>
        <p>{t('localEnvironmentDescription')}</p>
      </Header>
      <NoiseBox>
        <MeasurementType>{t('averageMeasurements')}</MeasurementType>
        <MeasurementName>{t('noise')}</MeasurementName>
        <Measurement>
          <Value>56.5</Value><Unit>dB</Unit>
        </Measurement>
        <p>{t('noiseDescription')}</p>
        <ThresholdStatus />
      </NoiseBox>
      <DustBox>
        <MeasurementType>{t('averageMeasurements')}</MeasurementType>
        <MeasurementName>{t('dust')}</MeasurementName>
        <Measurement>
          <Value>10.47</Value><Unit>ug/m3</Unit>
        </Measurement>
        <p>{t('dustDescription')}</p>
        <ThresholdStatus />
      </DustBox>
      <MapBox>
        <h2>{t('noiseMap')}</h2>
        <HeatMap />
      </MapBox>
    </LocalEnvironmentWrapper>
  );
}

export default LocalEnvironment;