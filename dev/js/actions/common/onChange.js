import { validate } from '../../utils';

export const onChange = (e, val = 'value') => dispatch => {
  let type     = e.target.name; //actionType
  let property = e.target.id; // reducer's property
  let value    = e.target[val]; // input value
  let { errors } = validate[type]({ [property]: value }); // error object for all related inputs

  dispatch([
    {
      type   : type,
      payload: { [property]: value }
    },
    {
      type   : `${type}_ERROR`,
      payload: {
        errors: { [property]: errors[property] }
      }
    },

  ]);
};
