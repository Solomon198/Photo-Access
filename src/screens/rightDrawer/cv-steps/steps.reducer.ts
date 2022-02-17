import { StepInputAction, SubmitCv } from './steps.actions';
import { LogOut } from '../../Auth/auth.actions';
import { GetCvActions } from '../../user/user.actions';

const intialState = {
  stepOne: {
    fullName: '',
    address: '',
    age: null,
    phoneNumber: '',
    state: null,
    lga: null,
    sex: '',
    file: '',
    preview: '',
  },
  stepTwo: {
    experiences: [],
  },
  stepThree: {
    education: [],
  },
  stepFour: {
    fullName: '',
    address: '',
    age: null,
    phoneNumber: '',
    state: null,
    lga: null,
    sex: '',
  },
  error: '',
  submitCvStatus: SubmitCv.SUBMITCV_DEFAULT,
};

function StepReducer(state = intialState, action: any) {
  switch (action.type) {
    case LogOut.LOGOUT: {
      state = {
        stepOne: {
          fullName: '',
          address: '',
          age: null,
          phoneNumber: '',
          state: null,
          lga: null,
          sex: '',
          file: '',
          preview: '',
        },
        stepTwo: {
          experiences: [],
        },
        stepThree: {
          education: [],
        },
        stepFour: {
          fullName: '',
          address: '',
          age: null,
          phoneNumber: '',
          state: null,
          lga: null,
          sex: '',
        },
        error: '',
        submitCvStatus: SubmitCv.SUBMITCV_DEFAULT,
      };
      return state;
    }

    case GetCvActions.GET_CV_SUCCESS: {
      const stateCopy = Object.assign({}, state);
      if (action.payload) {
        Object.keys(intialState.stepOne).forEach((key) => {
          if (key === 'file' || key === 'preview') {
            stateCopy.stepOne[key] = action.payload.profilePicture;
          } else {
            stateCopy.stepOne[key] = action.payload[key];
          }
        });

        Object.keys(intialState.stepFour).forEach((key) => {
          stateCopy.stepFour[key] = action.payload.guarrantor[key];
        });

        stateCopy.stepTwo.experiences = action.payload.experiences;
        stateCopy.stepThree.education = action.payload.education;
      }

      return stateCopy;
    }
    case StepInputAction.RESET_SUBMIT_STATUS: {
      state = { ...state, submitCvStatus: SubmitCv.SUBMITCV_DEFAULT };
      return state;
    }
    case SubmitCv.SUBMITCV_STARTED: {
      state = { ...state, submitCvStatus: SubmitCv.SUBMITCV_STARTED };
      return state;
    }
    case SubmitCv.SUBMITCV_FAILED: {
      state = { ...state, submitCvStatus: SubmitCv.SUBMITCV_FAILED };
      return state;
    }

    case SubmitCv.SUBMITCV_SUCCESS: {
      state = { ...state, submitCvStatus: SubmitCv.SUBMITCV_SUCCESS };
      return state;
    }

    case StepInputAction.SET_FIELD_VALUE: {
      const { step, property, value } = action.payload;
      const currentState = Object.assign({}, state);
      currentState[step][property] = value;
      currentState.error = '';
      return currentState;
    }

    case StepInputAction.SET_ERROR_TEXT: {
      state = { ...state, error: action.payload };
      return state;
    }
  }

  return state;
}

export default StepReducer;
