import AsyncStorage from '@react-native-async-storage/async-storage';

async function get(key: string, defaultValue = null) {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      value = JSON.parse(value);
    }
    return value;
  } catch (error) {
    console.log('Could not saave data: ' + key, error);
  }
}

async function set(key: string, value: string) {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Could not save data: ' + key, error);
  }
}
async function remove(key: string) {}

async function clear() {
  try {
    return await AsyncStorage.clear(() => {
      console.log('cleared');
    });
  } catch (error) {
    console.log('Could not clear data', error);
  }
}

export default {
  get,
  set,
  remove,
  clear,
};
