import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {Col, FlexContainer, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export const Intro = () => {
  const navigation = useNavigation();
  const gotoJoin = () => {
    navigation.navigate('Join');
  };
  return (
    <>
      <FlexContainer
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col style={{alignItems: 'center'}}>
          <RegularText size={30} lineHeight={40} color={theme.white}>
            안녕하세요
          </RegularText>
          <Row>
            <BoldText
              size={30}
              lineHeight={40}
              color={theme.white}
              style={{fontWeight: 'bold'}}>
              Nicee Chat
            </BoldText>
            <RegularText size={30} lineHeight={40} color={theme.white}>
              에 오신걸
            </RegularText>
          </Row>
          <RegularText size={30} lineHeight={40} color={theme.white}>
            환영합니다.
          </RegularText>
        </Col>
        <Col>
          <JoinButton onPress={gotoJoin}>
            <BoldText style={{fontWeight: 'bold'}}>계정 만들기</BoldText>
          </JoinButton>
        </Col>
      </FlexContainer>
    </>
  );
};

const JoinButton = styled.TouchableOpacity({
  alignItems: 'center',
  width: 200,
  justifyContent: 'center',
  backgroundColor: '#FFF',
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 100,
  marginTop: 50,
});

export default Intro;
