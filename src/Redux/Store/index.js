import {configureStore} from '@reduxjs/toolkit';
import reducer from '../reducer';

const Store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }),
});

export default Store;
