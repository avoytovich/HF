import Main                     from '../components/Main';
import Login                    from '../components/auth/Login/Login';
import SignUp                   from '../components/auth/SignUp/SignUp';
import ResetPassword            from '../components/auth/ResetPassword/ResetPassword';
import ForgotPassword           from '../components/auth/ForgotPassword/ForgotPassword';
import Companies                from '../components/users/Companies/Companies';
import Clinics                  from '../components/users/Clinics/Clinics';
import ClinicOwnUsers           from '../components/users/Clinics/ClinicsUsers';
import Profile                  from '../components/users/Profile/Profile';
import SimpleUserProfile        from '../components/users/Profile/SimpleUserProfile';
import SimpleUsers              from '../components/users/Users/SimpleUsers';
import OrganizationsUsers       from '../components/users/Users/OrganizationsUsers';
import ClinicsUsers             from '../components/users/Users/ClinicsUsers';
import CompanyOwnUsers          from '../components/users/Companies/CompanyUsers';
import AssetsExercisesList      from '../components/assets/AssetsExercisesList/AssetsExercisesList';
import AssetsDiagnosticsList    from '../components/assets/AssetsDiagnosticsList/AssetsDiagnosticsList';
import AssetsComponent          from './assets/Assets';
import TestsList                from '../components/testing/TestsList/TestsList';
import TestNew                  from '../components/testing/TestNew/TestNew';
import Chat                     from './chat/Chat';
import TariffPlans              from './tariffPlans/TariffPlans'
import PersonalCabinetMain      from '../components/PersonalCabinetMain';
import PersonalCabinetUsers     from '../components/PersonalCabinet/PersonalCabinetUsers/PersonalCabinetUsers';
import PersonalCabinetProfile     from '../components/PersonalCabinet/PersonalCabinetProfile/PersonalCabinetProfile';
import PersonalCabinetBilling     from '../components/PersonalCabinet/PersonalCabinetBilling/PersonalCabinetBilling';

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
  SimpleUserProfile,
  SimpleUsers,
  OrganizationsUsers,
  ClinicsUsers,
  AssetsComponent,
  AssetsExercisesList,
  AssetsDiagnosticsList,
  TestsList,
  TestNew,
  ...matrixComponents,
  ...commonComponents,
  ...testingComponents,
  PersonalCabinetMain,
  TariffPlans,
  Chat,
  PersonalCabinetUsers,
  PersonalCabinetProfile,
  PersonalCabinetBilling,
};