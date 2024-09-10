import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import ChatRoom from '../components/ChatRoom';
import Intro from '../components/Intro';
import {Join} from '../components/Join';
import Back from '../components/common/Back';
import SearchHeader from '../components/common/SearchHeader';
import {theme} from '../config/theme';
import {BottomNavigation} from './BottomNavigation';

type RootStackParamList = {
  Intro: undefined;
  Join: undefined;
  MyProfile: undefined;
  ChatRoom: undefined;
  BottomNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const bgheader = (props: StackHeaderProps) => (
  <Back {...props} bg={theme.white} />
);
const searchheader = (props: StackHeaderProps) => (
  <SearchHeader {...props} bg={theme.primary} />
);

export function Rootnavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: theme.primary,
            height: 80,
            shadowOpacity: 0,
          },
          headerTitle: '',
        })}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen
          name="Join"
          component={Join}
          options={{header: bgheader}}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{header: () => null, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{header: searchheader}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
