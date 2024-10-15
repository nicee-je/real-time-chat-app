import Toast from 'react-native-toast-message';

export const primaryToast = (title: string) => {
  Toast.show({
    type: 'primary',
    text1: title,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export default primaryToast;
