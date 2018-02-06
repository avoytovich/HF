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
  const notURL = (title) => `^${title} doesn't look like a valid link`;

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
    app_title: {
      length: {
        minimum: 2,
        tokenizer: minimizeString,
        tooShort: tooShort('App title'),
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

    //Exercise
    [bCN('exercise', 'name')]: {
      length: {
        minimum: 2,
        message: notEmpty('Notes'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'comments')]: {
      length: {
        minimum: 2,
        message: notEmpty('Comments'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'instruction', 'en')]: {
      length: {
        minimum: 2,
        message: notEmpty('Instruction'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'instruction', 'swe')]: {
      length: {
        minimum: 2,
        message: notEmpty('Instruction'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'title', 'en')]: {
      length: {
        minimum: 2,
        message: notEmpty('Title'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'title', 'swe')]: {
      length: {
        minimum: 2,
        message: notEmpty('Title'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'information', 'en')]: {
      length: {
        minimum: 2,
        message: notEmpty('Information'),
        tokenizer: minimizeString,
      }
    },
    [bCN('exercise', 'information', 'swe')]: {
      length: {
        minimum: 2,
        message: notEmpty('Information'),
        tokenizer: minimizeString,
      }
    },
    [bCN('evaluation_result_data', 'redirect')]: {
      url: {
        message: notURL('URL address')
      }
    },
    [bCN('evaluation_result_data', 'info')]: {
      length: {
        minimum: 2,
        tooShort: tooShort('Key'),
        tokenizer: minimizeString,
      }
    }
  };

  const { isValid, errors } = validator(data, constraints);
  return {isValid, errors}
};
