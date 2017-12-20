import {routerReducer}            from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import storage                    from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import notifierReducer            from './commonReducers/notifierReducer';
import commonReducer              from './commonReducers/commonReducer';
import userReducer                from './userReducer/userReducer';
import profileReducer                from './profileReducer/profileReducer';
import * as authReducers          from './authReducers';
import * as assetsReducer          from './assetsReducer';
import * as matrixReducers        from './matrixReducers';
import * as tableReducers         from './TablesReducer'
import * as createUsersReducers         from './createUsersReducers'
const config = {
  key: 'root',
  whitelist: ['userReducer', 'authReducer'], // for those we need to be saved (only these will be saved)
  storage,
};
const rootReducer = persistCombineReducers(config, {
  notifications: notifierReducer(),
  commonReducer,
  userReducer,
  profileReducer,
  ...authReducers,
  ...assetsReducer,
  ...createUsersReducers,
  ...matrixReducers.default,
  ...tableReducers.default,
  routing: routerReducer
});

export default rootReducer;
