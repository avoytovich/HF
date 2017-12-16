import { setQuestion, findByArea }      from '../actions';

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


export const getMultipleAnswerValue = (list, value) =>
    list.reduce((result, item) => {
      if (item && !value) return item.label;
      return value.some(el => el === item.label) ? result.concat(item.label) : result;
    }, []);

export const  getAnswersList = (values) =>
  Object.keys(values).map(key => {
    const _value = values[key] && values[key].en;
    return {label: key, value: _value}
  });


export const getOptions = (input, key, onChangeCallBack, props, questionType, answerType) => {
  switch(true) {
    case !input.length  && !key:
      return Promise.resolve({ options: [] });

    case input.length && input.length < 3:
      return Promise.resolve({ options: [] });

    default:
      const { type, area, step } = props;
      const body = { type, area, step, answerType };

      return findByArea(questionType, 'findByAre', body, input || key).then(res => {
        const { data } = res.data;
        const _data = data.map(item => {
          return Object.assign({}, item, { label: item.question.en, value: item.key })
        });

        !input.length && key && onChangeCallBack(_data[0], true);

        return {
          options: _data,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        }
      });
  }
};