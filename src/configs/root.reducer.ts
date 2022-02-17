import { combineReducers } from "redux";
import AuthReducer from "../screens/Auth/auth.reducer";
import StepReducer from "../screens/rightDrawer/cv-steps/steps.reducer";
import UserReducer from "../screens/user/user.reducer";
import UtilsReducer from "../utilities/utils.reducer";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Steps: StepReducer,
  User: UserReducer,
  Utils: UtilsReducer,
});

export default rootReducer;
