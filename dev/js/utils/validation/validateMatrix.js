import validator from './validator';
import { bCN } from './index';
import validate from 'validate.js';

const minimizeString = (value) => validate.isEmpty(value) ? '' : value.trim();

export const validateMatrix = data => {
  const tooShort = (title) => `^${title} is too short (minimum is %{count} characters)`;
  const tooLong  = (title) => `^${title} is too long (maximum is %{count} characters)`;
  const notInteger = (title) => `^${title} is not a number`;
  const notGreaterThanOrEqualTo = (title) => `^${title} must be greater than or equal to 0`;
  const notLessThanOrEqualTo = (title, lessThen) => `^${title} must be less than or equal to ${lessThen | 100}`;
  const notEmpty = (title) => `^${title} cannot be empty`;

  const constraints = {
    questionTitle: {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    questionKey: {
      length: {
        minimum: 2,
        maximum: 80,
        tokenizer: minimizeString,
        tooShort: tooShort('Key'),
        tooLong : tooLong('Key')
      },
    },
    [bCN('question', 'en')] : {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Question in English'),
      }
    },
    [bCN('question', 'swe')] : {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Answer in Swedish'),
      }
    },
    [bCN('single', 'en')]: {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Answer in English'),
      }
    },
    [bCN('single', 'swe')]: {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Answer in Swedish'),
      }
    },
    [bCN('multiple', 'en')]: {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Answer in English'),
      }
    },
    [bCN('multiple', 'swe')]: {
      length:{
        minimum :2,
        tokenizer: minimizeString,
        tooShort:tooShort('Answer in Swedish'),
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
        notInteger: notInteger('Value TO'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value TO')
      }
    },
    //treatmentsPackage
    [bCN('treatmentsPackage', 'id')]: {
      length: {
        minimum: 1,
        message: notEmpty('Package'),
        tokenizer: (value) => value ? `${value}` : '',
      }
    },
    treatmentsLevels: {
      length:{
        minimum :1,
        tokenizer: (value) => value ? `${value}` : '',
        tooShort: notEmpty('Level'),
      }
    },
    [bCN('packageLevels', 'level_up_properties', 'vas_trend')]: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 100,
        notInteger: notInteger('Value VAS'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value VAS'),
        notLessThanOrEqualTo: notLessThanOrEqualTo('Value VAS', 100)
      }
    },
    [bCN('packageLevels', 'level_up_properties', 'vas_min')]: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 100,
        notInteger: notInteger('Value VAS'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value VAS'),
        notLessThanOrEqualTo: notLessThanOrEqualTo('Value VAS', 100)
      }
    },
    [bCN('packageLevels', 'level_up_properties', 'session_count')]: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        notInteger: notInteger('Value Session'),
        notGreaterThanOrEqualTo: notGreaterThanOrEqualTo('Value Session'),
      }
    },
  };

  const { isValid, errors } = validator(data, constraints);
  return {isValid, errors}
};
