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
  login     : '/auth/login',
  generate  : '/dev/exercises/files/url/generate',
  assets    : '/files',
  userOwn   : '/users/my',
  userAll   : '/users/get/all',
  logout    : '/auth/logout',
  packages  : '/packages',
  exercises : '/exercises',
  diagnosis : '/matrix/questions',
  conditions: '/matrix/conditions',
  treatments: '/matrix/treatments',
  evaluation: '/matrix/evaluation',
  passForgot: '/auth/password/forgot/web',
  passReset : '/auth/password/update',
  findArea  : '/matrix/areas/get/all',
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
  matrixSetup: '/matrix-setup',
  chat       : '/chat',
  diagnosis  : '/matrix-setup/diagnosis',
  conditions : '/matrix-setup/conditions',
  treatments : '/matrix-setup/treatments',
  evaluation : '/matrix-setup/evaluation',
  packages   : '/matrix-setup/packages',
  exercises  : '/matrix-setup/exercises',
};
