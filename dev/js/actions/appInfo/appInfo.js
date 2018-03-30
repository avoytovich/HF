import { T }          from '../../actions';
import { store }      from '../../index'
import { Api }        from '../../utils';



export const dispatchAppInfo = () =>
  Api.get('/help').then(res => {
    const { data } = res;
    store.dispatch({
      type: T.APP_INFO_ADD,
      payload: { data }
    });
  });


export const dispatchAppInfoChanges = (value, path) =>
  store.dispatch({
      type: T.APP_INFO_CHANGE,
      payload: { value, path }
    });