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
