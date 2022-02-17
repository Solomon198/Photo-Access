import { SubmitCv } from '../rightDrawer/cv-steps/steps.actions';
import { LogOut } from '../Auth/auth.actions';
import {
  GetCvActions,
  DeleteCredentialAction,
  AddCredentialsAction,
  GetSubscription,
  SetSubscription,
  GetAllJobs,
} from './user.actions';
const intialState = {
  cv: {},
  getCvStatus: GetCvActions.GET_CV_DEFAULT,
  addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_DEFAULT,
  deleteCredentialStatus: DeleteCredentialAction.DELETE_CREDENTIALS_DEFAULT,
  subscription: null,
  subscriptionGetStatus: GetSubscription.GET_SUBSCRIPTION_DEFAULT,
  subscriptionSetStatus: SetSubscription.SET_SUBSCRIPTION_DEFAULT,
  getAllJobStatus: GetAllJobs.GET_JOBS__DEFAULT,
  jobs: [] as any[],
};

function UserReducer(state = intialState, action: any) {
  switch (action.type) {
    case GetAllJobs.GET_JOBS__STARTED: {
      state = {
        ...state,
        getAllJobStatus: GetAllJobs.GET_JOBS__STARTED,
      };
      return state;
    }

    case GetAllJobs.GET_JOBS__FAILED: {
      state = {
        ...state,
        getAllJobStatus: GetAllJobs.GET_JOBS__FAILED,
      };
      return state;
    }

    case GetAllJobs.GET_JOBS__SUCCESS: {
      state = {
        ...state,
        jobs: action.payload,
        getAllJobStatus: GetAllJobs.GET_JOBS__SUCCESS,
      };
      return state;
    }

    case SetSubscription.SET_SUBSCRIPTION_STARTED: {
      state = {
        ...state,
        subscriptionSetStatus: SetSubscription.SET_SUBSCRIPTION_STARTED,
      };
      return state;
    }

    case SetSubscription.SET_SUBSCRIPTION_FAILED: {
      state = {
        ...state,
        subscriptionSetStatus: SetSubscription.SET_SUBSCRIPTION_FAILED,
      };
      return state;
    }

    case SetSubscription.SET_SUBSCRIPTION_SUCCESS: {
      state = {
        ...state,
        subscriptionSetStatus: SetSubscription.SET_SUBSCRIPTION_SUCCESS,
        subscription: action.payload,
      };
      return state;
    }

    case GetSubscription.GET_SUBSCRIPTION_STARTED: {
      state = {
        ...state,
        subscriptionGetStatus: GetSubscription.GET_SUBSCRIPTION_STARTED,
      };
      return state;
    }

    case GetSubscription.GET_SUBSCRIPTION_FAILED: {
      state = {
        ...state,
        subscriptionGetStatus: GetSubscription.GET_SUBSCRIPTION_FAILED,
      };
      return state;
    }

    case GetSubscription.GET_SUBSCRIPTION_SUCCESS: {
      state = {
        ...state,
        subscriptionGetStatus: GetSubscription.GET_SUBSCRIPTION_SUCCESS,
        subscription: action.payload,
      };
      return state;
    }

    case AddCredentialsAction.ADD_CREDENTIALS_STARTED: {
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_STARTED,
      };
      return state;
    }

    case AddCredentialsAction.ADD_CREDENTIALS_FAILED: {
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
      };
      return state;
    }

    case AddCredentialsAction.ADD_CREDENTIALS_SUCCESS: {
      const cv: any = Object.assign({}, state.cv);
      const credentials: any[] = (cv.credentials as any[]) || [];
      credentials.push(action.payload);
      cv.credentials = credentials;
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_SUCCESS,
        cv: cv,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_STARTED: {
      state = {
        ...state,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_STARTED,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_FAILED: {
      state = {
        ...state,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS: {
      const cv: any = Object.assign({}, state.cv);
      const credentials = cv.credentials as any[];
      credentials.forEach((val, index) => {
        if (val._id === action.payload) {
          credentials.splice(index, 1);
        }
      });
      cv.credentials = credentials;
      state = {
        ...state,
        cv: cv,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS,
      };
      return state;
    }

    case GetCvActions.GET_CV_STARTED: {
      state = { ...state, getCvStatus: GetCvActions.GET_CV_STARTED };
      return state;
    }

    case GetCvActions.GET_CV_FAILED: {
      state = { ...state, getCvStatus: GetCvActions.GET_CV_FAILED };
      return state;
    }

    case GetCvActions.GET_CV_SUCCESS: {
      state = {
        ...state,
        getCvStatus: GetCvActions.GET_CV_SUCCESS,
        cv: action.payload,
      };
      return state;
    }

    case LogOut.LOGOUT: {
      state = {
        jobs: [] as any,
        getAllJobStatus: GetAllJobs.GET_JOBS__DEFAULT,
        cv: {},
        getCvStatus: GetCvActions.GET_CV_DEFAULT,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_DEFAULT,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_DEFAULT,
        subscription: null,
        subscriptionGetStatus: GetSubscription.GET_SUBSCRIPTION_DEFAULT,
        subscriptionSetStatus: SetSubscription.SET_SUBSCRIPTION_DEFAULT,
      };
      return state;
    }
    case SubmitCv.SUBMITCV_SUCCESS: {
      state = { ...state, cv: action.payload };
      return state;
    }

    default:
      return state;
  }
}

export default UserReducer;
