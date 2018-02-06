export let domen;

// form serving front-end assets - i.e. /images - `${assets}/images/auth/page-1.png`
export let assets;

if (process.env.NODE_CUSTOM_MODE === 'development') {
  assets = 'http://18.194.17.252/assets';
  domen = {
    users      : 'http://18.195.77.253',
    exercises  : 'http://18.195.76.169',
    diagnostics: 'http://18.194.211.206',
    s3         : 'https://pv9ueiwsy4.execute-api.eu-central-1.amazonaws.com/dev',
  };
} else if (process.env.NODE_ENV === 'production') {
  assets = 'http://54.93.106.29/assets';
  domen = {
    users      : 'http://54.93.77.193',
    exercises  : 'http://54.93.228.195',
    diagnostics: 'http://35.156.163.53',
    s3         : 'https://uk6yk108kj.execute-api.eu-central-1.amazonaws.com/prod',
  };
} else {
  assets = 'http://localhost:3030/dist/assets';
  domen = {
    users      : 'http://18.195.77.253',
    exercises  : 'http://18.195.76.169',
    diagnostics: 'http://18.194.211.206',
    s3         : 'https://pv9ueiwsy4.execute-api.eu-central-1.amazonaws.com/dev',
  };
}


export const api = {
  simpleUsers         : '/users/get/all',
  clinicsUsers        : '/users/get/all',
  companiesOwnUsers   : '/users/customer',
  clinicsOwnUsers     : '/users/customer',
  companies           : '/customers/get/all',
  clinics             : '/customers/get/all',
  customers           : '/customers/',
  createSimpleUser    : '/users/customer',
  createSimpleUserByCSV    : '/users/csv/add/',
  userProfile         : '/users/',
  logout              : '/auth/logout',
  packages            : '/packages',
  exercises           : '/exercises',
  bodyArea            : '/matrix/areas',
  diagnosis           : '/matrix/diagnostics',
  evaluations         : '/matrix/evaluations',
  levelUps            : '/matrix/levelUps',
  conditions          : '/matrix/conditions',
  treatments          : '/matrix/treatments',
  areas               : '/matrix/areas',
  passForgot          : '/auth/password/forgot/web',
  passReset           : '/auth/password/update',
  findArea            : '/matrix/areas/get/side',
  findByAre           : '/matrix/questions/find/area',
  findEvalByAre       : '/matrix/evaluations/find/area',
  findByKey           : '/matrix/questions/get/key',
  findCondByKey       : '/matrix/conditions/get/key',
  sequenceList        : '/matrix/questions/steps/get/type',
  changeSequenceTitle : '/matrix/questions/steps/diagnostic',
  createQuestion      : '/matrix/questions',
  getPackageByArea    : '/packages/get/area',
  treatmentsFindArea  : '/matrix/treatments/find/area',
  generate            : '/exercises/files/url/generate',
  generateExercises   : '/exercises/files/url/generate',
  generateDiagnostics : '/diagnostics/files/url/generate',
  assets              : '/files',
  assetsExercises     : '/files',
  assetsDiagnostics   : '/files',
  evaluation          : '/matrix/evaluation',
  login               : '/auth/login',
  userOwn             : '/users/my',
  organizationsUsers  : '/users/get/all',
  userAll             : '/users/get/all',
  findConditionsByAre : '/matrix/conditions/get/area',
  questionsByStep     : '/matrix/questions/get/area',
  getConditionById    : '/matrix/conditions',
  test                : '/diagnostics/all/user',
  getExercises        : '/exercises/ids',
  diagnostics         : '/diagnostics',
  checkQuestion       : '/diagnostics/session',
  unblock             : '/diagnostics/session',
  existingTest        : '/diagnostics/session',
  chat                : '/dialogs/all/users',
  createDialog        : '/dialogs',
  getMessages         : '/messages/dialog/',
  createMessage       : '/messages',
  getAllSideAreas     : '/matrix/areas/get/side',
  personalCabinetUsers : '/users/get/all',
};

export const PAGE = {
  bodyArea          : '/matrix-setup/body-area',
  test              : '/test',
  testNew           : '/test/new',
  home              : '/',
  login             : '/login',
  signup            : '/signup',
  passReset         : '/pass-reset',
  passForgot        : '/pass-forgot',
  companies         : '/companies',
  clinics           : '/clinics',
  users             : '/users',
  assets            : '/assets',
  assetsExercises   : '/assets/assets-exercises',
  assetsDiagnostics : '/assets/assets-diagnostics',
  assetsUpload      : '/assets/upload',
  assetsEdit        : '/assets/edit',
  clinicProfile     : '/clinic/:id/profile',
  companyProfile    : '/company/:id/profile',
  companyOwnUsers   : '/company/:id/users',
  clinicOwnUsers    : '/clinic/:id/users',
  matrixSetup       : '/matrix-setup',
  chat              : '/chat',
  diagnosis         : '/matrix-setup/diagnosis',
  conditions        : '/matrix-setup/conditions',
  treatments        : '/matrix-setup/treatments',
  evaluations       : '/matrix-setup/evaluations',
  simpleUsers       : '/users-simple',
  organizationsUsers: '/users-organizations',
  clinicsUsers      : '/users-clinics',
  levelUps          : '/matrix-setup/levelUps',
  packages          : '/matrix-setup/packages',
  exercises         : '/matrix-setup/exercises',
  diagnosisCreate   : '/diagnosis-create',

  personalCabinet     :  'personal-cabinet',
  personalCabinetUsers : '/personal-cabinet/users',
  personalCabinetUserProfile : '/personal-cabinet/users/:id/profile',
  personalCabinetProfile : '/personal-cabinet/profile',
  personalCabinetBilling : '/personal-cabinet/billing',
};
