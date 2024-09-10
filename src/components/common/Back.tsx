import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import ArrowLeft from '../../assets/images/back.svg';
import {Col, Row} from '../../config/globalStyles';
import {vw, wPx} from '../../config/size';
import {theme} from '../../config/theme';

type Props = StackScreenProps<any> & {
  onBack?: () => void;
  bg?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

function Back({
  navigation,
  onBack,
  bg,
  leftComponent,
  rightComponent,
  route,
}: Props) {
  const goBack = () => {
    if (onBack instanceof Function) {
      return onBack();
    }

    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
  };

  return (
    <Col bg={bg || theme.white}>
      <SafeAreaView>
        <MenuContainer>
          <Row vertical="center">
            <BackContainer onPress={goBack}>
              <ArrowLeft width={vw(48)} height={vw(48)} />
            </BackContainer>
            {leftComponent || null}
          </Row>
          {rightComponent || null}
        </MenuContainer>
      </SafeAreaView>
    </Col>
  );
}

export default Back;

export const BackContainer = styled.TouchableOpacity`
  padding: ${wPx(0)};
`;

export const MenuContainer = styled.SafeAreaView<{bgColor?: string}>`
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor || theme.white};
  width: 100%;
  height: ${wPx(100)};
`;
