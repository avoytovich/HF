import {routerReducer}            from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import storage                    from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import notifierReducer            from './commonReducers/notifierReducer';
import commonReducer              from './commonReducers/commonReducer';
import userReducer                from './userReducer/userReducer';
import CSVFileReducer             from './CSVFileReducer/CSVFileReducer'
import profileReducer             from './profileReducer/profileReducer';
import simpleUserProfileReducer   from './profileReducer/simpleUserProfileReducer';
import chatReducer                from './chatReducers/chatReducer';
import messageListReducer         from './chatReducers/messageListReducer';
import * as authReducers          from './authReducers';
import * as assetsReducer         from './assetsReducer';
import * as matrixReducers        from './matrixReducers';
import * as tableReducers         from './TablesReducer'
import * as createUsersReducers   from './createUsersReducers'
import * as tariffPlansReducers   from './tariffPlansReducers'
import * as testingReducer        from './testingReducer'
const config = {
  key: 'root',
  // for those we need to be saved (only these will be saved)
  whitelist: ['userReducer', 'authReducer', 'testingReducer', 'bodyModelReducer', 'tables'],
  storage,
};
const rootReducer = persistCombineReducers(config, {
  notifications: notifierReducer(),
  commonReducer,
  userReducer,
  profileReducer,
  simpleUserProfileReducer,
  chatReducer,
  messageListReducer,
  CSVFileReducer,
  ...authReducers,
  ...assetsReducer,
  ...createUsersReducers,
  ...tariffPlansReducers,
  ...matrixReducers.default,
  ...tableReducers.default,
  ...testingReducer,
  routing: routerReducer
});

export default rootReducer;
