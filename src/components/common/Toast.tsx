import styled from '@emotion/native';
import React from 'react';
import {Col} from '../../config/globalStyles';
import {BoldText} from '../../config/globalTexts';
import {vw} from '../../config/size';
import {theme} from '../../config/theme';

type Props = {
  title: string;
};

function Toast({title}: Props) {
  return (
    <ToastContainer>
      <Col ph={37}>
        <BoldText size={vw(16)} lineHeight={38} color={theme.white}>
          {title}
        </BoldText>
      </Col>
    </ToastContainer>
  );
}
export default Toast;

export const ToastContainer = styled.View({
  minWidth: '70%',
  minHeight: vw(40),
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderRadius: vw(80),
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: vw(10),
  paddingHorizontal: vw(10),
});
