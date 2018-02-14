import validator from './validator';

const validateTariffPlanCreation = data => {

  let constraints = {
    cost_per_user:{
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: "Price should be a number",
      }
    },
    subscription_fee:{
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