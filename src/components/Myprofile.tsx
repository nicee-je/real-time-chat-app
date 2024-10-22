import styled from '@emotion/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TextInput} from 'react-native';

import Camera from '../assets/images/Camera';
import Cancle from '../assets/images/Cancle';
import Fixed from '../assets/images/Fixed';
import Pencile from '../assets/images/Pencile';
import {Col, FlexContainer, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export const MyProfile = () => {
  const [matchingUser, setMatchingUser] = useState(null);
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [cameraBgButton, setCameraBgButton] = useState(false);
  const [cameraProfileButton, setCameraProfileButton] = useState(false);
  const [editText, setEditText] = useState(false);
  const [editEditButton, setEditEditButton] = useState(false);
  const [topButton, setTopButton] = useState(false);
  const [topTextButton, setTopTextButton] = useState(false);
  const [textTitle, setTextTitle] = useState('');

  const [userName, setUserName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [inputValue, setInputValue] = useState(
    textTitle === '이름' ? userName : profileMessage,
  );
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && textTitle === '이름' ? userName : profileMessage) {
      inputRef.current?.setNativeProps({
        selection: {
          start: textTitle === '이름' ? userName : profileMessage,
          end: textTitle === '이름' ? userName : profileMessage,
        },
      });
    }
  }, [userName, profileMessage]);

  const handleClearInput = () => {
    setInputValue(''); // 입력 값 지우기
    if (inputRef.current) {
      inputRef.current.clear(); // TextInput 값 초기화
      inputRef.current.focus(); // 포커스를 TextInput 처음으로 설정
    }
  };

  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token); // FCM 토큰을 상태에 저장
      console.log('FCM 토큰:', token);
      return token;
    } catch (error) {
      console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchUserDataByToken = async (token: string) => {
    try {
      const snapshot = await database().ref('/users').once('value');
      if (snapshot.exists()) {
        const data = snapshot.val();

        // FCM 토큰이 일치하는 사용자를 찾기
        const foundUser = Object.values(data).find(
          (user: any) => user.token === token,
        );
        if (foundUser) {
          setMatchingUser(foundUser); // matchingUser 상태로 저장
          setUserName(foundUser.name);
          setProfileMessage(foundUser.profileMessage);
        } else {
          console.log('일치하는 사용자를 찾을 수 없습니다.');
        }
      } else {
        console.log('데이터가 없습니다.');
      }
    } catch (err) {
      console.error('사용자 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getFcmToken(); // FCM 토큰 가져오기
      if (token) {
        fetchUserDataByToken(token); // 토큰으로 사용자 조회
      }
    };
    fetchData(); // 컴포넌트가 마운트될 때 데이터 불러오기
  }, []);

  const profileEdit = () => {
    setCameraBgButton(true);
    setEditText(true);
    setTopButton(true);
    setCameraProfileButton(true);
    setEditProfileButton(false);
  };

  const onCancle = () => {
    setCameraBgButton(false);
    setEditText(false);
    setTopButton(false);
    setEditEditButton(false);
    setTopTextButton(false);
    setCameraProfileButton(false);
    setEditProfileButton(true);
  };

  const onSave = () => {
    setCameraBgButton(false);
    setEditText(false);
    setTopButton(false);
    setCameraProfileButton(false);
    setEditProfileButton(true);
  };

  const onSaveText = async () => {
    try {
      if (!matchingUser) {
        console.error('matchingUser가 없습니다.');
        return;
      }

      const userId = matchingUser.id;

      if (!userId) {
        console.error('사용자 ID를 찾을 수 없습니다.');
        return;
      }

      const updates = {};

      // 이름 업데이트
      if (textTitle === '이름') {
        updates['/users/' + userId + '/name'] = inputValue;
        setUserName(inputValue); // 로컬 상태 업데이트
      }

      // 프로필 메시지 업데이트
      else if (textTitle === '상태메세지') {
        updates['/users/' + userId + '/profileMessage'] = inputValue;
        setProfileMessage(inputValue); // 로컬 상태 업데이트
      }

      // Firebase 데이터베이스에 업데이트
      await database().ref().update(updates);

      // 상태 초기화
      setTopTextButton(false);
      setEditEditButton(false);
      setTopButton(true);
      setTextTitle('');
      setInputValue('');
    } catch (error) {
      console.error('데이터 업데이트 중 오류 발생:', error);
    }
  };

  const onCancleText = () => {
    setTopTextButton(false);
    setEditEditButton(false);
    setTopButton(true);
    setTextTitle('');
  };

  const onEditText = (text: string) => {
    setTextTitle(text);
    setEditEditButton(true);
    setTopTextButton(true);
    setTopButton(false);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    onSave();
  }, [isFocused]);

  return (
    <FlexContainer>
      {topButton && (
        <Col style={{flex: 0.1}}>
          <Row style={{justifyContent: 'space-between'}}>
            <Button onPress={onCancle}>
              <RegularText color={theme.white}>취소</RegularText>
            </Button>

            <Button onPress={onSave}>
              <RegularText color={theme.white}>완료</RegularText>
            </Button>
          </Row>
        </Col>
      )}

      {topTextButton && (
        <Col style={{flex: 0.1}}>
          <Row style={{justifyContent: 'space-between'}}>
            <Button onPress={onCancleText}>
              <RegularText color={theme.white}>취소</RegularText>
            </Button>

            <Button onPress={onSaveText}>
              <RegularText color={theme.white}>완료</RegularText>
            </Button>
          </Row>
        </Col>
      )}

      <Col
        style={{
          alignItems: 'center',
          flex: 1,
          position: 'relative',
          zIndex: 10,
        }}>
        {editEditButton && (
          <Col
            style={{
              position: 'absolute',
              top: 100,
              borderBottomWidth: 1,
              borderColor: theme.gray,
              height: 28,
              width: '100%',
              alignItems: 'center',
            }}>
            <Col style={{position: 'absolute', top: -155}}>
              <BoldText
                color={theme.white}
                size={20}
                style={{fontWeight: 'bold'}}>
                {textTitle}
              </BoldText>
            </Col>
            <Row style={{position: 'relative', width: '100%'}}>
              <TextInput
                style={{
                  color: theme.white,
                  fontSize: 20,
                  marginRight: 20,
                }}
                ref={inputRef}
                value={inputValue}
                onChangeText={setInputValue}
                placeholderTextColor={theme.gray}
                placeholder={textTitle === '이름' ? userName : profileMessage}
                maxLength={textTitle === '이름' ? 20 : 60}
              />
              <Button
                style={{position: 'absolute', right: 0}}
                onPress={handleClearInput}>
                <Cancle />
              </Button>
            </Row>
            <RegularText color={theme.white} size={14} mt={5}>
              {textTitle == '이름' ? userName.length : profileMessage.length} /{' '}
              {textTitle == '이름' ? '20' : '60'}
            </RegularText>
          </Col>
        )}

        <Col
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'center',
          }}>
          <Col
            w={120}
            h={120}
            style={{
              borderRadius: 100,
              backgroundColor: theme.gray,
            }}>
            <Image
              resizeMode={'cover'}
              style={styles.imageStyle}
              source={{
                uri: 'https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800',
              }}
            />
            {cameraProfileButton && (
              <Button
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 0,
                  width: 25,
                  height: 25,
                  backgroundColor: theme.white,
                  borderRadius: 100,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Camera />
              </Button>
            )}
          </Col>
          {userName && (
            <RegularText size={20} color={theme.white} style={{marginTop: 20}}>
              {userName}
            </RegularText>
          )}
          {profileMessage ? (
            !editText ? (
              <RegularText
                size={18}
                color={theme.gray}
                style={{paddingBottom: 101}}>
                {profileMessage}
              </RegularText>
            ) : (
              <RegularText
                size={18}
                color={theme.gray}
                style={{paddingBottom: 115}}></RegularText>
            )
          ) : (
            <RegularText
              size={18}
              color={theme.gray}
              style={{paddingBottom: 115}}></RegularText>
          )}
          {editText && (
            <Col style={{width: '100%', position: 'absolute', bottom: 80}}>
              <Col
                style={{
                  borderBottomWidth: 1,
                  borderColor: theme.gray,
                  height: 27,
                  width: '100%',
                  alignItems: 'center',
                }}>
                <RegularText color={theme.white} size={20}>
                  {userName}
                </RegularText>
                <Button
                  style={{position: 'absolute', bottom: 8, right: 0}}
                  onPress={() => onEditText('이름')}>
                  <Pencile width={15} height={15} />
                </Button>
              </Col>

              <Col
                style={{
                  borderBottomWidth: 1,
                  borderColor: theme.gray,
                  height: 30,
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <RegularText color={theme.white} size={18}>
                  {profileMessage}
                </RegularText>
                <Button
                  style={{position: 'absolute', bottom: 8, right: 0}}
                  onPress={() => onEditText('상태메세지')}>
                  <Pencile width={15} height={15} />
                </Button>
              </Col>
            </Col>
          )}

          {editProfileButton && (
            <Row
              style={{
                position: 'absolute',
                bottom: 25,
                right: 0,
              }}>
              <Button onPress={profileEdit}>
                <RegularText size={16} color={theme.white}>
                  프로필 편집
                </RegularText>
                <Fixed />
              </Button>
            </Row>
          )}

          {cameraBgButton && (
            <Button
              style={{
                position: 'absolute',
                bottom: 25,
                left: 0,
                width: 25,
                height: 25,
                backgroundColor: theme.white,
                borderRadius: 100,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Camera />
            </Button>
          )}
        </Col>
      </Col>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

const Button = styled.TouchableOpacity({
  zIndex: 10,
  flexDirection: 'row',
  alignItems: 'center',
});
