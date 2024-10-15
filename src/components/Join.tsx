import styled from '@emotion/native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, StyleSheet, TextInput} from 'react-native';
import uuid from 'react-native-uuid';
import primaryToast from '../api/utils/toast';
import EyeClose from '../assets/images/EyeClose';
import EyeOpen from '../assets/images/EyeOpen';
import {Col, FlexContainer} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export const Join = () => {
  const navigation = useNavigation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [isCompleteCheckEmail, setIsCompleteCheckEmail] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const emailValue = watch('email');

  useEffect(() => {
    if (isCompleteCheckEmail) {
      setIsCompleteCheckEmail(false);
    }
  }, [emailValue]);

  const onToggleEye = (fieldName: string) => {
    if (fieldName === 'password') {
      setIsShowPassword(prev => !prev);
    } else if (fieldName === 'passwordConfirm') {
      setIsShowPasswordConfirm(prev => !prev);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = useCallback(() => {
    return emailRegex.test(emailValue);
  }, [emailValue]);

  const checkEmailDuplicate = async () => {
    setIsCheckingEmail(true);
    try {
      const snapshot = await database()
        .ref('/users')
        .orderByChild('emailId')
        .equalTo(emailValue)
        .once('value');

      if (snapshot.exists()) {
        primaryToast('이미 사용중인 이메일 입니다🥹');
        setIsCompleteCheckEmail(false);
      } else {
        setIsCompleteCheckEmail(true);
        primaryToast('이메일 인증이 완료되었습니다🤩');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const registerUser = async (data: any) => {
    if (!data.name || !data.email || !data.password || !data.passwordConfirm) {
      primaryToast('모든 항목을 입력해주세요🥹');
      return;
    }

    if (!isCompleteCheckEmail) {
      primaryToast('이메일 중복확인을 완료해주세요❗️');
      return;
    }

    if (data.password !== data.passwordConfirm) {
      primaryToast('비밀번호가 일치하지 않습니다🫨');
      return;
    }

    const userData = {
      id: uuid.v4(),
      name: data.name,
      emailId: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      img: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
    };

    try {
      await database()
        .ref('/users/' + userData.id)
        .set(userData);
      primaryToast('회원가입이 완료되었습니다🥳');
      navigation.navigate('BottomNavigation');
    } catch (err) {
      console.error(err);
      primaryToast('회원가입 중 오류가 발생했습니다.');
    }
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

      <Controller
        control={control}
        rules={{
          pattern: {
            value: emailRegex,
            message: '이메일 형식이 올바르지 않습니다.',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Col style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="이메일을 입력해주세요."
              value={value}
              onChangeText={text => {
                onChange(text);
              }}
              maxLength={50}
            />
            <CheckButton
              isComplete={isCompleteCheckEmail}
              disabled={!isEmailValid() || isCompleteCheckEmail}
              isActive={isEmailValid() && !isCompleteCheckEmail}
              onPress={checkEmailDuplicate}>
              {isCheckingEmail ? (
                <ActivityIndicator size="small" color={theme.primary} />
              ) : isCompleteCheckEmail ? (
                <BoldText
                  size={14}
                  color={isCompleteCheckEmail ? theme.white : ''}>
                  인증완료
                </BoldText>
              ) : (
                <BoldText size={14}>중복확인</BoldText>
              )}
            </CheckButton>
            {errors.email && (
              <ErrorWrapper style={{position: 'absolute'}}>
                <ErrorText>{errors.email.message}</ErrorText>
              </ErrorWrapper>
            )}
          </Col>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          maxLength: {
            value: 10,
            message: '이름은 최대 10자입니다.',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Col style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="이름을 입력해주세요."
              value={value}
              onChangeText={text => onChange(text)}
              maxLength={10}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </Col>
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
          minLength: {
            value: 6,
            message: '비밀번호는 최소 6자 이상이어야 합니다.',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Col style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="패스워드를 입력해주세요."
              value={value}
              onChangeText={text => onChange(text)}
              secureTextEntry={!isShowPassword}
            />
            <EyeButton onPress={() => onToggleEye('password')}>
              {!isShowPassword ? (
                <EyeClose width={28} height={28} />
              ) : (
                <EyeOpen width={28} height={28} />
              )}
            </EyeButton>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </Col>
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: value =>
            value === watch('password') || '비밀번호가 일치하지 않습니다.',
        }}
        render={({field: {onChange, value}}) => (
          <Col style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={theme.gray}
              placeholder="패스워드를 확인해주세요."
              value={value}
              onChangeText={text => onChange(text)}
              secureTextEntry={!isShowPasswordConfirm}
            />
            <EyeButton onPress={() => onToggleEye('passwordConfirm')}>
              {!isShowPasswordConfirm ? (
                <EyeClose width={28} height={28} />
              ) : (
                <EyeOpen width={28} height={28} />
              )}
            </EyeButton>
            {errors.passwordConfirm && (
              <ErrorText>{errors.passwordConfirm.message}</ErrorText>
            )}
          </Col>
        )}
        name="passwordConfirm"
      />

      <BottomButton onPress={handleSubmit(registerUser)}>
        <BoldText size={14} color={theme.white}>
          회원가입 완료하기
        </BoldText>
      </BottomButton>
    </FlexContainer>
  );
};

const CheckButton = styled.TouchableOpacity(({isComplete, disabled}) => ({
  alignItems: 'center',
  width: 80,
  justifyContent: 'center',
  backgroundColor: isComplete ? theme.black : theme.white,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: isComplete ? theme.gray : theme.primary,
  position: 'absolute',
  bottom: 10,
  right: 0,
  zIndex: 100,
  opacity: disabled ? 0.4 : 1,
}));

const BottomButton = styled.TouchableOpacity({
  alignItems: 'center',
  width: '100%',
  height: 50,
  justifyContent: 'center',
  backgroundColor: theme.black,
  marginTop: 30,
});

const EyeButton = styled.TouchableOpacity({
  position: 'absolute',
  right: 0,
  bottom: 0,
  height: 50,
  justifyContent: 'center',
});

const ErrorWrapper = styled.View({
  marginTop: 4,
  alignSelf: 'flex-start',
});

const ErrorText = styled.Text({
  color: theme.red,
  fontSize: 16,
  top: -10,
  position: 'absolute',
});

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    height: 50,
    width: '100%',
    paddingRight: 40,
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: theme.primary,
    marginTop: 30,
  },
});
