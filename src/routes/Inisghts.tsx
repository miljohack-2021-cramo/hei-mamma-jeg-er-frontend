import styled from 'styled-components'
import ThresholdStatus from '../components/ThresholdStatus';
import {Box, Header, Measurement, Value, Unit, MeasurementType, MeasurementName } from '../style';
import { useTranslation } from "react-i18next";

const InsightsWrapper = styled.div`
  padding: 10px;
  display: grid;
  gap: 40px;
  grid-template-areas: 
    "welcome welcome"
    "sensor sensor2"
    "sensor3 sensor4"
    ;
  grid-template-rows: 100px min-content min-content;
`

const WelcomeBox = styled(Box)`
  grid-area: welcome;
`

const AirQualityBox = styled(Box)`
  grid-area: sensor;
`

const DustBox = styled(Box)`
  grid-area: sensor2;
`

const WeatherBox = styled(Box)`
  grid-area: sensor3;
`
const NoiseBox = styled(Box)`
  grid-area: sensor4;
`

const Insights = () => {
    const { t } = useTranslation();
  return (
    <InsightsWrapper>
      <WelcomeBox>
        <p>Forretningsutvikler</p>
        <p><strong>Hei, velkommen til en gjennomgang av Cramo Insights</strong></p>
      </WelcomeBox>

      <AirQualityBox>
        <MeasurementType>eGate N100602 - AirQuality</MeasurementType>
        <MeasurementName>Kombi TVOC sensor</MeasurementName>
        <Measurement>
          <Value>135.00</Value><Unit>ppb</Unit>
        </Measurement>
        <ThresholdStatus />
      </AirQualityBox>

      <DustBox>
        <MeasurementType>eGate N100602 - AirQuality</MeasurementType>
        <MeasurementName>Kombi TVOC sensor</MeasurementName>
        <Measurement>
          <Value>135.00</Value><Unit>ppb</Unit>
        </Measurement>
        <p>{t('dustDescription')}</p>
        <ThresholdStatus />
      </DustBox>

      <WeatherBox>
        <MeasurementName>Temperature</MeasurementName>
        <Measurement>
          <Value>1</Value><Unit>°C</Unit>
        </Measurement>
        <ThresholdStatus />
      </WeatherBox>

      <NoiseBox>
        <MeasurementType>eze BAB-757 - Other</MeasurementType>
        <MeasurementName>Noise sensor: Noise 60s max</MeasurementName>
        <Measurement>
          <Value>69.50</Value><Unit>dB</Unit>
        </Measurement>
        <p>{t('noiseDescription')}</p>
        <ThresholdStatus />
      </NoiseBox>
    </InsightsWrapper>
  );
}

export default Insights;