import { COMMON } from '../../actions';
const initialState = {
  isLoading  : 0,
  currentPath: ''
};


const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMON:
      return { ...state, ...action.payload };
    default:
      return state
  }
};

export default commonReducer;

