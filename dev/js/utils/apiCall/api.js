import { store }  from '../../index';

//TODO
const BASE_URL = '';

export class Api {
  static headers = async () => {

    let headers = {
      'Content-Type': 'application/json',
    };

    return headers;
  };

  static get = (route, options) => Api.xhr({ route, method: 'GET', options });

  static put = (route, data, options) => Api.xhr({ route, method: 'PUT', data, options });

  static post = (route, data, options) => Api.xhr({ route, method: 'POST', data, options });

  static delete = (route, options) => Api.xhr({ route, method: 'DELETE', options });

  static xhr({ route, method, data, options }) {
    const { isLoading } = store.getState().commonReducer;
    // wiredCommonPayload({ isLoading: isLoading + 1 });
    return Api.headers()
      .then(headers => fetch(`${BASE_URL}${route}`, {
        method,
        headers,
        body: data && JSON.stringify(data),
      }))
      .then(response => {
        // wiredCommonPayload({ isLoading: isLoading && isLoading - 1 });
        if (response) {
          if (!response.ok) {
            throw new Error(response._bodyText);
          }
          return response.json();
        }
      })
      .catch(err => {
        // wiredCommonPayload({ isLoading: isLoading && isLoading - 1 });
      });
  };
}
