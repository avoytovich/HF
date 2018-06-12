import { createReducer } from '../../utils';
import { APP_INFO } from '../../actions';

const initialState = {
  actionType: APP_INFO,
  lang: 'en',
  home_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  start_session_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  details_session_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  self_diagnosis_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  health_history_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  pain_profile_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  diagnostic_test_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  progress_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  prognosis_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  schedule_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  favourite_exercises_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  activity_journal_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  profile_screen: {
    information: { en: '', swe: '' },
    instruction: { en: '', swe: '' }
  },
  therapy_control_screen: {
    information: { en: '', swe: ''},
    instruction: { en: '', swe: ''}
  }
};

const addInfo = (state, action) => {
  const { payload } = action;

  if (!Array.isArray(payload)) {
    return { ...state, ...payload };
  }
  return state;
};

export default createReducer(initialState, APP_INFO, {
  [`${APP_INFO}_ADD`]: addInfo,
});