import validator from './validator';

import { bCN } from './index';

export const validateMatrix = data => {
  const tooShort = (title) => `^${title} is too short (minimum is %{count} characters)`;
  const tooLong  = (title) => `^${title} is too long (maximum is %{count} characters)`;
  const notInteger = (title) => `^${title} is not a number`;
  const notGreaterThanOrEqualTo = (title) => `^${title} must be greater than or equal to 0`;

  const constraints = {
    questionTitle: {
      length: {
        minimum: 2,
        maximum: 120,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    questionKey: {
      length: {
        minimum: 2,
        maximum: 80,
        tooShort: tooShort('Key'),
        tooLong : tooLong('Key')
      },
    },
    [bCN('question', 'en')] : {
      length:{
        minimum :2,
        tooShort:tooShort('Question on English'),
      }
    },
    [bCN('question', 'swe')] : {
      length:{
        minimum :2,
        tooShort:tooShort('Answer on Swedish'),
      }
    },
    [bCN('single', 'en')]: {
      length:{
        minimum :2,
        tooShort:tooShort('Answer on English'),
      }
    },
    [bCN('single', 'swe')]: {
      length:{
        minimum :2,
        tooShort:tooShort('Answer on Swedish'),
      }
    },
    [bCN('multiple', 'en')]: {
      length:{
        minimum :2,
        tooShort:tooShort('Answer on English'),
      }
    },
    [bCN('multiple', 'swe')]: {
      length:{
        minimum :2,
        tooShort:tooShort('Answer on Swedish'),
      }
    },
    [bCN('range', 'from')]: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        notInteger: notInteger('Value FROM'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value FROM')
      }
    },
    [bCN('range', 'to')]  : {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        notInteger: notInteger('Value FROM'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value TO')
      }
    }
  };

  const { isValid, errors } = validator(data, constraints);
  return {isValid, errors}
};
