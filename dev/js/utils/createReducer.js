import set from 'lodash/set';
import keys from 'lodash/keys';
/**
 *
 * @param initialState object
 * @param standardActionType general action payload dispatch to store
 * @param handlers functions
 * @returns {state}
 */
export const createReducer = (initialState, standardActionType, handlers = {}) => {
  if (process.env.NODE_ENV === 'development' && handlers.undefined) {
    console.warn(`Reducer contains an 'undefined' action type. Have you misspelled a constant?`);
  }
  // common action
  handlers[standardActionType] = (state, action) => {
    const stateCopied = { ...state };

    // it allows pass the path in state as complex (i.e. users[index].name)
    keys(action.payload).forEach(prop => set(stateCopied, prop, action.payload[prop]));
    return stateCopied;
  };

  // common clear action
  handlers[`${standardActionType}_CLEAR`] = () => initialState;

  // common error handler func - will fire by default when using dev/js/actions/common/onChange.js
  handlers[`${standardActionType}_ERROR`] = (state, action) =>
    ({ ...state, errors: action.payload.errors });

  return function reducer(state, action) {
    if (state === undefined) {
      state = initialState;
    }

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};
