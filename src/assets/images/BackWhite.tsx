import * as React from 'react';
import {SVGProps} from 'react';
import {Path, Svg} from 'react-native-svg';

const BackWhite = (props: SVGProps<SVGSVGElement>) => (
  <Svg
    width="12"
    height="24"
    viewBox="0 0 12 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.54801 6.58023L8.48701 5.52024L2.70801 11.2972C2.61486 11.3898 2.54093 11.4999 2.49048 11.6211C2.44003 11.7424 2.41406 11.8724 2.41406 12.0037C2.41406 12.1351 2.44003 12.2651 2.49048 12.3863C2.54093 12.5076 2.61486 12.6177 2.70801 12.7102L8.48701 18.4902L9.54701 17.4302L4.12301 12.0052L9.54801 6.58023Z"
      fill="white"
    />
  </Svg>
);

export default BackWhite;
