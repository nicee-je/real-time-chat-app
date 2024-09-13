import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Rootnavigation} from './src/navigations/RootNavigation';

type RootStackParamList = {
  Intro: undefined;
  Join: undefined;
  MyProfile: undefined;
  ChatRoom: undefined;
  BottomNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Rootnavigation />
    </NavigationContainer>
  );
}

export default App;
