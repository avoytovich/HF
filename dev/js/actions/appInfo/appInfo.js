import { T }          from '../../actions';
import { store }      from '../../index'
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';



export const dispatchAppInfo = () => {
  const _domen = domen['users'];
  const _api   = api['getAllHelpers'];

  Api.get(`${_domen}${_api}`).then(res => {
    const { data } = res.data;
    const payload = data.reduce((ans, item) => ({
      ...ans,
      [item.key]: item,
    }), {});

    store.dispatch({
      type   :[`${T.APP_INFO}_ADD`],
      payload
    });
  });
};


export const saveAppInfo = (list) => {
  const _domen = domen['users'];
  const _api   = api['setAllHelpers'];
  const res = {
    data: { ...list }
  };
  return Api.put(`${_domen}${_api}`, res);
};