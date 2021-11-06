import styled from 'styled-components'

export const Box = styled.div`
  background-color: white;
  width: 100%;
  padding: 10px;
`

export const Header = styled.div`
  grid-area: header;
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin: 0px;
  }
`
export const Measurement = styled.div`
  display: flex;
  gap: 10px;
  align-content: flex-end;
  align-items: flex-end;
`
export const Value = styled.span`
  font-size: 2rem;
  font-weight: 500;
 `
export const Unit = styled.span`
  font-size: 1.5rem;
`
export const MeasurementType = styled.div`
  font-weight: 100;
  font-size: 0.8rem;
`
export const MeasurementName = styled.div`
  font-size: 1.2rem;
`