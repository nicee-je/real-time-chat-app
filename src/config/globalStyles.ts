import styled from '@emotion/native';
import {StyleSheet} from 'react-native';
import {vw, wPx} from './size';
import {theme} from './theme';

interface DefaultProps {
  w?: number;
  h?: number;
  bg?: string;
}

interface ButtonProps extends DefaultProps {
  radius?: number;
  isActiveState?: boolean;
  ph?: number;
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

interface BarProps extends DefaultProps {
  opacity?: number;
  mh?: number;
}

type Props = DefaultProps & {
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  mv?: number;
  mh?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  pv?: number;
  ph?: number;
  wp?: number;
  layout?: 'center' | 'flex';
  fRatio?: number;
  fwrap?: boolean;
  f1?: boolean;
  shrink1?: boolean;
  shrink0?: boolean;
  radius?: number;
};

export type justifyContentType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type alignItemsType =
  | 'center'
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'baseline';

export const RnView = styled.View<Props>(props => ({
  ...(props.layout === 'center'
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {display: 'flex'}),
  ...(props.w && {
    width: vw(props.w),
  }),
  ...(props.wp && {
    width: `${props.wp}%`,
  }),
  ...(props.h && {
    height: vw(props.h),
  }),
  ...(props.fRatio && {
    flex: props.fRatio,
  }),
  ...(props.bg && {
    backgroundColor: props.bg,
  }),
  ...(props.ml && {
    marginLeft: vw(props.ml),
  }),
  ...(props.mr && {
    marginRight: vw(props.mr),
  }),
  ...(props.mt && {
    marginTop: vw(props.mt),
  }),
  ...(props.mb && {
    marginBottom: vw(props.mb),
  }),
  ...(props.mv && {
    marginTop: vw(props.mv),
    marginBottom: vw(props.mv),
  }),
  ...(props.mh && {
    marginLeft: vw(props.mh),
    marginRight: vw(props.mh),
  }),
  ...(props.pl && {
    paddingLeft: vw(props.pl),
  }),
  ...(props.pr && {
    paddingRight: vw(props.pr),
  }),
  ...(props.pv && {
    paddingTop: vw(props.pv),
    paddingBottom: vw(props.pv),
  }),
  ...(props.ph && {
    paddingLeft: vw(props.ph),
    paddingRight: vw(props.ph),
  }),
  ...(props.pt && {
    paddingTop: vw(props.pt),
  }),
  ...(props.pb && {
    paddingBottom: vw(props.pb),
  }),
  ...(props.fwrap && {
    flexWrap: 'wrap',
  }),
  ...(props.f1 && {
    flex: 1,
  }),
  ...(props.shrink0 && {
    flexShrink: 0,
  }),
  ...(props.shrink1 && {
    flexShrink: 1,
  }),
  ...(props.radius && {
    borderRadius: vw(props.radius),
  }),
}));

export const Col = styled(RnView)<{
  vertical?: justifyContentType;
  horizon?: alignItemsType;
}>`
  justify-content: ${props => props.vertical};
  align-items: ${props => props.horizon};
`;
export const Row = styled(RnView)<{
  vertical?: alignItemsType;
  horizon?: justifyContentType;
}>`
  flex-direction: row;
  justify-content: ${props => props.horizon};
  align-items: ${props => props.vertical};
`;

// container
export const Container = styled.ScrollView<{
  bg?: string;
  gap?: number;
}>`
  background-color: ${props => props.bg || theme.primary};
  padding: ${props => `0 ${wPx(props.gap || 30)}`};
  position: relative;
`;

export const FlexContainer = styled.View<{bg?: string; gap?: number}>`
  background-color: ${props => props.bg || theme.primary};
  padding: ${props => `0 ${wPx(props.gap || 30)}`};
  flex: 1;
  position: relative;
`;

// button
export const RnButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlobalButton = styled.TouchableOpacity<Props>(props => ({
  ...(props.layout === 'center'
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {display: 'flex'}),
  ...(props.w && {
    width: vw(props.w),
  }),
  ...(props.wp && {
    width: `${props.wp}%`,
  }),
  ...(props.h && {
    height: vw(props.h),
  }),
  ...(props.fRatio && {
    flex: props.fRatio,
  }),
  ...(props.bg && {
    backgroundColor: props.bg,
  }),
  ...(props.ml && {
    marginLeft: vw(props.ml),
  }),
  ...(props.mr && {
    marginRight: vw(props.mr),
  }),
  ...(props.mt && {
    marginTop: vw(props.mt),
  }),
  ...(props.mb && {
    marginBottom: vw(props.mb),
  }),
  ...(props.mv && {
    marginTop: vw(props.mv),
    marginBottom: vw(props.mv),
  }),
  ...(props.mh && {
    marginLeft: vw(props.mh),
    marginRight: vw(props.mh),
  }),
  ...(props.pl && {
    paddingLeft: vw(props.pl),
  }),
  ...(props.pr && {
    paddingRight: vw(props.pr),
  }),
  ...(props.pv && {
    paddingTop: vw(props.pv),
    paddingBottom: vw(props.pv),
  }),
  ...(props.ph && {
    paddingLeft: vw(props.ph),
    paddingRight: vw(props.ph),
  }),
  ...(props.pt && {
    paddingTop: vw(props.pt),
  }),
  ...(props.pb && {
    paddingBottom: vw(props.pb),
  }),
  ...(props.radius && {
    borderRadius: vw(props.radius),
  }),
}));

// export const PrimaryButton = styled(TouchableOpacity)<buttonProps>`
export const PrimaryButton = styled.TouchableOpacity<ButtonProps>`
  width: ${props => wPx(props.w || 540)};
  height: ${props => wPx(props.h || 110)};
  background-color: ${props =>
    props.isActiveState
      ? props.isActive
        ? props.activeColor
        : props.inactiveColor
      : props.bg || theme.primary};
  border-radius: ${props => wPx(props.radius || 60)};
  padding: ${props => `0 ${wPx(props.ph || 30)}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// bar
export const Bar = styled.View<BarProps>`
  margin: ${props => `0 ${wPx(props.mh || 18)}`};
  width: ${props => wPx(props.w || 2)};
  height: ${props => wPx(props.h || 24)};
  background-color: ${props => props.bg || theme.white};
  opacity: ${props => props.opacity || 1};
`;

export const contentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: vw(30),
    backgroundColor: theme.primary,
  },
  alarmcontainer: {
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: vw(30),
    paddingHorizontal: vw(30),
    backgroundColor: theme.white,
    borderRadius: 15,
  },
});

export const ContentBox = styled.View(
  {
    backgroundColor: theme.white,
    borderRadius: vw(30),
    paddingHorizontal: vw(40),
  },
  (props: {pv?: number}) => ({paddingVertical: vw(props.pv || 50)}),
);

export const DottedLine = styled.View({
  width: vw(580),
  justifyContent: 'center',
  borderWidth: 2,
  borderRadius: 5,
  borderStyle: 'dashed',
});
