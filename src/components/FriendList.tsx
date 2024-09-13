import styled from '@emotion/native';
import {default as React} from 'react';
import {Image, StyleSheet} from 'react-native';
import Search from '../assets/images/Search';
import {Col, FlexContainer, Row} from '../config/globalStyles';
import {BoldText, RegularText} from '../config/globalTexts';
import {theme} from '../config/theme';

export default function FriendList() {
  return (
    <>
      <FlexContainer>
        <Col style={{flex: 0.1, paddingBottom: 15}}>
          <Row style={{justifyContent: 'space-between'}}>
            <BoldText color={theme.white} size={24}>
              친구
            </BoldText>
            <Button>
              <Search width={30} height={30} />
            </Button>
          </Row>
          <RegularText color={theme.white}>친구 10명</RegularText>
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
            <Button>
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

              <Col>
                <RegularText color={theme.white}>김조은</RegularText>
                <RegularText color={theme.gray2} size={12} lineHeight={12}>
                  상태메세지이이잉이이이이이잉
                </RegularText>
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
