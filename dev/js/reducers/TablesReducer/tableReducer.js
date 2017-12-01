import { TABLE } from '../../actions';
import set       from 'lodash/set';


const template = {
  data: [],
  pagination: {
    total        : 0,
    count        : 0,
    per_page     : 5,
    current_page : 0,
    total_pages  : 0,
    order        : 'asc',
    orderBy      : 'users', // Custom
  }
};
const initialState = {
  listOfTables: ['diagnosis', 'conditions', 'treatments', 'evaluation', 'packages', 'exercises', 'userAll']
};

const _initialState = () => {
  const result = initialState.listOfTables.reduce((result, item) => {
    if (!item) return result;

    return Object.assign({}, result, {[item]: template});
  }, {});
  return {...initialState, ...result};
};

export default(state = _initialState(), action = TABLE) => {
  switch (action.type) {

    case `${TABLE}_UPDATE`:
      const {data, meta:{pagination}, path } = action.payload;
      return set(state, path, {data, pagination});

    default:
      return state;
  }
};