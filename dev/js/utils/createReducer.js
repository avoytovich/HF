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
  handlers[standardActionType] = (state, action) => ({ ...state, ...action.payload });

  // common clear action
  handlers[`${standardActionType}_CLEAR`] = () => initialState;

  // common error handler func - will fire by defualt when using dev/js/actions/common/onChange.js
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
