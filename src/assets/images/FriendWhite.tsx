import * as React from 'react';
import {SVGProps} from 'react';
import {Path, Svg} from 'react-native-svg';

const FriendWhite = (props: SVGProps<SVGSVGElement>) => (
  <Svg
    width="22"
    height="24"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2.2 24C2.2 24 0 24 0 22C0 20 2.2 14 11 14C19.8 14 22 20 22 22C22 24 19.8 24 19.8 24H2.2ZM11 12C12.7504 12 14.4292 11.3679 15.6669 10.2426C16.9046 9.11742 17.6 7.5913 17.6 6C17.6 4.4087 16.9046 2.88258 15.6669 1.75736C14.4292 0.632141 12.7504 0 11 0C9.24957 0 7.57083 0.632141 6.33309 1.75736C5.09535 2.88258 4.4 4.4087 4.4 6C4.4 7.5913 5.09535 9.11742 6.33309 10.2426C7.57083 11.3679 9.24957 12 11 12Z"
      fill="white"
    />
  </Svg>
);

export default FriendWhite;
