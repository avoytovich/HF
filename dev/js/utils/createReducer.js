import set from 'lodash/set';
import keys from 'lodash/keys';
import cloneDeep from 'lodash/cloneDeep';
/**
 *
 * @param initialState object
 * @param standardActionType general action payload dispatch to store
 * @param handlers functions
 * @returns {function}
 */
export const createReducer = (initialState, standardActionType, handlers = {}) => {
  // common action
  handlers[standardActionType] = (state, action) => {
    const stateCopied = { ...state };

    // it allows to pass the path in state as complex name (i.e. users[index].name)
    keys(action.payload).forEach(prop => set(stateCopied, prop, action.payload[prop]));
    return stateCopied;
  };

  // common clear action
  handlers[`${standardActionType}_CLEAR`] = () => cloneDeep(initialState);

  // common error handler func - will fire by default when using dev/js/actions/common/onChange.js
  handlers[`${standardActionType}_ERROR`] = (state, action) =>
    ({ ...state, errors: { ...state.errors, ...action.payload.errors } });

   return (state = initialState, action) => {

     if (handlers.hasOwnProperty(action.type)) {
       return handlers[action.type](state, action);
     }

    return state;
  };
};
