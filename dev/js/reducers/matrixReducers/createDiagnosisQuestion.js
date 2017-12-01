import { createReducer }   from '../../utils';
import { CREATE_QUESTION } from '../../actions';

const initialState = {
  actionType: CREATE_QUESTION,
  question: '',
  questionKey: '',
  sequence: 1,
  sequenceType: '',
  answerType: 'single',
  answerSingle: [
    undefined,
    undefined,
  ],
  answerMultiple: [
    undefined,
    undefined,
  ],
  answerRange: {
    from: 0,
    to: 100
  },
  errors: {},
};

export default createReducer(initialState, CREATE_QUESTION);