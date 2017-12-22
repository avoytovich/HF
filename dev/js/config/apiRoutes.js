// TODO
// Users 18.195.77.253
// exercises 18.195.76.169
// diagnostics 18.194.211.206

export const domen = {
  users      : 'http://18.195.77.253',
  exercises  : 'http://18.195.76.169',
  diagnostics: 'http://18.194.211.206',
  s3         : 'https://pv9ueiwsy4.execute-api.eu-central-1.amazonaws.com',
};

export const api = {
  login             : '/auth/login',
  userOwn           : '/users/my',
  organizationsUsers: '/users/get/all',
  simpleUsers       : '/users/get/all',
  clinicsUsers      : '/users/get/all',
  companies         : '/customers/get/all',
  clinics           : '/customers/get/all',
  userProfile       : '/users/',
  logout            : '/auth/logout',
  packages          : '/packages',
  exercises         : '/exercises',
  bodyArea          : '/matrix/areas',
  diagnosis         : '/matrix/diagnostics',
  evaluations       : '/matrix/evaluations',
  conditions        : '/matrix/conditions',
  treatments        : '/matrix/treatments',
  passForgot        : '/auth/password/forgot/web',
  passReset         : '/auth/password/update',
  findArea          : '/matrix/areas/get/all',
  findByAre         : '/matrix/questions/find/area',
  findByKey         : '/matrix/questions/get/key',
  findCondByKey     : '/matrix/conditions/get/key',
  sequenceList      : '/matrix/questions/steps/get/type',
  createQuestion    : '/matrix/questions',
  getPackageByArea  : '/packages/get/area',
  treatmentsFindArea: '/matrix/treatments/find/area',
  generate          : '/dev/exercises/files/url/generate',
  assets            : '/files',
  evaluation        : '/matrix/evaluation',
  findConditionsByAre : '/matrix/conditions/get/area',
  questionsByStep   : '/matrix/questions/get/area',
  getConditionById  : '/matrix/conditions',
  test              : '/diagnostics/all/user',
};

// form serving front-end assets - i.e. /images - `${assets}/images/auth/page-1.png`
export const assets = 'http://localhost:3030/assets';

export const PAGE = {
  home              : '/',
  login             : '/login',
  signup            : '/signup',
  passReset         : '/pass-reset',
  passForgot        : '/pass-forgot',
  companies         : '/companies',
  clinics           : '/clinics',
  simpleUsers       : '/users-simple',
  organizationsUsers: '/users-organizations',
  clinicsUsers      : '/users-clinics',
  assets            : '/assets',
  assetsUpload      : '/assets/upload',
  assetsEdit        : '/assets/edit',
  clinicProfile     : '/clinic/:id/profile',
  matrixSetup       : '/matrix-setup',
  chat              : '/chat',
  diagnosis         : '/matrix-setup/diagnosis',
  conditions        : '/matrix-setup/conditions',
  treatments        : '/matrix-setup/treatments',
  evaluation        : '/matrix-setup/evaluation',
  evaluations       : '/matrix-setup/evaluations',
  bodyArea          : '/matrix-setup/body-area',
  packages          : '/matrix-setup/packages',
  exercises         : '/matrix-setup/exercises',
  diagnosisCreate   : '/diagnosis-create',
  test              : '/test',
  testNew           : '/test/new',
};
