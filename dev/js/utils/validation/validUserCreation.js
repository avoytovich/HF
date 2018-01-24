import validator from './validator';
import { bCN } from './index';

const validUsersCreation = data => {

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
    }
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validUsersCreation;