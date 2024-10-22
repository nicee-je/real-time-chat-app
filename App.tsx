import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Toast from 'react-native-toast-message';
import PrimaryToast from './src/components/common/Toast';
import {BottomNavigation} from './src/navigations/BottomNavigation';
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
  const [initializing, setInitializing] = useState(true); // 로딩 상태 관리
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null); // 로그인된 사용자 상태
  console.log('user', user);
  // 사용자 인증 상태 변화 처리
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false); // 초기화 완료
  }

  useEffect(() => {
    // Firebase Auth 사용자 상태 확인
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // FCM 설정
    requestUserPermission();
    getFCMToken();

    const unsubscribeMessaging = messaging().onMessage(async remoteMessage => {
      console.log(
        '새로운 FCM 메시지가 도착했습니다!',
        JSON.stringify(remoteMessage),
      );
    });

    return () => {
      subscriber(); // 인증 상태 변경 구독 해제
      unsubscribeMessaging(); // FCM 메시지 구독 해제
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('알림 권한 상태:', authStatus);
    } else {
      console.log('알림 권한이 거부되었습니다.');
    }
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM 토큰:', token);
  };

  // 로딩 상태일 경우 스피너 표시
  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 사용자가 로그인된 경우 MyProfile 컴포넌트, 그렇지 않으면 Rootnavigation 사용
  return (
    <NavigationContainer>
      {user ? (
        <>
          <BottomNavigation />
        </>
      ) : (
        <Rootnavigation />
      )}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
