import { CREATE_QUESTION } from '../../actions';

const diagnosticTab = {
  content_type  : 'question', // 'question', 'functionalTest', 'vas'
  area          : { label: 'All', value: null, id: null },
  questionTitle : '',
  question      : { en: '', swe: '' },
  questionKey   : '',
  sequence      : 1,
  sequenceType  : 'normal',
  answerType    : 'single',
  single  : [ { en: '', swe: ''} ],
//  multiple: [ { en: '', swe: ''} ],
  range   : { from: 0, to: 100 },
  diagnostic_assets: { id: null },
  rules: [],
};

const bodyAreaTab = {
  description      : '',
  key   : '',
  title  : '',
};

const conditionTab = {};

const treatmentTab = {
  treatmentsPackage: '',
  treatmentsLevels: ''
};

const packageTab = {
  packageType: 'symptomatic',
  packageLevels: [
    {
      level: 1,
      level_up_properties: {
        vas_trend_down        : '1',
        vas_min               : '1',
        package_level_sessions: '1',
        therapy_continuity    : '1',
        package_level_days    : '1'
      },
      therapy_continuity: 'daily',
      exercises: []
    }
  ],
  app_title     : '',
};

const levelUp = {
  levelup_result: false,
  packageLevelsList: [
    {packageId: '', levelsList: [], levelId: ''}
  ]
};

const evaluation = {
  evaluation_result     : '',
  evaluation_result_data: {
    redirect: '',
    page: 'http://heal.com/screen1',
    info: '',
  }
};

const exerciseTab = {
  exercise: {
    name        : '',
    comments    : '',
    instruction : { swe: '', en: '' },
    title       : { swe: '', en: '' },
    information : { swe: '', en: '' },
    testing_mode : true,
  },
};

export  default {
  actionType    : CREATE_QUESTION,
  errors        : {},
  questionAnswerLang: 'en',
  page          : null,
  areas         : [],
  areaIds       : [],
  testing       : true,
  testing_mode  : true,
  ...diagnosticTab,
  ...conditionTab,
  ...treatmentTab,
  ...packageTab,
  ...levelUp,
  ...evaluation,
  ...exerciseTab,
  ...bodyAreaTab,
};
