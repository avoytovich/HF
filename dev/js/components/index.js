import Main                     from '../components/Main';
import Login                    from '../components/auth/Login/Login';
import SignUp                   from '../components/auth/SignUp/SignUp';
import ResetPassword            from '../components/auth/ResetPassword/ResetPassword';
import ForgotPassword           from '../components/auth/ForgotPassword/ForgotPassword';
import Companies                from '../components/users/Companies/Companies';
import Clinics                  from '../components/users/Clinics/Clinics';
import ClinicOwnUsers           from '../components/users/Clinics/ClinicsUsers';
import Profile                  from '../components/users/Profile/Profile';
import SimpleUsers              from '../components/users/Users/SimpleUsers';
import OrganizationsUsers       from '../components/users/Users/OrganizationsUsers';
import ClinicsUsers             from '../components/users/Users/ClinicsUsers';
import CompanyOwnUsers          from '../components/users/Companies/CompanyUsers';
import AssetsList               from '../components/assets/AssetsList/AssetsList';
import AssetsDiagnosticsList    from '../components/assets/AssetsDiagnosticsList/AssetsDiagnosticsList';
import AssetsComponent          from './assets/Assets';
import TestsList                from '../components/testing/TestsList/TestsList';
import TestNew                  from '../components/testing/TestNew/TestNew';

import * as commonComponents    from './common';
import * as testingComponents   from './testing';
import * as matrixComponents    from '../components/matrix/Matrix-Setup';

export const C = {
  Main,
  Login,
  SignUp,
  ResetPassword,
  ForgotPassword,
  Companies,
  Clinics,
  ClinicOwnUsers,
  CompanyOwnUsers,
  Profile,
  SimpleUsers,
  OrganizationsUsers,
  ClinicsUsers,
  AssetsComponent,
  AssetsList,
  AssetsDiagnosticsList,
  TestsList,
  TestNew,
  ...matrixComponents,
  ...commonComponents,
  ...testingComponents,
};