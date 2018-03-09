import validator from './validator';
import { bCN } from './index';

const validateUsersCreation = data => {

  let constraints = {
    message:{length: {minimum: 1}},
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
    },

    [bCN('contact_info.contacts', 'name')]: {
    length: {
      minimum: 2,
    },
  },
  [bCN('contact_info.contacts', 'surname')]: {
    length: {
      minimum: 2,
    },
  },
  [bCN('contact_info.contacts', 'email')]: {
    email: {
      message: "is not valid."
    },
  },
    [bCN('contact_info.contacts', 'phone')]: {
      numericality: {
        onlyInteger: true,
      },
      length: {
        minimum: 5,
      }
    },

    [bCN('billing_info', 'country')]: {
    length: {
      minimum: 2,
    },
  },
    [bCN('billing_info', 'region')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('billing_info', 'address')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('billing_info', 'card','number')]:{
      presence: true,
      format: {
        pattern: /^(34|37|4|5[1-5]).*$/,
        message: "It is not a valid credit card number"
      },
      length: function(value, attributes, attributeName, options, constraints) {
        if (value) {
          // Amex
          if ((/^(34|37).*$/).test(value)) return {is: 15};
          // Visa, Mastercard
          if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
        }
        // Unknown card, don't validate length
        return false;
      }
    },

    [bCN('billing_info', 'card','cvc')]: {
      length: {
        minimum: 3,
        maximum: 3,
      },
    },
    [bCN('billing_info', 'card','exp_year')]: {
      numericality: {
        onlyInteger: true,
      },
      length: {
        maximum: 4,
      },
    },
    [bCN('billing_info', 'card','exp_month')]: {
      numericality: {
        onlyInteger: true,
        lessThanOrEqualTo:12,
      },
      length: {
        maximum: 2,
      },
    }

  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validateUsersCreation;