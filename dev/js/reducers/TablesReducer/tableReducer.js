import { TABLE }      from '../../actions';
import set            from 'lodash/set';
import * as dotProp   from 'dot-prop-immutable';


const template = {
  data: [],
  pagination: {
    total        : 0,
    count        : 0,
    per_page     : 5,
    current_page : 0,
    total_pages  : 0,
  },
  sortOptional: {
    sortedBy     : 'desc',
    orderBy      : 'title', // Custom
    search       : null
  }
};
const initialState = {
  listOfTables: ['diagnosis', 'conditions', 'treatments', 'evaluations', 'packages', 'exercises', 'userAll']
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

    case `${TABLE}_UPDATE_FIELDS`:
      const { orderBy, sortedBy, search, path: pathLink } = action.payload;
      return dotProp.set(state, pathLink, value => Object.assign({}, value, {orderBy, sortedBy, search}));

    default:
      return state;
  }
};