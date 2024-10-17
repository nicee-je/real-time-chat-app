import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission denied');
    }
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  };

  return (
    <NavigationContainer>
      <Rootnavigation />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
