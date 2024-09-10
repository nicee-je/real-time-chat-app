import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ChatGray from '../assets/images/chat-gray.svg';
import ChatWhite from '../assets/images/chat-white.svg';
import FriendGray from '../assets/images/friend-gray.svg';
import FriendWhite from '../assets/images/friend-white.svg';
import HomGray from '../assets/images/home-gray.svg';
import HomeWhite from '../assets/images/home-white.svg';
import ChatList from '../components/ChatList';
import FriendList from '../components/FriendList';
import {MyProfile} from '../components/Myprofile';
import {theme} from '../config/theme';

const Tab = createBottomTabNavigator();

export function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: theme.primary, height: 100},
        headerStyle: {
          backgroundColor: theme.primary,
          height: 80,
          shadowOpacity: 0,
        },
        headerTintColor: theme.white,
        headerTitle: '',
        tabBarInactiveTintColor: theme.gray4,
        tabBarActiveTintColor: theme.white,
        tabBarIcon: ({focused, color, size}) => {
          let IconComponent;

          if (route.name === '마이홈') {
            IconComponent = focused ? HomeWhite : HomGray;
          } else if (route.name === '친구') {
            IconComponent = focused ? FriendWhite : FriendGray;
          } else if (route.name === '채팅') {
            IconComponent = focused ? ChatWhite : ChatGray;
          }

          return <IconComponent width={size} height={size} fill={color} />;
        },
      })}>
      <Tab.Screen name="마이홈" component={MyProfile} />
      <Tab.Screen name="친구" component={FriendList} />
      <Tab.Screen name="채팅" component={ChatList} />
    </Tab.Navigator>
  );
}
