import { call, put, takeEvery } from "redux-saga/effects";
import {
  GetCvActions,
  AddCredentialsAction,
  DeleteCredentialAction,
  GetSubscription,
  SetSubscription,
  GetAllJobs,
} from "./user.actions";
import Config from "../../../configs/env.config";
import axios from "axios";
import { SnackBarActions } from "../../../utilities/utils.actions";
import * as joi from "joi";

const getCv = async (userId: any) => {
  return axios.get(Config().API_ENDPOINT + "/cv/" + userId);
};

const getSubscriptionPlan = async (userId: any) => {
  return axios.get(Config().API_ENDPOINT + "/subscription/" + userId);
};

const setSubscriptionPlan = async (payload: any) => {
  return axios.post(Config().API_ENDPOINT + "/subscription/", payload);
};
const addCredentials = async (payload: any) => {
  return axios.post(Config().API_ENDPOINT + "/cv/credentials", payload);
};

const deleteCredentials = async (payload: any) => {
  return axios.delete(Config().API_ENDPOINT + "/cv/credentials", {
    params: payload,
  });
};

function* watchGetCvs() {
  yield takeEvery(GetCvActions.GET_CV_CALLER, function* (action: any) {
    try {
      yield put({ type: GetCvActions.GET_CV_STARTED });
      const doGetCv = yield call(getCv.bind(null, action.payload));
      const { payload } = doGetCv.data;
      yield put({ type: GetCvActions.GET_CV_SUCCESS, payload: payload });
    } catch (e) {
      console.log(e);
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({ type: GetCvActions.GET_CV_FAILED, payload: message });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          show: true,
          message: message || e.message,
          status: "error",
        },
      });
    }
  });
}

function* watchGetSubscription() {
  yield takeEvery(
    GetSubscription.GET_SUBSCRIPTION_CALLER,
    function* (action: any) {
      try {
        yield put({ type: GetSubscription.GET_SUBSCRIPTION_STARTED });
        const getSubscription = yield call(
          getSubscriptionPlan.bind(null, action.payload)
        );
        const { payload } = getSubscription.data;
        yield put({
          type: GetSubscription.GET_SUBSCRIPTION_SUCCESS,
          payload: payload,
        });
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: GetSubscription.GET_SUBSCRIPTION_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: "error",
          },
        });
      }
    }
  );
}

const validateAddCredentials = joi.object({
  name: joi.string().required(),
  url: joi.string().uri().required(),
  fileType: joi.string().required(),
  userId: joi.string().required(),
});

const getJobs = async () => {
  return axios.get(Config().API_ENDPOINT + "/Admin/jobs");
};

function* watchGetJobs() {
  yield takeEvery(GetAllJobs.GET_JOBS__CALLER, function* (action: any) {
    try {
      yield put({ type: GetAllJobs.GET_JOBS__STARTED });
      const jobs = yield call(getJobs.bind(null));
      yield put({
        type: GetAllJobs.GET_JOBS__SUCCESS,
        payload: jobs.data.payload,
      });
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({
        type: GetAllJobs.GET_JOBS__FAILED,
        payload: message,
      });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          show: true,
          message: message || e.message,
          status: "error",
        },
      });
    }
  });
}

function* watchAddCredentials() {
  yield takeEvery(
    AddCredentialsAction.ADD_CREDENTIALS_CALLER,
    function* (action: any) {
      try {
        yield put({ type: AddCredentialsAction.ADD_CREDENTIALS_STARTED });
        const { error } = validateAddCredentials.validate(action.payload);
        if (!error) {
          const doAddCredential = yield call(
            addCredentials.bind(null, action.payload)
          );
          const { payload } = doAddCredential.data;
          yield put({
            type: AddCredentialsAction.ADD_CREDENTIALS_SUCCESS,
            payload: payload,
          });
        } else {
          yield put({
            type: SnackBarActions.CONFIGURE_SNACKBAR,
            payload: {
              show: true,
              message: error.message,
              status: "error",
            },
          });
          yield put({
            type: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
            payload: error.message,
          });
        }
      } catch (e) {
        console.log(e);
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: "error",
          },
        });
      }
    }
  );
}

const validateDeleteCredentials = joi.object({
  credentialId: joi.string().required(),
  userId: joi.string().required(),
});

function* watchDeleteCredentials() {
  yield takeEvery(
    DeleteCredentialAction.DELETE_CREDENTIALS_CALLER,
    function* (action: any) {
      try {
        const { error } = validateDeleteCredentials.validate(action.payload);
        if (!error) {
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_STARTED,
          });
          yield call(deleteCredentials.bind(null, action.payload));
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS,
            payload: action.payload.credentialId,
          });
        } else {
          console.log(error.message);
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
            payload: error.message,
          });
        }
      } catch (e) {
        console.log(e);
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: "error",
          },
        });
      }
    }
  );
}

function* watchSetSubscription() {
  yield takeEvery(
    SetSubscription.SET_SUBSCRIPTION_CALLER,
    function* (action: any) {
      try {
        yield put({ type: SetSubscription.SET_SUBSCRIPTION_STARTED });
        const setSubscription = yield call(
          setSubscriptionPlan.bind(null, action.payload)
        );
        const { payload } = setSubscription.data;
        yield put({
          type: SetSubscription.SET_SUBSCRIPTION_SUCCESS,
          payload: payload,
        });
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: SetSubscription.SET_SUBSCRIPTION_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: "error",
          },
        });
      }
    }
  );
}

const sagas = {
  watchGetCvs,
  watchAddCredentials,
  watchDeleteCredentials,
  watchGetSubscription,
  watchSetSubscription,
  watchGetJobs,
};
export default sagas;
