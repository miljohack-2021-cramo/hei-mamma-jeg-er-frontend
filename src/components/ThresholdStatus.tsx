import { Colors } from '../theme/colors';
import styled from 'styled-components'
import Icon from './Icon';

const ThresholdStatusWrapper = styled.div`
  border-radius: 15px;
  width: 50px;
  background-color: ${props => props.color ||'#1AD600'};
  padding: 5px;
  display: flex;
  place-content: center;
  place-items: center;
  column-gap: 2px;
`

const ThresholdStatus = () => {
  return (
    <ThresholdStatusWrapper >
      <Icon icon={'info'} size={20} />
      <span>OK</span>
    </ThresholdStatusWrapper>
  );
}

export default ThresholdStatus;
