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
  userAll           : '/users/get/all',
  userProfile           : '/users/',
  logout            : '/auth/logout',
  packages          : '/packages',
  exercises         : '/exercises',
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
  generate  : '/dev/exercises/files/url/generate',
  assets    : '/files',
  evaluation: '/matrix/evaluation',
};

// form serving front-end assets - i.e. /images - `${assets}/images/auth/page-1.png`
export const assets = 'http://localhost:3030/assets';

export const PAGE = {
  home       : '/',
  login      : '/login',
  signup     : '/signup',
  passReset  : '/pass-reset',
  passForgot : '/pass-forgot',
  companies  : '/companies',
  clinics    : '/clinics',
  users      : '/users',
  assets     : '/assets',
  assetsUpload: '/assets/upload',
  clinicProfile: '/clinic/:id/profile',
  matrixSetup: '/matrix-setup',
  chat       : '/chat',
  diagnosis  : '/matrix-setup/diagnosis',
  conditions : '/matrix-setup/conditions',
  treatments : '/matrix-setup/treatments',
  evaluation : '/matrix-setup/evaluation',
  diagnosisCreate : '/diagnosis-create',
};
