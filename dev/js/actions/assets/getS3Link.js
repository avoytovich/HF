import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  domen,
  api,
} from '../../config';

export const getS3Link = extension => Api.post(`${domen.s3}${api.generate}`, {
  extension,
  public: true
});
