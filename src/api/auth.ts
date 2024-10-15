import Storage from './utils/Storage';

async function getAccount() {
  return await Storage.get('account');
}

async function setAccount(data: any) {
  return await Storage.set('account', data);
}

async function logout() {
  return await Storage.set('account', null);
}

export default {
  getAccount,
  setAccount,
  logout,
};
