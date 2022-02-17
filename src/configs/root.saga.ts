import { all } from "redux-saga/effects";
import AuthSaga from "../screens/Auth/redux.saga";
import UtilSaga from "../utilities/utils.saga";
import UserSaga from "../screens/main.screens/dashboard/user.saga";

export default function* rootSaga() {
  yield all([
    UserSaga.watchGetCvs(),
    UserSaga.watchDeleteCredentials(),
    UserSaga.watchAddCredentials(),
    UserSaga.watchGetSubscription(),
    UserSaga.watchSetSubscription(),
    UserSaga.watchGetJobs(),
    UtilSaga.configureSnackBar(),

    AuthSaga.watchSetNewPassword(),
    AuthSaga.watchSetConfirmNewPassword(),

    AuthSaga.watchSetSignupFullName(),
    AuthSaga.watchSetSignupPassword(),
    AuthSaga.watchSetSignupPhoneNumber(),
    AuthSaga.watchSetLoginPassword(),
    AuthSaga.watchSetVerifcationCode(),
    AuthSaga.watchSetLoginPhoneNumber(),

    AuthSaga.watchLoginAccount(),
    AuthSaga.watchSignUpAccount(),
    AuthSaga.watchVerifyPin(),
    AuthSaga.watchSendVerificationPin(),
    AuthSaga.watchRessetPassword(),
    AuthSaga.watchLogOut(),
    AuthSaga.watchSetRessetPasswordPhoneNumber(),
  ]);
}
