import { TABLE }      from '../../actions';
import set            from 'lodash/set';
import * as dotProp   from 'dot-prop-immutable';
import qs             from 'query-string';

const TEMPLATE = {
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
    orderBy      : '', // Custom
    search       : null
  }
};
const initialState = {
  listOfTables: [
    {
      name: 'diagnosis' ,
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'conditions',
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'treatments',
      changes: []
    },
    {
      name: 'evaluations',
      changes: []
    },
    {
      name: 'packages',
      changes: []
    },
    {
      name: 'exercises',
      changes: []
    },
    {
      name: 'userAll',
      changes: []
    },
    {
      name: 'assets',
      changes: []
    }
  ]
};

const _initialState = () => {
  const result = initialState.listOfTables.reduce((result, item) => {
    if (!item) return result;

    const { name, changes } = item;
    const val = changes.reduce((res, el) => {
      if (item) return dotProp.set(res, el.path, el.value);

      return res
    }, TEMPLATE);
    return Object.assign({}, result, { [name]: val });
  }, {});
  return {...initialState, ...result};
};

export default(state = _initialState(), action = TABLE) => {
  switch (action.type) {

    case `${TABLE}_UPDATE`:
      const {data, meta:{pagination}, path } = action.payload;
      const sortOptional = getSortParams(state, path, pagination);
      return set(state, path, {data, pagination, sortOptional});

    case `${TABLE}_UPDATE_FIELDS`:
      const { orderBy, sortedBy, search, path: pathLink } = action.payload;
      return dotProp.set(state, pathLink, value => Object.assign({}, value, {orderBy, sortedBy, search}));

    default:
      return state;
  }
};

export const getSortParams = (state, path, pagination) => {
  const { next }        = pagination.links;
  const old             = dotProp.get(state, `${path}.sortOptional`);
  const queryStartIndex = next && next.indexOf('?');

  if ( queryStartIndex >= 0 ) {
    const { sortedBy, orderBy, search } = qs.parse(next.slice(queryStartIndex));
    return Object.assign({}, old, {sortedBy, orderBy, search});
  }
  return old;
};
