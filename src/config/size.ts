import {Dimensions} from 'react-native';

// 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
export const basicDimensions = {
  width: 375,
  height: 667,
};

export const height = // 높이 변환 작업
  Number(
    (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
  );

export const width = // 가로 변환 작업
  Number(
    (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
  );

export function vw(pixel: number): number {
  return width * pixel;
}
export function vh(pixel: number): number {
  return height * pixel;
}

// px 단위 붙인다면
export const wPx = (pixel: number) => {
  return `${width * pixel}px`;
};
export const hPx = (pixel: number) => {
  return `${height * pixel}px`;
};
