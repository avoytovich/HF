import { setQuestion }      from '../actions';

export const SYMBOLS = [
  {value: '>',   label: '>'},
  {value: '<',   label: '<'},
  {value: '>=',  label: '>='},
  {value: '<=',  label: '<='},
  {value: '!=',  label: '!='},
  {value: '==',  label: '=='}
];

export const onAnswerChange = (event, {path, pathType}, key) => {
  const value = event.target.value;
  setQuestion(path, pathType, value, key);
};

export const onSymbolChange = (event, {path, pathType}) => {
  const value = event.target.value;
  setQuestion(path, pathType, value, 'op');
};

export const getSymbolValue = (value) =>
  SYMBOLS.reduce((result, item) => item && item.value === value ? item.value : result, '==');

export const getAnswerValue = (list, value) =>
  list.reduce((result, item) => {
    if (item && !value) return item.label;

    return value === item.label ? item.label : result;
  }, 'A' );

export const  getAnswersList = (values) =>
  Object.keys(values).map(key => ({label: key, value: values[key]}) );
