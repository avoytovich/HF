import validator from './validator';

const validateDay = data => {

  let constraints = {
    email: {
      email: {
        message: "is not valid"
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