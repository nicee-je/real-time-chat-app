import * as React from 'react';
import {SVGProps} from 'react';
import {Path, Svg} from 'react-native-svg';

const EyeOpen = (props: SVGProps<SVGSVGElement>) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#7F7F7F"
      d="M2.2 24S0 24 0 22s2.2-8 11-8 11 6 11 8-2.2 2-2.2 2H2.2ZM11 12c1.75 0 3.43-.632 4.667-1.757C16.905 9.117 17.6 7.59 17.6 6c0-1.591-.695-3.117-1.933-4.243C14.429.632 12.75 0 11 0S7.57.632 6.333 1.757C5.095 2.883 4.4 4.41 4.4 6c0 1.591.695 3.117 1.933 4.243C7.571 11.368 9.25 12 11 12Z"
    />
  </Svg>
);

export default EyeOpen;
