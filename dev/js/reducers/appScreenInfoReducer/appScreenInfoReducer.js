import { createReducer } from '../../utils';
import { APP_INFO } from '../../actions';

const initialState = {
  actionType                : APP_INFO,
  lang                      : 'en',
  home_screen               : { en: '', swe: ''},
  start_session_screen      : { en: '', swe: ''},
  details_session_screen    : { en: '', swe: ''},
  self_diagnosis_screen     : { en: '', swe: ''},
  health_history_screen     : { en: '', swe: ''},
  pain_profile_screen       : { en: '', swe: ''},
  diagnostic_test_screen    : { en: '', swe: ''},
  progress_screen           : { en: '', swe: ''},
  prognosis_screen          : { en: '', swe: ''},
  schedule_screen           : { en: '', swe: ''},
  reminders_screen          : { en: '', swe: ''},
  favourite_exercises_screen: { en: '', swe: ''},
  activity_journal_screen   : { en: '', swe: ''},
  profile_screen            : { en: '', swe: ''}
};

const addInfo = (state, action) => {
  const { payload } = action;

  if (!Array.isArray(payload)) {
    return { ...state, ...payload };
  }
  return state;
};

export default createReducer(initialState, APP_INFO, {
  [`${APP_INFO}_ADD`]     : addInfo,
});