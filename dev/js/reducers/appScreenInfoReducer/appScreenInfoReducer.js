import { createReducer } from '../../utils';
import { APP_INFO } from '../../actions';

const initialState = {
  home_screen               : '',
  start_session_screen      : '',
  details_session_screen    : '',
  self_diagnosis_screen     : '',
  health_history_screen     : '',
  pain_profile_screen       : '',
  diagnostic_test_screen    : '',
  progress_screen           : '',
  prognosis_screen          : '',
  schedule_screen           : '',
  reminders_screen          : '',
  favourite_exercises_screen: '',
  activity_journal_screen   : '',
  profile_screen            : ''
};

const addInfo = (state, action) => {
  return { ...state };
};

const changeInfo = (state, action) => {
  return { ...state };
};

export const appScreenInfoReducer = createReducer(initialState, APP_INFO, {
  [`${APP_INFO}_ADD`]   : addInfo,
  [`${APP_INFO}_CHANGE`]: changeInfo,
});
