import { takeEvery, put, call } from "redux-saga/effects";
import { StepInputAction, SubmitCv } from "./steps.actions";
import { SnackBarActions } from "../../../utilities/utils.actions";
import Config from "../../../configs/env.config";
import axios from "axios";

const submitCv = async (payload: any) => {
  return axios.post(Config().API_ENDPOINT + "/cv", payload);
};

function* watchSetFieldValue() {
  yield takeEvery(
    StepInputAction.SET_FIELD_VALUE_CALLER,
    function* (action: any) {
      yield put({
        type: StepInputAction.SET_FIELD_VALUE,
        payload: action.payload,
      });
    }
  );
}

function* watchSetResetSubmitCv() {
  yield takeEvery(
    StepInputAction.RESET_SUBMIT_STATUS_CALLER,
    function* (action: any) {
      yield put({
        type: StepInputAction.RESET_SUBMIT_STATUS,
        payload: action.payload,
      });
    }
  );
}

function* watchSetErrorValue() {
  yield takeEvery(
    StepInputAction.SET_ERROR_TEXT_CALLER,
    function* (action: any) {
      yield put({
        type: StepInputAction.SET_ERROR_TEXT,
        payload: action.payload,
      });
    }
  );
}

function* watchSubmitCv() {
  yield takeEvery(SubmitCv.SUBMITCV_CALLER, function* (action: any) {
    try {
      yield put({ type: SubmitCv.SUBMITCV_STARTED });
      const doSubmit = yield call(submitCv.bind(null, action.payload));
      const { payload } = doSubmit.data;
      yield put({ type: SubmitCv.SUBMITCV_SUCCESS, payload });
      action.history.goBack();
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({ type: SubmitCv.SUBMITCV_FAILED, payload: message });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          show: true,
          message: message,
          status: "error",
        },
      });
    }
  });
}

const sagas = {
  watchSetFieldValue,
  watchSetErrorValue,
  watchSubmitCv,
  watchSetResetSubmitCv,
};

export default sagas;
