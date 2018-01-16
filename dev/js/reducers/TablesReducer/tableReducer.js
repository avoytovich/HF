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
    orderBy      : 'name', // Custom
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
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'levelUps',
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'bodyArea',
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'packages',
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'exercises',
      changes: [
        { path: 'sortOptional.orderBy', value: 'title' }
      ]
    },
    {
      name: 'users',
      changes: []
    },
    {
      name: 'companies',
      changes: []
    },
    {
      name: 'clinics',
      changes: []
    },
    {
      name: 'assets',
      changes: []
    },
    {
      name: 'simpleUsers',
      changes: []
    },
    {
      name: 'organizationsUsers',
      changes: []
    },
    {
      name: 'clinicsUsers',
      changes: []
    },
    {
      name: 'test',
      changes: []
    },
    {
      name: 'clinicOwnUsers',
      changes: []
    },
    {
      name: 'companyOwnUsers',
      changes: []
    },

    {
      name: 'assetsExercises',
      changes: []
    },
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
      const {data, meta:{pagination}, path, query} = action.payload;
      const { total, per_page, current_page } = pagination;
      // Todo: Remove this after backend will be fix
      const _total = !total && data.length ?  data.length +  per_page * (current_page - 1) : total;
      const _pagination = { ...pagination, total: _total };

      const sortOptional = {
        sortedBy: query.sortedBy,
        orderBy : query.orderBy,
        search  : query.search
      };
      return set(state, path, {data, pagination: _pagination, sortOptional});

    case `${TABLE}_UPDATE_FIELDS`:
      const { orderBy, sortedBy, search, path: pathLink } = action.payload;
      return dotProp.set(state, pathLink, value => Object.assign({}, value, {orderBy, sortedBy, search}));

    default:
      return state;
  }
};
