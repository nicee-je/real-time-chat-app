import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Checkeye from '../assets/images/eye-open.svg';
import {Col, FlexContainer, GlobalButton, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export const Join = () => {
  const navigation = useNavigation();
  const gotoMyprofile = () => {
    navigation.navigate('BottomNavigation');
  };
  return (
    <>
      <FlexContainer bg={theme.white}>
        <Col>
          <RegularText size={24} lineHeight={35}>
            언제 어디서나 가능한
          </RegularText>
          <RegularText size={24} lineHeight={35}>
            수다, 지금 시작해볼까요?
          </RegularText>
        </Col>
        <Col
          style={{
            position: 'relative',
            borderBottomWidth: 1,
            borderColor: theme.primary,
          }}>
          <Row mr={90}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="이메일을 입력해주세요."
            />
          </Row>
          <Button onPress={gotoMyprofile}>
            <BoldText size={14}>중복확인</BoldText>
          </Button>
        </Col>
        <Col style={{borderBottomWidth: 1, borderColor: theme.primary}}>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.gray}
            placeholder="이름을 입력해주세요."
          />
        </Col>
        <Col style={{borderBottomWidth: 1, borderColor: theme.primary}}>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.gray}
            placeholder="패스워드를 입력해주세요."
          />
          <GlobalButton>
            <Checkeye
              width={28}
              height={48}
              style={{position: 'absolute', right: 0, bottom: 0}}
            />
          </GlobalButton>
        </Col>
        <Col style={{borderBottomWidth: 1, borderColor: theme.primary}}>
          <Row style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="패스워드를 확인해주세요."
            />
            <GlobalButton>
              <Checkeye
                width={28}
                height={48}
                style={{position: 'absolute', right: 0, bottom: 0}}
              />
            </GlobalButton>
          </Row>
        </Col>
      </FlexContainer>
    </>
  );
};

const Button = styled.TouchableOpacity({
  alignItems: 'center',
  width: 80,
  justifyContent: 'center',
  backgroundColor: theme.white,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: theme.primary,
  bottom: 10,
  right: 0,
  position: 'absolute',
  zIndex: 100,
});

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    height: 50,
    width: '100%',
    marginTop: 30,
  },
});
