import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import BackArrow from '../../assets/images/BackArrow';
import Search from '../../assets/images/Search';
import {Col, Row} from '../../config/globalStyles';
import {BoldText} from '../../config/globalTexts';
import {vw, wPx} from '../../config/size';
import {theme} from '../../config/theme';

type Props = StackScreenProps<any> & {
  onBack?: () => void;
  bg?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  roomname?: string;
};

function SearchHeader({
  navigation,
  onBack,
  bg,
  leftComponent,
  rightComponent,
  route,
  roomname,
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
    <Col bg={bg || theme.primary}>
      <SafeAreaView>
        <MenuContainer>
          <Row
            vertical="center"
            style={{justifyContent: 'space-between', width: '100%'}}>
            <BackContainer onPress={goBack}>
              <BackArrow width={vw(48)} height={vw(48)} />
            </BackContainer>
            <BoldText color={theme.white} size={24}>
              {/* {roomname} */}
              김조은
            </BoldText>
            <Button>
              <Search width={30} height={30} />
            </Button>
          </Row>
        </MenuContainer>
      </SafeAreaView>
    </Col>
  );
}

export default SearchHeader;

export const BackContainer = styled.TouchableOpacity`
  padding-vertical: ${wPx(0)};
`;

export const MenuContainer = styled.SafeAreaView<{bgColor?: string}>`
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor || theme.primary};
  width: 100%;
  height: ${wPx(100)};
`;

const Button = styled.TouchableOpacity`
  padding-right: 15;
`;
