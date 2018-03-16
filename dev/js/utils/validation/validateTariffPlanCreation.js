import validator from './validator';
import { bCN } from './index';

const validateTariffPlanCreation = data => {

  let constraints = {
    cost_per_user:{
      format: {
        pattern: /^\$?\d+(,\d{3})*(\.\d*)?$/,
        flags: "i",
        message: "Cost should be a number"
      }
    },
    subscription_fee:{
      format: {
        pattern: /^\$?\d+(,\d{3})*(\.\d*)?$/,
        flags: "i",
        message: "Cost should be a number"
      }
    },
    [bCN('pricing_groups','price')]: {
      format: {
        pattern: /^\$?\d+(,\d{3})*(\.\d*)?$/,
        flags: "i",
        message: "Cost should be a number"
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