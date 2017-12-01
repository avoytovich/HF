// TODO
// users 18.195.77.253
// exercises 18.195.76.169
// diagnostics 18.194.211.206

export const domen = {
  users      : 'http://18.195.77.253',
  exercises  : 'http://18.195.76.169',
  diagnostics: 'http://18.194.211.206',
};

export const api = {
  login     : '/auth/login',
  userOwn   : '/users/my',
  logout    : '/auth/logout',
  packages  : '/packages',
  exercises : '/exercises',
  diagnosis : '/matrix/questions',
  conditions: '/matrix/conditions',
  treatments: '/matrix/treatments',
  evaluation: '/matrix/evaluation',
  passForgot: '/auth/password/forgot/web',
  passReset : '/auth/password/update',
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
  resources  : '/resources',
  matrixSetup: '/matrix-setup',
  diagnosis  : '/matrix-setup/diagnosis',
  conditions : '/matrix-setup/conditions',
  treatments : '/matrix-setup/treatments',
  evaluation : '/matrix-setup/evaluation',
  packages   : '/matrix-setup/packages',
  exercises  : '/matrix-setup/exercises',
};
