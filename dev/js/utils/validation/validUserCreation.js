import validator from './validator';

const validUsersCreation = data => {

  let constraints = {
    email: {
      email: {
        message: "is not valid."
      },
    },
    entryFee:{
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
      }
    },
    tariff_id:{
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
      }
    },
    name:{
      length: {minimum: 2}
    }
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validUsersCreation;