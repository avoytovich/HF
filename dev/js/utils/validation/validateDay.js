import validator from './validator';

const validateDay = data => {

  let constraints = {
    name: {
      presence: {
        message: 'is required'
      }
    }
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validateDay;