import validator from './validator';
import validate from 'validate.js';
import { store } from '../../index';
import { bCN } from './index';


const validateAppInfo = data => {
  const minimizeString = (value) => validate.isEmpty(value) ? '' : value.trim();
  const tooShort = (title) => `^${title} is too short (minimum is %{count} characters)`;
  const tooLong  = (title) => `^${title} is too long (maximum is %{count} characters)`;
  const notInteger = (title) => `^${title} is not a number`;
  const notGreaterThanOrEqualTo = (title) => `^${title} must be greater than or equal to 0`;
  const notLessThanOrEqualTo = (title, lessThen) => `^${title} must be less than or equal to ${lessThen | 100}`;
  const notEmpty = (title) => `^${title} cannot be empty`;
  const notURL = (title) => `^${title} doesn't look like a valid link`;

  const constraints = {
    'home_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'start_session_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'details_session_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'self_diagnosis_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'health_history_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'pain_profile_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'diagnostic_test_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'progress_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'prognosis_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'schedule_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'reminders_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'favourite_exercises_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'activity_journal_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
    'profile_screen': {
      length: {
        minimum: 2,
        maximum: 120,
        tokenizer: minimizeString,
        tooShort: tooShort('Title'),
        tooLong: tooLong('Title')
      }
    },
  };

  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

export default validateAppInfo;
