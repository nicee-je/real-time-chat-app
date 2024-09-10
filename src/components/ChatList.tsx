import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {default as React} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {} from 'react-native-gesture-handler';
import Search from '../assets/images/search.svg';
import {Col, FlexContainer, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export default function ChatList() {
  const navigation = useNavigation();
  const gotoChatRomm = () => {
    navigation.navigate('ChatRoom');
  };
  return (
    <>
      <FlexContainer>
        <Col style={{paddingBottom: 15}}>
          <Row style={{justifyContent: 'space-between'}}>
            <BoldText color={theme.white} size={24}>
              채팅
            </BoldText>
            <Button>
              <Search width={30} height={30} />
            </Button>
          </Row>
        </Col>
        <Col
          // bg="red"
          style={{
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            zIndex: 10,
          }}>
          <Col style={{paddingVertical: 15, width: '100%'}}>
            <Button style={{position: 'relative'}} onPress={gotoChatRomm}>
              <Col
                w={60}
                h={60}
                style={{
                  borderRadius: 100,
                  backgroundColor: theme.gray,
                }}
                mr={10}>
                <Image
                  resizeMode={'cover'}
                  style={styles.imageStyle}
                  source={{
                    uri: 'https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800',
                  }}
                />
              </Col>
              <Col style={{width: '60%'}}>
                <RegularText color={theme.white}>김조은</RegularText>
                <RegularText
                  color={theme.gray2}
                  size={12}
                  lineHeight={12}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{overflow: 'hidden'}}>
                  밥은 먹고
                  다니냐ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </RegularText>
              </Col>

              <Col
                style={{
                  width: '16%',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: 0,
                }}>
                <RegularText color={theme.gray2} size={12}>
                  오후 1:33
                </RegularText>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: theme.yellow,
                    borderRadius: 100,
                    alignItems: 'center',
                  }}>
                  <RegularText color={theme.primary} size={12} lineHeight={20}>
                    1
                  </RegularText>
                </View>
              </Col>
            </Button>
          </Col>
        </Col>
      </FlexContainer>
    </>
  );
}

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
