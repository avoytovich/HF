import {routerReducer} from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

import notifierReducer from './commonReducers/notifierReducer';
import commonReducer from './commonReducers/commonReducer';
import userReducer from './userReducer/userReducer';
import * as authReducers from './authReducers';

const config = {
  key: 'root',
  whitelist: ['userReducer'], // for those we need to be saved (only these will be saved)
  storage,
};

const rootReducer = persistCombineReducers(config, {
  notifications: notifierReducer(),
  commonReducer,
  userReducer,
  ...authReducers,
  routing: routerReducer
});

export default rootReducer;
