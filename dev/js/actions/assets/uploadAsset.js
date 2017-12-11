import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { getS3Link } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const uploadAssets = () => Api.get(`${domen.users}${api.userOwn}`);

export const uploadAssetsWired = () => uploadAssets()
  .then(response => {
    dispatchUserPayloadWired(response.data.data);
    browserHistory.push(PAGE.home)
  });
