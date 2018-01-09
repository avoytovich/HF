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
  therapyContinuity: '1',
  packageLevels: []
};

const levelUp = {
  packageLevels: []
};

const exerciseTab = {
  exercise: {
    instruction: { swe: '', en: '' },
    title      : { swe: '', en: '' },
    information: { swe: '', en: '' },
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
