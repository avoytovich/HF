import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import notifierReducer from './commonReducers/notifierReducer';

//adminReducers reducers
import commonReducer from './commonReducers/commonReducer';

const rootReducer = combineReducers({
  notifications: notifierReducer(),
  commonReducer,
  routing: routerReducer
});

export default rootReducer;
