import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  domen,
  api,
} from '../../config';

export const getS3Link = (extension, folder, isPublic = true) => Api.post(`${domen.s3}${api[folder]}`, {
  extension,
  public: isPublic,
});
