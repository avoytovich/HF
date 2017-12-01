import { COMMON } from '../../actions';
import { createReducer } from '../../utils';
import languages from '../../config/lang';

const initialState = {
  isLoading  : 0,
  currentPath: '',
  languages: languages,
  currentLanguage: null,
};

const commonReducer =  createReducer(initialState, COMMON);

export default commonReducer;

