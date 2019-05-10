import axios from "axios";
import {ADD_LOADING_MARKER, REMOVE_LOADING_MARKER} from "./LoadingMarkerReducer";

const getInstance = (store, config = {}) => {
  const instance = axios.create({});
  const defaultConfig = {
    doNotShowLoading: false,
    security: {
      getToken: () => null
    }
  };
  const {doNotShowLoading, security} = {...defaultConfig, ...config};

  const getAddLoadingAction = (marker) => {
    return {
      type: ADD_LOADING_MARKER,
      payload: marker
    };
  };

  const getRemoveLoadingAction = (marker) => {
    return {
      type: REMOVE_LOADING_MARKER,
      payload: marker
    };
  };

  instance.interceptors.response.use(function (response) {
    if (!doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(response.config.marker));
    }
    return response;
  }, function (error) {
    if (!doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(error.config.marker));
    }
    // 401 Unauthorized
    // 403 Forbidden
    if (error.response.status === 401 || error.response.status === 403) {
      delete error.config.headers["Authorization"];
      return security.refreshToken().then((token) => {
        error.config.headers["Authorization"] = "Bearer " + token;
        window.console.log("retry request", error.config);
        return instance.request(error.config);
      }).catch(() => {
        window.location = "/";
      });
    }
    return Promise.reject(error);
  });

  instance.interceptors.request.use(function (config) {
    if (!doNotShowLoading) {
      store.dispatch(getAddLoadingAction(config.marker));
    }
    let token = security.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  }, function (error) {
    if (!doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(error.config.marker));
    }
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    if (!doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(response.config.marker));
    }
    return response;
  }, function (error) {
    if (!doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(error.config.marker));
    }
    return Promise.reject(error);
  });

  return instance;
};

export {
  getInstance
};

/*




let token = security.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      // 401 Unauthorized
      // 403 Forbidden
      if (error.response.status === 401 || error.response.status === 403) {
        delete error.config.headers["Authorization"];
        security.getRefreshToken().then(({data}) => {
          error.config.headers["Authorization"] = "Bearer " + data.accessToken;
          window.console.log("retry request", error.config);
          return instance.request(error.config);
        }).catch((error) => {
          return Promise.reject(error);
        });
      }
    }




 */

/*

import axios from "axios";
import store from "../AppStore";
import {ADD_LOADING, REMOVE_LOADING} from "../reducers/restReducer";
import uuidv4 from "uuid/v4";
import {ADD_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN} from "../reducers/authReducer";

const getAddLoadingAction = (marker) => {
  return {
    type: ADD_LOADING,
    payload: marker
  };
};

const getRemoveLoadingAction = (marker) => {
  return {
    type: REMOVE_LOADING,
    payload: marker
  };
};

const getInstance = (settings = {doNotShowLoading: false}) => {

  // Don't use the "baseURL" property. It won work with the...
  // "let result = instance.request(error.config);"  ...
  // line bellow, after refreshing the access token
  const instance = axios.create({});

  instance.interceptors.request.use(function (config) {
    let state = store.getState();
    let token = state.auth.accessToken;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if(!settings.doNotShowLoading) {
      config.marker = uuidv4();
      store.dispatch(getAddLoadingAction(config.marker));
    }
    return config;
  }, function (error) {
    if(!settings.doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(error.config.marker));
    }
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    if(!settings.doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(response.config.marker));
    }
    return response;
  }, function (error) {
    if(!settings.doNotShowLoading) {
      store.dispatch(getRemoveLoadingAction(error.config.marker));
    }
    // 401 Unauthorized
    // 403 Forbidden
    if (error.response.status === 401 || error.response.status === 403) {
      delete error.config.headers["Authorization"];
      const state = store.getState();
      let token = state.auth;
      if (token && token.refreshToken) {
        const http = axios.create({});
        return http.post("/auth/refresh", {
          refreshToken: token.refreshToken,
        }).then(({data}) => {
          error.config.headers["Authorization"] = "Bearer " + data.accessToken;
          window.console.log("retry request", error.config);
          let result = instance.request(error.config);
          store.dispatch({type: ADD_ACCESS_TOKEN, payload: data});
          return result;
        }).catch((error) => {
          store.dispatch({
            type: REMOVE_ACCESS_TOKEN
          });
          return Promise.reject(error);
        });
      }
    }
    return Promise.reject(error);
  });

  return instance;
};

export default getInstance;




 */
