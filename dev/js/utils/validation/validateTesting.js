import validator from './validator';

const validateTesting = data => {

  let constraints = {
    title: {
      length: {
        minimum: 2,
      }
    },
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validateTesting;