import { store }  from '../../index';
import {
  dispatchUserPayloadWired,
  dispatchCommonPayloadWired,
} from '../../actions';
import { store } from '../../index';

export class Api {
  static headers = async () => {
    const token = store.getState().userReducer.token;
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['App-Token'] = token;
    }
    return headers;
  };

  static get = (route, options) => Api.xhr({ route, method: 'GET', options });

  static put = (route, data, options) => Api.xhr({ route, method: 'PUT', data, options });

  static post = (route, data, options) => Api.xhr({ route, method: 'POST', data, options });

  static delete = (route, options) => Api.xhr({ route, method: 'DELETE', options });

  static xhr({
    route,
    method,
    data,
    options = { needLoader: true },
  }) {
    const { isLoading } = store.getState().commonReducer;
    if (options.needLoader) {
      // to track if request is pending (works with multiple requests - value grater then 0 is true)
      dispatchCommonPayloadWired({ isLoading: isLoading + 1 });
    }
    return Api.headers()
      .then(headers => fetch(route, {
        method,
        headers,
        body: data && JSON.stringify(data),
      }))
      .then(response => {
        dispatchCommonPayloadWired({ isLoading: isLoading && isLoading - 1 });

        // token is coming in headers not in body
        for (var pair of response.headers.entries()) {
          if (pair[0] === 'app-token') {
            dispatchUserPayloadWired({
              token: pair[1],
            });
          }
        }

        if (response) {
          if (!response.ok) {
            throw new Error(response._bodyText);
          }
          return response.json();
        }
      })
      .catch(err => {
        dispatchCommonPayloadWired({ isLoading: isLoading && isLoading - 1 });
      });
  };
}
