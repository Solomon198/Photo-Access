import { combineReducers } from "redux";
import AuthReducer from "../screens/Auth/auth.reducer";
import UserReducer from "../screens/main.screens/dashboard/user.reducer";
import UtilsReducer from "../utilities/utils.reducer";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  User: UserReducer,
  Utils: UtilsReducer,
});

export default rootReducer;
