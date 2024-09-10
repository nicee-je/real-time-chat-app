import styled from '@emotion/native';
import {wPx} from './size';
import {theme} from './theme';

type TextProps = {
  size?: number;
  bg?: string;
  lineHeight?: number;
  color?: string;
  align?: 'center' | 'right' | 'left' | 'auto';
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
};

const RnText = styled.Text<TextProps>`
  letter-spacing: ${wPx(-0.05)};
  font-size: ${props => wPx(props.size || 16)};
  line-height: ${props => wPx(props.lineHeight || 28)};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => (props.mb ? wPx(props.mb) : 0)};
  margin-top: ${props => (props.mt ? wPx(props.mt) : 0)};
  margin-left: ${props => (props.ml ? wPx(props.ml) : 0)};
  margin-right: ${props => (props.mr ? wPx(props.mr) : 0)};
  background-color: ${props => props.bg || 'transparent'};
  color: ${props => props.color || theme.black};
`;

RnText.defaultProps = {
  allowFontScaling: false,
};

export const RegularText = styled(RnText)`
  font-weight: normal;
  font-family: intell-Regular;
`;
export const BoldText = styled(RnText)`
  font-family: intell-Bold;
  font-weight: bold;
`;
