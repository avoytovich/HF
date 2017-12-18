import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  domen,
  api,
} from '../../config';

export const getS3Link = (extension, isPublic = true) => Api.post(`${domen.s3}${api.generate}`, {
  extension,
  public: isPublic,
});
