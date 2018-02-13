import validator from './validator';

const validateTariffPlanCreation = data => {

  let constraints = {
    price:{
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: "Price should be a number",
      }
    },
    cost:{
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: "Cost should be a number",
      }
    },
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validateTariffPlanCreation;