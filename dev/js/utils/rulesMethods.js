import { setQuestion, findByArea, findConditionsByArea }      from '../actions';

export const SYMBOLS = [
  { value: '>',  label: '>'  },
  { value: '<',  label: '<'  },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' },
  { value: '!=', label: '!=' },
  { value: '=',  label: '='  }
];


export const onSingleAsyncChange = (value, edit, props) => {
  const { path, pathType, itemState} = props;

  if (!value || (Array.isArray(value) && !value.length)) {
    setQuestion(path, pathType, '', 'key');
    return;
  }

  const { subtype, type, values, min, max} = value.answer;


  if (subtype === 'range') {
    const _value = edit ?
      itemState :
      {
        key: value.key,
        op: '=',
        value: min
      };

    setQuestion(path, pathType, _value);
    return { type: 'range', min, max }
  }
  else {
    const answers = getAnswersList(values);
    const _value = edit ?
      itemState :
      {
        key: value.value,
        op: '=',
        value: '1'
      };

    setQuestion(path, pathType, _value);
    return { type: 'list', answers };
  }
};

export const onConditionAsyncChange = (value, edit, props) => {
  const { path, pathType, itemState} = props;
  if (!value || (Array.isArray(value) && !value.length)) {
    setQuestion(path, pathType, '', 'key');
    return;
  }

  const _value = edit ? itemState[0] : { key: value.value };
  setQuestion(path, pathType, _value);
};

export const onMultipleAsyncChange = (value, edit, props) => {
  const { path, pathType, itemState } = props;

  if (!value || (Array.isArray(value) && !value.length)) {
    return  setQuestion(path, pathType, '', 'key');
  }

  const { subtype, type, values, min, max} = value.answer;
  const answers = getAnswersList(values);
  const _value = edit ? itemState.value : [];

  setQuestion(path, pathType, { key: value.value, value: _value });

  return { type: 'list', answers }
};

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
  }, '1' );


export const getMultipleAnswerValue = (list, value) =>
    list.reduce((result, item) => {
      if (item && !value) return item.label;
      const _value = Array.isArray(value) ? value : [value];
      return _value.some(el => `${el}` === item.label) ? result.concat(item.label) : result;
    }, []);

export const  getAnswersList = (values) => {
 return values ? Object.keys(values).map(key => {
      const _value = values[key] && values[key].en;
      return {
        label:key,
        value:_value
      }
    }) : [];
};

export const getOptions = (input, key, onChangeCallBack, props, questionType, answerType, _type) => {
  switch(true) {
    case !input.length  && !key:
      return Promise.resolve({ options: [] });

    case input.length && input.length < 3:
      return Promise.resolve({ options: [] });

    default:
      const { type, areaIds, step, state: { page }, reqType } = props;
      const body = {
        type: checkRuleType(_type || type, page),
        answerType,
        answerSubtype: !answerType ? 'list' : undefined
      };
      const noSteps   = page === 'condition' || page === 'treatment';
      const noAreaIds = page === 'levelUp';
      let _body = noSteps   ? body  : {...body, step: step || null};
          _body = noAreaIds ? _body : {..._body, areaIds: areaIds || []};

      return findByArea(questionType, 'findByAre', _body, input || key).then(res => {
        const { data } = res.data;
        const _data = data.map(item => {
          return Object.assign({}, item, { label: item.title, value: item.key })
        });

        !input.length &&
        key &&
        onChangeCallBack(_data[0], true);

        return {
          options: _data,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        }
      });
  }
};

const checkRuleType = (type, page) => {
  switch (page) {
    case 'levelUp':
      return 'levelUp';
    case 'evaluation':
      return 'evaluation';
    default:
      return 'diagnostic'
  }
};

export const getConditionOptions = (input, key, onChangeCallBack, props, questionType, answerType, _type) => {
  switch(true) {
    case !input.length  && !key:
      return Promise.resolve({ options: [] });

    case input.length && input.length < 3:
      return Promise.resolve({ options: [] });

    default:
      const { type, areaIds, step } = props;

      const body = {
//        type: _type || type,
        areaIds: areaIds || [],
//        step: step || null,
//        answerType
      };

      return findConditionsByArea(questionType, 'findConditionsByAre', body).then(res => {
        const { data } = res.data;
        const _data = data.map(item => {
          return Object.assign({}, item, { label: item.title, value: item.key })
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