import { createReducer } from '../../utils';
import { USER } from '../../actions';

const initialState = {
  language: 'en',
};

// const exampleFuncForAction = (state, action) => {
//   do smth...
//   return { ...state, ...action.payload };
// }
//
// const userReducer = createReducer(initialState, USER, {
//   [EXAMPLE_TYPE]: exampleFuncForAction,
// });

const userReducer = createReducer(initialState, USER);

export default userReducer
