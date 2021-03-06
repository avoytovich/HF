import axios from "axios";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { browserHistory } from "react-router";

import { store } from "../../index";
import {
  dispatchUserPayloadWired,
  dispatchCommonPayloadWired,
  notifier,
  refreshTokenWired,
  T
} from "../../actions";
import { PAGE } from "../../config";

export class Api {
  static headers = async () => {
    const token = store.getState().userReducer.token;
    let headers = {
      // 'Content-Type': 'application/json',
    };

    if (token) {
      headers["App-Token"] = token;
    }
    return headers;
  };

  static get = (route, options, headers) =>
    Api.xhr({ route, method: "GET", options, headersIncome: headers });

  static put = (route, data, options, headers) =>
    Api.xhr({ route, method: "PUT", data, options, headersIncome: headers });

  static post = (route, data, options, headers) =>
    Api.xhr({ route, method: "POST", data, options, headersIncome: headers });

  static delete = (route, options, headers) =>
    Api.xhr({ route, method: "DELETE", options, headersIncome: headers });

  static xhr({ route, method, data, options = {}, headersIncome = {} }) {
    options = {
      needLoader: true,
      showErrNotif: true,
      onUploadProgress: p => {},
      ...options
    };
    const {
      commonReducer: { isLoading },
      userReducer: { refreshToken }
    } = store.getState();
    if (options.needLoader) {
      // to track if request is pending (works with multiple requests - value grater then 0 is true)
      dispatchCommonPayloadWired({ isLoading: isLoading + 1 });
    }
    return Api.headers()
      .then(headers =>
        axios({
          method,
          url: route,
          headers: { ...headers, ...headersIncome },
          data: data,
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            options.onUploadProgress(percentCompleted, progressEvent);
          }
        })
      )
      .then(response => {
        dispatchCommonPayloadWired({ isLoading: isLoading && isLoading - 1 });
        return response;
      })
      .catch(err => {
        dispatchCommonPayloadWired({ isLoading: isLoading && isLoading - 1 });
        console.log(err);
        if (get(err, "response.status") === 401) {
          return refreshTokenWired({ refreshToken }).then(() =>
            Api.xhr({ route, method, data, options, headersIncome })
          );
          // store.dispatch({ type: `${T.USER}_CLEAR` });
          // browserHistory.push(PAGE.login);
        }
        if (options.showErrNotif) {
          notifier({
            title: "Error occurred",
            message: get(err, "response.data.message", "Something went wrong"),
            status: "error"
          });
        }
        return Promise.reject(err);
      });
  }
}
