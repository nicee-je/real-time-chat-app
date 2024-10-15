import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import PrimaryToast from './src/components/common/Toast';
import {Rootnavigation} from './src/navigations/RootNavigation';

type RootStackParamList = {
  Intro: undefined;
  Join: undefined;
  MyProfile: undefined;
  ChatRoom: undefined;
  BottomNavigation: undefined;
};

const toastConfig = {
  primary: ({text1}: any) => <PrimaryToast title={text1} />,
};
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Rootnavigation />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
