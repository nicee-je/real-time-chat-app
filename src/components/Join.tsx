import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import EyeOpen from '../assets/images/EyeOpen';
import {Col, FlexContainer} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export const Join = () => {
  const navigation = useNavigation();
  const gotoMyprofile = () => {
    navigation.navigate('BottomNavigation');
  };

  return (
    <FlexContainer bg={theme.white}>
      <Col>
        <RegularText size={24} lineHeight={35}>
          언제 어디서나 가능한
        </RegularText>
        <RegularText size={24} lineHeight={35}>
          수다, 지금 시작해볼까요?
        </RegularText>
      </Col>
      <Col style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.gray}
          placeholder="이메일을 입력해주세요."
        />
        <Button onPress={gotoMyprofile}>
          <BoldText size={14}>중복확인</BoldText>
        </Button>
      </Col>
      <Col style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.gray}
          placeholder="이름을 입력해주세요."
        />
      </Col>
      <Col style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.gray}
          placeholder="패스워드를 입력해주세요."
        />
        <EyeButton>
          <EyeOpen width={28} height={28} />
        </EyeButton>
      </Col>
      <Col style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.gray}
          placeholder="패스워드를 확인해주세요."
        />
        <EyeButton>
          <EyeOpen width={28} height={28} />
        </EyeButton>
      </Col>
    </FlexContainer>
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
  position: 'absolute',
  bottom: 10,
  right: 0,
  zIndex: 100,
});

const EyeButton = styled.TouchableOpacity({
  position: 'absolute',
  right: 0,
  bottom: 0,
  height: 50,
  justifyContent: 'center',
});

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    height: 50,
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: theme.primary,
    marginTop: 30,
  },
});
