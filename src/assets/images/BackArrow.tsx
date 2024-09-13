import * as React from 'react';
import {SVGProps} from 'react';
import {Path, Svg} from 'react-native-svg';

const BackArrow = (props: SVGProps<SVGSVGElement>) => (
  <Svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M18.0463 20.0002L26.2963 28.2502L23.9397 30.6086L13.333 20.0002L23.9397 9.39355L26.2963 11.7502L18.0463 20.0002Z"
      fill="#fff"
    />
  </Svg>
);

export default BackArrow;
