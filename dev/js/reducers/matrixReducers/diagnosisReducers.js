import { LIST } from '../../actions';
import { createReducer } from '../../utils';

const initialState = {
  data: [],
  pagination: {
    total        : 0,
    count        : 0,
    per_page     : 5,
    current_page : 0,
    total_pages  : 0,
    order        : 'asc',
    orderBy      : 'users',
  }
};

export default(state = initialState, action = LIST) => {
  switch (action.type) {

    case 'LIST_UPDATE':
      const {data, meta:{pagination} } = action.payload;
      return {...state, data, pagination};
    default:
      return state;
  }
};
