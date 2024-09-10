import styled from '@emotion/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TextInput} from 'react-native';
import Camera from '../assets/images/camera.svg';
import Cancle from '../assets/images/cancle.svg';
import Fix from '../assets/images/fixed.svg';
import Peincil from '../assets/images/pencil.svg';
import {Col, FlexContainer, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export const MyProfile = () => {
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [cameraBgButton, setCameraBgButton] = useState(false);
  const [cameraProfileButton, setCameraProfileButton] = useState(false);
  const [editText, setEditText] = useState(false);
  const [editEditButton, setEditEditButton] = useState(false);
  const [topButton, setTopButton] = useState(false);
  const [topTextButton, setTopTextButton] = useState(false);
  const [textTitle, setTextTitle] = useState('');

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

  const onSaveText = () => {
    setTopTextButton(false);
    setEditEditButton(false);
    setTopButton(true);
    setTextTitle('');
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
              height: 30,
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
            <TextInput
              style={{
                color: theme.white,
                fontSize: 20,
              }}
              placeholderTextColor={theme.white}
              placeholder={
                textTitle === '이름' ? '김조은' : '상태메세지를 입력해 주세요.'
              }
            />
            <Button style={{position: 'absolute', bottom: 8, right: 0}}>
              <Cancle />
            </Button>
            <RegularText color={theme.white} size={14} mt={5}>
              0 / {textTitle == '이름' ? '20' : '60'}
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
          <RegularText
            size={20}
            color={theme.white}
            style={{paddingBottom: 129, marginTop: 20}}>
            김조은
          </RegularText>

          {editText && (
            <Col style={{width: '100%', position: 'absolute', bottom: 80}}>
              <Col
                style={{
                  borderBottomWidth: 1,
                  borderColor: theme.gray,
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    color: theme.white,
                    fontSize: 20,
                  }}
                  placeholderTextColor={theme.white}
                  placeholder="김조은"
                />
                <Button
                  style={{position: 'absolute', bottom: 8, right: 0}}
                  onPress={() => onEditText('이름')}>
                  <Peincil width={15} height={15} />
                </Button>
              </Col>

              <Col
                style={{
                  borderBottomWidth: 1,
                  borderColor: theme.gray,
                  height: 25,
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TextInput
                  style={{
                    color: theme.white,
                    fontSize: 16,
                  }}
                  placeholderTextColor={theme.white}
                  placeholder="상태메세지를 입력해 주세요."
                />
                <Button
                  style={{position: 'absolute', bottom: 8, right: 0}}
                  onPress={() => onEditText('상태메세지')}>
                  <Peincil width={15} height={15} />
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
                <Fix />
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
