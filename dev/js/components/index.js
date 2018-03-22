import Main                     from '../components/Main';
import Login                    from '../components/auth/Login/Login';
import TwoFactorInput           from '../components/auth/Login/TwoFactorInput';
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
import Tariffs                  from './tariffPlans/index';
import TariffPlans              from './tariffPlans/TariffPlans'
import PricingGroups              from './tariffPlans/PricingGroups'
import PersonalCabinetMain      from '../components/PersonalCabinetMain';
import PersonalCabinetUsers     from '../components/personalCabinet/PersonalCabinetUsers/PersonalCabinetUsers';
import PersonalCabinetProfile     from '../components/personalCabinet/PersonalCabinetProfile/PersonalCabinetProfile';
import PersonalCabinetBilling     from '../components/personalCabinet/PersonalCabinetBilling/PersonalCabinetBilling';

import * as appScreenInfo       from './appScreenInfo';
import * as commonComponents    from './common';
import * as testingComponents   from './testing';
import * as matrixComponents    from '../components/matrix';

export const C = {
  Main,
  Login,
  TwoFactorInput,
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
  ...appScreenInfo,
  PersonalCabinetMain,
  Tariffs,
  TariffPlans,
  PricingGroups,
  Chat,
  PersonalCabinetUsers,
  PersonalCabinetProfile,
  PersonalCabinetBilling,
};