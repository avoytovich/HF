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
  multiple: [ { en: '', swe: ''} ],
  range   : { from: 0, to: 100 },
  diagnostic_assets: '',
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
        vas: 1,
        vas_min: 1,
        sessions: 1
      },
      therapy_continuity: '1',
      exercise_ids: []
    }
  ]
};

const levelUp = {
  packageLevelsList: []
};

const exerciseTab = {
  exercise: {
    name        : '',
    comments    : '',
    instruction : { swe: '', en: '' },
    title       : { swe: '', en: '' },
    information : { swe: '', en: '' },
  },
};

export  default {
  actionType    : CREATE_QUESTION,
  errors: {},
  page          : null,
  areas         : [],
  areaIds       : [],

  ...diagnosticTab,
  ...conditionTab,
  ...treatmentTab,
  ...packageTab,
  ...levelUp,
  ...exerciseTab,
  ...bodyAreaTab,
};
